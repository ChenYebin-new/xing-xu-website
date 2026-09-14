export const CUSTOMER_TYPES = ["distributor", "contractor", "manufacturer", "other"] as const;
export const PRODUCT_CATEGORIES = [
  "negative-pressure-fans",
  "axial-fans",
  "centrifugal-fans",
  "selection-help",
] as const;
export const CONTACT_PREFERENCES = ["email", "whatsapp", "either"] as const;

export type CustomerType = (typeof CUSTOMER_TYPES)[number];
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];
export type ContactPreference = (typeof CONTACT_PREFERENCES)[number];

export type RfqSubmission = {
  customerType: CustomerType;
  fullName: string;
  companyName: string;
  countryRegion: string;
  email: string;
  whatsapp: string;
  preferredContact: ContactPreference | "";
  productCategory: ProductCategory;
  productModel: string;
  replacementModel: string;
  quantity: number;
  destination: string;
  requirementSummary: string;
  application: string;
  airflow: string;
  pressure: string;
  electricalSupply: string;
  motorPower: string;
  dimensions: string;
  material: string;
  operatingMedium: string;
  deliveryDate: string;
  tradeTerm: string;
  message: string;
  sourcePage: string;
  privacyAccepted: true;
};

export type ParsedRfqRequest = {
  submission: RfqSubmission;
  turnstileToken: string;
};

export type RfqParseResult =
  | { ok: true; value: ParsedRfqRequest }
  | { ok: false; fieldErrors: Record<string, string> };

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function cleanText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function boundedText(
  source: UnknownRecord,
  field: string,
  label: string,
  errors: Record<string, string>,
  options: { required?: boolean; min?: number; max: number },
): string {
  const value = cleanText(source[field]);
  if (options.required && !value) {
    errors[field] = `${label} is required.`;
    return value;
  }
  if (value && options.min && value.length < options.min) {
    errors[field] = `${label} must contain at least ${options.min} characters.`;
  } else if (value.length > options.max) {
    errors[field] = `${label} must contain no more than ${options.max} characters.`;
  }
  return value;
}

function isOneOf<const T extends readonly string[]>(value: string, allowed: T): value is T[number] {
  return allowed.some((item) => item === value);
}

function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validWhatsApp(value: string): boolean {
  return /^[+()\d\s.-]{6,40}$/.test(value);
}

function validSourcePage(value: string): boolean {
  return value.startsWith("/") && !value.startsWith("//") && value.length <= 200;
}

export function parseRfqRequest(input: unknown): RfqParseResult {
  if (!isRecord(input)) {
    return { ok: false, fieldErrors: { form: "The request body must be a JSON object." } };
  }

  const errors: Record<string, string> = {};
  const customerTypeValue = cleanText(input.customerType);
  const productCategoryValue = cleanText(input.productCategory);
  const preferredContactValue = cleanText(input.preferredContact);

  if (!isOneOf(customerTypeValue, CUSTOMER_TYPES)) {
    errors.customerType = "Select a valid customer type.";
  }
  if (!isOneOf(productCategoryValue, PRODUCT_CATEGORIES)) {
    errors.productCategory = "Select a valid product category or selection help.";
  }
  if (preferredContactValue && !isOneOf(preferredContactValue, CONTACT_PREFERENCES)) {
    errors.preferredContact = "Select email, WhatsApp or either channel.";
  }

  const fullName = boundedText(input, "fullName", "Full name", errors, { required: true, min: 2, max: 100 });
  const companyName = boundedText(input, "companyName", "Company", errors, { required: true, min: 2, max: 140 });
  const countryRegion = boundedText(input, "countryRegion", "Country or region", errors, {
    required: true,
    min: 2,
    max: 100,
  });
  const email = boundedText(input, "email", "Email", errors, { max: 254 });
  const whatsapp = boundedText(input, "whatsapp", "WhatsApp number", errors, { max: 40 });

  if (!email && !whatsapp) {
    const message = "Provide an email address or WhatsApp number.";
    errors.email = message;
    errors.whatsapp = message;
  }
  if (email && !validEmail(email)) errors.email = "Enter a valid email address.";
  if (whatsapp && !validWhatsApp(whatsapp)) {
    errors.whatsapp = "Enter a valid WhatsApp number, including the country code when possible.";
  }

  const productModel = boundedText(input, "productModel", "Product model", errors, { max: 120 });
  const replacementModel = boundedText(input, "replacementModel", "Replacement model", errors, { max: 120 });
  const destination = boundedText(input, "destination", "Destination", errors, {
    required: true,
    min: 2,
    max: 160,
  });
  const requirementSummary = boundedText(input, "requirementSummary", "Requirement summary", errors, {
    required: true,
    min: 20,
    max: 4000,
  });

  const quantityText = cleanText(input.quantity);
  const quantity = Number(quantityText);
  if (!quantityText || !Number.isInteger(quantity) || quantity < 1 || quantity > 1_000_000) {
    errors.quantity = "Enter a whole-number quantity from 1 to 1,000,000.";
  }

  const selectionRequired = productCategoryValue === "selection-help";
  const application = boundedText(input, "application", "Application", errors, {
    required: selectionRequired,
    min: selectionRequired ? 2 : undefined,
    max: 240,
  });
  const airflow = boundedText(input, "airflow", "Airflow", errors, { max: 160 });
  const pressure = boundedText(input, "pressure", "Pressure", errors, { max: 160 });
  const electricalSupply = boundedText(input, "electricalSupply", "Electrical supply", errors, { max: 160 });
  const motorPower = boundedText(input, "motorPower", "Motor power", errors, { max: 120 });
  const dimensions = boundedText(input, "dimensions", "Dimensions or opening", errors, { max: 200 });
  const material = boundedText(input, "material", "Material", errors, { max: 160 });
  const operatingMedium = boundedText(input, "operatingMedium", "Temperature or operating medium", errors, {
    max: 240,
  });
  const deliveryDate = boundedText(input, "deliveryDate", "Required delivery date", errors, { max: 80 });
  const tradeTerm = boundedText(input, "tradeTerm", "Trade term", errors, { max: 80 });
  const message = boundedText(input, "message", "Additional message", errors, { max: 2000 });

  const sourcePageValue = cleanText(input.sourcePage) || "/request-a-quote/";
  if (!validSourcePage(sourcePageValue)) errors.sourcePage = "The source page must be a relative site path.";

  if (input.privacyAccepted !== true) {
    errors.privacyAccepted = "Acknowledge the privacy notice before submitting.";
  }

  const turnstileToken = cleanText(input.turnstileToken);
  if (!turnstileToken) {
    errors.turnstileToken = "Complete the bot-protection check.";
  } else if (turnstileToken.length > 2048) {
    errors.turnstileToken = "The bot-protection response is invalid. Refresh the check and try again.";
  }

  if (Object.keys(errors).length > 0) return { ok: false, fieldErrors: errors };

  return {
    ok: true,
    value: {
      submission: {
        customerType: customerTypeValue as CustomerType,
        fullName,
        companyName,
        countryRegion,
        email,
        whatsapp,
        preferredContact: preferredContactValue as ContactPreference | "",
        productCategory: productCategoryValue as ProductCategory,
        productModel,
        replacementModel,
        quantity,
        destination,
        requirementSummary,
        application,
        airflow,
        pressure,
        electricalSupply,
        motorPower,
        dimensions,
        material,
        operatingMedium,
        deliveryDate,
        tradeTerm,
        message,
        sourcePage: sourcePageValue,
        privacyAccepted: true,
      },
      turnstileToken,
    },
  };
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character] ?? character;
  });
}

function display(value: string): string {
  return value || "Not provided";
}

export function formatRfqEmail(submission: RfqSubmission, submittedAt: string, requestId: string) {
  const groups = [
    {
      title: "Buyer and contact",
      rows: [
        ["Customer type", submission.customerType],
        ["Full name", submission.fullName],
        ["Company", submission.companyName],
        ["Country or region", submission.countryRegion],
        ["Email", display(submission.email)],
        ["WhatsApp", display(submission.whatsapp)],
        ["Preferred contact", display(submission.preferredContact)],
      ],
    },
    {
      title: "Product and delivery",
      rows: [
        ["Product category", submission.productCategory],
        ["Product model", display(submission.productModel)],
        ["Replacement model", display(submission.replacementModel)],
        ["Quantity", String(submission.quantity)],
        ["Destination", submission.destination],
        ["Required delivery date", display(submission.deliveryDate)],
        ["Trade term", display(submission.tradeTerm)],
      ],
    },
    {
      title: "Technical requirement",
      rows: [
        ["Summary", submission.requirementSummary],
        ["Application", display(submission.application)],
        ["Airflow", display(submission.airflow)],
        ["Pressure", display(submission.pressure)],
        ["Electrical supply", display(submission.electricalSupply)],
        ["Motor power", display(submission.motorPower)],
        ["Dimensions or opening", display(submission.dimensions)],
        ["Material", display(submission.material)],
        ["Temperature or medium", display(submission.operatingMedium)],
        ["Additional message", display(submission.message)],
      ],
    },
    {
      title: "Request record",
      rows: [
        ["Source page", submission.sourcePage],
        ["Submitted at", submittedAt],
        ["Request ID", requestId],
      ],
    },
  ] as const;

  const text = groups
    .map((group) => `${group.title}\n${group.rows.map(([label, value]) => `${label}: ${value}`).join("\n")}`)
    .join("\n\n");
  const html = groups
    .map(
      (group) =>
        `<h2>${escapeHtml(group.title)}</h2><table role="presentation" cellspacing="0" cellpadding="6">${group.rows
          .map(
            ([label, value]) =>
              `<tr><th align="left" valign="top">${escapeHtml(label)}</th><td>${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`,
          )
          .join("")}</table>`,
    )
    .join("");

  return {
    subject: `[Website RFQ] ${submission.productCategory} — ${submission.companyName}`,
    text,
    html: `<main><h1>New website RFQ</h1>${html}</main>`,
    replyTo: submission.email || undefined,
  };
}
