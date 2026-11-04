import type { Module } from '../types';

export const b02: Module = {
  id: 'b02',
  nr: 2,
  area: 'systeme',
  title: 'Benutzer, Rechte & Verzeichnisdienste',
  short: 'Kontenarten, Active Directory (Domäne, OU, Gruppen, GPO), NTFS- und Freigabeberechtigungen, Linux-Rechte mit chmod, root und sudo.',
  icon: 'Users',
  relevance: 'ap1',
  prerequisites: ['b01'],
  generators: ['sys.effrechte', 'sys.chmod'],
  skills: [
    { id: 'rights.accounts', module: 'b02', title: 'Kontenarten und Prinzip der minimalen Rechte' },
    { id: 'rights.ad', module: 'b02', title: 'Active Directory: Domäne, OU, Gruppen', requires: ['rights.accounts'] },
    { id: 'rights.gpo', module: 'b02', title: 'Gruppenrichtlinien (GPO) anwenden', requires: ['rights.ad'] },
    { id: 'rights.ntfs', module: 'b02', title: 'NTFS-Berechtigungen und Vererbung', requires: ['rights.accounts'] },
    { id: 'rights.share', module: 'b02', title: 'Effektive Rechte aus Freigabe und NTFS bestimmen', requires: ['rights.ntfs'] },
    { id: 'rights.linux', module: 'b02', title: 'Linux-Rechte (rwx) und chmod oktal/symbolisch' },
    { id: 'rights.root', module: 'b02', title: 'root, sudo und administrative Rechte', requires: ['rights.linux'] },
  ],
  lessons: [
    /* ------------------------------------------------------------ */
    {
      id: 'b02-l01',
      title: 'Benutzerkonten und das Prinzip der minimalen Rechte',
      minutes: 20,
      relevance: 'ap1',
      skills: ['rights.accounts'],
      steps: [
        {
          type: 'explain',
          title: 'Wer bist du – und was darfst du?',
          body: `Zwei Begriffe muss man auseinanderhalten:

- **Authentifizierung:** Nachweis, *wer* man ist (Benutzername + Passwort, Smartcard, Windows Hello, MFA).
- **Autorisierung:** Festlegen, *was* man darf (Berechtigungen auf Dateien, Ordner, Drucker, Systemeinstellungen).

**Kontenarten unter Windows:**

| Konto | Gespeichert in | Einsatz |
|---|---|---|
| **Lokales Konto** | SAM-Datenbank des einzelnen PCs | Einzelplatz, Notfall-Admin; gilt nur auf **diesem** Gerät |
| **Microsoft-Konto** | Microsoft-Cloud | Privat-PCs (Synchronisation, Store, OneDrive) |
| **Domänenkonto** | **Active Directory** auf dem Domänencontroller | Unternehmen: ein Konto für alle PCs, Server, Drucker der Domäne – zentral verwaltet |
| **Entra-ID-Konto** (früher Azure AD) | Microsoft-Cloud-Verzeichnis | Cloud-verwaltete Firmengeräte, Microsoft 365 |

**Kontotypen nach Rechten:** *Standardbenutzer* (darf arbeiten, aber keine Software installieren oder Systemeinstellungen ändern) und *Administrator* (darf alles). Selbst ein Administrator arbeitet unter Windows dank **Benutzerkontensteuerung (UAC)** zunächst mit eingeschränkten Rechten und muss Admin-Aktionen ausdrücklich bestätigen.

**Prinzip der minimalen Rechte (Least Privilege):** Jeder bekommt nur die Rechte, die er für seine Aufgabe **braucht** – nicht mehr. Verwandt: **Need-to-know** (nur Zugriff auf Informationen, die man benötigt).

Warum? Schadsoftware läuft mit den Rechten des angemeldeten Benutzers. Surft ein Admin mit Admin-Rechten und öffnet einen verseuchten Anhang, hat die Schadsoftware Admin-Rechte. Deshalb:
- Alltag mit **Standardkonto**, Administration mit **separatem Admin-Konto** (z. B. \`adm.schulz\`).
- Rechte über **Gruppen** vergeben, nie direkt an einzelne Personen – sonst verliert man den Überblick.
- Beim Abteilungswechsel alte Rechte **entziehen** (sonst sammeln sich Rechte an).
- Konten ausgeschiedener Mitarbeiter sofort **deaktivieren**.`,
        },
        {
          type: 'visual',
          title: 'Rechte über Rollen und Gruppen',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Benutzer', text: 'Jana Schulz, Tim Becker … – jedes Konto gehört einer Person.', icon: 'Users' },
                { title: 'Gruppen (Rollen)', text: 'GG_Vertrieb, GG_Buchhaltung – Benutzer werden Mitglied entsprechend ihrer Aufgabe.', icon: 'FolderTree' },
                { title: 'Ressourcen', text: 'Ordner, Drucker, Anwendungen – Rechte werden an Gruppen vergeben.', icon: 'FolderLock' },
              ],
            },
          },
          caption: 'Wechselt jemand die Abteilung, ändert man nur die Gruppenmitgliedschaft – nicht hunderte Einzelrechte.',
        },
        {
          type: 'example',
          title: 'Konten für eine neue Mitarbeiterin',
          problem: 'Leyla Aksoy beginnt im Einkauf. Sie braucht Zugriff auf die Einkaufsdaten und den Abteilungsdrucker. Gelegentlich muss sie eine Software installieren. Wie richtest du das ein?',
          steps: [
            { label: 'Konto', body: 'Domänenkonto `l.aksoy` als **Standardbenutzer** anlegen, sicheres Initialpasswort mit Änderungszwang bei der ersten Anmeldung.' },
            { label: 'Gruppen', body: 'Mitglied in `GG_Einkauf` – diese Gruppe hat bereits Rechte auf den Einkaufsordner und den Drucker.' },
            { label: 'Software', body: '**Keine** Admin-Rechte! Software wird zentral (Softwareverteilung, Firmenportal) oder durch die IT installiert.' },
            { label: 'Dokumentation', body: 'Anlage per Ticket dokumentieren (Antrag mit Genehmigung durch die Vorgesetzte).' },
          ],
          result: 'Standardkonto + Gruppenmitgliedschaft nach Rolle = minimale Rechte, leicht zu verwalten.',
        },
        {
          type: 'check',
          question: {
            id: 'b02-c01', kind: 'single', skill: 'rights.accounts', difficulty: 1,
            prompt: 'Ein Administrator liest mit seinem Admin-Konto E-Mails und surft im Internet. Was ist das Hauptproblem?',
            options: ['Schadsoftware erhält beim Ausführen sofort Administratorrechte.', 'E-Mails werden langsamer zugestellt.', 'Der Browser funktioniert mit Admin-Rechten nicht.', 'Es gibt kein Problem.'],
            answer: 0,
            distractors: { '1': { why: 'Die Rechte haben keinen Einfluss auf die Zustellgeschwindigkeit.', error: 'least-privilege' }, '2': { why: 'Der Browser funktioniert – gerade das ist gefährlich.', error: 'least-privilege' }, '3': { why: 'Programme laufen mit den Rechten des angemeldeten Benutzers – auch Schadsoftware.', error: 'least-privilege' } },
            explanation: 'Least Privilege: Alltag mit Standardkonto, Admin-Konto nur für Verwaltung.',
          },
        },
        { type: 'practice', title: 'Übung: Konten und Rechte', questionIds: ['b02-q001', 'b02-q002', 'b02-q003', 'b02-q004'], count: 4, difficulty: 1 },
        { type: 'summary', points: ['Authentifizierung = wer; Autorisierung = was.', 'Lokales Konto (SAM, ein PC) vs. Domänenkonto (AD, zentral).', 'Least Privilege: nur nötige Rechte, getrennte Admin-Konten.', 'Rechte an Gruppen vergeben, nie an Einzelpersonen.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b02-l02',
      title: 'Active Directory: Domäne, Organisationseinheiten und Gruppen',
      minutes: 25,
      relevance: 'ap1',
      skills: ['rights.ad'],
      steps: [
        {
          type: 'explain',
          title: 'Ein zentrales Verzeichnis für alles',
          body: `**Active Directory Domain Services (AD DS)** ist der Verzeichnisdienst von Microsoft. Er speichert zentral alle **Objekte** eines Unternehmens: Benutzer, Gruppen, Computer, Drucker – samt Eigenschaften und Berechtigungen.

| Begriff | Bedeutung |
|---|---|
| **Domäne** | Verwaltungs- und Sicherheitseinheit mit gemeinsamer Verzeichnisdatenbank, z. B. \`ad.elektro-kraemer.de\` |
| **Domänencontroller (DC)** | Server mit AD DS; prüft Anmeldungen (Kerberos), hält die Datenbank. Mindestens **zwei** DCs für Ausfallsicherheit (sie replizieren sich) |
| **Struktur (Tree)** | Domänen mit zusammenhängendem DNS-Namensraum (z. B. \`ad.elektro-kraemer.de\` und \`berlin.ad.elektro-kraemer.de\`) |
| **Gesamtstruktur (Forest)** | oberste Ebene: eine oder mehrere Strukturen mit gemeinsamem Schema und Vertrauensstellungen |
| **Organisationseinheit (OU)** | „Ordner“ im AD zum Strukturieren (z. B. nach Standort/Abteilung). An OUs kann man **Gruppenrichtlinien verknüpfen** und **Verwaltungsrechte delegieren** |
| **Gruppe** | Sammlung von Objekten, um **Rechte** zu vergeben (Sicherheitsgruppe) oder E-Mails zu verteilen (Verteilergruppe) |

**Wichtig:** OUs und Gruppen sind verschiedene Dinge! Eine OU **ordnet** Objekte (jedes Objekt liegt in genau einer OU) und ist Ziel für GPOs. Eine Gruppe **berechtigt** – ein Benutzer kann in vielen Gruppen sein. Die Standard-Container „Users“ und „Computers“ sind keine OUs; an sie kann man keine GPO direkt verknüpfen.

**Gruppenbereiche (Scopes):**

| Bereich | Mitglieder | Typische Verwendung |
|---|---|---|
| **Global** | Konten aus der **eigenen** Domäne | Rollen/Abteilungen bündeln: \`GG_Vertrieb\` |
| **Domänenlokal** | Konten und Gruppen aus allen Domänen der Gesamtstruktur | Rechte auf eine **Ressource**: \`DL_Vertrieb_Ändern\` |
| **Universal** | aus allen Domänen der Gesamtstruktur | gesamtstrukturweite Gruppen |

Bewährte Strategie **AGDLP**: **A**ccounts → in **G**lobale Gruppen → diese in **D**omänen**l**okale Gruppen → diese bekommen die **P**ermissions (Berechtigungen). In kleinen Umgebungen vereinfacht man oft auf „Benutzer → Gruppe → Recht“.

**Abhängigkeiten:** AD braucht **DNS** (Clients finden DCs über SRV-Einträge). Wichtige Protokolle: **Kerberos** (Anmeldung, Port 88), **LDAP** (Verzeichniszugriff, Port 389, verschlüsselt LDAPS 636). Unter Linux gibt es mit **Samba** (als AD-kompatibler DC) und **OpenLDAP** ebenfalls Verzeichnisdienste.`,
        },
        {
          type: 'visual',
          title: 'Domäne der Elektro Krämer GmbH',
          widget: {
            kind: 'topology',
            data: {
              nodes: [
                { id: 'dc1', type: 'server', label: 'DC01', sub: 'AD DS, DNS', x: 140, y: 80 },
                { id: 'dc2', type: 'server', label: 'DC02', sub: 'AD DS, DNS', x: 340, y: 80 },
                { id: 'sw', type: 'switch', label: 'Core-Switch', x: 240, y: 200 },
                { id: 'fs', type: 'server', label: 'FS01', sub: 'Dateiserver', x: 560, y: 80 },
                { id: 'pc1', type: 'pc', label: 'PC-HH-VT-01', sub: 'OU Hamburg/Vertrieb', x: 140, y: 340 },
                { id: 'pc2', type: 'pc', label: 'PC-HH-BH-03', sub: 'OU Hamburg/Buchhaltung', x: 380, y: 340 },
                { id: 'pr', type: 'printer', label: 'PR-HH-VT', sub: 'Drucker Vertrieb', x: 620, y: 340 },
              ],
              links: [
                { from: 'dc1', to: 'sw' }, { from: 'dc2', to: 'sw' }, { from: 'fs', to: 'sw' },
                { from: 'sw', to: 'pc1' }, { from: 'sw', to: 'pc2' }, { from: 'sw', to: 'pr' },
                { from: 'dc1', to: 'dc2', label: 'Replikation', style: 'trunk' },
              ],
              zones: [{ label: 'Domäne ad.elektro-kraemer.de', x: 40, y: 20, w: 720, h: 390, color: 'purple' }],
            },
          },
          caption: 'Zwei DCs replizieren das Verzeichnis. Alle Computer- und Benutzerkonten liegen in OUs nach Standort und Abteilung.',
        },
        {
          type: 'example',
          title: 'OU-Struktur und Gruppen planen',
          problem: 'Die Elektro Krämer GmbH (Standorte Hamburg und Berlin) richtet AD ein. Die Buchhaltung beider Standorte soll Ändern-Rechte auf `\\\\FS01\\Buchhaltung` erhalten; für Hamburger PCs soll eine eigene Bildschirmsperren-GPO gelten.',
          steps: [
            { label: 'OUs', body: '`Elektro Krämer` → `Hamburg`, `Berlin` → darunter jeweils `Benutzer`, `Computer` (oder nach Abteilungen). Die GPO wird mit der OU `Hamburg/Computer` verknüpft.' },
            { label: 'Globale Gruppe', body: '`GG_Buchhaltung` enthält alle Buchhaltungs-Benutzer aus Hamburg und Berlin.' },
            { label: 'Domänenlokale Gruppe', body: '`DL_FS01_Buchhaltung_Ändern` bekommt die NTFS-Berechtigung „Ändern“ auf den Ordner.' },
            { label: 'Verschachteln', body: '`GG_Buchhaltung` wird Mitglied von `DL_FS01_Buchhaltung_Ändern` (AGDLP).' },
          ],
          result: 'OUs ordnen und sind Ziel der GPO; Gruppen vergeben die Rechte. Neue Buchhalter brauchen nur die Mitgliedschaft in `GG_Buchhaltung`.',
        },
        {
          type: 'check',
          question: {
            id: 'b02-c02', kind: 'match', skill: 'rights.ad', difficulty: 2,
            prompt: 'Ordne die AD-Begriffe ihrer Beschreibung zu.',
            left: ['Domänencontroller', 'Organisationseinheit (OU)', 'Sicherheitsgruppe', 'Gesamtstruktur (Forest)'],
            right: ['Server, der Anmeldungen prüft und das Verzeichnis speichert', 'Container zum Ordnen von Objekten, Ziel für GPOs und Delegation', 'bündelt Konten, um Berechtigungen zu vergeben', 'oberste Ebene mit gemeinsamem Schema'],
            answer: [0, 1, 2, 3],
            explanation: 'DC = Anmeldung/Datenbank; OU = Ordnen/GPO; Gruppe = Rechte; Forest = oberste Grenze.',
          },
        },
        { type: 'practice', title: 'Übung: Active Directory', questionIds: ['b02-q005', 'b02-q006', 'b02-q007', 'b02-q008', 'b02-q009'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['AD DS: zentrales Verzeichnis für Benutzer, Gruppen, Computer.', 'DC prüft Anmeldungen (Kerberos); mindestens zwei DCs.', 'OU = ordnen, GPO verknüpfen, delegieren. Gruppe = berechtigen.', 'AGDLP: Accounts → Global → Domänenlokal → Permissions.', 'AD braucht DNS.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b02-l03',
      title: 'Gruppenrichtlinien (GPO)',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['rights.gpo'],
      steps: [
        {
          type: 'explain',
          title: 'Einstellungen zentral für hunderte PCs',
          body: `Ein **Gruppenrichtlinienobjekt (GPO)** ist ein Paket von Einstellungen, das zentral im AD gepflegt und automatisch auf Computer und Benutzer angewendet wird. Typische Beispiele:

- Bildschirmsperre nach 10 Minuten, Desktophintergrund mit Firmenlogo
- Netzlaufwerke verbinden (z. B. \`P:\` → \`\\\\FS01\\Projekte\`), Drucker zuweisen
- USB-Speicher sperren, Windows-Update-Einstellungen, Firewall-Regeln
- Software (MSI-Pakete) verteilen, Skripte bei Anmeldung/Start

**Aufbau eines GPO:**

| Teil | gilt für | wird angewendet |
|---|---|---|
| **Computerkonfiguration** | Computerobjekte in der verknüpften OU | beim **Start** des Rechners (und regelmäßig) |
| **Benutzerkonfiguration** | Benutzerobjekte in der verknüpften OU | bei der **Anmeldung** (und regelmäßig) |

**Verarbeitungsreihenfolge LSDOU:** **L**okal → **S**tandort (Site) → **D**omäne → **OU** (von der übergeordneten zur untergeordneten). Bei Widersprüchen **gewinnt die zuletzt angewendete** Einstellung – also meist die GPO der OU, die am nächsten am Objekt ist.

Sonderfälle: **Erzwungen** (Enforced) – eine übergeordnete GPO kann nicht überschrieben werden; **Vererbung deaktivieren** an einer OU blockiert GPOs von oben (außer erzwungene). Über **Sicherheitsfilterung** kann eine GPO auf bestimmte Gruppen beschränkt werden.

**Aktualisierung:** Clients holen Richtlinien alle **90 Minuten** (plus zufällige Verzögerung bis 30 Minuten) ab. Sofort: \`gpupdate /force\`. Prüfen, was wirkt: \`gpresult /r\` (bzw. \`gpresult /h bericht.html\`).

Verwaltet wird mit der **Gruppenrichtlinienverwaltung** (\`gpmc.msc\`). Einzelplatz-Richtlinien ohne Domäne: lokaler Gruppenrichtlinien-Editor \`gpedit.msc\` (ab Windows Pro). In der Cloud übernimmt **Intune** mit Konfigurationsprofilen eine ähnliche Rolle.`,
        },
        {
          type: 'visual',
          title: 'LSDOU – wer gewinnt?',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: '1. Lokal', text: 'Lokale Richtlinie des PCs – wird zuerst angewendet, hat die geringste Priorität.', icon: 'MonitorCog' },
                { title: '2. Standort', text: 'GPOs, die mit dem AD-Standort (Site) verknüpft sind.', icon: 'Building2' },
                { title: '3. Domäne', text: 'z. B. Default Domain Policy (Kennwortrichtlinie).', icon: 'Network' },
                { title: '4. OU', text: 'Von oben nach unten – die OU direkt am Objekt wird zuletzt angewendet und gewinnt.', icon: 'FolderTree' },
              ],
            },
          },
          caption: 'Je später angewendet, desto höher die Priorität (Ausnahme: erzwungene GPOs).',
        },
        {
          type: 'example',
          title: 'Widersprüchliche Bildschirmsperre',
          problem: 'Domänen-GPO: Bildschirmsperre nach **15 min**. GPO an OU `Hamburg`: **10 min**. GPO an der Unter-OU `Hamburg/Empfang`: **5 min**. Was gilt für einen PC in `Hamburg/Empfang`? Und was, wenn die Domänen-GPO **erzwungen** ist?',
          steps: [
            { label: 'Reihenfolge', body: 'Domäne (15) → OU Hamburg (10) → OU Empfang (5).' },
            { label: 'Normalfall', body: 'Zuletzt angewendet: OU Empfang → **5 min**.' },
            { label: 'Erzwungen', body: 'Eine erzwungene GPO kann von untergeordneten nicht überschrieben werden → **15 min**.' },
          ],
          result: 'Normal gewinnt die OU-GPO nahe am Objekt (5 min); ist die Domänen-GPO erzwungen, gilt 15 min.',
        },
        {
          type: 'check',
          question: {
            id: 'b02-c03', kind: 'text', skill: 'rights.gpo', difficulty: 1,
            prompt: 'Mit welchem Befehl erzwingst du auf einem Client die sofortige Aktualisierung der Gruppenrichtlinien?',
            accept: ['gpupdate /force', 'gpupdate', 'gpupdate.exe /force'],
            explanation: '`gpupdate /force` wendet alle Richtlinien neu an.',
          },
        },
        { type: 'practice', title: 'Übung: Gruppenrichtlinien', questionIds: ['b02-q010', 'b02-q011', 'b02-q012'], count: 3, difficulty: 2 },
        { type: 'summary', points: ['GPO = zentrales Einstellungspaket, verknüpft mit Standort, Domäne oder OU.', 'Computerkonfiguration beim Start, Benutzerkonfiguration bei Anmeldung.', 'LSDOU: zuletzt angewendet gewinnt; Erzwungen schlägt das.', 'gpupdate /force, gpresult /r.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b02-l04',
      title: 'NTFS-Berechtigungen und Vererbung',
      minutes: 25,
      relevance: 'ap1',
      skills: ['rights.ntfs'],
      steps: [
        {
          type: 'explain',
          title: 'Wer darf was mit Dateien und Ordnern?',
          body: `Auf NTFS-Datenträgern hat jede Datei und jeder Ordner eine **Zugriffssteuerungsliste (ACL)**. Jeder Eintrag (ACE) legt fest: *Welche Gruppe/welcher Benutzer* darf *was* – **zulassen** oder **verweigern**.

**Standardberechtigungen (Registerkarte „Sicherheit“):**

| Berechtigung | erlaubt |
|---|---|
| **Lesen** | Dateien öffnen und lesen, Attribute und Rechte ansehen |
| **Ordnerinhalt anzeigen** | (nur Ordner) Inhalt auflisten, Programme ausführen |
| **Lesen, Ausführen** | Lesen + Programme starten |
| **Schreiben** | neue Dateien/Ordner anlegen, Dateien überschreiben – aber **nicht löschen** |
| **Ändern** | Lesen, Ausführen, Schreiben **und Löschen** |
| **Vollzugriff** | alles inkl. **Berechtigungen ändern** und **Besitz übernehmen** |

Für normale Mitarbeiter reicht fast immer **Ändern**. **Vollzugriff** bekommen nur Administratoren – sonst kann ein Benutzer anderen Rechte geben oder entziehen.

**Regeln für die Auswertung:**
1. Rechte aus allen Gruppen eines Benutzers **addieren sich** (kumulativ): Lesen über Gruppe A + Ändern über Gruppe B = Ändern.
2. **Verweigern schlägt Zulassen.** Ein „Verweigern“ für eine Gruppe, in der der Benutzer Mitglied ist, nimmt ihm das Recht – egal, was andere Gruppen erlauben. (Feinheit: Ein *expliziter* Zulassen-Eintrag am Objekt hat Vorrang vor einem *geerbten* Verweigern.) Verweigern sparsam einsetzen – lieber Rechte gar nicht erst vergeben.
3. Ist für einen Benutzer gar nichts eingetragen, hat er **keinen Zugriff** (implizites Verweigern).

**Vererbung:** Rechte eines Ordners gelten automatisch für Unterordner und Dateien (in der Oberfläche grau/„geerbt von …“). Man kann die Vererbung an einem Unterordner **deaktivieren** – Windows fragt dann, ob die geerbten Rechte als explizite Einträge **übernommen (konvertiert)** oder **entfernt** werden sollen.

**Kopieren und Verschieben (klassische Prüfungsregel):**

| Vorgang | Berechtigungen |
|---|---|
| **Kopieren** (egal wohin) | Kopie erbt die Rechte des **Zielordners** |
| **Verschieben innerhalb derselben NTFS-Partition** | Rechte bleiben **erhalten** |
| **Verschieben auf eine andere Partition** | entspricht Kopieren + Löschen → Rechte des **Zielordners** |

**Besitzer:** Wer eine Datei anlegt, ist ihr Besitzer und kann ihre Rechte ändern. Administratoren können den Besitz übernehmen. Kommandozeile: \`icacls D:\\Daten\\Vertrieb\` zeigt die ACL an.`,
        },
        {
          type: 'visual',
          title: 'Vererbung in einer Ordnerstruktur',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'D:\\Daten', text: 'Administratoren: Vollzugriff · Domänen-Benutzer: Ordnerinhalt anzeigen (nur dieser Ordner)', icon: 'FolderTree' },
                { title: 'D:\\Daten\\Vertrieb', text: 'Vererbung von oben + GG_Vertrieb: Ändern · GG_Leitung: Lesen', icon: 'FolderLock' },
                { title: 'D:\\Daten\\Vertrieb\\Provisionen', text: 'Vererbung deaktiviert (konvertiert), GG_Vertrieb entfernt · GG_Leitung: Ändern', icon: 'Lock' },
              ],
            },
          },
          caption: 'Der vertrauliche Unterordner unterbricht die Vererbung, damit der Vertrieb die Provisionsliste nicht sieht.',
        },
        {
          type: 'example',
          title: 'Kumulieren und Verweigern',
          problem: `Tim Becker ist Mitglied von **GG_Vertrieb** und **GG_Azubis**. NTFS-Rechte auf \`D:\\Daten\\Angebote\`:

| Gruppe | Recht |
|---|---|
| GG_Vertrieb | Zulassen: Ändern |
| GG_Azubis | Zulassen: Lesen |
| Domänen-Benutzer | Zulassen: Lesen |

Welches Recht hat Tim? Was ändert sich, wenn zusätzlich „GG_Azubis: **Verweigern** Schreiben“ eingetragen wird?`,
          steps: [
            { label: 'Kumulieren', body: 'Ändern (Vertrieb) + Lesen (Azubis) + Lesen (Domänen-Benutzer) → höchstes Recht: **Ändern**.' },
            { label: 'Mit Verweigern', body: 'Verweigern Schreiben gilt für alle Mitglieder von GG_Azubis, also auch für Tim. Schreiben fällt weg: Tim kann Dateien lesen und ausführen, aber **nicht mehr bearbeiten oder neu anlegen**. Feinheit: „Löschen“ ist ein eigenes Spezialrecht und bleibt aus „Ändern“ erhalten – wer das verhindern will, muss es ebenfalls entziehen.' },
            { label: 'Bewertung', body: 'Ein Verweigern an einer breiten Gruppe trifft oft auch Personen, die es nicht treffen soll – deshalb lieber Gruppen sauber schneiden.' },
          ],
          result: 'Ohne Verweigern: Ändern. Mit „Verweigern Schreiben“ für GG_Azubis: Tim kann lesen, aber nicht mehr schreiben oder anlegen.',
        },
        {
          type: 'check',
          question: {
            id: 'b02-c04', kind: 'single', skill: 'rights.ntfs', difficulty: 2,
            prompt: 'Eine Datei mit speziellen NTFS-Rechten wird auf **derselben Partition** in einen anderen Ordner **verschoben**. Welche Rechte hat sie danach?',
            options: ['Sie behält ihre bisherigen Rechte.', 'Sie erbt die Rechte des Zielordners.', 'Sie verliert alle Rechte.', 'Nur der Besitzer hat noch Zugriff.'],
            answer: 0,
            distractors: { '1': { why: 'Das gilt beim **Kopieren** oder beim Verschieben auf eine **andere** Partition.', error: 'ntfs-kopieren-verschieben' }, '2': { why: 'Die ACL bleibt beim Verschieben auf derselben Partition erhalten.', error: 'ntfs-kopieren-verschieben' }, '3': { why: 'Die bestehenden Einträge bleiben bestehen.', error: 'ntfs-kopieren-verschieben' } },
            explanation: 'Verschieben auf derselben Partition = nur der Verzeichniseintrag ändert sich → Rechte bleiben.',
          },
        },
        { type: 'practice', title: 'Übung: NTFS-Berechtigungen', questionIds: ['b02-q013', 'b02-q014', 'b02-q015', 'b02-q016', 'b02-q017'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['NTFS: Lesen, Lesen/Ausführen, Ordnerinhalt anzeigen, Schreiben, Ändern, Vollzugriff.', 'Ändern = inkl. Löschen; Vollzugriff = inkl. Rechte ändern/Besitz übernehmen.', 'Rechte addieren sich; Verweigern schlägt Zulassen.', 'Vererbung von oben; Deaktivieren: konvertieren oder entfernen.', 'Kopieren → Zielrechte; Verschieben auf gleicher Partition → Rechte bleiben.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b02-l05',
      title: 'Freigabe + NTFS: effektive Rechte bestimmen',
      minutes: 25,
      relevance: 'ap1',
      skills: ['rights.share'],
      steps: [
        {
          type: 'explain',
          title: 'Zwei Türen hintereinander',
          body: `Greift ein Benutzer **über das Netzwerk** auf einen Ordner zu (z. B. \`\\\\FS01\\Vertrieb\`), muss er durch **zwei Türen**:

1. **Freigabeberechtigungen** (Registerkarte „Freigabe“ → „Erweiterte Freigabe“ → „Berechtigungen“): nur **Lesen**, **Ändern**, **Vollzugriff**. Sie gelten **nur beim Zugriff über das Netzwerk**.
2. **NTFS-Berechtigungen** (Registerkarte „Sicherheit“): gelten **immer** – über das Netzwerk und lokal.

**Die Auswertung in drei Schritten:**

| Schritt | Regel |
|---|---|
| 1. NTFS effektiv | alle zutreffenden NTFS-Einträge des Benutzers (inkl. seiner Gruppen) **addieren** → höchstes Recht (Verweigern beachten) |
| 2. Freigabe effektiv | ebenso alle zutreffenden Freigabe-Einträge **addieren** |
| 3. Netzwerkzugriff | von beiden das **restriktivere** (kleinere) Recht |

**Lokal am Server angemeldet** (oder per RDP auf dem Server) spielt die Freigabe **keine Rolle** – dann zählt nur NTFS.

**Merksatz:** *Innerhalb* einer Ebene das **Maximum**, *zwischen* den Ebenen das **Minimum**.

**Best Practice:** Freigabeberechtigung großzügig setzen (z. B. *Authentifizierte Benutzer: Ändern* oder *Vollzugriff*) und die eigentliche Steuerung **nur über NTFS** machen. Dann gibt es nur eine Stelle, an der man nachsehen muss. Achtung: Eine neue Freigabe erhält unter aktuellen Windows-Versionen standardmäßig nur *Jeder: Lesen* – deshalb können Benutzer nach dem Freigeben oft nicht schreiben, obwohl NTFS es erlaubt.

**Weitere Begriffe:** Eine Freigabe mit **\`$\`** am Ende (z. B. \`Vertrieb$\`) ist **versteckt** – sie taucht in der Netzwerkansicht nicht auf, ist aber **kein** Schutz. **Zugriffsbasierte Aufzählung (ABE)** blendet Ordner aus, auf die der Benutzer keine Rechte hat.`,
        },
        {
          type: 'visual',
          title: 'Der Weg eines Netzwerkzugriffs',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['PC Jana Schulz', 'FS01: Freigabe', 'FS01: NTFS', 'Datei'],
              messages: [
                { from: 0, to: 1, label: 'Öffne \\\\FS01\\Vertrieb\\Angebot.docx (Schreiben)' },
                { from: 1, to: 1, label: 'Freigabe: Jeder Lesen, GG_Vertrieb Ändern → Ändern', note: 'Tür 1' },
                { from: 1, to: 2, label: 'weiter zur NTFS-Prüfung' },
                { from: 2, to: 2, label: 'NTFS: GG_Vertrieb Lesen → Lesen', note: 'Tür 2' },
                { from: 2, to: 0, label: 'Minimum(Ändern, Lesen) = Lesen → Schreiben verweigert' },
              ],
            },
          },
          caption: 'Die restriktivere Tür entscheidet. Hier blockiert NTFS das Schreiben, obwohl die Freigabe es erlauben würde.',
        },
        {
          type: 'example',
          title: 'Effektive Rechte vollständig bestimmen',
          problem: `Jana Schulz ist Mitglied von **GG_Vertrieb**, **GG_Projekt-Nord** und Domänen-Benutzer (damit auch *Jeder*).

| Freigabe \\\\FS01\\Projekte | |
|---|---|
| Jeder | Lesen |
| GG_Projekt-Nord | Ändern |

| NTFS D:\\Daten\\Projekte | |
|---|---|
| Administratoren | Vollzugriff |
| GG_Vertrieb | Lesen |
| GG_Projekt-Nord | Vollzugriff |
| GG_Leitung | Ändern |

Bestimme die Rechte über das Netzwerk und bei lokaler Anmeldung am Server.`,
          steps: [
            { label: '1. NTFS', body: 'Zutreffend: GG_Vertrieb (Lesen), GG_Projekt-Nord (Vollzugriff). GG_Leitung und Administratoren betreffen Jana nicht. Maximum → **Vollzugriff**.' },
            { label: '2. Freigabe', body: 'Zutreffend: Jeder (Lesen), GG_Projekt-Nord (Ändern). Maximum → **Ändern**.' },
            { label: '3. Netzwerk', body: 'Minimum(Vollzugriff, Ändern) → **Ändern**.' },
            { label: '4. Lokal', body: 'Nur NTFS → **Vollzugriff**.' },
          ],
          result: 'Über das Netzwerk: **Ändern**. Lokal am Server: **Vollzugriff** (sie dürfte dort sogar Rechte ändern – ein Hinweis, dass Vollzugriff für eine Projektgruppe zu viel ist).',
        },
        {
          type: 'check',
          question: {
            id: 'b02-c05', kind: 'single', skill: 'rights.share', difficulty: 2,
            prompt: 'Freigabe: *Jeder: Vollzugriff*. NTFS: *GG_Lager: Lesen*. Ein Lager-Mitarbeiter greift über das Netzwerk zu. Welches Recht hat er?',
            options: ['Lesen', 'Vollzugriff', 'Ändern', 'Kein Zugriff'],
            answer: 0,
            distractors: { '1': { why: 'Zwischen Freigabe und NTFS gilt das **restriktivere** Recht.', error: 'rechte-maximum-statt-minimum' }, '2': { why: '„Ändern“ kommt in keiner Ebene vor.', error: 'rechte-share' }, '3': { why: 'Er ist über GG_Lager berechtigt und kommt durch beide Türen.', error: 'rechte-share' } },
            explanation: 'Minimum(Vollzugriff, Lesen) = **Lesen**.',
          },
        },
        { type: 'practice', title: 'Übung: Effektive Rechte berechnen', generator: 'sys.effrechte', count: 4, difficulty: 2 },
        { type: 'summary', points: ['Netzwerkzugriff: Freigabe UND NTFS werden geprüft.', 'Innerhalb einer Ebene: Maximum (Verweigern beachten).', 'Zwischen den Ebenen: Minimum (restriktivere gewinnt).', 'Lokal am Server: nur NTFS.', 'Best Practice: Freigabe großzügig, Steuerung über NTFS.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b02-l06',
      title: 'Linux-Rechte: rwx und chmod',
      minutes: 30,
      relevance: 'ap1',
      skills: ['rights.linux'],
      steps: [
        {
          type: 'explain',
          title: 'ls -l lesen',
          body: `Unter Linux hat jede Datei einen **Besitzer** (user), eine **Gruppe** (group) und Rechte für **alle anderen** (others). Für jede dieser drei Klassen gibt es drei Rechte:

| Recht | Datei | Verzeichnis |
|---|---|---|
| **r** (read) | Inhalt lesen | Inhalt auflisten (\`ls\`) |
| **w** (write) | Inhalt ändern | Dateien darin anlegen, umbenennen, **löschen** (zusammen mit x) |
| **x** (execute) | als Programm/Skript ausführen | betreten (\`cd\`) und auf Dateien darin zugreifen |

\`\`\`
$ ls -l
-rwxr-x--- 1 mkraemer buchhaltung 2048 Nov  4 09:12 backup.sh
drwxrwx--- 2 root     vertrieb    4096 Nov  4 08:00 angebote
\`\`\`

| Zeichen | Bedeutung |
|---|---|
| 1. Zeichen | Dateityp: \`-\` Datei, \`d\` Verzeichnis, \`l\` symbolischer Link |
| Zeichen 2–4 | Rechte des **Besitzers** (\`rwx\`) |
| Zeichen 5–7 | Rechte der **Gruppe** (\`r-x\`) |
| Zeichen 8–10 | Rechte der **anderen** (\`---\`) |

**Achtung Prüfungsfalle:** Ob man eine Datei **löschen** darf, hängt vom **w-Recht am Verzeichnis** ab – nicht von den Rechten der Datei selbst!`,
        },
        {
          type: 'explain',
          title: 'Oktalschreibweise und chmod',
          body: `Jedes Recht hat eine **Wertigkeit**: **r = 4, w = 2, x = 1**. Pro Klasse werden die Werte addiert – das ergibt eine Ziffer von 0 bis 7:

| Ziffer | Rechte | Rechnung |
|---|---|---|
| 7 | \`rwx\` | 4 + 2 + 1 |
| 6 | \`rw-\` | 4 + 2 |
| 5 | \`r-x\` | 4 + 1 |
| 4 | \`r--\` | 4 |
| 3 | \`-wx\` | 2 + 1 |
| 2 | \`-w-\` | 2 |
| 1 | \`--x\` | 1 |
| 0 | \`---\` | – |

Drei Ziffern = Besitzer · Gruppe · Andere. **\`chmod 754 datei\`** → 7 = \`rwx\`, 5 = \`r-x\`, 4 = \`r--\` → **\`rwxr-xr--\`**.

**Symbolische Schreibweise von chmod:** \`u\` (user), \`g\` (group), \`o\` (others), \`a\` (all) mit \`+\` (hinzufügen), \`-\` (entfernen), \`=\` (genau setzen):
- \`chmod u+x skript.sh\` – Besitzer darf ausführen
- \`chmod g-w bericht.txt\` – Gruppe verliert Schreibrecht
- \`chmod o=\` datei – andere haben keine Rechte mehr
- \`chmod -R 750 /srv/projekte\` – rekursiv für alles darunter

**Besitzer und Gruppe ändern:** \`chown anna:vertrieb datei\` (nur root), \`chgrp vertrieb datei\`.

**Typische Werte:** 644 (\`rw-r--r--\`, normale Datei), 755 (\`rwxr-xr-x\`, Programme/Verzeichnisse), 600 (\`rw-------\`, private Datei, z. B. SSH-Schlüssel), 700, 750, 640.

**Sonderbits (vierte, vorangestellte Ziffer):** **SUID = 4** (Programm läuft mit den Rechten des Besitzers, z. B. \`passwd\`), **SGID = 2** (an Verzeichnissen: neue Dateien erben die Gruppe – ideal für Teamordner), **Sticky-Bit = 1** (in einem Verzeichnis darf jeder nur seine eigenen Dateien löschen, z. B. \`/tmp\` mit 1777 = \`rwxrwxrwt\`). Sie erscheinen an der x-Stelle als \`s\` bzw. \`t\` (Großbuchstabe, wenn x dort nicht gesetzt ist).

**umask:** legt fest, welche Rechte bei neuen Dateien **weggenommen** werden. Standard 022: neue Dateien 666 − 022 → **644**, neue Verzeichnisse 777 − 022 → **755**. (Genau genommen wird bitweise maskiert, bei üblichen Werten wie 022, 027, 002 entspricht das der Subtraktion.)`,
        },
        {
          type: 'visual',
          title: 'chmod 754 zerlegt',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Besitzer: 7 = rwx', text: '4 (r) + 2 (w) + 1 (x) – lesen, schreiben, ausführen.', icon: 'UserCog' },
                { title: 'Gruppe: 5 = r-x', text: '4 (r) + 1 (x) – lesen und ausführen, nicht schreiben.', icon: 'Users' },
                { title: 'Andere: 4 = r--', text: '4 (r) – nur lesen.', icon: 'Globe' },
              ],
            },
          },
          caption: 'Reihenfolge immer: Besitzer – Gruppe – Andere. Wertigkeit: r = 4, w = 2, x = 1.',
        },
        {
          type: 'example',
          title: 'Teamordner für die Buchhaltung',
          problem: 'Auf dem Linux-Dateiserver soll `/srv/buchhaltung` so eingerichtet werden: Besitzer root darf alles, die Gruppe `buchhaltung` darf lesen, anlegen und löschen, alle anderen gar nichts. Neue Dateien sollen automatisch der Gruppe `buchhaltung` gehören. Welche Befehle?',
          steps: [
            { label: 'Besitz', body: '`chown root:buchhaltung /srv/buchhaltung`' },
            { label: 'Rechte', body: 'Besitzer rwx = 7, Gruppe rwx = 7 (zum Anlegen/Löschen braucht die Gruppe w **und** x am Verzeichnis), Andere --- = 0 → **770**.' },
            { label: 'SGID', body: 'Damit neue Dateien die Gruppe erben: SGID = 2 voranstellen → `chmod 2770 /srv/buchhaltung`.' },
            { label: 'Kontrolle', body: '`ls -ld /srv/buchhaltung` → `drwxrws--- 2 root buchhaltung … /srv/buchhaltung`' },
          ],
          result: '`chown root:buchhaltung /srv/buchhaltung` und `chmod 2770 /srv/buchhaltung` → `drwxrws---`.',
        },
        {
          type: 'check',
          question: {
            id: 'b02-c06', kind: 'text', skill: 'rights.linux', difficulty: 1,
            prompt: 'Welche symbolischen Rechte ergibt `chmod 640 datei`? (9 Zeichen)',
            accept: ['rw-r-----', '-rw-r-----'],
            misconceptions: [{ answer: '---r--rw-', error: 'chmod-reihenfolge', why: 'Reihenfolge ist Besitzer – Gruppe – Andere.' }],
            explanation: '6 = rw-, 4 = r--, 0 = --- → **rw-r-----**.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'b02-c07', kind: 'text', skill: 'rights.linux', difficulty: 2,
            prompt: '`ls -l` zeigt `-rwxr-x--x`. Gib die Rechte oktal an (dreistellig).',
            accept: ['751', '0751'],
            explanation: 'rwx = 7, r-x = 5, --x = 1 → **751**.',
          },
        },
        { type: 'practice', title: 'Übung: chmod oktal ↔ symbolisch', generator: 'sys.chmod', count: 6, difficulty: 2 },
        { type: 'summary', points: ['Klassen: Besitzer (u), Gruppe (g), Andere (o).', 'r = 4, w = 2, x = 1 – pro Klasse addieren.', 'chmod 754 = rwxr-xr--; chmod u+x / g-w / o= symbolisch.', 'Verzeichnis: x = betreten, w = anlegen/löschen.', 'Sonderbits: SUID 4, SGID 2, Sticky 1; umask 022 → 644/755.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b02-l07',
      title: 'root, sudo und administrative Rechte',
      minutes: 15,
      relevance: 'ap1-teilweise',
      skills: ['rights.root'],
      steps: [
        {
          type: 'explain',
          title: 'Der Superuser und wie man ihn sicher nutzt',
          body: `Unter Linux ist **root** (Benutzer-ID **UID 0**) der Superuser – für ihn gelten keine Rechtebeschränkungen. Wer dauerhaft als root arbeitet, kann mit einem Tippfehler (\`rm -rf / tmp\` statt \`rm -rf /tmp\`) das System zerstören, und jede Schadsoftware hätte sofort volle Rechte.

**Deshalb: als normaler Benutzer arbeiten und nur einzelne Befehle mit erhöhten Rechten ausführen:**

| Befehl | Wirkung |
|---|---|
| \`sudo befehl\` | führt **einen** Befehl als root aus; fragt nach dem **eigenen** Passwort; wird protokolliert |
| \`sudo -i\` | interaktive root-Shell (sparsam verwenden) |
| \`su -\` | wechselt zu root, braucht das **root-Passwort** |
| \`id\` | zeigt eigene UID, GID und Gruppen |

**Wer darf sudo?** Festgelegt in \`/etc/sudoers\` (nur mit \`visudo\` bearbeiten – prüft die Syntax). Üblich: Mitglieder der Gruppe **sudo** (Debian/Ubuntu) bzw. **wheel** (RHEL/Fedora). Man kann auch nur bestimmte Befehle erlauben, z. B. dass die Gruppe \`helpdesk\` nur \`systemctl restart cups\` ausführen darf – **Least Privilege**.

**Wichtige Dateien:** \`/etc/passwd\` (Benutzerkonten), \`/etc/shadow\` (Passwort-Hashes, nur für root lesbar), \`/etc/group\` (Gruppen). Benutzer anlegen: \`sudo useradd -m -G vertrieb jschulz\` oder komfortabler \`adduser\` (Debian/Ubuntu); Passwort setzen: \`sudo passwd jschulz\`; Gruppe hinzufügen: \`sudo usermod -aG vertrieb jschulz\`.

**Windows-Pendant:** „Als Administrator ausführen“ bzw. die UAC-Abfrage; separates Admin-Konto. In beiden Welten gilt: **administrative Rechte nur, wenn nötig, und nachvollziehbar.**`,
        },
        {
          type: 'visual',
          title: 'Drei Wege zu root-Rechten',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Als root anmelden', text: 'Dauerhaft volle Rechte, kein Nachweis, wer was getan hat. Vermeiden – SSH-Login für root sperren.', icon: 'TriangleAlert' },
                { title: 'su -', text: 'Wechsel zu root mit dem root-Passwort. Das Passwort müssen alle Admins kennen.', icon: 'KeyRound' },
                { title: 'sudo befehl', text: 'Ein Befehl mit root-Rechten, eigenes Passwort, protokolliert, gezielt per sudoers erlaubt. Empfohlen.', icon: 'ShieldCheck' },
              ],
            },
          },
          caption: 'sudo setzt Least Privilege und Nachvollziehbarkeit am besten um.',
        },
        {
          type: 'example',
          title: 'Paket installieren ohne root-Login',
          problem: 'Der Azubi `lnowak` soll auf einem Ubuntu-Server das Paket `htop` installieren. Er hat kein root-Passwort. Was ist nötig?',
          steps: [
            { label: 'Berechtigung', body: 'Ein Admin nimmt ihn in die Gruppe sudo auf: `sudo usermod -aG sudo lnowak` (danach neu anmelden) – oder erlaubt in `/etc/sudoers` gezielt nur `apt`.' },
            { label: 'Ausführen', body: '`sudo apt install htop` – Passwortabfrage mit **seinem eigenen** Passwort.' },
            { label: 'Nachvollziehbarkeit', body: 'Der Aufruf landet im Log (z. B. `/var/log/auth.log`) – man sieht, wer was mit root-Rechten getan hat.' },
          ],
          result: 'sudo statt root-Passwort: gezielt, protokolliert und widerrufbar.',
        },
        {
          type: 'check',
          question: {
            id: 'b02-c08', kind: 'number', skill: 'rights.root', difficulty: 1,
            prompt: 'Welche Benutzer-ID (UID) hat der Benutzer **root**?',
            answer: 0,
            explanation: 'root hat immer die **UID 0**.',
          },
        },
        { type: 'practice', title: 'Übung: root und sudo', questionIds: ['b02-q026', 'b02-q027', 'b02-q028'], count: 3, difficulty: 2 },
        { type: 'summary', points: ['root = UID 0, unbeschränkte Rechte.', 'sudo: einzelner Befehl mit root-Rechten, eigenes Passwort, protokolliert.', 'Berechtigung über Gruppe sudo/wheel bzw. /etc/sudoers (visudo).', 'Least Privilege gilt unter Linux und Windows.'] },
      ],
    },
  ],
  questions: [
    { id: 'b02-q001', kind: 'free', skill: 'rights.accounts', difficulty: 1, prompt: 'Erkläre den Unterschied zwischen **Authentifizierung** und **Autorisierung** an einem Beispiel.', modelAnswer: 'Authentifizierung ist der Nachweis der Identität – z. B. meldet sich Jana mit Benutzername, Passwort und Authenticator-App an. Autorisierung legt fest, was die authentifizierte Person darf – z. B. darf Jana den Ordner Vertrieb ändern, den Ordner Buchhaltung aber nicht öffnen.', keywords: ['Identität', 'Nachweis', 'Berechtigung', 'darf'], explanation: 'Authentifizierung = wer bin ich; Autorisierung = was darf ich.' },
    { id: 'b02-q002', kind: 'free', skill: 'rights.accounts', difficulty: 2, prompt: 'Erläutere das **Prinzip der minimalen Rechte** und nenne zwei Maßnahmen zur Umsetzung in der Elektro Krämer GmbH.', modelAnswer: 'Jede Person und jeder Dienst erhält nur die Rechte, die für die jeweilige Aufgabe zwingend nötig sind. So begrenzt man Schäden durch Fehlbedienung, Innentäter oder Schadsoftware, die mit den Rechten des Benutzers läuft. Maßnahmen: Mitarbeiter arbeiten mit Standardkonten; Administratoren haben getrennte Admin-Konten; Rechte werden über Rollen-/Abteilungsgruppen vergeben; bei Abteilungswechsel werden alte Rechte entzogen; regelmäßige Rechte-Reviews; Konten ausgeschiedener Mitarbeiter sofort deaktivieren.', keywords: ['nur nötige Rechte', 'Standardkonto', 'Admin-Konto', 'Gruppen', 'Review'], explanation: 'Definition + zwei konkrete Maßnahmen.' },
    { id: 'b02-q003', kind: 'match', skill: 'rights.accounts', difficulty: 1, prompt: 'Ordne die Kontenart dem Speicherort zu.', left: ['Lokales Konto', 'Domänenkonto', 'Microsoft-Konto', 'Entra-ID-Konto'], right: ['SAM-Datenbank des einzelnen PCs', 'Active Directory auf dem Domänencontroller', 'Microsoft-Cloud (privat: Store, OneDrive)', 'Cloud-Verzeichnis für Firmen (Microsoft 365)'], answer: [0, 1, 2, 3], explanation: 'Lokal → SAM; Domäne → AD; Microsoft-Konto/Entra ID → Cloud.' },
    { id: 'b02-q004', kind: 'single', skill: 'rights.accounts', difficulty: 2, prompt: 'Ein Mitarbeiter wechselt vom Einkauf in den Vertrieb. Was ist die **korrekte** Vorgehensweise?', options: ['Mitgliedschaft in GG_Vertrieb hinzufügen und GG_Einkauf entfernen.', 'Mitgliedschaft in GG_Vertrieb hinzufügen, GG_Einkauf behalten, falls er noch etwas braucht.', 'Ihm Vollzugriff auf alle Abteilungsordner geben.', 'Ein zweites Benutzerkonto anlegen.'], answer: 0, distractors: { '1': { why: 'So sammeln sich Rechte an („Rechte-Akkumulation“) – Verstoß gegen Least Privilege.', error: 'least-privilege' }, '2': { why: 'Vollzugriff für alle widerspricht jeder Rechtevergabe nach Bedarf.', error: 'least-privilege' }, '3': { why: 'Ein Konto pro Person; Rechte über Gruppen anpassen.', error: 'least-privilege' } }, explanation: 'Neue Rolle hinzu, alte Rolle entfernen – sonst Rechte-Akkumulation.' },
    { id: 'b02-q005', kind: 'free', skill: 'rights.ad', difficulty: 2, prompt: 'Erläutere den Unterschied zwischen einer **Organisationseinheit (OU)** und einer **Sicherheitsgruppe** im Active Directory.', modelAnswer: 'Eine OU ist ein Container zur Strukturierung: Jedes Objekt (Benutzer, Computer) liegt in genau einer OU. An OUs werden Gruppenrichtlinien verknüpft und Verwaltungsrechte delegiert. Eine Sicherheitsgruppe bündelt Konten, um ihnen gemeinsam Berechtigungen (z. B. auf Ordner oder Drucker) zu geben; ein Benutzer kann Mitglied in vielen Gruppen sein. Kurz: OU ordnet und steuert Richtlinien, Gruppe berechtigt.', keywords: ['Container', 'genau einer', 'GPO', 'Delegation', 'Berechtigungen', 'viele Gruppen'], explanation: 'OU = Struktur/GPO; Gruppe = Rechte.' },
    { id: 'b02-q006', kind: 'text', skill: 'rights.ad', difficulty: 2, prompt: 'Wofür steht die Gruppenstrategie **AGDLP**? Schreibe die Kette aus (z. B. „Accounts – …“).', accept: ['Accounts – Global – Domain Local – Permissions', 'accounts global domain local permissions', 'accounts - global - domain local - permissions', 'accounts, global, domain local, permissions', 'konten global domänenlokal berechtigungen', 'accounts global domainlocal permissions'], explanation: '**A**ccounts → **G**lobale Gruppen → **D**omänen**l**okale Gruppen → **P**ermissions.' },
    { id: 'b02-q007', kind: 'single', skill: 'rights.ad', difficulty: 2, prompt: 'Nach der Installation des ersten Domänencontrollers können sich Clients nicht an der Domäne anmelden, obwohl sie den DC per IP anpingen können. Was ist die wahrscheinlichste Ursache?', options: ['Die Clients nutzen einen externen DNS-Server statt des DC und finden die Domäne daher nicht.', 'Der DC hat zu wenig Arbeitsspeicher.', 'Die Clients haben Windows 11 Pro.', 'Kerberos funktioniert nur mit IPv6.'], answer: 0, distractors: { '1': { why: 'Speichermangel würde sich anders äußern; der DC antwortet ja.', error: 'ad-dns' }, '2': { why: 'Pro kann der Domäne beitreten.', error: 'ad-dns' }, '3': { why: 'Kerberos funktioniert mit IPv4 und IPv6.', error: 'ad-dns' } }, explanation: 'AD-Clients finden DCs über DNS-SRV-Einträge. Als DNS-Server muss der DC (bzw. ein AD-integrierter DNS) eingetragen sein.' },
    { id: 'b02-q008', kind: 'match', skill: 'rights.ad', difficulty: 2, prompt: 'Ordne den Protokollen/Diensten ihre Rolle im AD und ihren Standardport zu.', left: ['Kerberos', 'LDAP', 'DNS', 'LDAPS'], right: ['Anmeldung/Tickets, Port 88', 'Verzeichniszugriff, Port 389', 'Namensauflösung und Auffinden der DCs, Port 53', 'verschlüsselter Verzeichniszugriff, Port 636'], answer: [0, 1, 2, 3], explanation: 'Kerberos 88, LDAP 389, DNS 53, LDAPS 636.' },
    { id: 'b02-q009', kind: 'free', skill: 'rights.ad', difficulty: 2, prompt: 'Warum sollte ein Unternehmen mindestens **zwei Domänencontroller** betreiben?', modelAnswer: 'Fällt ein einzelner DC aus, kann sich niemand mehr an der Domäne anmelden, Gruppenrichtlinien und (falls auf dem DC) DNS funktionieren nicht – der Betrieb steht. Mit zwei DCs, die das Verzeichnis replizieren, übernimmt der zweite die Anmeldungen (Ausfallsicherheit/Verfügbarkeit); außerdem gibt es eine aktuelle Kopie der Datenbank. Eine Datensicherung ersetzt das nicht.', keywords: ['Ausfall', 'Anmeldung', 'Replikation', 'Verfügbarkeit'], explanation: 'Verfügbarkeit durch Redundanz.' },
    { id: 'b02-q010', kind: 'order', skill: 'rights.gpo', difficulty: 2, prompt: 'In welcher Reihenfolge werden Gruppenrichtlinien angewendet (zuerst angewendet zuerst)?', items: ['Lokale Richtlinie', 'Standort (Site)', 'Domäne', 'übergeordnete OU', 'untergeordnete OU (direkt am Objekt)'], explanation: 'LSDOU – die zuletzt angewendete Richtlinie gewinnt bei Widersprüchen.' },
    { id: 'b02-q011', kind: 'single', skill: 'rights.gpo', difficulty: 2, prompt: 'Eine GPO mit Laufwerkzuordnung (Benutzerkonfiguration) wurde an die OU **Computer-Hamburg** verknüpft. Die Benutzerkonten liegen in der OU **Benutzer-Hamburg**. Warum erhält niemand das Laufwerk?', options: ['Benutzereinstellungen wirken nur auf Benutzerobjekte in der verknüpften OU – die Benutzer liegen in einer anderen OU.', 'Laufwerkzuordnungen funktionieren nur in der Computerkonfiguration.', 'GPOs wirken nur nach einem Neustart des Domänencontrollers.', 'Die Benutzer müssen lokale Administratoren sein.'], answer: 0, distractors: { '1': { why: 'Laufwerkzuordnungen sind Benutzereinstellungen.', error: 'gpo-ziel' }, '2': { why: 'Clients aktualisieren GPOs regelmäßig bzw. mit gpupdate.', error: 'gpo-ziel' }, '3': { why: 'Für Laufwerkzuordnungen braucht man keine Adminrechte.', error: 'gpo-ziel' } }, explanation: 'Die GPO muss mit der OU verknüpft sein, in der die **Benutzer**objekte liegen (oder Loopback-Verarbeitung).' },
    { id: 'b02-q012', kind: 'text', skill: 'rights.gpo', difficulty: 1, prompt: 'Mit welchem Befehl zeigst du auf einem Client an, welche Gruppenrichtlinien tatsächlich angewendet wurden? (Kurzform)', accept: ['gpresult /r', 'gpresult', 'gpresult /h', 'gpresult /z'], explanation: '`gpresult /r` (ausführlicher HTML-Bericht: `gpresult /h datei.html`).' },
    { id: 'b02-q013', kind: 'table', skill: 'rights.ntfs', difficulty: 2, prompt: 'Trage zu jeder Tätigkeit die **kleinste** NTFS-Standardberechtigung ein, die dafür nötig ist (Lesen, Schreiben, Ändern, Vollzugriff).', columns: [{ key: 'p', label: 'Berechtigung', type: 'text' }], rows: [{ label: 'Eine PDF-Datei öffnen', cells: { p: { answer: 'Lesen', accept: ['lesen'] } } }, { label: 'Eine Datei bearbeiten und löschen', cells: { p: { answer: 'Ändern', accept: ['aendern', 'andern'] } } }, { label: 'Einem Kollegen Rechte auf den Ordner geben', cells: { p: { answer: 'Vollzugriff', accept: ['voll'] } } }, { label: 'Neue Dateien anlegen, aber nichts löschen', cells: { p: { answer: 'Schreiben', accept: ['schreiben'] } } }], explanation: 'Lesen < Schreiben (anlegen, ohne Löschen) < Ändern (inkl. Löschen) < Vollzugriff (inkl. Rechte ändern, Besitz übernehmen).' },
    { id: 'b02-q014', kind: 'single', skill: 'rights.ntfs', difficulty: 2, prompt: 'Benutzer Marek ist Mitglied von **GG_Lager** (Zulassen: Ändern) und **GG_Praktikanten** (Verweigern: Vollzugriff) auf denselben Ordner. Welches Recht hat er?', options: ['Kein Zugriff', 'Ändern', 'Lesen', 'Vollzugriff'], answer: 0, distractors: { '1': { why: 'Verweigern schlägt Zulassen.', error: 'rechte-verweigern' }, '2': { why: '„Verweigern Vollzugriff“ nimmt ihm alle Rechte, auch Lesen.', error: 'rechte-verweigern' }, '3': { why: 'Vollzugriff wurde ihm gerade verweigert.', error: 'rechte-verweigern' } }, explanation: 'Explizites Verweigern hat Vorrang → **kein Zugriff**.' },
    { id: 'b02-q015', kind: 'table', skill: 'rights.ntfs', difficulty: 3, prompt: 'Eine Datei mit expliziten Rechten liegt in `D:\\Projekte\\A`. Welche Rechte hat sie nach dem Vorgang? Antworte mit **bleiben** oder **Ziel** (erbt die Rechte des Zielordners).', columns: [{ key: 'r', label: 'Rechte', type: 'text' }], rows: [{ label: 'Kopieren nach D:\\Projekte\\B', cells: { r: { answer: 'Ziel', accept: ['zielordner', 'erbt', 'ziel'] } } }, { label: 'Verschieben nach D:\\Projekte\\B', cells: { r: { answer: 'bleiben', accept: ['bleiben erhalten', 'erhalten', 'behält'] } } }, { label: 'Verschieben nach E:\\Archiv', cells: { r: { answer: 'Ziel', accept: ['zielordner', 'erbt', 'ziel'] } } }, { label: 'Kopieren nach E:\\Archiv', cells: { r: { answer: 'Ziel', accept: ['zielordner', 'erbt', 'ziel'] } } }], explanation: 'Nur **Verschieben innerhalb derselben Partition** behält die Rechte; alles andere erzeugt eine neue Datei, die die Rechte des Zielordners erbt.' },
    { id: 'b02-q016', kind: 'free', skill: 'rights.ntfs', difficulty: 2, prompt: 'Im Ordner `Vertrieb` soll der Unterordner `Provisionen` nur für die Geschäftsleitung sichtbar sein. Beschreibe die Vorgehensweise mit NTFS-Rechten.', modelAnswer: 'Am Unterordner Provisionen die Vererbung deaktivieren und dabei die geerbten Rechte in explizite Rechte konvertieren. Anschließend den Eintrag GG_Vertrieb (und weitere nicht berechtigte Gruppen) entfernen und GG_Leitung das Recht Ändern geben; Administratoren behalten Vollzugriff. Danach mit einem Testkonto prüfen (effektiver Zugriff) und die Änderung dokumentieren. Optional zugriffsbasierte Aufzählung aktivieren, damit der Ordner für andere gar nicht sichtbar ist.', keywords: ['Vererbung deaktivieren', 'konvertieren', 'entfernen', 'GG_Leitung', 'testen'], explanation: 'Vererbung unterbrechen statt Verweigern-Einträge setzen.' },
    { id: 'b02-q017', kind: 'single', skill: 'rights.ntfs', difficulty: 2, prompt: 'Warum sollten normale Mitarbeiter auf Abteilungsordnern **Ändern** statt **Vollzugriff** erhalten?', options: ['Mit Vollzugriff könnten sie Berechtigungen ändern und den Besitz übernehmen.', 'Mit Vollzugriff können sie keine Dateien löschen.', 'Ändern ist schneller.', 'Vollzugriff gibt es nur für Administratoren technisch.'], answer: 0, distractors: { '1': { why: 'Löschen ist schon in Ändern enthalten.', error: 'ntfs-rechte' }, '2': { why: 'Geschwindigkeit hat mit Rechten nichts zu tun.', error: 'ntfs-rechte' }, '3': { why: 'Technisch kann jeder Vollzugriff bekommen – gerade deshalb muss man es vermeiden.', error: 'ntfs-rechte' } }, explanation: 'Vollzugriff = Ändern + Rechte ändern + Besitz übernehmen.' },
    { id: 'b02-q018', kind: 'table', skill: 'rights.share', difficulty: 2, prompt: `Ole Hansen ist Mitglied von **GG_Einkauf** und Domänen-Benutzer (damit *Jeder*).

| Freigabe \\\\FS01\\Einkauf | |
|---|---|
| Jeder | Lesen |

| NTFS D:\\Daten\\Einkauf | |
|---|---|
| GG_Einkauf | Ändern |
| Administratoren | Vollzugriff |

Bestimme die Rechte (Kein Zugriff, Lesen, Ändern, Vollzugriff).`, columns: [{ key: 'r', label: 'Recht', type: 'text' }], rows: [{ label: 'NTFS effektiv', cells: { r: { answer: 'Ändern', accept: ['aendern', 'andern'] } } }, { label: 'Freigabe effektiv', cells: { r: { answer: 'Lesen', accept: ['lesen'] } } }, { label: 'über das Netzwerk', cells: { r: { answer: 'Lesen', accept: ['lesen'] } } }, { label: 'lokal am Server', cells: { r: { answer: 'Ändern', accept: ['aendern', 'andern'] } } }], misconceptions: [{ cell: '2:r', answer: 'Ändern', error: 'rechte-maximum-statt-minimum', why: 'Über das Netzwerk gilt das restriktivere Recht – hier die Freigabe mit Lesen.' }], explanation: 'NTFS: Ändern. Freigabe: Lesen (Standard bei neuen Freigaben „Jeder: Lesen“!). Netzwerk: Minimum → **Lesen**. Lokal: nur NTFS → **Ändern**. Lösung: Freigabe auf „Authentifizierte Benutzer: Ändern“ erweitern.' },
    { id: 'b02-q019', kind: 'free', skill: 'rights.share', difficulty: 2, prompt: 'Nach dem Einrichten einer neuen Freigabe beschweren sich die Mitarbeitenden, dass sie Dateien nur öffnen, aber nicht speichern können – obwohl die NTFS-Rechte „Ändern“ erlauben. Erkläre die Ursache und die Lösung.', modelAnswer: 'Beim Netzwerkzugriff gelten Freigabe- und NTFS-Rechte gemeinsam; wirksam ist das restriktivere. Eine neue Freigabe erhält standardmäßig nur „Jeder: Lesen“. Damit ist die Freigabe die engere Tür und erlaubt nur Lesen. Lösung: Die Freigabeberechtigung z. B. auf „Authentifizierte Benutzer: Ändern“ (oder Vollzugriff) setzen und die feine Steuerung über NTFS belassen.', keywords: ['restriktiver', 'Minimum', 'Jeder: Lesen', 'Freigabeberechtigung', 'Ändern'], explanation: 'Klassischer Fehler: Freigabe-Standard ist nur Lesen.' },
    { id: 'b02-q020', kind: 'single', skill: 'rights.share', difficulty: 1, prompt: 'Welche Rechte zählen, wenn sich ein Administrator **lokal am Dateiserver** anmeldet und einen Ordner öffnet?', options: ['Nur die NTFS-Berechtigungen', 'Nur die Freigabeberechtigungen', 'Das Minimum aus Freigabe und NTFS', 'Das Maximum aus Freigabe und NTFS'], answer: 0, distractors: { '1': { why: 'Freigaberechte wirken nur beim Zugriff über das Netzwerk.', error: 'rechte-lokal-freigabe' }, '2': { why: 'Das gilt nur über das Netzwerk.', error: 'rechte-lokal-freigabe' }, '3': { why: 'Ein Maximum zwischen den Ebenen gibt es nie.', error: 'rechte-maximum-statt-minimum' } }, explanation: 'Lokal gibt es keine „Freigabe-Tür“ – nur NTFS.' },
    { id: 'b02-q021', kind: 'single', skill: 'rights.share', difficulty: 2, prompt: 'Eine Freigabe heißt `Lohn$`. Was bewirkt das `$`?', options: ['Die Freigabe wird in der Netzwerkumgebung nicht angezeigt, ist aber mit Pfad weiterhin erreichbar.', 'Die Freigabe ist verschlüsselt.', 'Nur Administratoren können zugreifen.', 'Die Freigabe ist schreibgeschützt.'], answer: 0, distractors: { '1': { why: 'Das $ verschlüsselt nichts (dafür: SMB-Verschlüsselung, EFS, BitLocker).', error: 'versteckte-freigabe' }, '2': { why: 'Wer den Namen kennt und Rechte hat, kommt hinein – $ ist kein Schutz.', error: 'versteckte-freigabe' }, '3': { why: 'Schreibschutz regeln die Berechtigungen.', error: 'versteckte-freigabe' } }, explanation: 'Versteckte Freigabe – „Security by Obscurity“, kein Ersatz für Berechtigungen.' },
    { id: 'b02-q022', kind: 'text', skill: 'rights.linux', difficulty: 1, prompt: 'Gib `chmod 755` in symbolischer Schreibweise an (9 Zeichen).', accept: ['rwxr-xr-x', '-rwxr-xr-x'], explanation: '7 = rwx, 5 = r-x, 5 = r-x.' },
    { id: 'b02-q023', kind: 'text', skill: 'rights.linux', difficulty: 2, prompt: 'Eine SSH-Schlüsseldatei darf nur vom Besitzer gelesen und geschrieben werden, sonst von niemandem. Welcher oktale chmod-Wert?', accept: ['600', '0600'], misconceptions: [{ answer: '700', error: 'chmod-wertigkeit', why: '7 enthält auch x (ausführen) – für eine Schlüsseldatei unnötig: rw = 4 + 2 = 6.' }], explanation: 'rw------- = **600**.' },
    { id: 'b02-q024', kind: 'single', skill: 'rights.linux', difficulty: 3, prompt: 'Datei `bericht.txt` hat `-rw-rw-rw-`, das Verzeichnis darüber `drwxr-xr-x root root`. Darf der Benutzer **anna** (nicht root, nicht in Gruppe root) die Datei **löschen**?', options: ['Nein – zum Löschen braucht man Schreibrecht am Verzeichnis, und das hat nur root.', 'Ja – die Datei ist für alle beschreibbar.', 'Ja – weil das Verzeichnis für alle lesbar ist.', 'Nein – weil die Datei kein x-Recht hat.'], answer: 0, distractors: { '1': { why: 'Schreibrecht an der Datei erlaubt nur, ihren **Inhalt** zu ändern.', error: 'linux-loeschen-verzeichnis' }, '2': { why: 'r am Verzeichnis erlaubt nur das Auflisten.', error: 'linux-loeschen-verzeichnis' }, '3': { why: 'x an der Datei betrifft das Ausführen, nicht das Löschen.', error: 'linux-loeschen-verzeichnis' } }, explanation: 'Löschen = Verzeichniseintrag ändern → w (und x) am **Verzeichnis** nötig. Anna darf den Inhalt der Datei leeren, sie aber nicht löschen.' },
    { id: 'b02-q025', kind: 'table', skill: 'rights.linux', difficulty: 2, prompt: 'Vervollständige die Tabelle.', columns: [{ key: 'o', label: 'oktal', type: 'text' }, { key: 's', label: 'symbolisch', type: 'text' }], rows: [{ cells: { o: { given: '644' }, s: { answer: 'rw-r--r--' } } }, { cells: { o: { answer: '750', accept: ['0750'] }, s: { given: 'rwxr-x---' } } }, { cells: { o: { given: '711' }, s: { answer: 'rwx--x--x' } } }, { cells: { o: { answer: '664', accept: ['0664'] }, s: { given: 'rw-rw-r--' } } }], explanation: '644 = rw-r--r--; rwxr-x--- = 750; 711 = rwx--x--x; rw-rw-r-- = 664.' },
    { id: 'b02-q026', kind: 'free', skill: 'rights.root', difficulty: 2, prompt: 'Begründe, warum Administratoren unter Linux mit **sudo** statt dauerhaft als **root** arbeiten sollten (zwei Gründe).', modelAnswer: '1. Weniger Risiko: Nur der einzelne Befehl läuft mit vollen Rechten; Tippfehler oder gestartete Schadsoftware im normalen Arbeiten haben keine root-Rechte. 2. Nachvollziehbarkeit: sudo protokolliert, welcher Benutzer welchen Befehl ausgeführt hat, während bei einem gemeinsam genutzten root-Konto nicht erkennbar ist, wer es war. 3. Das root-Passwort muss nicht an mehrere Personen weitergegeben werden; Rechte lassen sich gezielt per sudoers vergeben und entziehen.', keywords: ['Risiko', 'protokolliert', 'nachvollziehbar', 'root-Passwort', 'gezielt'], explanation: 'Least Privilege + Protokollierung.' },
    { id: 'b02-q027', kind: 'match', skill: 'rights.root', difficulty: 2, prompt: 'Ordne die Datei bzw. den Befehl seiner Funktion zu.', left: ['/etc/shadow', '/etc/sudoers', 'visudo', 'usermod -aG sudo anna'], right: ['enthält die Passwort-Hashes', 'legt fest, wer was mit sudo darf', 'bearbeitet die sudo-Konfiguration mit Syntaxprüfung', 'nimmt anna in die Gruppe sudo auf'], answer: [0, 1, 2, 3], explanation: 'shadow = Hashes; sudoers = Regeln; visudo = sicheres Bearbeiten; usermod -aG = Gruppe hinzufügen (a = anhängen).' },
    { id: 'b02-q028', kind: 'single', skill: 'rights.root', difficulty: 2, prompt: 'Welches Passwort fragt `sudo` standardmäßig ab?', options: ['Das Passwort des aufrufenden Benutzers', 'Das root-Passwort', 'Das Passwort des Dateibesitzers', 'Gar keins'], answer: 0, distractors: { '1': { why: 'Das root-Passwort fragt `su` ab.', error: 'sudo-su' }, '2': { why: 'Der Dateibesitzer spielt dabei keine Rolle.', error: 'sudo-su' }, '3': { why: 'Standardmäßig wird ein Passwort verlangt (Ausnahme: NOPASSWD in sudoers).', error: 'sudo-su' } }, explanation: 'sudo = eigenes Passwort, su = root-Passwort.' },
    { id: 'b02-q029', kind: 'text', skill: 'rights.linux', difficulty: 2, prompt: 'Mit welchem chmod-Befehl in **symbolischer** Form gibst du nur dem Besitzer zusätzlich das Ausführrecht für `backup.sh`?', accept: ['chmod u+x backup.sh', 'chmod u+x ./backup.sh'], misconceptions: [{ answer: 'chmod +x backup.sh', error: 'chmod-symbolisch', why: '`+x` ohne Klasse gilt für alle (abhängig von der umask) – gefragt war nur der Besitzer (u).' }], explanation: '`chmod u+x backup.sh` (u = user/Besitzer).' },
    { id: 'b02-q030', kind: 'number', skill: 'rights.linux', difficulty: 3, prompt: 'Die umask ist **027**. Welche oktalen Rechte erhält ein **neu angelegtes Verzeichnis** (Ausgangswert 777)? Gib die drei Ziffern als Zahl an.', answer: 750, hints: ['Die umask nimmt Rechte weg: 7 − 0, 7 − 2, 7 − 7.'], misconceptions: [{ answer: '640', error: 'umask-datei-verzeichnis', why: '640 wäre eine neue **Datei** (Ausgangswert 666). Verzeichnisse starten bei 777.' }], explanation: '777 − 027 = **750** → rwxr-x---. (Neue Dateien: 666 − 027 → 640.)' },
    { id: 'b02-q031', kind: 'text', skill: 'rights.linux', difficulty: 3, prompt: 'Welche oktale Darstellung (vierstellig) hat das Verzeichnis `/tmp` mit `drwxrwxrwt`?', accept: ['1777', '01777'], misconceptions: [{ answer: '777', error: 'chmod-sonderbit', why: 'Das `t` zeigt das **Sticky-Bit** (1) – es wird als vorangestellte Ziffer notiert.' }], explanation: 'rwxrwxrwx = 777, plus Sticky-Bit 1 → **1777**.' },
    { id: 'b02-q032', kind: 'free', skill: 'rights.gpo', difficulty: 2, prompt: 'Nenne drei typische Einstellungen, die ein Administrator per Gruppenrichtlinie für die Arbeitsplätze der Elektro Krämer GmbH festlegen kann.', modelAnswer: 'Automatische Bildschirmsperre nach Inaktivität, Netzlaufwerke und Drucker zuordnen, USB-Massenspeicher sperren, Windows-Update-Einstellungen (Zeitpunkt, Neustart), Firewall-Regeln, Kennwort- und Kontosperrungsrichtlinien (Domänenebene), Software per MSI verteilen, Desktophintergrund/Startseite festlegen.', keywords: ['Bildschirmsperre', 'Laufwerk', 'Drucker', 'USB', 'Update', 'Kennwort'], explanation: 'Jede sinnvolle zentrale Einstellung zählt.' },
  ],
};
