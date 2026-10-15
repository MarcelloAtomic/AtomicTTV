# AtomicTTV mit uBlock Origin installieren

**Kein Tampermonkey erforderlich.** Du brauchst das vollständige **uBlock Origin**, nicht uBlock Origin Lite. Diese Methode eignet sich beispielsweise für Firefox.

## Schritt 1 – URL eintragen

1. Öffne das **uBlock-Origin-Dashboard** und gehe auf **Einstellungen**.
2. Aktiviere **„Ich bin ein erfahrener Anwender“**.
3. Klicke auf das **Zahnrad** neben dieser Einstellung.
4. Suche die Zeile `userResourcesLocation` und ersetze ihren bisherigen Wert mit der folgenden URL:

```text
https://raw.githubusercontent.com/MarcelloAtomic/AtomicTTV/master/atomicttv/atomicttv-ublock-origin.js
```

Die vollständige Zeile soll dann so aussehen:

```text
userResourcesLocation https://raw.githubusercontent.com/MarcelloAtomic/AtomicTTV/master/atomicttv/atomicttv-ublock-origin.js
```

Entferne dabei die alte `pixeltris/TwitchAdSolutions`-URL, damit nicht zwei Versionen desselben Scriptlets eingebunden werden. Speichere die Änderung.

## Schritt 2 – Filter eintragen

1. Öffne in uBlock Origin den Reiter **Meine Filter**.
2. Füge folgende Zeile ein (falls sie noch nicht vorhanden ist):

```text
twitch.tv##+js(twitch-videoad)
```

3. Klicke auf **Änderungen übernehmen**.

## Schritt 3 – Twitch neu laden

Öffne einen Twitch-Stream oder lade eine bereits geöffnete Twitch-Seite neu. Fertig.

## Falls es nicht funktioniert

- Prüfe, ob du **uBlock Origin** statt **uBlock Origin Lite** verwendest. Bei aktuellen Chrome-Versionen wird das klassische uBlock Origin nicht mehr regulär unterstützt.
- Kontrolliere, ob **beide Einträge** vorhanden sind: die URL unter `userResourcesLocation` und der Filter unter **Meine Filter**.
- Entferne ältere TwitchAdSolutions-Scriptlets und deaktiviere andere Twitch-spezifische Werbeblocker, die dazwischenfunken können.
- Bei einem schwarzen Bild oder dauerndem Laden: Deaktiviere zunächst den Filter, lade Twitch neu und [melde den Fehler auf GitHub](https://github.com/MarcelloAtomic/AtomicTTV/issues). Teile keine Cookies, Account-Tokens oder signierten Stream-URLs.

**Hinweis:** Der Code ist automatisiert auf Syntax und ausgewählte Streaming-Funktionen geprüft. Die zuverlässige Werbeblockierung auf dem aktuellen Twitch-Player ist nicht garantiert.
