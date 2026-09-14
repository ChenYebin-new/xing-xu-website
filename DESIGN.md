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
    fontSize: "clamp(3.8rem, 7vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2.4rem, 4.1vw, 4.2rem)"
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(1.75rem, 2.5vw, 2.4rem)"
    fontWeight: 700
    lineHeight: 1
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
  page: "max(4.5vw, 32px)"
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

- **Interior Display:** Extra-bold condensed type for page H1s (`clamp(3.8rem, 7vw, 6rem)`, weight 800, line-height 0.86, tracking `-0.04em`). About, partner, contact, privacy, status, and 404 variants may begin between 3.5rem and 3.7rem, but every desktop interior H1 has a 6rem maximum. At the mobile breakpoint, the shared scale becomes `clamp(3.35rem, 15vw, 5.2rem)`.
- **Homepage Display:** The denser homepage opening keeps its compact established scale (`clamp(3.25rem, 3.75vw, 3.8rem)`) rather than inheriting the larger interior H1.
- **Headline:** Extra-bold condensed type for section openings (`clamp(2.4rem, 4.1vw, 4.2rem)`, line-height 0.96). Narrower content and boundary headings use related scales that top out between 3.5rem and 4rem; the shared final action uses `clamp(2.7rem, 4.7vw, 4.8rem)`.
- **Title:** Bold condensed type for product, capability, evidence, and status-card names (`clamp(1.75rem, 2.5vw, 2.4rem)`, line-height 1).
- **Utility Display:** Privacy subsection headings use a fixed 2rem size; the pale 404 route code is a deliberately oversized background-like display (`clamp(10rem, 24vw, 24rem)`, 9rem on mobile), not part of the content-heading scale.
- **Body:** Regular system sans at a 1rem floor with 1.5-1.7 line-height and restrained 51-74 character line lengths; buyer requirements, contact-channel names, and privacy explanations use this voice rather than metadata sizing. Supporting copy may step down to 0.84-0.98rem where it remains comfortably legible.
- **Label and Wayfinding:** Small, bold, widely tracked uppercase text at 0.79rem is reserved for genuine concept, contact, and pending-state metadata. Breadcrumbs use normal-case 0.86rem text. Neither role becomes a second heading above every section or action panel.

**The Six-Rem Ceiling Rule.** Interior H1s may feel oversized through condensed proportion and tight leading, but never exceed 6rem on desktop.

**The Two-Voice Rule.** Barlow Condensed carries identity and hierarchy; the body stack carries explanation, navigation, wayfinding, and form content.

**The One-Heading Rule.** Do not stack a generic uppercase kicker or eyebrow above every Phase 3 section or action panel. A status label is allowed only when it communicates a real state the heading cannot.

## Layout

The desktop frame uses broad responsive gutters (`max(4.5vw, 32px)`). The homepage retains its established three-column trust opening, ruled capability band, three-card product grid, and buyer-path workspace paired with a dark RFQ preparation rail that leads to the dedicated form.

Phase 3 interior pages use a repeatable two-column opening: the breadcrumb and problem-led H1 occupy the larger field, while a concise brief, notice, or action occupies the smaller field beneath an orange top rule. The page then moves through product-, audience-, or evidence-specific content, states an explicit publication or operating boundary, and finishes with the shared dark action panel. Product detail pages may replace the brief column with one decisive concept-product bay; policy pages use a centered reading column capped at 940px; status and 404 pages use simplified two-part utility compositions.

The Stage 4 `/request-a-quote/` surface uses a wide two-column desktop workspace: the complete inquiry form occupies the primary column and a sticky, ordered guidance rail occupies the secondary column. Its form groups use two-up fields where width allows, while requirement summaries and conditional selection-help fields can span the form column.

At the medium breakpoint (1020px), the primary navigation collapses to the menu control, three-column content grids become two columns, four-column selection and evidence groups become two columns, and wide content/action pairings tighten. The RFQ form and guidance rail reflow to one column at this breakpoint and the rail stops sticking. At the mobile breakpoint (720px), the system uses 18px gutters and one-column reflow for heroes, product cards, product detail, fit boundaries, partner and capability grids, inquiry preparation, every RFQ field and its guidance, policy/status utilities, action panels, and footer. The mobile reading order must preserve problem or status first, supporting evidence/content second, the explicit boundary next, and the action last. Two-up evidence photography may remain two columns when its labels and replacement status stay readable.

## Elevation & Depth

The system is flat by default. Depth comes from alternating white fields, thin blue rules, tonal image bays, and two restrained navy shadows; product imagery may use a stronger drop shadow to preserve physical scale. Buttons and interactive product cards lift only slightly on hover. Dark boundary and action sections gain separation from tone and top rules, not floating-card effects.

**The Evidence Stays Flat Rule.** Do not turn proof bays, status rows, or content boundaries into glossy marketing cards; their hierarchy comes from photography, labels, tonal contrast, and rules.

## Shapes

Corners are almost square: evidence and product containers use a 3px radius, while Stage 4 RFQ fields, actions, and navigation controls use 4px. Thin borders, hard section edges, rectangular image bays, and horizontal status rules preserve a precise industrial character; pills, vertical orange tabs, and oversized soft radii are outside the approved language.

## Components

### Buttons and Text Links

- **Primary:** Solid safety orange, white bold text, compact 4px corners, a 52px minimum height, and a directional arrow where space permits.
- **Hover / Focus:** Darken to the approved hover orange and lift by 1px; keyboard focus uses a visible cyan 3px outline with 4px offset.
- **Text link:** Link blue with a one-pixel underline; hover shifts to the dark orange. On dark fields it uses a pale blue-white and moves to white on hover.

### Site Header and Navigation

- **Desktop:** A 66px-minimum three-part header places the compact stacked brand at left, familiar B2B destinations in the center, and the quote action at right. The active destination is link blue with a short orange underline.
- **Responsive:** At 1020px the desktop links collapse into a 44px menu control. At 720px the 62px header becomes sticky, hides the brand descriptor and header quote button, and keeps the compact brand and menu visible.
- **Destination discipline:** Navigation exposes only working routes. The shared header currently leads to Products, For Distributors, About, Contact, and the dedicated RFQ route; the homepage buyer tabs expose all three partner guides.

### Breadcrumbs

Breadcrumbs are a compact ordered wayfinding line above interior H1s. They use the body stack at 0.86rem, muted ink, slash separators, and a generous responsive gap below so the H1 owns the opening. The current page is text with `aria-current`; prior levels are links.

### Cards and Content Groups

- **Product category cards:** White, low-radius containers with a cool image bay, a large concept visual, explicit concept stamp, concise selection inputs, and one guide link.
- **Evidence bays:** Desaturated photographs or generated placeholders with explicit replacement labels until approved, traceable sources exist.
- **Content groups:** Use shared borders and alternating fields for selection inputs, support areas, capabilities, release checks, and channel status. Unordered groups are not decorated with `01/02/03` markers.
- **Depth:** Thin muted-blue borders at rest; a restrained lift is allowed only on interactive product cards.

### Inputs and Fields

- **Style:** The Stage 4 RFQ uses persistent readable labels, explicit required or optional indicators, white 52px-minimum controls with 4px corners, and cool blue-gray borders. Helper and error positions remain associated with their controls; placeholders supplement labels and never replace them.
- **Contact rule:** Require at least one reply path: email or WhatsApp. Preferred channel remains a separate optional choice.
- **Conditional detail:** Selecting `Need selection help` reveals the operating-duty fieldset and makes its application field required; choosing a product category keeps those fields hidden and disabled.
- **Focus and error:** Focus uses a visible blue/cyan ring. Invalid controls use a warm error treatment, persistent field-level copy, `aria-invalid`, and focus moves to the first invalid control after validation.

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
- **Do** use horizontal orange top rules for status emphasis and retain the 6rem interior-H1 ceiling.
- **Do** keep reduced-motion behavior, visible keyboard focus, and the mobile reading order intact.
- **Do** keep field labels, helper text, errors, Turnstile state, delivery state, and the local-versus-live boundary readable at every responsive width.

### Don't:

- **Don't** present a concept image as a real Xingxu product, location, warehouse, nameplate, stock item, model, or performance record.
- **Don't** imply a published SKU, factory, certification, authorization, customer, export record, performance figure, or active contact channel without evidence.
- **Don't** treat a local-test `201`, the presence of the RFQ form, or direct access to the thank-you route as proof of live production delivery.
- **Don't** add an inquiry database, file upload, or attachment storage to the Stage 4 truth boundary without a separately approved data, privacy, and retention design.
- **Don't** use decorative ordinals for unordered categories, capabilities, evidence, checks, or status groups.
- **Don't** reintroduce repeated section kickers, action-panel eyebrows, orange side rails, generic blue-machinery styling, decorative gradients, pill-heavy UI, or orange used as atmosphere.
