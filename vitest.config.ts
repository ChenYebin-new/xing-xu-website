import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // These tests inject their own RFQ runtime; never load private .dev.vars or remote bindings.
  plugins: [cloudflareTest({
    remoteBindings: false,
    miniflare: {
      compatibilityDate: "2026-09-13",
      compatibilityFlags: ["nodejs_compat"],
    },
  })],
  test: {
    include: ["test/**/*.spec.ts"],
  },
});
