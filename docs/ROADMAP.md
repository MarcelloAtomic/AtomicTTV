# AtomicTTV development roadmap

**Baseline:** pixeltris/TwitchAdSolutions, archived 2026-03-05.
**Primary target:** VAFT. **Status:** experimental, not current-Twitch-validated.

## Phase 0: repository safety and reproducibility

- [x] Preserve upstream history, MIT license and attribution.
- [x] Keep master as the base; propose changes via a development branch and PR.
- [x] Repoint VAFT userscript update/download metadata to AtomicTTV.
- [x] Add syntax checks, scriptlet checks and deterministic tests for a playlist transformation.
- [x] Stop automatic GitHub Releases on unrelated master commits; release only on explicit tags.
- [ ] Merge after review and passing checks.

## Phase 1: isolate and test playlist logic

- [ ] Extract reusable parsing/normalization functions from the large VAFT script (without changing browser behaviour).
- [ ] Add real-world but sanitized HLS fixtures for `EXTINF`, stitched ad markers, dateranges, prefetch and discontinuity transitions.
- [ ] Test timestamp and segment continuity, replayed or duplicated segments, and failure to obtain a clean backup.
- [ ] Define invariants for media-sequence, Twitch live-sequence, clock drift and restored rendition.
- [ ] Add bounded retry/backoff and guard against repeated reload loops.

## Phase 2: browser/stream integration

- [ ] Verify installation and injection in current Firefox + Chrome/Edge with supported userscript managers.
- [ ] Test initial playback, preroll/midroll, channel switching, background tabs, raids and VODs.
- [ ] Test 1080p60 AVC and available 1440p/HEVC streams separately.
- [ ] Check compatibility with BTTV/FFZ and avoid simultaneous Twitch-specific ad blockers.
- [ ] Record reproducible outcomes, not anecdotal 100% success rates.

## Phase 3: distribution and maintenance

- [ ] Decide whether to keep uBO scriptlet parity or deprecate it.
- [ ] Consider a WebExtension only if its browser API permissions and maintenance cost are justified.
- [ ] Publish a signed/traceable release after verified functional testing.
- [ ] Track Twitch changes via issues and fixtures; never collect user account tokens in telemetry.

## Initial defects and research references

- Upstream #492: freezing/buffering/audio desynchronization.
- Upstream #499: Twitch player structure changes; original has an upstream fix.
- Upstream #506: black-screen behaviour when a clean backup stream is unavailable.
- Playlist URL sanitization in VAFT calculated a modified line but did not persist it. The Phase 0 patch adds the missing assignment and regression coverage.

No live Twitch playback testing is implied by Phase 0.
