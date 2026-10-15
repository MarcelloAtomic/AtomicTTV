# AtomicTTV Roadmap & validation status

## Version 1.0.0 – shipped source and build

- [x] Fork of original TwitchAdSolutions, with unmodified upstream history.
- [x] Integrate a modern VAFT implementation based on TwitchAdBlock v2.2.3 (2026-09-17).
- [x] Keep TwitchAdSolutions, TwitchAdBlock and AtomicTTV MIT attribution.
- [x] Provide AtomicTTV-specific userscript metadata and auto-update endpoints.
- [x] Enforce fail-closed conflict guard against simultaneous legacy worker hooks.
- [x] Chrome/Edge/Brave MV3 unpacked extension with one Twitch-scoped MAIN-world content script.
- [x] No unnecessary background or host permissions.
- [x] Ship reproducible extension build and automatic artifacts.
- [x] Add tests for playlists, discontinuities, live-sequence ledger, endlist, prefetch, timestamp continuity, backup gaps and metadata.
- [x] Tag-gated release workflow with mandatory tests.
- [x] German installation, debugging and privacy documentation.

## Display ads (AtomicTTV 1.0.1)

- [x] Repeat bounded ad-manager discovery at low frequency on long-lived Twitch sessions, even after initial failure or initial success.
- [x] Report recovery count and last healthy check in diagnostics.
- [x] Keep full uBlock Origin scriptlet synchronized with this new worker engine.
- [ ] Validate above-chat video ads in Brave/uBlock Origin during a real Twitch session.

## uBlock Origin resource format (AtomicTTV 1.0.2)

- [x] Reproduce resource truncation with uBO's actual `resourcesFromString` parser: only the opening wrapper reached injection, producing `Unexpected token 'catch'`.
- [x] Remove empty lines when generating the legacy resource; normalize Windows line endings in generation and validation.
- [x] Validate the parsed resource, bootstrap diagnostics/fetch/worker hooks in an isolated test, and run playlist regression cases against both userscript and parsed worker source.
- [x] Document resource reload and distinguish a matching logger entry from successful startup.
- [ ] Verify the corrected resource in the user's installed uBO and test real Twitch ads.

## Functional testing – NOT YET VERIFIED

These require interactive playback and cannot be certified by GitHub CI:

- [ ] Firefox / Tampermonkey / Violentmonkey injection against current Twitch player.
- [ ] Chrome and Edge extension injection and real-world stream startup.
- [ ] Preroll/midroll interruptions during real Twitch sessions.
- [ ] VOD player behavior and ad handling.
- [ ] 1080p60 AVC and higher-resolution HEVC where available.
- [ ] Prolonged 60-minute session with multiple midrolls; observe audio desync and stalling.
- [ ] Interoperability with popular Twitch chat extensions, BTTV and FFZ.

## Known constraints

- It is impossible to guarantee universal Twitch ad blocking because server-side streams and private player internals change.
- Automatic recovery can still cause reloads or a temporarily frozen image.
- High-quality backup streams are not always available; fallback may reduce rendition quality.
- Legacy `vaft/`, `video-swap-new/` and `strip/` remain for historical reasons and are NOT the primary install target.
- AtomicTTV is not endorsed by Twitch. Official alternative: Twitch Turbo.

## Next engineering milestones after field reports

- Turn live logs into sanitized regression fixtures, not raw auth tokens.
- Add a real-browser smoke suite with a consented test environment.
- Add an explicit feature toggle for client-side display-ad handling if Twitch changes the ad manager.
- Improve bounded recovery if live sessions demonstrate repeated reloads.
- Support Firefox extensions after separate compatibility tests.
