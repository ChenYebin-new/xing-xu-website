---
name: "XINGXU FAN"
description: "An evidence-led industrial showroom for credible fan supply and sourcing."
colors:
  safety-orange: "#c2410c"
  safety-orange-hover: "#a93605"
  deep-navy: "#06133f"
  dark-navy: "#0a1847"
  technical-navy: "#122759"
  supporting-navy: "#29416e"
  muted-ink: "#53698f"
  link-blue: "#006e9d"
  technical-blue: "#087fae"
  line-blue: "#c8dce4"
  rule-blue: "#b9d7e3"
  light-rule-blue: "#dcecf2"
  cool-blue-wash: "#eef6f8"
  warm-white: "#fbfcfb"
  cool-white: "#f4f9fa"
  steel: "#e7eef0"
  pure-white: "#ffffff"
  footer-navy: "#040d2d"
  light-on-navy: "#c6d8e8"
  quiet-light-on-navy: "#bcd0df"
  light-link-on-navy: "#dbeaf3"
  scope-copy-on-navy: "#c8d9e8"
  footer-copy: "#b8c9dc"
  footer-link: "#d9e6f0"
  product-image-bay: "#dcebed"
  caution-wash: "#eef2f4"
  ghost-blue: "#d4e5e9"
  focus-cyan: "#00a1d4"
  success-pale: "#b9f5d3"
  error-pale: "#ffd7cf"
typography:
  display:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(44px, 4.5vw, 64px)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(28px, 3vw, 40px)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(28px, 2.4vw, 34px)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Segoe UI Variable Text, Segoe UI, Arial, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.5
  label:
    fontFamily: "Segoe UI Variable Text, Segoe UI, Arial, sans-serif"
    fontSize: "0.79rem"
    fontWeight: 750
    lineHeight: 1.35
    letterSpacing: "0.13em"
rounded:
  field: "4px"
  action: "4px"
spacing:
  xs: "6px"
  sm: "8px"
  md: "14px"
  lg: "18px"
  xl: "26px"
  page: "max(32px, calc((100vw - 1440px) / 2))"
  page-mobile: "18px"
  section: "clamp(40px, 4vw, 64px)"
  section-mobile: "32px"
components:
  button-primary:
    backgroundColor: "{colors.safety-orange}"
    textColor: "{colors.pure-white}"
    rounded: "{rounded.action}"
    padding: "13px 26px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.safety-orange-hover}"
    textColor: "{colors.pure-white}"
    rounded: "{rounded.action}"
  input:
    backgroundColor: "{colors.pure-white}"
    textColor: "{colors.deep-navy}"
    rounded: "{rounded.field}"
    padding: "13px 14px"
    height: "52px"
---

# Design System: XINGXU FAN

## Overview

**Creative North Star: "The Evidence-led Industrial Showroom"**

The system presents industrial products with the discipline of a technical showroom: product scale is decisive, operating evidence is explicit, and inquiry is the natural next step. Warm and cool white fields keep the page open; deep ink gives it authority; blue-green rules organize information; safety orange appears only where action or state needs emphasis.

Interior pages extend that world without introducing a new composition language. They begin with the buyer's problem, provide category- or audience-specific evidence and guidance, state the publication or operating boundary, and end with one clear action. Product, company, contact, privacy, and submission states must distinguish published, reachable, live behavior from local simulation, pending setup, and unverified claims. The Stage 4 RFQ is a functional inquiry surface; production delivery remains a separate configuration and verification boundary.

## Product imagery revision — 2026-09-26

This revision supersedes the earlier concept stamps, desaturated evidence placeholders, and simulated product drop shadows described below. Seven new ImageGen originals now supply all product and gallery photography areas. The homepage hero uses the green/red centrifugal fan direction from the user-provided references. The four former evidence bays are now a product construction gallery, with no generated storefront, warehouse, shipment or nameplate presented as business evidence.

Complete machines retain their native 3:2 framing; detail galleries use natural color and neutral image bays. Following the user's final presentation choice, public AI-source captions are omitted and alt text describes the pictured equipment. The website does not label generated work as actual photographs. Verified model and business evidence requirements remain in force. Original assets, supplied reference photos, the approved 2A identity and the functional WhatsApp QR remain intact. Prompts and provenance are retained internally in `src/assets/product-imagery/README.md`.

**Key Characteristics:**

- Evidence-led rather than claim-led.
- Condensed technical display typography over plain international-English body copy.
- Problem-led interior pages with an explicit content boundary before the final action.
- Flat, low-radius surfaces separated by rules, tonal fields, and restrained shadows.
- Product photography and traceable business evidence carry the visual identity.

## Colors

Deep ink and blue-green organize warm and cool white fields; safety orange is the scarce action and status color.

### Primary

- **Safety Orange:** Primary quote actions, active navigation marks, and horizontal status rules. Its darker partner is the hover state and the marker within genuine ordered workflows.

### Secondary

- **Link Blue and Technical Blue:** Text links, active navigation, technical wayfinding, and selected states.
- **Rule Blues:** Structural dividers range from the stronger evidence-grid rule to the lighter internal row rule. They keep content legible without turning each item into a separate marketing card.

### Neutral

- **Deep, Dark, and Technical Navy:** Primary text, boundary and action-panel grounds, and the strongest structural contrast.
- **Supporting Navy and Muted Ink:** Long-form body copy, annotations, breadcrumbs, captions, and pending-state explanations.
- **Warm White, Cool White, Cool Blue Wash, and Steel:** Alternating page fields, product bays, and quiet grouped surfaces; neither white field should become a sterile gray canvas.
- **Light-on-Navy tones:** The softer blue-whites on dark panels preserve hierarchy beneath white headings and actions.
- **Product Image Bay, Caution Wash, and Ghost Blue:** Deliberate component-local tones for concept-product staging, caution contrast, and the oversized 404 numeral. They are not additional brand accents.
- **Success Pale and Error Pale:** Reserved for explicit form-result states when those states are present.

**The Scarce Orange Rule.** Reserve orange for actions, active state, and short status marks; it must not become a decorative wash.

**The Horizontal Status Rule.** Use orange as a top rule when a hero brief, notice, empty record, policy status, or full-width boundary needs emphasis. Compact briefs use a thin rule, contained status cards use a medium rule, and the full-width dark scope boundary uses the strongest rule. Do not create orange side rails or tabs.

## Typography

**Display Font:** Self-hosted Barlow Condensed, with Arial Narrow and sans-serif fallbacks.
**Body Font:** Segoe UI Variable Text, with Segoe UI, Arial, and sans-serif fallbacks.

**Character:** Display type is compressed, heavy, and equipment-like. Body type remains calm and familiar for technical buyers reading in international English.

### Hierarchy

- **Interior Display:** Extra-bold condensed type for page H1s (`clamp(44px, 4.5vw, 64px)`, weight 800, line-height 1, tracking `-0.03em`). Titles use a wider 18-24ch measure to avoid excessive wrapping and reach a 64px desktop maximum. At the 720px mobile breakpoint, interior H1s use 44px; wording must remain readable without clipping.
- **Homepage Display:** The trust opening retains its own condensed scale (`clamp(2.85rem, 3.5vw, 3.4rem)`, line-height 0.94), with related tablet and mobile scales from the approved preview. It does not inherit the shared interior H1.
- **Headline:** Extra-bold condensed type for compact interior section openings (`clamp(28px, 3vw, 40px)`, line-height 1.08). Boundary and final-action headings use related scales up to 44px, with smaller mobile variants. Homepage section openings retain their own scale up to 3.45rem.
- **Title:** Bold condensed type for category and content-card names (`clamp(28px, 2.4vw, 34px)`, line-height approximately 1.05). Capability, evidence, and status labels use smaller role-specific sizes where the hierarchy calls for them.
- **Utility Display:** Privacy subsection headings use a fixed 2rem size; the pale 404 route code is a deliberately oversized background-like display (`clamp(10rem, 18vw, 18rem)`, 9rem on mobile), not part of the content-heading scale. Product use-case band headings use `clamp(24px, 2vw, 28px)`, a 74ch maximum measure, and 1.2 leading so their supporting statement does not compete with the main section hierarchy.
- **Body:** Regular system sans at a 1rem floor with 1.5-1.7 line-height and restrained 51-74 character line lengths; buyer requirements, contact-channel names, and privacy explanations use this voice rather than metadata sizing. Supporting copy may step down to 0.84-0.98rem where it remains comfortably legible.
- **Label and Wayfinding:** Small, bold, widely tracked uppercase text at 0.79rem is reserved for genuine concept, contact, and pending-state metadata. Breadcrumbs use normal-case 0.86rem text. Neither role becomes a second heading above every section or action panel.

**The Compact Interior Ceiling Rule.** Interior H1s never exceed 64px on desktop or 44px on mobile. Identity comes from condensed proportion and clear hierarchy, while the wider title measure keeps useful content close to the opening.

**The Two-Voice Rule.** Barlow Condensed carries identity and hierarchy; the body stack carries explanation, navigation, wayfinding, and form content.

**The One-Heading Rule.** Do not stack a generic uppercase kicker or eyebrow above every Phase 3 section or action panel. A status label is allowed only when it communicates a real state the heading cannot.

## Layout

The shared content measure is capped at 1440px. Desktop gutters use `max(32px, calc((100vw - 1440px) / 2))`, and mobile gutters are 18px. Header, section content, and footer align to that frame while section backgrounds continue across the viewport. Standard section spacing is 40-64px on desktop and 28-40px on mobile, with a 32px mobile default. Text-only tiles follow their content height rather than reserving empty space.

The homepage retains its three-column trust opening, ruled capability band, three-card product grid, and buyer-path workspace paired with a dark RFQ preparation rail. The fan stays visually decisive and all four evidence slots remain visible. At 1180px the hero becomes two columns followed by a four-slot evidence row; at 900px it stacks identity, product, and evidence. At 720px evidence remains two columns. Product image rows are compact, and the buyer panel does not carry a fixed empty minimum height.

Interior openings keep their title, brief, notice, and action close together. The Products index uses one wide title row followed by a compact explanation-and-action row; other interior headers align a concise aside closely with the title. The page then moves through product-, audience-, or evidence-specific content, states an explicit publication or operating boundary, and finishes with the shared dark action panel. Product detail heroes use two columns at 901px and above with a 380-420px product bay; at 900px and below they stack, with a smaller mobile bay. Policy pages keep their centered 940px reading measure; status and 404 pages retain focused utility compositions without excessive forced height.

Contact release checks keep a 24px gap below their section heading before the ruled content tiles. Supporting use-case statements and text-only tiles use their compact role-specific typography and content height.

The refreshed route headings are `Industrial Fan Categories` on Products, `Prepare Your Fan Inquiry` on Contact, and `Request a Fan Quote` on RFQ. The Products category-section heading is `Choose Your Fan Category`. Remaining H1 wording and factual content stay unchanged in this layout pass.

The Stage 4 `/request-a-quote/` surface uses a compact header followed by a two-column desktop workspace: the complete inquiry form occupies the primary column and a sticky, ordered guidance rail occupies the secondary column. Reduce header, workspace, and group-transition gaps while preserving persistent labels, 52px-minimum controls, helpers, errors, and all existing field and submission semantics. Form groups use two-up fields where width allows; requirement summaries and conditional selection-help fields can span the form column.

At 1020px the primary navigation collapses to the menu control, three-column content grids become two columns, four-column selection and evidence groups become two columns, and wide content/action pairings tighten. In the 721-1020px category grids, center the last card at the same width as the preceding cards. The RFQ form and guidance rail reflow to one column at 1020px and the rail stops sticking. At 720px primary grids, tabs, fields, guidance, utility surfaces, action panels, and footer stack. Mobile order preserves problem or status first, supporting content second, the explicit boundary next, and the action last. Two-up evidence photography may remain while labels and replacement status are readable.

## Elevation & Depth

The system is flat by default. Depth comes from alternating white fields, thin blue rules, tonal image bays, and two restrained navy shadows; product imagery may use a stronger drop shadow to preserve physical scale. On fine-pointer hover, buttons lift by 1px and interactive product cards lift by 8px. Dark boundary and action sections gain separation from tone and top rules, not floating-card effects.

**The Evidence Stays Flat Rule.** Do not turn proof bays, status rows, or content boundaries into glossy marketing cards; their hierarchy comes from photography, labels, tonal contrast, and rules.

## Shapes

Corners are almost square: evidence and product containers use a 3px radius, while Stage 4 RFQ fields, actions, and navigation controls use 4px. Thin borders, hard section edges, rectangular image bays, and horizontal status rules preserve a precise industrial character; pills, vertical orange tabs, and oversized soft radii are outside the approved language.

## Motion

The showroom opening introduces the supplier in a measured left-to-right sequence, then settles the main fan into its image bay with one inspection sweep. This follows the visitor's reading order from business identity to equipment and supporting evidence. Interior two-column openings use opposing entrances; product lists and evidence photography arrive as local groups, with sibling delays increasing by 100ms and capped at 300ms. Supporting boundaries, policy text, contact QR imagery and submission status use a quiet fade.

`src/scripts/motion.ts` provides one shared, dependency-free Web Animations / IntersectionObserver layer across all 14 routes. Entrances play once near the viewport and never replay when scrolling back. Ordinary entrances run for 950ms on desktop and 700ms on mobile. Text and ordinary content groups move by 40px / 22px; `.product-card`, `.category-feature` and `.evidence-slot` move by 64px / 36px and settle from scale 0.96 / 0.98 to their original size. Quiet fades run for 460ms. The homepage's fan entrance runs for 1150ms on desktop and 850ms on mobile, with a 160ms delay; its single 1250ms inspection sweep starts after a 320ms delay. Presentation entrances use `cubic-bezier(0.22, 0.68, 0.36, 1)`; interaction transitions retain `cubic-bezier(0.16, 1, 0.3, 1)`, and the scan traverses the product bay at a constant speed.

Default HTML and CSS keep content visible. Animation styles apply only while a finite animation is running and leave no retained fill styles. Missing JavaScript or observer support preserves the complete static page. Keyboard focus, pointer activation, anchor targets, restored pages and printing bypass relevant entrances immediately. RFQ controls, errors, Turnstile, sticky containers and hidden buyer panels are excluded. Reduced-motion preferences skip entrances and scans and suppress hover displacement, while retaining 80ms color feedback; a preference change cancels running motion.

Hover movement is limited to devices with a fine pointer and hover support: buttons lift by 1px, product and category cards lift by 8px over 260ms, and their images scale to 1.075 over 300ms. Arrows within product and category cards move by 6px; independent text-link arrows retain their 3px movement and 180ms timing. Button feedback retains its 200ms timing. Keyboard focus changes color and preserves the existing cyan outline without spatial movement. Image dimensions, QR proportions, native full-card links, content and responsive layout remain the incumbent visual truth.

## Components

### Buttons and Text Links

- **Primary:** Solid safety orange, white bold text, compact 4px corners, a 52px minimum height, and a directional arrow where space permits.
- **Hover / Focus:** Darken to the approved hover orange; fine-pointer hover lifts by 1px. Keyboard focus uses a visible cyan 3px outline with 4px offset and no movement.
- **Text link:** Link blue with a one-pixel underline; hover shifts to the dark orange. On dark fields it uses a pale blue-white and moves to white on hover.

### Site Header and Navigation

- **Brand mark:** Use the approved `2A / Precision` angular X: deep-navy primary diagonal and lower-left segment, with one restrained orange upper-right segment. Keep the three pieces flat, sharply cut and separated by transparent space; do not add gradients, shadows, extra airflow lines or rounded terminals.
- **Desktop:** A 66px-minimum three-part header places the compact horizontal mark-and-wordmark lockup at left, familiar B2B destinations in the center, and the quote action at right. The active destination is link blue with a short orange underline.
- **Responsive:** At 1020px the desktop links collapse into a 44px menu control. At 720px the 62px header becomes sticky, hides the brand descriptor and header quote button, and keeps the compact brand and menu visible.
- **Destination discipline:** Navigation exposes only working routes. The shared header currently leads to Products, For Distributors, About, Contact, and the dedicated RFQ route; the homepage buyer tabs expose all three partner guides.

### Breadcrumbs

Breadcrumbs are a compact ordered wayfinding line above interior H1s. They use the body stack at 0.86rem, muted ink, slash separators, and a 24px bottom gap on desktop or 20px on mobile. The current page is text with `aria-current`; prior levels are links.

### Cards and Content Groups

- **Product category cards:** The entire white, low-radius card is a native link, including heading, visual, copy, blank area, and footer. Its category heading supplies the accessible name through `aria-labelledby`; decorative arrows and link-like footer labels are not nested interactive controls. One card creates one keyboard focus stop and preserves Enter, modified-click, and middle-click navigation. Keep the cool image bay, decisive concept visual, explicit concept status, and concise selection inputs.
- **Evidence bays:** Desaturated photographs or generated placeholders with explicit replacement labels until approved, traceable sources exist.
- **Content groups:** Use shared borders and alternating fields for selection inputs, support areas, capabilities, release checks, and channel status. Text-only groups follow content height on desktop and mobile. Unordered groups are not decorated with `01/02/03` markers.
- **Hover and focus:** Interactive category cards share a stronger border and color feedback. Fine-pointer hover adds a restrained lift, slight image zoom and arrow movement. Keyboard focus keeps the cyan 3px outline and 4px offset without movement. Reduced-motion preferences suppress spatial motion and preserve short color feedback.

### Inputs and Fields

- **Style:** The Stage 4 RFQ uses persistent readable labels, explicit required or optional indicators, white 52px-minimum controls with 4px corners, and cool blue-gray borders. Helper and error positions remain associated with their controls; placeholders supplement labels and never replace them.
- **Contact rule:** Require at least one reply path: email or WhatsApp. Preferred channel remains a separate optional choice.
- **Conditional detail:** Selecting `Need selection help` reveals the operating-duty fieldset and makes its application field required; choosing a product category keeps those fields hidden and disabled.
- **Focus and error:** Focus uses a visible blue/cyan ring. Invalid controls use a warm error treatment, persistent field-level copy, `aria-invalid`, and focus moves to the first invalid control after validation. Native invalid-field collection is restricted to `input`, `select`, and `textarea`; invalid fieldsets are not marked as controls. This fixes the pre-existing empty-submit focus defect while retaining entered values and blocking API requests for invalid submissions.

### RFQ Submission, Turnstile, and Result States

- **Submission states:** The flow exposes visible pending, success, and failure states. Pending and failure copy appears in a polite live region on the form; a successful `201` response writes a per-tab `sessionStorage` delivery marker and then routes to `/thank-you/`, where the visible success state appears only when the marker carries a request reference. Direct navigation to the success route is not confirmation.
- **Duplicate lock:** While server validation and delivery are in progress, disable the submit action, mark the form busy, and change the label to `Validating and sending…` so repeated clicks cannot create a second request.
- **Bot protection:** Turnstile is a visible labelled group, not an invisible prerequisite. It has a readable loading state, keyboard focus treatment, invalid styling, field-level expiry or verification errors, and explicit script/iframe load-failure messaging.
- **Validation authority:** Client checks provide immediate guidance, but the Worker remains authoritative: it validates the bounded JSON payload, contact rule, conditional fields, consent, source path, and Turnstile response before attempting one grouped email.

### Action Panel

The shared final action is a full-width deep-navy panel with a restrained technical-blue glow. It contains one decisive heading and supporting paragraph, one primary orange action, and at most one secondary light text link. It does not add an eyebrow above the heading. On mobile it becomes a single column with the actions following the explanation.

### Content and Status Boundaries

- **Product concept boundary:** Concept imagery communicates category form only. It is not stock, model, performance, or facility evidence and remains visibly stamped and captioned until replacement.
- **Product publication boundary:** A model record appears only after its name, photographs, core specifications, and publication approval are verified. Empty product states say that no public model record exists.
- **Contact boundary:** Pending channels are status records, not live links. A channel is presented as active only after its public detail is authorized, reachable, owned, and tested.
- **Privacy and submission boundary:** Stage 4 posts to `/api/rfq`, performs server-side validation and Turnstile verification, and attempts one grouped email. It adds no inquiry database, file upload, or attachment storage. A success message is permitted only after the configured email service accepts the message and the current tab carries the delivery marker; direct access to `/thank-you/` never proves submission.
- **Environment boundary:** `local-test` mode uses Cloudflare's public Turnstile test site key and secret plus Wrangler's simulated `send_email` output; it does not send a real email. `live` mode uses the approved production hostname, live Turnstile keys, server-only secret, and restricted verified sender and destination. The presence of the form or a successful local test must not be presented as proof that production delivery is publicly deployed or verified.

### Ordered Workflows

Use visible ordinals only when sequence changes how the content is followed, such as the partner requirement-to-quotation workflow. Checklists and unordered category, capability, evidence, or status groups use rules, dashes, or plain grouping instead of decorative sequence numbers.

## Do's and Don'ts

### Do:

- **Do** replace every generated concept or evidence image with an approved real source before launch, keeping status labels until replacement is verified.
- **Do** use product facts, names, contact details, and evidence only after their source is approved and traceable.
- **Do** preserve the Phase 3 flow from a problem-led opening through specific evidence or guidance, an explicit content boundary, and one clear action.
- **Do** use horizontal orange top rules for status emphasis and retain the 64px desktop / 44px mobile interior-H1 ceiling.
- **Do** keep reduced-motion behavior, visible keyboard focus, and the mobile reading order intact.
- **Do** keep field labels, helper text, errors, Turnstile state, delivery state, and the local-versus-live boundary readable at every responsive width.

### Don't:

- **Don't** present a concept image as a real Xingxu product, location, warehouse, nameplate, stock item, model, or performance record.
- **Don't** imply a published SKU, factory, certification, authorization, customer, export record, performance figure, or active contact channel without evidence.
- **Don't** treat a local-test `201`, the presence of the RFQ form, or direct access to the thank-you route as proof of live production delivery.
- **Don't** add an inquiry database, file upload, or attachment storage to the Stage 4 truth boundary without a separately approved data, privacy, and retention design.
- **Don't** use decorative ordinals for unordered categories, capabilities, evidence, checks, or status groups.
- **Don't** reintroduce repeated section kickers, action-panel eyebrows, orange side rails, generic blue-machinery styling, decorative gradients, pill-heavy UI, or orange used as atmosphere.

## Approved UI Refresh Evidence

The user explicitly approved the homepage and Products desktop/mobile UI previews and authorized extending their layout and interaction rules to the existing site. The approved source and captures are in `.impeccable/review/ui-refresh-preview/`, including `shared.css`, `home.css`, `products.css`, the 1440px and 390px captures, and preview measurement and interaction records. This authorization completes the preview confirmation step; it does not require another visual approval before implementation.

Production desktop/mobile captures and validation records are saved in `.impeccable/review/ui-refresh-result/`. The 2026-09-15 16:49 local production-source build passed: 23 Astro files checked with zero errors, warnings, or hints, and 14 routes generated. Worker TypeScript passed, as did 63 Vitest tests and 12 Node CI tests.

The current pass checked 81 route/viewport layouts at 1920, 1440, 1024, 768, and 390px, supplemented by 900px and 721px breakpoint checks and 320px RFQ/utility checks. No measured horizontal overflow, clipping, or image-load defects were found. On `/products/` at 1440 × 900, all three category titles and principal images end above the first viewport's bottom edge. `layout-measurements.json` and the result captures record these observations.

Browser behavior coverage comprised 20 scenario groups: the original `regression.json` retains its 19-pass / 1-failure result, and `focused-regression.json` records the passing retest after the invalid-control selector fix. Together they verify all 20 groups. The retest focused `#customer-type`, showed 11 field errors, retained the entered name, marked no fieldset invalid, and made zero API requests. Card pointer and keyboard navigation, buyer tabs, preselection, conditional fields, mocked submission states, status truth, and 52px RFQ controls were covered. Turnstile and API responses were mocked locally; these results are not live verification, email acceptance, or inbox-delivery evidence.

One mechanical design-detector pass ran. Its saved tool output, `design-detection.log`, was truncated, so the complete findings count and remainder cannot be confirmed from that record. Human review identified mostly existing color, size, and radius documentation advisories plus an existing RFQ error-summary left-border warning. This is a reviewed, limited detector record, not a clean detector report; no unrelated visual or backend changes were made to suppress those findings.
