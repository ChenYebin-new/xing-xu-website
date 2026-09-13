---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/layouts/BaseLayout.astro"]
---

# Home surface brief

- **Status:** Finish review disposition is `ship`. Final references: `.impeccable/review/desktop.png` and `.impeccable/review/mobile.png`.
- **Scope and mode:** English homepage for Malaysia and the Philippines; Persuade mode. It must make an unfamiliar B2B buyer understand the supplier, believe the business is real, and know how to start an RFQ.
- **Audience, job and action:** Distributors first, engineering contractors second, equipment manufacturers third. The primary action is `Request a Quote`; product exploration and WhatsApp are supporting paths.
- **Proof and content:** Nearly thirty years of hands-on storefront operation, real storefront and warehouse photography, real product and nameplate photography, selection advice, cross-brand sourcing, export packaging coordination, and logistics coordination. The current generated images are placeholders only and require approved real source replacement before launch.
- **Chosen direction:** `Evidence-led Showroom B`, approved composition seed `dd7f1911`, based on `.impeccable/mocks/home-evidence-showroom.png`. The visual system uses a warm/cool white field, deep navy, muted blue rules, accessible safety orange (`#c2410c`, hover `#a93605`), and self-hosted Barlow Condensed display type.
- **Approved composition:** The desktop first viewport is a three-column trust scene: company identity and the nearly-thirty-year statement at left, one decisive concept product image in the centre, and four desaturated photographic evidence bays at right. Every evidence bay is visibly labelled `PHOTO PLACEHOLDER` and `SOURCE REQUIRED`.
- **Below-fold behavior:** Use the `Buyer Path + RFQ Rail` pattern from concept C after the evidence-led opening. Buyer tabs synchronize with customer type, product-category links preselect the RFQ category, and the path collects buyer type, category, quantity, specifications or parameters, destination, and preferred contact channel.
- **Responsive order:** Mobile prioritizes identity → concept product → evidence → capabilities → products → buyer path → RFQ. Evidence remains two columns; other primary grids, tabs, form pairs, contact channels, and footer content stack. The compact brand stays in a sticky header with a 44px menu control.
- **Data boundary:** The RFQ is an interface preview that validates required fields but sends and stores nothing. Privacy consent, bot protection, submission handling, email delivery, and any retention policy remain unimplemented.
- **Contact boundary:** Facebook, WhatsApp, Gmail, and WeChat are planned channels, but public details remain pending and must not be presented as live until approved.
- **Image boundary:** All concept-product and generated evidence images remain clearly marked placeholders. Replace them only with approved, traceable real product, storefront, warehouse, and nameplate sources; do not imply a real SKU or facility before replacement.
- **Constraint and risk:** The industry-standard structure must not become a generic blue machinery template. Distinction must come from real evidence, accurate product data, photography, typography, proportion, and an RFQ path built for industrial buyers. Do not inherit the old website or invent a factory, certification, customer, founding year, performance claim, or export record.
- **Supporting composition reference:** `.impeccable/mocks/home-buyer-path-rail.png`, limited to buyer-path and RFQ interaction ideas; it does not replace the evidence-first first viewport.
- **Unresolved:** Final logo; approved hero product and real evidence photo set; exact contact details; final product copy and verified specifications; RFQ transport, storage, consent, bot protection, delivery, retention, and privacy behavior.
