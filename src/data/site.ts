import type { ImageMetadata } from "astro";

import axialFanConcept from "../assets/concept-products/axial-fan-concept.png";
import centrifugalFanConcept from "../assets/concept-products/centrifugal-fan-concept.png";
import negativePressureFanConcept from "../assets/concept-products/negative-pressure-fan-concept.png";

export type ProductCategory = {
  slug: "negative-pressure-fans" | "axial-fans" | "centrifugal-fans";
  name: string;
  summary: string;
  selectionInputs: readonly string[];
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
  label: string;
  shortLabel: string;
  promise: string;
  needs: readonly string[];
  inquiryLabel: string;
};

export type EvidenceSlot = {
  id: "storefront" | "warehouse" | "product" | "nameplate";
  label: string;
  replacementNote: string;
};

export type ContactChannel = {
  name: "WhatsApp" | "Facebook" | "Gmail" | "WeChat";
  status: "details-pending";
};

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
    conceptImage: negativePressureFanConcept,
    conceptAlt: "Generated concept image of a square negative-pressure fan",
  },
  {
    slug: "axial-fans",
    name: "Axial Fans",
    summary: "A category starting point for straight-through airflow requirements.",
    selectionInputs: ["Airflow and resistance", "Duct or free-air use", "Mounting constraints"],
    conceptImage: axialFanConcept,
    conceptAlt: "Generated concept image of a cylindrical axial fan",
  },
  {
    slug: "centrifugal-fans",
    name: "Centrifugal Fans",
    summary: "A category starting point for applications where pressure matters.",
    selectionInputs: ["Airflow and pressure", "Operating medium", "Temperature and material"],
    conceptImage: centrifugalFanConcept,
    conceptAlt: "Generated concept image of a centrifugal fan",
  },
] as const satisfies readonly ProductCategory[];

export const productRecords = [] as const satisfies readonly ProductRecord[];

export const audiencePaths = [
  {
    id: "distributor",
    label: "Distributors",
    shortLabel: "Distributor",
    promise: "Start with product coverage, repeat purchasing needs, packaging and destination.",
    needs: ["Categories or models of interest", "Expected quantity", "Destination and timing"],
    inquiryLabel: "Start a distributor inquiry",
  },
  {
    id: "contractor",
    label: "Engineering Contractors",
    shortLabel: "Contractor",
    promise: "Share the operating conditions so the selection discussion starts with the right inputs.",
    needs: ["Application and airflow", "Pressure or duct resistance", "Electrical and site conditions"],
    inquiryLabel: "Start a project RFQ",
  },
  {
    id: "manufacturer",
    label: "Equipment Manufacturers",
    shortLabel: "Equipment manufacturer",
    promise: "Describe the integration envelope and purchasing requirement before discussing a candidate fan.",
    needs: ["Dimensions and interface", "Electrical requirement", "Batch quantity and destination"],
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

export const contactChannels = [
  { name: "WhatsApp", status: "details-pending" },
  { name: "Facebook", status: "details-pending" },
  { name: "Gmail", status: "details-pending" },
  { name: "WeChat", status: "details-pending" },
] as const satisfies readonly ContactChannel[];

export const downloadResources = [] as const satisfies readonly DownloadResource[];
