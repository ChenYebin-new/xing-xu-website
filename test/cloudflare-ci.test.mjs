import assert from "node:assert/strict";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  runProductionBuild,
  validateProductionSiteKey,
} from "../scripts/cloudflare-build.mjs";
import {
  buildProductionWranglerConfig,
  runProductionDeploy,
  validateCiDeploymentTarget,
  validateDestinationAddress,
  withGeneratedWranglerConfig,
} from "../scripts/cloudflare-deploy.mjs";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const baseWranglerConfig = readFileSync(path.join(repositoryRoot, "wrangler.jsonc"), "utf8");
const productionSiteKey = "0x4AAAAAAACiSiteKey12345678";
const destinationAddress = "ci-canary@example.com";

function temporaryProject() {
  const root = mkdtempSync(path.join(tmpdir(), "xingxu-cloudflare-ci-"));
  writeFileSync(path.join(root, "wrangler.jsonc"), baseWranglerConfig, "utf8");
  const wranglerCliPath = path.join(root, "wrangler.js");
  writeFileSync(wranglerCliPath, "// test placeholder\n", "utf8");
  return { root, wranglerCliPath };
}

function generatedConfigFiles(root) {
  return readdirSync(root).filter((name) => name.startsWith(".wrangler.production.generated."));
}

test("production build rejects missing and test Turnstile sitekeys", () => {
  assert.throws(() => validateProductionSiteKey(undefined), /PUBLIC_TURNSTILE_SITE_KEY is required/);
  assert.throws(
    () => validateProductionSiteKey("1x00000000000000000000AA"),
    /production Turnstile sitekey/,
  );
  assert.throws(
    () => validateProductionSiteKey(`0x${"A".repeat(33)}`),
    /production Turnstile sitekey/,
  );
  assert.equal(validateProductionSiteKey(` ${productionSiteKey} `), productionSiteKey);
});

test("production build fails before starting Astro when the sitekey is absent", () => {
  let runnerCalls = 0;
  assert.throws(
    () =>
      runProductionBuild({
        env: {},
        runner: () => {
          runnerCalls += 1;
        },
      }),
    /PUBLIC_TURNSTILE_SITE_KEY is required/,
  );
  assert.equal(runnerCalls, 0);
});

test("production build passes only the public sitekey and redacts captured output", () => {
  const { root } = temporaryProject();
  const npmCliPath = path.join(root, "npm-cli.js");
  writeFileSync(npmCliPath, "// test placeholder\n", "utf8");
  const runtimeSecret = "turnstile-secret-canary";
  const runtimeDestination = "runtime-destination@example.com";
  const buildDestination = destinationAddress;
  let output = "";
  const invokedScripts = [];

  try {
    runProductionBuild({
      root,
      npmCliPath,
      env: {
        PUBLIC_TURNSTILE_SITE_KEY: productionSiteKey,
        TURNSTILE_SECRET: runtimeSecret,
        RFQ_TO_EMAIL: runtimeDestination,
        CI_RFQ_DESTINATION_ADDRESS: buildDestination,
        CLOUDFLARE_API_TOKEN: "cloudflare-token-canary",
      },
      runner: (command, args, options) => {
        assert.equal(command, process.execPath);
        assert.equal(args[0], npmCliPath);
        assert.equal(args[1], "run");
        assert.equal(["check:ci", "build"].includes(args[2]), true);
        invokedScripts.push(args[2]);
        assert.equal(options.env.PUBLIC_TURNSTILE_SITE_KEY, productionSiteKey);
        assert.equal(options.env.TURNSTILE_SECRET, undefined);
        assert.equal(options.env.RFQ_TO_EMAIL, undefined);
        assert.equal(options.env.CI_RFQ_DESTINATION_ADDRESS, undefined);
        assert.equal(options.env.CLOUDFLARE_API_TOKEN, undefined);

        if (args[2] === "build") {
          const rfqDirectory = path.join(root, "dist", "request-a-quote");
          mkdirSync(rfqDirectory, { recursive: true });
          writeFileSync(path.join(rfqDirectory, "index.html"), `<div>${productionSiteKey}</div>`, "utf8");
        }
        return {
          status: 0,
          stdout: `${productionSiteKey} ${runtimeSecret}\n`,
          stderr: `${runtimeDestination} ${buildDestination}\n`,
        };
      },
      stdout: { write: (value) => (output += value) },
      stderr: { write: (value) => (output += value) },
    });

    for (const canary of [productionSiteKey, runtimeSecret, runtimeDestination, buildDestination]) {
      assert.equal(output.includes(canary), false);
    }
    assert.deepEqual(invokedScripts, ["check:ci", "build"]);
    assert.match(output, /Cloudflare production build verified/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("tracked Wrangler production configuration is hidden and uses one destination placeholder", () => {
  const generatedText = buildProductionWranglerConfig(baseWranglerConfig, destinationAddress);
  const generated = JSON.parse(generatedText);

  for (const config of [generated, generated.env.production]) {
    assert.equal(config.workers_dev, false);
    assert.equal(config.preview_urls, false);
    assert.equal(Object.hasOwn(config, "route"), false);
    assert.equal(Object.hasOwn(config, "routes"), false);
  }
  assert.equal(generated.name, "xing-xu-website");
  assert.equal(generated.env.production.name, "xing-xu-website");
  assert.equal(generated.account_id, "e4aaa1d1aea8505cff4d65aa23cd0551");
  assert.equal(generated.env.production.vars.RFQ_MODE, "live");
  assert.equal(generated.env.production.vars.TURNSTILE_HOSTNAMES, "xingxufan.com");
  assert.equal(generated.env.production.vars.RFQ_FROM_EMAIL, "rfq@xingxufan.com");
  assert.equal(generated.env.production.send_email[0].destination_address, destinationAddress);
  assert.deepEqual(generated.env.production.send_email[0].allowed_sender_addresses, [
    "rfq@xingxufan.com",
  ]);
  assert.equal(baseWranglerConfig.includes(destinationAddress), false);
  assert.equal(baseWranglerConfig.includes("__RFQ_TO_EMAIL_FROM_IGNORED_CONFIG__"), true);
});

test("production configuration rejects routes and an altered email binding", () => {
  const routedConfig = JSON.parse(baseWranglerConfig);
  routedConfig.env.production.routes = [{ pattern: "xingxufan.com", custom_domain: true }];
  assert.throws(
    () => buildProductionWranglerConfig(JSON.stringify(routedConfig), destinationAddress),
    /must not define routes/,
  );

  const missingPlaceholder = JSON.parse(baseWranglerConfig);
  missingPlaceholder.env.production.send_email[0].destination_address = "already-set@example.com";
  assert.throws(
    () => buildProductionWranglerConfig(JSON.stringify(missingPlaceholder), destinationAddress),
    /email binding does not match/,
  );

  const duplicatedBinding = JSON.parse(baseWranglerConfig);
  duplicatedBinding.env.production.send_email.push({
    ...duplicatedBinding.env.production.send_email[0],
  });
  assert.throws(
    () => buildProductionWranglerConfig(JSON.stringify(duplicatedBinding), destinationAddress),
    /exactly one email binding/,
  );
});

test("generated Wrangler configuration is removed when its action throws", () => {
  const { root } = temporaryProject();
  const neighborPath = path.join(root, "keep-me.txt");
  writeFileSync(neighborPath, "keep", "utf8");

  try {
    assert.throws(
      () =>
        withGeneratedWranglerConfig(
          {
            root,
            baseConfigPath: path.join(root, "wrangler.jsonc"),
            destinationAddress,
          },
          (generatedConfigPath) => {
            assert.equal(existsSync(generatedConfigPath), true);
            throw new Error("test action failed");
          },
        ),
      /test action failed/,
    );
    assert.deepEqual(generatedConfigFiles(root), []);
    assert.equal(readFileSync(neighborPath, "utf8"), "keep");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("production deploy fixes the environment, strips secrets, redacts output and cleans files", () => {
  const { root, wranglerCliPath } = temporaryProject();
  const runtimeSecret = "turnstile-secret-canary";
  const runtimeDestination = "runtime-destination@example.com";
  const publicSiteKey = productionSiteKey;
  const apiToken = "cloudflare-token-canary";
  const apiKey = "cloudflare-api-key-canary";
  const cloudflareEmail = "ci-auth@example.com";
  let output = "";

  try {
    runProductionDeploy({
      root,
      wranglerCliPath,
      env: {
        CI_RFQ_DESTINATION_ADDRESS: destinationAddress,
        TURNSTILE_SECRET: runtimeSecret,
        RFQ_TO_EMAIL: runtimeDestination,
        PUBLIC_TURNSTILE_SITE_KEY: publicSiteKey,
        CLOUDFLARE_API_TOKEN: apiToken,
        CLOUDFLARE_API_KEY: apiKey,
        CLOUDFLARE_EMAIL: cloudflareEmail,
        CLOUDFLARE_ACCOUNT_ID: "e4aaa1d1aea8505cff4d65aa23cd0551",
        WRANGLER_CI_OVERRIDE_NAME: "xing-xu-website",
        WRANGLER_CI_MATCH_TAG: "ci-match-tag-canary",
      },
      runner: (command, args, options) => {
        assert.equal(command, process.execPath);
        assert.equal(args[0], wranglerCliPath);
        assert.deepEqual(args.slice(1, 3), ["deploy", "--config"]);
        assert.equal(args[3].startsWith(root), true);
        assert.deepEqual(args.slice(4), ["--env", "production"]);
        assert.equal(args.includes("--name"), false);
        assert.equal(options.env.CI_RFQ_DESTINATION_ADDRESS, undefined);
        assert.equal(options.env.TURNSTILE_SECRET, undefined);
        assert.equal(options.env.RFQ_TO_EMAIL, undefined);
        assert.equal(options.env.PUBLIC_TURNSTILE_SITE_KEY, undefined);
        assert.equal(options.env.CLOUDFLARE_ACCOUNT_ID, "e4aaa1d1aea8505cff4d65aa23cd0551");
        assert.equal(options.env.WRANGLER_CI_OVERRIDE_NAME, "xing-xu-website");
        assert.equal(options.env.WRANGLER_CI_MATCH_TAG, "ci-match-tag-canary");
        assert.equal(options.env.CLOUDFLARE_API_TOKEN, apiToken);
        assert.equal(options.env.CLOUDFLARE_API_KEY, apiKey);
        assert.equal(options.env.CLOUDFLARE_EMAIL, cloudflareEmail);

        const generated = JSON.parse(readFileSync(args[3], "utf8"));
        assert.equal(generated.env.production.send_email[0].destination_address, destinationAddress);
        writeFileSync(options.env.WRANGLER_LOG_PATH, destinationAddress, "utf8");
        return {
          status: 0,
          stdout: `${destinationAddress} ${runtimeSecret} ${apiToken}\n`,
          stderr: `${runtimeDestination} ${publicSiteKey} ${apiKey} ${cloudflareEmail}\n`,
        };
      },
      stdout: { write: (value) => (output += value) },
      stderr: { write: (value) => (output += value) },
    });

    for (const canary of [
      destinationAddress,
      runtimeSecret,
      runtimeDestination,
      publicSiteKey,
      apiToken,
      apiKey,
      cloudflareEmail,
    ]) {
      assert.equal(output.includes(canary), false);
    }
    assert.deepEqual(generatedConfigFiles(root), []);
    assert.deepEqual(readdirSync(path.join(root, ".wrangler", "logs")), []);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("production deploy dry-run keeps the fixed production environment and adds only --dry-run", () => {
  const { root, wranglerCliPath } = temporaryProject();
  try {
    runProductionDeploy({
      root,
      wranglerCliPath,
      dryRun: true,
      env: { CI_RFQ_DESTINATION_ADDRESS: destinationAddress },
      runner: (_command, args) => {
        assert.deepEqual(args.slice(4), ["--env", "production", "--dry-run"]);
        assert.equal(args.includes("--name"), false);
        return { status: 0, stdout: "", stderr: "" };
      },
      stdout: { write() {} },
      stderr: { write() {} },
    });
    assert.deepEqual(generatedConfigFiles(root), []);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

for (const behavior of ["nonzero", "throw"]) {
  test(`production deploy cleans generated files when Wrangler returns ${behavior}`, () => {
    const { root, wranglerCliPath } = temporaryProject();
    const neighborPath = path.join(root, "keep-me.txt");
    writeFileSync(neighborPath, "keep", "utf8");

    try {
      assert.throws(
        () =>
          runProductionDeploy({
            root,
            wranglerCliPath,
            env: { CI_RFQ_DESTINATION_ADDRESS: destinationAddress },
            runner: (_command, _args, options) => {
              writeFileSync(options.env.WRANGLER_LOG_PATH, destinationAddress, "utf8");
              if (behavior === "throw") throw new Error("runner failed");
              return { status: 1, stdout: destinationAddress, stderr: "" };
            },
            stdout: { write() {} },
            stderr: { write() {} },
          }),
        behavior === "throw" ? /runner failed/ : /Wrangler deploy failed/,
      );
      assert.deepEqual(generatedConfigFiles(root), []);
      assert.deepEqual(readdirSync(path.join(root, ".wrangler", "logs")), []);
      assert.equal(readFileSync(neighborPath, "utf8"), "keep");
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
}

test("production deploy rejects an absent or non-production destination before Wrangler starts", () => {
  let runnerCalls = 0;
  assert.throws(
    () => runProductionDeploy({ env: {}, runner: () => (runnerCalls += 1) }),
    /CI_RFQ_DESTINATION_ADDRESS is required/,
  );
  assert.throws(() => validateDestinationAddress("sales@example.invalid"), /verified production destination/);
  assert.equal(runnerCalls, 0);
});

test("production deploy rejects Workers Builds target overrides before Wrangler starts", () => {
  let runnerCalls = 0;
  assert.throws(
    () =>
      runProductionDeploy({
        env: {
          CI_RFQ_DESTINATION_ADDRESS: destinationAddress,
          WRANGLER_CI_OVERRIDE_NAME: "different-worker",
        },
        runner: () => (runnerCalls += 1),
      }),
    /different Worker name/,
  );
  assert.throws(
    () =>
      validateCiDeploymentTarget({
        CLOUDFLARE_ACCOUNT_ID: "00000000000000000000000000000000",
      }),
    /different Cloudflare account/,
  );
  assert.equal(runnerCalls, 0);
});
