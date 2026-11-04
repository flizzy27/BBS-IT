import type { Module } from '../types';

/* Belege (eigene, fiktive Texte), die in mehreren Aufgaben verwendet werden */

const DS_MONITOR = `**Beleg – Datenblatt-Auszug Monitor „ViewLine P27Q“:**

| Specification | Value |
|---|---|
| Display | 27-inch (68.6 cm) IPS panel, anti-glare |
| Resolution | 2560 x 1440 (QHD) at 75 Hz |
| Brightness | 350 cd/m² (typ.) |
| Connectivity | 1 x HDMI 2.0, 1 x DisplayPort 1.2, 1 x USB-C (DP Alt Mode, Power Delivery up to 65 W), 2 x USB-A 3.2 Gen 1 |
| Power consumption | 21 W (typical), 0.3 W (standby), 110 W (max., incl. USB-C charging) |
| Ergonomics | Tilt -5° to +20°, height adjustment 130 mm, pivot 90° |
| VESA mount | 100 x 100 mm |
| Package contents | Power cable, HDMI cable, USB-C cable (1 m) – DisplayPort cable sold separately |
| Warranty | 3 years incl. panel, advance replacement |`;

const DS_UPS = `**Beleg – Datenblatt-Auszug USV „ProtectLine 1500“:**

| Specification | Value |
|---|---|
| Topology | Line-interactive |
| Rated power | 1500 VA / 900 W |
| Input voltage range | 160–290 V AC |
| Output sockets | 6 x Schuko: 4 x battery backup + surge protection, 2 x surge protection only |
| Backup time | approx. 11 min at half load (450 W), approx. 3 min at full load (900 W) |
| Battery | 2 x 12 V / 9 Ah, sealed lead-acid, hot-swappable |
| Recharge time | 4 h to 90 % capacity |
| Interfaces | USB (HID), RS-232 |`;

const DS_NAS = `**Beleg – Datenblatt-Auszug NAS „StoreBox 4N“:**

| Specification | Value |
|---|---|
| Drive bays | 4 x 3.5"/2.5" SATA, hot-swappable |
| Supported drives | up to 20 TB per drive (drives not included) |
| Network | 2 x 2.5GbE RJ45 (link aggregation supported) |
| Sequential throughput | up to 590 MB/s read, 450 MB/s write |
| Memory | 4 GB DDR4 (expandable to 16 GB) |
| Power consumption | 32.5 W (access), 12.8 W (HDD hibernation) |
| Operating temperature | 32 °F to 104 °F |
| Relative humidity | 5 % to 95 % RH (non-condensing) |`;

const LOG_SRV = `**Beleg – Auszug aus der Protokolldatei des Linux-Servers „srv-fs01“:**

\`\`\`
2026-11-03 07:58:12 INFO     sshd[2214]: Accepted publickey for backupsvc from 192.168.10.20 port 51512
2026-11-03 08:02:41 WARNING  sshd[2240]: Failed password for invalid user admin from 203.0.113.45 port 50122
2026-11-03 08:02:44 WARNING  sshd[2240]: Failed password for invalid user admin from 203.0.113.45 port 50122
2026-11-03 08:02:47 WARNING  sshd[2240]: Failed password for root from 203.0.113.45 port 50160
2026-11-03 08:02:48 ERROR    sshd[2240]: Maximum authentication attempts exceeded for root from 203.0.113.45 port 50160
2026-11-03 08:15:03 ERROR    backup[3101]: Unable to write to /mnt/nas01/daily: No space left on device
2026-11-03 08:15:03 CRITICAL backup[3101]: Backup job "daily-fileserver" aborted
\`\`\``;

const MAIL_SUPPORT = `**Beleg – E-Mail des Herstellers an die Elektro Krämer GmbH:**

> **Subject:** Ticket #48213 – Unexpected reboots of KX-2428P
>
> Dear Mr Becker,
>
> thank you for contacting Kalyx Networks Support.
>
> We have reviewed the log files you sent us. The issue is caused by a known bug in firmware version 3.2.1, which can lead to unexpected reboots when more than 20 PoE devices are connected.
>
> Please upgrade to firmware version 3.2.4, which is available in our download portal. Before upgrading, back up the current configuration. The update takes approximately 10 minutes, and the switch will restart automatically. We therefore recommend performing the update outside business hours.
>
> If the problem persists after the update, please reply to this e-mail and attach the new log files.
>
> We apologize for any inconvenience caused.
>
> Kind regards,
> Sarah Lin
> Technical Support, Kalyx Networks`;

export const e01: Module = {
  id: 'e01',
  nr: 1,
  area: 'englisch',
  title: 'Englisch im IT-Alltag',
  short: 'Englische Datenblätter, Fehlermeldungen, Anleitungen und Support-E-Mails verstehen und sinngemäß ins Deutsche übertragen.',
  icon: 'Languages',
  relevance: 'ap1',
  prerequisites: [],
  skills: [
    { id: 'en.strategy', module: 'e01', title: 'Englische Fachtexte sinngemäß übersetzen' },
    { id: 'en.vocab', module: 'e01', title: 'IT-Grundwortschatz & False Friends', requires: ['en.strategy'] },
    { id: 'en.datasheet', module: 'e01', title: 'Englische Datenblätter auswerten', requires: ['en.vocab'] },
    { id: 'en.errors', module: 'e01', title: 'Fehlermeldungen & Logs verstehen', requires: ['en.vocab'] },
    { id: 'en.manual', module: 'e01', title: 'Anleitungen & Warnhinweise verstehen', requires: ['en.strategy'] },
    { id: 'en.support', module: 'e01', title: 'Support-E-Mails verstehen & beantworten', requires: ['en.strategy'] },
  ],
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: 'e01-l01',
      title: 'Strategie für Übersetzungsaufgaben',
      minutes: 20,
      relevance: 'ap1',
      skills: ['en.strategy'],
      simple: `In der AP1 bekommst du oft einen kurzen englischen Text (Anleitung, Datenblatt, E-Mail) und sollst ihn auf Deutsch wiedergeben.
Stell dir vor, du erklärst einem Kollegen am Telefon, was in dem Text steht: Du sagst den **Sinn**, nicht jedes Wort einzeln.
Fachwörter wie Router, Firmware oder Update bleiben meistens englisch – so sagt man das auch auf Deutsch.
Zahlen, Einheiten und Gerätenamen schreibst du **genau** ab. Achtung: Im Englischen ist das Komma der Tausender-Trenner (1,500 = 1.500) und der Punkt das Dezimalzeichen (2.5 = 2,5).
**Merke:** Sinngemäß und vollständig übersetzen, Zahlen exakt übernehmen – „must not“ heißt „darf nicht“.`,
      steps: [
        {
          type: 'explain',
          title: 'Was die Prüfung von dir will',
          body: `Englisch kommt in der AP1 nicht als eigenes Fach vor, sondern **eingebettet** in die Handlungssituation: Der Kunde hat ein Gerät mit englischem Handbuch, ein Hersteller schreibt eine Support-E-Mail, eine Fehlermeldung erscheint auf Englisch. Typische Aufträge:

| Auftrag | Was erwartet wird |
|---|---|
| „Übersetzen Sie den Text sinngemäß ins Deutsche.“ | vollständiger, verständlicher deutscher Text – jede Aussage muss drin sein |
| „Geben Sie den Inhalt auf Deutsch wieder.“ / „Fassen Sie zusammen.“ | die Kernaussagen in eigenen Worten, Details nur, wenn sie wichtig sind |
| „Beantworten Sie folgende Fragen zum Text.“ | gezielt einzelne Werte oder Aussagen heraussuchen |
| „Formulieren Sie eine kurze Antwort auf Englisch.“ | einfache, höfliche Sätze – Fehlerfreiheit ist wichtiger als schöner Stil |

**Sinngemäß** heißt: Der deutsche Leser muss danach genau das wissen, was der englische Leser weiß. Punkte gibt es für **Inhalt**, nicht für Eleganz. Eine Wort-für-Wort-Übersetzung klingt oft falsch und verfälscht manchmal sogar den Sinn („Make sure“ ist nicht „Mache sicher“, sondern „Stellen Sie sicher“).

**Vorgehen in fünf Schritten:**

1. **Überfliegen:** Ganzen Text einmal lesen. Was für ein Text ist es (Anleitung, Warnung, E-Mail, Datenblatt)? Worum geht es?
2. **Markieren:** Unbekannte Wörter markieren und aus dem **Zusammenhang** erschließen. Oft hilft das Fachwissen: Bei „The switch will *restart* automatically“ ist klar, was passiert.
3. **Satz für Satz übertragen:** Jeden Satz sinngemäß und in deutscher Satzstellung schreiben (Verb ans Ende im Nebensatz!).
4. **Prüfen:** Zahlen, Einheiten, Modellbezeichnungen, Menüpfade und Befehle **exakt** übernommen? Verneinungen richtig?
5. **Gegenlesen:** Klingt der deutsche Text natürlich und vollständig? Fehlt ein Satz?`,
        },
        {
          type: 'explain',
          title: 'Die typischen Stolperstellen',
          body: `**Modalverben – hier passieren die teuersten Fehler:**

| Englisch | Deutsch | Achtung |
|---|---|---|
| must | muss | Pflicht |
| **must not** / mustn't | **darf nicht** | Verbot – **nicht** „muss nicht“! |
| need not / don't have to | muss nicht, braucht nicht | keine Pflicht |
| should | sollte | Empfehlung |
| may | kann, darf | Möglichkeit oder Erlaubnis |
| will | wird | Zukunft – **nicht** „will“ (= wants) |

**Passiv ist in Anleitungen und Datenblättern sehr häufig:** „The device must be grounded.“ → „Das Gerät muss geerdet werden.“ Du darfst das auch aktiv formulieren („Erden Sie das Gerät.“), solange der Sinn gleich bleibt.

**Zahlen, Daten, Zeiten:**

| Englisch | Deutsch |
|---|---|
| 1,500 users | 1.500 Benutzer (Komma = Tausender-Trenner) |
| 2.5 GHz | 2,5 GHz (Punkt = Dezimalzeichen) |
| 1.2 billion | 1,2 **Milliarden** (billion = Milliarde) |
| 03/11/2026 (USA) | **11. März** 2026 (Monat/Tag/Jahr) |
| 2 a.m. / 9 p.m. | 2 Uhr nachts / 21 Uhr |
| up to 300 Mbit/s | **bis zu** 300 Mbit/s |
| at least 8 GB | **mindestens** 8 GB |
| approx. 10 min | **ca.** 10 min |

**Fachbegriffe:** Begriffe, die im deutschen IT-Alltag üblich sind (Router, Switch, Firmware, Update, Patch, Cloud, Login, Backup, Port), bleiben englisch. Wo es ein gängiges deutsches Wort gibt, nimm es: *case* → Gehäuse, *power supply unit* → Netzteil, *settings* → Einstellungen.

**Anrede:** Anleitungen übersetzt du mit **„Sie“** oder im Infinitiv („Gehäuse öffnen“). Beides ist richtig – bleib nur innerhalb eines Textes einheitlich.`,
        },
        {
          type: 'visual',
          title: 'Dein Werkzeugkasten für Übersetzungen',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Sinn vor Wort', text: 'Erst den Satz verstehen, dann auf Deutsch neu formulieren. „Make sure“ → „Stellen Sie sicher“.', icon: 'Lightbulb' },
                { title: 'Zahlen exakt', text: '1,500 = 1.500; 2.5 = 2,5; billion = Milliarde; US-Datum = Monat/Tag/Jahr.', icon: 'Hash' },
                { title: 'Verbote erkennen', text: 'must not / do not / never = darf nicht / nicht / niemals. Verneinung nie verlieren!', icon: 'Ban' },
                { title: 'Fachbegriffe behalten', text: 'Router, Firmware, Update, Backup bleiben englisch. Case → Gehäuse, settings → Einstellungen.', icon: 'Tags' },
                { title: 'Passiv auflösen', text: '„Files are deleted after 30 days.“ → „Dateien werden nach 30 Tagen gelöscht.“', icon: 'RefreshCcw' },
                { title: 'Vollständig?', text: 'Am Ende Satz für Satz abhaken: Jede Aussage des Originals muss im deutschen Text vorkommen.', icon: 'ListChecks' },
              ],
            },
          },
          caption: 'Diese sechs Regeln reichen für fast jede Übersetzungsaufgabe in der AP1.',
        },
        {
          type: 'example',
          title: 'Ein Hinweis aus dem Router-Handbuch',
          problem: `Die Elektro Krämer GmbH hat einen neuen Router gekauft. Übersetze den Hinweis sinngemäß ins Deutsche:

> *Firmware updates are released approximately every three months. You should install them as soon as possible, because they often fix security vulnerabilities. You must not switch off the router while an update is being installed, as this may damage the device.*`,
          steps: [
            { label: '1. Überfliegen', body: 'Textart: Hinweis aus einem Handbuch. Thema: Firmware-Updates – wie oft, warum installieren, was ist verboten.' },
            { label: '2. Schwierige Stellen markieren', body: '„are released“ (Passiv: werden veröffentlicht), „approximately“ (ungefähr/ca.), „as soon as possible“ (so bald wie möglich), „vulnerabilities“ (Schwachstellen/Sicherheitslücken), „must not“ (darf nicht!), „while … is being installed“ (während … installiert wird), „as“ (hier: da/weil, nicht „als“), „may damage“ (kann beschädigen).' },
            { label: '3. Satz für Satz übertragen', body: 'Satz 1: „Firmware-Updates werden etwa alle drei Monate veröffentlicht.“\nSatz 2: „Sie sollten sie so bald wie möglich installieren, da sie häufig Sicherheitslücken schließen.“\nSatz 3: „Sie dürfen den Router nicht ausschalten, während ein Update installiert wird, da dies das Gerät beschädigen kann.“' },
            { label: '4. Prüfen', body: '„every three months“ = alle drei Monate ✔. „should“ = sollten (Empfehlung) ✔. „must not“ = **dürfen nicht** (Verbot) ✔. „fix“ bei Sicherheitslücken = schließen/beheben ✔.' },
          ],
          result: '**Firmware-Updates werden etwa alle drei Monate veröffentlicht. Sie sollten sie so bald wie möglich installieren, da sie häufig Sicherheitslücken schließen. Während ein Update installiert wird, dürfen Sie den Router nicht ausschalten, da dies das Gerät beschädigen kann.**',
        },
        {
          type: 'check',
          question: {
            id: 'e01-c01', kind: 'single', skill: 'en.strategy', difficulty: 1,
            prompt: `Was bedeutet **„sinngemäß übersetzen“** in einer AP1-Aufgabe?`,
            options: [
              'Jedes englische Wort wird durch genau ein deutsches Wort ersetzt.',
              'Der Inhalt wird vollständig und verständlich auf Deutsch wiedergegeben, auch wenn Satzbau und Wortwahl abweichen.',
              'Es genügt, das Thema des Textes in einem Satz zu nennen.',
              'Alle englischen Fachbegriffe müssen eingedeutscht werden.',
            ],
            answer: 1,
            distractors: {
              '0': { why: 'Wort für Wort entstehen oft falsche oder unverständliche Sätze („Mache sicher“ statt „Stellen Sie sicher“).', error: 'en-wort-fuer-wort' },
              '2': { why: 'Das wäre eine Zusammenfassung des Themas. Beim Übersetzen muss **jede Aussage** des Originals im deutschen Text stehen.' },
              '3': { why: 'Übliche Fachbegriffe wie Router, Firmware oder Update bleiben englisch – so spricht man im deutschen IT-Alltag.' },
            },
            explanation: 'Sinngemäß = gleicher **Inhalt**, aber natürliche deutsche Sätze. Vollständigkeit zählt: Kein Satz, keine Zahl, keine Verneinung darf fehlen.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'e01-c02', kind: 'text', skill: 'en.strategy', difficulty: 1,
            prompt: `Im Datenblatt eines WLAN-Access-Points steht: *„Data rate: **up to** 2,402 Mbit/s“*. Wie übersetzt du **„up to“**?`,
            accept: ['bis zu', 'maximal', 'höchstens', 'max.', 'max'],
            placeholder: 'deutsche Übersetzung',
            explanation: '**„up to“ = „bis zu“** (also ein Höchstwert, kein garantierter Wert). Achte auch auf die Zahl: „2,402“ ist im Englischen **2.402** (zweitausendvierhundertzwei) – das Komma ist der Tausender-Trenner.',
            hints: ['Es geht um eine Obergrenze.'],
          },
        },
        { type: 'practice', title: 'Übersetzungsstrategie üben', questionIds: ['e01-q001', 'e01-q002', 'e01-q003', 'e01-q004', 'e01-q005', 'e01-q006', 'e01-q007'], count: 5, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Sinngemäß und vollständig übersetzen – Punkte gibt es für den Inhalt.',
            'Vorgehen: überfliegen → markieren → Satz für Satz → Zahlen/Verneinungen prüfen → gegenlesen.',
            'must not = darf nicht; need not = muss nicht; should = sollte; will = wird.',
            '1,500 = 1.500; 2.5 = 2,5; billion = Milliarde; US-Datum: Monat/Tag/Jahr.',
            'Übliche Fachbegriffe (Router, Firmware, Update) bleiben englisch.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'e01-l02',
      title: 'IT-Grundwortschatz & False Friends',
      minutes: 20,
      relevance: 'ap1',
      skills: ['en.vocab'],
      simple: `Viele englische IT-Wörter kennst du schon aus dem Alltag: Update, Login, Download.
Gefährlich sind die **False Friends** („falsche Freunde“): Wörter, die wie ein deutsches Wort klingen, aber etwas anderes bedeuten.
Das ist wie bei einer Person, die deinem Kumpel ähnlich sieht – du winkst, aber es ist ein Fremder.
Beispiel: „eventually“ heißt **schließlich**, nicht „eventuell“; „become“ heißt **werden**, nicht „bekommen“.
**Merke:** Klingt ein englisches Wort genau wie ein deutsches, prüfe zweimal, ob es wirklich dasselbe bedeutet.`,
      steps: [
        {
          type: 'explain',
          title: 'Grundwortschatz für Hardware, Software und Netzwerk',
          body: `Diese Wörter tauchen in fast jedem englischen IT-Text auf:

| Englisch | Deutsch | Englisch | Deutsch |
|---|---|---|---|
| device | Gerät | to enable / to disable | aktivieren / deaktivieren |
| **memory** | Arbeitsspeicher (RAM) | to install / to uninstall | installieren / deinstallieren |
| **storage** | Datenspeicher (SSD/HDD), Speicherplatz | to restart / to reboot | neu starten |
| drive | Laufwerk | to shut down | herunterfahren |
| case / chassis | Gehäuse | to plug in / to unplug | einstecken / ausstecken |
| power supply unit (PSU) | Netzteil | to back up / backup | sichern / Sicherung |
| power cord | Netzkabel | to restore | wiederherstellen |
| slot | Steckplatz | to troubleshoot | Fehler suchen und beheben |
| port | Anschluss / Port | to replace | ersetzen, austauschen |
| settings | Einstellungen | issue | Problem, Störung |
| requirement | Anforderung | feature | Funktion, Merkmal |
| permission | Berechtigung | account | Benutzerkonto |
| network share | Netzwerkfreigabe | user | Benutzer |

**memory vs. storage:** Im Englischen ist *memory* fast immer der **Arbeitsspeicher**, *storage* der **dauerhafte Datenspeicher**. „16 GB memory, 512 GB storage“ = 16 GB RAM, 512 GB SSD.`,
        },
        {
          type: 'explain',
          title: 'False Friends – die gefährlichsten Verwechslungen',
          body: `| Englisch | bedeutet | **nicht** | deutsches Wort → englisch |
|---|---|---|---|
| eventually | schließlich, letztendlich | eventuell | eventuell → possibly, perhaps |
| actual / actually | tatsächlich / eigentlich | aktuell | aktuell → current, up to date |
| become | werden | bekommen | bekommen → get, receive |
| to control | steuern, regeln | kontrollieren (prüfen) | kontrollieren → check, monitor |
| sensible | vernünftig | sensibel | sensibel → sensitive |
| also | auch | also (deshalb) | also → so, therefore |
| handy | praktisch, nützlich | Handy | Handy → mobile phone |
| billion | Milliarde | Billion | Billion → trillion |
| will | wird (Zukunft) | will (wollen) | wollen → want |
| map | Karte, zuordnen | Mappe | Mappe → folder |
| notice | Hinweis; bemerken | Notiz | Notiz → note |
| since | seit; da (weil) | – | doppeldeutig: aus dem Zusammenhang |
| once | sobald; einmal | – | „once the LED is green“ = sobald |

**Beispiele aus der Praxis:**

- „The fan speed is **controlled** by the BIOS.“ → Die Lüfterdrehzahl wird vom BIOS **gesteuert**.
- „The **actual** throughput was 640 Mbit/s.“ → Der **tatsächliche** Durchsatz lag bei 640 Mbit/s.
- „**Sensitive** data must be encrypted.“ → **Sensible** (schützenswerte) Daten müssen verschlüsselt werden.
- „If the error persists, you will **eventually** have to replace the drive.“ → Wenn der Fehler bestehen bleibt, musst du das Laufwerk **letztendlich** austauschen.`,
        },
        {
          type: 'visual',
          title: 'False Friends auf einen Blick',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'eventually', text: '= schließlich, letztendlich (nicht: eventuell)', icon: 'Flag' },
                { title: 'actual', text: '= tatsächlich (nicht: aktuell → current)', icon: 'CheckCircle' },
                { title: 'become', text: '= werden (nicht: bekommen → get)', icon: 'TrendingUp' },
                { title: 'to control', text: '= steuern, regeln (prüfen → to check)', icon: 'SlidersHorizontal' },
                { title: 'sensible', text: '= vernünftig (sensibel → sensitive)', icon: 'Brain' },
                { title: 'also', text: '= auch (also/deshalb → so, therefore)', icon: 'Plus' },
                { title: 'billion', text: '= Milliarde (Billion → trillion)', icon: 'Hash' },
                { title: 'will', text: '= wird (Zukunft), nicht „will“', icon: 'Clock' },
              ],
            },
          },
          caption: 'Diese acht False Friends kommen in IT-Texten am häufigsten vor.',
        },
        {
          type: 'example',
          title: 'Ein Satz voller Fallen',
          problem: `Übersetze: *„The actual memory usage will become critical if more than 50 users log in. Eventually, we also had to replace the server.“*`,
          steps: [
            { label: 'Fallen finden', body: '„actual“ (tatsächlich), „memory“ (Arbeitsspeicher), „will become“ (wird … werden), „Eventually“ (schließlich), „also“ (auch), „replace“ (ersetzen).' },
            { label: 'Satz 1', body: '„Die tatsächliche Arbeitsspeicherauslastung wird kritisch, wenn sich mehr als 50 Benutzer anmelden.“ – Falsch wäre: „Die aktuelle Speichernutzung will kritisch bekommen …“' },
            { label: 'Satz 2', body: '„Schließlich mussten wir auch den Server ersetzen.“ – Falsch wäre: „Eventuell mussten wir also den Server …“ (das würde bedeuten, dass es unsicher ist und eine Folgerung ist – beides steht nicht im Original).' },
          ],
          result: '**Die tatsächliche Arbeitsspeicherauslastung wird kritisch, wenn sich mehr als 50 Benutzer anmelden. Schließlich mussten wir auch den Server ersetzen.**',
        },
        {
          type: 'check',
          question: {
            id: 'e01-c03', kind: 'single', skill: 'en.vocab', difficulty: 1,
            prompt: `*„After the training you will **become** a certified administrator.“* – Was bedeutet „become“?`,
            options: ['bekommen', 'werden', 'benötigen', 'beginnen'],
            answer: 1,
            distractors: {
              '0': { why: '„become“ ist ein klassischer False Friend: Es heißt **werden**. „Bekommen“ heißt auf Englisch „get“ oder „receive“.', error: 'en-false-friend' },
              '2': { why: '„benötigen“ heißt „need“ oder „require“.' },
              '3': { why: '„beginnen“ heißt „begin“ oder „start“.' },
            },
            explanation: '„Nach der Schulung **wirst** du ein zertifizierter Administrator.“ – become = werden. Häufiger Fehler: become mit „bekommen“ übersetzen.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'e01-c04', kind: 'single', skill: 'en.vocab', difficulty: 2,
            prompt: `Ein Notebook wird beworben mit: *„16 GB **memory**, 1 TB **storage**“*. Was ist gemeint?`,
            options: [
              '16 GB Arbeitsspeicher (RAM) und 1 TB Datenspeicher (SSD/HDD)',
              '16 GB Datenspeicher und 1 TB Arbeitsspeicher',
              '16 GB Grafikspeicher und 1 TB Cloud-Speicher',
              '16 GB Cache und 1 TB Arbeitsspeicher',
            ],
            answer: 0,
            distractors: {
              '1': { why: 'Genau umgekehrt: *memory* = Arbeitsspeicher, *storage* = dauerhafter Datenspeicher. 1 TB RAM wäre für ein Notebook auch völlig unrealistisch.', error: 'en-false-friend' },
              '2': { why: 'Grafikspeicher hieße „video memory“ oder „VRAM“, Cloud-Speicher „cloud storage“. Davon steht hier nichts.' },
              '3': { why: 'Cache heißt auch im Englischen „cache“.' },
            },
            explanation: 'memory = Arbeitsspeicher (RAM, flüchtig), storage = Datenspeicher (SSD/HDD, dauerhaft). Häufiger Fehler: „Speicher“ für beides verwenden – dann ist die Übersetzung unklar.',
          },
        },
        { type: 'practice', title: 'Wortschatz und False Friends üben', questionIds: ['e01-q008', 'e01-q009', 'e01-q010', 'e01-q011', 'e01-q012', 'e01-q013', 'e01-q014', 'e01-q015'], count: 6, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'memory = Arbeitsspeicher, storage = Datenspeicher, case = Gehäuse, PSU = Netzteil.',
            'to troubleshoot = Fehler suchen und beheben; issue = Problem; permission = Berechtigung.',
            'eventually = schließlich; actual = tatsächlich; become = werden; also = auch.',
            'to control = steuern; sensible = vernünftig (sensibel = sensitive); billion = Milliarde.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'e01-l03',
      title: 'Datenblätter & Spezifikationen lesen',
      minutes: 25,
      relevance: 'ap1',
      skills: ['en.datasheet'],
      simple: `Ein Datenblatt ist wie der Steckbrief eines Geräts: Was kann es, wie viel Strom braucht es, was ist im Karton?
Fast alle Hersteller schreiben Datenblätter auf Englisch. Du musst nicht jedes Wort kennen – du musst die **richtige Zeile** finden.
Achte auf kleine Zusätze: „typ.“ (typischer Wert), „max.“ (Höchstwert), „up to“ (bis zu) und „sold separately“ (nicht im Karton, extra kaufen).
Bei Strom gilt: VA (Scheinleistung) ist nicht dasselbe wie W (Wirkleistung, die echte Leistung).
**Merke:** Lies im Datenblatt immer die Bedingung neben dem Wert mit – „max.“, „typ.“, „at half load“ verändern die Aussage.`,
      steps: [
        {
          type: 'explain',
          title: 'Aufbau eines englischen Datenblatts',
          body: `Datenblätter (*datasheets*, *spec sheets*, *technical specifications*) sind fast immer gleich gegliedert:

| Abschnitt | Typische Angaben |
|---|---|
| General / Overview | model, product type, form factor |
| Interfaces / Connectivity / Ports | Anschlüsse, Anzahl, Standards |
| Performance | throughput, read/write speed, switching capacity, latency |
| Power | input voltage, power consumption, rated power, PoE budget |
| Environmental | operating temperature, storage temperature, relative humidity |
| Physical | dimensions (W x D x H), weight, mounting |
| Package contents | Lieferumfang |
| Warranty / Compliance | Garantie, Normen und Zertifikate (CE, RoHS …) |

**Wichtige Begriffe:**

| Englisch | Deutsch |
|---|---|
| rated power / rated output | Nennleistung |
| power consumption (typical / max. / standby / idle) | Leistungsaufnahme (typisch / maximal / Bereitschaft / Leerlauf) |
| throughput | Datendurchsatz |
| read / write speed | Lese- / Schreibgeschwindigkeit |
| operating temperature | Betriebstemperatur |
| storage temperature | Lagertemperatur (Gerät ausgeschaltet) |
| relative humidity, non-condensing | relative Luftfeuchtigkeit, nicht kondensierend |
| dimensions (W x D x H) | Abmessungen (Breite x Tiefe x Höhe) |
| package contents / in the box | Lieferumfang |
| sold separately / not included | separat erhältlich / nicht enthalten |
| hot-swappable | im laufenden Betrieb austauschbar |
| fanless | lüfterlos |
| rack-mountable, 1U | im Rack montierbar, 1 Höheneinheit |
| expandable to | erweiterbar auf |
| warranty | Garantie (des Herstellers) |
| MTBF (mean time between failures) | mittlere Betriebsdauer zwischen Ausfällen |

**Fallen beim Ablesen:**

- **typ. vs. max.:** Für die Auslegung von Netzteil, USV oder PoE-Budget zählt der **Maximalwert**, für Stromkosten im Alltag eher der typische Wert.
- **VA vs. W:** Bei USVs steht oft „1500 VA / 900 W“. Die **Wirkleistung in W** ist entscheidend, ob die Geräte versorgt werden können.
- **Bedingungen:** „approx. 11 min **at half load**“ gilt nur bei halber Last.
- **Einheiten:** °F statt °C (Umrechnung: °C = (°F − 32) · 5/9), inch statt cm (1 inch = 2,54 cm), lbs statt kg (1 lb ≈ 0,45 kg).
- **warranty:** Das ist die freiwillige **Herstellergarantie**. Die gesetzliche Gewährleistung des Verkäufers gibt es in Deutschland zusätzlich.`,
        },
        {
          type: 'visual',
          title: 'Kleine Wörter, große Wirkung',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'typ. / typical', text: 'Durchschnittswert im normalen Betrieb – nicht für die Auslegung verwenden.', icon: 'Activity' },
                { title: 'max. / maximum', text: 'Höchstwert unter Volllast – maßgeblich für Netzteil, USV, PoE-Budget.', icon: 'ArrowUpToLine' },
                { title: 'up to', text: '„bis zu“ – theoretischer Bestwert, in der Praxis meist weniger.', icon: 'Gauge' },
                { title: 'sold separately', text: 'Nicht im Lieferumfang – muss extra bestellt werden.', icon: 'PackageX' },
                { title: 'hot-swappable', text: 'Austausch im laufenden Betrieb möglich, ohne Herunterfahren.', icon: 'RefreshCw' },
                { title: 'non-condensing', text: 'Luftfeuchte ohne Kondenswasserbildung – sonst drohen Kurzschlüsse.', icon: 'Droplets' },
              ],
            },
          },
          caption: 'Wer diese Zusätze überliest, liest den falschen Wert ab.',
        },
        {
          type: 'example',
          title: 'Reicht das PoE-Budget des Switches?',
          problem: `Am Standort Berlin sollen **12 WLAN-Access-Points** über einen neuen Switch mit Strom versorgt werden (PoE). Laut AP-Datenblatt: *„Max. power draw: 21 W“*.

**Beleg – Datenblatt-Auszug Switch „KX-2428P“:**

| Specification | Value |
|---|---|
| Ports | 24 x 10/100/1000BASE-T RJ45 with PoE+ (IEEE 802.3at), 4 x 10G SFP+ uplink slots |
| PoE budget | 370 W total, max. 30 W per port |
| Switching capacity | 128 Gbps |
| Power consumption | 38 W (no PoE load), 455 W (max., full PoE load) |
| Form factor | 19-inch rack-mountable, 1U |
| Operating temperature | 0 °C to 45 °C (32 °F to 113 °F) |
| Warranty | Limited lifetime warranty |

Reicht das PoE-Budget? Wie viel bleibt übrig?`,
          steps: [
            { label: '1. Richtige Zeile finden', body: '„PoE budget: 370 W total, max. 30 W per port“ → insgesamt stehen **370 W** für alle PoE-Geräte zur Verfügung, ein einzelner Port liefert höchstens 30 W.' },
            { label: '2. Einzelport prüfen', body: 'Ein AP braucht max. 21 W ≤ 30 W pro Port ✔' },
            { label: '3. Gesamtbedarf berechnen', body: '12 APs · 21 W = **252 W**' },
            { label: '4. Mit dem Budget vergleichen', body: '252 W ≤ 370 W ✔ → Reserve: 370 W − 252 W = **118 W**' },
            { label: '5. Sicherheitsbetrachtung', body: 'Manche Switches reservieren pro Port die volle Klassenleistung (bei PoE+ 30 W). Selbst dann gilt: 12 · 30 W = 360 W ≤ 370 W ✔' },
          ],
          result: '**Ja, das PoE-Budget reicht: 252 W Bedarf bei 370 W Budget, es bleiben 118 W Reserve.** Für die USV-Planung zählt die maximale Leistungsaufnahme des Switches mit voller PoE-Last: 455 W.',
        },
        {
          type: 'check',
          question: {
            id: 'e01-c05', kind: 'number', skill: 'en.datasheet', difficulty: 1,
            prompt: `Im Datenblatt des Switches KX-2428P aus dem Beispiel steht: *„Power consumption: 38 W (no PoE load), 455 W (max., full PoE load)“*. Mit welcher Leistung in W musst du rechnen, wenn du die USV für den **voll mit PoE-Geräten belegten** Switch auslegst?`,
            answer: 455,
            unit: 'W',
            misconceptions: [{ answer: '38', error: 'en-datenblatt-zeile', why: '38 W gilt nur **ohne** PoE-Last („no PoE load“). Bei voll belegten PoE-Ports zählt der Maximalwert 455 W.' }],
            explanation: '**455 W.** „max., full PoE load“ = maximal, bei voller PoE-Last. Für die Auslegung von USV oder Stromkreis nimmt man immer den Maximalwert. Häufiger Fehler: den Wert ohne PoE-Last (38 W) ablesen.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'e01-c06', kind: 'text', skill: 'en.datasheet', difficulty: 1,
            prompt: `Was bedeutet **„sold separately“** in einem Datenblatt? (Deutsch, 2–3 Wörter)`,
            accept: ['separat erhältlich', 'separat erhaeltlich', 'getrennt erhältlich', 'einzeln erhältlich', 'separat verkauft', 'nicht im Lieferumfang', 'nicht enthalten', 'extra erhältlich', 'separat zu kaufen', 'muss extra gekauft werden', 'gesondert erhältlich'],
            placeholder: 'z. B. … erhältlich',
            explanation: '**„sold separately“ = separat erhältlich**, also **nicht im Lieferumfang** enthalten. Wichtig für die Bestellung: Dieses Teil musst du zusätzlich einplanen.',
          },
        },
        { type: 'practice', title: 'Englische Datenblätter auswerten', questionIds: ['e01-q016', 'e01-q017', 'e01-q018', 'e01-q019', 'e01-q020', 'e01-q021', 'e01-q022', 'e01-q023', 'e01-q024', 'e01-q025', 'e01-q026', 'e01-q027', 'e01-q028'], count: 6, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Datenblatt-Gliederung: Interfaces, Performance, Power, Environmental, Physical, Package contents, Warranty.',
            'typ. = typisch, max. = Höchstwert (für Auslegung maßgeblich), up to = bis zu.',
            'USV: VA (Scheinleistung) ≠ W (Wirkleistung) – die Watt-Angabe entscheidet.',
            'sold separately / not included = nicht im Lieferumfang.',
            '°C = (°F − 32) · 5/9; 1 inch = 2,54 cm.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'e01-l04',
      title: 'Fehlermeldungen & Logs verstehen',
      minutes: 20,
      relevance: 'ap1',
      skills: ['en.errors'],
      simple: `Fehlermeldungen sind wie die Warnleuchten im Auto: kurz, oft auf Englisch, aber sie sagen dir genau, wo es klemmt.
Meist reichen ein paar Schlüsselwörter: „denied“ (verweigert), „failed“ (fehlgeschlagen), „not found“ (nicht gefunden), „timed out“ (keine Antwort in der Wartezeit).
Ein Log (Protokolldatei) ist wie ein Fahrtenbuch: Jede Zeile hat Zeit, Wichtigkeit (INFO, WARNING, ERROR) und eine Meldung.
Lies zuerst die Zeilen mit ERROR oder CRITICAL – dort steht das eigentliche Problem.
**Merke:** Schlüsselwort finden, Ursache ableiten, dann auf Deutsch in einem klaren Satz erklären.`,
      steps: [
        {
          type: 'explain',
          title: 'Die wichtigsten Schlüsselwörter',
          body: `Fehlermeldungen folgen fast immer dem Muster **Was ging schief + Woran lag es**: *„Unable to connect to server: Connection timed out.“*

| Schlüsselwort | Deutsch | Typische Ursache |
|---|---|---|
| access denied / permission denied | Zugriff verweigert | fehlende Berechtigung (NTFS-/Dateirechte, falsches Konto) |
| invalid credentials / authentication failed | ungültige Anmeldedaten / Anmeldung fehlgeschlagen | falscher Benutzername oder falsches Passwort |
| not found (404) | nicht gefunden | Datei, Seite oder Pfad existiert nicht (Tippfehler?) |
| connection refused | Verbindung abgelehnt | Zielrechner antwortet, aber auf dem Port lauscht kein Dienst (oder eine Firewall lehnt aktiv ab) |
| (request / connection) timed out | Zeitüberschreitung | keine Antwort innerhalb der Wartezeit: Gerät aus, Leitung gestört, Firewall verwirft Pakete |
| host unreachable | Ziel nicht erreichbar | kein Weg zum Ziel (Routing, Gateway, Kabel) |
| could not resolve host / name resolution failed | Name konnte nicht aufgelöst werden | DNS-Problem |
| certificate has expired | Zertifikat ist abgelaufen | Gültigkeitsdatum überschritten |
| no space left on device / disk full | kein Speicherplatz mehr | Datenträger voll |
| quota exceeded | Kontingent überschritten | zugeteilter Speicher/Volumen aufgebraucht |
| out of memory | Arbeitsspeicher erschöpft | zu wenig RAM für den Vorgang |
| file is in use / locked | Datei wird verwendet / gesperrt | ein anderes Programm hat die Datei geöffnet |
| not supported / unsupported | nicht unterstützt | Funktion/Format/Version wird nicht unterstützt |
| deprecated | veraltet, abgekündigt | funktioniert noch, wird aber künftig entfernt – Alternative verwenden |
| corrupted | beschädigt | Datei/Dateisystem fehlerhaft |
| mismatch | stimmt nicht überein | z. B. Passwörter, Prüfsummen, Versionen |
| unable to … / could not … / failed to … | konnte nicht … | Vorgang ist fehlgeschlagen |
| will expire in 3 days | läuft in 3 Tagen ab | Passwort/Lizenz/Zertifikat bald ungültig |`,
        },
        {
          type: 'explain',
          title: 'Eine Logzeile lesen',
          body: `Eine Logzeile ist fast immer gleich aufgebaut:

\`\`\`
2026-11-03 08:15:03  ERROR  backup[3101]: Unable to write to /mnt/nas01/daily: No space left on device
|- Zeitstempel -|  |Level|  |Dienst[PID]|  |---------------- Meldung ------------------------|
\`\`\`

**Log-Level (Schweregrade)** – von unwichtig nach kritisch:

| Level | Bedeutung |
|---|---|
| DEBUG | Detailinfos für Entwickler |
| INFO | normaler Vorgang („Accepted“, „started“) |
| NOTICE | normal, aber bemerkenswert |
| WARNING / WARN | Auffälligkeit, Dienst läuft noch |
| ERROR | Vorgang fehlgeschlagen |
| CRITICAL / FATAL | schwerer Fehler, Dienst oder Job abgebrochen |

Syslog (RFC 5424) kennt acht Stufen von 0 = Emergency bis 7 = Debug; in vielen Programmen siehst du nur die oben genannten.

**Vorgehen:** Nach ERROR/CRITICAL filtern → Zeitpunkt notieren → ein paar Zeilen davor lesen (was passierte direkt vorher?) → Schlüsselwort übersetzen → Ursache und Maßnahme auf Deutsch formulieren.`,
        },
        {
          type: 'visual',
          title: 'Meldung → Ursache',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Access denied', text: 'Zugriff verweigert → Berechtigungen des Kontos prüfen.', icon: 'Lock' },
                { title: 'Connection refused', text: 'Ziel antwortet, aber kein Dienst auf dem Port → Dienst gestartet? Port richtig?', icon: 'XCircle' },
                { title: 'Timed out', text: 'Keine Antwort in der Wartezeit → Gerät an? Leitung? Firewall verwirft?', icon: 'Timer' },
                { title: 'Could not resolve host', text: 'DNS findet den Namen nicht → DNS-Server, Schreibweise prüfen.', icon: 'Globe' },
                { title: 'No space left on device', text: 'Datenträger voll → Speicher freigeben oder erweitern.', icon: 'HardDrive' },
                { title: 'Deprecated', text: 'Veraltet, wird künftig entfernt → auf die empfohlene Alternative umstellen.', icon: 'Archive' },
              ],
            },
          },
          caption: 'Das Schlüsselwort verrät meist schon die Ursache – und damit den nächsten Schritt.',
        },
        {
          type: 'example',
          title: 'Eine Fehlermeldung an die Kollegin erklären',
          problem: `Eine Mitarbeiterin der Buchhaltung bekommt beim Öffnen des Netzlaufwerks diese Meldung und fragt dich, was los ist:

> *„\\\\\\\\srv-fs01\\\\finance is not accessible. You might not have permission to use this network resource. Contact the administrator of this server to find out if you have access permissions. Access is denied.“*

Erkläre ihr auf Deutsch, was die Meldung bedeutet und was du als Nächstes tust.`,
          steps: [
            { label: '1. Schlüsselwörter', body: '„not accessible“ (nicht erreichbar/zugreifbar), „might not have permission“ (möglicherweise keine Berechtigung), „Access is denied“ (Zugriff verweigert).' },
            { label: '2. Ursache ableiten', body: 'Der Server ist erreichbar (sonst käme „network path not found“ oder ein Timeout), aber das Benutzerkonto hat **keine Berechtigung** für die Freigabe „finance“.' },
            { label: '3. Auf Deutsch formulieren', body: '„Der Ordner \\\\\\\\srv-fs01\\\\finance ist für dich nicht zugänglich, weil dein Benutzerkonto dafür keine Berechtigung hat. Der Server selbst funktioniert.“' },
            { label: '4. Maßnahme', body: 'Freigabe- und NTFS-Berechtigungen prüfen: Ist die Mitarbeiterin in der richtigen Gruppe (z. B. „GG_Buchhaltung“)? Nach Freigabe durch die Abteilungsleitung Gruppe zuweisen, dann ab- und wieder anmelden.' },
          ],
          result: '**„Zugriff verweigert“: Der Server ist erreichbar, aber das Benutzerkonto hat keine Berechtigung für die Freigabe. Lösung: Gruppenmitgliedschaft bzw. Berechtigungen prüfen und (nach Freigabe) anpassen.**',
        },
        {
          type: 'check',
          question: {
            id: 'e01-c07', kind: 'single', skill: 'en.errors', difficulty: 2,
            prompt: `Ein \`ping\` an den Drucker liefert viermal: *„Request timed out.“* Was bedeutet das?`,
            options: [
              'Der Drucker hat die Anfrage aktiv abgelehnt.',
              'Innerhalb der Wartezeit kam keine Antwort zurück.',
              'Der Druckername konnte nicht in eine IP-Adresse aufgelöst werden.',
              'Die Anfrage war zu groß und wurde gekürzt.',
            ],
            answer: 1,
            distractors: {
              '0': { why: 'Eine aktive Ablehnung wäre „refused“ oder „rejected“. „Timed out“ heißt: Es kam **gar keine** Antwort.', error: 'en-fehlermeldung' },
              '2': { why: 'Ein DNS-Problem hieße „could not find host“ oder „could not resolve host“. Dann würde ping gar nicht erst senden.', error: 'en-fehlermeldung' },
              '3': { why: '„timed out“ hat nichts mit der Größe zu tun – „time“ steckt im Wort: Die Zeit ist abgelaufen.' },
            },
            explanation: '**timed out = Zeitüberschreitung**: Es kam innerhalb der Wartezeit keine Antwort. Mögliche Ursachen: Drucker aus, Kabel/WLAN gestört, falsche IP, Firewall verwirft ICMP.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'e01-c08', kind: 'text', skill: 'en.errors', difficulty: 1,
            prompt: `Übersetze die Meldung **„Access denied“** ins Deutsche.`,
            accept: ['Zugriff verweigert', 'Zugang verweigert', 'Zugriff abgelehnt', 'Zugriff nicht erlaubt', 'Zugriff verwehrt', 'kein Zugriff'],
            placeholder: 'deutsche Meldung',
            explanation: '**Access denied = Zugriff verweigert.** Ursache ist fast immer eine fehlende Berechtigung des angemeldeten Kontos.',
          },
        },
        { type: 'practice', title: 'Fehlermeldungen und Logs auswerten', questionIds: ['e01-q029', 'e01-q030', 'e01-q031', 'e01-q032', 'e01-q033', 'e01-q034', 'e01-q035', 'e01-q036'], count: 6, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'denied = verweigert, failed = fehlgeschlagen, refused = abgelehnt, timed out = Zeitüberschreitung.',
            'refused: Ziel antwortet, aber kein Dienst auf dem Port; timed out: gar keine Antwort.',
            'deprecated = veraltet/abgekündigt – funktioniert noch, wird aber künftig entfernt.',
            'Logzeile = Zeitstempel + Level + Dienst + Meldung; zuerst ERROR/CRITICAL lesen.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'e01-l05',
      title: 'Handbücher & Installationsanleitungen',
      minutes: 20,
      relevance: 'ap1',
      skills: ['en.manual'],
      simple: `Eine Anleitung ist wie ein Kochrezept: Schritt für Schritt, und jeder Satz ist eine Anweisung („Remove the cover“ = „Entfernen Sie die Abdeckung“).
Wörter wie „first“, „then“, „once“ (sobald) und „finally“ zeigen dir die Reihenfolge.
Warnhinweise haben feste Signalwörter: **DANGER** (Lebensgefahr), **WARNING** (schwere Verletzung möglich), **CAUTION** (leichte Verletzung möglich), **NOTICE** (nur Sachschaden).
Diese Hinweise übersetzt du besonders genau – ein vergessenes „not“ kann teuer oder gefährlich werden.
**Merke:** Anweisungen mit „Sie“ oder im Infinitiv übersetzen, Reihenfolge und Warnstufe exakt übernehmen.`,
      steps: [
        {
          type: 'explain',
          title: 'Anweisungen und Reihenfolge',
          body: `Anleitungen bestehen fast nur aus **Imperativen** (Befehlsform): Das Verb steht vorne, ohne Subjekt.

| Englisch | Deutsch (Sie-Form) | Deutsch (Infinitiv) |
|---|---|---|
| Remove the side panel. | Entfernen Sie die Seitenabdeckung. | Seitenabdeckung entfernen. |
| Do not touch the contacts. | Berühren Sie die Kontakte nicht. | Kontakte nicht berühren. |
| Make sure that … | Stellen Sie sicher, dass … | Sicherstellen, dass … |
| Press and hold the button for 10 seconds. | Halten Sie die Taste 10 Sekunden lang gedrückt. | Taste 10 s gedrückt halten. |

**Wörter für die Reihenfolge:**

| Englisch | Deutsch |
|---|---|
| first, to begin with | zuerst |
| then, next, after that | dann, als Nächstes, danach |
| before / after | bevor / nachdem |
| **once** the LED turns green | **sobald** die LED grün leuchtet |
| until the LED flashes | bis die LED blinkt |
| prior to installation | vor der Installation |
| finally | zum Schluss |

**Weitere typische Wendungen:** *ensure* (sicherstellen), *refer to* (siehe, beachten Sie), *according to* (gemäß), *if applicable* (falls zutreffend), *optional* (optional), *default* (Standard-, Werkseinstellung), *factory reset* (Zurücksetzen auf Werkseinstellungen), *LED is solid / flashes / blinks* (leuchtet dauerhaft / blinkt).`,
        },
        {
          type: 'explain',
          title: 'Warnhinweise und ihre Signalwörter',
          body: `Sicherheitshinweise in Handbüchern nutzen genormte **Signalwörter** (angelehnt an ANSI Z535 und ISO 3864-2). In deutschen Anleitungen findest du dieselbe Abstufung:

| Englisch | Deutsch | Bedeutung |
|---|---|---|
| **DANGER** | GEFAHR | Tod oder schwere Verletzung **tritt ein**, wenn der Hinweis missachtet wird |
| **WARNING** | WARNUNG | Tod oder schwere Verletzung **kann** eintreten |
| **CAUTION** | VORSICHT | leichte oder mittelschwere Verletzung kann eintreten |
| **NOTICE** | HINWEIS / ACHTUNG | **Sachschaden** möglich, keine Verletzungsgefahr |
| NOTE / TIP | Hinweis / Tipp | nützliche Zusatzinformation, keine Gefahr |

**Typische Inhalte:** *electric shock* (Stromschlag), *risk of fire* (Brandgefahr), *hot surface* (heiße Oberfläche), *electrostatic discharge (ESD)* (elektrostatische Entladung), *disconnect from mains power* (vom Stromnetz trennen), *qualified personnel only* (nur durch Fachpersonal), *may result in data loss* (kann zu Datenverlust führen).

Beim Übersetzen gilt: **Signalwort, Gefahr, Folge und Maßnahme** müssen vollständig und exakt drin sein – hier gibt es keinen Spielraum für „ungefähr“.`,
        },
        {
          type: 'visual',
          title: 'Die vier Warnstufen',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'DANGER – GEFAHR', text: 'Tod/schwere Verletzung tritt ein. Höchste Stufe.', icon: 'Skull' },
                { title: 'WARNING – WARNUNG', text: 'Tod/schwere Verletzung möglich.', icon: 'AlertTriangle' },
                { title: 'CAUTION – VORSICHT', text: 'Leichte bis mittlere Verletzung möglich.', icon: 'AlertCircle' },
                { title: 'NOTICE – HINWEIS', text: 'Sachschaden möglich, keine Personengefahr.', icon: 'Info' },
              ],
            },
          },
          caption: 'Je weiter links, desto ernster. NOTICE betrifft nur Geräte und Daten, nicht Menschen.',
        },
        {
          type: 'example',
          title: 'Einen Warnhinweis übersetzen',
          problem: `Aus dem Handbuch eines Servers:

> ***WARNING:** Disconnect all power cords before opening the chassis. The server has redundant power supplies – removing only one power cord does not de-energize the system. Failure to do so may result in electric shock.*`,
          steps: [
            { label: '1. Signalwort', body: 'WARNING → **WARNUNG** (schwere Verletzung oder Tod möglich).' },
            { label: '2. Maßnahme', body: '„Disconnect all power cords before opening the chassis.“ → „Ziehen Sie alle Netzkabel ab, bevor Sie das Gehäuse öffnen.“ – *all* nicht vergessen!' },
            { label: '3. Begründung', body: '„redundant power supplies“ = redundante (doppelt vorhandene) Netzteile; „does not de-energize the system“ = macht das System nicht stromlos.' },
            { label: '4. Folge', body: '„Failure to do so may result in electric shock.“ → „Andernfalls kann es zu einem Stromschlag kommen.“ – „Failure to do so“ ist eine feste Wendung für „Wenn Sie das nicht tun“.' },
          ],
          result: '**WARNUNG: Ziehen Sie alle Netzkabel ab, bevor Sie das Gehäuse öffnen. Der Server hat redundante Netzteile – wird nur ein Netzkabel abgezogen, ist das System nicht stromlos. Andernfalls besteht die Gefahr eines Stromschlags.**',
        },
        {
          type: 'check',
          question: {
            id: 'e01-c09', kind: 'single', skill: 'en.manual', difficulty: 2,
            prompt: `Ein Hinweis im NAS-Handbuch lautet: *„**NOTICE:** Do not remove a drive while its status LED is flashing. This may result in data loss.“* Welche Art von Gefahr beschreibt das Signalwort?`,
            options: [
              'Lebensgefahr durch Stromschlag',
              'Möglicher Sachschaden (hier: Datenverlust), keine Verletzungsgefahr',
              'Leichte Verletzung möglich',
              'Reiner Tipp ohne jede Folge',
            ],
            answer: 1,
            distractors: {
              '0': { why: 'Lebensgefahr würde mit **DANGER** oder **WARNING** gekennzeichnet.', error: 'en-signalwort' },
              '2': { why: 'Leichte Verletzungen kennzeichnet **CAUTION** (Vorsicht).', error: 'en-signalwort' },
              '3': { why: 'Ein reiner Tipp hieße „NOTE“ oder „TIP“. NOTICE warnt vor einem **Schaden** – hier Datenverlust.', error: 'en-signalwort' },
            },
            explanation: '**NOTICE = HINWEIS/ACHTUNG: Sachschaden möglich**, keine Personengefahr. Übersetzung: „Entfernen Sie keine Festplatte, solange ihre Status-LED blinkt. Dies kann zu Datenverlust führen.“',
          },
        },
        { type: 'practice', title: 'Anleitungen und Warnhinweise', questionIds: ['e01-q037', 'e01-q038', 'e01-q039', 'e01-q040', 'e01-q041', 'e01-q042', 'e01-q043'], count: 5, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Imperativ → „Entfernen Sie …“ oder „… entfernen“; einheitlich bleiben.',
            'Reihenfolge: first, then, once (= sobald), until (= bis), finally.',
            'DANGER > WARNING > CAUTION > NOTICE (nur Sachschaden); NOTE/TIP = Zusatzinfo.',
            'Bei Warnhinweisen Signalwort, Gefahr, Folge und Maßnahme vollständig übersetzen.',
          ],
        },
      ],
    },
    /* ------------------------------------------------------------------ */
    {
      id: 'e01-l06',
      title: 'Support-E-Mails & Tickets',
      minutes: 25,
      relevance: 'ap1',
      skills: ['en.support'],
      simple: `Wenn du mit einem ausländischen Hersteller zu tun hast, läuft der Support per E-Mail auf Englisch.
Eine Support-E-Mail ist wie ein Brief vom Arzt: Befund (was ist die Ursache?), Therapie (was sollst du tun?) und „Kommen Sie wieder, wenn …“.
Zum Antworten brauchst du keine schönen Sätze, sondern ein paar feste, höfliche Bausteine: „Thank you for your quick reply“, „Could you please …“, „Kind regards“.
Kurze, einfache Sätze sind besser als lange, fehlerhafte.
**Merke:** Beim Lesen Ursache, Lösung und nächsten Schritt heraussuchen – beim Schreiben Anrede, Bezug, Anliegen, Gruß.`,
      steps: [
        {
          type: 'explain',
          title: 'Support-E-Mails lesen',
          body: `Support-E-Mails sind meistens nach demselben Muster aufgebaut. Suche gezielt nach diesen Teilen:

| Teil | Typische Formulierungen | Was du herausziehst |
|---|---|---|
| Bezug | *Regarding your ticket #48213 …*, *Thank you for contacting us.* | Ticketnummer, Thema |
| Befund | *The issue is caused by …*, *We were able to reproduce …* | **Ursache** |
| Lösung | *Please upgrade to …*, *As a workaround, …* | **Was ist zu tun?** |
| Bedingungen | *Before …*, *We recommend …*, *Make sure …* | Vorbereitung, Zeitpunkt |
| Weiteres Vorgehen | *If the problem persists, …*, *Please reply with …* | **nächster Schritt**, falls es nicht klappt |
| Schluss | *We apologize for the inconvenience.*, *Kind regards* | – |

**Ticket-Wortschatz:**

| Englisch | Deutsch |
|---|---|
| ticket / case / incident | Ticket, Störungsmeldung |
| priority: low / medium / high / critical | Priorität: niedrig / mittel / hoch / kritisch |
| status: open / in progress / **pending** / resolved / closed | offen / in Bearbeitung / **wartend** (meist auf Rückmeldung des Kunden) / gelöst / geschlossen |
| to escalate | eskalieren, an die nächste Support-Ebene weitergeben |
| workaround | Übergangslösung, Umgehungslösung |
| root cause | eigentliche Ursache |
| response time / resolution time | Reaktionszeit / Lösungszeit |
| business hours / business day | Geschäftszeiten / Werktag |
| to persist | weiterhin bestehen |
| to attach / attachment | anhängen / Anhang |`,
        },
        {
          type: 'explain',
          title: 'Kurz und höflich auf Englisch antworten',
          body: `In der Prüfung reicht eine kurze, klar gegliederte Antwort. Nutze diese Bausteine:

| Zweck | Englisch | Deutsch |
|---|---|---|
| Anrede (Name bekannt) | Dear Ms Lin, / Dear Mr Jones, | Sehr geehrte Frau Lin, / Sehr geehrter Herr Jones, |
| Anrede (Name unbekannt) | Dear Sir or Madam, | Sehr geehrte Damen und Herren, |
| Dank | Thank you for your quick reply. | Vielen Dank für Ihre schnelle Antwort. |
| Bezug | Regarding ticket #48213, … / With reference to … | Bezüglich Ticket #48213 … |
| Bitte | Could you please send us …? | Könnten Sie uns bitte … senden? |
| Information | I would like to inform you that … | Ich möchte Ihnen mitteilen, dass … |
| Anhang | Please find attached the log files. | Anbei erhalten Sie die Protokolldateien. |
| Problem schildern | Unfortunately, the problem still occurs. | Leider tritt das Problem weiterhin auf. |
| Entschuldigung | We apologize for the inconvenience. | Wir entschuldigen uns für die Unannehmlichkeiten. |
| Zusage | We will get back to you as soon as possible. | Wir melden uns so bald wie möglich bei Ihnen. |
| Angebot | Please do not hesitate to contact me. | Melden Sie sich gerne jederzeit bei mir. |
| Schluss | I look forward to hearing from you. | Ich freue mich auf Ihre Rückmeldung. |
| Gruß | Kind regards / Best regards | Mit freundlichen Grüßen / Viele Grüße |

**Aufbau einer Antwort:** Anrede → Dank/Bezug → Anliegen in 2–3 kurzen Sätzen → Bitte oder nächster Schritt → Gruß, Name, Firma.

**Zeiten:** *9 a.m.* = 9 Uhr, *6 p.m.* = 18 Uhr, *12 p.m.* = 12 Uhr mittags (noon). Gib bei internationalen Kontakten die Zeitzone an (*CET* = MEZ, *CEST* = MESZ).`,
        },
        {
          type: 'visual',
          title: 'Bausteine für Support-Mails',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Ursache', text: '„The issue is caused by …“ – hier steht der Befund.', icon: 'Search' },
                { title: 'Lösung', text: '„Please upgrade to …“, „As a workaround …“ – was du tun sollst.', icon: 'Wrench' },
                { title: 'Falls nicht', text: '„If the problem persists …“ – nächster Schritt, wenn es nicht klappt.', icon: 'RotateCcw' },
                { title: 'Bitten', text: '„Could you please …?“ – höflich und eindeutig.', icon: 'HelpCircle' },
                { title: 'Anhang', text: '„Please find attached …“ – Anbei erhalten Sie …', icon: 'Paperclip' },
                { title: 'Gruß', text: '„Kind regards“ = Mit freundlichen Grüßen.', icon: 'Mail' },
              ],
            },
          },
          caption: 'Mit diesen sechs Bausteinen kannst du fast jede Support-Mail lesen und beantworten.',
        },
        {
          type: 'example',
          title: 'Support-Mail auswerten und beantworten',
          problem: `${MAIL_SUPPORT}

1. Fasse die E-Mail für deinen Ausbilder auf Deutsch zusammen.
2. Antworte kurz auf Englisch: Das Update ist für Freitag, 18 Uhr geplant.`,
          steps: [
            { label: '1. Ursache finden', body: '„The issue is caused by a known bug in firmware version 3.2.1“ → bekannter Fehler in Firmware 3.2.1; Auslöser: mehr als 20 PoE-Geräte → unerwartete Neustarts.' },
            { label: '2. Lösung und Bedingungen', body: 'Update auf 3.2.4 (Download-Portal); vorher Konfiguration sichern; Dauer ca. 10 min, automatischer Neustart → außerhalb der Geschäftszeiten durchführen.' },
            { label: '3. Weiteres Vorgehen', body: '„If the problem persists …“ → Falls das Problem weiterhin besteht: auf die Mail antworten und neue Logdateien anhängen.' },
            { label: '4. Zusammenfassung (Deutsch)', body: '„Der Hersteller hat unsere Logdateien geprüft. Die Neustarts kommen von einem bekannten Fehler in Firmware 3.2.1, der auftritt, wenn mehr als 20 PoE-Geräte angeschlossen sind. Wir sollen auf Version 3.2.4 aktualisieren und vorher die Konfiguration sichern. Das Update dauert ca. 10 Minuten, der Switch startet automatisch neu – daher außerhalb der Arbeitszeit. Besteht das Problem danach weiter, sollen wir antworten und neue Logdateien mitschicken.“' },
            { label: '5. Antwort (Englisch)', body: '„Dear Ms Lin,\nthank you for your quick reply and the detailed analysis. We have scheduled the firmware update to version 3.2.4 for Friday at 6 p.m. CET. We will back up the configuration beforehand. If the problem persists, we will send you the new log files.\nKind regards,\nTim Becker\nElektro Krämer GmbH“' },
          ],
          result: '**Ursache: bekannter Firmware-Fehler (3.2.1) bei mehr als 20 PoE-Geräten. Lösung: Update auf 3.2.4 außerhalb der Arbeitszeit, vorher Konfiguration sichern. Falls weiter Probleme: antworten und neue Logs anhängen.** Die Antwort folgt dem Muster Anrede → Dank → Anliegen → nächster Schritt → Gruß.',
        },
        {
          type: 'check',
          question: {
            id: 'e01-c10', kind: 'single', skill: 'en.support', difficulty: 1,
            prompt: `Was bedeutet *„**Please find attached** the updated configuration file.“*?`,
            options: [
              'Bitte suchen Sie die aktualisierte Konfigurationsdatei.',
              'Anbei erhalten Sie die aktualisierte Konfigurationsdatei.',
              'Bitte hängen Sie die aktualisierte Konfigurationsdatei an.',
              'Die Konfigurationsdatei wurde nicht gefunden.',
            ],
            answer: 1,
            distractors: {
              '0': { why: '„Please find attached“ ist eine feste Wendung und heißt **„Anbei erhalten Sie“** – niemand soll etwas suchen.', error: 'en-wort-fuer-wort' },
              '2': { why: 'Die Bitte, etwas anzuhängen, hieße „Please attach …“.' },
              '3': { why: '„not found“ kommt in dem Satz gar nicht vor.' },
            },
            explanation: '**„Please find attached …“ = „Anbei erhalten Sie …“** – die Datei hängt an der E-Mail. Häufiger Fehler: wörtlich „Bitte finden Sie …“ übersetzen.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'e01-c11', kind: 'text', skill: 'en.support', difficulty: 1,
            prompt: `Wie lautet die übliche deutsche Entsprechung der Grußformel **„Kind regards“** in einer geschäftlichen E-Mail?`,
            accept: ['Mit freundlichen Grüßen', 'Mit freundlichen Gruessen', 'Freundliche Grüße', 'Freundliche Gruesse', 'Viele Grüße', 'Viele Gruesse', 'MfG', 'Beste Grüße', 'Herzliche Grüße'],
            placeholder: 'Grußformel',
            explanation: '**Kind regards ≈ Mit freundlichen Grüßen.** „Best regards“ ist etwas lockerer (≈ Viele Grüße/Beste Grüße). Beides ist im Geschäftsverkehr üblich.',
          },
        },
        { type: 'practice', title: 'Support-Kommunikation auf Englisch', questionIds: ['e01-q044', 'e01-q045', 'e01-q046', 'e01-q047', 'e01-q048', 'e01-q049', 'e01-q050', 'e01-q051', 'e01-q052'], count: 6, difficulty: 2 },
        {
          type: 'summary',
          points: [
            'Support-Mail lesen: Bezug → Ursache (caused by) → Lösung → Bedingungen → If the problem persists …',
            'pending = wartend (meist auf Kundenrückmeldung); workaround = Übergangslösung; to escalate = eskalieren.',
            'Antwort: Anrede → Dank/Bezug → Anliegen kurz → nächster Schritt → Kind regards.',
            'Please find attached = Anbei erhalten Sie; Could you please … = Könnten Sie bitte …',
            '6 p.m. = 18 Uhr; business hours = Geschäftszeiten.',
          ],
        },
      ],
    },
  ],

  /* ==================================================================== */
  questions: [
    /* ---------------- Lektion 1: Strategie ---------------- */
    {
      id: 'e01-q001', kind: 'free', skill: 'en.strategy', difficulty: 2,
      prompt: `Ein Cloud-Anbieter schickt der Elektro Krämer GmbH folgenden Hinweis. Übersetze ihn **sinngemäß ins Deutsche**:

> *Your data is automatically backed up to our cloud storage every night at 2 a.m. Backups are kept for 30 days. Within this period, deleted files can be restored by the user at any time via the web portal. Please note that files larger than 5 GB are not included in the backup.*`,
      modelAnswer: 'Ihre Daten werden jede Nacht um 2 Uhr automatisch in unserem Cloud-Speicher gesichert. Die Sicherungen werden 30 Tage lang aufbewahrt. Innerhalb dieses Zeitraums kann der Benutzer gelöschte Dateien jederzeit über das Webportal wiederherstellen. Bitte beachten Sie, dass Dateien, die größer als 5 GB sind, nicht in der Sicherung enthalten sind (nicht gesichert werden).',
      keywords: ['automatisch gesichert', 'jede Nacht', '2 Uhr', '30 Tage', 'aufbewahrt', 'wiederherstellen', 'Webportal', 'größer als 5 GB', 'nicht gesichert'],
      explanation: `Musterübersetzung siehe oben. **Stolperstellen:**
- „is backed up“ / „are kept“ / „can be restored“: **Passiv** → „werden gesichert“, „werden aufbewahrt“, „können wiederhergestellt werden“ (aktiv umformulieren ist erlaubt).
- „2 a.m.“ = **2 Uhr nachts**, nicht 14 Uhr (das wäre 2 p.m.).
- „kept“ = aufbewahrt (nicht „gekippt“ oder „behalten“ im Sinne von besitzen).
- „Please note“ = **„Bitte beachten Sie“**.
- „not included“ = **nicht enthalten** – hier: Diese Dateien werden gar nicht gesichert. Häufiger Fehler: „nicht inklusive“ schreiben und es als „kostet extra“ verstehen.`,
      hints: ['Achte auf die Passivsätze.', 'a.m. = vormittags/nachts, p.m. = nachmittags/abends.'],
    },
    {
      id: 'e01-q002', kind: 'single', skill: 'en.strategy', difficulty: 1,
      prompt: `Wie übersetzt du: *„You **must not** disconnect the device during the update.“*?`,
      options: [
        'Sie dürfen das Gerät während des Updates nicht trennen.',
        'Sie müssen das Gerät während des Updates nicht trennen.',
        'Sie müssen das Gerät während des Updates trennen.',
        'Sie sollten das Gerät nach dem Update trennen.',
      ],
      answer: 0,
      distractors: {
        '1': { why: '„must not“ ist ein **Verbot** = „darf nicht“. „Muss nicht“ (keine Pflicht) hieße „need not“ oder „don’t have to“.', error: 'en-must-not' },
        '2': { why: 'Damit hast du die Verneinung „not“ verloren – das verkehrt die Anweisung ins Gegenteil.', error: 'en-must-not' },
        '3': { why: '„should“ und „after“ kommen im Satz nicht vor; „during“ heißt „während“.' },
      },
      explanation: '**must not = darf nicht** (Verbot). Wer „muss nicht“ übersetzt, macht aus einem Verbot eine Erlaubnis – im Ernstfall wird das Gerät beim Update beschädigt.',
      hints: ['Ist das ein Verbot oder eine fehlende Pflicht?'],
    },
    {
      id: 'e01-q003', kind: 'number', skill: 'en.strategy', difficulty: 1,
      prompt: `Im Lizenzvertrag einer Software steht: *„This license covers up to **1,500** named users.“* Für wie viele Benutzer gilt die Lizenz höchstens?`,
      answer: 1500,
      unit: 'Benutzer',
      misconceptions: [{ answer: '1.5', error: 'en-zahlformat', why: 'Im Englischen ist das Komma der **Tausender-Trenner**: 1,500 = 1.500 (eintausendfünfhundert), nicht 1,5.' }],
      explanation: '**1.500 Benutzer.** Englisch: Komma = Tausender-Trenner, Punkt = Dezimalzeichen. Deutsch genau umgekehrt. „up to“ = bis zu, also höchstens.',
      hints: ['Welche Rolle spielt das Komma in englischen Zahlen?'],
    },
    {
      id: 'e01-q004', kind: 'number', skill: 'en.strategy', difficulty: 2,
      prompt: `In einem englischen Marktbericht steht: *„Cloud providers processed **1.2 billion** support requests last year.“* Gib die Anzahl in **Millionen** an.`,
      answer: 1200,
      unit: 'Mio.',
      misconceptions: [{ answer: '1200000', error: 'en-false-friend', why: '„billion“ ist ein False Friend: Es bedeutet **Milliarde** (10⁹), nicht Billion (10¹²). 1.2 billion = 1,2 Milliarden = 1.200 Millionen. Die deutsche Billion heißt auf Englisch „trillion“.' }],
      explanation: `**1.200 Millionen.**
1. Der Punkt in „1.2“ ist das englische Dezimalzeichen → 1,2.
2. billion = **Milliarde** → 1,2 Milliarden.
3. 1 Milliarde = 1.000 Millionen → 1,2 · 1.000 = **1.200 Millionen**.
Häufiger Fehler: billion = Billion – dann kämen 1.200.000 Millionen heraus.`,
      hints: ['billion = 1.000.000.000', '1 Milliarde = 1.000 Millionen'],
    },
    {
      id: 'e01-q005', kind: 'single', skill: 'en.strategy', difficulty: 2,
      prompt: `Ein US-Softwarehersteller kündigt an: *„The maintenance is scheduled for **03/11/2026**.“* Wann findet die Wartung statt?`,
      options: ['am 11. März 2026', 'am 3. November 2026', 'am 3. Januar 2026', 'in der 11. Kalenderwoche 2026'],
      answer: 0,
      distractors: {
        '1': { why: 'In den USA steht der **Monat zuerst**: MM/DD/YYYY. 03/11 = März, 11. Tag. Das deutsche Format TT.MM.JJJJ führt hier in die Irre.', error: 'en-datum-us' },
        '2': { why: 'Die 11 steht für den Tag, nicht für einen Monat oder eine Woche.', error: 'en-datum-us' },
        '3': { why: 'Kalenderwochen werden anders geschrieben (z. B. „week 11“ oder „CW 11“).' },
      },
      explanation: '**11. März 2026.** US-Datumsformat: Monat/Tag/Jahr. In Großbritannien dagegen Tag/Monat/Jahr – im Zweifel nachfragen oder das ISO-Format (2026-03-11) verwenden.',
      hints: ['In den USA steht der Monat vorne.'],
    },
    {
      id: 'e01-q006', kind: 'order', skill: 'en.strategy', difficulty: 1,
      prompt: 'Bringe die Arbeitsschritte für eine Übersetzungsaufgabe in die sinnvolle Reihenfolge.',
      items: [
        'Ganzen Text überfliegen: Textart und Thema erkennen',
        'Unbekannte Wörter markieren und aus dem Zusammenhang erschließen',
        'Satz für Satz sinngemäß auf Deutsch formulieren',
        'Zahlen, Einheiten, Bezeichnungen und Verneinungen mit dem Original abgleichen',
        'Deutschen Text gegenlesen: vollständig und verständlich?',
      ],
      explanation: 'Erst verstehen (überfliegen, markieren), dann übertragen (Satz für Satz), dann kontrollieren (Zahlen/Verneinungen) und zum Schluss gegenlesen. Häufiger Fehler: sofort Wort für Wort loslegen – dann fehlt der Zusammenhang.',
    },
    {
      id: 'e01-q007', kind: 'free', skill: 'en.strategy', difficulty: 2,
      prompt: `Ein Mitazubi übersetzt den Satz *„Make sure that the device is grounded before you open the case.“* so:

> „Mache sicher, dass das Gerät geerdet ist, bevor du den Fall öffnest.“

Verbessere die Übersetzung und erkläre **zwei Fehler**.`,
      modelAnswer: 'Richtig: „Stellen Sie sicher, dass das Gerät geerdet ist, bevor Sie das Gehäuse öffnen.“ Fehler 1: „Make sure“ ist eine feste Wendung und bedeutet „sicherstellen“, nicht wörtlich „sicher machen“. Fehler 2: „case“ bedeutet im IT-Kontext „Gehäuse“, nicht „Fall“. (Zusätzlich: In Anleitungen wird üblicherweise gesiezt oder der Infinitiv verwendet.)',
      keywords: ['Stellen Sie sicher', 'Gehäuse', 'feste Wendung', 'Kontext', 'geerdet'],
      explanation: 'Beide Fehler entstehen durch Wort-für-Wort-Übersetzung. Feste Wendungen (*make sure, please note, failure to do so*) übersetzt man als Ganzes. Mehrdeutige Wörter (*case* = Fall/Gehäuse/Koffer) entscheidet der **Fachkontext**.',
      hints: ['Was bedeutet „case“ bei einem PC?'],
    },

    /* ---------------- Lektion 2: Wortschatz & False Friends ---------------- */
    {
      id: 'e01-q008', kind: 'match', skill: 'en.vocab', difficulty: 1,
      prompt: 'Ordne die englischen Begriffe ihrer deutschen Bedeutung zu.',
      left: ['device', 'power supply unit', 'to enable', 'to troubleshoot', 'requirement', 'permission'],
      right: ['Gerät', 'Netzteil', 'aktivieren', 'Fehler suchen und beheben', 'Anforderung', 'Berechtigung'],
      answer: [0, 1, 2, 3, 4, 5],
      explanation: 'device = Gerät; power supply unit (PSU) = Netzteil; to enable = aktivieren (Gegenteil: to disable); to troubleshoot = Fehler suchen und beheben; requirement = Anforderung; permission = Berechtigung.',
    },
    {
      id: 'e01-q009', kind: 'match', skill: 'en.vocab', difficulty: 2,
      prompt: 'Ordne jedem **False Friend** seine richtige deutsche Bedeutung zu.',
      left: ['eventually', 'actual', 'become', 'sensible', 'also', 'handy'],
      right: ['schließlich', 'tatsächlich', 'werden', 'vernünftig', 'auch', 'praktisch'],
      answer: [0, 1, 2, 3, 4, 5],
      explanation: 'eventually = schließlich (nicht eventuell); actual = tatsächlich (nicht aktuell); become = werden (nicht bekommen); sensible = vernünftig (sensibel = sensitive); also = auch (nicht „also“ = deshalb); handy = praktisch (das Mobiltelefon heißt „mobile phone“).',
    },
    {
      id: 'e01-q010', kind: 'single', skill: 'en.vocab', difficulty: 1,
      prompt: `Wie übersetzt du: *„**Eventually**, the update was installed successfully.“*?`,
      options: [
        'Eventuell wurde das Update erfolgreich installiert.',
        'Schließlich wurde das Update erfolgreich installiert.',
        'Gelegentlich wurde das Update erfolgreich installiert.',
        'Sofort wurde das Update erfolgreich installiert.',
      ],
      answer: 1,
      distractors: {
        '0': { why: '„eventually“ ist ein False Friend: Es heißt **schließlich/letztendlich**. „Eventuell“ hieße „possibly“ oder „perhaps“.', error: 'en-false-friend' },
        '2': { why: '„Gelegentlich“ hieße „occasionally“.' },
        '3': { why: '„Sofort“ hieße „immediately“ – eher das Gegenteil von eventually.' },
      },
      explanation: '**eventually = schließlich, letztendlich** (nach einiger Zeit, am Ende). Häufiger Fehler: eventually = eventuell – damit wird aus einer Tatsache eine Vermutung.',
    },
    {
      id: 'e01-q011', kind: 'single', skill: 'en.vocab', difficulty: 2,
      prompt: `Ein Messbericht enthält: *„The **actual** transfer rate was much lower than expected.“* Welche Übersetzung ist richtig?`,
      options: [
        'Die aktuelle Übertragungsrate war viel niedriger als erwartet.',
        'Die tatsächliche Übertragungsrate war viel niedriger als erwartet.',
        'Die erwartete Übertragungsrate war viel niedriger als tatsächlich.',
        'Die durchschnittliche Übertragungsrate war viel niedriger als erwartet.',
      ],
      answer: 1,
      distractors: {
        '0': { why: '„actual“ = **tatsächlich**. „Aktuell“ heißt auf Englisch „current“.', error: 'en-false-friend' },
        '2': { why: 'Hier ist die Aussage umgedreht: Nicht die erwartete, sondern die gemessene (tatsächliche) Rate war niedriger.' },
        '3': { why: '„Durchschnittlich“ hieße „average“.' },
      },
      explanation: '**actual = tatsächlich** (gemessen, real), *actually* = eigentlich/tatsächlich. In Datenblättern liest du oft: „Actual performance may vary“ = Die tatsächliche Leistung kann abweichen.',
    },
    {
      id: 'e01-q012', kind: 'single', skill: 'en.vocab', difficulty: 2,
      prompt: `*„The fan speed is **controlled** by the BIOS.“* – Welche Übersetzung trifft den Sinn?`,
      options: [
        'Die Lüfterdrehzahl wird vom BIOS gesteuert.',
        'Die Lüfterdrehzahl wird vom BIOS überprüft.',
        'Die Lüfterdrehzahl wird vom BIOS begrenzt.',
        'Die Lüfterdrehzahl wird im BIOS angezeigt.',
      ],
      answer: 0,
      distractors: {
        '1': { why: '„to control“ heißt hier **steuern/regeln**. Das deutsche „kontrollieren“ im Sinne von „überprüfen“ heißt „to check“ oder „to monitor“.', error: 'en-false-friend' },
        '2': { why: '„begrenzen“ hieße „to limit“.' },
        '3': { why: '„anzeigen“ hieße „to display“ oder „to show“.' },
      },
      explanation: '**to control = steuern, regeln**: Das BIOS legt fest, wie schnell sich der Lüfter dreht. Häufiger Fehler: „kontrolliert“ schreiben – das klingt nach „überwacht/geprüft“.',
    },
    {
      id: 'e01-q013', kind: 'text', skill: 'en.vocab', difficulty: 1,
      prompt: `In einer Datenschutz-Richtlinie steht: *„**Sensitive data** must be encrypted.“* Wie übersetzt du „sensitive data“? (zwei Wörter)`,
      accept: ['sensible Daten', 'vertrauliche Daten', 'schützenswerte Daten', 'sensitive Daten', 'schutzbedürftige Daten', 'heikle Daten'],
      placeholder: '… Daten',
      misconceptions: [{ answer: 'vernünftige Daten', error: 'en-false-friend', why: '„sensible“ (Englisch) = vernünftig – aber hier steht „sensitive“, und das bedeutet **sensibel, schützenswert**.' }],
      explanation: '**sensitive data = sensible (schützenswerte, vertrauliche) Daten.** Merke das Paar: *sensitive* = sensibel, *sensible* = vernünftig.',
    },
    {
      id: 'e01-q014', kind: 'free', skill: 'en.vocab', difficulty: 2,
      prompt: `Übersetze sinngemäß ins Deutsche und achte auf die False Friends:

> *When you become an administrator, you will also get access to sensitive log files. All new admins have to complete a security training. The training can be done online and actually only takes about 45 minutes.*`,
      modelAnswer: 'Wenn du Administrator wirst, erhältst du auch Zugriff auf sensible Protokolldateien. Alle neuen Admins müssen eine Sicherheitsschulung absolvieren. Die Schulung kann online durchgeführt werden und dauert tatsächlich nur etwa 45 Minuten.',
      keywords: ['wirst', 'auch', 'Zugriff', 'sensible Protokolldateien', 'müssen', 'Sicherheitsschulung', 'online', 'tatsächlich', '45 Minuten'],
      explanation: `**Stolperstellen:**
- „become“ = **werden** (nicht bekommen); „you will get“ = du **bekommst/erhältst** – hier steckt das „bekommen“!
- „also“ = **auch** (nicht „also/deshalb“).
- „sensitive“ = **sensibel/schützenswert**; „log files“ = Protokolldateien (Logdateien geht auch).
- „have to complete“ = **müssen absolvieren/abschließen**.
- „actually“ = **tatsächlich/eigentlich** (nicht aktuell).
- „about 45 minutes“ = etwa/ungefähr 45 Minuten.`,
      hints: ['become, also, sensitive, actually – alles False Friends.'],
    },
    {
      id: 'e01-q015', kind: 'text', skill: 'en.vocab', difficulty: 1,
      prompt: `Im Handbuch gibt es ein Kapitel **„Troubleshooting“**. Was findest du dort? (deutscher Begriff)`,
      accept: ['Fehlersuche', 'Fehlerbehebung', 'Fehlersuche und Fehlerbehebung', 'Fehlersuche und -behebung', 'Problemlösung', 'Problembehebung', 'Störungsbehebung', 'Fehleranalyse', 'Hilfe bei Problemen', 'Fehler suchen und beheben'],
      placeholder: 'deutscher Begriff',
      explanation: '**Troubleshooting = Fehlersuche und -behebung.** Dort stehen typische Probleme mit Ursache und Lösung („Problem – Possible cause – Solution“).',
    },

    /* ---------------- Lektion 3: Datenblätter ---------------- */
    {
      id: 'e01-q016', kind: 'number', skill: 'en.datasheet', difficulty: 1,
      prompt: `${DS_MONITOR}

**What is the maximum power consumption of the monitor in W?**`,
      answer: 110,
      unit: 'W',
      misconceptions: [
        { answer: '21', error: 'en-datenblatt-zeile', why: '21 W ist der **typische** Wert („typical“). Gefragt ist der Maximalwert („max.“).' },
        { answer: '65', error: 'en-datenblatt-zeile', why: '65 W ist die maximale Ladeleistung am USB-C-Anschluss (Power Delivery), nicht die Leistungsaufnahme des Monitors.' },
      ],
      explanation: '**110 W.** Zeile „Power consumption“: 21 W typisch, 0,3 W Standby, **110 W maximal** (inklusive Laden eines Notebooks über USB-C). Häufiger Fehler: den typischen Wert nehmen.',
      hints: ['Suche die Zeile „Power consumption“ und den Zusatz „max.“.'],
    },
    {
      id: 'e01-q017', kind: 'number', skill: 'en.datasheet', difficulty: 1,
      prompt: `${DS_MONITOR}

Ein Mitarbeiter möchte sein Notebook über das USB-C-Kabel am Monitor laden. **Mit welcher Leistung in W kann der Monitor das Notebook höchstens versorgen?**`,
      answer: 65,
      unit: 'W',
      misconceptions: [{ answer: '110', error: 'en-datenblatt-zeile', why: '110 W ist die maximale Leistungsaufnahme des ganzen Monitors. Die Ladeleistung steht bei USB-C: „Power Delivery up to 65 W“.' }],
      explanation: '**65 W.** Zeile „Connectivity“: „USB-C (DP Alt Mode, Power Delivery **up to 65 W**)“. Power Delivery = Stromversorgung über USB-C; up to = bis zu. Ein Notebook mit 90-W-Netzteil würde damit langsamer laden.',
    },
    {
      id: 'e01-q018', kind: 'text', skill: 'en.datasheet', difficulty: 1,
      prompt: `${DS_MONITOR}

Welches Kabel ist **nicht** im Lieferumfang enthalten?`,
      accept: ['DisplayPort-Kabel', 'DisplayPort Kabel', 'DisplayPort', 'DisplayPort cable', 'DP-Kabel', 'DP Kabel', 'DP', 'Displayportkabel'],
      placeholder: 'Kabel',
      explanation: '**Das DisplayPort-Kabel.** Zeile „Package contents“: „DisplayPort cable **sold separately**“ = separat erhältlich. Im Karton sind Netzkabel, HDMI-Kabel und USB-C-Kabel.',
    },
    {
      id: 'e01-q019', kind: 'free', skill: 'en.datasheet', difficulty: 2,
      prompt: `Unter dem Monitor-Datenblatt steht folgende Fußnote. Übersetze sie sinngemäß:

> *Specifications are subject to change without notice. Actual power consumption may vary depending on settings, usage and connected devices.*`,
      modelAnswer: 'Änderungen der technischen Daten ohne vorherige Ankündigung vorbehalten. Die tatsächliche Leistungsaufnahme kann je nach Einstellungen, Nutzung und angeschlossenen Geräten abweichen.',
      keywords: ['Änderungen vorbehalten', 'ohne Ankündigung', 'tatsächliche', 'Leistungsaufnahme', 'abweichen', 'Einstellungen', 'angeschlossene Geräte'],
      explanation: `**Stolperstellen:**
- „subject to change without notice“ ist eine feste Wendung = **„Änderungen ohne vorherige Ankündigung vorbehalten“**. „notice“ = Ankündigung/Mitteilung (nicht „Notiz“).
- „Actual“ = **tatsächlich** (nicht aktuell).
- „may vary“ = kann abweichen/schwanken.
- „depending on“ = abhängig von / je nach.`,
    },
    {
      id: 'e01-q020', kind: 'number', skill: 'en.datasheet', difficulty: 2,
      prompt: `${DS_UPS}

**What is the rated active power (Wirkleistung) of the UPS in W?**`,
      answer: 900,
      unit: 'W',
      misconceptions: [{ answer: '1500', error: 'en-va-statt-w', why: '1500 ist die **Scheinleistung in VA**. Die Wirkleistung steht dahinter: 900 W. Für die Frage, ob die Geräte versorgt werden können, zählt der Watt-Wert.' }],
      explanation: '**900 W.** „Rated power: 1500 VA / 900 W“ – rated = Nenn-. VA = Scheinleistung, W = Wirkleistung. Das Verhältnis 900/1500 = 0,6 ist der Leistungsfaktor. Häufiger Fehler: die größere VA-Zahl als Watt lesen.',
      hints: ['Achte auf die Einheit: VA oder W?'],
    },
    {
      id: 'e01-q021', kind: 'number', skill: 'en.datasheet', difficulty: 2,
      prompt: `${DS_UPS}

**How many output sockets are protected by the battery** (also bei Stromausfall weiter versorgt)?`,
      answer: 4,
      unit: 'Steckdosen',
      misconceptions: [{ answer: '6', error: 'en-datenblatt-zeile', why: 'Die USV hat 6 Steckdosen, aber nur **4** davon sind batteriegestützt („battery backup“). Die anderen 2 haben nur Überspannungsschutz („surge protection only“).' }],
      explanation: '**4 Steckdosen.** „4 x battery backup + surge protection, 2 x surge protection only“: battery backup = Batterieversorgung bei Stromausfall, surge protection = Überspannungsschutz, only = nur. Server, Switch und Router gehören an die batteriegestützten Dosen.',
    },
    {
      id: 'e01-q022', kind: 'number', skill: 'en.datasheet', difficulty: 2,
      prompt: `${DS_UPS}

Wie viele **Minuten** überbrückt die USV laut Datenblatt bei **Volllast** (900 W)?`,
      answer: 3,
      unit: 'min',
      misconceptions: [{ answer: '11', error: 'en-datenblatt-zeile', why: '11 min gelten nur bei **halber Last** („at half load“, 450 W). Bei Volllast („at full load“) sind es ca. 3 min.' }],
      explanation: '**ca. 3 Minuten.** „approx. 3 min at full load (900 W)“. Die Überbrückungszeit (backup time) sinkt mit steigender Last überproportional – deshalb USVs nicht bis an die Grenze auslasten.',
    },
    {
      id: 'e01-q023', kind: 'free', skill: 'en.datasheet', difficulty: 3,
      prompt: `${DS_UPS}

Der Fileserver der Elektro Krämer GmbH nimmt **maximal 420 W** auf. Die Geschäftsführung fragt: „Hält die USV den Server bei Stromausfall mindestens **10 Minuten** am Laufen?“ Beantworte die Frage auf Deutsch anhand des Datenblatts und begründe.`,
      modelAnswer: 'Ja, voraussichtlich knapp. 420 W liegen unter der Wirkleistung von 900 W und auch unter der halben Last von 450 W, für die das Datenblatt ca. 11 Minuten angibt. Bei 420 W ist die Überbrückungszeit also etwas länger als 11 Minuten und damit über 10 Minuten. Allerdings ist das ein ungefährer Herstellerwert („approx.“), und die Akkukapazität nimmt mit dem Alter ab. Die Reserve ist daher gering: Man sollte die Laufzeit testen und den Server über die USB-Schnittstelle automatisch herunterfahren lassen (z. B. nach 5 Minuten).',
      keywords: ['900 W', '450 W', 'halbe Last', '11 Minuten', 'approx.', 'Akkualterung', 'Shutdown', 'USB'],
      explanation: `**Weg:**
1. Leistung prüfen: 420 W ≤ 900 W (rated power in W) ✔ – die USV kann den Server überhaupt versorgen.
2. Passende Zeile: „approx. 11 min at half load (450 W)“ – 420 W < 450 W → Laufzeit etwas **über** 11 min.
3. Einschränkung: „approx.“ = ca.; Akkus altern → Reserve knapp.
4. Empfehlung: Laufzeit testen, automatischen Shutdown über die USB-Schnittstelle einrichten.

Häufiger Fehler: mit 1500 (VA) rechnen oder den Volllast-Wert (3 min) nehmen.`,
      hints: ['Welche Zeile passt zu 420 W – halbe Last oder Volllast?'],
    },
    {
      id: 'e01-q024', kind: 'number', skill: 'en.datasheet', difficulty: 2,
      prompt: `${DS_NAS}

**What is the maximum raw storage capacity of the NAS in TB**, wenn alle Einschübe mit den größten unterstützten Festplatten bestückt werden?`,
      answer: 80,
      unit: 'TB',
      misconceptions: [{ answer: '20', error: 'en-datenblatt-zeile', why: '20 TB gilt **pro Festplatte** („per drive“). Das NAS hat 4 Einschübe: 4 · 20 TB = 80 TB.' }],
      explanation: '**80 TB.** „Drive bays: 4“ und „up to 20 TB per drive“ → 4 · 20 TB = 80 TB Rohkapazität (raw = vor RAID und Dateisystem). Achtung: „drives not included“ – die Festplatten müssen extra bestellt werden.',
      hints: ['bays = Einschübe; per drive = pro Laufwerk'],
    },
    {
      id: 'e01-q025', kind: 'number', skill: 'en.datasheet', difficulty: 1,
      prompt: `${DS_NAS}

Wie hoch ist die maximale sequenzielle **Schreib**geschwindigkeit in MB/s?`,
      answer: 450,
      unit: 'MB/s',
      misconceptions: [{ answer: '590', error: 'en-datenblatt-zeile', why: '590 MB/s ist der **Lese**wert („read“). Schreiben heißt „write“: 450 MB/s.' }],
      explanation: '**450 MB/s.** „up to 590 MB/s read, 450 MB/s write“ – read = lesen, write = schreiben. „up to“ = bis zu, also ein Bestwert unter idealen Bedingungen.',
    },
    {
      id: 'e01-q026', kind: 'number', skill: 'en.datasheet', difficulty: 2,
      prompt: `${DS_NAS}

Wie viel Leistung in W nimmt das NAS auf, wenn die Festplatten im **Ruhezustand** sind?`,
      answer: 12.8,
      unit: 'W',
      misconceptions: [
        { answer: '32.5', error: 'en-datenblatt-zeile', why: '32,5 W gilt beim Zugriff („access“). Ruhezustand der Festplatten heißt „HDD hibernation“: 12,8 W.' },
        { answer: '128', error: 'en-zahlformat', why: 'Der Punkt in „12.8“ ist im Englischen das **Dezimalzeichen**: 12.8 W = 12,8 W.' },
      ],
      explanation: '**12,8 W.** „12.8 W (HDD hibernation)“ – hibernation = Ruhezustand. Den englischen Dezimalpunkt schreibst du auf Deutsch als Komma.',
    },
    {
      id: 'e01-q027', kind: 'number', skill: 'en.datasheet', difficulty: 3,
      prompt: `${DS_NAS}

Das NAS soll in einem Technikraum stehen. Bis zu welcher Raumtemperatur in **°C** darf es laut Datenblatt betrieben werden? Rechne um mit °C = (°F − 32) · 5/9.`,
      answer: 40,
      unit: '°C',
      misconceptions: [{ answer: '104', error: 'en-datenblatt-zeile', why: '104 ist der Wert in **Fahrenheit**. Umgerechnet: (104 − 32) · 5/9 = 40 °C.' }],
      explanation: `**40 °C.**
1. Zeile „Operating temperature: 32 °F to 104 °F“ – Obergrenze 104 °F.
2. 104 − 32 = 72
3. 72 · 5/9 = 40 → **40 °C**.
Kontrolle Untergrenze: (32 − 32) · 5/9 = 0 °C. Betriebsbereich also 0 °C bis 40 °C.`,
      hints: ['Erst 32 abziehen, dann mit 5/9 multiplizieren.'],
    },
    {
      id: 'e01-q028', kind: 'match', skill: 'en.datasheet', difficulty: 1,
      prompt: 'Ordne die Datenblatt-Begriffe ihrer deutschen Bedeutung zu.',
      left: ['rated power', 'throughput', 'package contents', 'sold separately', 'operating temperature', 'non-condensing'],
      right: ['Nennleistung', 'Datendurchsatz', 'Lieferumfang', 'separat erhältlich', 'Betriebstemperatur', 'nicht kondensierend'],
      answer: [0, 1, 2, 3, 4, 5],
      explanation: 'rated power = Nennleistung; throughput = Datendurchsatz; package contents = Lieferumfang; sold separately = separat erhältlich; operating temperature = Betriebstemperatur (im Gegensatz zur storage temperature = Lagertemperatur); non-condensing = nicht kondensierend (keine Kondenswasserbildung).',
    },

    /* ---------------- Lektion 4: Fehlermeldungen & Logs ---------------- */
    {
      id: 'e01-q029', kind: 'match', skill: 'en.errors', difficulty: 2,
      prompt: 'Ordne jeder Fehlermeldung die wahrscheinlichste Ursache zu.',
      left: ['Access is denied.', 'Connection refused', 'Request timed out.', 'Could not resolve host: fileserver.local', 'The certificate has expired.', 'No space left on device'],
      right: [
        'Das Konto hat keine Berechtigung für die Ressource.',
        'Das Ziel antwortet, aber auf dem Port läuft kein Dienst.',
        'Innerhalb der Wartezeit kam keine Antwort zurück.',
        'Der Name konnte per DNS nicht aufgelöst werden.',
        'Das Gültigkeitsdatum des Zertifikats ist überschritten.',
        'Der Datenträger ist voll.',
      ],
      answer: [0, 1, 2, 3, 4, 5],
      explanation: 'denied = verweigert (Berechtigung); refused = abgelehnt (Ziel erreichbar, Port geschlossen bzw. Dienst läuft nicht); timed out = Zeitüberschreitung (keine Antwort); could not resolve = DNS-Problem; expired = abgelaufen; no space left = kein Speicherplatz mehr. Häufiger Fehler: refused und timed out verwechseln – bei refused **antwortet** das Ziel (mit einer Ablehnung).',
    },
    {
      id: 'e01-q030', kind: 'text', skill: 'en.errors', difficulty: 2,
      prompt: `Bei einem Skript erscheint: *„Warning: The parameter -Credential is **deprecated** and will be removed in a future version.“* Was bedeutet „deprecated“? (ein deutsches Wort)`,
      accept: ['veraltet', 'abgekündigt', 'überholt', 'nicht mehr empfohlen', 'missbilligt', 'auslaufend'],
      placeholder: 'deutsches Wort',
      explanation: '**deprecated = veraltet / abgekündigt.** Der Parameter funktioniert **noch**, soll aber nicht mehr verwendet werden, weil er in einer künftigen Version entfernt wird („will be removed in a future version“). Konsequenz: Skript auf die empfohlene Alternative umstellen, bevor es nach einem Update bricht.',
    },
    {
      id: 'e01-q031', kind: 'number', skill: 'en.errors', difficulty: 1,
      prompt: `${LOG_SRV}

Wie viele **fehlgeschlagene Passworteingaben** („Failed password“) enthält der Auszug?`,
      answer: 3,
      misconceptions: [{ answer: '4', error: 'en-fehlermeldung', why: 'Die ERROR-Zeile „Maximum authentication attempts exceeded“ ist keine weitere Passworteingabe, sondern die Meldung, dass die **Höchstzahl an Versuchen überschritten** wurde.' }],
      explanation: '**3.** Die drei WARNING-Zeilen mit „Failed password“ (2 × Benutzer „admin“, 1 × „root“). Danach meldet sshd „Maximum authentication attempts exceeded“ = maximale Anzahl von Anmeldeversuchen überschritten → Verbindung getrennt.',
    },
    {
      id: 'e01-q032', kind: 'text', skill: 'en.errors', difficulty: 1,
      prompt: `${LOG_SRV}

Von welcher **IP-Adresse** kommen die fehlgeschlagenen Anmeldeversuche?`,
      accept: ['203.0.113.45'],
      placeholder: 'IP-Adresse',
      explanation: '**203.0.113.45** – „from 203.0.113.45“. Das ist eine öffentliche Adresse (aus dem Dokumentationsbereich 203.0.113.0/24), also ein Zugriff aus dem Internet, nicht aus dem Firmennetz 192.168.10.0/24.',
    },
    {
      id: 'e01-q033', kind: 'free', skill: 'en.errors', difficulty: 3,
      prompt: `${LOG_SRV}

Deine Ausbilderin bittet dich: „Erklär mir auf Deutsch, was heute Morgen auf dem Server passiert ist, und schlag je eine Maßnahme vor.“`,
      modelAnswer: 'Um 07:58 Uhr hat sich das Backup-Konto „backupsvc“ ordnungsgemäß per Schlüssel angemeldet (normaler Vorgang). Ab 08:02 Uhr hat jemand von der Internet-Adresse 203.0.113.45 aus dreimal versucht, sich per SSH mit falschem Passwort anzumelden – zweimal mit dem nicht existierenden Benutzer „admin“, einmal als „root“. Danach wurde die Höchstzahl an Anmeldeversuchen überschritten und die Verbindung getrennt. Das deutet auf einen automatisierten Angriff (Passwort-Raten/Brute Force) hin. Maßnahmen: SSH nicht aus dem Internet erreichbar machen bzw. per Firewall/VPN beschränken, Root-Login und Passwort-Anmeldung deaktivieren (nur Schlüssel), Sperre nach Fehlversuchen (z. B. fail2ban). Um 08:15 Uhr konnte das Backup nicht auf das NAS schreiben, weil dort kein Speicherplatz mehr frei ist; der Sicherungsauftrag „daily-fileserver“ wurde abgebrochen. Maßnahmen: Speicher auf dem NAS freigeben oder erweitern, Aufbewahrungsregeln prüfen, Sicherung danach manuell nachholen und eine Speicherplatz-Warnung einrichten.',
      keywords: ['Brute Force', '203.0.113.45', 'falsches Passwort', 'root', 'kein Speicherplatz', 'Backup abgebrochen', 'NAS', 'fail2ban', 'Firewall'],
      explanation: `**Vorgehen:** Zuerst die Zeilen mit ERROR/CRITICAL suchen, dann rückwärts lesen.
- „Accepted publickey“ = Anmeldung per Schlüssel akzeptiert (INFO, normal).
- „Failed password for **invalid user** admin“ = falsches Passwort für einen **nicht existierenden** Benutzer → typisch für automatisiertes Raten.
- „Maximum authentication attempts exceeded“ = Höchstzahl an Anmeldeversuchen überschritten.
- „Unable to write … No space left on device“ = konnte nicht schreiben, kein Speicherplatz frei.
- „Backup job … aborted“ = Sicherungsauftrag abgebrochen (CRITICAL!).
Das Backup-Problem ist für den Betrieb das dringendere: Ohne Sicherung droht Datenverlust.`,
      hints: ['Es sind zwei getrennte Vorfälle.', 'invalid user = Benutzer existiert nicht.'],
    },
    {
      id: 'e01-q034', kind: 'free', skill: 'en.errors', difficulty: 2,
      prompt: `Ein Mitarbeiter schickt dir einen Screenshot dieser Meldung. Übersetze sie und sag ihm in einem Satz, was er tun soll:

> *The action can't be completed because the file is open in another program. Close the file and try again.*`,
      modelAnswer: 'Übersetzung: „Die Aktion kann nicht abgeschlossen werden, weil die Datei in einem anderen Programm geöffnet ist. Schließen Sie die Datei und versuchen Sie es erneut.“ Hinweis an den Mitarbeiter: Schließe die Datei in dem anderen Programm (z. B. Word, Excel oder die Vorschau im Explorer) und wiederhole dann den Vorgang.',
      keywords: ['kann nicht abgeschlossen werden', 'weil', 'anderen Programm geöffnet', 'schließen', 'erneut versuchen'],
      explanation: `**Stolperstellen:**
- „can't be completed“ = kann nicht abgeschlossen/ausgeführt werden (Passiv + Verneinung).
- „because“ = weil.
- „is open in another program“ = ist in einem anderen Programm geöffnet.
- „try again“ = erneut versuchen.
Praxis-Tipp: Oft ist es die **Vorschau** im Explorer oder eine Datei, die ein Kollege auf dem Netzlaufwerk geöffnet hat.`,
    },
    {
      id: 'e01-q035', kind: 'single', skill: 'en.errors', difficulty: 1,
      prompt: `Beim Anmelden erscheint: *„Your password **will expire in 3 days**. Do you want to change it now?“* Was bedeutet das?`,
      options: [
        'Das Passwort ist vor 3 Tagen abgelaufen.',
        'Das Passwort läuft in 3 Tagen ab.',
        'Das Passwort wurde vor 3 Tagen geändert.',
        'Das Konto wird in 3 Tagen gelöscht.',
      ],
      answer: 1,
      distractors: {
        '0': { why: '„will expire“ ist **Zukunft** (will = wird). Vergangenheit wäre „expired 3 days ago“.', error: 'en-fehlermeldung' },
        '2': { why: '„geändert“ hieße „changed“. Die Meldung fragt nur, ob du es **jetzt** ändern willst.' },
        '3': { why: 'Vom Löschen („delete“) steht nichts in der Meldung.' },
      },
      explanation: '**will expire in 3 days = läuft in 3 Tagen ab.** „Do you want to change it now?“ = Möchten Sie es jetzt ändern? Achte auf „will“ = wird (Zukunft).',
    },
    {
      id: 'e01-q036', kind: 'single', skill: 'en.errors', difficulty: 2,
      prompt: `Ein Mitarbeiter versucht, per Remotedesktop auf einen Server zuzugreifen. Ein Verbindungstest auf Port 3389 meldet: *„TCP connect to 192.168.10.15:3389 failed: **Connection refused**“*. Was ist die wahrscheinlichste Ursache?`,
      options: [
        'Der Server ist ausgeschaltet.',
        'Der Server ist erreichbar, aber auf Port 3389 nimmt kein Dienst Verbindungen an.',
        'Der Name des Servers konnte nicht aufgelöst werden.',
        'Das Passwort des Mitarbeiters ist falsch.',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Ein ausgeschalteter Server antwortet gar nicht – das ergäbe „timed out“ oder „host unreachable“. „Refused“ heißt: Er hat **aktiv abgelehnt**, ist also an.', error: 'en-fehlermeldung' },
        '2': { why: 'Es wurde direkt eine IP-Adresse verwendet – DNS spielt hier keine Rolle.', error: 'en-fehlermeldung' },
        '3': { why: 'Bis zur Passwortabfrage kommt es gar nicht: Die TCP-Verbindung selbst wurde abgelehnt.' },
      },
      explanation: '**Connection refused = Verbindung abgelehnt**: Der Server ist erreichbar, aber auf dem Port lauscht kein Dienst (Remotedesktop deaktiviert, Dienst gestoppt) oder eine Firewall lehnt aktiv ab. Häufiger Fehler: refused mit timed out verwechseln.',
    },

    /* ---------------- Lektion 5: Handbücher & Anleitungen ---------------- */
    {
      id: 'e01-q037', kind: 'order', skill: 'en.manual', difficulty: 2,
      prompt: `Lies die Anleitung aus dem Handbuch eines PCs und bringe die deutschen Arbeitsschritte in die richtige Reihenfolge.

> *Installing a memory module: First, shut down the computer and disconnect the power cord. Then remove the side panel. Before you touch any components, discharge static electricity by touching an unpainted metal part of the chassis. Open the retaining clips of the memory slot and align the notch of the module with the key in the slot. Press the module firmly into the slot until the clips snap into place. Finally, reattach the side panel, reconnect the power cord and turn on the computer. Check in the BIOS that the full memory is detected.*`,
      items: [
        'Computer herunterfahren und Netzkabel abziehen',
        'Seitenabdeckung entfernen',
        'Unlackiertes Metallteil des Gehäuses berühren, um sich zu entladen',
        'Halteklammern öffnen und Kerbe des Moduls am Steg im Steckplatz ausrichten',
        'Modul fest eindrücken, bis die Klammern einrasten',
        'Abdeckung anbringen, Netzkabel anschließen, Computer einschalten',
        'Im BIOS prüfen, ob der gesamte Arbeitsspeicher erkannt wird',
      ],
      explanation: 'Die Reihenfolgewörter führen dich: **First** (herunterfahren) → **Then** (Abdeckung ab) → **Before you touch any components** (entladen) → Klammern öffnen, ausrichten → eindrücken **until** the clips snap (bis sie einrasten) → **Finally** (zusammenbauen, einschalten) → im BIOS prüfen. Vokabeln: memory module = Arbeitsspeichermodul, retaining clips = Halteklammern, notch = Kerbe, key = Steg/Codierung, detected = erkannt.',
    },
    {
      id: 'e01-q038', kind: 'order', skill: 'en.manual', difficulty: 2,
      prompt: `Lies die Anleitung für ein Firmware-Update des Switches und bringe die deutschen Schritte in die richtige Reihenfolge.

> *Log in to the web interface with an administrator account. Before you start the update, save the current configuration via System > Backup. Once the backup has been downloaded, go to System > Firmware and select the firmware file you obtained from the support portal. Click "Upgrade". Do not turn off the switch until the update is complete – the status LED flashes during the update. The switch restarts automatically. After the restart, log in again and verify the firmware version on the dashboard.*`,
      items: [
        'Mit einem Administratorkonto an der Weboberfläche anmelden',
        'Aktuelle Konfiguration unter System > Backup sichern',
        'Unter System > Firmware die Firmware-Datei auswählen',
        'Auf „Upgrade“ klicken und den Switch nicht ausschalten, solange die LED blinkt',
        'Automatischen Neustart abwarten',
        'Erneut anmelden und Firmware-Version im Dashboard prüfen',
      ],
      explanation: '**Before you start the update** → erst Backup; **Once the backup has been downloaded** (sobald die Sicherung heruntergeladen ist) → Firmware wählen; Upgrade, dabei **do not turn off … until** (nicht ausschalten, bis …); Neustart; **After the restart** → anmelden und **verify** (überprüfen). Häufiger Fehler: „once“ als „einmal“ lesen – hier heißt es **sobald**.',
    },
    {
      id: 'e01-q039', kind: 'match', skill: 'en.manual', difficulty: 2,
      prompt: 'Ordne die Signalwörter aus englischen Handbüchern ihrer Bedeutung zu.',
      left: ['DANGER', 'WARNING', 'CAUTION', 'NOTICE', 'NOTE'],
      right: [
        'Tod oder schwere Verletzung tritt ein, wenn der Hinweis missachtet wird.',
        'Tod oder schwere Verletzung kann eintreten.',
        'Leichte oder mittelschwere Verletzung kann eintreten.',
        'Sachschaden möglich, keine Verletzungsgefahr.',
        'Nützliche Zusatzinformation ohne Gefahr.',
      ],
      answer: [0, 1, 2, 3, 4],
      explanation: 'DANGER (GEFAHR) > WARNING (WARNUNG) > CAUTION (VORSICHT) > NOTICE (HINWEIS/ACHTUNG, nur Sachschaden). NOTE oder TIP sind reine Zusatzinfos. Häufiger Fehler: NOTICE und NOTE gleichsetzen – NOTICE warnt vor einem Schaden.',
    },
    {
      id: 'e01-q040', kind: 'free', skill: 'en.manual', difficulty: 2,
      prompt: `Übersetze den Warnhinweis aus dem Handbuch einer USV sinngemäß ins Deutsche:

> ***CAUTION:** Hot surface. The battery compartment may become hot during operation. Allow the unit to cool down for at least 30 minutes before replacing the battery. Use only batteries of the same type and rating.*`,
      modelAnswer: 'VORSICHT: Heiße Oberfläche. Das Batteriefach kann im Betrieb heiß werden. Lassen Sie das Gerät mindestens 30 Minuten abkühlen, bevor Sie die Batterie austauschen. Verwenden Sie nur Batterien desselben Typs und mit denselben Nennwerten.',
      keywords: ['VORSICHT', 'heiße Oberfläche', 'Batteriefach', 'heiß werden', 'mindestens 30 Minuten', 'abkühlen', 'austauschen', 'gleichen Typs', 'Nennwerte'],
      explanation: `**Stolperstellen:**
- CAUTION = **VORSICHT** (leichte/mittlere Verletzung möglich – hier Verbrennung).
- „may become hot“ = kann heiß **werden** (become = werden, nicht bekommen!).
- „Allow the unit to cool down“ = Lassen Sie das Gerät abkühlen (unit = Gerät, nicht „Einheit“).
- „at least 30 minutes“ = **mindestens** 30 Minuten – Zahl und „mindestens“ exakt übernehmen.
- „replacing“ = austauschen/ersetzen; „rating“ = Nennwerte (Spannung, Kapazität).`,
      hints: ['become ist ein False Friend.', 'unit = Gerät'],
    },
    {
      id: 'e01-q041', kind: 'text', skill: 'en.manual', difficulty: 1,
      prompt: `*„**Press and hold** the reset button for 10 seconds.“* – Wie übersetzt du „press and hold“? (zwei Wörter)`,
      accept: ['gedrückt halten', 'drücken und halten', 'gedrückt lassen', 'drücken und gedrückt halten', 'lange drücken'],
      placeholder: '… halten',
      explanation: '**press and hold = gedrückt halten.** Ganzer Satz: „Halten Sie die Reset-Taste 10 Sekunden lang gedrückt.“ Kurz drücken hieße nur „press“.',
    },
    {
      id: 'e01-q042', kind: 'single', skill: 'en.manual', difficulty: 2,
      prompt: `*„**Once** the status LED turns solid green, the access point is ready for use.“* – Was bedeutet der Satz?`,
      options: [
        'Sobald die Status-LED dauerhaft grün leuchtet, ist der Access Point betriebsbereit.',
        'Wenn die Status-LED einmal grün blinkt, ist der Access Point betriebsbereit.',
        'Die Status-LED leuchtet einmal grün, danach ist der Access Point aus.',
        'Wenn die Status-LED grün wird, muss der Access Point neu gestartet werden.',
      ],
      answer: 0,
      distractors: {
        '1': { why: '„Once“ heißt hier **sobald**, nicht „einmal“. Und „solid“ = dauerhaft leuchtend, nicht blinkend (blinken = flash/blink).', error: 'en-false-friend' },
        '2': { why: '„ready for use“ = betriebsbereit, nicht „aus“.' },
        '3': { why: 'Von einem Neustart („restart“) steht nichts im Satz.' },
      },
      explanation: '**once = sobald** (am Satzanfang mit Bedingung), **solid = dauerhaft leuchtend**, **ready for use = betriebsbereit**. In Anleitungen ist der Unterschied zwischen „solid“ und „flashing“ oft der Unterschied zwischen „fertig“ und „noch beschäftigt“.',
    },
    {
      id: 'e01-q043', kind: 'free', skill: 'en.manual', difficulty: 3,
      prompt: `Übersetze den Abschnitt aus dem Handbuch eines Druckers sinngemäß ins Deutsche:

> *Before you connect the printer to the network, make sure that DHCP is enabled on your router. Connect the printer to a free network port using the supplied Ethernet cable. The printer obtains an IP address automatically. To print a network configuration page, press and hold the Info button for 3 seconds. If no IP address is shown, refer to the Troubleshooting section.*`,
      modelAnswer: 'Bevor Sie den Drucker mit dem Netzwerk verbinden, stellen Sie sicher, dass DHCP auf Ihrem Router aktiviert ist. Schließen Sie den Drucker mit dem mitgelieferten Ethernet-Kabel an einen freien Netzwerkanschluss an. Der Drucker bezieht automatisch eine IP-Adresse. Um eine Netzwerkkonfigurationsseite zu drucken, halten Sie die Info-Taste 3 Sekunden lang gedrückt. Wird keine IP-Adresse angezeigt, lesen Sie den Abschnitt „Fehlerbehebung“.',
      keywords: ['stellen Sie sicher', 'DHCP aktiviert', 'mitgelieferten', 'Netzwerkanschluss', 'bezieht automatisch', 'IP-Adresse', 'gedrückt halten', '3 Sekunden', 'Fehlerbehebung'],
      explanation: `**Stolperstellen:**
- „make sure that“ = **stellen Sie sicher, dass**.
- „enabled“ = aktiviert.
- „supplied“ = **mitgeliefert** (nicht „versorgt“).
- „port“ = Anschluss/Port; „obtains“ = bezieht/erhält.
- „press and hold … for 3 seconds“ = 3 Sekunden lang gedrückt halten.
- „If no IP address is shown“ = Wenn keine IP-Adresse angezeigt wird.
- „refer to“ = siehe / lesen Sie; „Troubleshooting“ = Fehlerbehebung.
Fachbegriffe wie DHCP, Router, Ethernet bleiben unverändert.`,
    },

    /* ---------------- Lektion 6: Support-E-Mails & Tickets ---------------- */
    {
      id: 'e01-q044', kind: 'free', skill: 'en.support', difficulty: 2,
      prompt: `${MAIL_SUPPORT}

Fasse die E-Mail für deinen Ausbilder **auf Deutsch** zusammen: Ursache, Lösung, Vorgehen, weiteres Vorgehen bei Misserfolg.`,
      modelAnswer: 'Ursache: Die unerwarteten Neustarts des Switches KX-2428P kommen von einem bekannten Fehler in der Firmware-Version 3.2.1. Er tritt auf, wenn mehr als 20 PoE-Geräte angeschlossen sind. Lösung: Update auf Firmware 3.2.4 aus dem Download-Portal des Herstellers. Vorgehen: Vorher die aktuelle Konfiguration sichern. Das Update dauert ca. 10 Minuten, der Switch startet danach automatisch neu – deshalb außerhalb der Geschäftszeiten durchführen. Falls das Problem danach weiter besteht, auf die E-Mail antworten und die neuen Logdateien anhängen.',
      keywords: ['bekannter Fehler', 'Firmware 3.2.1', 'mehr als 20 PoE-Geräte', 'Update auf 3.2.4', 'Konfiguration sichern', '10 Minuten', 'Neustart', 'außerhalb der Geschäftszeiten', 'Logdateien'],
      explanation: `**Gesucht waren vier Infos – so findest du sie:**
- Ursache: „The issue is **caused by** a known bug …“
- Lösung: „Please **upgrade to** firmware version 3.2.4“
- Vorgehen: „**Before** upgrading, back up …“, „takes approximately 10 minutes“, „**recommend** performing the update outside business hours“
- Misserfolg: „**If the problem persists** … reply … attach the new log files“
Häufiger Fehler: Versionsnummern verwechseln (3.2.1 = fehlerhaft, 3.2.4 = Lösung).`,
      hints: ['Suche nach „caused by“, „please“, „before“ und „if“.'],
    },
    {
      id: 'e01-q045', kind: 'text', skill: 'en.support', difficulty: 1,
      prompt: `${MAIL_SUPPORT}

Auf welche **Firmware-Version** soll aktualisiert werden?`,
      accept: ['3.2.4', 'v3.2.4', 'Version 3.2.4', 'Firmware 3.2.4', 'Firmware-Version 3.2.4'],
      placeholder: 'z. B. 1.0.0',
      misconceptions: [{ answer: '3.2.1', error: 'en-datenblatt-zeile', why: '3.2.1 ist die **fehlerhafte** Version („known bug in firmware version 3.2.1“). Aktualisiert werden soll auf 3.2.4.' }],
      explanation: '**3.2.4** – „Please upgrade to firmware version 3.2.4“. Die Version 3.2.1 ist die aktuell installierte, fehlerhafte Version.',
    },
    {
      id: 'e01-q046', kind: 'number', skill: 'en.support', difficulty: 1,
      prompt: `${MAIL_SUPPORT}

Wie viele **Minuten** soll das Update ungefähr dauern?`,
      answer: 10,
      unit: 'min',
      explanation: '**ca. 10 Minuten** – „The update takes approximately 10 minutes“. approximately = ungefähr, ca. Plane trotzdem ein größeres Wartungsfenster ein (Backup, Neustart, Kontrolle).',
    },
    {
      id: 'e01-q047', kind: 'single', skill: 'en.support', difficulty: 1,
      prompt: `Was bedeutet in der Support-Mail der Satz *„**If the problem persists** after the update, please reply to this e-mail.“*?`,
      options: [
        'Falls das Problem nach dem Update weiterhin besteht, antworten Sie bitte auf diese E-Mail.',
        'Falls das Problem nach dem Update gelöst ist, antworten Sie bitte auf diese E-Mail.',
        'Falls das Update nicht startet, rufen Sie bitte an.',
        'Falls Sie das Update vor dem Problem durchführen, antworten Sie bitte.',
      ],
      answer: 0,
      distractors: {
        '1': { why: '„to persist“ = **weiterhin bestehen, andauern** – also das Gegenteil von „gelöst“ (resolved).' },
        '2': { why: 'Weder „start“ noch „call“ kommen im Satz vor; „reply to this e-mail“ = auf diese E-Mail antworten.' },
        '3': { why: '„after the update“ = nach dem Update.' },
      },
      explanation: '**persist = weiterhin bestehen.** Diese Formel steht in fast jeder Support-Mail und sagt dir den nächsten Schritt, falls die Lösung nicht hilft.',
    },
    {
      id: 'e01-q048', kind: 'match', skill: 'en.support', difficulty: 2,
      prompt: 'Ordne die englischen E-Mail-Formulierungen ihrer deutschen Entsprechung zu.',
      left: ['We apologize for the inconvenience.', 'Could you please send us the log files?', 'Please find attached the invoice.', 'We will get back to you as soon as possible.', 'I look forward to hearing from you.', 'Dear Sir or Madam,'],
      right: [
        'Wir entschuldigen uns für die Unannehmlichkeiten.',
        'Könnten Sie uns bitte die Logdateien senden?',
        'Anbei erhalten Sie die Rechnung.',
        'Wir melden uns so bald wie möglich bei Ihnen.',
        'Ich freue mich auf Ihre Rückmeldung.',
        'Sehr geehrte Damen und Herren,',
      ],
      answer: [0, 1, 2, 3, 4, 5],
      explanation: 'Das sind feste Wendungen – übersetze sie als Ganzes, nicht Wort für Wort. „Please find attached“ ≠ „Bitte finden Sie“; „get back to you“ = sich wieder bei Ihnen melden; „look forward to“ = sich freuen auf.',
    },
    {
      id: 'e01-q049', kind: 'free', skill: 'en.support', difficulty: 3,
      prompt: `${MAIL_SUPPORT}

Schreibe als Tim Becker (Elektro Krämer GmbH) eine **kurze Antwort auf Englisch** (4–6 Sätze): Du bedankst dich, teilst mit, dass das Update erfolgreich war, die Neustarts aber **weiterhin** auftreten (zuletzt heute um 10:40 Uhr), und dass du die neuen Logdateien anhängst. Bitte um eine schnelle Rückmeldung.`,
      modelAnswer: `Dear Ms Lin,
thank you for your quick reply regarding ticket #48213. We upgraded the switch to firmware version 3.2.4 yesterday evening, and the update was successful. Unfortunately, the switch still restarts unexpectedly – the last reboot occurred today at 10:40 a.m. Please find attached the new log files. Could you please look into the issue as soon as possible?
Kind regards,
Tim Becker
Elektro Krämer GmbH`,
      keywords: ['Dear Ms Lin', 'thank you', 'ticket #48213', 'firmware version 3.2.4', 'unfortunately', 'still', '10:40 a.m.', 'please find attached', 'log files', 'Could you please', 'Kind regards'],
      explanation: `**Prüfliste für deine Antwort:**
1. Anrede mit Namen: „Dear Ms Lin,“
2. Dank + Bezug (Ticketnummer)
3. Sachstand: Update auf 3.2.4 erfolgreich
4. Problem: „Unfortunately, the switch **still** restarts …“ mit Zeitangabe (10:40 a.m.)
5. Anhang: „Please find attached the new log files.“
6. Bitte: „Could you please …?“
7. Gruß: „Kind regards“, Name, Firma
Kurze, einfache Sätze sind besser als lange. Häufiger Fehler: deutsche Satzstellung („Today at 10:40 restarted the switch again“) – im Englischen gilt Subjekt – Verb – Objekt.`,
      hints: ['Muster: Anrede → Dank/Bezug → Sachstand → Anhang → Bitte → Gruß'],
    },
    {
      id: 'e01-q050', kind: 'single', skill: 'en.support', difficulty: 3,
      prompt: `Im Wartungsvertrag (SLA) eines Herstellers steht:

> *Priority 2 (High): Response within 4 business hours. Business hours: Monday to Friday, 8 a.m. to 6 p.m. CET.*

Die Elektro Krämer GmbH meldet am **Freitag um 4 p.m.** einen Priority-2-Fall. Bis wann muss der Hersteller spätestens reagieren?`,
      options: ['Freitag, 18:00 Uhr', 'Freitag, 20:00 Uhr', 'Montag, 10:00 Uhr', 'Montag, 12:00 Uhr'],
      answer: 2,
      distractors: {
        '0': { why: 'Bis 18 Uhr sind nur 2 Geschäftsstunden vergangen – es fehlen noch 2.', error: 'en-geschaeftszeiten' },
        '1': { why: '20 Uhr liegt außerhalb der Geschäftszeiten („business hours“ enden um 6 p.m. = 18 Uhr). Diese Zeit zählt nicht.', error: 'en-geschaeftszeiten' },
        '3': { why: 'Dann hättest du 4 Stunden ab Montag 8 Uhr gerechnet und die 2 Stunden vom Freitag vergessen.', error: 'en-geschaeftszeiten' },
      },
      explanation: `**Montag, 10:00 Uhr.**
1. 4 p.m. = 16 Uhr, 6 p.m. = 18 Uhr.
2. Freitag 16–18 Uhr = **2** Geschäftsstunden verbraucht.
3. Wochenende zählt nicht (Monday to Friday).
4. Restliche **2** Stunden ab Montag 8 Uhr → **Montag 10 Uhr**.
response = Reaktion (nicht Lösung = resolution). Häufiger Fehler: in Kalenderstunden statt in Geschäftsstunden („business hours“) rechnen.`,
      hints: ['p.m. = nachmittags/abends: 4 p.m. = 16 Uhr', 'Nur Geschäftsstunden zählen.'],
    },
    {
      id: 'e01-q051', kind: 'number', skill: 'en.support', difficulty: 1,
      prompt: `Ein Cloud-Anbieter kündigt an: *„Scheduled maintenance will start at **9 p.m.** CET.“* Um wie viel Uhr (24-Stunden-Format, nur die Stunde) beginnt die Wartung?`,
      answer: 21,
      unit: 'Uhr',
      misconceptions: [{ answer: '9', error: 'en-zahlformat', why: '„p.m.“ steht für nachmittags/abends (post meridiem). 9 p.m. = 9 + 12 = **21 Uhr**. 9 Uhr morgens wäre 9 a.m.' }],
      explanation: '**21 Uhr.** p.m. = nach 12 Uhr mittags → 9 + 12 = 21. a.m. = vor 12 Uhr mittags. Sonderfälle: 12 a.m. = 0 Uhr (Mitternacht), 12 p.m. = 12 Uhr (Mittag). CET = MEZ.',
    },
    {
      id: 'e01-q052', kind: 'single', skill: 'en.support', difficulty: 2,
      prompt: `Im Ticketsystem des Herstellers steht dein Ticket auf **„Pending – awaiting customer response“**. Was bedeutet das?`,
      options: [
        'Das Ticket ist gelöst und geschlossen.',
        'Das Ticket wartet auf eine Rückmeldung von dir (dem Kunden).',
        'Das Ticket wurde an die nächste Support-Ebene eskaliert.',
        'Das Ticket wurde noch von niemandem geöffnet.',
      ],
      answer: 1,
      distractors: {
        '0': { why: 'Gelöst hieße „resolved“, geschlossen „closed“.' },
        '2': { why: 'Eskaliert hieße „escalated“.' },
        '3': { why: 'Ein neues, noch nicht bearbeitetes Ticket hat den Status „new“ oder „open“.' },
      },
      explanation: '**pending = wartend, ausstehend; awaiting customer response = wartet auf Antwort des Kunden.** Der Hersteller arbeitet erst weiter, wenn du antwortest (z. B. Logdateien schickst). In vielen SLAs ist die Uhr in diesem Status angehalten.',
    },
  ],
};
