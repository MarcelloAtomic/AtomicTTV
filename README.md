# AtomicTTV

**Twitch-Werbeblocker für uBlock Origin – ohne Tampermonkey.**

AtomicTTV versucht, Werbung in Twitch-Livestreams mit alternativen Videosegmenten zu umgehen. Die Wiedergabe soll dabei möglichst stabil bleiben.

## Installation

Du brauchst das **vollständige uBlock Origin** (am einfachsten mit Firefox). **uBlock Origin Lite funktioniert nicht.**

**1. Script-URL eintragen**

Öffne **uBlock Origin → Dashboard → Einstellungen**. Aktiviere **„Ich bin ein erfahrener Anwender“** und öffne das **Zahnrad** daneben.

Suche `userResourcesLocation` und trage diese Zeile ein:

```text
userResourcesLocation https://raw.githubusercontent.com/MarcelloAtomic/AtomicTTV/master/atomicttv/atomicttv-ublock-origin.js
```

Falls dort noch die alte URL von `pixeltris/TwitchAdSolutions` steht, **ersetze sie**.

**2. Filter hinzufügen**

Öffne **Meine Filter** und füge diese Zeile hinzu:

```text
twitch.tv##+js(twitch-videoad)
```

**3. Fertig**

Speichere die erweiterten Einstellungen, klicke bei **Meine Filter** auf **Änderungen übernehmen** und lade Twitch neu.

**[Script-URL direkt öffnen](https://raw.githubusercontent.com/MarcelloAtomic/AtomicTTV/master/atomicttv/atomicttv-ublock-origin.js)** · [Kurze Anleitung und Fehlerbehebung](docs/UBLOCK.md)

> **Wichtig:** Nicht gleichzeitig das alte TwitchAdSolutions-Scriptlet oder andere Twitch-Adblocker verwenden. AtomicTTV ist experimentell; Twitch-Änderungen können die Funktion beeinträchtigen. Automatische Tests ersetzen keinen Live-Test.

## Weitere Informationen

- [Alternative Installation (Browser-Erweiterung oder Userscript)](docs/INSTALL.md)
- [Quellcode](atomicttv/) · [Entwicklung & Tests](docs/ROADMAP.md)
- [MIT-Lizenz](LICENSE) · [Drittanbieter-Credits](THIRD_PARTY_NOTICES.md)

Basierend auf [TwitchAdSolutions](https://github.com/pixeltris/TwitchAdSolutions) und [TwitchAdBlock](https://github.com/scamorza/TwitchAdBlock). Nicht mit Twitch verbunden.
