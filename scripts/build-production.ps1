[CmdletBinding()]
param(
  [switch]$DryRun
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$configPath = Join-Path $projectRoot "turnstile_secret.txt"
$generatedWranglerPath = Join-Path $projectRoot ".wrangler.production.generated.jsonc"
$requiredKeys = @(
  "PUBLIC_TURNSTILE_SITE_KEY",
  "TURNSTILE_SECRET",
  "RFQ_FROM_EMAIL",
  "RFQ_TO_EMAIL"
)

if (-not (Test-Path -LiteralPath $configPath -PathType Leaf)) {
  throw "The ignored turnstile_secret.txt production configuration file is missing."
}

$configuration = @{}
foreach ($rawLine in Get-Content -LiteralPath $configPath) {
  $line = ([string]$rawLine).Trim()
  if ($line.Length -eq 0 -or $line.StartsWith("#")) {
    continue
  }

  $separator = $line.IndexOf("=")
  if ($separator -le 0) {
    throw "The production configuration contains an unlabeled entry."
  }

  $key = $line.Substring(0, $separator).Trim()
  $value = $line.Substring($separator + 1).Trim()
  if ($configuration.ContainsKey($key)) {
    throw "The production configuration contains a duplicate key: $key"
  }
  $configuration[$key] = $value
}

$extraKeys = @($configuration.Keys | Where-Object { $_ -notin $requiredKeys })
if ($extraKeys.Count -gt 0) {
  throw "The production configuration contains unsupported keys."
}

foreach ($key in $requiredKeys) {
  if (-not $configuration.ContainsKey($key) -or [string]::IsNullOrWhiteSpace($configuration[$key])) {
    throw "The production configuration is missing a required value: $key"
  }
}

if ($configuration["PUBLIC_TURNSTILE_SITE_KEY"] -notmatch "^0x[0-9A-Za-z_-]{18,30}$") {
  throw "PUBLIC_TURNSTILE_SITE_KEY does not have the expected production-key format."
}
if ($configuration["TURNSTILE_SECRET"] -notmatch "^0x[0-9A-Za-z_-]{18,}$") {
  throw "TURNSTILE_SECRET does not have the expected production-key format."
}
if ($configuration["PUBLIC_TURNSTILE_SITE_KEY"] -ceq $configuration["TURNSTILE_SECRET"]) {
  throw "The Turnstile sitekey and secret must be different values."
}
if ($configuration["RFQ_FROM_EMAIL"].ToLowerInvariant() -ne "rfq@xingxufan.com") {
  throw "RFQ_FROM_EMAIL must use the approved xingxufan.com sender address."
}
if ($configuration["RFQ_TO_EMAIL"] -notmatch "^[^@\s]+@[^@\s]+\.[^@\s]+$") {
  throw "RFQ_TO_EMAIL does not have a valid email-address shape."
}

$previousSiteKey = $env:PUBLIC_TURNSTILE_SITE_KEY
$hadPreviousSiteKey = Test-Path Env:PUBLIC_TURNSTILE_SITE_KEY
$previousLogPath = $env:WRANGLER_LOG_PATH
$hadPreviousLogPath = Test-Path Env:WRANGLER_LOG_PATH
$wranglerRunLogPath = $null

try {
  $env:PUBLIC_TURNSTILE_SITE_KEY = $configuration["PUBLIC_TURNSTILE_SITE_KEY"]

  Push-Location $projectRoot
  try {
    & npm.cmd run build
    if ($LASTEXITCODE -ne 0) {
      throw "The production Astro build failed."
    }

    $siteKeyEmbedded = $false
    foreach ($asset in Get-ChildItem -LiteralPath (Join-Path $projectRoot "dist") -Recurse -File) {
      if ($asset.Extension -notin @(".html", ".js")) {
        continue
      }
      if ((Get-Content -LiteralPath $asset.FullName -Raw).Contains($configuration["PUBLIC_TURNSTILE_SITE_KEY"])) {
        $siteKeyEmbedded = $true
        break
      }
    }
    if (-not $siteKeyEmbedded) {
      throw "The production sitekey was not embedded in the built RFQ page."
    }
    Write-Output "Production Turnstile sitekey embedding verified without displaying the key."

    if ($DryRun) {
      $wranglerPath = Join-Path $projectRoot "node_modules\.bin\wrangler.cmd"
      if (-not (Test-Path -LiteralPath $wranglerPath -PathType Leaf)) {
        throw "The project Wrangler executable is missing. Run npm install first."
      }

      $wranglerConfigPath = Join-Path $projectRoot "wrangler.jsonc"
      $destinationPlaceholder = "__RFQ_TO_EMAIL_FROM_IGNORED_CONFIG__"
      $wranglerConfig = Get-Content -LiteralPath $wranglerConfigPath -Raw
      $placeholderCount = ([regex]::Matches($wranglerConfig, [regex]::Escape($destinationPlaceholder))).Count
      if ($placeholderCount -ne 1) {
        throw "The production email destination placeholder is missing or duplicated."
      }
      $generatedWranglerConfig = $wranglerConfig.Replace(
        $destinationPlaceholder,
        $configuration["RFQ_TO_EMAIL"]
      )
      [System.IO.File]::WriteAllText(
        $generatedWranglerPath,
        $generatedWranglerConfig,
        [System.Text.UTF8Encoding]::new($false)
      )

      $wranglerLogDirectory = Join-Path $projectRoot ".wrangler\logs"
      New-Item -ItemType Directory -Force -Path $wranglerLogDirectory | Out-Null
      $wranglerRunLogPath = Join-Path $wranglerLogDirectory "production-dry-run.log"
      $env:WRANGLER_LOG_PATH = $wranglerRunLogPath
      $wranglerOutput = & $wranglerPath deploy --config $generatedWranglerPath --dry-run --env production 2>&1
      $wranglerExitCode = $LASTEXITCODE
      foreach ($outputLine in $wranglerOutput) {
        $safeLine = [string]$outputLine
        foreach ($privateValue in @(
          $configuration["PUBLIC_TURNSTILE_SITE_KEY"],
          $configuration["TURNSTILE_SECRET"],
          $configuration["RFQ_TO_EMAIL"]
        )) {
          $safeLine = $safeLine.Replace($privateValue, "[redacted]")
        }
        Write-Output $safeLine
      }
      if ($wranglerExitCode -ne 0) {
        throw "The production Wrangler dry-run failed."
      }
    }
  }
  finally {
    Pop-Location
  }
}
finally {
  if ($hadPreviousSiteKey) {
    $env:PUBLIC_TURNSTILE_SITE_KEY = $previousSiteKey
  }
  else {
    Remove-Item Env:PUBLIC_TURNSTILE_SITE_KEY -ErrorAction SilentlyContinue
  }

  if ($hadPreviousLogPath) {
    $env:WRANGLER_LOG_PATH = $previousLogPath
  }
  else {
    Remove-Item Env:WRANGLER_LOG_PATH -ErrorAction SilentlyContinue
  }

  $generatedFullPath = [System.IO.Path]::GetFullPath($generatedWranglerPath)
  $projectFullPath = [System.IO.Path]::GetFullPath($projectRoot).TrimEnd(
    [System.IO.Path]::DirectorySeparatorChar,
    [System.IO.Path]::AltDirectorySeparatorChar
  ) + [System.IO.Path]::DirectorySeparatorChar
  if (
    $generatedFullPath.StartsWith($projectFullPath, [System.StringComparison]::OrdinalIgnoreCase) -and
    (Test-Path -LiteralPath $generatedFullPath -PathType Leaf)
  ) {
    Remove-Item -LiteralPath $generatedFullPath -Force
  }

  if ($wranglerRunLogPath) {
    $wranglerLogFullPath = [System.IO.Path]::GetFullPath($wranglerRunLogPath)
    if (
      $wranglerLogFullPath.StartsWith($projectFullPath, [System.StringComparison]::OrdinalIgnoreCase) -and
      (Test-Path -LiteralPath $wranglerLogFullPath -PathType Leaf)
    ) {
      Remove-Item -LiteralPath $wranglerLogFullPath -Force
    }
  }
}
