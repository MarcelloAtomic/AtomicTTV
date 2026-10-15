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
   Prüfe, dass **„Meine eigenen Filter aktivieren“** (Bezeichnung je nach Version) eingeschaltet ist.
2. Füge folgende Zeile ein (falls sie noch nicht vorhanden ist):

```text
twitch.tv##+js(twitch-videoad)
```

3. Klicke auf **Änderungen übernehmen**.

## 4. Ressource aktualisieren und Twitch neu laden

Bei einer Neuinstallation lade `https://www.twitch.tv` vollständig neu (Strg+Umschalt+R).
Beim Update von einer älteren AtomicTTV-Version lade zuerst die Ressource neu, wie unten beschrieben.

### Ressource neu laden

Nur Twitch neu zu laden leert nicht den Scriptlet-Cache von uBlock Origin.

1. Öffne wieder die erweiterten uBO-Einstellungen bei `userResourcesLocation`.
2. Entferne vorübergehend **nur die AtomicTTV-URL** und speichere. Falls sie der einzige Eintrag war, setze den Wert auf `unset`. Behalte andere eigene Ressourcen.
3. Trage anschließend die AtomicTTV-URL aus Schritt 2 wieder ein und speichere erneut. uBO lädt bei einer Änderung dieses Werts die Ressourcen neu. Warte einige Sekunden auf den Download.
4. Lade den Twitch-Tab mit **Strg+Umschalt+R** neu.

Falls danach noch Version 1.0.1 gemeldet wird oder der alte Syntaxfehler bleibt, verwende für einen frischen Download einmal diese URL als AtomicTTV-Eintrag:

```text
https://raw.githubusercontent.com/MarcelloAtomic/AtomicTTV/master/atomicttv/atomicttv-ublock-origin.js?v=1.0.2
```

Der Zusatz wechselt den Cache-Schlüssel; die URL bleibt auf dem aktuellen `master`-Stand und fixiert keine alte Version.
Unter **Filterlisten** kannst du zusätzlich **Jetzt aktualisieren** verwenden. Eine Schaltfläche „Alle Caches leeren“ ist nicht in jeder uBO-Version vorhanden.

### Start prüfen

Öffne auf Twitch **F12 → Konsole**, wähle den Seitenkontext **top** und prüfe:

```js
({
  version: window.atomicTTV?.status()?.version ?? null,
  atomicTTV: !!window.atomicTTV,
  vaft2: !!window.vaft2,
  fetchHook: typeof window.__vaft2RealFetch === 'function',
  legacyVersion: window.twitchAdSolutionsVersion ?? null,
  vaftVersion: window.vaftVersion ?? null
})
```

Bei erfolgreichem Start von 1.0.2: `version: "1.0.2"`, die drei Wahrheitswerte `true` und beide Versionsmarker `1000`.
Die Marker gehören hier zur Konflikterkennung von AtomicTTV; ihr Vorhandensein bedeutet nicht, dass zusätzlich ein alter Blocker läuft.
Die Meldung **`[VAFT2] v2 active -- 1.0.2`** bestätigt den Start. Sie beweist noch nicht, dass eine konkrete Werbeunterbrechung erfolgreich blockiert wird.

### uBO-Logger prüfen

1. Öffne über das uBO-Symbol den **Logger / das Protokoll** und wähle den Twitch-Tab.
2. Lade Twitch bei geöffnetem Logger neu und suche nach `twitch-videoad`.
3. Der Eintrag `twitch.tv##+js(twitch-videoad)` bestätigt, dass uBO den Filter auf die Seite anwendet. Prüfe trotzdem die Startmeldung: Ein Logger-Eintrag allein beweist keine fehlerfreie Ausführung.
4. Fehlt der Eintrag, prüfe den eingeschalteten uBO-Hauptschalter für Twitch, die aktivierten eigenen Filter und mögliche Ausnahmeregeln. Ändere nicht pauschal andere Blocker- oder Sicherheitseinstellungen.

## Wenn etwas nicht funktioniert

- **uBlock Origin nicht zu finden?** Aktualisiere Brave und rufe `brave://settings/extensions/v2` erneut auf. Achte darauf, dass du nicht versehentlich *uBlock Origin Lite* verwendest.
- **Es wird trotzdem Werbung gezeigt?** Prüfe die `userResourcesLocation`-URL sowie den Filter unter **Meine Filter**. Deaktiviere weitere Twitch-spezifische Blocker. Bei Änderungen an der Raw-Datei kann eine Aktualisierung der uBlock-Filterlisten bzw. der Ressourcencache nötig sein.
- **Schwarzes Bild oder dauerhaftes Laden?** Deaktiviere testweise den AtomicTTV-Filter, lade Twitch neu und [melde den Fehler](https://github.com/MarcelloAtomic/AtomicTTV/issues). Veröffentliche keine Cookies, Zugriffstokens oder signierten Stream-URLs.

Die Scriptlet-Methode benötigt das **vollständige uBlock Origin**. Brave Shields allein kann diese externe `userResourcesLocation`-Ressource nicht übernehmen.

## Video-Werbung über dem Chat

Falls ein kurzes Werbevideo **oberhalb des Chats** erscheint, obwohl der Stream selbst werbefrei bleibt:

1. [Lade die AtomicTTV-Ressource neu](#ressource-neu-laden).
2. Prüfe den erfolgreichen Start wie oben beschrieben.
3. Wenn die Anzeige erneut erscheint, drücke **F12 → Konsole** und gib ein:

```js
window.atomicTTV?.status()?.layers
```

- `undefined`: Das Scriptlet wurde wahrscheinlich nicht in der Seite ausgeführt – URL und Filtereintrag überprüfen.
- `adManagerDeclined: false`: Die Gegenmaßnahme für Display-Ads hat Twitchs Werbemanager noch nicht erfolgreich erreicht.
- `adManagerDeclined: true`: Die Gegenmaßnahme meldet sich als aktiv; die Anzeige könnte von einer neuen Werberoutine stammen. Für die Fehlersuche helfen `adManagerAttempts`, `adManagerRecoveries` und eine Beschreibung der Anzeige.

Bitte **keine Cookies, Header, Playback-Tokens oder vollständigen signierten Stream-URLs** veröffentlichen.

**Version 1.0.1:** AtomicTTV prüft den Display-Ad-Manager auch während längerer Twitch-Sitzungen erneut. Das verbessert die Wiederherstellung, garantiert aber keine vollständige Werbeblockierung.

**Version 1.0.2:** Die uBO-Ressource enthält keine trennenden Leerzeilen mehr. Zuvor las uBO nur den Anfang der Funktion; `Unexpected token 'catch'` und fehlende `window.atomicTTV`-/`window.vaft2`-Objekte waren die Folge. Der Build und die Tests prüfen jetzt den tatsächlich eingelesenen Inhalt einschließlich Start und eingebettetem Worker.

**Status:** Der Code wird automatisiert geprüft. Erfolgreiches Werbeblockieren im aktuellen Twitch-Player ist nicht garantiert.
