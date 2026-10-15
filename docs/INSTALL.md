# AtomicTTV installieren

**Empfohlen für uBlock-Nutzer:** [Einfache uBlock-Origin-Anleitung](UBLOCK.md). Du brauchst dafür **kein Tampermonkey**.

## Andere Installationsmöglichkeiten

### Chrome, Edge oder Brave: eigene Erweiterung

1. Öffne einen [erfolgreichen GitHub-Actions-Lauf](https://github.com/MarcelloAtomic/AtomicTTV/actions/workflows/checks.yml) und lade unter **Artifacts** `AtomicTTV-Chromium-1.0.0` herunter.
2. Entpacke das heruntergeladene Archiv und das enthaltene Erweiterungs-ZIP.
3. Öffne `chrome://extensions` oder `edge://extensions`, aktiviere den **Entwicklermodus** und wähle **Entpackte Erweiterung laden**.
4. Wähle den entpackten Ordner mit `manifest.json`. Lade Twitch neu.

### Optional: Userscript

Installiere [AtomicTTV als Userscript](https://raw.githubusercontent.com/MarcelloAtomic/AtomicTTV/master/atomicttv/atomicttv.user.js) über Tampermonkey oder Violentmonkey. Das ist **nicht** erforderlich, wenn du die uBlock-Methode nutzt.

## Wichtig

Nutze **nur eine** der drei Varianten: uBlock-Scriptlet, Browser-Erweiterung oder Userscript. Andere Twitch-spezifische Adblocker können zu Konflikten führen.

AtomicTTV ist experimentell. Echtzeit-Wirksamkeit und unterbrechungsfreie Twitch-Wiedergabe sind nicht garantiert. Bei Problemen findest du [Hilfe in der uBlock-Anleitung](UBLOCK.md). Gib in Fehlerberichten niemals Cookies, Authentifizierungsdaten oder signierte Stream-URLs weiter.

Quellcode und Lizenz: [AtomicTTV](https://github.com/MarcelloAtomic/AtomicTTV) · [MIT](../LICENSE) · [Credits](../THIRD_PARTY_NOTICES.md)
