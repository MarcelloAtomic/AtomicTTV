# Contributing to AtomicTTV

AtomicTTV is currently an experimental fork. The objective is reliable player behaviour, not claims of universal ad-blocking effectiveness.

## Local checks

1. Install Node.js 20 or later.
2. From the repository root, run \`npm run check\`.
3. Avoid adding dependencies for simple unit tests.
4. Preserve the MIT license and upstream attribution.

## Change policy

- Make changes on a branch and submit a pull request.
- Keep diffs focused; changes to \`vaft.user.js\` and the uBO version should be deliberately synchronized where their runtime logic is shared.
- Add a regression test for each reproducible player/playlist bug.
- Do not introduce arbitrary remote code execution, browser-wide interception, or logging of sensitive auth tokens.
- Do not claim current Twitch compatibility without documenting browser, script manager, UTC date, player mode and repeatable manual observations.

## Useful bug report fields

- Browser + version, operating system, userscript manager + version
- Exact AtomicTTV commit/version, other Twitch extensions enabled
- Live or VOD, quality, codec (AVC/HEVC), low-latency mode
- Preroll or midroll, stream symptoms, reproduction steps
- Sanitized logs: redact cookies, authorization headers, signatures and access tokens

## Release policy

Merging a pull request does not publish a release. Releases are created from explicitly pushed \`v*\` tags only after checks pass.
