import type { Module } from '../types';

export const s04: Module = {
  id: 's04',
  nr: 4,
  area: 'sicherheit',
  title: 'Authentifizierung, Passwörter und Berechtigungen',
  short: 'Identifikation, Authentifizierung, Autorisierung; Passwortrichtlinien nach BSI, Brute-Force-Rechnung, MFA, Passkeys, SSO; Rollen- und Rechtekonzepte; Verschlüsselung im Überblick.',
  icon: 'KeyRound',
  relevance: 'ap1',
  prerequisites: ['s01'],
  generators: ['sich.pwbrute'],
  skills: [
    { id: 'sich.auth.begriffe', module: 's04', title: 'Identifikation, Authentifizierung, Autorisierung und Kontoarten unterscheiden' },
    { id: 'sich.auth.passwort', module: 's04', title: 'Passwortrichtlinien nach BSI erstellen und Passwortstärke berechnen', requires: ['sich.auth.begriffe'] },
    { id: 'sich.auth.mfa', module: 's04', title: 'MFA, Passkeys und Single Sign-On organisatorisch bewerten', requires: ['sich.auth.passwort'] },
    { id: 'sich.auth.rechte', module: 's04', title: 'Rollen- und Berechtigungskonzepte (Least Privilege, Need-to-know) planen', requires: ['sich.auth.begriffe'] },
    { id: 'sich.auth.krypto', module: 's04', title: 'Verschlüsselung am Arbeitsplatz einordnen (ruhende/übertragene Daten, Schlüsselverwaltung)', requires: ['sich.schutzziele'] },
  ],
  lessons: [
    /* ---------------------------------------------------------------- */
    {
      id: 's04-l01',
      title: 'Wer bist du – und was darfst du?',
      minutes: 15,
      relevance: 'ap1',
      skills: ['sich.auth.begriffe'],
      steps: [
        {
          type: 'explain',
          title: 'Identifikation, Authentifizierung, Autorisierung',
          body: `Jede Anmeldung an einem IT-System läuft in Schritten ab:

| Schritt | Frage | Beispiel bei der Anmeldung am PC |
|---|---|---|
| **Identifikation** | **Wer** behauptest du zu sein? | Benutzername *mmueller* eingeben |
| **Authentisierung** (Nutzer legt Nachweis vor) / **Authentifizierung** (System prüft ihn) | **Beweise** es! | Passwort + Bestätigung in der Authenticator-App |
| **Autorisierung** | **Was darfst** du? | Zugriff auf „Vertrieb“ ja, auf „Personal“ nein |
| **Protokollierung** (Accounting) | Was hast du getan? | Anmeldezeit, geöffnete Dateien im Log |

*Im Alltag wird „Authentifizierung“ oft für beides benutzt – in der Prüfung reicht das. Wichtig ist die Abgrenzung zur **Autorisierung**: Erst die Identität beweisen, dann die Rechte prüfen.*

**Kontoarten und ihre Regeln:**

| Konto | Zweck | Regeln |
|---|---|---|
| **Persönliches Benutzerkonto** | tägliche Arbeit | genau **einer** Person zugeordnet, **ohne** Administratorrechte |
| **Administratorkonto** | Verwaltung | **getrenntes** Konto (z. B. *adm-mmueller*), nur für Admin-Aufgaben, mit MFA; nicht zum Surfen/Mailen |
| **Dienstkonto** | Dienste/Anwendungen (Backup-Software, Datenbank) | nur nötige Rechte, langes zufälliges Passwort, keine interaktive Anmeldung |
| **Gast-/Sammelkonto** (*„azubi“ für alle*) | – | **vermeiden**: Handlungen sind niemandem zuzurechnen (Zurechenbarkeit verletzt) |

**Zutritt – Zugang – Zugriff** (siehe Datenschutz-Modul) sind die drei Ebenen der Kontrolle: Raum betreten → System nutzen → Daten lesen. In diesem Modul geht es vor allem um **Zugang** (Anmeldung) und **Zugriff** (Rechte).`,
        },
        {
          type: 'visual',
          title: 'Ablauf einer Anmeldung',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['Benutzer', 'Client-PC', 'Anmeldeserver (AD)', 'Fileserver'],
              messages: [
                { from: 0, to: 1, label: 'Benutzername (Identifikation)' },
                { from: 0, to: 1, label: 'Passwort + zweiter Faktor (Authentisierung)' },
                { from: 1, to: 2, label: 'Anmeldedaten prüfen lassen', note: 'Authentifizierung' },
                { from: 2, to: 1, label: 'Ticket mit Gruppenmitgliedschaften' },
                { from: 1, to: 3, label: 'Zugriff auf \\\\fs\\Vertrieb' },
                { from: 3, to: 1, label: 'Rechte prüfen → erlaubt', note: 'Autorisierung' },
              ],
            },
          },
          caption: 'Erst wird die Identität bewiesen, dann entscheidet jedes System anhand der Rechte (Gruppen), was erlaubt ist.',
        },
        {
          type: 'check',
          question: {
            id: 's04-c01', kind: 'order', skill: 'sich.auth.begriffe', difficulty: 1,
            prompt: 'Bringe die Schritte in die richtige Reihenfolge.',
            items: ['Identifikation (Benutzername angeben)', 'Authentifizierung (Identität nachweisen und prüfen)', 'Autorisierung (Rechte prüfen und gewähren)', 'Protokollierung der Aktivitäten'],
            explanation: 'Wer bist du? → Beweise es! → Was darfst du? → Was hast du getan?',
          },
        },
        {
          type: 'check',
          question: {
            id: 's04-c02', kind: 'single', skill: 'sich.auth.begriffe', difficulty: 2,
            prompt: 'Im Lager melden sich alle fünf Mitarbeiter am Scanner-PC mit dem Konto „lager“ und demselben Passwort an. Welches Problem entsteht vor allem?',
            options: ['Handlungen sind keiner Person eindeutig zuzurechnen; beim Ausscheiden eines Mitarbeiters muss das Passwort für alle geändert werden.', 'Der PC wird langsamer.', 'Es gibt kein Problem, solange das Passwort lang ist.', 'Das Konto verbraucht mehr Lizenzen.'],
            answer: 0,
            distractors: {
              '1': { why: 'Die Leistung hat mit der Kontoanzahl nichts zu tun.', error: 'sammelkonto' },
              '2': { why: 'Auch ein langes Passwort ändert nichts an der fehlenden Zurechenbarkeit.', error: 'sammelkonto' },
              '3': { why: 'Lizenzfragen sind hier nicht das Sicherheitsproblem.', error: 'sammelkonto' },
            },
            explanation: 'Sammelkonten verletzen Zurechenbarkeit/Verbindlichkeit und erschweren das Sperren einzelner Personen. Lösung: persönliche Konten (ggf. mit schneller Anmeldung per Karte/Token).',
          },
        },
        { type: 'practice', title: 'Übung: Grundbegriffe', questionIds: ['s04-q001', 's04-q002', 's04-q003', 's04-q004'], count: 3, difficulty: 1 },
        {
          type: 'summary',
          points: [
            'Identifikation (wer?) → Authentifizierung (Beweis) → Autorisierung (was darf ich?) → Protokollierung.',
            'Persönliche Konten ohne Adminrechte; getrennte Admin-Konten mit MFA; Dienstkonten mit minimalen Rechten.',
            'Sammelkonten vermeiden – sie zerstören die Zurechenbarkeit.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's04-l02',
      title: 'Passwortrichtlinien nach aktuellem BSI-Stand',
      minutes: 25,
      relevance: 'ap1',
      skills: ['sich.auth.passwort'],
      steps: [
        {
          type: 'explain',
          title: 'Was ein gutes Passwort ausmacht',
          body: `Die BSI-Empfehlungen haben sich in den letzten Jahren deutlich geändert – weg von „kompliziert und ständig wechseln“, hin zu **lang, einzigartig und nur bei Anlass wechseln**.

**Länge vs. Komplexität** – Beispiele, die das BSI als sicher nennt:
- **20–25 Zeichen** mit zwei Zeichenarten, z. B. eine Folge von Wörtern (**Passphrase**, etwa 5–6 zufällige Wörter)
- **8–12 Zeichen** mit **vier** Zeichenarten (Groß-, Kleinbuchstaben, Ziffern, Sonderzeichen)
- 8 Zeichen mit drei Zeichenarten **plus** Mehr-Faktor-Authentisierung
- WLAN-Schlüssel (WPA2/WPA3-Personal): mindestens **20** Zeichen

**Regeln aus dem IT-Grundschutz (Baustein ORP.4 Identitäts- und Berechtigungsmanagement), sinngemäß:**

| Regel | Begründung |
|---|---|
| Für **jedes** System/jeden Dienst ein **eigenes** Passwort | Bei einem Datenleck (Credential Stuffing) ist nicht alles betroffen |
| **Keine** leicht erratbaren oder bekannten Passwörter (Namen, „Sommer2026!“, Firmenname) – technisch per **Sperrliste** verhindern | Angreifer probieren zuerst Wörterbücher und geleakte Listen |
| **Kein** zeitgesteuerter Zwangswechsel ohne Anlass – aber **sofortiger Wechsel bei Verdacht** auf Kompromittierung | Zwangswechsel führt zu schwachen Mustern („Passwort1“, „Passwort2“ …) |
| **Voreingestellte Passwörter** (Router, Drucker, Switch) sofort ändern | Standardpasswörter stehen im Handbuch und im Internet |
| Passwörter nicht offen notieren; nur im Notfall **sicher hinterlegt** (versiegelter Umschlag im Tresor, Passwort-Manager) | Zettel am Monitor = jeder kann sich anmelden |
| Passwörter nie weitergeben – auch nicht an Vorgesetzte oder die IT | Zurechenbarkeit; Schutz vor Social Engineering |

**Technische Maßnahmen gegen das Raten:**
- **Kontosperre oder Verzögerung** nach mehreren Fehlversuchen (z. B. 10 Versuche → 15 Minuten Sperre) bremst Online-Angriffe.
- Server speichern Passwörter nie im Klartext, sondern als **Hash mit Salt** mit einem langsamen Verfahren (z. B. Argon2, bcrypt). Wird die Datenbank gestohlen, muss der Angreifer offline raten – dann zählt nur noch die **Länge und Zufälligkeit** des Passworts.

**Passwort-Manager** (z. B. KeePassXC, Bitwarden, in Firmen zentral verwaltete Lösungen): erzeugen für jeden Dienst ein langes Zufallspasswort und füllen es nur auf der **richtigen Domain** aus (Schutz vor Phishing-Seiten). Man muss sich nur noch **ein** starkes Master-Passwort merken – das dann zusätzlich mit MFA geschützt werden sollte.`,
        },
        {
          type: 'example',
          title: 'Eine Passwortrichtlinie für die Elektro Krämer GmbH',
          problem: 'Die bisherige Richtlinie lautet: „Mindestens 8 Zeichen, Groß/Klein/Zahl/Sonderzeichen, Wechsel alle 30 Tage, die letzten 3 Passwörter sind gesperrt.“ Mitarbeitende beschweren sich, viele notieren Passwörter am Monitor. Überarbeite die Richtlinie nach aktuellem Stand.',
          steps: [
            { label: 'Problem', body: 'Kurze Passwörter mit Zwangswechsel alle 30 Tage führen zu vorhersehbaren Mustern (*Kraemer01!*, *Kraemer02!*) und Zetteln → in der Praxis **unsicherer**.' },
            { label: 'Länge', body: 'Mindestlänge auf z. B. **12 Zeichen** erhöhen; Passphrasen ausdrücklich empfehlen (z. B. vier bis sechs zufällige Wörter).' },
            { label: 'Sperrliste', body: 'Bekannte/geleakte Passwörter und Firmenbegriffe technisch sperren (Banned-Password-Liste).' },
            { label: 'Wechsel', body: 'Kein Zwangswechsel nach Zeit mehr – nur bei Verdacht oder Vorfall **sofort**.' },
            { label: 'MFA', body: 'MFA für alle Fernzugriffe (VPN, Webmail, Cloud) und alle Admin-Konten.' },
            { label: 'Hilfsmittel', body: 'Firmen-Passwort-Manager bereitstellen und schulen; Kontosperre/Verzögerung nach Fehlversuchen.' },
          ],
          result: 'Länge statt Zwangswechsel, Sperrliste, MFA, Passwort-Manager und Schulung – sicherer und benutzerfreundlicher.',
        },
        {
          type: 'check',
          question: {
            id: 's04-c03', kind: 'single', skill: 'sich.auth.passwort', difficulty: 2,
            prompt: 'Was empfiehlt das BSI im IT-Grundschutz zum **regelmäßigen Passwortwechsel**?',
            options: ['Kein zeitgesteuerter Zwangswechsel ohne Anlass; bei Verdacht auf Kompromittierung sofort wechseln.', 'Alle 30 Tage zwingend wechseln.', 'Passwörter nie wechseln, auch nicht nach einem Datenleck.', 'Nur Administratoren müssen ihr Passwort monatlich wechseln.'],
            answer: 0,
            distractors: {
              '1': { why: 'Feste kurze Wechselintervalle führen zu schwachen, vorhersehbaren Passwörtern – davon rät das BSI inzwischen ab.', error: 'pw-zwangswechsel' },
              '2': { why: 'Bei Verdacht auf Missbrauch muss das Passwort sofort geändert werden.', error: 'pw-zwangswechsel' },
              '3': { why: 'Auch für Admins gilt: Wechsel bei Anlass; wichtiger sind Länge, MFA und getrennte Konten.', error: 'pw-zwangswechsel' },
            },
            explanation: 'ORP.4: Wechsel nur mit validem Grund (z. B. Verdacht, Vorfall, Weitergabe), nicht rein nach Zeit.',
          },
        },
        {
          type: 'check',
          question: {
            id: 's04-c04', kind: 'multi', skill: 'sich.auth.passwort', difficulty: 2,
            prompt: 'Welche Regeln gehören in eine zeitgemäße Passwortrichtlinie?',
            options: ['Für jeden Dienst ein eigenes Passwort', 'Lange Passphrasen sind erlaubt und erwünscht', 'Bekannte und geleakte Passwörter werden technisch gesperrt', 'Voreingestellte Gerätepasswörter sofort ändern', 'Passwörter der Kollegen bei Urlaub im Team teilen', 'Wechsel alle 14 Tage'],
            answer: [0, 1, 2, 3],
            explanation: 'Für Vertretungen gibt es Berechtigungen bzw. Stellvertreterregelungen – Passwörter werden nie geteilt. Kurze Zwangswechsel sind überholt.',
          },
        },
        { type: 'practice', title: 'Übung: Passwortrichtlinien', questionIds: ['s04-q005', 's04-q006', 's04-q007', 's04-q008', 's04-q009', 's04-q010'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'BSI: lang (20–25 Zeichen, Passphrase) oder 8–12 Zeichen mit vier Zeichenarten; MFA wo möglich.',
            'Pro Dienst ein eigenes Passwort; Sperrliste gegen bekannte Passwörter; Standardpasswörter ändern.',
            'Kein Zwangswechsel nach Zeit – sofortiger Wechsel bei Verdacht.',
            'Kontosperre/Verzögerung gegen Online-Raten; Speicherung nur als Hash mit Salt.',
            'Passwort-Manager: Zufallspasswörter je Dienst, Phishing-Schutz durch Domainprüfung.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's04-l03',
      title: 'Passwortstärke berechnen: Brute Force',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['sich.auth.passwort'],
      steps: [
        {
          type: 'explain',
          title: 'Wie viele Möglichkeiten gibt es?',
          body: `Ein **Brute-Force-Angriff** probiert systematisch alle Kombinationen. Die Anzahl der Möglichkeiten:

> **Kombinationen = Zeichenvorrat ^ Länge**

| Zeichenvorrat | Anzahl Zeichen |
|---|---|
| Ziffern 0–9 | 10 |
| Kleinbuchstaben a–z (ohne Umlaute) | 26 |
| Klein- + Großbuchstaben | 52 |
| Buchstaben + Ziffern | 62 |
| + 32 Sonderzeichen (druckbare ASCII-Zeichen) | 94 |

**Dauer:** Zeit = Kombinationen / Versuche pro Sekunde. Das ist die **maximale** Zeit; im **Durchschnitt** ist das Passwort nach der **Hälfte** gefunden.

**Online vs. offline:**
- **Online** (am Anmeldefenster): Kontosperre und Verzögerung bremsen auf wenige Versuche pro Minute.
- **Offline** (Angreifer hat gestohlene Hashwerte): Mit Grafikkarten sind je nach Hashverfahren Millionen bis viele Milliarden Versuche pro Sekunde möglich. Langsame Hashverfahren mit Salt bremsen stark.

**Länge schlägt Komplexität:**

| Passwort | Rechnung | Kombinationen |
|---|---|---|
| 8 Zeichen, 94er-Vorrat | 94⁸ | ≈ 6,1 · 10¹⁵ |
| 12 Zeichen, nur Kleinbuchstaben | 26¹² | ≈ 9,5 · 10¹⁶ |
| 20 Zeichen, nur Kleinbuchstaben | 26²⁰ | ≈ 2,0 · 10²⁸ |

Jedes zusätzliche Zeichen **multipliziert** die Möglichkeiten mit dem Zeichenvorrat. Echte Passwörter sind aber selten zufällig – Angreifer probieren zuerst Wörterbücher und bekannte Muster. Die Rechnung gilt deshalb nur für **zufällig** gewählte Zeichen bzw. Wörter.`,
        },
        {
          type: 'example',
          title: 'PIN gegen Passwort',
          problem: 'Ein Angreifer schafft offline **10 Milliarden** (10¹⁰) Versuche pro Sekunde. Wie lange braucht er höchstens für (a) ein 8-stelliges Passwort aus Buchstaben und Ziffern (62 Zeichen) und (b) eine Passphrase aus 5 zufälligen Wörtern einer Liste mit 7.776 Wörtern?',
          steps: [
            { label: '(a) Kombinationen', body: '62⁸ = 218.340.105.584.896 ≈ 2,18 · 10¹⁴' },
            { label: '(a) Dauer', body: '2,18 · 10¹⁴ / 10¹⁰ = 21.834 s ≈ **6,1 Stunden**' },
            { label: '(b) Kombinationen', body: 'Hier ist das „Zeichen“ ein ganzes Wort: 7.776⁵ ≈ 2,84 · 10¹⁹' },
            { label: '(b) Dauer', body: '2,84 · 10¹⁹ / 10¹⁰ = 2,84 · 10⁹ s ≈ **90 Jahre**' },
          ],
          result: 'Das kurze komplexe Passwort fällt offline in Stunden, die leicht merkbare Passphrase hält Jahrzehnte.',
        },
        {
          type: 'check',
          question: {
            id: 's04-c05', kind: 'number', skill: 'sich.auth.passwort', difficulty: 1,
            prompt: 'Wie viele Kombinationen hat eine **6-stellige PIN** aus Ziffern (0–9)?',
            answer: 1000000,
            misconceptions: [{ answer: '60', error: 'pw-multipliziert', why: 'Nicht 10 · 6, sondern 10⁶.' }, { answer: '60466176', error: 'pw-formel-vertauscht', why: 'Basis und Exponent vertauscht: Es heißt Zeichenvorrat hoch Länge = 10⁶, nicht 6¹⁰.' }],
            explanation: '10⁶ = **1.000.000** Kombinationen.',
          },
        },
        { type: 'practice', title: 'Übung: Brute-Force-Dauer', generator: 'sich.pwbrute', count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Kombinationen = Zeichenvorrat ^ Länge; Dauer = Kombinationen / Versuche pro Sekunde (Durchschnitt: Hälfte).',
            'Zeichenvorrat: 10 / 26 / 52 / 62 / 94.',
            'Jedes zusätzliche Zeichen vervielfacht den Aufwand – Länge schlägt Komplexität.',
            'Online bremst die Kontosperre, offline zählt nur die Passwortstärke.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's04-l04',
      title: 'MFA, Passkeys und Single Sign-On',
      minutes: 20,
      relevance: 'ap1',
      skills: ['sich.auth.mfa'],
      steps: [
        {
          type: 'explain',
          title: 'Mehr als ein Passwort',
          body: `Die Faktoren **Wissen – Besitz – Inhärenz (Biometrie)** und die Regel „MFA = mindestens zwei **verschiedene** Kategorien“ kennst du aus dem Modul Netzwerksicherheit. Hier geht es um die Auswahl im Unternehmen:

| Verfahren | Sicherheit | Bemerkung |
|---|---|---|
| **SMS-Code** | gering bis mittel | besser als nichts; anfällig für SIM-Swapping und Echtzeit-Phishing |
| **TOTP-App** (6-stelliger Code, z. B. Authenticator-App) | mittel | weit verbreitet, offline nutzbar; Code kann auf Phishing-Seiten abgefangen werden |
| **Push-Bestätigung** | mittel | bequem; Gefahr „MFA-Fatigue“ (Nutzer bestätigt genervt eine fremde Anfrage) → Nummernabgleich aktivieren |
| **FIDO2-Sicherheitsschlüssel / Passkeys** | **hoch** | **phishing-resistent**: Der Schlüssel ist an die echte Domain gebunden, es wird kein Geheimnis übertragen |
| **Smartcard / Zertifikat** | hoch | klassisch in Behörden und Großunternehmen |

**Passkeys** (FIDO2/WebAuthn) ersetzen das Passwort: Auf dem Gerät liegt ein **privater Schlüssel**, freigegeben per PIN oder Fingerabdruck; der Dienst kennt nur den **öffentlichen** Schlüssel. Ein Datenleck beim Dienst verrät also nichts, und eine Phishing-Seite mit falscher Domain bekommt keine gültige Anmeldung. *Windows Hello for Business* arbeitet nach dem gleichen Prinzip.

**Single Sign-On (SSO):** Einmal anmelden, dann ohne weitere Passworteingabe auf viele Anwendungen zugreifen (im Firmennetz z. B. per **Kerberos** im Active Directory, für Webanwendungen per **SAML** oder **OpenID Connect**).

| Vorteile | Nachteile / Risiken |
|---|---|
| nur noch **ein** starkes Passwort → weniger Zettel, weniger Wiederverwendung | **Single Point of Failure**: Wird das Konto übernommen, sind alle Anwendungen offen → **MFA ist Pflicht** |
| zentrale Sperre beim Austritt (ein Konto deaktivieren → alles gesperrt) | Ausfall des Anmeldedienstes legt alles lahm → Redundanz |
| weniger Helpdesk-Anfragen „Passwort vergessen“ | höhere Komplexität bei Einrichtung |

**Wo MFA zuerst?** Nach Risiko: **Fernzugriff** (VPN, Webmail, Cloud/Microsoft 365), **Administratorkonten**, Konten mit Zugriff auf sensible Daten (Personal, Finanzen), Passwort-Manager.`,
        },
        {
          type: 'example',
          title: 'MFA-Einführung planen',
          problem: 'Die Elektro Krämer GmbH will nach einem Phishing-Vorfall MFA einführen. Budget ist begrenzt. Plane die Einführung.',
          steps: [
            { label: 'Priorisieren', body: '1. Admin-Konten (FIDO2-Schlüssel), 2. Fernzugriff VPN und Microsoft 365 für alle, 3. Buchhaltung/Personal.' },
            { label: 'Verfahren', body: 'Standard: Authenticator-App mit Nummernabgleich; Admins und Geschäftsführung: FIDO2-Sicherheitsschlüssel (phishing-resistent). SMS nur als Notlösung.' },
            { label: 'Organisation', body: 'Schulung („nie eine Anfrage bestätigen, die man nicht selbst ausgelöst hat“), Prozess für verlorene Smartphones/Token (Identitätsprüfung beim Helpdesk!), Notfallzugang (Break-Glass-Konto im Tresor).' },
            { label: 'Kommunikation', body: 'Vorher ankündigen, Anleitungen bereitstellen, Pilotgruppe zuerst.' },
          ],
          result: 'Risikobasierte Einführung: zuerst Admins und Fernzugriffe, phishing-resistente Verfahren für kritische Konten, klare Prozesse für Verlust und Notfall.',
        },
        {
          type: 'check',
          question: {
            id: 's04-c06', kind: 'single', skill: 'sich.auth.mfa', difficulty: 2,
            prompt: 'Warum gelten **Passkeys/FIDO2-Schlüssel** als besonders **phishing-resistent**?',
            options: ['Weil die Anmeldung kryptografisch an die echte Domain gebunden ist und kein wiederverwendbares Geheimnis übertragen wird', 'Weil sie besonders lange Passwörter erzeugen', 'Weil sie per SMS zugestellt werden', 'Weil sie nur im Firmennetz funktionieren'],
            answer: 0,
            distractors: {
              '1': { why: 'Passkeys ersetzen Passwörter – es wird gar kein Passwort übertragen.', error: 'passkey-missverstanden' },
              '2': { why: 'SMS ist gerade nicht phishing-resistent.', error: 'passkey-missverstanden' },
              '3': { why: 'Passkeys funktionieren überall, auch im Internet.', error: 'passkey-missverstanden' },
            },
            explanation: 'Der Browser gibt die Signatur nur für die registrierte Domain heraus; eine Phishing-Domain erhält nichts Verwertbares.',
          },
        },
        {
          type: 'check',
          question: {
            id: 's04-c07', kind: 'free', skill: 'sich.auth.mfa', difficulty: 2,
            prompt: 'Nennen Sie je zwei Vor- und Nachteile von **Single Sign-On** und eine Maßnahme, die den größten Nachteil ausgleicht.',
            modelAnswer: 'Vorteile: Nutzer müssen sich nur ein starkes Passwort merken (weniger Wiederverwendung und Zettel); beim Austritt wird nur ein Konto gesperrt, damit sind alle Anwendungen gesperrt; weniger Helpdesk-Aufwand. Nachteile: Single Point of Failure – wird das SSO-Konto kompromittiert, hat der Angreifer Zugriff auf alle angebundenen Anwendungen; fällt der Anmeldedienst aus, ist keine Anwendung erreichbar. Ausgleich: verpflichtende Multi-Faktor-Authentifizierung (am besten phishing-resistent), zusätzlich redundanter Anmeldedienst und Überwachung ungewöhnlicher Anmeldungen.',
            keywords: ['ein Passwort', 'zentrale Sperre', 'Single Point of Failure', 'MFA', 'Ausfall'],
            explanation: 'SSO bündelt Bequemlichkeit und Risiko – MFA ist der Ausgleich.',
          },
        },
        { type: 'practice', title: 'Übung: MFA und SSO', questionIds: ['s04-q011', 's04-q012', 's04-q013', 's04-q014', 's04-q015'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'MFA-Verfahren nach Sicherheit: SMS < TOTP-App/Push < FIDO2/Passkey (phishing-resistent).',
            'Passkeys: privater Schlüssel auf dem Gerät, Dienst kennt nur den öffentlichen Schlüssel, Domainbindung.',
            'SSO: ein Login für viele Dienste (Kerberos, SAML, OIDC) – bequem, aber Single Point of Failure → MFA Pflicht.',
            'MFA zuerst für Admins, Fernzugriff, Cloud und sensible Bereiche; Prozesse für Verlust und Notfall.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's04-l05',
      title: 'Rollen und Rechte: Least Privilege und Need-to-know',
      minutes: 25,
      relevance: 'ap1',
      skills: ['sich.auth.rechte'],
      steps: [
        {
          type: 'explain',
          title: 'Grundprinzipien der Rechtevergabe',
          body: `| Prinzip | Bedeutung | Beispiel |
|---|---|---|
| **Least Privilege** (minimale Rechte) | jeder erhält **nur die Rechte, die er für seine Aufgabe braucht** – nicht mehr | Vertrieb darf Preislisten **lesen**, nur die Produktverwaltung darf sie **ändern** |
| **Need-to-know** | Zugriff auf Informationen nur, wenn man sie **für die Aufgabe kennen muss** | Die IT-Administration kann technisch alles, liest aber keine Personalakten; Personaldaten nur für die Personalabteilung |
| **Funktionstrennung** (Separation of Duties) | kritische Vorgänge werden auf **mehrere Personen** aufgeteilt | Wer Lieferanten anlegt, darf keine Zahlungen freigeben |
| **Vier-Augen-Prinzip** | eine zweite Person prüft und bestätigt | Überweisungen ab 10.000 €, Änderung von Bankverbindungen |
| **Default deny** | was nicht ausdrücklich erlaubt ist, ist verboten | neue Freigaben sind zunächst für niemanden lesbar |

**Rollenbasierte Rechtevergabe (RBAC):** Rechte werden nicht einzelnen Personen, sondern **Rollen bzw. Gruppen** zugewiesen (z. B. „Vertrieb Hamburg“, „Buchhaltung“). Personen werden Mitglied der passenden Rolle. Vorteile: übersichtlich, schnell anzupassen, weniger Fehler. Im Active Directory: Benutzer → **Gruppen** → Rechte auf Ordnern/Anwendungen.

**Berechtigungsmatrix:** Ein Rechtekonzept wird als Tabelle dokumentiert (Rollen × Ressourcen). Rechte-Stufen z. B. **–** (kein Zugriff), **L** (lesen), **Ä** (ändern = lesen, schreiben, löschen), **V** (Vollzugriff inkl. Rechte vergeben – nur Admins).

| Rolle \\ Ordner | Vertrieb | Buchhaltung | Personal | Vorlagen |
|---|---|---|---|---|
| Vertrieb | Ä | – | – | L |
| Buchhaltung | L | Ä | – | L |
| Personal | – | – | Ä | L |
| Geschäftsführung | L | L | L | L |
| IT-Admin (Admin-Konto) | V | V | V | V |

**Lebenszyklus von Berechtigungen (Joiner – Mover – Leaver):**
- **Eintritt:** Konto erst nach schriftlichem Antrag mit Freigabe des Vorgesetzten anlegen, Rechte über Rollen.
- **Wechsel der Abteilung:** neue Rolle zuweisen **und alte Rechte entziehen** (sonst sammeln sich Rechte an – „Rechte-Akkumulation“).
- **Austritt:** Konto am letzten Arbeitstag **sperren**, Token/Karten einziehen, später löschen; Daten übergeben.
- **Rezertifizierung:** regelmäßig (z. B. jährlich) prüfen Vorgesetzte, ob die Rechte ihrer Mitarbeitenden noch stimmen.`,
        },
        {
          type: 'example',
          title: 'Rechte bei einem Abteilungswechsel',
          problem: 'Frau Lange wechselt zum 1. April von der Buchhaltung in den Vertrieb. Bisher ist sie in den Gruppen „Buchhaltung“ und „Alle Mitarbeiter“. Was muss die IT tun?',
          steps: [
            { label: 'Antrag', body: 'Schriftlicher Änderungsantrag mit Freigabe der neuen Vorgesetzten (Dokumentation).' },
            { label: 'Hinzufügen', body: 'Mitgliedschaft in der Gruppe „Vertrieb“ zum 1. April.' },
            { label: 'Entfernen', body: 'Gruppe „Buchhaltung“ **entfernen** – sie braucht keinen Zugriff mehr auf Finanzdaten (Least Privilege, Need-to-know). Ggf. kurze Übergangsfrist nur mit Lesezugriff, wenn von der Buchhaltungsleitung freigegeben.' },
            { label: 'Anwendungen', body: 'Auch Rechte in Fachanwendungen (Finanzsoftware, Bank-Portal, Zahlungsfreigaben) entziehen – nicht nur Ordnerrechte.' },
            { label: 'Prüfen', body: 'Effektive Berechtigungen kontrollieren und in der Benutzerdokumentation festhalten.' },
          ],
          result: 'Neue Rolle hinzufügen UND alte Rolle entfernen – sonst entsteht Rechte-Akkumulation.',
        },
        {
          type: 'check',
          question: {
            id: 's04-c08', kind: 'match', skill: 'sich.auth.rechte', difficulty: 2,
            prompt: 'Ordne die Prinzipien den Beispielen zu.',
            left: ['Least Privilege', 'Need-to-know', 'Funktionstrennung', 'Vier-Augen-Prinzip'],
            right: ['Der Praktikant erhält nur Leserechte auf den Projektordner, an dem er mitarbeitet.', 'Die Administratorin könnte die Personalakten öffnen, tut es aber nicht, weil sie den Inhalt für ihre Arbeit nicht kennen muss.', 'Wer Lieferanten im ERP anlegt, darf keine Zahlungen an Lieferanten freigeben.', 'Eine Änderung der Bankverbindung eines Lieferanten wird von einer zweiten Person bestätigt.'],
            answer: [0, 1, 2, 3],
            explanation: 'Minimale Rechte – Wissen nur bei Bedarf – Aufgaben trennen – zweite Person prüft.',
          },
        },
        {
          type: 'check',
          question: {
            id: 's04-c09', kind: 'single', skill: 'sich.auth.rechte', difficulty: 1,
            prompt: 'Ein Mitarbeiter verlässt das Unternehmen am Freitag. Wann sollte sein Benutzerkonto **gesperrt** werden?',
            options: ['Spätestens zum Ende des letzten Arbeitstages (bei Kündigung im Streit sofort)', 'Nach drei Monaten', 'Gar nicht, es könnte noch gebraucht werden', 'Wenn der Nachfolger es übernimmt'],
            answer: 0,
            distractors: {
              '1': { why: 'Drei Monate offene Zugänge eines Ehemaligen sind ein erhebliches Risiko.', error: 'leaver-prozess' },
              '2': { why: 'Benötigte Daten werden übergeben, das Konto wird gesperrt.', error: 'leaver-prozess' },
              '3': { why: 'Konten werden nie weitergegeben – der Nachfolger erhält ein eigenes Konto.', error: 'leaver-prozess' },
            },
            explanation: 'Leaver-Prozess: Sperre zum Austritt, Token/Karten einziehen, Daten übergeben, später löschen.',
          },
        },
        { type: 'practice', title: 'Übung: Rechtekonzepte', questionIds: ['s04-q016', 's04-q017', 's04-q018', 's04-q019', 's04-q020', 's04-q021', 's04-q022'], count: 5, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Least Privilege, Need-to-know, Funktionstrennung, Vier-Augen-Prinzip, Default deny.',
            'Rechte an Rollen/Gruppen statt an Personen (RBAC), dokumentiert in einer Berechtigungsmatrix.',
            'Joiner-Mover-Leaver: Antrag und Freigabe, beim Wechsel alte Rechte entziehen, beim Austritt sofort sperren.',
            'Regelmäßige Rezertifizierung verhindert Rechte-Akkumulation.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's04-l06',
      title: 'Verschlüsselung im Arbeitsalltag',
      minutes: 15,
      relevance: 'ap1',
      skills: ['sich.auth.krypto'],
      steps: [
        {
          type: 'explain',
          title: 'Was verschlüsselt man wo?',
          body: `Die Verfahren selbst (AES, RSA, Diffie-Hellman, TLS-Handshake) behandelt das Modul **Netzwerksicherheit** ausführlich. Hier die organisatorische Sicht: **Welche Daten werden wo verschlüsselt, und wer verwaltet die Schlüssel?**

| Zustand der Daten | Beispiele | Verschlüsselung |
|---|---|---|
| **ruhende Daten** (*at rest*) | Notebook-SSD, USB-Stick, Backup-Medium, Datenbank | Festplattenverschlüsselung (**BitLocker** mit TPM + PIN), verschlüsselte Container, verschlüsselte Backups |
| **übertragene Daten** (*in transit*) | Webseiten, Mail-Transport, Fernzugriff, Standortverbindung | **TLS** (HTTPS, SMTPS/IMAPS), **VPN** (IPsec, WireGuard), **SSH/SFTP** statt Telnet/FTP |
| **Inhalte Ende-zu-Ende** | vertrauliche E-Mail an den Steuerberater | **S/MIME** oder **OpenPGP** – nur der Empfänger kann entschlüsseln, auch der Mailserver nicht |

**Kurz zur Erinnerung:**

| Verfahren | Schlüssel | Stärke | Schwäche | Einsatz |
|---|---|---|---|---|
| **symmetrisch** (z. B. AES) | ein gemeinsamer Schlüssel | sehr schnell | Schlüsselaustausch | große Datenmengen, Festplatten |
| **asymmetrisch** (z. B. RSA, ECC) | Schlüsselpaar: öffentlich + privat | kein geheimer Austausch nötig, Signaturen | langsam | Schlüsselaustausch, Signatur, Zertifikate |
| **hybrid** | asymmetrisch einen Sitzungsschlüssel austauschen, dann symmetrisch | schnell **und** sicherer Austausch | – | TLS, S/MIME, VPN |

**Schlüsselverwaltung ist Organisation:**
- **Wiederherstellungsschlüssel** (z. B. BitLocker-Recovery-Key) zentral und geschützt hinterlegen (Active Directory/Entra ID oder Tresor) – sonst ist bei einem defekten TPM oder vergessener PIN alles verloren (**Verfügbarkeit!**).
- Private Schlüssel nie weitergeben, Zertifikate rechtzeitig erneuern (abgelaufenes Zertifikat = Ausfall).
- Backups verschlüsseln – und den Schlüssel **getrennt** vom Backup aufbewahren.
- Regeln dazu stehen in einem **Kryptokonzept** (BSI-Baustein CON.1).`,
        },
        {
          type: 'example',
          title: 'Den richtigen Schutz wählen',
          problem: 'Ordne zu: (1) Außendienst-Notebook, (2) Datenübertragung von Lohndaten an den Steuerberater, (3) Fernwartung eines Kundenservers, (4) Backup-Bänder im Bankschließfach.',
          steps: [
            { label: '1', body: 'Ruhende Daten → **BitLocker** mit TPM + Pre-Boot-PIN, Recovery-Key im AD.' },
            { label: '2', body: 'Vertrauliche Inhalte → Upload über das **TLS-gesicherte Portal** des Steuerberaters oder **S/MIME**-verschlüsselte Mail.' },
            { label: '3', body: 'Übertragung → **VPN** bzw. verschlüsselte Fernwartungslösung mit MFA; kein offener RDP-Port im Internet.' },
            { label: '4', body: 'Ruhende Daten außer Haus → **Backup-Verschlüsselung** (z. B. LTO-Hardwareverschlüsselung, AES-256), Schlüssel getrennt im Tresor.' },
          ],
          result: 'At rest: BitLocker/Backup-Verschlüsselung; in transit: TLS, VPN; Inhalte Ende-zu-Ende: S/MIME/PGP – immer mit geregelter Schlüsselverwaltung.',
        },
        {
          type: 'check',
          question: {
            id: 's04-c10', kind: 'single', skill: 'sich.auth.krypto', difficulty: 2,
            prompt: 'Ein Notebook mit BitLocker startet nach einem Mainboardtausch nur noch mit dem **Wiederherstellungsschlüssel**. Dieser wurde nirgends gespeichert. Welches Schutzziel ist jetzt verletzt?',
            options: ['Verfügbarkeit', 'Vertraulichkeit', 'Authentizität', 'Keines'],
            answer: 0,
            distractors: {
              '1': { why: 'Die Vertraulichkeit ist gerade gewahrt – niemand kann die Daten lesen, leider auch der Besitzer nicht.', error: 'schutzziel-verwechselt' },
              '2': { why: 'Die Echtheit eines Partners spielt hier keine Rolle.', error: 'schutzziel-verwechselt' },
              '3': { why: 'Die Daten sind nicht mehr nutzbar – das ist ein Verfügbarkeitsproblem.', error: 'schutzziel-verwechselt' },
            },
            explanation: 'Verschlüsselung ohne Schlüsselverwaltung gefährdet die **Verfügbarkeit**. Recovery-Keys gehören zentral hinterlegt.',
          },
        },
        { type: 'practice', title: 'Übung: Verschlüsselung', questionIds: ['s04-q023', 's04-q024', 's04-q025', 's04-q026', 's04-q027'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'At rest: BitLocker, verschlüsselte Container und Backups. In transit: TLS, VPN, SSH/SFTP. Ende-zu-Ende: S/MIME, PGP.',
            'Symmetrisch = schnell, asymmetrisch = Schlüsseltausch/Signatur, hybrid = beides (TLS).',
            'Schlüsselverwaltung: Recovery-Keys zentral hinterlegen, Schlüssel getrennt vom Backup, Zertifikate erneuern.',
          ],
        },
      ],
    },
  ],

  /* ================================================================== */
  questions: [
    {
      id: 's04-q001', kind: 'match', skill: 'sich.auth.begriffe', difficulty: 1,
      prompt: 'Ordne die Begriffe zu.',
      left: ['Identifikation', 'Authentifizierung', 'Autorisierung'],
      right: ['Angabe, wer man ist (z. B. Benutzername)', 'Nachweis und Prüfung der Identität (z. B. Passwort, Fingerabdruck)', 'Gewährung von Rechten (z. B. Zugriff auf einen Ordner)'],
      answer: [0, 1, 2],
      explanation: 'Wer? – Beweis – Was darf ich?',
    },
    {
      id: 's04-q002', kind: 'free', skill: 'sich.auth.begriffe', difficulty: 2,
      prompt: 'Erläutern Sie, warum Administratoren für ihre tägliche Arbeit (E-Mail, Internet, Office) ein **normales Benutzerkonto** und für Verwaltungsaufgaben ein **getrenntes Administratorkonto** verwenden sollen.',
      modelAnswer: 'Bei der täglichen Arbeit ist das Risiko hoch, Schadsoftware über Mailanhänge oder Webseiten einzufangen. Läuft diese mit Administratorrechten, kann sie sich tief im System und im ganzen Netzwerk ausbreiten, Sicherheitssoftware abschalten oder Backups löschen. Mit einem normalen Konto ohne Adminrechte bleibt der Schaden begrenzt (Least Privilege). Das Admin-Konto wird nur gezielt für Verwaltungsaufgaben genutzt, kann zusätzlich mit MFA geschützt und besonders überwacht werden. Außerdem ist nachvollziehbar, wann administrative Handlungen stattfanden.',
      keywords: ['Schadsoftware', 'Least Privilege', 'Ausbreitung', 'MFA', 'Nachvollziehbarkeit'],
      explanation: 'Trennung der Konten begrenzt den Schaden bei einer Infektion.',
    },
    {
      id: 's04-q003', kind: 'single', skill: 'sich.auth.begriffe', difficulty: 1,
      prompt: 'Eine Mitarbeiterin ist erfolgreich angemeldet, kann aber den Ordner „Geschäftsführung“ nicht öffnen. Welcher Schritt verhindert den Zugriff?',
      options: ['Autorisierung', 'Identifikation', 'Authentifizierung', 'Verschlüsselung'],
      answer: 0,
      distractors: {
        '1': { why: 'Die Identifikation ist erfolgt – sie ist ja angemeldet.', error: 'auth-autorisierung' },
        '2': { why: 'Die Authentifizierung war erfolgreich (sie ist angemeldet).', error: 'auth-autorisierung' },
        '3': { why: 'Die fehlende Berechtigung ist der Grund, nicht eine Verschlüsselung.', error: 'auth-autorisierung' },
      },
      explanation: 'Angemeldet = authentifiziert. Was sie darf, regelt die **Autorisierung** (Rechte).',
    },
    {
      id: 's04-q004', kind: 'multi', skill: 'sich.auth.begriffe', difficulty: 2,
      prompt: 'Welche Regeln gelten für **Dienstkonten** (z. B. für die Backup-Software)?',
      options: ['nur die für den Dienst nötigen Rechte', 'langes, zufälliges Passwort', 'keine interaktive Anmeldung am Desktop', 'Passwort dem ganzen IT-Team per Mail schicken', 'Mitglied der Gruppe Domänen-Admins, damit nichts klemmt'],
      answer: [0, 1, 2],
      explanation: 'Dienstkonten sind beliebte Angriffsziele – minimal berechtigen, stark sichern, nicht interaktiv nutzen.',
    },
    {
      id: 's04-q005', kind: 'free', skill: 'sich.auth.passwort', difficulty: 2,
      prompt: 'Begründen Sie, warum das BSI von **regelmäßigen erzwungenen Passwortwechseln** (z. B. alle 90 Tage) abrät, und nennen Sie, wann ein Passwort sofort geändert werden muss.',
      modelAnswer: 'Erzwungene Wechsel in kurzen Abständen führen dazu, dass Nutzer einfache, vorhersehbare Muster wählen (z. B. Zähler oder Monatsnamen anhängen), Passwörter aufschreiben oder an mehreren Stellen wiederverwenden. Angreifer kennen diese Muster. Ein langes, einzigartiges Passwort, das nicht kompromittiert ist, wird durch einen Wechsel nicht sicherer. Deshalb soll nur aus gutem Grund gewechselt werden: sofort bei Verdacht auf Kompromittierung, nach einem Datenleck des Dienstes, wenn das Passwort weitergegeben oder beobachtet wurde, oder wenn es ein Standard-/Initialpasswort ist.',
      keywords: ['Muster', 'aufschreiben', 'Verdacht', 'Kompromittierung', 'Datenleck', 'Initialpasswort'],
      explanation: 'IT-Grundschutz ORP.4: Wechsel nur mit validem Grund.',
    },
    {
      id: 's04-q006', kind: 'single', skill: 'sich.auth.passwort', difficulty: 1,
      prompt: 'Welches Passwort ist nach den BSI-Empfehlungen am **sichersten** (alle gleich unbekannt für den Angreifer)?',
      options: ['Eine Passphrase aus sechs zufällig gewählten Wörtern mit Leerzeichen', 'Kraemer2026!', 'P@ssw0rt', 'Der Vorname des eigenen Hundes mit Geburtsjahr'],
      answer: 0,
      distractors: {
        '1': { why: 'Firmenname + Jahr + Ausrufezeichen ist ein bekanntes Muster und steht auf Sperrlisten.', error: 'pw-muster' },
        '2': { why: 'Zeichenersetzungen wie @ statt a kennen alle Wörterbuchangriffe.', error: 'pw-muster' },
        '3': { why: 'Persönliche Informationen sind über soziale Netzwerke leicht herauszufinden.', error: 'pw-muster' },
      },
      explanation: 'Länge und Zufall schlagen „komplizierte“ Muster.',
    },
    {
      id: 's04-q007', kind: 'multi', skill: 'sich.auth.passwort', difficulty: 2,
      prompt: 'Welche Vorteile bietet ein **Passwort-Manager**?',
      options: ['Für jeden Dienst kann ein langes Zufallspasswort genutzt werden.', 'Passwörter werden nur auf der hinterlegten Domain automatisch ausgefüllt – das erschwert Phishing.', 'Man muss sich nur ein starkes Master-Passwort merken.', 'Der Passwort-Manager macht MFA überflüssig.', 'Passwörter werden automatisch an Kollegen verteilt.'],
      answer: [0, 1, 2],
      explanation: 'Der Passwort-Manager selbst sollte zusätzlich mit MFA geschützt werden. Geteilt wird nur gezielt über berechtigte Tresore, nicht automatisch.',
    },
    {
      id: 's04-q008', kind: 'number', skill: 'sich.auth.passwort', difficulty: 2,
      prompt: 'Nach **5** Fehlversuchen wird ein Konto für **30 Minuten** gesperrt. Ein Angreifer probiert online jeweils sofort 5 Passwörter, wartet die Sperre ab und macht weiter. Wie viele Passwörter kann er höchstens **pro Tag** (24 h) ausprobieren?',
      answer: 240, unit: 'Versuche',
      hints: ['Wie viele 30-Minuten-Abschnitte hat ein Tag?'],
      misconceptions: [{ answer: '48', error: 'kontosperre-rechnen', why: '48 Sperrzyklen pro Tag – aber jeweils 5 Versuche: 48 · 5.' }],
      explanation: '24 h · 60 min / 30 min = 48 Zyklen · 5 Versuche = **240 Versuche pro Tag** – bei Millionen möglicher Passwörter praktisch aussichtslos. Darum ist die Kontosperre (oder Verzögerung) so wirksam gegen Online-Angriffe.',
    },
    {
      id: 's04-q009', kind: 'free', skill: 'sich.auth.passwort', difficulty: 3,
      prompt: 'Erläutern Sie, warum Server Passwörter nicht im Klartext, sondern als **Hashwert mit Salt** speichern.',
      modelAnswer: 'Ein Hashwert ist eine Einwegfunktion: Aus dem gespeicherten Wert kann das Passwort nicht direkt zurückgerechnet werden; bei der Anmeldung wird das eingegebene Passwort gehasht und mit dem gespeicherten Wert verglichen. Wird die Datenbank gestohlen, liegen die Passwörter also nicht offen. Ein Salt ist ein zufälliger Wert pro Benutzer, der vor dem Hashen ans Passwort angehängt wird. Dadurch haben gleiche Passwörter unterschiedliche Hashwerte, und vorberechnete Tabellen (Rainbow Tables) sind nutzlos – der Angreifer muss für jedes Konto einzeln raten. Langsame Hashverfahren (z. B. Argon2, bcrypt) bremsen das Raten zusätzlich.',
      keywords: ['Einwegfunktion', 'Vergleich', 'Salt', 'Rainbow Tables', 'langsam'],
      explanation: 'Hash + Salt + langsames Verfahren = Schutz der Passwörter auch nach einem Datenbankdiebstahl.',
    },
    {
      id: 's04-q010', kind: 'single', skill: 'sich.auth.passwort', difficulty: 1,
      prompt: 'Ein neuer Netzwerkdrucker wird mit dem Admin-Passwort „admin“ ausgeliefert. Was ist zu tun?',
      options: ['Das voreingestellte Passwort sofort durch ein starkes, individuelles Passwort ersetzen', 'Nichts – Drucker sind kein Angriffsziel', 'Das Passwort auf einen Aufkleber am Gerät schreiben', 'Den Drucker nur nachts betreiben'],
      answer: 0,
      distractors: {
        '1': { why: 'Drucker speichern Dokumente, Adressbücher und Zugangsdaten und dienen als Einfallstor ins Netz.', error: 'standardpasswort' },
        '2': { why: 'Damit kennt es jeder, der am Gerät vorbeikommt.', error: 'standardpasswort' },
        '3': { why: 'Die Betriebszeit ändert nichts am offenen Standardzugang.', error: 'standardpasswort' },
      },
      explanation: 'Standardpasswörter stehen in Handbüchern und Listen im Internet – immer sofort ändern.',
    },
    {
      id: 's04-q011', kind: 'match', skill: 'sich.auth.mfa', difficulty: 2,
      prompt: 'Ordne die Anmeldeverfahren ihrer Kategorie bzw. Eigenschaft zu.',
      left: ['Passwort + PIN', 'Passwort + TOTP-Code aus Authenticator-App', 'FIDO2-Sicherheitsschlüssel mit PIN', 'Passwort + SMS-Code'],
      right: ['keine MFA (zweimal Wissen)', 'MFA, aber Code ist auf Phishing-Seiten abgreifbar', 'phishing-resistente MFA', 'MFA, anfällig für SIM-Swapping'],
      answer: [0, 1, 2, 3],
      explanation: 'MFA erfordert verschiedene Faktorkategorien; phishing-resistent sind domaingebundene Verfahren (FIDO2/Passkeys).',
    },
    {
      id: 's04-q012', kind: 'text', skill: 'sich.auth.mfa', difficulty: 2,
      prompt: 'Ein Angreifer kennt das Passwort eines Mitarbeiters und löst nachts immer wieder Push-Anfragen aus, bis der genervte Mitarbeiter eine bestätigt. Wie heißt dieser Angriff? (englischer Begriff)',
      accept: ['MFA-Fatigue', 'MFA Fatigue', 'Push-Fatigue', 'Push Fatigue', 'MFA-Bombing', 'Prompt Bombing', 'MFA Bombing', 'Push-Bombing'],
      explanation: '**MFA-Fatigue** (Push-Bombing). Gegenmaßnahmen: Nummernabgleich, Begrenzung der Anfragen, Schulung („nie bestätigen, was man nicht selbst ausgelöst hat“), phishing-resistente Verfahren.',
    },
    {
      id: 's04-q013', kind: 'free', skill: 'sich.auth.mfa', difficulty: 2,
      prompt: 'Die Elektro Krämer GmbH kann MFA aus Budgetgründen nicht sofort für alle Konten einführen. Für welche Konten bzw. Zugänge sollte MFA zuerst eingeführt werden? Begründen Sie.',
      modelAnswer: 'Zuerst für Administratorkonten, weil ihre Übernahme den größten Schaden verursacht (Zugriff auf alle Systeme, Backups, Sicherheitseinstellungen). Dann für alle Zugänge aus dem Internet: VPN, Webmail, Microsoft 365/Cloud-Dienste und Fernwartung, weil sie weltweit erreichbar sind und gestohlene Passwörter dort direkt nutzbar wären. Danach Konten mit Zugriff auf besonders schützenswerte Daten (Personal, Buchhaltung, Zahlungsfreigaben) sowie den Passwort-Manager. Die Reihenfolge folgt dem Risiko (Schadenshöhe × Wahrscheinlichkeit).',
      keywords: ['Administrator', 'Fernzugriff', 'VPN', 'Cloud', 'Risiko', 'sensible Daten'],
      explanation: 'Risikobasierte Priorisierung – genau wie in der Risikoanalyse.',
    },
    {
      id: 's04-q014', kind: 'single', skill: 'sich.auth.mfa', difficulty: 2,
      prompt: 'Was ist das größte Risiko von **Single Sign-On**?',
      options: ['Ein kompromittiertes SSO-Konto öffnet dem Angreifer alle angebundenen Anwendungen.', 'Nutzer müssen sich zu viele Passwörter merken.', 'SSO funktioniert nur mit SMS.', 'Beim Austritt eines Mitarbeiters müssen alle Anwendungen einzeln gesperrt werden.'],
      answer: 0,
      distractors: {
        '1': { why: 'Im Gegenteil – SSO reduziert die Anzahl der Passwörter.', error: 'sso-missverstanden' },
        '2': { why: 'SSO hat nichts mit SMS zu tun; es nutzt Protokolle wie Kerberos, SAML oder OIDC.', error: 'sso-missverstanden' },
        '3': { why: 'Das ist gerade ein Vorteil von SSO: ein Konto sperren genügt.', error: 'sso-missverstanden' },
      },
      explanation: 'Single Point of Failure → SSO immer mit MFA kombinieren.',
    },
    {
      id: 's04-q015', kind: 'free', skill: 'sich.auth.mfa', difficulty: 3,
      prompt: 'Ein Mitarbeiter ruft beim Helpdesk an: „Ich habe ein neues Handy und komme nicht mehr in meine Authenticator-App. Bitte setzen Sie meine MFA zurück.“ Beschreiben Sie ein sicheres Vorgehen.',
      modelAnswer: 'Die Identität des Anrufers muss zuverlässig geprüft werden, bevor MFA zurückgesetzt wird – denn genau so versuchen Angreifer per Social Engineering, MFA auszuhebeln. Möglich: Rückruf über die im Telefonverzeichnis hinterlegte Nummer, persönliches Erscheinen mit Ausweis, Bestätigung durch den Vorgesetzten, Abfrage eines vorher vereinbarten Merkmals. Danach wird das alte Gerät als MFA-Methode entfernt, ein zeitlich begrenzter Einmal-Zugangscode ausgegeben und das neue Gerät registriert. Der Vorgang wird protokolliert; der Benutzer wird informiert, sodass er einen Missbrauch bemerken würde.',
      keywords: ['Identität prüfen', 'Rückruf', 'Social Engineering', 'Einmalcode', 'protokollieren'],
      explanation: 'Der Helpdesk ist ein beliebtes Angriffsziel – Prozesse für MFA-Reset müssen genauso sicher sein wie MFA selbst.',
    },
    {
      id: 's04-q016', kind: 'table', skill: 'sich.auth.rechte', difficulty: 2,
      prompt: `Erstelle die Berechtigungsmatrix nach dem **Least-Privilege-Prinzip**. Trage je Zelle **–** (kein Zugriff), **L** (lesen) oder **Ä** (ändern) ein.

Vorgaben:
- Jede Abteilung bearbeitet ihren eigenen Ordner.
- Die Buchhaltung muss Angebote und Aufträge des Vertriebs zur Rechnungsstellung **einsehen**, aber nicht ändern.
- Personaldaten sieht nur die Personalabteilung.
- Vorlagen werden zentral vom Marketing gepflegt (nicht Teil der Tabelle) und dürfen von allen nur gelesen werden.`,
      columns: [
        { key: 'ver', label: 'Vertrieb', type: 'text' },
        { key: 'buch', label: 'Buchhaltung', type: 'text' },
        { key: 'pers', label: 'Personal', type: 'text' },
        { key: 'vorl', label: 'Vorlagen', type: 'text' },
      ],
      rows: [
        { label: 'Rolle Vertrieb', cells: { ver: { answer: 'Ä', accept: ['ae', 'ändern', 'aendern'] }, buch: { answer: '–', accept: ['-', 'kein', 'keiner', 'x'] }, pers: { answer: '–', accept: ['-', 'kein', 'keiner', 'x'] }, vorl: { answer: 'L', accept: ['lesen'] } } },
        { label: 'Rolle Buchhaltung', cells: { ver: { answer: 'L', accept: ['lesen'] }, buch: { answer: 'Ä', accept: ['ae', 'ändern', 'aendern'] }, pers: { answer: '–', accept: ['-', 'kein', 'keiner', 'x'] }, vorl: { answer: 'L', accept: ['lesen'] } } },
        { label: 'Rolle Personal', cells: { ver: { answer: '–', accept: ['-', 'kein', 'keiner', 'x'] }, buch: { answer: '–', accept: ['-', 'kein', 'keiner', 'x'] }, pers: { answer: 'Ä', accept: ['ae', 'ändern', 'aendern'] }, vorl: { answer: 'L', accept: ['lesen'] } } },
      ],
      misconceptions: [{ cell: '1:ver', answer: 'Ä', error: 'least-privilege', why: 'Die Buchhaltung muss Angebote nur einsehen – Lesen genügt (Least Privilege).' }],
      explanation: 'Eigene Abteilung: Ä; Buchhaltung → Vertrieb: L; Vorlagen: L für alle; alles andere: kein Zugriff (Default deny, Need-to-know).',
    },
    {
      id: 's04-q017', kind: 'free', skill: 'sich.auth.rechte', difficulty: 2,
      prompt: 'Erläutern Sie das Prinzip **Least Privilege** und nennen Sie zwei Vorteile.',
      modelAnswer: 'Least Privilege bedeutet, dass Benutzer, Programme und Dienste nur genau die Rechte erhalten, die sie für ihre Aufgabe benötigen – nicht mehr und nur so lange wie nötig. Vorteile: 1. Wird ein Konto kompromittiert oder läuft Schadsoftware unter diesem Konto, ist der mögliche Schaden begrenzt (z. B. kann Ransomware nur die Ordner verschlüsseln, auf die das Konto Schreibrechte hat). 2. Versehentliche Fehler (Löschen, Ändern) sind auf den eigenen Bereich beschränkt. 3. Vertraulichkeit wird gewahrt, Datenschutzvorgaben (Need-to-know) werden eingehalten.',
      keywords: ['nur nötige Rechte', 'Schaden begrenzen', 'Schadsoftware', 'Fehler', 'Vertraulichkeit'],
      explanation: 'Minimale Rechte = minimaler Schaden.',
    },
    {
      id: 's04-q018', kind: 'order', skill: 'sich.auth.rechte', difficulty: 2,
      prompt: 'Bringe die Schritte bei der Einrichtung eines Kontos für einen **neuen Mitarbeiter** in eine sinnvolle Reihenfolge.',
      items: ['Schriftlicher Antrag mit Rolle und benötigten Rechten durch den Vorgesetzten', 'Freigabe des Antrags (ggf. durch Daten-/Systemverantwortliche)', 'Benutzerkonto anlegen und der passenden Rollengruppe zuordnen', 'Initialpasswort sicher übergeben; Wechsel bei der ersten Anmeldung und MFA-Registrierung', 'Dokumentation der vergebenen Rechte'],
      explanation: 'Antrag → Freigabe → Anlegen über Rollen → sichere Übergabe → Dokumentation.',
    },
    {
      id: 's04-q019', kind: 'single', skill: 'sich.auth.rechte', difficulty: 2,
      prompt: 'Warum vergibt man Rechte an **Gruppen/Rollen** statt an einzelne Benutzer?',
      options: ['Weil es übersichtlicher ist, Änderungen schneller gehen und weniger Fehler entstehen', 'Weil Windows Einzelrechte nicht kennt', 'Weil Gruppen kein Passwort brauchen', 'Weil dann alle Benutzer dieselben Rechte haben'],
      answer: 0,
      distractors: {
        '1': { why: 'Einzelrechte sind technisch möglich, aber unübersichtlich.', error: 'rbac' },
        '2': { why: 'Passwörter haben Benutzer – Gruppen bündeln Rechte.', error: 'rbac' },
        '3': { why: 'Verschiedene Rollen haben unterschiedliche Rechte; alle Mitglieder **einer** Rolle haben dieselben.', error: 'rbac' },
      },
      explanation: 'RBAC: Neue Mitarbeiterin im Vertrieb → in Gruppe „Vertrieb“ aufnehmen → fertig.',
    },
    {
      id: 's04-q020', kind: 'free', skill: 'sich.auth.rechte', difficulty: 3,
      prompt: 'Bei einer Prüfung fällt auf, dass ein Mitarbeiter, der in 8 Jahren durch vier Abteilungen gewechselt ist, noch Zugriff auf die Ordner aller vier Abteilungen hat. Benennen Sie das Problem und schlagen Sie zwei organisatorische Maßnahmen vor.',
      modelAnswer: 'Problem: Rechte-Akkumulation – bei Abteilungswechseln wurden neue Rechte hinzugefügt, alte aber nicht entzogen. Das verletzt Least Privilege und Need-to-know und erhöht den Schaden bei einer Kompromittierung des Kontos. Maßnahmen: 1. Verbindlicher Mover-Prozess: Bei jedem Wechsel werden die Rechte der alten Rolle entzogen und die neue Rolle zugewiesen; Änderung per Antrag mit Freigabe. 2. Regelmäßige Rezertifizierung: Vorgesetzte bestätigen z. B. jährlich die Rechte ihrer Mitarbeitenden; nicht bestätigte Rechte werden entfernt. 3. Rechte nur über Rollen vergeben, Dokumentation in einer Berechtigungsmatrix.',
      keywords: ['Rechte-Akkumulation', 'Mover', 'entziehen', 'Rezertifizierung', 'Least Privilege'],
      explanation: 'Rechte wachsen ohne Prozess immer – Rezertifizierung räumt auf.',
    },
    {
      id: 's04-q021', kind: 'match', skill: 'sich.auth.rechte', difficulty: 1,
      prompt: 'Ordne die Phasen des Benutzerlebenszyklus der richtigen Maßnahme zu.',
      left: ['Joiner (Eintritt)', 'Mover (Abteilungswechsel)', 'Leaver (Austritt)'],
      right: ['Konto nach genehmigtem Antrag anlegen, Rolle zuweisen', 'neue Rolle zuweisen und alte Rechte entziehen', 'Konto sperren, Token und Karten einziehen, Daten übergeben'],
      answer: [0, 1, 2],
      explanation: 'Joiner – Mover – Leaver.',
    },
    {
      id: 's04-q022', kind: 'single', skill: 'sich.auth.rechte', difficulty: 2,
      prompt: 'In der Buchhaltung kann dieselbe Person neue Lieferanten anlegen **und** Zahlungen an Lieferanten freigeben. Welches Prinzip ist verletzt?',
      options: ['Funktionstrennung', 'Datenminimierung', 'Verfügbarkeit', 'Zutrittskontrolle'],
      answer: 0,
      distractors: {
        '1': { why: 'Datenminimierung betrifft die Menge personenbezogener Daten.', error: 'funktionstrennung' },
        '2': { why: 'Verfügbarkeit ist ein Schutzziel, kein Organisationsprinzip der Rechtevergabe.', error: 'funktionstrennung' },
        '3': { why: 'Zutrittskontrolle betrifft Räume.', error: 'funktionstrennung' },
      },
      explanation: 'Wer Lieferanten anlegt und selbst bezahlt, könnte einen Scheinlieferanten anlegen – kritische Aufgaben gehören auf verschiedene Personen (**Funktionstrennung**).',
    },
    {
      id: 's04-q023', kind: 'match', skill: 'sich.auth.krypto', difficulty: 2,
      prompt: 'Ordne der Situation das passende Verfahren zu.',
      left: ['Gestohlenes Notebook soll unlesbar sein', 'Login-Daten im Webshop sollen nicht mitgelesen werden', 'Vertrauliche Mail soll nur der Empfänger lesen können – auch nicht der Mailprovider', 'Administratoren verwalten Linux-Server aus der Ferne'],
      right: ['Festplattenverschlüsselung (BitLocker)', 'TLS (HTTPS)', 'S/MIME oder OpenPGP (Ende-zu-Ende)', 'SSH statt Telnet'],
      answer: [0, 1, 2, 3],
      explanation: 'At rest → BitLocker; in transit → TLS/SSH; Inhalt Ende-zu-Ende → S/MIME/PGP.',
    },
    {
      id: 's04-q024', kind: 'single', skill: 'sich.auth.krypto', difficulty: 2,
      prompt: 'Warum nutzt TLS ein **hybrides** Verfahren?',
      options: ['Asymmetrisch wird sicher ein Sitzungsschlüssel ausgehandelt, die Daten selbst werden dann schnell symmetrisch verschlüsselt.', 'Weil symmetrische Verfahren unsicher sind.', 'Weil asymmetrische Verfahren schneller sind.', 'Weil so kein Zertifikat nötig ist.'],
      answer: 0,
      distractors: {
        '1': { why: 'AES ist sicher – nur der Schlüsselaustausch ist das Problem.', error: 'hybrid-missverstanden' },
        '2': { why: 'Asymmetrische Verfahren sind deutlich langsamer.', error: 'hybrid-missverstanden' },
        '3': { why: 'Das Zertifikat bestätigt die Identität des Servers – es bleibt nötig.', error: 'hybrid-missverstanden' },
      },
      explanation: 'Hybrid = Vorteile beider Welten: sicherer Schlüsselaustausch + schnelle Datenverschlüsselung.',
    },
    {
      id: 's04-q025', kind: 'free', skill: 'sich.auth.krypto', difficulty: 2,
      prompt: 'Sie aktivieren BitLocker auf 40 Firmen-Notebooks. Beschreiben Sie, was Sie zur **Schlüsselverwaltung** organisatorisch festlegen müssen.',
      modelAnswer: 'Die Wiederherstellungsschlüssel aller Geräte müssen zentral und geschützt hinterlegt werden (z. B. automatisch im Active Directory bzw. Entra ID oder in einem Tresor), damit bei defektem TPM, Mainboardtausch oder vergessener PIN die Daten nicht verloren sind. Festzulegen ist, wer die Schlüssel abrufen darf (nur berechtigte Administratoren) und wie die Identität des anfragenden Benutzers geprüft wird; Abrufe werden protokolliert. Außerdem: Regeln für PIN (Länge, nicht notieren), Vorgehen bei Verlust des Geräts, Rotation des Recovery-Keys nach Nutzung, Dokumentation im Kryptokonzept.',
      keywords: ['Wiederherstellungsschlüssel', 'zentral hinterlegen', 'Active Directory', 'Berechtigung', 'Protokollierung'],
      explanation: 'Ohne Schlüsselverwaltung wird Verschlüsselung zum Verfügbarkeitsrisiko.',
    },
    {
      id: 's04-q026', kind: 'multi', skill: 'sich.auth.krypto', difficulty: 2,
      prompt: 'Welche Maßnahmen schützen **übertragene** Daten (*data in transit*)?',
      options: ['VPN zwischen den Standorten', 'HTTPS für das Intranet', 'SFTP statt FTP', 'BitLocker auf dem Server', 'Verschlüsselte Backup-Bänder im Schließfach'],
      answer: [0, 1, 2],
      explanation: 'BitLocker und verschlüsselte Bänder schützen ruhende Daten (at rest).',
    },
    {
      id: 's04-q027', kind: 'text', skill: 'sich.auth.krypto', difficulty: 1,
      prompt: 'Wie heißt das in Windows integrierte Verfahren zur Verschlüsselung ganzer Laufwerke?',
      accept: ['BitLocker', 'Bitlocker', 'BitLocker-Laufwerkverschlüsselung', 'BitLocker Drive Encryption'],
      explanation: '**BitLocker** – idealerweise mit TPM und zusätzlicher Pre-Boot-PIN.',
    },
    {
      id: 's04-q028', kind: 'number', skill: 'sich.auth.passwort', difficulty: 2,
      prompt: 'Wie viele Kombinationen hat ein 4-stelliges Passwort nur aus **Kleinbuchstaben** a–z (26 Zeichen)?',
      answer: 456976,
      misconceptions: [{ answer: '104', error: 'pw-multipliziert', why: 'Nicht 26 · 4, sondern 26⁴.' }],
      explanation: '26⁴ = 26 · 26 · 26 · 26 = **456.976**.',
    },
    {
      id: 's04-q029', kind: 'number', skill: 'sich.auth.passwort', difficulty: 3,
      prompt: 'Ein Passwort aus Buchstaben und Ziffern (62 Zeichen) wird von **8** auf **10** Zeichen verlängert. Um welchen **Faktor** steigt die Anzahl der Kombinationen?',
      answer: 3844,
      hints: ['62¹⁰ / 62⁸ = 62²'],
      misconceptions: [{ answer: '124', error: 'pw-multipliziert', why: 'Zwei zusätzliche Zeichen bedeuten Faktor 62 · 62 = 62², nicht 62 · 2.' }, { answer: '2', error: 'pw-multipliziert', why: 'Jedes Zeichen multipliziert mit dem Zeichenvorrat.' }],
      explanation: '62¹⁰ / 62⁸ = 62² = **3.844** – zwei Zeichen mehr machen den Angriff rund 3.800-mal aufwendiger.',
    },
    {
      id: 's04-q030', kind: 'number', skill: 'sich.auth.passwort', difficulty: 2,
      prompt: 'Eine Bankkarten-PIN hat **4 Ziffern**; nach **3** Fehlversuchen wird die Karte gesperrt. Wie hoch ist die Wahrscheinlichkeit in **Prozent**, die PIN durch zufälliges Raten zu treffen? (Ergebnis in %, z. B. 0,05)',
      answer: 0.03, tolerance: 0.0001, unit: '%',
      hints: ['10⁴ = 10.000 Möglichkeiten, 3 Versuche.'],
      misconceptions: [{ answer: '0.0003', error: 'prozent-umrechnung', why: 'Das ist der Anteil als Dezimalzahl. In Prozent: · 100 = 0,03 %.' }],
      explanation: '3 / 10.000 = 0,0003 = **0,03 %**. Die Sperre nach wenigen Fehlversuchen macht selbst kurze PINs sicher – solange niemand offline raten kann.',
    },
    {
      id: 's04-q031', kind: 'free', skill: 'sich.auth.begriffe', difficulty: 2,
      prompt: 'Grenzen Sie **Zutrittskontrolle**, **Zugangskontrolle** und **Zugriffskontrolle** voneinander ab und nennen Sie je eine Maßnahme für den Serverraum bzw. den Fileserver.',
      modelAnswer: 'Zutrittskontrolle verhindert, dass Unbefugte Räume mit IT-Systemen betreten – Maßnahme: Serverraum mit Chipkartenleser und Protokollierung, Schlüssel nur für Administratoren. Zugangskontrolle verhindert, dass Unbefugte IT-Systeme benutzen – Maßnahme: Anmeldung am Fileserver nur mit persönlichem Admin-Konto und MFA, gesperrte Konsole. Zugriffskontrolle stellt sicher, dass Berechtigte nur auf die Daten zugreifen, für die sie berechtigt sind – Maßnahme: NTFS-/Freigaberechte nach Rollen, z. B. Ordner „Personal“ nur für die Gruppe Personal.',
      keywords: ['Raum', 'System', 'Daten', 'Chipkarte', 'Anmeldung', 'Rechte'],
      explanation: 'Raum → System → Daten.',
    },
  ],
};
