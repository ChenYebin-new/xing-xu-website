---
name: "XINGXU FAN"
description: "An evidence-led industrial showroom for credible fan supply and sourcing."
colors:
  safety-orange: "#c2410c"
  safety-orange-hover: "#a93605"
  deep-navy: "#06133f"
  dark-navy: "#0a1847"
  technical-navy: "#122759"
  muted-ink: "#53698f"
  link-blue: "#006e9d"
  line-blue: "#c8dce4"
  rule-blue: "#b9d7e3"
  cool-blue-wash: "#eef6f8"
  warm-white: "#fbfcfb"
  cool-white: "#f4f9fa"
  pure-white: "#ffffff"
  focus-cyan: "#00a1d4"
  success-pale: "#b9f5d3"
  error-pale: "#ffd7cf"
typography:
  display:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(3.25rem, 3.75vw, 3.8rem)"
    fontWeight: 800
    lineHeight: 0.87
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2.6rem, 4.1vw, 4.2rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(1.7rem, 2.25vw, 2.35rem)"
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
  field: "3px"
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
    padding: "10px 12px"
    height: "44px"
---

# Design System: XINGXU FAN

## Overview

**Creative North Star: "The Evidence-led Industrial Showroom"**

The system presents industrial products with the discipline of a technical showroom: product scale is decisive, operating evidence is explicit, and inquiry is the natural next step. Warm and cool white fields keep the page open; deep navy gives it authority; muted blue rules organize information; safety orange appears only where action or state needs emphasis.

**Key Characteristics:**

- Evidence-led rather than claim-led.
- Condensed technical display typography over plain international-English body copy.
- Flat, low-radius surfaces separated by rules, tonal fields, and restrained shadows.
- Product photography and traceable business evidence carry the visual identity.

## Colors

Deep navy and cool blue organize a warm/cool white field; safety orange is the scarce action color.

### Primary

- **Safety Orange:** Primary quote actions, active buyer indicators, and short capability marks. Its darker partner is the hover state.

### Secondary

- **Link Blue:** Text links, evidence headings, selected tabs, and technical wayfinding.

### Neutral

- **Deep Navy:** Primary text, dark inquiry surfaces, and the strongest structural contrast.
- **Muted Ink:** Supporting copy and annotations.
- **Warm White and Cool White:** Alternating page fields; neither should become a sterile gray canvas.
- **Line Blue and Rule Blue:** Dividers, card borders, and evidence-bay structure.

**The Scarce Orange Rule.** Reserve orange for actions, active state, and short industrial marks; it must not become a decorative wash.

## Typography

**Display Font:** Self-hosted Barlow Condensed, with Arial Narrow and sans-serif fallbacks.
**Body Font:** Segoe UI Variable Text, with Segoe UI, Arial, and sans-serif fallbacks.

**Character:** Display type is compressed, heavy, and equipment-like. Body type remains calm and familiar for technical buyers reading in international English.

### Hierarchy

- **Display:** Extra-bold, tightly tracked, and compact for the main identity statement.
- **Headline:** Extra-bold condensed type for section openings.
- **Title:** Bold condensed type for product, capability, and evidence names.
- **Body:** Regular system sans at a 1rem floor with readable line spacing and restrained line length; buyer requirements and contact-channel names use this role rather than metadata sizing.
- **Label:** Small, bold, widely tracked uppercase text at 0.79rem for evidence, concept-status, contact-group, and pending-state labels.

**The Two-Voice Rule.** Barlow Condensed carries identity and hierarchy; the body stack carries explanation, navigation, and form content.

## Layout

The desktop frame uses broad responsive gutters and a three-column first viewport: company identity and actions, one decisive product image, then a four-bay evidence board. Below it, capabilities form a ruled band, products use a three-card grid, and the buyer-path area is paired with a dark RFQ rail.

At the medium breakpoint (1020px), navigation collapses, the opening becomes two columns, evidence spans the next row, product cards move to two columns, and the RFQ rail stacks below the buyer path. At the mobile breakpoint (720px), the page becomes a single column with 18px side gutters; the reading order prioritizes identity, product, evidence, capabilities, products, buyer path, and RFQ. Evidence remains a two-column grid while products, tabs, fields, contact channels, and footer stack.

## Elevation & Depth

The system is flat by default. Depth comes from alternating white fields, thin blue rules, tonal image bays, and two restrained navy shadows; product imagery may use a stronger drop shadow to preserve physical scale. Buttons and product cards lift only slightly on hover.

**The Evidence Stays Flat Rule.** Do not turn proof bays into glossy marketing cards; their hierarchy comes from photography, labels, and rules.

## Shapes

Corners are almost square: fields and evidence/product containers use a 3px radius, while actions and navigation controls use 4px. Thin borders, hard section edges, and rectangular image bays preserve a precise industrial character; pills and oversized soft radii are outside the approved language.

## Components

### Buttons

- **Primary:** Solid safety orange, white bold text, compact 4px corners, and a directional arrow where space permits.
- **Hover / Focus:** Darken to the approved hover orange and lift by 1px; keyboard focus uses a visible cyan 3px outline with 4px offset.
- **Text link:** Link blue with a one-pixel underline; hover shifts to the dark orange.

### Cards / Containers

- **Evidence bays:** A four-part desktop board of desaturated photographs with a navy gradient overlay and explicit `PHOTO PLACEHOLDER` / `SOURCE REQUIRED` labels until approved traceable images exist.
- **Product cards:** Light, low-radius containers with large concept-product imagery, concise category copy, and a clearly stated no-published-SKU boundary.
- **Depth:** Thin muted-blue borders at rest; a restrained lift is allowed only on interactive product cards.

### Inputs / Fields

- **Style:** Persistent labels, white fields, 3px corners, 44px minimum control height, and cool blue-gray borders on the dark RFQ rail.
- **Focus:** Border and outline shift to cyan; placeholders retain readable contrast.
- **Status:** Error and success messages use pale state colors on lightly tinted backgrounds and an `aria-live` status output.

### Navigation

Desktop navigation centers familiar B2B sections between the identity and quote action. On mobile, the compact brand remains visible in a sticky header and a 44px menu control reveals stacked links.

### Buyer Path and RFQ Rail

Buyer tabs synchronize with the customer-type field and support click and arrow-key selection. Category links preselect the matching product category. The RFQ control currently validates required information only: it sends and stores nothing, and it must say so in both its introductory and result states.

## Do's and Don'ts

### Do:

- **Do** replace every generated concept or evidence image with an approved real source before launch, keeping status labels until replacement is verified.
- **Do** use product facts, names, contact details, and evidence only after their source is approved and traceable.
- **Do** preserve the trust-first flow from identity and evidence to product choice and a structured inquiry.
- **Do** keep reduced-motion behavior and visible keyboard focus intact.

### Don't:

- **Don't** present a concept image as a real Xingxu product, location, warehouse, or nameplate.
- **Don't** imply a published SKU, factory, certification, authorization, customer, export record, or performance figure without evidence.
- **Don't** present pending contact channels as live or imply that the current RFQ preview transmits, stores, protects, or delivers data.
- **Don't** drift into a generic blue machinery template, decorative gradients, pill-heavy UI, or orange used as atmosphere.
