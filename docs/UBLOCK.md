# AtomicTTV in Brave installieren

**Brave + uBlock Origin – ohne Tampermonkey.** Die Einrichtung dauert nur wenige Schritte.

## 1. uBlock Origin installieren

1. Öffne **Brave**.
2. Gib in die Adressleiste `brave://settings/extensions/v2` ein.
3. Suche dort **uBlock Origin** und installiere bzw. aktiviere es. Wenn es bereits installiert ist, mache mit Schritt 2 weiter.

**Wichtig:** Verwende das vollständige **uBlock Origin**, nicht **uBlock Origin Lite**. Brave stellt die unterstützte Manifest-V2-Erweiterung selbst bereit; du brauchst dafür nicht den Chrome Web Store.

## 2. AtomicTTV in uBlock Origin eintragen

1. Klicke auf das **uBlock-Origin-Symbol** und öffne das **Dashboard** (Zahnrad).
2. Öffne **Einstellungen** und aktiviere **„Ich bin ein erfahrener Anwender“**.
3. Klicke auf das **kleine Zahnrad** bei dieser Einstellung.
4. Suche in den erweiterten Einstellungen nach `userResourcesLocation`.
5. Ersetze `unset` oder die alte TwitchAdSolutions-URL durch folgende Zeile:

```text
userResourcesLocation https://raw.githubusercontent.com/MarcelloAtomic/AtomicTTV/master/atomicttv/atomicttv-ublock-origin.js
```

Speichere die Änderung. Falls dort andere, selbst eingerichtete Ressourcen stehen, **behalte sie**; ersetze nur die alte TwitchAdSolutions-Adresse. Mehrere URLs lassen sich durch Leerzeichen trennen.

## 3. Filter hinzufügen

1. Öffne im uBlock-Origin-Dashboard **Meine Filter**.
2. Füge folgende Zeile ein (falls sie noch nicht vorhanden ist):

```text
twitch.tv##+js(twitch-videoad)
```

3. Klicke auf **Änderungen übernehmen**.

## 4. Twitch neu laden

Lade `https://www.twitch.tv` neu. Fertig!

## Wenn etwas nicht funktioniert

- **uBlock Origin nicht zu finden?** Aktualisiere Brave und rufe `brave://settings/extensions/v2` erneut auf. Achte darauf, dass du nicht versehentlich *uBlock Origin Lite* verwendest.
- **Es wird trotzdem Werbung gezeigt?** Prüfe die `userResourcesLocation`-URL sowie den Filter unter **Meine Filter**. Deaktiviere weitere Twitch-spezifische Blocker. Bei Änderungen an der Raw-Datei kann eine Aktualisierung der uBlock-Filterlisten bzw. der Ressourcencache nötig sein.
- **Schwarzes Bild oder dauerhaftes Laden?** Deaktiviere testweise den AtomicTTV-Filter, lade Twitch neu und [melde den Fehler](https://github.com/MarcelloAtomic/AtomicTTV/issues). Veröffentliche keine Cookies, Zugriffstokens oder signierten Stream-URLs.

Die Scriptlet-Methode benötigt das **vollständige uBlock Origin**. Brave Shields allein kann diese externe `userResourcesLocation`-Ressource nicht übernehmen.

**Status:** Der Code wird automatisiert geprüft. Erfolgreiches Werbeblockieren im aktuellen Twitch-Player ist nicht garantiert.
