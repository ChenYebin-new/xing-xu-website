import type { ImageMetadata } from "astro";

import axialFanConcept from "../assets/concept-products/axial-fan-concept.png";
import centrifugalFanConcept from "../assets/concept-products/centrifugal-fan-concept.png";
import negativePressureFanConcept from "../assets/concept-products/negative-pressure-fan-concept.png";
import whatsAppQrImage from "../assets/contact/leochen-whatsapp-qr.jpg";

export type ProductCategory = {
  slug: "negative-pressure-fans" | "axial-fans" | "centrifugal-fans";
  name: string;
  summary: string;
  selectionInputs: readonly string[];
  definition: string;
  useCase: string;
  selectionDetails: readonly {
    label: string;
    detail: string;
  }[];
  suitableWhen: readonly string[];
  notSuitableWhen: readonly string[];
  conceptImage: ImageMetadata;
  conceptAlt: string;
};

export type ProductRecord = {
  slug: string;
  category: ProductCategory["slug"];
  productName: string;
  model: string;
  published: boolean;
  verifiedAt: string;
  publicFacts: Readonly<Record<string, string>>;
};

export type AudiencePath = {
  id: "distributor" | "contractor" | "manufacturer";
  slug: "distributors" | "contractors" | "manufacturers";
  label: string;
  shortLabel: string;
  pageTitle: string;
  promise: string;
  needs: readonly string[];
  supportAreas: readonly {
    title: string;
    detail: string;
  }[];
  workflow: readonly string[];
  boundary: string;
  inquiryLabel: string;
};

export type EvidenceSlot = {
  id: "storefront" | "warehouse" | "product" | "nameplate";
  label: string;
  replacementNote: string;
};

export type ContactChannel =
  | { name: "WhatsApp" | "Facebook" | "Gmail" | "WeChat"; status: "details-pending" }
  | { name: "Gmail"; status: "active"; kind: "email"; address: string; href: string }
  | { name: "WhatsApp"; status: "active"; kind: "qr"; image: ImageMetadata; href: string };

export type DownloadResource = {
  title: string;
  kind: "catalogue" | "drawing" | "datasheet";
  href: string;
  published: boolean;
};

export const productCategories = [
  {
    slug: "negative-pressure-fans",
    name: "Negative Pressure Fans",
    summary: "A category starting point for large-space ventilation inquiries.",
    selectionInputs: ["Required airflow", "Installation opening", "Electrical supply"],
    definition:
      "A square-framed exhaust fan category used to discuss air replacement for larger enclosed spaces. Selection has to consider both the exhaust opening and the path for replacement air.",
    useCase:
      "Begin here when the requirement is to move air out of a workshop, warehouse, agricultural building or another large enclosure and the project team can describe the space and installation opening.",
    selectionDetails: [
      {
        label: "Air change objective",
        detail: "Share the space dimensions, heat or contaminant concern and the required airflow if it is already known.",
      },
      {
        label: "Opening and mounting",
        detail: "Provide the available wall opening, mounting position and any shutter, guard or weather-exposure constraints.",
      },
      {
        label: "Electrical conditions",
        detail: "Confirm voltage, phase and frequency at the installation site before a candidate fan is discussed.",
      },
      {
        label: "Replacement air",
        detail: "Explain where makeup air enters so the ventilation path can be reviewed rather than treating the fan in isolation.",
      },
    ],
    suitableWhen: [
      "The exhaust location and available installation opening are known.",
      "The project can provide a target airflow or enough room information to begin selection.",
      "The intake path for replacement air can be considered with the exhaust point.",
    ],
    notSuitableWhen: [
      "A complete building ventilation design or local-code approval is expected from a fan quotation.",
      "The process air is hazardous, corrosive or unusually hot and the operating medium has not been defined.",
      "A guaranteed result is requested without confirmed site, duct and electrical information.",
    ],
    conceptImage: negativePressureFanConcept,
    conceptAlt: "Generated concept image of a square negative-pressure fan",
  },
  {
    slug: "axial-fans",
    name: "Axial Fans",
    summary: "A category starting point for straight-through airflow requirements.",
    selectionInputs: ["Airflow and resistance", "Duct or free-air use", "Mounting constraints"],
    definition:
      "A fan category where air generally travels along the axis of the impeller. The same broad form can be used in very different systems, so size alone is not enough for selection.",
    useCase:
      "Begin here for duct, wall or equipment airflow discussions where the airflow path is broadly straight and the project can identify the resistance the fan must work against.",
    selectionDetails: [
      {
        label: "Duty point",
        detail: "Provide required airflow together with static or total pressure whenever those values are available.",
      },
      {
        label: "Air path",
        detail: "Clarify whether the fan works in free air, a short duct, a longer duct system or inside equipment.",
      },
      {
        label: "Mounting envelope",
        detail: "Share duct diameter, available length, flange or bracket arrangement and access limits.",
      },
      {
        label: "Operating conditions",
        detail: "Confirm voltage, phase, frequency, temperature, medium and indoor or outdoor exposure.",
      },
    ],
    suitableWhen: [
      "The airflow direction, duct arrangement and installation envelope can be described.",
      "The project can state system resistance or provide enough information for it to be discussed.",
      "Electrical and environmental conditions are available before quotation.",
    ],
    notSuitableWhen: [
      "High resistance is assumed but no pressure requirement or system information is available.",
      "Hazardous-area, smoke-control or other regulated duty is required without verified documentation.",
      "The fan is expected to replace engineering review of the complete air system.",
    ],
    conceptImage: axialFanConcept,
    conceptAlt: "Generated concept image of a cylindrical axial fan",
  },
  {
    slug: "centrifugal-fans",
    name: "Centrifugal Fans",
    summary: "A category starting point for applications where pressure matters.",
    selectionInputs: ["Airflow and pressure", "Operating medium", "Temperature and material"],
    definition:
      "A fan category that turns the airflow through a housing and is commonly considered when system resistance is an important part of the duty. Impeller and material choices depend on the actual medium and operating point.",
    useCase:
      "Begin here for process exhaust, equipment or duct-system discussions where both airflow and pressure need to be stated and the handled air can be described.",
    selectionDetails: [
      {
        label: "Airflow and pressure",
        detail: "Share one required operating point and identify whether the pressure value is static or total.",
      },
      {
        label: "Handled medium",
        detail: "Describe clean air, dust, moisture, fumes or other contents without assuming a general-purpose construction is suitable.",
      },
      {
        label: "Temperature and material",
        detail: "Provide normal and maximum temperature plus any corrosion, abrasion or hygiene constraints.",
      },
      {
        label: "Arrangement",
        detail: "Share inlet and outlet orientation, drive preference, space limits, electrical supply and service-access needs.",
      },
    ],
    suitableWhen: [
      "The required airflow and pressure can be stated together.",
      "The operating medium, temperature and material constraints are understood.",
      "The equipment or duct arrangement provides a defined installation envelope.",
    ],
    notSuitableWhen: [
      "Only a motor power or outlet size is supplied with no operating duty.",
      "Combustible, corrosive or regulated service is proposed without a complete technical review.",
      "A performance guarantee is requested before the system resistance and configuration are confirmed.",
    ],
    conceptImage: centrifugalFanConcept,
    conceptAlt: "Generated concept image of a centrifugal fan",
  },
] as const satisfies readonly ProductCategory[];

export const productRecords: readonly ProductRecord[] = [];

export const audiencePaths = [
  {
    id: "distributor",
    slug: "distributors",
    label: "Distributors",
    shortLabel: "Distributor",
    pageTitle: "Fan Supply Support for Distributors",
    promise: "Start with product coverage, repeat purchasing needs, packaging and destination.",
    needs: ["Categories or models of interest", "Expected quantity", "Destination and timing"],
    supportAreas: [
      {
        title: "Product coverage",
        detail: "Begin with negative-pressure, axial and centrifugal fan requirements. Specific models are only presented after their records are approved for publication.",
      },
      {
        title: "Cross-brand sourcing",
        detail: "Use the requested duty, reference model or purchasing brief to coordinate suitable available supply options without implying a single factory source.",
      },
      {
        title: "Packaging and logistics",
        detail: "Include quantity, packing constraints, destination city or port and timing in the quotation discussion.",
      },
    ],
    workflow: [
      "Share the categories, reference models or required duty.",
      "Confirm quantity, destination and timing for the inquiry.",
      "Review candidate supply information and identify any missing technical data.",
      "Confirm quotation scope, packaging requirements and logistics coordination.",
    ],
    boundary:
      "Sample terms, exclusivity, channel policy, stock status, lead time and commercial commitments are only stated in a specific approved quotation.",
    inquiryLabel: "Start a distributor inquiry",
  },
  {
    id: "contractor",
    slug: "contractors",
    label: "Engineering Contractors",
    shortLabel: "Contractor",
    pageTitle: "Selection Inputs for Project Teams",
    promise: "Share the operating conditions so the selection discussion starts with the right inputs.",
    needs: ["Application and airflow", "Pressure or duct resistance", "Electrical and site conditions"],
    supportAreas: [
      {
        title: "Operating requirements",
        detail: "Bring the application, airflow, pressure or duct resistance and the handled medium into the first discussion.",
      },
      {
        title: "Interfaces and documents",
        detail: "Identify the dimensions, drawings and product records required for project review; availability is confirmed per candidate product.",
      },
      {
        title: "Quotation coordination",
        detail: "Connect the technical brief with quantity, destination and required timing so commercial scope is clear.",
      },
    ],
    workflow: [
      "Describe the application and required duty.",
      "Share duct, mounting, electrical and environmental constraints.",
      "Review candidate category or product information and unresolved questions.",
      "Request a quotation after the selection inputs are sufficiently defined.",
    ],
    boundary:
      "Final system design, local standards, safety classification and engineering approval remain with the project’s qualified professional parties.",
    inquiryLabel: "Start a project RFQ",
  },
  {
    id: "manufacturer",
    slug: "manufacturers",
    label: "Equipment Manufacturers",
    shortLabel: "Equipment manufacturer",
    pageTitle: "Fan Sourcing for Equipment Integration",
    promise: "Describe the integration envelope and purchasing requirement before discussing a candidate fan.",
    needs: ["Dimensions and interface", "Electrical requirement", "Batch quantity and destination"],
    supportAreas: [
      {
        title: "Integration envelope",
        detail: "Share dimensional limits, inlet and outlet interfaces, mounting position and service-access requirements.",
      },
      {
        title: "Electrical and operating duty",
        detail: "Define voltage, phase, frequency, airflow, pressure, medium and operating temperature for the equipment.",
      },
      {
        title: "Purchasing requirement",
        detail: "State sample or batch quantity, destination, timing and the records needed to evaluate repeat purchasing.",
      },
    ],
    workflow: [
      "Provide the operating duty and physical integration envelope.",
      "Identify electrical, environmental and documentation requirements.",
      "Review available candidate information and any remaining gaps.",
      "Confirm sample or batch quotation scope, destination and timing.",
    ],
    boundary:
      "OEM, private-label, custom engineering, batch consistency and change-control commitments are not assumed; they require documented confirmation for the selected supply option.",
    inquiryLabel: "Start an integration inquiry",
  },
] as const satisfies readonly AudiencePath[];

export const evidenceSlots = [
  { id: "storefront", label: "Storefront", replacementNote: "Approved storefront photo required" },
  { id: "warehouse", label: "Warehouse", replacementNote: "Approved warehouse photo required" },
  { id: "product", label: "Product", replacementNote: "Approved product photo required" },
  { id: "nameplate", label: "Nameplate", replacementNote: "Readable nameplate photo required" },
] as const satisfies readonly EvidenceSlot[];

export const capabilities = [
  { title: "Selection Advice", detail: "Turn operating requirements into a clearer product discussion." },
  { title: "Cross-Brand Sourcing", detail: "Coordinate suitable supply options across available brands." },
  {
    title: "Export Packaging & Logistics Coordination",
    detail: "Plan packaging and destination details as part of the quotation process.",
  },
] as const;

export const emailContact = {
  name: "Gmail",
  status: "active",
  kind: "email",
  address: "leochen7531@gmail.com",
  href: "mailto:leochen7531@gmail.com",
} as const satisfies ContactChannel;

export const whatsAppContact = {
  name: "WhatsApp",
  status: "active",
  kind: "qr",
  image: whatsAppQrImage,
  href: "/contact/#whatsapp",
} as const satisfies ContactChannel;

export const contactChannels = [
  whatsAppContact,
  { name: "Facebook", status: "details-pending" },
  emailContact,
  { name: "WeChat", status: "details-pending" },
] as const satisfies readonly ContactChannel[];

export const downloadResources: readonly DownloadResource[] = [];

export const publicationChecklist = [
  "Approved storefront, warehouse, product and readable nameplate photographs",
  "Authorized public address and contact details for each released channel",
  "Verified product model, image, core specification and publication approval",
  "Confirmed packaging, MOQ, lead-time and warranty terms where they are shown",
] as const;
