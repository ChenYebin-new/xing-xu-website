# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated technical choice:

- Astro with TypeScript for a static-first, content-driven website.
- Structured local product content so product listings and detail pages can be generated from one validated data model.
- Cloudflare Workers with Static Assets as the initial deployment target. Cloudflare currently recommends Workers for new projects, while Pages remains available for existing or deliberately Pages-based projects.
- A small Worker endpoint will handle RFQ submissions. Turnstile must be validated server-side before a submission is accepted.
- The first release will send inquiry notifications to a verified Gmail destination. The exact Cloudflare Email Service setup must be proven end to end before launch.
- No CMS, customer accounts, shopping cart, online payment, or live inventory in the first release.

The build workflow is comp-first: approve high-fidelity visual concepts before implementation.

## Users

Primary users are industrial fan and industrial-equipment distributors in Malaysia and the Philippines. They are evaluating whether Xingxu can provide a credible product range, commercially workable supply, and responsive cooperation.

Secondary users are HVAC, ACMV, MEP, ventilation, and other engineering contractors looking for products that fit project requirements and for a supplier who can assist with selection, packaging, and logistics.

Tertiary users are equipment manufacturers seeking fan components or ventilation equipment for integration into their own products or systems.

## Product Purpose

The website is an English-language B2B credibility and inquiry surface for Southeast Asian market development. It must help a prospective customer:

1. verify who Xingxu is and what it supplies;
2. understand the relevant product categories and available selection support;
3. contact the business through Facebook, WhatsApp, Gmail, or WeChat; and
4. submit a structured request for quotation with quantity, specifications, and destination.

Success means a qualified visitor can move from trust assessment to an actionable inquiry that contains enough information for product selection and quotation.

## Positioning

Public-facing name: **Quanzhou Xingxu Fan & Ventilation Supply**.

Short brand name: **XINGXU FAN**.

Approved descriptor: **Industrial Fan Supplier and Sourcing Partner**.

Xingxu is positioned as a Quanzhou-based industrial fan supplier and sourcing partner, not as a manufacturer. Its differentiating value is the combination of approximately thirty years of storefront experience, cross-brand sourcing, product selection advice, export packaging coordination, and logistics coordination.

Do not use `Co., Ltd.`, `Factory`, `Manufacturer`, or `Group` unless future legal and operational evidence supports the term.

## Operating Context

- Market focus for the first release: Malaysia and the Philippines.
- Site language for the first release: English only.
- Customer priority: distributors first, engineering contractors second, equipment manufacturers third.
- The website supports both outbound prospecting and inbound discovery. A prospect may arrive after receiving a link on Facebook, WhatsApp, email, or another outreach channel.
- Product selection and quotation occur after the visitor supplies use case, quantity, technical requirements, and destination.
- The website will not publish fixed export prices in the first release because price depends on specification, quantity, packaging, commercial terms, destination, and current logistics cost.

## Capabilities and Constraints

Confirmed capabilities:

- Industrial fan supply and cross-brand sourcing.
- Product selection advice.
- Export packaging coordination.
- Logistics coordination.
- Public contact through the approved Gmail address and user-provided WhatsApp QR image; Facebook and WeChat contact details remain pending.
- Direct RFQ submission from the website.

Initial featured categories:

1. Negative pressure fans.
2. Axial fans.
3. Centrifugal fans.

The exact number of products is undecided. The site must support publishing products incrementally without inventing placeholder specifications. Blowers and smoke-exhaust fans may be added later after product data and market-specific requirements are verified.

Approved public contacts (2026-09-15):

- Public email: `leochen7531@gmail.com`, shared across the homepage, contact page, footer, RFQ page, and privacy contact information; direct email links use `mailto:leochen7531@gmail.com`.
- WhatsApp: the user-provided LeoChen QR image, preserved in full at `src/assets/contact/leochen-whatsapp-qr.jpg`. The contact page displays it in its original proportions and links to the original image; other WhatsApp entries link to `/contact/#whatsapp`. Do not redraw the QR code, infer a phone number, or generate a direct WhatsApp URL.
- Facebook and WeChat remain visibly marked as awaiting contact details.

This update changes public contact information only. RFQ inquiry recipients, email bindings, runtime secrets, and production configuration remain unchanged; the public Gmail address does not establish the RFQ delivery destination or prove actual delivery. Privacy changes are limited to the contact address, without adding retention or rights-processing commitments. The user subsequently authorized selective commit and push to `origin/main` through Command One on 2026-09-15, triggering the existing Workers Builds workflow; deployment results require separate verification. This does not authorize additional Cloudflare configuration changes or real-email tests.

Open decisions:

- Facebook and WeChat public URLs or handles, any separately provided WhatsApp phone number or direct URL, physical address, and inquiry recipients.
- Domain name and whether a domain-based forwarding address will supplement the public Gmail address.
- First set of publishable SKUs and their verified specifications.
- Whether product drawings or document uploads will be accepted in the first RFQ form.
- Whether RFQs will be stored in addition to being emailed.
- Final deployment account, domain, analytics, retention, and privacy settings.

## Brand Commitments

- The public English name is `Quanzhou Xingxu Fan & Ventilation Supply`.
- The compact website brand is `XINGXU FAN`.
- The approved logo is the `2A / Precision` X mark selected on 2026-09-20: a sharp deep-navy diagonal X construction with a separated deep-navy lower-left segment and a restrained orange upper-right segment. The final production asset uses flat site colors, transparent negative space and no concept-board effects.
- The company must be represented truthfully as a supplier and sourcing partner.
- The site is a completely new project. It must not inherit the prior website's layout, visual system, copy, or implementation.
- English copy should be direct, technically credible, and suitable for B2B buyers in Malaysia and the Philippines.
- Claims such as years in business, certifications, brand relationships, export experience, and performance figures must be supported before publication.
- The user selected a clear, modern industrial showcase as the durable visual direction. It should use familiar B2B navigation and product presentation at high craft, while avoiding template sameness through real evidence, precise technical information, and distinctive composition rather than decorative novelty.
- The approved homepage composition is `Evidence-led Showroom` (`.impeccable/mocks/home-evidence-showroom.png`): company identity, nearly thirty years of hands-on supply, one decisive fan image, and four real-business evidence slots share the first viewport.
- The homepage will absorb the strongest part of `Buyer Path + RFQ Rail` (`.impeccable/mocks/home-buyer-path-rail.png`) below the trust-first opening: buyer type, product category, quantity, specifications or parameters, destination, and alternate contact channels must form one efficient inquiry path.
- No specific competitor is a visual reference. The quality bar is the clarity, evidence discipline, product legibility, and inquiry efficiency expected from a well-executed international industrial-equipment supplier website.

## Evidence on Hand

Confirmed or obtainable:

- Approximately thirty years of storefront operation. Use the approximate wording until a founding year is confirmed.
- Storefront and warehouse photographs can be provided.
- Product photographs and nameplate photographs can be provided.

Known candidate product information exists for a negative-pressure/exhaust fan, but it must be re-confirmed from source material before publication:

- dimensions: 1220 x 1220 x 400 mm;
- airflow: 32,000-37,000 m3/h;
- static pressure: 60 Pa;
- galvanized-steel housing;
- stainless-steel blades.

Not yet confirmed:

- Formal legal entity name and legal English name.
- Manufacturer or brand authorizations.
- Certifications and test reports.
- Export history, overseas customers, and overseas projects.
- Product performance curves, drawings, complete electrical data, MOQ, lead time, warranty, and export pricing.

None of these absent items may be fabricated or implied.

## Product Principles

1. **Evidence before claims.** Publish only company and product statements supported by current source material.
2. **Specification before promotion.** Help industrial buyers evaluate fit through structured technical data and selection context.
3. **Trust before inquiry.** Establish identity, operating history, real facilities, and real products before asking for contact details.
4. **One useful next step.** Every important page should lead to a relevant product, contact channel, or RFQ path.
5. **Start focused, expand from evidence.** Serve two countries, three product categories, and three buyer types before adding more markets or languages.

## Accessibility & Inclusion

- The site must work on mobile and desktop and remain usable on slower connections.
- Forms must have persistent labels, clear validation, keyboard access, and explicit success and error states.
- Product information must not rely on images alone; technical facts require readable text or tables.
- Plain international English is preferred so readers with different levels of English proficiency can understand essential information.
