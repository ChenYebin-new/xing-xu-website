#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_TEST_SITE_KEY = "1x00000000000000000000AA";
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export function validateProductionSiteKey(rawValue) {
  const value = typeof rawValue === "string" ? rawValue.trim() : "";
  if (!value) {
    throw new Error("PUBLIC_TURNSTILE_SITE_KEY is required for the Cloudflare production build.");
  }
  if (value === DEFAULT_TEST_SITE_KEY || !/^0x[0-9A-Za-z_-]{18,30}$/.test(value)) {
    throw new Error("PUBLIC_TURNSTILE_SITE_KEY must be a production Turnstile sitekey, not a test key.");
  }
  return value;
}

export function redactSensitiveText(value, sensitiveValues) {
  let safeValue = typeof value === "string" ? value : "";
  for (const sensitiveValue of sensitiveValues) {
    if (typeof sensitiveValue === "string" && sensitiveValue.length > 0) {
      safeValue = safeValue.replaceAll(sensitiveValue, "[redacted]");
    }
  }
  return safeValue;
}

function relayResult(result, sensitiveValues, stdout, stderr) {
  const safeStdout = redactSensitiveText(result.stdout, sensitiveValues);
  const safeStderr = redactSensitiveText(result.stderr, sensitiveValues);
  if (safeStdout) stdout.write(safeStdout);
  if (safeStderr) stderr.write(safeStderr);
}

export function runProductionBuild({
  env = process.env,
  root = projectRoot,
  runner = spawnSync,
  stdout = process.stdout,
  stderr = process.stderr,
  npmCliPath = env.npm_execpath,
} = {}) {
  const siteKey = validateProductionSiteKey(env.PUBLIC_TURNSTILE_SITE_KEY);
  if (typeof npmCliPath !== "string" || !existsSync(npmCliPath)) {
    throw new Error("The npm CLI path is unavailable. Run this command through npm.");
  }
  const sensitiveValues = [siteKey, env.TURNSTILE_SECRET, env.RFQ_TO_EMAIL, env.CI_RFQ_DESTINATION_ADDRESS];
  const childEnv = {
    ...env,
    PUBLIC_TURNSTILE_SITE_KEY: siteKey,
  };

  for (const name of [
    "TURNSTILE_SECRET",
    "RFQ_TO_EMAIL",
    "CI_RFQ_DESTINATION_ADDRESS",
    "CLOUDFLARE_API_KEY",
    "CLOUDFLARE_API_TOKEN",
    "CLOUDFLARE_ACCOUNT_ID",
    "CLOUDFLARE_EMAIL",
    "WRANGLER_CI_OVERRIDE_NAME",
  ]) {
    delete childEnv[name];
  }

  for (const [scriptName, failureMessage] of [
    ["check:ci", "The Cloudflare production checks failed."],
    ["build", "The Cloudflare production Astro build failed."],
  ]) {
    const result = runner(process.execPath, [npmCliPath, "run", scriptName], {
      cwd: root,
      env: childEnv,
      encoding: "utf8",
      maxBuffer: 20 * 1024 * 1024,
      windowsHide: true,
    });

    relayResult(result, sensitiveValues, stdout, stderr);
    if (result.error || result.status !== 0) {
      throw new Error(failureMessage);
    }
  }

  const rfqPagePath = path.join(root, "dist", "request-a-quote", "index.html");
  if (!existsSync(rfqPagePath)) {
    throw new Error("The production RFQ page is missing from the Astro build output.");
  }

  const rfqPage = readFileSync(rfqPagePath, "utf8");
  if (!rfqPage.includes(siteKey)) {
    throw new Error("The production Turnstile sitekey was not embedded in the RFQ page.");
  }
  if (rfqPage.includes(DEFAULT_TEST_SITE_KEY)) {
    throw new Error("The production RFQ page still contains the Cloudflare test sitekey.");
  }

  stdout.write("Cloudflare production build verified without displaying the Turnstile sitekey.\n");
}

function isDirectExecution() {
  if (!process.argv[1]) return false;
  return path.resolve(process.argv[1]).toLowerCase() === fileURLToPath(import.meta.url).toLowerCase();
}

if (isDirectExecution()) {
  try {
    runProductionBuild();
  } catch (error) {
    const sensitiveValues = [
      process.env.PUBLIC_TURNSTILE_SITE_KEY,
      process.env.TURNSTILE_SECRET,
      process.env.RFQ_TO_EMAIL,
      process.env.CI_RFQ_DESTINATION_ADDRESS,
    ];
    const message = error instanceof Error ? error.message : "Unknown production build error.";
    process.stderr.write(`${redactSensitiveText(message, sensitiveValues)}\n`);
    process.exitCode = 1;
  }
}
