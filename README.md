# AtomicTTV

**Twitch-Userscript und Chrome-/Edge-/Brave-Erweiterung (Manifest V3).** Modernisierte Weiterentwicklung des [archivierten TwitchAdSolutions-Projekts](https://github.com/pixeltris/TwitchAdSolutions) auf Basis des [TwitchAdBlock-VAFT-Nachfolgers](https://github.com/scamorza/TwitchAdBlock).

**Version:** 1.0.0 · **Projektstand:** Technisch installierbar und automatisiert getestet; keine unabhängige Garantie für aktuelle Werbeblockierung oder fehlerfreie Twitch-Live-Wiedergabe. Twitch kann interne Schnittstellen jederzeit ändern.

## Direkt installieren

### Variante A – Userscript (empfohlen)

1. [Violentmonkey](https://violentmonkey.github.io/) oder [Tampermonkey](https://www.tampermonkey.net/) installieren.
2. **[AtomicTTV v1.0.0 installieren](https://raw.githubusercontent.com/MarcelloAtomic/AtomicTTV/master/atomicttv/atomicttv.user.js)** – der Userscript-Manager zeigt die Installationsabfrage.
3. Andere Twitch-spezifische Blocker deaktivieren, Twitch neu laden.
4. Optional in der Browser-Konsole mit `window.atomicTTV.status()` prüfen.

### Variante B – Chrome, Edge oder Brave als Erweiterung

Aus dem GitHub-Repository unter **Actions → Quality checks → aktueller erfolgreicher Lauf → Artifacts** das Paket **AtomicTTV-Chromium-1.0.0** herunterladen (GitHub-Login kann notwendig sein). Das ZIP enthält ein weiteres ZIP mit dem installierbaren Erweiterungsordner; den inneren Inhalt entpacken. Dann im Browser `chrome://extensions` bzw. `edge://extensions` öffnen, Entwicklermodus aktivieren, **Entpackte Erweiterung laden** auswählen und den Ordner mit `manifest.json` laden.

Alternativ den Repository-Quellcode als ZIP herunterladen und den Repository-Ordner direkt als entpackte Erweiterung laden. Die Erweiterung benötigt keine breit gefassten Zusatzberechtigungen und injiziert den Code nur auf Twitch-Seiten.

**Wichtig:** Entweder das Userscript *oder* die Erweiterung nutzen, nicht beides gleichzeitig.

[Ausführliche Installations- und Fehlerdiagnoseanleitung](docs/INSTALL.md)

## Was AtomicTTV macht

- Erkennt in HLS-Playlists eingebettete Werbeabschnitte und versucht, deren Lücken mit einem anderen Stream auszugleichen.
- Verwendet einen sendungsweiten **Live-Sequence-Ledger**: Streams verschiedener Sitzungen werden nach Content-Segmenten statt nur nach sessionabhängigen Media-Sequences synchronisiert.
- Prüft Fallback-Player-Typen in Reihenfolge: `mobile_feed`, `popout`, `autoplay`.
- Unterstützt bei verfügbaren Twitch-Renditions auch höher aufgelöste Streams (AVC/HEVC); nicht jede Fallback-Variante hat dieselbe Qualität.
- Hat Wiederherstellungsroutinen für hängende Player, Dekodierfehler und störende Hintergrundtab-Effekte.
- Verfügt über Client-seitige Display-Ad-Behandlung und Diagnosefunktionen.

**Grenzen:** Es können weiterhin Ladepausen, schwarze Bilder oder Qualitätswechsel auftreten. Verfügbare Streamqualität und Wirksamkeit sind von Twitch abhängig; keine mobile App-Unterstützung. Bei abweichenden Twitch-Experimenten ist ein Hotfix möglichweise nötig.

## Diagnose

Öffne Twitch, drücke `F12` und teste:

```js
window.atomicTTV.status()            // Installationszustand und Player-Erkennung
window.atomicTTV.setLogLevel('debug') // Erweiterte Diagnosen
window.atomicTTV.overlayBuffer()      // Beobachtungen zu Overlay-Werbung
window.atomicTTV.banner({ShowBanner:false}) // Statusmarkierung ausblenden
```

**Keine** Cookies, Authentifizierungsheader, signierten Stream-URLs oder Playback-Tokens in Issues hochladen.

## Entwicklung und Tests

Node.js **20.11+**:

```bash
npm run check              # Syntax- und HLS-Regressionsprüfungen
npm run package:extension  # lokale Chromium-Erweiterung erzeugen
npm run verify             # alles zusammen
```

Die Tests führen die Originalfunktionen aus dem eingebetteten Stream-Worker mit synthetischen HLS-Playlists aus. Zusätzlich werden Installationsmetadaten, Legacy-VAFT-Bestand und die Erweiterung geprüft. Diese Tests ersetzen **keine** Live-Validierung von Twitch-Streams mit Werbeunterbrechungen.

## Code und Herkunft

- Hauptprodukt: [atomicttv/atomicttv.user.js](atomicttv/atomicttv.user.js)
- Erweiterungsmanifest: [manifest.json](manifest.json)
- Historische, **nicht als aktuelle Primärlösung empfohlene** Varianten: [vaft](vaft/), [video-swap-new](video-swap-new/), [strip](strip/)
- [Roadmap](docs/ROADMAP.md) · [Mitmachen](CONTRIBUTING.md) · [Drittanbieter-Credits](THIRD_PARTY_NOTICES.md)

**MIT-Lizenz.** Copyright und Autorenangaben beider Vorgängerprojekte bleiben erhalten. Twitch unterstützt dieses Projekt nicht; der Einsatz kann gegen Twitch-Nutzungsbedingungen verstoßen. Alternativ bietet [Twitch Turbo](https://www.twitch.tv/turbo) einen offiziellen Weg ohne Werbung.
