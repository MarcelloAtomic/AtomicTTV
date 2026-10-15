# AtomicTTV

**Twitch-Werbeblocker für Brave mit uBlock Origin – ohne Tampermonkey.**

AtomicTTV versucht, Werbung in Twitch-Livestreams über alternative Videosegmente zu umgehen.

## Installation in Brave

**1. uBlock Origin aktivieren**

Öffne in Brave `brave://settings/extensions/v2` und installiere bzw. aktiviere **uBlock Origin**. Falls es schon installiert ist, überspringe diesen Schritt. **Nicht uBlock Origin Lite verwenden.**

**2. AtomicTTV-URL eintragen**

Öffne das **uBlock-Origin-Dashboard → Einstellungen**. Aktiviere **„Ich bin ein erfahrener Anwender“** und klicke auf das **Zahnrad** daneben.

Suche `userResourcesLocation` und trage Folgendes ein:

```text
userResourcesLocation https://raw.githubusercontent.com/MarcelloAtomic/AtomicTTV/master/atomicttv/atomicttv-ublock-origin.js
```

Wenn dort bereits die alte TwitchAdSolutions-URL steht, ersetze **nur diese URL**. Andere, unabhängig genutzte URLs kannst du behalten. Speichere die Änderung.

**3. Filter hinzufügen**

Öffne **Meine Filter**, füge die Zeile hinzu und klicke auf **Änderungen übernehmen**:

```text
twitch.tv##+js(twitch-videoad)
```

**4. Ressource aktualisieren und Twitch neu laden**

Beim Update von einer älteren AtomicTTV-Version folge dem kurzen [Ressourcen-Reset](docs/UBLOCK.md#ressource-neu-laden).
Lade Twitch anschließend vollständig neu. Version **1.0.2** behebt ein uBO-Formatproblem, durch das ältere AtomicTTV-Ressourcen bereits vor dem Start abgeschnitten wurden.

[**Script-URL öffnen**](https://raw.githubusercontent.com/MarcelloAtomic/AtomicTTV/master/atomicttv/atomicttv-ublock-origin.js) · [**Ausführliche Brave-Anleitung & Hilfe**](docs/UBLOCK.md)

> **Hinweis:** Benutze nicht gleichzeitig andere Twitch-spezifische Adblock-Scriptlets. AtomicTTV ist experimentell; Twitch-Änderungen können die Funktion beeinträchtigen. Automatische Tests ersetzen keine Live-Überprüfung.

## Weitere Informationen

- [Andere Installationsmöglichkeiten](docs/INSTALL.md)
- [Quellcode](atomicttv/) · [Entwicklung & Tests](docs/ROADMAP.md)
- [MIT-Lizenz](LICENSE) · [Credits](THIRD_PARTY_NOTICES.md)

Basierend auf [TwitchAdSolutions](https://github.com/pixeltris/TwitchAdSolutions) und [TwitchAdBlock](https://github.com/scamorza/TwitchAdBlock). Nicht mit Twitch verbunden.
