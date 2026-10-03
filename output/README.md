# Design and publication archives

These existing workspace materials are included in version control at the user's request on 2026-10-03. They are reference artifacts; Astro does not publish this directory as website assets.

- `branding/logo-concepts-2026-09-18/`: four original logo directions, their comparison board and generation prompts.
- `branding/x-mark-refinements-2026-09-18/`: four refinements of the selected X-mark family, their comparison board and prompts. These are concept explorations, not additional production logos.
- `design-refinement-2026-10-03/`: source baselines, page screenshots, responsive measurements, gallery checks and the original local verification summary.
- `command-one-ui-2026-10-03/`: historical source snapshots, scope patches and staged-file verification for the earlier UI-only commit `39f6c76`. `prepare-scope.mjs` is a one-time historical helper tied to that earlier workspace state; do not run it as a build or publication step.

Records retain their original scope and timing. Statements such as “no commit, push or deployment” describe the moment a record was written. The earlier scope excluded RFQ changes; the subsequent complete-workspace commit includes them. Test counts from those two scopes differ accordingly. Consult the root README for the current combined scope.

The five browser captures in `design-refinement-2026-10-03/` retain their original `.png` filenames and bytes, but the browser supplied JPEG data. Image viewers should detect their format from the contents. The branding boards are PNG images. Archived unified diffs also retain their required context-line whitespace.

Screenshots and mocked checks establish local browser behavior only. They do not establish physical-device behavior, live bot verification, Cloudflare deployment or actual email receipt. Existing ignore rules continue to exclude local logs and private review/tool state.
