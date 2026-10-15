# AtomicTTV für uBlock Origin

**Direkt einbindbar – kein Tampermonkey/Violentmonkey erforderlich.**

Die moderne AtomicTTV-Engine wird in eine uBlock-Origin-Ressource mit dem Namen `twitch-videoad.js` verpackt. Diese Resource kann wie bei pixeltris' Original via `userResourcesLocation` geladen werden.

## Script-URL (Master, aktueller Quellstand)

```text
https://raw.githubusercontent.com/MarcelloAtomic/AtomicTTV/master/atomicttv/atomicttv-ublock-origin.js
```

## Installation

1. **uBlock Origin → Dashboard → Meine Filter:** `twitch.tv##+js(twitch-videoad)` eingeben und Änderungen übernehmen.
2. **Einstellungen:** `Ich bin ein erfahrener Anwender` aktivieren, dann Zahnrad öffnen.
3. In den erweiterten Einstellungen `userResourcesLocation` von `unset` auf `userResourcesLocation https://raw.githubusercontent.com/MarcelloAtomic/AtomicTTV/master/atomicttv/atomicttv-ublock-origin.js` setzen. Den bisherigen `pixeltris`-URL durch unseren ersetzen; nicht beide Scriptlets zugleich konfigurieren.
4. Speichern, uBlock Origin deaktivieren/aktivieren oder Browser neu starten, dann Twitch neu laden.

Andere, unabhängige Custom-Ressourcen dürfen mit Leerzeichen getrennt zusätzlich aufgeführt werden. Es darf aber keine zweite Ressource mit dem Namen `twitch-videoad` aktiv sein.

## Welche Version von uBlock?

Erforderlich ist **uBlock Origin (vollständige Version)**. **uBlock Origin Lite** kann keine externen Scriptlets über `userResourcesLocation` laden. Besonders aktuelle Chrome-Versionen unterstützen klassische Manifest-V2-Erweiterungen nicht mehr; nutze dann einen Browser mit vollständigem uBlock Origin oder die separate AtomicTTV-Manifest-V3-Erweiterung.

## Pflege und Sicherheit

Der Scriptlet-Code kommt aus `atomicttv/atomicttv.user.js`; `npm run build:ublock` regeneriert ihn deterministisch, und `npm run check` erkennt Abweichungen. Die Raw-URL auf `master` erhält bei regulärer Ressourcenaktualisierung neue Versionen. Für unveränderliche Builds den URL-Pfad `master` durch einen vollständigen Commit-Hash ersetzen und manuell aktualisieren. Fremde Scriptlet-URLs führen ausführbaren Code aus: Quelle vor Änderungen prüfen.

**Status:** automatisierte Tests für Syntax/Erzeugung; Live-Funktionstests mit aktuellem Twitch und uBlock Origin sind noch offen. Werbeblockierung kann durch Änderungen an Twitch jederzeit ausfallen. Keine Garantie für störungsfreie Wiedergabe. 
