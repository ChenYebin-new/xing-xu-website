# XINGXU FAN brand assets

The production logo is the `2A / Precision` direction approved on 2026-09-20. It was redrawn as flat vector geometry from the selected raster concept board rather than cropped or auto-traced.

## Files

- `xingxu-fan-mark.svg`: standard deep-navy and orange mark for light backgrounds.
- `xingxu-fan-mark-reverse.svg`: white and orange mark for dark backgrounds.
- `xingxu-fan-lockup.svg`: outlined horizontal logo with the approved descriptor.
- `xingxu-fan-lockup-reverse.svg`: outlined horizontal reverse logo.

The website header and footer use the same geometry through `BrandLogo.astro`, with live text so the compact lockup stays responsive and accessible. Browser icons are published from `public/`.

## Usage

- Standard colors: deep navy `#06133f`, orange `#c2410c`.
- Keep clear space around the mark equal to at least one quarter of its height.
- Use the standalone mark at a minimum height of 24px. The favicon has slightly wider internal gaps for 16–32px rendering.
- Use the descriptor lockup at a minimum height of 64px. Header-sized lockups omit the descriptor on mobile.
- Preserve the flat sharp geometry and transparent internal gaps.
- Do not add gradients, shadows, outlines, enclosing shapes, rounded corners, or extra airflow lines.

## Source decision

Selection record: `2A / Precision`, approved on 2026-09-20. The local concept-board archive is intentionally excluded from source publication; its SHA-256 is `23908bc2ad6306a682adfaa8045fea61b794b21ae0db65888c39d0aa6a20960a`.

The board is a direction record only. It contains multiple compositions on an opaque white background and must not be used as the production logo.
