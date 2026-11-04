import type { Module } from '../types';

export const s05: Module = {
  id: 's05',
  nr: 5,
  area: 'sicherheit',
  title: 'Sicherheit am Arbeitsplatz',
  short: 'Virenschutz und Anti-Spam, Patchmanagement, Härtung von Clients (BitLocker, Bildschirmsperre, Clean Desk), mobile Geräte und MDM, sicheres Löschen und Entsorgen, Vorfälle melden.',
  icon: 'Laptop',
  relevance: 'ap1',
  prerequisites: ['s01', 's04'],
  generators: [],
  skills: [
    { id: 'sich.ap.schadsw', module: 's05', title: 'Virenschutz, Anti-Spam und lokale Firewall einsetzen', requires: ['sich.angriffe'] },
    { id: 'sich.ap.patch', module: 's05', title: 'Updates und Patchmanagement planen', requires: ['sich.risiko'] },
    { id: 'sich.ap.haertung', module: 's05', title: 'Arbeitsplatz härten (Bildschirmsperre, Clean Desk, UEFI, BitLocker, USB-Sperre)', requires: ['sich.auth.rechte'] },
    { id: 'sich.ap.mobil', module: 's05', title: 'Mobile Geräte, MDM und mobiles Arbeiten absichern', requires: ['sich.ap.haertung'] },
    { id: 'sich.ap.entsorgung', module: 's05', title: 'Datenträger sicher löschen und vernichten (DIN 66399)', requires: ['sich.ds.tom'] },
    { id: 'sich.ap.vorfall', module: 's05', title: 'Sicherheitsvorfälle erkennen und melden, Sensibilisierung', requires: ['sich.angriffe'] },
  ],
  lessons: [
    /* ---------------------------------------------------------------- */
    {
      id: 's05-l01',
      title: 'Virenschutz, Anti-Spam und lokale Firewall',
      minutes: 20,
      relevance: 'ap1',
      skills: ['sich.ap.schadsw'],
      steps: [
        {
          type: 'explain',
          title: 'Wie Virenschutz arbeitet',
          body: `Ein **Virenschutzprogramm** (Antivirus, Anti-Malware) prüft Dateien, Speicher und Prozesse auf Schadsoftware. Moderne Produkte kombinieren mehrere Verfahren:

| Verfahren | Funktionsweise | Stärke / Schwäche |
|---|---|---|
| **Signaturbasiert** | Vergleich mit bekannten Mustern („Fingerabdrücken“) von Schadsoftware | zuverlässig bei **bekannter** Malware; neue oder veränderte Varianten werden nicht erkannt → **Signaturen ständig aktualisieren** |
| **Heuristisch** | sucht nach **verdächtigen Merkmalen** im Code | erkennt auch Varianten; Fehlalarme möglich |
| **Verhaltensbasiert** | beobachtet, was ein Programm **tut** (z. B. massenhaft Dateien verschlüsseln) | erkennt auch unbekannte Angriffe (z. B. Ransomware) |
| **Sandbox / Cloud-Analyse** | verdächtige Datei wird isoliert ausgeführt bzw. in der Cloud geprüft | gründlich, kostet Zeit |

**EDR** (*Endpoint Detection and Response*) geht weiter: Es zeichnet Ereignisse auf allen Clients zentral auf, erkennt Angriffsmuster und kann Geräte automatisch **isolieren**.

**Im Unternehmen wichtig:** **zentral verwaltet** (eine Konsole zeigt Status und Alarme aller Geräte), automatische Updates, Echtzeitschutz auf **allen** Geräten inkl. Server, Benutzer dürfen den Schutz **nicht abschalten**. In Windows ist **Microsoft Defender** bereits integriert und lässt sich zentral steuern.

**Anti-Spam / Mailfilter** – viele Angriffe beginnen per E-Mail:
- **Reputation/Sperrlisten**: Mails von bekannten Spam-Servern werden abgelehnt.
- **Absenderprüfung** mit **SPF, DKIM und DMARC**: Darf dieser Server für die Domain senden? Ist die Mail signiert? Was soll mit gefälschten Mails passieren?
- **Inhalts- und Anhangfilter**: gefährliche Dateitypen (z. B. .exe, .js, Makro-Dokumente) blockieren, Links prüfen, verdächtige Anhänge in einer **Sandbox** öffnen.
- **Quarantäne** statt Löschen, damit Fehlalarme geprüft werden können; Kennzeichnung externer Mails („[EXTERN]“).

**Lokale Firewall:** Die Windows Defender Firewall filtert ein- und ausgehende Verbindungen am Client. Sie unterscheidet **Netzwerkprofile** (Domäne, Privat, Öffentlich) – im **öffentlichen** Profil (Hotel-WLAN) gelten die strengsten Regeln, Freigaben sind dort gesperrt. Sie ergänzt die Netzwerk-Firewall (Defense in Depth).

**Makros:** Office-Makros in Dokumenten aus dem Internet sind ein Haupteinfallstor. Per Gruppenrichtlinie werden sie **blockiert**; nur signierte Makros aus vertrauenswürdigen Quellen sind erlaubt.`,
        },
        {
          type: 'visual',
          title: 'Schutzschichten gegen Schadsoftware',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Mailfilter', text: 'Spam, Phishing, gefährliche Anhänge abfangen – SPF/DKIM/DMARC, Sandbox, Quarantäne.', icon: 'MailWarning' },
                { title: 'Webfilter / Firewall', text: 'Bekannte Schadseiten sperren, nur nötige Verbindungen erlauben.', icon: 'Shield' },
                { title: 'Virenschutz / EDR', text: 'Signaturen, Heuristik, Verhalten – zentral verwaltet und aktuell.', icon: 'Bug' },
                { title: 'Updates', text: 'Sicherheitslücken schließen, bevor sie ausgenutzt werden.', icon: 'RefreshCw' },
                { title: 'Rechte', text: 'Keine Adminrechte im Alltag, Makros blockieren, Software-Whitelisting.', icon: 'UserMinus' },
                { title: 'Backup + Mensch', text: 'Offline-Backup für den Ernstfall, Schulung gegen Social Engineering.', icon: 'Users' },
              ],
            },
          },
          caption: 'Defense in Depth: Jede Schicht fängt einen Teil ab – keine allein reicht aus.',
        },
        {
          type: 'check',
          question: {
            id: 's05-c01', kind: 'single', skill: 'sich.ap.schadsw', difficulty: 1,
            prompt: 'Warum muss ein **signaturbasierter** Virenschutz ständig aktualisiert werden?',
            options: ['Weil er nur Schadsoftware erkennt, deren Muster (Signatur) bereits in seiner Datenbank steht', 'Weil sonst die Lizenz abläuft', 'Weil Signaturen nach einem Tag automatisch gelöscht werden', 'Weil er sonst den PC verlangsamt'],
            answer: 0,
            distractors: {
              '1': { why: 'Lizenz und Signaturaktualität sind zwei verschiedene Dinge.', error: 'virenschutz-signatur' },
              '2': { why: 'Signaturen bleiben erhalten – es kommen nur ständig neue hinzu.', error: 'virenschutz-signatur' },
              '3': { why: 'Die Aktualisierung dient der Erkennung neuer Schadsoftware, nicht der Leistung.', error: 'virenschutz-signatur' },
            },
            explanation: 'Täglich erscheinen neue Schadprogramme. Ohne aktuelle Signaturen (und ergänzende heuristische/verhaltensbasierte Erkennung) bleiben sie unentdeckt.',
          },
        },
        {
          type: 'check',
          question: {
            id: 's05-c02', kind: 'multi', skill: 'sich.ap.schadsw', difficulty: 2,
            prompt: 'Welche Maßnahmen gehören zu einem wirksamen **Anti-Spam- bzw. Mailschutz**?',
            options: ['Prüfung von SPF, DKIM und DMARC', 'Blockieren gefährlicher Anhangtypen und Prüfung in einer Sandbox', 'Quarantäne mit Prüfmöglichkeit statt sofortigem Löschen', 'Automatisches Öffnen aller Anhänge zur Vorschau', 'Kennzeichnung externer E-Mails'],
            answer: [0, 1, 2, 4],
            explanation: 'Automatisches Öffnen von Anhängen wäre das Gegenteil von Schutz.',
          },
        },
        { type: 'practice', title: 'Übung: Schadsoftwareschutz', questionIds: ['s05-q001', 's05-q002', 's05-q003', 's05-q004', 's05-q005'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Virenschutz: signaturbasiert (bekannte Malware), heuristisch, verhaltensbasiert, Sandbox; EDR erkennt und isoliert zentral.',
            'Zentral verwalten, automatisch aktualisieren, nicht abschaltbar – auch auf Servern.',
            'Mailschutz: Reputation, SPF/DKIM/DMARC, Anhang- und Linkprüfung, Quarantäne.',
            'Lokale Firewall mit Netzwerkprofilen; Makros aus dem Internet blockieren.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's05-l02',
      title: 'Updates und Patchmanagement',
      minutes: 20,
      relevance: 'ap1',
      skills: ['sich.ap.patch'],
      steps: [
        {
          type: 'explain',
          title: 'Warum Updates so wichtig sind – und wie man sie organisiert',
          body: `Viele erfolgreiche Angriffe nutzen **bekannte** Sicherheitslücken, für die längst ein Update (Patch) existiert. **Patchmanagement** sorgt dafür, dass Updates **zeitnah, kontrolliert und nachweisbar** eingespielt werden – für Betriebssysteme, Anwendungen (Browser, PDF-Reader, Office), Firmware (BIOS/UEFI, Router, Switches, Drucker) und Server.

**Patchmanagement-Prozess:**
1. **Inventar** führen: Welche Geräte und Softwareversionen gibt es? (Ohne Inventar keine Übersicht.)
2. **Informieren**: Herstellerhinweise, Warnungen des BSI bzw. CERT-Bund; Microsoft veröffentlicht Sicherheitsupdates regulär am **Patchday** (zweiter Dienstag im Monat).
3. **Bewerten**: Wie kritisch ist die Lücke? Maßstab ist oft der **CVSS-Wert** (0–10). Wird sie schon aktiv ausgenutzt?
4. **Testen**: zuerst auf einer **Testgruppe/Pilotgruppe** (z. B. IT-Abteilung), um Störungen zu erkennen.
5. **Verteilen**: zentral und **gestaffelt** (z. B. über Windows Update for Business/Intune oder WSUS), mit Zeitplan für Neustarts.
6. **Kontrollieren**: Patchstand aller Geräte prüfen (Compliance-Bericht), Nachzügler nacharbeiten.
7. **Dokumentieren**.

| CVSS-Wert (v3) | Einstufung | typische Reaktion |
|---|---|---|
| 0,1 – 3,9 | niedrig | im regulären Zyklus |
| 4,0 – 6,9 | mittel | im regulären Zyklus |
| 7,0 – 8,9 | hoch | zeitnah, bevorzugt |
| 9,0 – 10,0 | **kritisch** | **sofort** – ggf. Notfallpatch außerhalb des Zyklus, Übergangsmaßnahmen (Dienst abschalten, Firewall-Regel) |

**End of Life (EOL):** Software ohne Sicherheitsupdates (z. B. Windows 10 seit Oktober 2025 ohne kostenpflichtige Verlängerung) darf nicht weiter ungeschützt im Netz betrieben werden → rechtzeitig migrieren oder isolieren.

**Zielkonflikt:** Schnell patchen (Sicherheit) vs. erst testen (Verfügbarkeit, Stabilität). Die Lösung ist der **gestaffelte** Rollout – und bei kritischen, aktiv ausgenutzten Lücken die schnelle Notfallverteilung.`,
        },
        {
          type: 'example',
          title: 'Beleg: Patch-Compliance-Bericht auswerten',
          problem: `Auszug aus dem Bericht der Verwaltungskonsole (Stand 14. Januar 2027, Patchday war der 12. Januar):

| Gerätegruppe | Geräte | aktuell | fehlende kritische Updates |
|---|---|---|---|
| Clients Hamburg | 80 | 74 | 6 |
| Clients Berlin | 30 | 21 | 9 |
| Server | 10 | 10 | 0 |

Berechne die Patch-Quote insgesamt und bewerte.`,
          steps: [
            { label: 'Summen', body: 'Geräte: 80 + 30 + 10 = **120**; aktuell: 74 + 21 + 10 = **105**' },
            { label: 'Quote', body: '105 / 120 = 0,875 = **87,5 %**' },
            { label: 'Auffälligkeit', body: 'Berlin: 21 / 30 = **70 %** – deutlich schlechter als Hamburg (92,5 %).' },
            { label: 'Maßnahmen', body: 'Ursache klären (Geräte selten im Netz? Außendienst ohne VPN? Fehler beim Verteilpunkt?), Nachzügler gezielt patchen, Geräte, die länger nicht online waren, bei Verbindung zuerst aktualisieren. Server vollständig – gut.' },
          ],
          result: 'Gesamtquote 87,5 %; Standort Berlin mit 70 % muss nachgearbeitet werden.',
        },
        {
          type: 'check',
          question: {
            id: 's05-c03', kind: 'order', skill: 'sich.ap.patch', difficulty: 2,
            prompt: 'Bringe die Schritte des Patchmanagements in die richtige Reihenfolge.',
            items: ['Inventar der Geräte und Software führen', 'Sicherheitsmeldungen auswerten', 'Kritikalität bewerten (z. B. CVSS)', 'Update in einer Pilotgruppe testen', 'Gestaffelt auf alle Geräte verteilen', 'Patchstand kontrollieren und dokumentieren'],
            explanation: 'Inventar → Informieren → Bewerten → Testen → Verteilen → Kontrollieren/Dokumentieren.',
          },
        },
        {
          type: 'check',
          question: {
            id: 's05-c04', kind: 'single', skill: 'sich.ap.patch', difficulty: 2,
            prompt: 'Für die VPN-Appliance wird eine Lücke mit **CVSS 9,8** veröffentlicht, die bereits aktiv ausgenutzt wird. Der reguläre Wartungstermin ist in drei Wochen. Was tust du?',
            options: ['Sofort patchen (Notfallwartung) bzw. bis dahin Übergangsmaßnahmen ergreifen', 'Bis zum regulären Termin warten', 'Nichts – VPN-Appliances sind nicht betroffen', 'Nur die Benutzer informieren'],
            answer: 0,
            distractors: {
              '1': { why: 'Drei Wochen offene, aktiv ausgenutzte Lücke im Außenzugang ist ein inakzeptables Risiko.', error: 'patch-priorisierung' },
              '2': { why: 'Gerade Systeme am Internetzugang sind bevorzugte Ziele.', error: 'patch-priorisierung' },
              '3': { why: 'Information allein schließt die Lücke nicht.', error: 'patch-priorisierung' },
            },
            explanation: 'Kritisch (≥ 9,0) + aktiv ausgenutzt + aus dem Internet erreichbar → Notfallpatch. Falls noch kein Patch existiert: Herstellerempfehlungen umsetzen, Dienst einschränken, Zugriffe überwachen.',
          },
        },
        { type: 'practice', title: 'Übung: Patchmanagement', questionIds: ['s05-q006', 's05-q007', 's05-q008', 's05-q009', 's05-q010'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Viele Angriffe nutzen bekannte, ungepatchte Lücken – auch in Firmware und Drittsoftware.',
            'Prozess: Inventar → Informieren → Bewerten (CVSS) → Testen → gestaffelt verteilen → kontrollieren → dokumentieren.',
            'CVSS ≥ 9,0 = kritisch → sofort; Microsoft-Patchday: zweiter Dienstag im Monat.',
            'EOL-Software ohne Updates ersetzen oder isolieren.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's05-l03',
      title: 'Den Arbeitsplatz härten',
      minutes: 25,
      relevance: 'ap1',
      skills: ['sich.ap.haertung'],
      steps: [
        {
          type: 'explain',
          title: 'Checkliste für einen sicheren Client',
          body: `**Härtung** heißt: alles abschalten oder absichern, was nicht gebraucht wird, und sichere Voreinstellungen setzen. Für einen neuen Arbeitsplatz der Elektro Krämer GmbH:

| Bereich | Maßnahme | schützt vor |
|---|---|---|
| **Firmware** | UEFI-/BIOS-**Passwort**, **Secure Boot** an, Boot nur von der internen SSD | Start eines fremden Systems vom USB-Stick, Manipulation des Bootvorgangs |
| **Verschlüsselung** | **BitLocker** mit **TPM 2.0** (bei hohem Schutzbedarf zusätzlich Pre-Boot-PIN), Recovery-Key im AD | Datendiebstahl bei Verlust/Diebstahl, Ausbau der SSD |
| **Konten** | Standardbenutzer **ohne Adminrechte**; lokales Admin-Passwort je Gerät verschieden (z. B. **Windows LAPS**) | Installation von Schadsoftware, Ausbreitung im Netz |
| **Bildschirmsperre** | automatische Sperre nach wenigen Minuten (per Gruppenrichtlinie); Regel: **Win + L** beim Verlassen | unbefugte Nutzung offener Sitzungen |
| **Schnittstellen** | USB-Massenspeicher sperren oder nur verschlüsselte Firmen-Sticks zulassen; Autostart aus | Datenabfluss, Baiting, Einschleusen von Schadsoftware |
| **Software** | nur benötigte Software, unnötige Dienste deaktivieren, ggf. **Anwendungs-Whitelisting** (z. B. AppLocker) | Angriffsfläche verkleinern |
| **Schutzsoftware** | Virenschutz/EDR, lokale Firewall aktiv, Updates automatisch | Schadsoftware, Netzwerkangriffe |
| **Physisch** | Kabelschloss, Blickschutzfolie an Empfang/Großraumbüro | Diebstahl, Shoulder Surfing |

**Organisatorische Regeln am Arbeitsplatz:**
- **Clean Desk**: Beim Verlassen keine vertraulichen Unterlagen offen liegen lassen, abends in den abschließbaren Schrank.
- **Clear Screen**: Bildschirm sperren, keine Passwortzettel.
- **Drucker**: Ausdrucke sofort abholen bzw. **Follow-me-Printing** (Freigabe am Gerät per Karte/PIN).
- **Besucher** nicht allein lassen, unbekannte Personen ansprechen.
- Vertrauliche Papiere in den **Aktenvernichter** bzw. die verschlossene Datenschutztonne.

Viele dieser Einstellungen werden im Unternehmen **zentral** per **Gruppenrichtlinie (GPO)** oder MDM gesetzt – so gelten sie einheitlich und können vom Benutzer nicht abgeschaltet werden. Das BSI bietet dazu Bausteine wie SYS.2.1 (Allgemeiner Client).`,
        },
        {
          type: 'example',
          title: 'Abnahme eines neu eingerichteten Arbeitsplatzes',
          problem: 'Du hast den PC für die neue Mitarbeiterin im Einkauf eingerichtet. Prüfe vor der Übergabe die Sicherheitseinstellungen und dokumentiere sie im Übergabeprotokoll.',
          steps: [
            { label: 'Konto', body: 'Domänenkonto ohne lokale Adminrechte angelegt, Gruppe „Einkauf“, Initialpasswort muss bei Erstanmeldung geändert werden, MFA eingerichtet.' },
            { label: 'Gerät', body: 'BitLocker aktiv (manage-bde -status zeigt „Vollständig verschlüsselt“), Recovery-Key im AD gespeichert, UEFI-Passwort gesetzt, Secure Boot an.' },
            { label: 'Schutz', body: 'Defender-Status grün, Signaturen aktuell, Firewall an (Domänenprofil), alle Updates installiert.' },
            { label: 'Richtlinien', body: 'Bildschirmsperre nach 5 Minuten greift, USB-Massenspeicher gesperrt, Makros aus dem Internet blockiert.' },
            { label: 'Einweisung', body: 'Mitarbeiterin auf Clean Desk/Clear Screen, Phishing-Meldeknopf und Meldeweg bei Vorfällen hingewiesen – Unterschrift im Übergabeprotokoll.' },
          ],
          result: 'Technische Härtung geprüft, Einweisung durchgeführt, alles im Übergabeprotokoll dokumentiert – genau das verlangt die AP1 (Arbeitsplatz einrichten, Kunden einweisen, Leistung protokollieren).',
        },
        {
          type: 'check',
          question: {
            id: 's05-c05', kind: 'match', skill: 'sich.ap.haertung', difficulty: 2,
            prompt: 'Ordne jeder Maßnahme die Bedrohung zu, gegen die sie vor allem schützt.',
            left: ['UEFI-Passwort und Boot nur von interner SSD', 'BitLocker mit TPM', 'Automatische Bildschirmsperre', 'Sperre von USB-Massenspeichern', 'Standardbenutzer ohne Adminrechte'],
            right: ['Start eines fremden Betriebssystems vom USB-Stick', 'Auslesen der Daten nach Diebstahl des Notebooks', 'Nutzung einer offenen Sitzung durch Unbefugte', 'Datenabfluss auf private Sticks und Einschleppen von Schadsoftware', 'Installation von Schadsoftware mit Systemrechten'],
            answer: [0, 1, 2, 3, 4],
            explanation: 'Jede Härtungsmaßnahme schließt einen bestimmten Angriffsweg.',
          },
        },
        {
          type: 'check',
          question: {
            id: 's05-c06', kind: 'text', skill: 'sich.ap.haertung', difficulty: 1,
            prompt: 'Mit welcher Tastenkombination sperrt man unter Windows den Bildschirm sofort?',
            accept: ['Win + L', 'Win+L', 'Windows + L', 'Windows+L', 'Windowstaste + L', 'Windows-Taste + L'],
            explanation: '**Win + L** sperrt sofort (alternativ Strg + Alt + Entf → Sperren). Regel: Immer sperren, wenn man den Platz verlässt.',
          },
        },
        { type: 'practice', title: 'Übung: Härtung', questionIds: ['s05-q011', 's05-q012', 's05-q013', 's05-q014', 's05-q015', 's05-q016'], count: 4, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Firmware: UEFI-Passwort, Secure Boot, Bootreihenfolge; Verschlüsselung: BitLocker mit TPM (+ PIN).',
            'Keine Adminrechte im Alltag, LAPS für lokale Admin-Passwörter, USB-Sperre, nur benötigte Software.',
            'Bildschirmsperre automatisch und per Win + L; Clean Desk, Clear Screen, Follow-me-Printing.',
            'Zentral per GPO/MDM durchsetzen und bei der Übergabe dokumentieren.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's05-l04',
      title: 'Mobile Geräte, MDM und mobiles Arbeiten',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['sich.ap.mobil'],
      steps: [
        {
          type: 'explain',
          title: 'Smartphones, Tablets und Notebooks unterwegs',
          body: `Mobile Geräte gehen verloren, werden gestohlen, verbinden sich mit fremden WLANs und mischen oft private und dienstliche Nutzung. Deshalb werden sie zentral mit einem **Mobile Device Management (MDM)** bzw. einer Unified-Endpoint-Management-Lösung (z. B. Microsoft Intune) verwaltet.

**Was ein MDM leistet:**
| Funktion | Beispiel |
|---|---|
| **Inventar** | Welche Geräte, welche Betriebssystemversion, wer nutzt es? |
| **Richtlinien durchsetzen** | Geräte-PIN/Biometrie Pflicht, Verschlüsselung an, automatische Sperre, Mindestversion des Betriebssystems |
| **Apps verteilen** | Firmen-Apps (Mail, Teams, ERP-App) zentral installieren, unerwünschte Apps sperren |
| **Container / Arbeitsprofil** | dienstliche Daten getrennt von privaten; Kopieren von Firmendaten in private Apps verhindern |
| **Fernsperre / Fernlöschung** | bei Verlust das Gerät sperren oder (die Firmendaten) löschen (*Remote Wipe*) |
| **Compliance** | nicht konforme Geräte (z. B. gerootet/gejailbreakt, veraltet) erhalten keinen Zugriff auf Firmendaten |

**Betriebsmodelle:**
| Modell | Bedeutung | Bewertung |
|---|---|---|
| **COBO** (*Corporate Owned, Business Only*) | Firmengerät, nur dienstlich | maximale Kontrolle |
| **COPE** (*Corporate Owned, Personally Enabled*) | Firmengerät, private Nutzung erlaubt | Kontrolle + Komfort; Trennung per Container |
| **BYOD** (*Bring Your Own Device*) | Privatgerät für dienstliche Zwecke | wenig Kontrolle, Datenschutz des Mitarbeiters (Firma darf private Daten nicht einsehen/löschen) → nur mit Container/App-Schutz und klaren Regeln |

**Sicher mobil und im Homeoffice arbeiten:**
- Zugriff auf Firmendaten nur über **VPN** bzw. abgesicherte Cloud-Dienste mit **MFA** – nie per offenem RDP-Port aus dem Internet.
- **Öffentliche WLANs** (Hotel, Bahn) nur mit VPN; besser Hotspot des Diensthandys.
- **Blickschutzfolie**, keine vertraulichen Telefonate im Zug, Gerät nie unbeaufsichtigt (Auto!).
- Im Homeoffice: Bildschirm sperren auch gegenüber Familienmitgliedern, Unterlagen verschlossen aufbewahren, privaten Router aktuell halten und mit WPA2/WPA3 sichern, Ausdrucke vermeiden bzw. sicher vernichten.
- Verlust **sofort melden** – nur dann kann das MDM rechtzeitig sperren.`,
        },
        {
          type: 'check',
          question: {
            id: 's05-c07', kind: 'multi', skill: 'sich.ap.mobil', difficulty: 2,
            prompt: 'Welche Funktionen bietet ein **Mobile Device Management**?',
            options: ['Erzwingen von Geräte-PIN und Verschlüsselung', 'Fernsperre und Fernlöschung bei Verlust', 'Trennung dienstlicher und privater Daten per Container/Arbeitsprofil', 'Zentrale Verteilung von Firmen-Apps', 'Erhöhung der Akkukapazität'],
            answer: [0, 1, 2, 3],
            explanation: 'MDM verwaltet Richtlinien, Apps, Compliance und Fernaktionen – die Hardware ändert es nicht.',
          },
        },
        {
          type: 'check',
          question: {
            id: 's05-c08', kind: 'free', skill: 'sich.ap.mobil', difficulty: 2,
            prompt: 'Ein Außendienstmitarbeiter möchte sein **privates** Smartphone für dienstliche E-Mails nutzen (BYOD). Nennen Sie zwei Risiken und zwei Maßnahmen.',
            modelAnswer: 'Risiken: 1. Firmendaten (Mails mit Kundendaten) liegen auf einem Gerät, das die Firma nicht kontrolliert – unsichere Apps, fehlende Updates, keine Verschlüsselung oder PIN. 2. Bei Verlust oder Ausscheiden des Mitarbeiters bleiben Firmendaten auf dem Gerät; Vermischung mit privaten Daten erschwert die Löschung, ohne Privatdaten zu berühren (Datenschutz des Mitarbeiters). Maßnahmen: 1. Nutzung nur mit MDM/App-Schutzrichtlinie: Firmendaten in einem Container bzw. Arbeitsprofil, das selektiv gelöscht werden kann; Kopieren in private Apps unterbinden. 2. Mindestanforderungen erzwingen (PIN/Biometrie, Verschlüsselung, aktuelles Betriebssystem, keine gerooteten Geräte), MFA für den Mailzugriff, schriftliche BYOD-Vereinbarung mit Regeln zu Verlustmeldung und Fernlöschung.',
            keywords: ['Container', 'selektives Löschen', 'PIN', 'Verschlüsselung', 'Vereinbarung', 'Datenschutz'],
            explanation: 'BYOD = weniger Kontrolle → technische Trennung und klare Regeln.',
          },
        },
        { type: 'practice', title: 'Übung: Mobile Geräte', questionIds: ['s05-q017', 's05-q018', 's05-q019', 's05-q020'], count: 3, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'MDM: Inventar, Richtlinien (PIN, Verschlüsselung, Version), App-Verteilung, Container, Fernsperre/-löschung, Compliance.',
            'COBO (nur dienstlich) – COPE (Firmengerät, privat erlaubt) – BYOD (Privatgerät, wenig Kontrolle).',
            'Mobil: VPN + MFA, öffentliches WLAN nur mit VPN, Blickschutz, Verlust sofort melden.',
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- */
    {
      id: 's05-l05',
      title: 'Datenträger löschen, Geräte entsorgen, Vorfälle melden',
      minutes: 25,
      relevance: 'ap1',
      skills: ['sich.ap.entsorgung', 'sich.ap.vorfall'],
      steps: [
        {
          type: 'explain',
          title: 'Gelöscht ist nicht weg',
          body: `Werden alte PCs, Drucker (mit interner Festplatte!), Smartphones oder Speichermedien verkauft, verschenkt oder entsorgt, müssen die Daten **unwiederbringlich** entfernt werden.

| Methode | Wirkung |
|---|---|
| Datei löschen / Papierkorb leeren | entfernt nur den **Verweis** im Dateisystem – Daten sind mit Tools leicht wiederherstellbar ✘ |
| Schnellformatierung | legt ein neues leeres Dateisystem an – Daten bleiben weitgehend lesbar ✘ |
| **Überschreiben** (HDD) | gesamte Festplatte mit Zufallsdaten/Nullen überschreiben – bei modernen **HDDs** ausreichend ✔ |
| **Secure Erase / Sanitize** (SSD) | Löschbefehl des Herstellers/Controllers. Einfaches Überschreiben ist bei **SSDs unzuverlässig** (Wear Leveling, Reservebereiche) ✔ |
| **Crypto-Erase** | war das Gerät durchgehend verschlüsselt, wird der **Schlüssel** sicher vernichtet → Daten sind nur noch Zufallsrauschen ✔ |
| **Physische Vernichtung** | Schreddern, Zerkleinern nach **DIN 66399** – bei hohem Schutzbedarf oder defekten Datenträgern ✔ |

**DIN 66399** (Vernichtung von Datenträgern) gibt eine Systematik vor:
- **Schutzklassen** 1 (normal), 2 (hoch, z. B. personenbezogene Daten), 3 (sehr hoch) – passend zur Schutzbedarfsfeststellung.
- **Sicherheitsstufen** 1–7: je höher, desto kleiner die Partikel.
- **Materialklassen** mit Kennbuchstaben: **P** Papier, **F** Film, **O** optische Datenträger, **T** magnetische Datenträger (Bänder, Disketten), **H** Festplatten mit Magnetscheiben, **E** elektronische Datenträger (SSD, USB-Stick, Speicherkarte).
- Beispiel: „**H-5**“ = Festplatte, Sicherheitsstufe 5. Zur Schutzklasse 2 passen die Stufen 3 bis 5.

Wird ein **Entsorgungsdienstleister** beauftragt: AV-Vertrag (er verarbeitet personenbezogene Daten im Auftrag), verschlossene Sicherheitsbehälter, **Vernichtungsprotokoll/-zertifikat** mit Seriennummern aufbewahren (Rechenschaftspflicht). Der BSI-Baustein **CON.6 Löschen und Vernichten** beschreibt die Anforderungen.

**Sicherheitsvorfälle melden – die wichtigste Regel für alle:** Lieber einmal zu viel melden als einmal zu wenig. Anzeichen: unerwartete Pop-ups oder Warnungen, plötzlich verschlüsselte oder umbenannte Dateien, unbekannte Programme, Mails „von mir“, die ich nicht geschickt habe, Klick auf einen verdächtigen Link.

**Sofort-Verhalten bei Verdacht auf Schadsoftware (sinngemäß nach BSI-Empfehlungen):**
1. **Ruhe bewahren**, nicht weiterarbeiten.
2. Gerät vom Netz trennen (**LAN-Kabel ziehen, WLAN aus**), damit sich nichts ausbreitet – das Gerät aber nicht einfach ausschalten (Spuren im Arbeitsspeicher gehen sonst verloren), sofern die IT nichts anderes vorgibt.
3. **Sofort die IT bzw. den Meldeweg informieren** (Telefonnummer auf dem Notfall-Aufkleber/IT-Notfallkarte) – was, wann, welches Gerät.
4. Nichts auf eigene Faust „reparieren“ oder löschen.

**Sensibilisierung (Awareness):** Regelmäßige Schulungen, Phishing-Simulationen, Einweisung neuer Mitarbeitender, kurze Merkblätter (BSI-Baustein ORP.3). Wichtig: Eine **positive Fehlerkultur** – wer einen Klick sofort meldet, wird gelobt, nicht bestraft. Nur dann melden Menschen früh.`,
        },
        {
          type: 'example',
          title: 'Altgeräte der Buchhaltung ausmustern',
          problem: '15 alte PCs der Buchhaltung (HDD), 5 Notebooks (SSD, durchgehend BitLocker-verschlüsselt) und ein Multifunktionsdrucker mit interner Festplatte sollen an einen Wiederverkäufer gehen. Plane das Vorgehen.',
          steps: [
            { label: 'Schutzbedarf', body: 'Buchhaltung = personenbezogene und Finanzdaten → **hoch** (Schutzklasse 2).' },
            { label: 'PCs (HDD)', body: 'Komplettes Überschreiben mit geeigneter Software, Protokoll je Seriennummer; defekte Platten physisch vernichten (z. B. **H-4** oder höher).' },
            { label: 'Notebooks (SSD)', body: '**Crypto-Erase**/Secure Erase über Hersteller- oder UEFI-Funktion bzw. Zurücksetzen mit Laufwerksbereinigung; Erfolg prüfen; Gerät aus AD/MDM entfernen.' },
            { label: 'Drucker', body: 'Interne Festplatte nicht vergessen! Herstellerfunktion „Daten sicher löschen“ bzw. Platte ausbauen und vernichten; Adressbücher, Zugangsdaten (z. B. für Scan-to-Mail) entfernen.' },
            { label: 'Nachweis', body: 'Löschprotokolle bzw. Vernichtungszertifikat mit Seriennummern archivieren; mit dem Wiederverkäufer AV-Vertrag bzw. Bestätigung über zertifizierte Löschung.' },
          ],
          result: 'Löschverfahren je Datenträgertyp wählen (HDD überschreiben, SSD Secure/Crypto-Erase, sonst DIN-66399-Vernichtung) und lückenlos dokumentieren.',
        },
        {
          type: 'check',
          question: {
            id: 's05-c09', kind: 'single', skill: 'sich.ap.entsorgung', difficulty: 2,
            prompt: 'Warum reicht bei **SSDs** einfaches Überschreiben mit Nullen nicht zuverlässig aus?',
            options: ['Weil der Controller Schreibzugriffe per Wear Leveling auf andere Speicherzellen umleitet und Reservebereiche nicht erreicht werden', 'Weil SSDs keine Daten dauerhaft speichern', 'Weil Überschreiben die SSD sofort zerstört', 'Weil SSDs nur lesbar sind'],
            answer: 0,
            distractors: {
              '1': { why: 'SSDs speichern Daten dauerhaft (nichtflüchtig).', error: 'ssd-loeschen' },
              '2': { why: 'Überschreiben verkürzt die Lebensdauer etwas, zerstört die SSD aber nicht.', error: 'ssd-loeschen' },
              '3': { why: 'SSDs sind selbstverständlich beschreibbar.', error: 'ssd-loeschen' },
            },
            explanation: 'Deshalb: **Secure Erase/Sanitize** des Controllers, **Crypto-Erase** bei verschlüsselten Laufwerken oder physische Vernichtung (DIN 66399, Materialklasse E).',
          },
        },
        {
          type: 'check',
          question: {
            id: 's05-c10', kind: 'order', skill: 'sich.ap.vorfall', difficulty: 1,
            prompt: 'Auf deinem PC erscheint plötzlich die Meldung „Ihre Dateien wurden verschlüsselt“. Bringe die Schritte in die richtige Reihenfolge.',
            items: ['Nicht weiterarbeiten, Ruhe bewahren', 'Netzwerkverbindung trennen (LAN-Kabel ziehen, WLAN aus)', 'Sofort die IT über den Notfall-Meldeweg informieren', 'Auf Anweisungen der IT warten, nichts selbst löschen oder reparieren'],
            explanation: 'Stoppen → isolieren → melden → nach Anweisung handeln. Nicht zahlen, nicht selbst „aufräumen“.',
          },
        },
        { type: 'practice', title: 'Übung: Löschen, Entsorgen, Melden', questionIds: ['s05-q021', 's05-q022', 's05-q023', 's05-q024', 's05-q025', 's05-q026', 's05-q027', 's05-q028', 's05-q029', 's05-q030'], count: 5, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Löschen/Formatieren reicht nicht: HDD überschreiben, SSD Secure Erase bzw. Crypto-Erase, sonst physisch vernichten.',
            'DIN 66399: Schutzklassen 1–3, Sicherheitsstufen 1–7, Materialklassen P, F, O, T, H, E (z. B. H-5).',
            'Dienstleister: AV-Vertrag und Vernichtungsnachweis; Druckerfestplatten nicht vergessen.',
            'Vorfall: stoppen → vom Netz trennen → sofort melden → Anweisungen folgen; positive Fehlerkultur und regelmäßige Awareness.',
          ],
        },
      ],
    },
  ],

  /* ================================================================== */
  questions: [
    {
      id: 's05-q001', kind: 'match', skill: 'sich.ap.schadsw', difficulty: 2,
      prompt: 'Ordne die Erkennungsverfahren von Virenschutzprogrammen ihrer Beschreibung zu.',
      left: ['Signaturbasiert', 'Heuristisch', 'Verhaltensbasiert', 'Sandbox'],
      right: ['Vergleich mit Mustern bekannter Schadsoftware', 'Suche nach verdächtigen Merkmalen im Programmcode', 'Überwachung der Aktionen eines laufenden Programms, z. B. massenhaftes Verschlüsseln', 'Ausführung einer verdächtigen Datei in einer isolierten Umgebung'],
      answer: [0, 1, 2, 3],
      explanation: 'Moderne Produkte kombinieren alle Verfahren.',
    },
    {
      id: 's05-q002', kind: 'free', skill: 'sich.ap.schadsw', difficulty: 2,
      prompt: 'Erläutern Sie, warum ein Virenschutzprogramm im Unternehmen **zentral verwaltet** werden sollte.',
      modelAnswer: 'Bei zentraler Verwaltung sieht die IT in einer Konsole den Schutzstatus aller Geräte (aktive Echtzeitüberwachung, Aktualität der Signaturen, Funde) und erhält Alarme sofort. Einstellungen und Ausnahmen werden einheitlich per Richtlinie gesetzt; Benutzer können den Schutz nicht abschalten. Infizierte Geräte können schnell erkannt und isoliert werden, Updates werden automatisch verteilt. Ohne zentrale Verwaltung bliebe ein deaktivierter oder veralteter Schutz auf einzelnen Geräten unbemerkt.',
      keywords: ['Konsole', 'Status', 'Alarme', 'Richtlinie', 'nicht abschaltbar', 'isolieren'],
      explanation: 'Zentral = Überblick, Einheitlichkeit, schnelle Reaktion.',
    },
    {
      id: 's05-q003', kind: 'match', skill: 'sich.ap.schadsw', difficulty: 3,
      prompt: 'Ordne die E-Mail-Schutzverfahren ihrer Funktion zu.',
      left: ['SPF', 'DKIM', 'DMARC'],
      right: ['legt im DNS fest, welche Mailserver für eine Domain senden dürfen', 'signiert ausgehende Mails kryptografisch, der Empfänger prüft die Signatur über einen Schlüssel im DNS', 'legt fest, wie Empfänger mit Mails umgehen sollen, die SPF/DKIM nicht bestehen, und liefert Berichte'],
      answer: [0, 1, 2],
      explanation: 'Gemeinsam erschweren sie das Fälschen von Absenderdomains (Spoofing).',
    },
    {
      id: 's05-q004', kind: 'single', skill: 'sich.ap.schadsw', difficulty: 2,
      prompt: 'Ein Notebook verbindet sich im Hotel-WLAN. Welches Profil der Windows Defender Firewall sollte gelten?',
      options: ['Öffentlich – mit den strengsten Regeln, Freigaben gesperrt', 'Domäne – weil es ein Firmengerät ist', 'Privat – damit Dateifreigaben funktionieren', 'Gar keins – im Hotel ist die Firewall unnötig'],
      answer: 0,
      distractors: {
        '1': { why: 'Das Domänenprofil gilt nur, wenn der Domänencontroller erreichbar ist (im Firmennetz/VPN).', error: 'firewall-profil' },
        '2': { why: 'Privat ist für vertrauenswürdige Heimnetze gedacht.', error: 'firewall-profil' },
        '3': { why: 'Gerade in fremden Netzen ist die lokale Firewall besonders wichtig.', error: 'firewall-profil' },
      },
      explanation: 'Fremde Netze = öffentliches Profil; zusätzlich VPN für den Firmenzugriff.',
    },
    {
      id: 's05-q005', kind: 'multi', skill: 'sich.ap.schadsw', difficulty: 2,
      prompt: 'Welche Maßnahmen verringern das Risiko einer Infektion durch **Office-Dokumente mit Makros**?',
      options: ['Makros in Dateien aus dem Internet per Gruppenrichtlinie blockieren', 'Nur signierte Makros aus vertrauenswürdigen Quellen zulassen', 'Mailfilter, der Makro-Dokumente von extern in Quarantäne legt', 'Benutzer zum Aktivieren aller Makros auffordern', 'Schulung: Bei unerwarteten Anhängen nicht „Inhalt aktivieren“ klicken'],
      answer: [0, 1, 2, 4],
      explanation: 'Technik (Blockieren, Signatur, Filter) plus Schulung.',
    },
    {
      id: 's05-q006', kind: 'number', skill: 'sich.ap.patch', difficulty: 2,
      prompt: `Beleg: Patchstand nach dem Patchday

| Gruppe | Geräte | aktuell |
|---|---|---|
| Clients | 96 | 84 |
| Notebooks | 40 | 30 |
| Server | 14 | 14 |

Wie hoch ist die Patch-Quote über **alle** Geräte in **Prozent**? (auf eine Nachkommastelle runden)`,
      answer: 85.3, tolerance: 0.05, unit: '%',
      hints: ['Summe aktuell / Summe Geräte · 100'],
      misconceptions: [{ answer: '87.5', error: 'quote-mittelwert', why: 'Du hast vermutlich den Mittelwert der Gruppenquoten gebildet. Richtig: Summe aktuell / Summe Geräte.' }],
      explanation: 'Aktuell: 84 + 30 + 14 = 128; Geräte: 96 + 40 + 14 = 150. 128 / 150 = 0,8533 → **85,3 %**.',
    },
    {
      id: 's05-q007', kind: 'table', skill: 'sich.ap.patch', difficulty: 2,
      prompt: 'Ordne die CVSS-Werte (Version 3) der Einstufung zu: **niedrig**, **mittel**, **hoch** oder **kritisch**.',
      columns: [{ key: 's', label: 'Einstufung', type: 'text' }],
      rows: [
        { label: 'CVSS 9,8', cells: { s: { answer: 'kritisch', accept: ['critical'] } } },
        { label: 'CVSS 7,5', cells: { s: { answer: 'hoch', accept: ['high'] } } },
        { label: 'CVSS 5,3', cells: { s: { answer: 'mittel', accept: ['medium'] } } },
        { label: 'CVSS 2,1', cells: { s: { answer: 'niedrig', accept: ['low', 'gering'] } } },
      ],
      explanation: '0,1–3,9 niedrig · 4,0–6,9 mittel · 7,0–8,9 hoch · 9,0–10,0 kritisch.',
    },
    {
      id: 's05-q008', kind: 'free', skill: 'sich.ap.patch', difficulty: 2,
      prompt: 'Erläutern Sie den Zielkonflikt zwischen **schnellem Patchen** und **Stabilität** und wie man ihn im Patchmanagement löst.',
      modelAnswer: 'Schnelles Einspielen schließt Sicherheitslücken, bevor Angreifer sie ausnutzen (Schutz von Vertraulichkeit und Integrität). Ungetestete Updates können aber Fehler verursachen, Anwendungen inkompatibel machen oder Systeme lahmlegen (Gefahr für die Verfügbarkeit). Lösung: gestaffelter Rollout – zuerst eine Test-/Pilotgruppe, nach kurzer Beobachtung die breite Verteilung; klare Fristen je Kritikalität (z. B. kritisch innerhalb weniger Tage, sonst im Monatszyklus); bei aktiv ausgenutzten kritischen Lücken Notfallpatch bzw. Übergangsmaßnahmen; Backups/Snapshots vor Updates wichtiger Server, um zurückrollen zu können.',
      keywords: ['Sicherheitslücke', 'Verfügbarkeit', 'Pilotgruppe', 'gestaffelt', 'Kritikalität', 'Snapshot'],
      explanation: 'Sicherheit vs. Verfügbarkeit – gelöst durch Staffelung und Priorisierung.',
    },
    {
      id: 's05-q009', kind: 'number', skill: 'sich.ap.patch', difficulty: 1,
      prompt: 'Microsoft veröffentlicht Sicherheitsupdates regulär am zweiten Dienstag des Monats. Im **Februar 2027** ist der 1. Februar ein Montag. Auf welchen **Tag** (Datum im Februar) fällt der Patchday?',
      answer: 9,
      hints: ['Der erste Dienstag ist der 2. Februar.'],
      misconceptions: [{ answer: '2', error: 'patchday', why: 'Das ist der erste Dienstag – Patchday ist der zweite.' }],
      explanation: 'Erster Dienstag: 2. Februar, zweiter Dienstag: **9. Februar 2027**.',
    },
    {
      id: 's05-q010', kind: 'multi', skill: 'sich.ap.patch', difficulty: 2,
      prompt: 'Welche Komponenten müssen im Patchmanagement berücksichtigt werden?',
      options: ['Betriebssysteme der Clients und Server', 'Browser, PDF-Reader und andere Anwendungen', 'Firmware von Routern, Switches, Firewalls und Druckern', 'UEFI/BIOS der Rechner', 'Die Farbe der Netzwerkkabel'],
      answer: [0, 1, 2, 3],
      explanation: 'Angreifer nutzen Lücken überall – gerade vergessene Geräte wie Drucker und Firewalls sind beliebte Ziele.',
    },
    {
      id: 's05-q011', kind: 'free', skill: 'sich.ap.haertung', difficulty: 2,
      prompt: 'Beschreiben Sie die Regeln **Clean Desk** und **Clear Screen** und begründen Sie, welche Schutzziele sie unterstützen.',
      modelAnswer: 'Clean Desk: Beim Verlassen des Arbeitsplatzes – spätestens bei Feierabend – liegen keine vertraulichen Unterlagen, Datenträger oder Notizen offen; sie werden verschlossen aufbewahrt, Ausdrucke sofort vom Drucker geholt, nicht mehr Benötigtes in den Aktenvernichter. Clear Screen: Der Bildschirm wird beim Verlassen gesperrt (Win + L, automatische Sperre), vertrauliche Inhalte sind nicht für Besucher einsehbar, keine Passwortzettel. Beide schützen vor allem die Vertraulichkeit (Unbefugte wie Besucher, Reinigungspersonal oder Kollegen ohne Berechtigung sehen nichts) und mittelbar die Integrität, weil niemand eine offene Sitzung zur Manipulation nutzen kann.',
      keywords: ['verschließen', 'Bildschirm sperren', 'Win + L', 'Vertraulichkeit', 'Integrität', 'Besucher'],
      explanation: 'Organisatorische Maßnahmen mit großer Wirkung.',
    },
    {
      id: 's05-q012', kind: 'single', skill: 'sich.ap.haertung', difficulty: 2,
      prompt: 'Wozu dient **Windows LAPS** (Local Administrator Password Solution)?',
      options: ['Für jedes Gerät ein eigenes, zufälliges und regelmäßig erneuertes Passwort des lokalen Administrators zu verwalten', 'Die Bildschirmsperre einzuschalten', 'Festplatten zu verschlüsseln', 'Updates zu verteilen'],
      answer: 0,
      distractors: {
        '1': { why: 'Die Bildschirmsperre wird per Richtlinie gesetzt, nicht mit LAPS.', error: 'laps' },
        '2': { why: 'Das macht BitLocker.', error: 'laps' },
        '3': { why: 'Das ist Aufgabe von WSUS/Intune/Windows Update for Business.', error: 'laps' },
      },
      explanation: 'Gleiche lokale Admin-Passwörter auf allen PCs erlauben einem Angreifer, sich nach einem Treffer im ganzen Netz auszubreiten. LAPS verhindert das.',
    },
    {
      id: 's05-q013', kind: 'multi', skill: 'sich.ap.haertung', difficulty: 2,
      prompt: 'Welche Einstellungen gehören zur Härtung der **Firmware** (UEFI) eines Clients?',
      options: ['UEFI-Administratorpasswort setzen', 'Secure Boot aktivieren', 'Booten nur vom internen Datenträger erlauben', 'TPM 2.0 aktivieren (Voraussetzung für BitLocker mit TPM)', 'Bildschirmhintergrund festlegen'],
      answer: [0, 1, 2, 3],
      explanation: 'Firmware-Härtung verhindert, dass ein Angreifer ein fremdes System startet oder den Bootvorgang manipuliert.',
    },
    {
      id: 's05-q014', kind: 'free', skill: 'sich.ap.haertung', difficulty: 3,
      prompt: 'Ein Mitarbeiter bittet um **lokale Administratorrechte**, „weil er öfter mal Programme installieren muss“. Nehmen Sie Stellung und schlagen Sie eine Alternative vor.',
      modelAnswer: 'Lokale Administratorrechte im Alltag widersprechen dem Least-Privilege-Prinzip: Schadsoftware, die z. B. über einen Mailanhang gestartet wird, liefe mit vollen Rechten, könnte Schutzsoftware deaktivieren, sich dauerhaft einnisten und sich im Netz ausbreiten. Außerdem entstehen unkontrollierte, ungepatchte und unlizenzierte Programme. Die Anfrage sollte daher abgelehnt werden. Alternativen: ein Softwareportal (Self-Service, z. B. Unternehmensportal/Softwarecenter), aus dem freigegebene Programme ohne Adminrechte installiert werden können; Installation durch die IT auf Ticket; falls zwingend nötig, zeitlich befristete Rechteerhöhung mit Protokollierung oder ein separates Admin-Konto nur für diesen Zweck.',
      keywords: ['Least Privilege', 'Schadsoftware', 'Softwareportal', 'Ticket', 'befristet'],
      explanation: 'Nein zu dauerhaften Adminrechten, Ja zu einem geregelten Weg.',
    },
    {
      id: 's05-q015', kind: 'text', skill: 'sich.ap.haertung', difficulty: 1,
      prompt: 'Wie heißt der Sicherheitschip, der bei BitLocker den Schlüssel geschützt speichert und die Integrität des Startvorgangs prüft? (Abkürzung)',
      accept: ['TPM', 'Trusted Platform Module', 'TPM 2.0', 'TPM2'],
      explanation: '**TPM** (Trusted Platform Module), heute meist TPM 2.0 – auch Voraussetzung für Windows 11.',
    },
    {
      id: 's05-q016', kind: 'single', skill: 'sich.ap.haertung', difficulty: 2,
      prompt: 'Am Empfang drucken Mitarbeitende häufig vertrauliche Unterlagen, die dann längere Zeit im Ausgabefach liegen. Welche Maßnahme löst das Problem am besten?',
      options: ['Follow-me-Printing: Der Druck startet erst nach Anmeldung am Gerät per Karte oder PIN', 'Einen schnelleren Drucker kaufen', 'Den Drucker ins Internet stellen', 'Das Papierfach vergrößern'],
      answer: 0,
      distractors: {
        '1': { why: 'Die Geschwindigkeit ändert nichts daran, dass Ausdrucke liegen bleiben.', error: 'follow-me' },
        '2': { why: 'Das wäre ein zusätzliches Sicherheitsrisiko.', error: 'follow-me' },
        '3': { why: 'Das Problem ist die Vertraulichkeit, nicht die Kapazität.', error: 'follow-me' },
      },
      explanation: 'Follow-me-/Secure-Printing gibt den Ausdruck erst frei, wenn die berechtigte Person am Gerät steht.',
    },
    {
      id: 's05-q017', kind: 'match', skill: 'sich.ap.mobil', difficulty: 2,
      prompt: 'Ordne die Betriebsmodelle für mobile Geräte zu.',
      left: ['COBO', 'COPE', 'BYOD'],
      right: ['Firmengerät, ausschließlich dienstliche Nutzung', 'Firmengerät, private Nutzung erlaubt', 'Privatgerät des Mitarbeiters wird dienstlich genutzt'],
      answer: [0, 1, 2],
      explanation: 'Corporate Owned Business Only – Corporate Owned Personally Enabled – Bring Your Own Device.',
    },
    {
      id: 's05-q018', kind: 'single', skill: 'sich.ap.mobil', difficulty: 2,
      prompt: 'Ein BYOD-Smartphone einer ausscheidenden Mitarbeiterin enthält im Arbeitsprofil Firmen-Mails. Was ist datenschutzfreundlich und sicher?',
      options: ['Selektives Löschen nur des Arbeitsprofils/der Firmendaten per MDM', 'Komplettes Zurücksetzen des privaten Geräts ohne Rückfrage', 'Nichts tun, die Mails sind ja schon gelesen', 'Das Gerät einbehalten'],
      answer: 0,
      distractors: {
        '1': { why: 'Private Daten (Fotos, Kontakte) der Mitarbeiterin dürfen nicht einfach gelöscht werden.', error: 'byod-loeschen' },
        '2': { why: 'Firmendaten blieben bei einer Ex-Mitarbeiterin – Risiko für Vertraulichkeit.', error: 'byod-loeschen' },
        '3': { why: 'Das Gerät ist Eigentum der Mitarbeiterin.', error: 'byod-loeschen' },
      },
      explanation: 'Container/Arbeitsprofil ermöglichen das **selektive** Löschen (Selective Wipe) der Firmendaten.',
    },
    {
      id: 's05-q019', kind: 'free', skill: 'sich.ap.mobil', difficulty: 2,
      prompt: 'Eine Mitarbeiterin arbeitet regelmäßig im Zug und im Hotel. Nennen Sie vier Verhaltensregeln bzw. Maßnahmen für sicheres mobiles Arbeiten.',
      modelAnswer: '1. Firmenzugriffe nur über das Firmen-VPN mit MFA; öffentliche WLANs nur mit VPN bzw. besser den Hotspot des Diensthandys nutzen. 2. Blickschutzfilter verwenden und keine vertraulichen Telefonate oder Bildschirminhalte in der Öffentlichkeit. 3. Gerät nie unbeaufsichtigt lassen (auch nicht im Auto), bei Pausen sperren (Win + L). 4. Festplattenverschlüsselung aktiv, Verlust oder Diebstahl sofort der IT melden, damit das Gerät per MDM gesperrt werden kann. 5. Keine fremden USB-Sticks oder Ladekabel an öffentlichen Ladestationen ohne Datenblocker nutzen.',
      keywords: ['VPN', 'öffentliches WLAN', 'Blickschutz', 'unbeaufsichtigt', 'Verlust melden', 'Verschlüsselung'],
      explanation: 'Technik (VPN, Verschlüsselung, MDM) plus Verhalten.',
    },
    {
      id: 's05-q020', kind: 'single', skill: 'sich.ap.mobil', difficulty: 2,
      prompt: 'Ein Kunde möchte, dass seine Mitarbeitenden im Homeoffice per **RDP direkt über das Internet** (Port 3389 in der Firewall freigegeben) auf ihre Büro-PCs zugreifen. Wie bewertest du das?',
      options: ['Abraten: offene RDP-Ports werden massenhaft angegriffen; Zugriff nur über VPN mit MFA oder ein RD-Gateway', 'Unbedenklich, RDP ist verschlüsselt', 'Unbedenklich, wenn der Port auf 3390 geändert wird', 'Nur bedenklich bei Windows 11'],
      answer: 0,
      distractors: {
        '1': { why: 'Verschlüsselung schützt nicht vor Brute-Force-Angriffen auf die Anmeldung und vor Lücken im Dienst selbst.', error: 'rdp-offen' },
        '2': { why: 'Portscanner finden auch geänderte Ports – das ist keine echte Sicherheit.', error: 'rdp-offen' },
        '3': { why: 'Das Risiko besteht unabhängig von der Windows-Version.', error: 'rdp-offen' },
      },
      explanation: 'Öffentlich erreichbares RDP ist ein häufiger Einstieg für Ransomware-Gruppen. Richtig: VPN + MFA oder Remote-Desktop-Gateway mit MFA.',
    },
    {
      id: 's05-q021', kind: 'table', skill: 'sich.ap.entsorgung', difficulty: 2,
      prompt: 'Trage zu jedem Datenträger den Kennbuchstaben der **Materialklasse** nach DIN 66399 ein (P, F, O, T, H, E).',
      columns: [{ key: 'm', label: 'Materialklasse', type: 'text' }],
      rows: [
        { label: 'Ausgedruckte Gehaltsliste', cells: { m: { answer: 'P' } } },
        { label: 'Festplatte (HDD) eines alten PCs', cells: { m: { answer: 'H' } } },
        { label: 'USB-Stick', cells: { m: { answer: 'E' } } },
        { label: 'DVD mit Projektdaten', cells: { m: { answer: 'O' } } },
        { label: 'LTO-Backupband', cells: { m: { answer: 'T' } } },
      ],
      explanation: 'P Papier · F Film · O optisch · T magnetisch (Bänder, Disketten) · H Festplatten · E elektronisch (SSD, USB, Speicherkarten).',
    },
    {
      id: 's05-q022', kind: 'multi', skill: 'sich.ap.entsorgung', difficulty: 2,
      prompt: 'Welche Verfahren entfernen Daten **zuverlässig** von einer SSD, bevor sie weiterverkauft wird?',
      options: ['Secure Erase/Sanitize über den Controller bzw. die Herstellersoftware', 'Crypto-Erase eines durchgehend verschlüsselten Laufwerks', 'Dateien in den Papierkorb verschieben und diesen leeren', 'Schnellformatierung', 'Physische Vernichtung nach DIN 66399 (wenn das Gerät nicht weiterverwendet werden muss)'],
      answer: [0, 1, 4],
      explanation: 'Papierkorb und Schnellformatierung entfernen nur Verweise; die Daten bleiben wiederherstellbar.',
    },
    {
      id: 's05-q023', kind: 'free', skill: 'sich.ap.entsorgung', difficulty: 2,
      prompt: 'Begründen Sie, warum ein Unternehmen bei der Vernichtung von Datenträgern durch einen Dienstleister ein **Vernichtungsprotokoll** verlangen sollte.',
      modelAnswer: 'Nach der DSGVO muss der Verantwortliche nachweisen können, dass personenbezogene Daten ordnungsgemäß gelöscht wurden (Rechenschaftspflicht, Art. 5 Abs. 2) und dass angemessene TOM getroffen wurden. Das Protokoll bzw. Zertifikat dokumentiert, welche Datenträger (Seriennummern) wann, wie und nach welcher Sicherheitsstufe der DIN 66399 vernichtet wurden. Es dient als Nachweis gegenüber Aufsichtsbehörde, Prüfern und Kunden und hilft, im Streitfall Lücken (z. B. fehlende Geräte) aufzudecken. Zusätzlich ist mit dem Dienstleister ein AV-Vertrag nötig.',
      keywords: ['Nachweis', 'Rechenschaftspflicht', 'Seriennummer', 'DIN 66399', 'AV-Vertrag'],
      explanation: 'Was nicht dokumentiert ist, gilt als nicht geschehen.',
    },
    {
      id: 's05-q024', kind: 'single', skill: 'sich.ap.entsorgung', difficulty: 1,
      prompt: 'Ein Kollege hat auf einer alten HDD alle Dateien gelöscht und den Papierkorb geleert. Kann der PC jetzt bedenkenlos verschenkt werden?',
      options: ['Nein – die Daten sind mit Wiederherstellungstools meist noch lesbar; die Platte muss vollständig überschrieben oder vernichtet werden.', 'Ja, gelöschte Dateien sind endgültig weg.', 'Ja, wenn der PC vorher neu gestartet wurde.', 'Nur, wenn die Platte älter als fünf Jahre ist.'],
      answer: 0,
      distractors: {
        '1': { why: 'Löschen entfernt nur den Verweis im Dateisystem.', error: 'loeschen-unsicher' },
        '2': { why: 'Ein Neustart ändert nichts an den Daten auf der Platte.', error: 'loeschen-unsicher' },
        '3': { why: 'Auch alte Platten lassen sich problemlos auslesen.', error: 'loeschen-unsicher' },
      },
      explanation: 'HDD: vollständiges Überschreiben (z. B. mit Zufallsdaten) oder physische Vernichtung.',
    },
    {
      id: 's05-q025', kind: 'match', skill: 'sich.ap.entsorgung', difficulty: 3,
      prompt: 'Ordne die Schutzklassen der DIN 66399 dem passenden Schutzbedarf zu.',
      left: ['Schutzklasse 1', 'Schutzklasse 2', 'Schutzklasse 3'],
      right: ['normaler Schutzbedarf für interne Daten', 'hoher Schutzbedarf, z. B. personenbezogene oder vertrauliche Daten', 'sehr hoher Schutzbedarf, z. B. streng geheime Unterlagen'],
      answer: [0, 1, 2],
      explanation: 'Die Schutzklassen entsprechen den Schutzbedarfskategorien normal – hoch – sehr hoch.',
    },
    {
      id: 's05-q026', kind: 'free', skill: 'sich.ap.vorfall', difficulty: 2,
      prompt: 'Eine Mitarbeiterin hat versehentlich auf einen Link in einer Phishing-Mail geklickt und ihr Passwort auf der gefälschten Seite eingegeben. Beschreiben Sie, was sie und die IT jetzt tun müssen.',
      modelAnswer: 'Mitarbeiterin: sofort die IT über den Meldeweg informieren (nicht aus Scham warten), ggf. das Passwort direkt selbst ändern, falls das möglich ist. IT: Passwort des Kontos zurücksetzen bzw. erzwingen, aktive Sitzungen und Tokens widerrufen, MFA-Methoden prüfen (wurde eine fremde Methode registriert?), Anmeldeprotokolle auf verdächtige Zugriffe prüfen, Postfachregeln (z. B. Weiterleitungen) kontrollieren, die Phishing-URL bzw. Absender sperren und andere Empfänger der Mail warnen bzw. die Mail aus allen Postfächern entfernen. Falls Daten abgeflossen sein könnten: Datenschutzbeauftragten einbeziehen (Meldepflicht prüfen, 72 h). Vorfall dokumentieren; die Mitarbeiterin für die schnelle Meldung loben (positive Fehlerkultur).',
      keywords: ['sofort melden', 'Passwort zurücksetzen', 'Sitzungen widerrufen', 'Protokolle prüfen', 'Weiterleitung', 'Datenschutzbeauftragter'],
      explanation: 'Schnelle Meldung + schnelle Reaktion begrenzen den Schaden erheblich.',
    },
    {
      id: 's05-q027', kind: 'single', skill: 'sich.ap.vorfall', difficulty: 2,
      prompt: 'Warum ist eine **positive Fehlerkultur** für die Informationssicherheit wichtig?',
      options: ['Weil Mitarbeitende Fehler (z. B. einen Phishing-Klick) nur dann sofort melden, wenn sie keine Bestrafung fürchten – und frühe Meldungen begrenzen den Schaden', 'Weil Fehler dann keine Folgen mehr haben', 'Weil dann keine Schulungen mehr nötig sind', 'Weil die IT dann keine Protokolle mehr braucht'],
      answer: 0,
      distractors: {
        '1': { why: 'Fehler haben weiterhin Folgen – aber sie werden früh erkannt und behandelt.', error: 'fehlerkultur' },
        '2': { why: 'Schulungen bleiben notwendig.', error: 'fehlerkultur' },
        '3': { why: 'Protokolle sind für die Aufklärung weiter nötig.', error: 'fehlerkultur' },
      },
      explanation: 'Wer Angst vor Strafe hat, verschweigt Vorfälle – dann breitet sich ein Angriff unbemerkt aus.',
    },
    {
      id: 's05-q028', kind: 'multi', skill: 'sich.ap.vorfall', difficulty: 1,
      prompt: 'Welche Beobachtungen sollten Mitarbeitende **sofort** der IT melden?',
      options: ['Dateien auf dem Netzlaufwerk haben plötzlich unbekannte Endungen und lassen sich nicht öffnen', 'Kollegen erhalten Mails „von mir“, die ich nicht verschickt habe', 'Ich habe auf einen verdächtigen Link geklickt', 'Ein unbekanntes Gerät steckt am Netzwerkanschluss im Besprechungsraum', 'Die Kaffeemaschine ist leer'],
      answer: [0, 1, 2, 3],
      explanation: 'Alle vier sind typische Anzeichen eines Sicherheitsvorfalls (Ransomware, kompromittiertes Konto, Phishing, Rogue-Gerät).',
    },
    {
      id: 's05-q029', kind: 'free', skill: 'sich.ap.vorfall', difficulty: 2,
      prompt: 'Nennen Sie drei Maßnahmen, mit denen die Elektro Krämer GmbH das **Sicherheitsbewusstsein** ihrer Mitarbeitenden dauerhaft verbessern kann.',
      modelAnswer: '1. Regelmäßige, kurze Awareness-Schulungen (z. B. jährlich verpflichtend, auch als E-Learning) zu Phishing, Passwörtern, Clean Desk und Meldewegen. 2. Simulierte Phishing-Kampagnen mit sofortigem Lerneffekt (Hinweisseite nach dem Klick) und anonymisierter Auswertung. 3. Einweisung neuer Mitarbeitender am ersten Arbeitstag mit Unterschrift unter die IT-Richtlinie. 4. Gut sichtbarer Meldeweg (Phishing-Melde-Button, Notfallnummer auf dem Monitor-Aufkleber) und positive Rückmeldung bei Meldungen. 5. Aktuelle Warnungen per Intranet/Newsletter.',
      keywords: ['Schulung', 'Phishing-Simulation', 'Einweisung', 'Meldeweg', 'regelmäßig'],
      explanation: 'Sensibilisierung ist ein Dauerprozess (BSI-Baustein ORP.3).',
    },
    {
      id: 's05-q030', kind: 'single', skill: 'sich.ap.vorfall', difficulty: 2,
      prompt: 'Ein PC zeigt Anzeichen einer Ransomware-Infektion. Warum soll der Benutzer ihn vom **Netz trennen**, aber möglichst **nicht ausschalten**?',
      options: ['Trennen stoppt die Ausbreitung auf Netzlaufwerke und andere Geräte; im laufenden Arbeitsspeicher können noch Spuren oder Schlüssel für die Analyse liegen', 'Ausschalten beschädigt immer die Hardware', 'Weil die Ransomware sich beim Ausschalten selbst löscht', 'Das Netzwerk ist für die Infektion unerheblich'],
      answer: 0,
      distractors: {
        '1': { why: 'Das Ausschalten beschädigt die Hardware nicht – es vernichtet aber flüchtige Spuren.', error: 'vorfall-reaktion' },
        '2': { why: 'Die Schadsoftware bleibt auf dem Datenträger.', error: 'vorfall-reaktion' },
        '3': { why: 'Ransomware verschlüsselt gezielt erreichbare Netzlaufwerke und verbreitet sich weiter.', error: 'vorfall-reaktion' },
      },
      explanation: 'Isolieren statt ausschalten – sofern die IT bzw. der Notfallplan nichts anderes vorgibt.',
    },
  ],
};
