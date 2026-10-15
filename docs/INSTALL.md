# Installation von AtomicTTV

**Version:** 1.0.0 · **Status:** experimentell, automatisierte Prüfungen erfolgreich; noch keine unabhängige Live-Validierung mit Twitch im Oktober 2026.

## Variante A: Userscript (empfohlen)

1. Installiere **Tampermonkey** oder **Violentmonkey**. Erlaube bei Chrome/Edge ggf. Userscripts in den Erweiterungsdetails (Browser-Einstellungen oder Entwicklermodus, je nach Version).
2. Öffne direkt [AtomicTTV Userscript](https://raw.githubusercontent.com/MarcelloAtomic/AtomicTTV/master/atomicttv/atomicttv.user.js) und installiere es über den Userscript-Manager.
3. Entferne oder deaktiviere **alle anderen Twitch-spezifischen Blocker-Skripte**, insbesondere VAFT, TwitchAdSolutions und TwitchAdBlock. Normale zusätzliche Erweiterungen können ebenfalls kollidieren.
4. Öffne einen Live-Stream auf https://www.twitch.tv. Öffne F12 → Konsole und gib `window.atomicTTV.status()` ein. Das Script zeigt einen Status mit den aktiven Hooks und der Player-Erkennung.
5. Diagnose: `window.atomicTTV.setLogLevel('debug')`. Probleme ohne Account-Tokens, Cookies oder Streamsignaturen melden.

## Variante B: Chrome / Edge / Brave als Erweiterung

1. Hole dir den Quellcode des Repositories (GitHub → Code → Download ZIP) oder ein späteres Release-ZIP, und entpacke ihn.
2. Wenn du den Repository-Quellcode verwendest: Öffne `chrome://extensions` bzw. `edge://extensions`, aktiviere **Entwicklermodus**, klicke **Entpackte Erweiterung laden**, und wähle den Repository-Ordner mit `manifest.json` aus.
3. Für das schlanke Erweiterungspaket: Node.js 20+ installieren, im Projekt `npm run package:extension` ausführen; anschließend den generierten Ordner `dist/AtomicTTV-Chromium-1.0.0` laden.
4. Stelle sicher, dass weder Variante A noch ältere Twitch-Blocker parallel laufen. Ein gleichzeitiger Betrieb kann den Player beschädigen.
5. Der Erweiterungskern ist derselbe wie bei Variante A. Updates für eine entpackte Erweiterung müssen manuell eingespielt werden.

## Was du erwarten kannst

- Nach einem Twitch-Update können einzelne Methoden jederzeit versagen. Gelegentliche Qualitätswechsel, Buffering oder schwarze Bilder lassen sich nicht garantiefrei ausschließen.
- Keine Unterstützung für die mobile Twitch-App. Für Firefox zunächst die Userscript-Variante verwenden.
- Twitch Turbo ist der offizielle werbefreie Weg.
- Diese Software ist nicht offiziell von Twitch und kann gegen dessen Nutzungsbedingungen verstoßen.

## Fehlerdiagnose

```js
window.atomicTTV.status()
window.atomicTTV.setLogLevel('debug')
window.atomicTTV.overlayBuffer()
```

Wenn `window.atomicTTV` nicht existiert: Prüfe Installation, Berechtigungen für Twitch, Seitenneustart und Konflikte mit anderen Userscripts. Wenn es existiert, aber kein Video läuft: Browser, Version, Codec/Qualität, Zeitpunkt des Problems, **bereinigte** Konsolenlogs und eine genaue Reproduktionsfolge notieren.

**Nie** Authorization-Header, Cookies, Playback-Token, vollständige signierte m3u8-URLs oder private Kanalinformationen veröffentlichen.
