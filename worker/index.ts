import { formatRfqEmail, parseRfqRequest, type RfqSubmission } from "../src/lib/rfq";

const MAX_BODY_BYTES = 32 * 1024;
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TURNSTILE_ACTION = "rfq";

export type OutboundEmail = {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

export type RfqRuntime = {
  deliveryMode: string;
  turnstileSecret: string;
  allowedHostnames: string;
  fromEmail: string;
  toEmail: string;
  sendEmail: (message: OutboundEmail) => Promise<unknown>;
  fetcher?: typeof fetch;
  now?: () => Date;
  randomId?: () => string;
};

type TurnstileResult = {
  success?: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
  metadata?: {
    result_with_testing_key?: boolean;
  };
};

type ApiErrorBody = {
  ok: false;
  code: string;
  message: string;
  requestId: string;
  fieldErrors?: Record<string, string>;
};

class RequestBodyError extends Error {
  constructor(
    readonly code: "invalid_json" | "payload_too_large",
    message: string,
  ) {
    super(message);
  }
}

function jsonResponse(body: unknown, status: number, extraHeaders: HeadersInit = {}): Response {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8",
      ...extraHeaders,
    },
  });
}

function apiError(
  status: number,
  code: string,
  message: string,
  requestId: string,
  fieldErrors?: Record<string, string>,
): Response {
  const body: ApiErrorBody = { ok: false, code, message, requestId };
  if (fieldErrors) body.fieldErrors = fieldErrors;
  return jsonResponse(body, status);
}

async function readBoundedJson(request: Request): Promise<unknown> {
  const declaredLength = Number(request.headers.get("Content-Length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    throw new RequestBodyError("payload_too_large", "The inquiry is larger than the 32 KB request limit.");
  }
  if (!request.body) throw new RequestBodyError("invalid_json", "The request body is missing.");

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_BODY_BYTES) {
      await reader.cancel("RFQ request exceeded the body-size limit.");
      throw new RequestBodyError("payload_too_large", "The inquiry is larger than the 32 KB request limit.");
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new RequestBodyError("invalid_json", "The request body is not valid JSON.");
  }
}

function configuredEmail(value: string, allowLocalTest = false): boolean {
  const normalized = value.toLowerCase();
  const validShape = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  if (!validShape || normalized.endsWith(".invalid")) return false;
  return allowLocalTest || !normalized.endsWith(".test");
}

function allowedHostnameSet(value: string): Set<string> {
  return new Set(
    value
      .split(",")
      .map((hostname) => hostname.trim().toLowerCase())
      .filter(Boolean),
  );
}

function isProductionHostname(hostname: string): boolean {
  return (
    hostname.includes(".") &&
    hostname !== "127.0.0.1" &&
    hostname !== "::1" &&
    hostname !== "[::1]" &&
    hostname !== "localhost" &&
    !hostname.endsWith(".localhost") &&
    !hostname.endsWith(".test") &&
    !hostname.endsWith(".invalid")
  );
}

function createRequestId(runtime: RfqRuntime): string {
  return runtime.randomId ? runtime.randomId() : crypto.randomUUID();
}

function hasValidConfiguration(runtime: RfqRuntime): boolean {
  const hostnames = allowedHostnameSet(runtime.allowedHostnames);
  if (!runtime.turnstileSecret || hostnames.size === 0) return false;

  if (runtime.deliveryMode === "local-test") {
    const localOnly = [...hostnames].every((hostname) => hostname === "localhost" || hostname === "127.0.0.1");
    return localOnly && configuredEmail(runtime.fromEmail, true) && configuredEmail(runtime.toEmail, true);
  }

  if (runtime.deliveryMode === "live") {
    const productionOnly = [...hostnames].every(isProductionHostname);
    return productionOnly && configuredEmail(runtime.fromEmail) && configuredEmail(runtime.toEmail);
  }

  return false;
}

async function verifyTurnstile(
  token: string,
  request: Request,
  runtime: RfqRuntime,
): Promise<{ ok: true } | { ok: false; unavailable: boolean }> {
  const body = new URLSearchParams({
    secret: runtime.turnstileSecret,
    response: token,
    idempotency_key: createRequestId(runtime),
  });
  const remoteIp = request.headers.get("CF-Connecting-IP");
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const response = await (runtime.fetcher ?? fetch)(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return { ok: false, unavailable: true };

    const result = (await response.json()) as TurnstileResult;
    const hostname = result.hostname?.toLowerCase() ?? "";
    const markedTestingResult = result.metadata?.result_with_testing_key === true;
    const validProductionResult =
      runtime.deliveryMode === "live" &&
      result.success === true &&
      !markedTestingResult &&
      result.action === TURNSTILE_ACTION &&
      allowedHostnameSet(runtime.allowedHostnames).has(hostname);
    const validLocalTestResult =
      runtime.deliveryMode === "local-test" &&
      result.success === true &&
      markedTestingResult &&
      hostname === "example.com";

    return validProductionResult || validLocalTestResult
      ? { ok: true }
      : { ok: false, unavailable: false };
  } catch {
    return { ok: false, unavailable: true };
  }
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("Origin");
  return !origin || origin === new URL(request.url).origin;
}

function buildOutboundEmail(
  submission: RfqSubmission,
  runtime: RfqRuntime,
  submittedAt: string,
  requestId: string,
): OutboundEmail {
  const formatted = formatRfqEmail(submission, submittedAt, requestId);
  return {
    to: runtime.toEmail,
    from: runtime.fromEmail,
    subject: formatted.subject,
    text: formatted.text,
    html: formatted.html,
    ...(formatted.replyTo ? { replyTo: formatted.replyTo } : {}),
  };
}

export async function handleRfqRequest(request: Request, runtime: RfqRuntime): Promise<Response> {
  const requestId = createRequestId(runtime);

  if (request.method !== "POST") {
    const response = apiError(405, "method_not_allowed", "Use POST to submit an inquiry.", requestId);
    response.headers.set("Allow", "POST");
    return response;
  }
  if (!isSameOrigin(request)) {
    return apiError(403, "origin_rejected", "Submit the form from this website.", requestId);
  }
  const contentType = request.headers.get("Content-Type")?.toLowerCase() ?? "";
  if (!contentType.includes("application/json")) {
    return apiError(415, "unsupported_media_type", "Submit the inquiry as JSON.", requestId);
  }

  let input: unknown;
  try {
    input = await readBoundedJson(request);
  } catch (error) {
    if (error instanceof RequestBodyError) {
      const status = error.code === "payload_too_large" ? 413 : 400;
      return apiError(status, error.code, error.message, requestId);
    }
    return apiError(400, "invalid_request", "The inquiry could not be read.", requestId);
  }

  const parsed = parseRfqRequest(input);
  if (!parsed.ok) {
    console.info({ event: "rfq_rejected", requestId, reason: "validation", fields: Object.keys(parsed.fieldErrors) });
    return apiError(
      422,
      "validation_failed",
      "Review the highlighted fields and submit again.",
      requestId,
      parsed.fieldErrors,
    );
  }

  if (!hasValidConfiguration(runtime)) {
    console.warn({ event: "rfq_rejected", requestId, reason: "configuration" });
    return apiError(
      503,
      "configuration_required",
      "Inquiry delivery is not configured yet. Your entries remain in this form; please try again after setup is complete.",
      requestId,
    );
  }

  const turnstile = await verifyTurnstile(parsed.value.turnstileToken, request, runtime);
  if (!turnstile.ok) {
    const message = turnstile.unavailable
      ? "Bot protection is temporarily unavailable. Refresh the check and try again."
      : "The bot-protection check expired or could not be verified. Complete it again and resubmit.";
    console.warn({ event: "rfq_rejected", requestId, reason: turnstile.unavailable ? "turnstile_unavailable" : "turnstile" });
    return apiError(turnstile.unavailable ? 503 : 400, turnstile.unavailable ? "turnstile_unavailable" : "turnstile_failed", message, requestId, {
      turnstileToken: message,
    });
  }

  const submittedAt = (runtime.now ?? (() => new Date()))().toISOString();
  const email = buildOutboundEmail(parsed.value.submission, runtime, submittedAt, requestId);

  try {
    await runtime.sendEmail(email);
  } catch {
    console.error({ event: "rfq_delivery", requestId, status: "failed" });
    return apiError(
      502,
      "delivery_failed",
      "The inquiry could not be delivered. Your entries remain in this form; please try again later.",
      requestId,
    );
  }

  console.info({
    event: "rfq_delivery",
    requestId,
    status: "sent",
    sourcePage: parsed.value.submission.sourcePage,
    productCategory: parsed.value.submission.productCategory,
  });
  return jsonResponse({ ok: true, requestId, submittedAt }, 201);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/rfq") {
      return handleRfqRequest(request, {
        deliveryMode: env.RFQ_MODE,
        turnstileSecret: env.TURNSTILE_SECRET,
        allowedHostnames: env.TURNSTILE_HOSTNAMES,
        fromEmail: env.RFQ_FROM_EMAIL,
        toEmail: env.RFQ_TO_EMAIL,
        sendEmail: (message) => env.RFQ_EMAIL.send(message),
      });
    }
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
