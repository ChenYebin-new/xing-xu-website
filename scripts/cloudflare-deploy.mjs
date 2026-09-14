#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { redactSensitiveText } from "./cloudflare-build.mjs";

const EXPECTED_ACCOUNT_ID = "e4aaa1d1aea8505cff4d65aa23cd0551";
const EXPECTED_WORKER_NAME = "xing-xu-website";
const DESTINATION_PLACEHOLDER = "__RFQ_TO_EMAIL_FROM_IGNORED_CONFIG__";
const EXPECTED_FROM_EMAIL = "rfq@xingxufan.com";
const EXPECTED_HOSTNAME = "xingxufan.com";
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export function validateDestinationAddress(rawValue) {
  const value = typeof rawValue === "string" ? rawValue.trim() : "";
  if (!value) {
    throw new Error("CI_RFQ_DESTINATION_ADDRESS is required for the Cloudflare production deploy.");
  }
  if (!/^[^\s@\"<>]+@[^\s@\"<>]+\.[^\s@\"<>]+$/.test(value)) {
    throw new Error("CI_RFQ_DESTINATION_ADDRESS does not have a valid email-address shape.");
  }
  const normalized = value.toLowerCase();
  if (normalized.endsWith(".test") || normalized.endsWith(".invalid") || normalized.endsWith("@local.test")) {
    throw new Error("CI_RFQ_DESTINATION_ADDRESS must be a verified production destination.");
  }
  return value;
}

export function validateCiDeploymentTarget(env) {
  const overrideName = typeof env.WRANGLER_CI_OVERRIDE_NAME === "string"
    ? env.WRANGLER_CI_OVERRIDE_NAME.trim()
    : "";
  if (overrideName && overrideName !== EXPECTED_WORKER_NAME) {
    throw new Error("Workers Builds is connected to a different Worker name.");
  }

  const accountId = typeof env.CLOUDFLARE_ACCOUNT_ID === "string"
    ? env.CLOUDFLARE_ACCOUNT_ID.trim()
    : "";
  if (accountId && accountId !== EXPECTED_ACCOUNT_ID) {
    throw new Error("Workers Builds is targeting a different Cloudflare account.");
  }
}

function assertNoRoutes(config, label) {
  for (const property of ["route", "routes"]) {
    if (Object.hasOwn(config, property)) {
      throw new Error(`${label} must not define ${property} before the public-domain release.`);
    }
  }
}

export function buildProductionWranglerConfig(baseConfigText, destinationAddress) {
  const destination = validateDestinationAddress(destinationAddress);
  let config;
  try {
    config = JSON.parse(baseConfigText);
  } catch {
    throw new Error("wrangler.jsonc must remain JSON-compatible for the production deploy adapter.");
  }

  const production = config?.env?.production;
  if (!production || typeof production !== "object") {
    throw new Error("wrangler.jsonc is missing env.production.");
  }
  if (config.account_id !== EXPECTED_ACCOUNT_ID) {
    throw new Error("wrangler.jsonc does not target the approved Cloudflare account.");
  }
  if (config.name !== EXPECTED_WORKER_NAME || production.name !== EXPECTED_WORKER_NAME) {
    throw new Error("wrangler.jsonc does not target the approved Worker name.");
  }

  for (const [candidate, label] of [
    [config, "The root Wrangler configuration"],
    [production, "The production Wrangler environment"],
  ]) {
    if (candidate.workers_dev !== false || candidate.preview_urls !== false) {
      throw new Error(`${label} must keep workers_dev and preview_urls disabled.`);
    }
    assertNoRoutes(candidate, label);
  }

  if (
    production.vars?.RFQ_MODE !== "live" ||
    production.vars?.TURNSTILE_HOSTNAMES !== EXPECTED_HOSTNAME ||
    production.vars?.RFQ_FROM_EMAIL !== EXPECTED_FROM_EMAIL
  ) {
    throw new Error("The production RFQ variables do not match the approved live configuration.");
  }

  const requiredSecrets = production.secrets?.required;
  if (
    !Array.isArray(requiredSecrets) ||
    !requiredSecrets.includes("TURNSTILE_SECRET") ||
    !requiredSecrets.includes("RFQ_TO_EMAIL")
  ) {
    throw new Error("The production Worker secret declarations are incomplete.");
  }

  const emailBindings = production.send_email;
  if (!Array.isArray(emailBindings) || emailBindings.length !== 1) {
    throw new Error("The production Worker must define exactly one email binding.");
  }
  const emailBinding = emailBindings[0];
  if (
    emailBinding?.name !== "RFQ_EMAIL" ||
    emailBinding.destination_address !== DESTINATION_PLACEHOLDER ||
    !Array.isArray(emailBinding.allowed_sender_addresses) ||
    emailBinding.allowed_sender_addresses.length !== 1 ||
    emailBinding.allowed_sender_addresses[0] !== EXPECTED_FROM_EMAIL
  ) {
    throw new Error("The production email binding does not match the approved restricted configuration.");
  }

  emailBinding.destination_address = destination;
  return `${JSON.stringify(config, null, 2)}\n`;
}

function isInsideRoot(root, targetPath) {
  const relativePath = path.relative(path.resolve(root), path.resolve(targetPath));
  return relativePath !== "" && !relativePath.startsWith("..") && !path.isAbsolute(relativePath);
}

function removeManagedFile(root, targetPath) {
  if (!isInsideRoot(root, targetPath)) {
    throw new Error("Refusing to remove a generated file outside the project root.");
  }
  rmSync(targetPath, { force: true });
}

export function withGeneratedWranglerConfig({ root, baseConfigPath, destinationAddress }, action) {
  const generatedConfigPath = path.join(
    root,
    `.wrangler.production.generated.${randomUUID()}.jsonc`,
  );
  const generatedConfig = buildProductionWranglerConfig(
    readFileSync(baseConfigPath, "utf8"),
    destinationAddress,
  );

  writeFileSync(generatedConfigPath, generatedConfig, { encoding: "utf8", flag: "wx" });
  try {
    return action(generatedConfigPath);
  } finally {
    removeManagedFile(root, generatedConfigPath);
  }
}

export function runProductionDeploy({
  env = process.env,
  root = projectRoot,
  runner = spawnSync,
  stdout = process.stdout,
  stderr = process.stderr,
  wranglerCliPath = path.join(projectRoot, "node_modules", "wrangler", "bin", "wrangler.js"),
  dryRun = false,
} = {}) {
  const destinationAddress = validateDestinationAddress(env.CI_RFQ_DESTINATION_ADDRESS);
  validateCiDeploymentTarget(env);
  if (!existsSync(wranglerCliPath)) {
    throw new Error("The project Wrangler executable is missing. Run npm ci first.");
  }

  const baseConfigPath = path.join(root, "wrangler.jsonc");
  const sensitiveValues = [
    destinationAddress,
    env.PUBLIC_TURNSTILE_SITE_KEY,
    env.TURNSTILE_SECRET,
    env.RFQ_TO_EMAIL,
    env.CLOUDFLARE_API_TOKEN,
    env.CLOUDFLARE_API_KEY,
    env.CLOUDFLARE_EMAIL,
  ];
  const childEnv = { ...env };
  for (const name of [
    "CI_RFQ_DESTINATION_ADDRESS",
    "PUBLIC_TURNSTILE_SITE_KEY",
    "TURNSTILE_SECRET",
    "RFQ_TO_EMAIL",
  ]) {
    delete childEnv[name];
  }

  // Preserve Cloudflare's validated CI target variables so Wrangler's
  // CI match-tag protection can confirm the intended account and Worker.

  return withGeneratedWranglerConfig(
    { root, baseConfigPath, destinationAddress },
    (generatedConfigPath) => {
      const wranglerLogDirectory = path.join(root, ".wrangler", "logs");
      mkdirSync(wranglerLogDirectory, { recursive: true });
      const wranglerLogPath = path.join(
        wranglerLogDirectory,
        `production-deploy-${randomUUID()}.log`,
      );
      childEnv.WRANGLER_LOG_PATH = wranglerLogPath;

      try {
        const wranglerArguments = [
          wranglerCliPath,
          "deploy",
          "--config",
          generatedConfigPath,
          "--env",
          "production",
        ];
        if (dryRun) wranglerArguments.push("--dry-run");

        const result = runner(
          process.execPath,
          wranglerArguments,
          {
            cwd: root,
            env: childEnv,
            encoding: "utf8",
            maxBuffer: 20 * 1024 * 1024,
            windowsHide: true,
          },
        );

        const safeStdout = redactSensitiveText(result.stdout, sensitiveValues);
        const safeStderr = redactSensitiveText(result.stderr, sensitiveValues);
        if (safeStdout) stdout.write(safeStdout);
        if (safeStderr) stderr.write(safeStderr);
        if (result.error || result.status !== 0) {
          throw new Error("The Cloudflare production Wrangler deploy failed.");
        }
        return result;
      } finally {
        removeManagedFile(root, wranglerLogPath);
      }
    },
  );
}

function isDirectExecution() {
  if (!process.argv[1]) return false;
  return path.resolve(process.argv[1]).toLowerCase() === fileURLToPath(import.meta.url).toLowerCase();
}

if (isDirectExecution()) {
  try {
    const arguments_ = process.argv.slice(2);
    if (arguments_.some((argument) => argument !== "--dry-run") || arguments_.length > 1) {
      throw new Error("The production deploy adapter accepts only the optional --dry-run flag.");
    }
    runProductionDeploy({ dryRun: arguments_[0] === "--dry-run" });
  } catch (error) {
    const sensitiveValues = [
      process.env.CI_RFQ_DESTINATION_ADDRESS,
      process.env.PUBLIC_TURNSTILE_SITE_KEY,
      process.env.TURNSTILE_SECRET,
      process.env.RFQ_TO_EMAIL,
      process.env.CLOUDFLARE_API_TOKEN,
      process.env.CLOUDFLARE_API_KEY,
      process.env.CLOUDFLARE_EMAIL,
    ];
    const message = error instanceof Error ? error.message : "Unknown production deploy error.";
    process.stderr.write(`${redactSensitiveText(message, sensitiveValues)}\n`);
    process.exitCode = 1;
  }
}
