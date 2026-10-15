# AtomicTTV

**An experimental, independently maintained fork of [pixeltris/TwitchAdSolutions](https://github.com/pixeltris/TwitchAdSolutions).**

> **Development status (October 2026):** The original VAFT implementation is the starting point. AtomicTTV has **not** yet been validated against current Twitch playback and advertising behaviour. Do not interpret passing unit tests as proof of working ad blocking or uninterrupted video.

## What is included?

| Component | Status |
| --- | --- |
| [VAFT userscript](vaft/vaft.user.js) | Primary development target |
| [VAFT uBlock Origin scriptlet](vaft/vaft-ublock-origin.js) | Legacy compatibility; shares targeted fixes |
| [video-swap-new](video-swap-new/) | Archived upstream alternative; no new features planned yet |
| [strip](strip/) | Upstream legacy implementation; **not recommended** |
| [Troubleshooting](issues.md) and [alternative solutions](full-list.md) | Upstream reference documents (not yet revalidated) |

**Do not combine multiple Twitch-specific ad-blocking userscripts.** They can interfere with one another when hooking the same browser APIs.

## Installation (experimental)

After a tested release is published, review the code and install the VAFT userscript using a userscript manager such as Tampermonkey or Violentmonkey:

[Install AtomicTTV VAFT](https://raw.githubusercontent.com/MarcelloAtomic/AtomicTTV/master/vaft/vaft.user.js)

The userscript's \`@updateURL\` points to this fork's \`master\` branch. For reproducible installations, use a commit-specific permalink and update manually instead. **Until this development branch is merged, the link above still serves the unmodified upstream script.**

For Chromium-based browsers, user scripts may need to be explicitly allowed in the userscript manager's extension settings.

## Development

Requires Node.js 20 or later. No runtime dependencies are required by the test suite.

\`\`\`bash
npm run check
\`\`\`

This runs JavaScript syntax checks for the browser userscripts and uBlock scriptlets, plus Node.js unit tests. The tests currently cover **selected playlist-transform behaviour and installation metadata**. They do not simulate a live Twitch session.

See [docs/ROADMAP.md](docs/ROADMAP.md) for the implementation and validation plan and [CONTRIBUTING.md](CONTRIBUTING.md) for reproduction/reporting guidance.

## Attribution and license

AtomicTTV is derived from **[pixeltris/TwitchAdSolutions](https://github.com/pixeltris/TwitchAdSolutions)** and retains the original [MIT license](LICENSE) and contributor attribution. Some underlying ideas and code have additional historical attribution in the original scripts.

This repository is not affiliated with or endorsed by Twitch. Third-party ad-blocking may breach Twitch's Terms of Service; evaluate the technical and account risks yourself. Subscriptions and Twitch Turbo are official alternatives.

## Kurzfassung auf Deutsch

AtomicTTV ist unser Entwicklungs-Fork des am 5. März 2026 archivierten TwitchAdSolutions-Projekts. Wir konzentrieren uns zuerst auf **VAFT, Fehlerdiagnose, Stream-Stabilität und reproduzierbare Tests**. Ein erfolgreicher Testlauf bedeutet noch **nicht**, dass die Werbeblockierung auf Twitch aktuell zuverlässig funktioniert.
