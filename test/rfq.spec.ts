import { describe, expect, it } from "vitest";

import { formatRfqEmail, parseRfqRequest } from "../src/lib/rfq";
import { handleRfqRequest, type OutboundEmail, type RfqRuntime } from "../worker/index";

function validPayload(overrides: Record<string, unknown> = {}) {
  return {
    customerType: "contractor",
    fullName: "Amina Santos",
    companyName: "Example Engineering",
    countryRegion: "Philippines",
    email: "amina@example.com",
    whatsapp: "",
    preferredContact: "email",
    productCategory: "axial-fans",
    productModel: "",
    replacementModel: "",
    quantity: "12",
    destination: "Manila port",
    requirementSummary: "Ventilation fan for a workshop exhaust system.",
    application: "",
    airflow: "",
    pressure: "",
    electricalSupply: "",
    motorPower: "",
    dimensions: "",
    material: "",
    operatingMedium: "",
    deliveryDate: "Q4 2026",
    tradeTerm: "CIF",
    message: "Please review the available category.",
    sourcePage: "/request-a-quote/",
    privacyAccepted: true,
    turnstileToken: "test-token",
    ...overrides,
  };
}

function requestFor(payload: unknown, origin = "https://example.com") {
  return new Request("https://example.com/api/rfq", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: origin },
    body: JSON.stringify(payload),
  });
}

function runtime(overrides: Partial<RfqRuntime> = {}) {
  const sent: OutboundEmail[] = [];
  const base: RfqRuntime = {
    deliveryMode: "live",
    turnstileSecret: "production-secret",
    allowedHostnames: "example.com,www.example.com",
    fromEmail: "rfq@example.com",
    toEmail: "sales@example.com",
    fetcher: async () => Response.json({ success: true, action: "rfq", hostname: "example.com" }),
    sendEmail: async (message) => {
      sent.push(message);
    },
    now: () => new Date("2026-09-13T12:00:00.000Z"),
    randomId: () => "request-test-id",
    ...overrides,
  };
  return { runtime: base, sent };
}

describe("RFQ validation", () => {
  it("accepts a bounded, complete inquiry", () => {
    const result = parseRfqRequest(validPayload());
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.submission.quantity).toBe(12);
  });

  it("requires at least one reply channel", () => {
    const result = parseRfqRequest(validPayload({ email: "", whatsapp: "" }));
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.fieldErrors.email).toContain("email address or WhatsApp");
      expect(result.fieldErrors.whatsapp).toContain("email address or WhatsApp");
    }
  });

  it("requires the application only when selection help is requested", () => {
    const result = parseRfqRequest(validPayload({ productCategory: "selection-help", application: "" }));
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.fieldErrors.application).toBe("Application is required.");
  });

  it("rejects an overlong Turnstile token and unsafe source path", () => {
    const result = parseRfqRequest(validPayload({ turnstileToken: "x".repeat(2049), sourcePage: "https://bad.example" }));
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.fieldErrors.turnstileToken).toContain("invalid");
      expect(result.fieldErrors.sourcePage).toContain("relative site path");
    }
  });
});

describe("RFQ email formatting", () => {
  it("groups the submission and escapes user-provided HTML", () => {
    const parsed = parseRfqRequest(validPayload({ companyName: "A & B <Fans>" }));
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    const email = formatRfqEmail(parsed.value.submission, "2026-09-13T12:00:00.000Z", "request-test-id");
    expect(email.text).toContain("Buyer and contact");
    expect(email.text).toContain("Request ID: request-test-id");
    expect(email.html).toContain("A &amp; B &lt;Fans&gt;");
    expect(email.html).not.toContain("A & B <Fans>");
  });
});

describe("RFQ Worker boundary", () => {
  it("rejects cross-origin submission before reading inquiry data", async () => {
    const setup = runtime();
    const response = await handleRfqRequest(requestFor(validPayload(), "https://attacker.example"), setup.runtime);
    expect(response.status).toBe(403);
    expect(setup.sent).toHaveLength(0);
  });

  it("fails closed when real email configuration is absent", async () => {
    let verificationCalls = 0;
    const setup = runtime({
      fromEmail: "pending@example.invalid",
      toEmail: "pending@example.invalid",
      fetcher: async () => {
        verificationCalls += 1;
        return Response.json({ success: true, action: "rfq", hostname: "example.com" });
      },
    });
    const response = await handleRfqRequest(requestFor(validPayload()), setup.runtime);
    expect(response.status).toBe(503);
    expect((await response.json()).code).toBe("configuration_required");
    expect(verificationCalls).toBe(0);
    expect(setup.sent).toHaveLength(0);
  });

  it.each(["preview.example.test", "preview.example.invalid"])(
    "rejects non-production live hostname configuration: %s",
    async (hostname) => {
      let verificationCalls = 0;
      const setup = runtime({
        allowedHostnames: hostname,
        fetcher: async () => {
          verificationCalls += 1;
          return Response.json({ success: true, action: "rfq", hostname });
        },
      });
      const response = await handleRfqRequest(requestFor(validPayload()), setup.runtime);
      expect(response.status).toBe(503);
      expect((await response.json()).code).toBe("configuration_required");
      expect(verificationCalls).toBe(0);
      expect(setup.sent).toHaveLength(0);
    },
  );

  it("rejects a failed, expired or mismatched Turnstile result", async () => {
    const setup = runtime({
      fetcher: async () => Response.json({ success: true, action: "rfq", hostname: "other.example" }),
    });
    const response = await handleRfqRequest(requestFor(validPayload()), setup.runtime);
    expect(response.status).toBe(400);
    expect((await response.json()).code).toBe("turnstile_failed");
    expect(setup.sent).toHaveLength(0);
  });

  it("accepts Cloudflare's marked test response only in local-test mode", async () => {
    const setup = runtime({
      deliveryMode: "local-test",
      allowedHostnames: "localhost,127.0.0.1",
      fromEmail: "rfq@local.test",
      toEmail: "sales@local.test",
      fetcher: async () =>
        Response.json({ success: true, hostname: "example.com", metadata: { result_with_testing_key: true } }),
    });
    const response = await handleRfqRequest(requestFor(validPayload()), setup.runtime);
    expect(response.status).toBe(201);
    expect(setup.sent).toHaveLength(1);
  });

  it("rejects an unmarked Turnstile response in local-test mode", async () => {
    const setup = runtime({
      deliveryMode: "local-test",
      allowedHostnames: "localhost,127.0.0.1",
      fromEmail: "rfq@local.test",
      toEmail: "sales@local.test",
      fetcher: async () => Response.json({ success: true, action: "rfq", hostname: "localhost" }),
    });
    const response = await handleRfqRequest(requestFor(validPayload()), setup.runtime);
    expect(response.status).toBe(400);
    expect((await response.json()).code).toBe("turnstile_failed");
    expect(setup.sent).toHaveLength(0);
  });

  it("rejects a testing-key response in live mode", async () => {
    const setup = runtime({
      fetcher: async () =>
        Response.json({
          success: true,
          action: "rfq",
          hostname: "example.com",
          metadata: { result_with_testing_key: true },
        }),
    });
    const response = await handleRfqRequest(requestFor(validPayload()), setup.runtime);
    expect(response.status).toBe(400);
    expect((await response.json()).code).toBe("turnstile_failed");
    expect(setup.sent).toHaveLength(0);
  });

  it("sends exactly one grouped email after validation and Turnstile verification", async () => {
    const setup = runtime();
    const response = await handleRfqRequest(requestFor(validPayload()), setup.runtime);
    const result = await response.json();
    expect(response.status).toBe(201);
    expect(result).toMatchObject({ ok: true, requestId: "request-test-id" });
    expect(setup.sent).toHaveLength(1);
    expect(setup.sent[0]).toMatchObject({
      from: "rfq@example.com",
      to: "sales@example.com",
      replyTo: "amina@example.com",
    });
    expect(setup.sent[0].text).toContain("Source page: /request-a-quote/");
    expect(setup.sent[0].text).not.toContain("test-token");
  });

  it("uses the Workers crypto API when no deterministic test ID is provided", async () => {
    const setup = runtime();
    delete setup.runtime.randomId;
    const response = await handleRfqRequest(requestFor(validPayload()), setup.runtime);
    expect(response.status).toBe(201);
    expect((await response.json()).requestId).toMatch(/^[0-9a-f-]{36}$/);
  });

  it("does not deliver twice when Siteverify marks a reused token as invalid", async () => {
    let verificationCount = 0;
    const setup = runtime({
      fetcher: async () => {
        verificationCount += 1;
        return verificationCount === 1
          ? Response.json({ success: true, action: "rfq", hostname: "example.com" })
          : Response.json({ success: false, "error-codes": ["timeout-or-duplicate"] });
      },
    });
    const first = await handleRfqRequest(requestFor(validPayload()), setup.runtime);
    const duplicate = await handleRfqRequest(requestFor(validPayload()), setup.runtime);
    expect(first.status).toBe(201);
    expect(duplicate.status).toBe(400);
    expect(setup.sent).toHaveLength(1);
  });

  it("reports email-provider failure without claiming success", async () => {
    const setup = runtime({
      sendEmail: async () => {
        throw new Error("provider unavailable");
      },
    });
    const response = await handleRfqRequest(requestFor(validPayload()), setup.runtime);
    expect(response.status).toBe(502);
    expect((await response.json()).code).toBe("delivery_failed");
  });

  it("rejects requests larger than the body limit", async () => {
    const setup = runtime();
    const request = new Request("https://example.com/api/rfq", {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: "https://example.com" },
      body: JSON.stringify(validPayload({ message: "x".repeat(34_000) })),
    });
    const response = await handleRfqRequest(request, setup.runtime);
    expect(response.status).toBe(413);
    expect((await response.json()).code).toBe("payload_too_large");
  });
});
