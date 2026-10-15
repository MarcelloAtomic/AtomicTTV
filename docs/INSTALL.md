# AtomicTTV installieren

**Empfohlen: [Brave + uBlock Origin in vier Schritten](UBLOCK.md).** Kein Tampermonkey erforderlich.

## Alternative 1: AtomicTTV als eigene Brave-Erweiterung

Falls du uBlock Origin nicht nutzen möchtest:

1. Öffne die [GitHub-Actions-Übersicht](https://github.com/MarcelloAtomic/AtomicTTV/actions/workflows/checks.yml) und wähle einen erfolgreichen Lauf.
2. Lade unter **Artifacts** `AtomicTTV-Chromium-1.0.1` herunter und entpacke das Archiv sowie die darin enthaltene ZIP-Datei.
3. Öffne `brave://extensions`, aktiviere den Entwicklermodus und klicke auf **Entpackte Erweiterung laden**.
4. Wähle den Ordner aus, der die Datei `manifest.json` enthält. Lade Twitch neu.

Diese Variante funktioniert unabhängig von uBlock Origin. Es ist keine zusätzliche Userscript-Verwaltung nötig.

## Alternative 2: Userscript

Die [AtomicTTV-Userscript-Datei](https://raw.githubusercontent.com/MarcelloAtomic/AtomicTTV/master/atomicttv/atomicttv.user.js) kann mit einem geeigneten Userscript-Manager installiert werden. Für die oben beschriebene Brave/uBlock-Methode ist das **nicht nötig**.

## Wichtig

Bitte **nur eine Installationsart** gleichzeitig verwenden: uBlock-Scriptlet, eigene Erweiterung oder Userscript. Andere Twitch-spezifische Blocker können Konflikte auslösen.

AtomicTTV ist experimentell; die Werbeblockierung und unterbrechungsfreie Wiedergabe sind nicht garantiert. Für die Fehlersuche siehe [Brave-Anleitung](UBLOCK.md). Teile niemals Account-Tokens, Cookies oder vollständige signierte Stream-URLs.

[Zurück zur GitHub-Startseite](../README.md) · [MIT-Lizenz](../LICENSE) · [Credits](../THIRD_PARTY_NOTICES.md)
