import type { Module } from '../types';

export const b04: Module = {
  id: 'b04',
  nr: 4,
  area: 'systeme',
  title: 'Cloud & Virtualisierung',
  short: 'Cloud-Merkmale, IaaS/PaaS/SaaS mit Verantwortungsteilung, Public/Private/Hybrid/Community, Datenschutz, Hypervisor Typ 1/2, VM vs. Container, Thin Client/VDI, Snapshots vs. Backups.',
  icon: 'Cloud',
  relevance: 'ap1',
  prerequisites: ['b01'],
  generators: ['sys.vmhost'],
  skills: [
    { id: 'cloud.basics', module: 'b04', title: 'Cloud-Merkmale und Bereitstellungsmodelle' },
    { id: 'cloud.service', module: 'b04', title: 'IaaS, PaaS, SaaS und Verantwortungsteilung', requires: ['cloud.basics'] },
    { id: 'cloud.eval', module: 'b04', title: 'Cloud bewerten: Kosten, Risiken, Datenschutz', requires: ['cloud.service'] },
    { id: 'virt.basics', module: 'b04', title: 'Virtualisierung und Hypervisor-Typen' },
    { id: 'virt.sizing', module: 'b04', title: 'Virtualisierungshost dimensionieren', requires: ['virt.basics'] },
    { id: 'virt.container', module: 'b04', title: 'Virtuelle Maschinen und Container', requires: ['virt.basics'] },
    { id: 'virt.vdi', module: 'b04', title: 'Thin Client, Terminalserver und VDI', requires: ['virt.basics'] },
    { id: 'virt.snapshot', module: 'b04', title: 'Snapshots und Backups unterscheiden', requires: ['virt.basics'] },
  ],
  lessons: [
    /* ------------------------------------------------------------ */
    {
      id: 'b04-l01',
      title: 'Was ist Cloud Computing? Merkmale und Bereitstellungsmodelle',
      minutes: 20,
      relevance: 'ap1',
      skills: ['cloud.basics'],
      simple: `Cloud Computing ist wie Strom aus der Steckdose: Du baust kein eigenes Kraftwerk, sondern nimmst so viel, wie du brauchst, und zahlst nach Verbrauch. Typisch sind Selbstbedienung, Zugriff über das Netz, gemeinsam genutzte Ressourcen beim Anbieter, schnelles Anpassen nach oben und unten (Elastizität) und Abrechnung nach Messung. Eine Public Cloud teilen sich viele Kunden, eine Private Cloud nutzt nur eine Organisation, die Hybrid Cloud kombiniert beides, und eine Community Cloud teilen sich mehrere Organisationen mit gleichen Anforderungen. On-Premises heißt: Alles läuft im eigenen Haus.

**Merke:** Cloud = IT-Ressourcen nach Bedarf über das Netz, gemessen abgerechnet; Modelle: Public, Private, Hybrid, Community.`,
      steps: [
        {
          type: 'explain',
          title: 'IT-Ressourcen als Dienstleistung',
          body: `**Cloud Computing** heißt: IT-Ressourcen (Rechenleistung, Speicher, Software) werden **über ein Netzwerk als Dienst** bereitgestellt und **nach Bedarf** genutzt und abgerechnet – statt selbst Hardware zu kaufen und zu betreiben.

Die verbreitete Definition des US-Standardisierungsinstituts **NIST** (SP 800-145, auch vom BSI genutzt) nennt **fünf Merkmale**:

| Merkmal | Bedeutung | Beispiel |
|---|---|---|
| **On-Demand Self-Service** | Kunde bucht Ressourcen selbst, ohne Mitarbeiter des Anbieters | VM per Weboberfläche in 2 Minuten anlegen |
| **Broad Network Access** | Zugriff über das Netzwerk mit Standardtechnik | Browser, App, API |
| **Resource Pooling** | Anbieter bündelt Ressourcen für viele Kunden (mandantenfähig) | Tausende Kunden teilen sich ein Rechenzentrum |
| **Rapid Elasticity** | Ressourcen lassen sich schnell vergrößern/verkleinern (skalieren) | Onlineshop im Weihnachtsgeschäft |
| **Measured Service** | Nutzung wird gemessen und abgerechnet (Pay-per-Use) | Abrechnung pro Stunde, GB oder Benutzer |

**Bereitstellungsmodelle (Deployment Models):**

| Modell | Wer nutzt die Infrastruktur? | Beispiel |
|---|---|---|
| **Public Cloud** | viele Kunden gemeinsam, betrieben von einem Anbieter | Microsoft Azure, AWS, Google Cloud, IONOS, Hetzner, Microsoft 365 |
| **Private Cloud** | **ein** Unternehmen allein – im eigenen Rechenzentrum oder exklusiv bei einem Dienstleister | eigene Virtualisierungsplattform mit Self-Service-Portal |
| **Hybrid Cloud** | Kombination aus Private und Public Cloud, die zusammenarbeiten | sensible Daten intern, Webshop und Backups in der Public Cloud |
| **Community Cloud** | mehrere Organisationen mit **gleichen Anforderungen** teilen sich eine Cloud | Kommunen, Hochschulen, Gesundheitswesen |

Gegenstück zur Cloud ist **On-Premises** („im eigenen Haus“): Server stehen im eigenen Serverraum, alles wird selbst betrieben.`,
        },
        {
          type: 'visual',
          title: 'Hybrid Cloud bei der Elektro Krämer GmbH',
          widget: {
            kind: 'topology',
            data: {
              nodes: [
                { id: 'pc', type: 'pc', label: 'Arbeitsplätze', sub: 'Hamburg', x: 90, y: 300 },
                { id: 'srv', type: 'server', label: 'Private Cloud', sub: 'Warenwirtschaft, Fileserver', x: 260, y: 190 },
                { id: 'fw', type: 'firewall', label: 'Firewall', x: 420, y: 190 },
                { id: 'inet', type: 'internet', label: 'Internet', x: 560, y: 190 },
                { id: 'saas', type: 'cloud', label: 'SaaS: Microsoft 365', sub: 'Public Cloud', x: 700, y: 80 },
                { id: 'iaas', type: 'cloud', label: 'IaaS: Webshop-VMs', sub: 'Public Cloud (EU)', x: 700, y: 300 },
              ],
              links: [
                { from: 'pc', to: 'srv' }, { from: 'srv', to: 'fw' }, { from: 'fw', to: 'inet', style: 'wan' },
                { from: 'inet', to: 'saas', style: 'wan' }, { from: 'inet', to: 'iaas', style: 'vpn', label: 'VPN' },
              ],
              zones: [{ label: 'On-Premises / Private', x: 40, y: 120, w: 440, h: 250, color: 'blue' }, { label: 'Public Cloud', x: 610, y: 30, w: 180, h: 340, color: 'green' }],
            },
          },
          caption: 'Hybrid: Kerndaten bleiben intern, Standarddienste und skalierende Systeme laufen in der Public Cloud.',
        },
        {
          type: 'example',
          title: 'Merkmale am Onlineshop erkennen',
          problem: 'Der Onlineshop der Elektro Krämer GmbH läuft auf gemieteten Cloud-Servern. Im November steigen die Zugriffe stark; die IT bucht über das Webportal zwei zusätzliche Server für sechs Wochen und bezahlt nur diese Zeit. Welche Cloud-Merkmale erkennst du?',
          steps: [
            { label: 'Selbst buchen', body: 'Buchung über das Webportal ohne Anruf beim Anbieter → **On-Demand Self-Service**.' },
            { label: 'Kurzfristig mehr', body: 'Zwei Server für die Spitzenzeit → **Rapid Elasticity** (Skalierung).' },
            { label: 'Nur Nutzung zahlen', body: 'Abrechnung der sechs Wochen → **Measured Service**.' },
            { label: 'Gemeinsame Hardware', body: 'Die Server laufen auf einer Plattform, die viele Kunden teilen → **Resource Pooling**.' },
          ],
          result: 'Vier der fünf NIST-Merkmale sind direkt erkennbar; Broad Network Access (Verwaltung über das Internet) kommt hinzu.',
        },
        {
          type: 'check',
          question: {
            id: 'b04-c01', kind: 'single', skill: 'cloud.basics', difficulty: 1,
            prompt: 'Mehrere Krankenhäuser teilen sich eine gemeinsame, nur für sie betriebene Cloud mit gleichen Datenschutzanforderungen. Welches Bereitstellungsmodell ist das?',
            options: ['Community Cloud', 'Public Cloud', 'Private Cloud', 'Hybrid Cloud'],
            answer: 0,
            distractors: { '1': { why: 'Eine Public Cloud steht allen Kunden offen.', error: 'cloud-bereitstellung' }, '2': { why: 'Eine Private Cloud nutzt nur **eine** Organisation.', error: 'cloud-bereitstellung' }, '3': { why: 'Hybrid kombiniert Private und Public Cloud.', error: 'cloud-bereitstellung' } },
            explanation: 'Mehrere Organisationen mit gleichen Anforderungen → **Community Cloud**.',
          },
        },
        { type: 'practice', title: 'Übung: Cloud-Grundlagen', questionIds: ['b04-q001', 'b04-q002', 'b04-q003', 'b04-q004'], count: 4, difficulty: 1 },
        { type: 'summary', points: ['Cloud = IT-Ressourcen als Dienst über das Netz, nach Bedarf, gemessen abgerechnet.', 'NIST: Self-Service, Netzwerkzugriff, Resource Pooling, Elastizität, Measured Service.', 'Public, Private, Hybrid, Community.', 'On-Premises = alles im eigenen Haus.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b04-l02',
      title: 'IaaS, PaaS, SaaS – wer ist wofür verantwortlich?',
      minutes: 25,
      relevance: 'ap1',
      skills: ['cloud.service'],
      simple: `Denk an Pizza: Bei IaaS (Infrastructure as a Service) mietest du die Küche und kochst selbst – der Anbieter stellt Server, Speicher und Netz, du kümmerst dich ab dem Betriebssystem. Bei PaaS (Platform as a Service) bekommst du die eingerichtete Küche samt Ofen; du lieferst nur noch dein Rezept, also deine Anwendung und Daten. Bei SaaS (Software as a Service) wird die fertige Pizza geliefert – du nutzt nur die Software, z. B. Microsoft 365. In jedem Modell bleiben deine Daten und Benutzerkonten in deiner Verantwortung.

**Merke:** IaaS = Infrastruktur, PaaS = Plattform, SaaS = fertige Software; je weiter Richtung SaaS, desto mehr übernimmt der Anbieter (Shared Responsibility).`,
      steps: [
        {
          type: 'explain',
          title: 'Drei Servicemodelle',
          body: `Die Servicemodelle unterscheiden sich darin, **wie viel** der Anbieter übernimmt. Die bekannte „Pizza-Analogie“: selbst backen (On-Premises), Tiefkühlpizza (IaaS), Lieferdienst (PaaS), im Restaurant essen (SaaS).

| Modell | Anbieter stellt bereit | Kunde kümmert sich um | Beispiele |
|---|---|---|---|
| **IaaS** – Infrastructure as a Service | Hardware, Netzwerk, Speicher, **Virtualisierung** | **Betriebssystem**, Middleware, Laufzeitumgebung, Anwendungen, Daten | Azure Virtual Machines, AWS EC2, Hetzner Cloud, IONOS Cloud |
| **PaaS** – Platform as a Service | zusätzlich Betriebssystem, Middleware, Laufzeitumgebung, Datenbank-Engine | **eigene Anwendung** und Daten | Azure App Service, Google App Engine, verwaltete Datenbanken |
| **SaaS** – Software as a Service | die **komplette Anwendung** | Nutzung, **Daten**, Benutzer/Berechtigungen, Konfiguration | Microsoft 365, Salesforce, DATEV-Clouddienste, Webmail |

**Verantwortungsteilung (Shared Responsibility):**

| Schicht | On-Prem | IaaS | PaaS | SaaS |
|---|---|---|---|---|
| Daten, Benutzer & Zugriffsrechte | Kunde | Kunde | Kunde | **Kunde** |
| Anwendung | Kunde | Kunde | Kunde | Anbieter |
| Laufzeit, Middleware | Kunde | Kunde | Anbieter | Anbieter |
| Betriebssystem (Patches!) | Kunde | **Kunde** | Anbieter | Anbieter |
| Virtualisierung | Kunde | Anbieter | Anbieter | Anbieter |
| Server, Speicher, Netzwerk, Rechenzentrum | Kunde | Anbieter | Anbieter | Anbieter |

**Merke:** Für **Daten, Identitäten und Zugriffsrechte** bleibt der Kunde **immer** verantwortlich – auch bei SaaS. Wer bei Microsoft 365 keine Mehr-Faktor-Authentifizierung einschaltet oder Dateien öffentlich teilt, kann sich nicht auf den Anbieter berufen. Ebenso ist eine eigene **Datensicherung** der SaaS-Daten zu prüfen, weil der Anbieter in erster Linie die Verfügbarkeit des Dienstes sichert.

Weitere „as a Service“-Begriffe: **FaaS/Serverless** (nur Funktionen hochladen), **DaaS** (Desktop as a Service, z. B. Windows 365), **BaaS** (Backup as a Service).`,
        },
        {
          type: 'visual',
          title: 'Je weiter rechts, desto mehr übernimmt der Anbieter',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'On-Premises', text: 'Alles selbst: Raum, Strom, Hardware, Virtualisierung, OS, Anwendung, Daten.', icon: 'Building2' },
                { title: 'IaaS', text: 'Anbieter: Hardware + Virtualisierung. Kunde: ab Betriebssystem aufwärts.', icon: 'Server' },
                { title: 'PaaS', text: 'Anbieter: zusätzlich OS und Laufzeit. Kunde: eigene Anwendung und Daten.', icon: 'Layers' },
                { title: 'SaaS', text: 'Anbieter: komplette Anwendung. Kunde: Daten, Benutzer, Rechte, Konfiguration.', icon: 'Cloud' },
              ],
            },
          },
          caption: 'Daten und Zugriffsrechte bleiben immer in der Verantwortung des Kunden.',
        },
        {
          type: 'example',
          title: 'Servicemodelle zuordnen',
          problem: 'Ordne zu: (1) Die Elektro Krämer GmbH mietet eine virtuelle Maschine mit Ubuntu und installiert darauf ihren Webshop. (2) Das Softwarehaus lädt den Code des Kundenportals auf eine Plattform, die Webserver, Laufzeit und Datenbank automatisch betreibt. (3) Die Buchhaltung nutzt ein Online-Buchhaltungsprogramm im Browser. Wer muss jeweils das Betriebssystem patchen?',
          steps: [
            { label: '(1)', body: 'Eigene VM, eigenes Betriebssystem → **IaaS**. Das OS (Ubuntu) patcht die **Elektro Krämer GmbH**.' },
            { label: '(2)', body: 'Nur Code hochladen, Plattform wird betrieben → **PaaS**. OS und Laufzeit patcht der **Anbieter**.' },
            { label: '(3)', body: 'Fertige Anwendung im Browser → **SaaS**. Alles bis zur Anwendung macht der **Anbieter**; die Firma verwaltet Benutzer, Rechte und ihre Daten.' },
          ],
          result: '(1) IaaS – Kunde patcht; (2) PaaS – Anbieter; (3) SaaS – Anbieter.',
        },
        {
          type: 'check',
          question: {
            id: 'b04-c02', kind: 'text', skill: 'cloud.service', difficulty: 1,
            prompt: 'Zu welchem Servicemodell gehört **Microsoft 365** (Abkürzung)?',
            accept: ['SaaS', 'Software as a Service'],
            explanation: 'Fertige Anwendungen als Dienst → **SaaS**.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'b04-c03', kind: 'single', skill: 'cloud.service', difficulty: 2,
            prompt: 'Wer ist bei **IaaS** für die Sicherheitsupdates des Gast-Betriebssystems der VM verantwortlich?',
            options: ['Der Kunde', 'Der Cloud-Anbieter', 'Der Hersteller der Hardware', 'Niemand, VMs brauchen keine Updates'],
            answer: 0,
            distractors: { '1': { why: 'Der Anbieter betreut bei IaaS nur Hardware, Netz und Virtualisierung.', error: 'cloud-verantwortung' }, '2': { why: 'Der Hardwarehersteller hat mit dem Gast-OS nichts zu tun.', error: 'cloud-verantwortung' }, '3': { why: 'Jedes Betriebssystem braucht Sicherheitsupdates.', error: 'cloud-verantwortung' } },
            explanation: 'Bei IaaS beginnt die Verantwortung des Kunden beim Betriebssystem.',
          },
        },
        { type: 'practice', title: 'Übung: Servicemodelle', questionIds: ['b04-q005', 'b04-q006', 'b04-q007', 'b04-q008', 'b04-q009'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['IaaS: Infrastruktur (VMs, Speicher, Netz) – Kunde ab Betriebssystem.', 'PaaS: Plattform – Kunde liefert Anwendung und Daten.', 'SaaS: fertige Software – Kunde verwaltet Daten, Benutzer, Rechte.', 'Shared Responsibility: Daten und Identitäten immer beim Kunden.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b04-l03',
      title: 'Cloud bewerten: Vorteile, Risiken, Kosten und Datenschutz',
      minutes: 25,
      relevance: 'ap1',
      skills: ['cloud.eval'],
      simple: `Einen Cloud-Dienst zu nutzen ist wie eine Wohnung zu mieten statt zu kaufen: keine große Anfangsinvestition und flexibel – aber du zahlst jeden Monat und bist vom Vermieter abhängig. Vorteile sind schnelle Skalierung und professionelle Rechenzentren. Risiken sind die Abhängigkeit vom Internet und vom Anbieter (Vendor-Lock-in), laufende Kosten und der Datenschutz. Für personenbezogene Daten brauchst du einen Vertrag zur Auftragsverarbeitung (AVV, Art. 28 DSGVO) und musst prüfen, ob Daten in ein Land außerhalb der EU fließen.

**Merke:** Kosten über die gleiche Laufzeit vergleichen (TCO, Gesamtkosten) und an Datenschutz (AVV, Drittland) und eine Ausstiegsstrategie denken.`,
      steps: [
        {
          type: 'explain',
          title: 'Chancen und Risiken abwägen',
          body: `| Vorteile | Nachteile / Risiken |
|---|---|
| keine hohe Anfangsinvestition (**OPEX statt CAPEX**: laufende statt einmaliger Kosten) | laufende Kosten über die gesamte Nutzungsdauer, Preisänderungen |
| schnelle **Skalierung**, Pay-per-Use | **Internetabhängigkeit** (Ausfall der Leitung = kein Zugriff) |
| professionelle Rechenzentren: Redundanz, physische Sicherheit, Zertifizierungen | **Abhängigkeit vom Anbieter (Vendor-Lock-in)**, Wechsel aufwendig |
| weniger eigener Betriebsaufwand (kein Hardwaretausch, Patchen je nach Modell) | **Datenschutz/Compliance**: Speicherort, Zugriff ausländischer Behörden |
| Zugriff von überall, gut für mobiles Arbeiten | weniger Kontrolle über Wartungsfenster und Konfiguration |
| aktuelle Software (SaaS) | Latenz bei weit entfernten Rechenzentren |

**Datenschutz und Rechtliches (DSGVO):**
- Verarbeitet ein Cloud-Anbieter personenbezogene Daten im Auftrag, ist ein **Auftragsverarbeitungsvertrag (AVV)** nach **Art. 28 DSGVO** nötig. Das Unternehmen bleibt **Verantwortlicher**.
- **Serverstandort:** In der EU/EWR gilt die DSGVO unmittelbar. Bei Übermittlung in **Drittländer** (Art. 44 ff. DSGVO) braucht es eine Grundlage, z. B. einen **Angemessenheitsbeschluss** (für zertifizierte US-Unternehmen seit Juli 2023 das *EU-US Data Privacy Framework* – politisch und rechtlich weiterhin umstritten) oder **Standardvertragsklauseln**.
- US-Anbieter können nach dem **CLOUD Act** verpflichtet sein, Daten an US-Behörden herauszugeben – auch aus europäischen Rechenzentren.
- Maßnahmen: EU-Rechenzentren wählen, **Verschlüsselung** (möglichst mit eigenem Schlüssel), Zugriffskontrolle und MFA, Prüfung von Nachweisen wie **BSI C5** (Cloud Computing Compliance Criteria Catalogue) oder **ISO/IEC 27001**, **Exit-Strategie** (Datenexport in offenen Formaten).

**Kostenvergleich:** Man vergleicht die Gesamtkosten (**TCO**, Total Cost of Ownership) über die gleiche Laufzeit: Anschaffung + Betrieb (Strom, Wartung, Lizenzen, Personal) vs. Cloud-Gebühren (+ ggf. Datenübertragung, Support).`,
        },
        {
          type: 'visual',
          title: 'Prüfliste vor dem Gang in die Cloud',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Recht & Datenschutz', text: 'AVV nach Art. 28 DSGVO, Serverstandort EU, Drittlandtransfer, Löschkonzept.', icon: 'Scale' },
                { title: 'Sicherheit', text: 'Zertifikate (BSI C5, ISO 27001), Verschlüsselung, MFA, Protokollierung.', icon: 'ShieldCheck' },
                { title: 'Betrieb', text: 'SLA (Verfügbarkeit, Support), Internetanbindung redundant?, Backup der Cloud-Daten.', icon: 'Gauge' },
                { title: 'Kosten', text: 'TCO über die Laufzeit, Preisanpassungen, Kosten für Datenexport.', icon: 'ChartBar' },
                { title: 'Exit-Strategie', text: 'Datenexport in offenen Formaten, Kündigungsfristen, Migrationsweg.', icon: 'Download' },
                { title: 'Organisation', text: 'Rollen und Verantwortlichkeiten (Shared Responsibility), Schulung.', icon: 'Users' },
              ],
            },
          },
          caption: 'Eine Cloud-Entscheidung ist nie nur eine Kostenfrage.',
        },
        {
          type: 'example',
          title: 'Eigener Server oder Cloud-VM? (TCO über 5 Jahre)',
          problem: `Für eine neue Anwendung stehen zur Wahl:

| | On-Premises-Server | Cloud-VM (IaaS) |
|---|---|---|
| Anschaffung | 9.000 € | – |
| laufend | 1.200 € pro Jahr (Strom, Wartung) | 230 € pro Monat |

Vergleiche die Kosten über 5 Jahre.`,
          steps: [
            { label: 'On-Premises', body: '9.000 € + 5 · 1.200 € = 9.000 € + 6.000 € = **15.000 €**.' },
            { label: 'Cloud', body: '230 € · 12 · 5 = 230 € · 60 = **13.800 €**.' },
            { label: 'Differenz', body: '15.000 € − 13.800 € = **1.200 €** zugunsten der Cloud.' },
            { label: 'Qualitativ', body: 'Cloud: keine Investition, skalierbar, Hardwaretausch entfällt; aber Internetabhängigkeit, AVV und Datenstandort prüfen. On-Prem: volle Kontrolle, Daten im Haus; Personalaufwand für Betrieb ist in den 1.200 €/Jahr noch nicht enthalten.' },
          ],
          result: 'Die Cloud-VM ist über 5 Jahre um 1.200 € günstiger; die Entscheidung muss Datenschutz, Verfügbarkeit und Betriebsaufwand einbeziehen.',
        },
        {
          type: 'check',
          question: {
            id: 'b04-c04', kind: 'text', skill: 'cloud.eval', difficulty: 2,
            prompt: 'Welcher Vertrag ist nach Art. 28 DSGVO nötig, wenn ein Cloud-Anbieter personenbezogene Daten im Auftrag verarbeitet? (Begriff oder Abkürzung)',
            accept: ['AVV', 'Auftragsverarbeitungsvertrag', 'Vertrag zur Auftragsverarbeitung', 'AV-Vertrag', 'DPA'],
            explanation: 'Ein **Auftragsverarbeitungsvertrag (AVV)**.',
          },
        },
        { type: 'practice', title: 'Übung: Cloud bewerten', questionIds: ['b04-q010', 'b04-q011', 'b04-q012', 'b04-q013', 'b04-q014'], count: 5, difficulty: 2 },
        { type: 'summary', points: ['Vorteile: keine Investition, Skalierung, professionelle Rechenzentren.', 'Risiken: Internetabhängigkeit, Vendor-Lock-in, Datenschutz, laufende Kosten.', 'DSGVO: AVV (Art. 28), Drittlandtransfer (Art. 44 ff.), CLOUD Act beachten.', 'Nachweise: BSI C5, ISO 27001; Exit-Strategie planen.', 'Kosten: TCO über gleiche Laufzeit vergleichen.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b04-l04',
      title: 'Virtualisierung und Hypervisor',
      minutes: 25,
      relevance: 'ap1',
      skills: ['virt.basics', 'virt.sizing'],
      simple: `Virtualisierung ist wie ein Haus mit vielen Mietwohnungen: Ein Gebäude (die echte Hardware) wird in mehrere abgeschlossene Wohnungen (virtuelle Maschinen) aufgeteilt. Der Hypervisor ist der Hausverwalter, der Strom, Wasser und Räume verteilt. Ein Typ-1-Hypervisor läuft direkt auf der Hardware, ohne Betriebssystem darunter – z. B. VMware ESXi, Microsoft Hyper-V oder Proxmox VE. Ein Typ-2-Hypervisor ist ein normales Programm auf deinem Windows oder macOS, z. B. VirtualBox – praktisch zum Testen.

**Merke:** Typ 1 (Bare Metal) für Server: ESXi, Hyper-V, Proxmox VE (KVM); Typ 2 (Hosted) für Tests am PC: VirtualBox, VMware Workstation.`,
      steps: [
        {
          type: 'explain',
          title: 'Viele Rechner auf einer Hardware',
          body: `**Virtualisierung** bedeutet: Auf einer physischen Hardware (dem **Host**) laufen mehrere voneinander isolierte **virtuelle Maschinen (VMs, Gäste)**, jede mit eigenem Betriebssystem. Die Software, die die Hardware aufteilt, heißt **Hypervisor** (Virtual Machine Monitor).

| | **Typ 1 – Bare Metal** | **Typ 2 – Hosted** |
|---|---|---|
| läuft | **direkt auf der Hardware** | als Programm **auf einem Betriebssystem** |
| Leistung | hoch, wenig Overhead | geringer (Host-OS dazwischen) |
| Einsatz | Server, Rechenzentrum, Cloud | Test, Schulung, Entwicklung auf dem Arbeitsplatz-PC |
| Beispiele | VMware ESXi, **Microsoft Hyper-V**, Xen, KVM (z. B. in Proxmox VE) | Oracle VirtualBox, VMware Workstation, Parallels Desktop |

Hinweis: Wird Hyper-V unter Windows 11 Pro aktiviert, schiebt es sich **unter** Windows – das Windows wird selbst zu einer besonderen Partition. Hyper-V bleibt also ein Typ-1-Hypervisor. KVM ist Teil des Linux-Kernels und wird meist ebenfalls zu Typ 1 gezählt.

**Achtung Prüfungsfalle:** Manche Schulbücher ordnen **Proxmox VE** als Typ 2 ein, weil darunter ein Debian-Linux läuft. Fachlich korrekt ist **Typ 1**: Proxmox VE nutzt KVM im Linux-Kernel, und das ganze System wird direkt auf dem Server installiert – es gibt kein separates Arbeitsplatz-Betriebssystem, auf dem der Hypervisor als Programm läuft. Merkfrage: *Installiere ich es direkt auf die leere Hardware?* → Typ 1. *Installiere ich es als Programm in mein Windows/macOS?* → Typ 2.

**Voraussetzungen:** CPU mit Virtualisierungsunterstützung (**Intel VT-x** bzw. **AMD-V**), im UEFI aktiviert; ausreichend RAM und schneller Speicher.

**Vorteile:** bessere **Auslastung** der Hardware (Konsolidierung: 10 Server → 2 Hosts), weniger Strom/Platz, schnelle Bereitstellung über **Vorlagen (Templates)**, **Snapshots** vor Änderungen, **Live-Migration** von VMs zwischen Hosts ohne Ausfall, **Hochverfügbarkeit** im Cluster (fällt ein Host aus, starten seine VMs auf einem anderen; Voraussetzung: gemeinsamer Speicher, mehrere Hosts, redundante Netzanbindung), Testumgebungen.

**Nachteile/Risiken:** Ein Host-Ausfall betrifft **alle** VMs (Single Point of Failure ohne Cluster), Lizenz- und Know-how-Bedarf, Ressourcenkonkurrenz bei Überbuchung.

**Dimensionierung:** RAM wird meist **nicht überbucht** (jede VM bekommt fest zugeteilten Speicher, plus Reserve für den Hypervisor). CPU-Kerne darf man in Maßen **überbuchen** (z. B. 2–4 virtuelle CPUs pro physischem Kern), weil selten alle VMs gleichzeitig volle Last erzeugen. Der **kleinste** der berechneten Werte (Engpass) begrenzt die Anzahl VMs.`,
        },
        {
          type: 'visual',
          title: 'Typ 1 vs. Typ 2',
          widget: {
            kind: 'cards',
            data: {
              columns: 2,
              items: [
                { title: 'Typ 1 (Bare Metal)', text: 'Hardware → Hypervisor (ESXi, Hyper-V, KVM) → VMs (Windows Server, Linux …)', icon: 'Server' },
                { title: 'Typ 2 (Hosted)', text: 'Hardware → Host-Betriebssystem (Windows 11) → Hypervisor-Programm (VirtualBox) → VMs', icon: 'Laptop' },
              ],
            },
          },
          caption: 'Typ 1 hat eine Schicht weniger zwischen VM und Hardware – deshalb ist er im Serverbetrieb Standard.',
        },
        {
          type: 'example',
          title: 'Wie viele VMs passen auf den Host?',
          problem: 'Ein Host hat **256 GB RAM** und **32 physische Kerne**. 16 GB RAM bleiben für den Hypervisor reserviert, RAM wird nicht überbucht. Es dürfen höchstens **3 vCPUs pro physischem Kern** vergeben werden. Jede VM erhält **24 GB RAM** und **6 vCPUs**.',
          steps: [
            { label: 'RAM-Grenze', body: '(256 − 16) GB / 24 GB = 240 / 24 = **10 VMs**.' },
            { label: 'CPU-Grenze', body: '32 Kerne · 3 = 96 vCPUs; 96 / 6 = **16 VMs**.' },
            { label: 'Engpass', body: 'Minimum(10, 16) = **10 VMs** – der RAM begrenzt.' },
          ],
          result: 'Der Host trägt höchstens 10 VMs; für mehr VMs müsste der Arbeitsspeicher erweitert werden.',
        },
        {
          type: 'check',
          question: {
            id: 'b04-c05', kind: 'single', skill: 'virt.basics', difficulty: 1,
            prompt: 'Welcher Hypervisor ist ein **Typ-2**-Hypervisor?',
            options: ['Oracle VirtualBox', 'VMware ESXi', 'Microsoft Hyper-V', 'Xen'],
            answer: 0,
            distractors: { '1': { why: 'ESXi läuft direkt auf der Hardware (Typ 1).', error: 'hypervisor-typ' }, '2': { why: 'Hyper-V ist Typ 1 – auch wenn es unter Windows 11 aktiviert wird.', error: 'hypervisor-typ' }, '3': { why: 'Xen ist ein Bare-Metal-Hypervisor (Typ 1).', error: 'hypervisor-typ' } },
            explanation: 'VirtualBox läuft als Anwendung auf einem Host-Betriebssystem → Typ 2.',
          },
        },
        { type: 'practice', title: 'Übung: Hypervisor-Typen und Virtualisierung', questionIds: ['b04-q031', 'b04-q015', 'b04-q017', 'b04-q028', 'b04-q016'], count: 4, difficulty: 2 },
        { type: 'practice', title: 'Übung: Host dimensionieren', generator: 'sys.vmhost', count: 4, difficulty: 2 },
        { type: 'summary', points: ['Hypervisor teilt Hardware in isolierte VMs.', 'Typ 1 (Bare Metal): ESXi, Hyper-V, KVM, Xen. Typ 2 (Hosted): VirtualBox, VMware Workstation.', 'Voraussetzung: VT-x/AMD-V im UEFI aktiv.', 'Vorteile: Auslastung, Templates, Snapshots, Live-Migration, HA-Cluster.', 'Dimensionierung: RAM fest + Reserve, CPU überbuchbar, Engpass entscheidet.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b04-l05',
      title: 'Virtuelle Maschinen und Container',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['virt.container'],
      simple: `Eine virtuelle Maschine ist wie ein Einfamilienhaus mit eigenem Fundament: Sie hat ein eigenes Betriebssystem mit eigenem Kern (Kernel). Ein Container ist eher eine Wohnung im Mehrfamilienhaus: Er bringt nur die Anwendung und ihre Bibliotheken mit und teilt sich den Kernel des Gastgebers. Darum starten Container in Sekunden und brauchen weniger Speicher, VMs sind dafür stärker voneinander abgeschottet. Container entstehen aus einer Vorlage (Image), die in einer Registry (Ablage für Images) liegt.

**Merke:** VM = eigenes Gast-Betriebssystem, starke Isolation; Container = teilt den Host-Kernel, leicht und schnell.`,
      steps: [
        {
          type: 'explain',
          title: 'Isolierung auf zwei Ebenen',
          body: `**Container** (z. B. mit **Docker** oder **Podman**) verpacken eine Anwendung mit allen Bibliotheken und Abhängigkeiten in ein **Image**. Anders als eine VM bringt ein Container **kein eigenes Betriebssystem mit**, sondern teilt sich den **Kernel des Hosts**.

| | **Virtuelle Maschine** | **Container** |
|---|---|---|
| enthält | komplettes Gast-Betriebssystem inkl. Kernel | nur Anwendung + Bibliotheken |
| Größe | mehrere GB | oft nur MB bis wenige hundert MB |
| Startzeit | Minuten (OS bootet) | Sekunden |
| Isolation | stark (eigener Kernel, Hypervisor-Grenze) | schwächer (gemeinsamer Kernel) |
| Betriebssystem-Mix | beliebig (Windows-VM auf Linux-Host möglich) | Container nutzt den Kernel des Hosts (Linux-Container brauchen einen Linux-Kernel; unter Windows z. B. über WSL 2) |
| typischer Einsatz | vollständige Server, unterschiedliche Betriebssysteme, Altanwendungen | Microservices, Webanwendungen, Entwicklung/Test, CI/CD |

**Begriffe:** **Image** = Bauplan (unveränderlich), **Container** = laufende Instanz eines Images, **Registry** = Ablage für Images (z. B. Docker Hub), **Dockerfile** = Rezept zum Bauen eines Images, **Orchestrierung** = Verwaltung vieler Container über mehrere Hosts (**Kubernetes**).

Oft wird beides kombiniert: Container laufen **in** VMs – so erhält man die Isolation der VM und die Leichtigkeit der Container.

**Sicherheit:** Images nur aus vertrauenswürdigen Quellen, regelmäßig aktualisieren und auf Schwachstellen scannen; Container nicht mit unnötigen Rechten (root, privileged) starten.`,
        },
        {
          type: 'visual',
          title: 'VM vs. Container – Schichten',
          widget: {
            kind: 'cards',
            data: {
              columns: 2,
              items: [
                { title: 'VMs', text: 'Hardware → Hypervisor → je VM: Gast-OS + Bibliotheken + App. Jede VM hat ihren eigenen Kernel.', icon: 'Server' },
                { title: 'Container', text: 'Hardware → Host-OS (ein Kernel) → Container-Runtime → je Container: Bibliotheken + App.', icon: 'Container' },
              ],
            },
          },
          caption: 'Container sparen das Gast-Betriebssystem ein – dafür teilen sie sich den Kernel.',
        },
        {
          type: 'example',
          title: 'VM oder Container?',
          problem: 'Entscheide: (a) Eine alte Lagersoftware braucht zwingend Windows Server 2016. (b) Das Kundenportal (Webanwendung) soll bei Last schnell zusätzliche Instanzen starten. (c) Ein Entwickler will eine Datenbank für Tests in Sekunden starten und wieder wegwerfen.',
          steps: [
            { label: '(a)', body: '**VM** – eigenes, bestimmtes Betriebssystem nötig.' },
            { label: '(b)', body: '**Container** (ggf. mit Kubernetes) – starten in Sekunden, gut skalierbar.' },
            { label: '(c)', body: '**Container** – z. B. `docker run` mit einem offiziellen Datenbank-Image, nach dem Test löschen.' },
          ],
          result: 'VMs für vollständige, unterschiedliche Betriebssysteme; Container für leichte, schnell skalierende Anwendungen.',
        },
        {
          type: 'check',
          question: {
            id: 'b04-c06', kind: 'single', skill: 'virt.container', difficulty: 2,
            prompt: 'Was ist der wesentliche technische Unterschied zwischen einem Container und einer VM?',
            options: ['Container teilen sich den Kernel des Host-Betriebssystems, VMs haben ein eigenes Betriebssystem mit eigenem Kernel.', 'Container brauchen einen Typ-2-Hypervisor.', 'VMs starten schneller als Container.', 'Container können keine Netzwerkverbindungen aufbauen.'],
            answer: 0,
            distractors: { '1': { why: 'Container brauchen eine Container-Runtime, keinen Hypervisor.', error: 'vm-container' }, '2': { why: 'Umgekehrt: Container starten in Sekunden.', error: 'vm-container' }, '3': { why: 'Container haben ein virtuelles Netzwerk und können kommunizieren.', error: 'vm-container' } },
            explanation: 'Gemeinsamer Kernel = leichtgewichtig, aber schwächere Isolation.',
          },
        },
        { type: 'practice', title: 'Übung: VM und Container', questionIds: ['b04-q018', 'b04-q019', 'b04-q020'], count: 3, difficulty: 2 },
        { type: 'summary', points: ['Container: App + Bibliotheken, teilen den Host-Kernel, starten in Sekunden.', 'VM: komplettes Gast-OS mit eigenem Kernel, stärkere Isolation.', 'Image → Container; Registry; Kubernetes orchestriert.', 'Oft kombiniert: Container in VMs.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b04-l06',
      title: 'Thin Client, Terminalserver und VDI',
      minutes: 20,
      relevance: 'ap1-teilweise',
      skills: ['virt.vdi'],
      simple: `Ein Thin Client ist wie eine Fernbedienung: Er zeigt nur Bild und Ton an und schickt Tastatur und Maus weiter – gerechnet wird auf dem Server im Rechenzentrum. Ein Fat Client ist dagegen ein vollwertiger PC, der alles selbst erledigt. Beim Terminalserver teilen sich viele Benutzer ein Server-Betriebssystem, jeder in seiner eigenen Sitzung. Bei VDI (Virtual Desktop Infrastructure) bekommt jeder Benutzer eine eigene virtuelle Desktop-Maschine. Vorteil: zentrale Verwaltung, die Daten bleiben im Rechenzentrum; Nachteil: Ohne Netz und Server geht nichts.

**Merke:** Terminalserver = viele Sitzungen auf einem Server-Betriebssystem; VDI = je Benutzer eine eigene Desktop-VM.`,
      steps: [
        {
          type: 'explain',
          title: 'Der Arbeitsplatz läuft im Rechenzentrum',
          body: `Statt jeden Arbeitsplatz mit einem vollwertigen PC (**Fat Client**) auszustatten, kann die eigentliche Arbeit zentral auf Servern laufen. Am Platz steht nur ein Gerät, das Bild, Tastatur und Maus überträgt.

| Begriff | Beschreibung |
|---|---|
| **Fat Client** | klassischer PC mit lokalem Betriebssystem, Programmen und ggf. lokalen Daten |
| **Thin Client** | schlankes Endgerät mit minimalem Betriebssystem; verbindet sich per RDP, ICA/HDX o. Ä. mit Servern; keine lokalen Daten |
| **Zero Client** | noch einfacher, praktisch ohne lokales Betriebssystem, auf ein Protokoll festgelegt |
| **Terminalserver / RDS (sitzungsbasiert)** | **viele Benutzer teilen sich ein Server-Betriebssystem**; jeder hat seine eigene Sitzung (Windows Remote Desktop Services, Citrix) |
| **VDI (Virtual Desktop Infrastructure)** | **jeder Benutzer hat eine eigene VM mit Client-Betriebssystem** (z. B. Windows 11) im Rechenzentrum |
| **DaaS** | VDI als Clouddienst (z. B. Windows 365, Azure Virtual Desktop) |

**Vorteile zentraler Desktops:** zentrale Verwaltung und Updates, **Daten verlassen das Rechenzentrum nicht** (Diebstahl eines Thin Clients ist unkritisch), schneller Gerätetausch, geringerer **Energieverbrauch** und Geräuschpegel am Platz, lange Nutzungsdauer der Endgeräte, Zugriff von überall.

**Nachteile:** Abhängigkeit von **Netzwerk und Servern** (fallen sie aus, kann niemand arbeiten), hohe Serverkosten und Lizenzkosten (z. B. RDS-CALs, VDI-Lizenzen), schlecht geeignet für grafikintensive Arbeit oder Offline-Nutzung, Peripherie (Scanner, Spezialgeräte) teils schwierig.

**RDS vs. VDI:** RDS ist ressourcensparender (ein OS für viele), VDI bietet mehr Individualität und Isolation (eigene VM, eigene Software), braucht aber mehr Ressourcen.`,
        },
        {
          type: 'visual',
          title: 'Thin Clients mit Terminalserver',
          widget: {
            kind: 'topology',
            data: {
              nodes: [
                { id: 't1', type: 'pc', label: 'Thin Client', sub: 'Empfang', x: 100, y: 80 },
                { id: 't2', type: 'pc', label: 'Thin Client', sub: 'Lager', x: 100, y: 210 },
                { id: 't3', type: 'laptop', label: 'Notebook', sub: 'Homeoffice', x: 100, y: 340 },
                { id: 'sw', type: 'switch', label: 'Switch', x: 330, y: 210 },
                { id: 'rds', type: 'server', label: 'Terminalserver', sub: 'RDS-Sitzungen', x: 560, y: 120 },
                { id: 'fs', type: 'server', label: 'Fileserver', sub: 'Daten', x: 560, y: 300 },
              ],
              links: [
                { from: 't1', to: 'sw', label: 'RDP' }, { from: 't2', to: 'sw', label: 'RDP' }, { from: 't3', to: 'sw', style: 'vpn', label: 'VPN + RDP' },
                { from: 'sw', to: 'rds' }, { from: 'rds', to: 'fs', label: 'SMB' },
              ],
              zones: [{ label: 'Rechenzentrum / Serverraum', x: 470, y: 50, w: 300, h: 330, color: 'gray' }],
            },
          },
          caption: 'Über das Netz gehen nur Bildschirminhalt und Eingaben – Programme und Daten bleiben im Serverraum.',
        },
        {
          type: 'example',
          title: 'Energieeinsparung durch Thin Clients',
          problem: '40 Arbeitsplatz-PCs (je **60 W** im Betrieb) sollen durch Thin Clients (je **10 W**) ersetzt werden. Betrieb: 8 h pro Tag an 220 Tagen im Jahr, Strompreis 0,30 €/kWh. Wie viel spart die Firma pro Jahr am Arbeitsplatz? (Mehrverbrauch der Server zunächst außer Acht lassen)',
          steps: [
            { label: 'Leistungsdifferenz', body: '(60 W − 10 W) · 40 = 50 W · 40 = **2.000 W** = 2 kW.' },
            { label: 'Betriebsstunden', body: '8 h · 220 = **1.760 h**.' },
            { label: 'Energie', body: '2 kW · 1.760 h = **3.520 kWh**.' },
            { label: 'Kosten', body: '3.520 kWh · 0,30 €/kWh = **1.056 €**.' },
          ],
          result: 'Am Arbeitsplatz werden 1.056 € pro Jahr gespart; davon ist der zusätzliche Verbrauch des Terminalservers abzuziehen.',
        },
        {
          type: 'check',
          question: {
            id: 'b04-c07', kind: 'single', skill: 'virt.vdi', difficulty: 2,
            prompt: 'Worin unterscheidet sich **VDI** von einem **Terminalserver (RDS)**?',
            options: ['Bei VDI erhält jeder Benutzer eine eigene VM mit Client-Betriebssystem; beim Terminalserver teilen sich viele Benutzer ein Server-Betriebssystem.', 'VDI funktioniert nur mit Fat Clients.', 'Beim Terminalserver liegen die Daten auf dem Thin Client.', 'VDI braucht kein Netzwerk.'],
            answer: 0,
            distractors: { '1': { why: 'VDI wird typischerweise mit Thin Clients oder beliebigen Geräten genutzt.', error: 'vdi-rds' }, '2': { why: 'Bei beiden Varianten bleiben die Daten im Rechenzentrum.', error: 'vdi-rds' }, '3': { why: 'Beide sind vollständig netzwerkabhängig.', error: 'vdi-rds' } },
            explanation: 'RDS = sitzungsbasiert (ein OS für viele), VDI = je Benutzer eine eigene VM.',
          },
        },
        { type: 'practice', title: 'Übung: Thin Client und VDI', questionIds: ['b04-q021', 'b04-q022', 'b04-q023'], count: 3, difficulty: 2 },
        { type: 'summary', points: ['Fat Client = vollwertiger PC; Thin/Zero Client = schlankes Zugangsgerät.', 'Terminalserver (RDS): viele Sitzungen auf einem Server-OS.', 'VDI: je Benutzer eine eigene Desktop-VM; DaaS aus der Cloud.', 'Vorteile: zentrale Verwaltung, Datensicherheit, Energie. Nachteil: Netz-/Serverabhängigkeit.'] },
      ],
    },
    /* ------------------------------------------------------------ */
    {
      id: 'b04-l07',
      title: 'Snapshots sind keine Backups',
      minutes: 20,
      relevance: 'ap1',
      skills: ['virt.snapshot'],
      simple: `Ein Snapshot ist wie ein Lesezeichen im Buch: Du springst schnell zu einer Stelle zurück – aber verbrennt das Buch, ist auch das Lesezeichen weg. Er speichert den Zustand einer VM, hängt an der Original-Festplatte und liegt auf demselben Speicher. Ein Backup ist dagegen eine echte Kopie an einem anderen Ort, wie eine Fotokopie im Tresor. Nach der 3-2-1-Regel hast du 3 Kopien deiner Daten auf 2 verschiedenen Medien, davon 1 außer Haus.

**Merke:** Snapshot = kurzfristiger Rücksprungpunkt vor Änderungen, kein Backup; Backup = unabhängige Kopie auf anderem Medium und an anderem Ort.`,
      steps: [
        {
          type: 'explain',
          title: 'Zwei Werkzeuge mit unterschiedlichem Zweck',
          body: `Ein **Snapshot** (bei Hyper-V: **Prüfpunkt/Checkpoint**) hält den Zustand einer VM zu einem Zeitpunkt fest. Technisch wird die ursprüngliche virtuelle Festplatte eingefroren; alle Änderungen danach landen in einer **Differenzdatei**. Zurückspringen heißt: Differenzdatei verwerfen.

| | **Snapshot** | **Backup (Datensicherung)** |
|---|---|---|
| Speicherort | **auf demselben Speicher** wie die VM | auf **anderem Medium/Ort** (NAS, Band, Cloud, außer Haus) |
| unabhängig? | **nein** – hängt von der Basisdisk ab; ist sie defekt, ist der Snapshot wertlos | ja, eigenständige Kopie |
| Zweck | kurzfristiger Rückweg vor Änderungen (Update, Konfigurationstest) | Wiederherstellung nach Datenverlust, Hardwaredefekt, Ransomware, Brand |
| Aufbewahrung | **Stunden bis wenige Tage** – lange Snapshot-Ketten wachsen, kosten Leistung und Platz | nach Aufbewahrungsplan (Tage bis Jahre), mehrere Generationen |

**Faustregel:** Snapshot **vor** einem Update anlegen, nach erfolgreichem Test **wieder löschen** (zusammenführen). Für den Ernstfall gibt es Backups.

**3-2-1-Regel für Backups:** mindestens **3** Kopien der Daten, auf **2** unterschiedlichen Medientypen, davon **1** an einem anderen Ort (offsite). Erweiterung **3-2-1-1-0**: zusätzlich **1** Kopie offline bzw. unveränderbar (gegen Ransomware) und **0** Fehler bei regelmäßigen **Wiederherstellungstests**.

**Sicherungsarten:**

| Art | sichert | Wiederherstellung braucht |
|---|---|---|
| **Vollsicherung** | alles | nur diese Sicherung |
| **Differenziell** | alle Änderungen **seit der letzten Vollsicherung** | Vollsicherung + **letzte** differenzielle |
| **Inkrementell** | alle Änderungen **seit der letzten Sicherung** (gleich welcher Art) | Vollsicherung + **alle** inkrementellen seitdem |

Inkrementell spart am meisten Platz und Zeit beim Sichern, die Wiederherstellung dauert aber am längsten.`,
        },
        {
          type: 'visual',
          title: 'Snapshot-Kette',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Basisdisk (eingefroren)', text: 'server01.vhdx – Zustand vor dem Update. Ohne sie ist alles Weitere wertlos.', icon: 'HardDrive' },
                { title: 'Differenzdatei', text: 'server01_A1B2.avhdx – alle Änderungen seit dem Prüfpunkt. Wächst mit jeder Schreiboperation.', icon: 'Copy' },
                { title: 'Backup', text: 'Eigenständige Kopie auf dem NAS und außer Haus – unabhängig vom Speicher der VM.', icon: 'Archive' },
              ],
            },
          },
          caption: 'Ein Defekt am Speichersystem zerstört Basisdisk und Snapshot gleichzeitig – ein Backup an einem anderen Ort nicht.',
        },
        {
          type: 'example',
          title: 'Welche Sicherungen braucht die Wiederherstellung?',
          problem: 'Sonntag: Vollsicherung. Montag bis Freitag jeweils abends eine Sicherung. Am Freitagmorgen fällt der Server aus. Welche Sicherungen müssen eingespielt werden, wenn (a) inkrementell bzw. (b) differenziell gesichert wurde?',
          steps: [
            { label: 'Letzte vorhandene Sicherung', body: 'Donnerstagabend (Freitagabend fand noch nicht statt).' },
            { label: '(a) inkrementell', body: 'Vollsicherung (So) + Mo + Di + Mi + Do = **5 Sicherungen**, in dieser Reihenfolge.' },
            { label: '(b) differenziell', body: 'Vollsicherung (So) + Do (enthält alle Änderungen seit So) = **2 Sicherungen**.' },
          ],
          result: 'Inkrementell: 5 Sicherungen; differenziell: 2 Sicherungen. Änderungen vom Freitagmorgen sind in beiden Fällen verloren.',
        },
        {
          type: 'check',
          question: {
            id: 'b04-c08', kind: 'free', skill: 'virt.snapshot', difficulty: 2,
            prompt: 'Ein Kollege sagt: „Wir machen jeden Abend einen Snapshot der VMs, ein Backup brauchen wir nicht.“ Nimm Stellung.',
            modelAnswer: 'Das ist falsch. Ein Snapshot liegt auf demselben Speicher wie die VM und hängt von deren Basisdisk ab. Fällt das Speichersystem aus, wird es von Ransomware verschlüsselt oder brennt der Serverraum, sind VM und Snapshots gleichzeitig verloren. Außerdem bremsen lange Snapshot-Ketten die VMs und füllen den Speicher. Ein Backup ist eine unabhängige Kopie auf einem anderen Medium und an einem anderen Ort (3-2-1-Regel). Snapshots eignen sich nur als kurzfristiger Rückweg vor Änderungen.',
            keywords: ['gleicher Speicher', 'abhängig', 'Ransomware', 'anderes Medium', '3-2-1', 'kurzfristig'],
            explanation: 'Snapshot ≠ Backup.',
          },
        },
        { type: 'practice', title: 'Übung: Snapshot und Backup', questionIds: ['b04-q024', 'b04-q025', 'b04-q026', 'b04-q027'], count: 4, difficulty: 2 },
        { type: 'summary', points: ['Snapshot = Zustand einer VM, abhängig von der Basisdisk, gleicher Speicher, nur kurzfristig.', 'Backup = unabhängige Kopie auf anderem Medium/Ort.', '3-2-1(-1-0): 3 Kopien, 2 Medien, 1 offsite, 1 offline, 0 Fehler beim Restore-Test.', 'Voll / differenziell (seit Voll) / inkrementell (seit letzter Sicherung).'] },
      ],
    },
  ],
  questions: [
    { id: 'b04-q001', kind: 'match', skill: 'cloud.basics', difficulty: 1, prompt: 'Ordne die NIST-Merkmale der Beschreibung zu.', left: ['On-Demand Self-Service', 'Rapid Elasticity', 'Measured Service', 'Resource Pooling', 'Broad Network Access'], right: ['Ressourcen selbst und ohne Rückfrage beim Anbieter buchen', 'schnell hoch- und herunterskalieren', 'Nutzung wird gemessen und abgerechnet', 'Anbieter bündelt Ressourcen für viele Kunden', 'Zugriff über das Netzwerk mit Standardgeräten'], answer: [0, 1, 2, 3, 4], explanation: 'Die fünf Merkmale nach NIST SP 800-145.' },
    { id: 'b04-q002', kind: 'free', skill: 'cloud.basics', difficulty: 2, prompt: 'Erläutere den Unterschied zwischen **Private Cloud** und **Public Cloud** und nenne je ein Beispiel.', modelAnswer: 'Eine Public Cloud wird von einem Anbieter betrieben und von vielen Kunden gemeinsam genutzt (mandantenfähig), z. B. Microsoft Azure, AWS oder Microsoft 365. Eine Private Cloud wird exklusiv für eine einzige Organisation betrieben – im eigenen Rechenzentrum oder exklusiv bei einem Dienstleister –, z. B. eine eigene Virtualisierungsplattform mit Self-Service-Portal. Private bietet mehr Kontrolle, Public mehr Skalierbarkeit und weniger eigenen Aufwand.', keywords: ['viele Kunden', 'eine Organisation', 'Azure', 'eigenes Rechenzentrum', 'Kontrolle'], explanation: 'Unterscheidung nach Nutzerkreis.' },
    { id: 'b04-q003', kind: 'single', skill: 'cloud.basics', difficulty: 2, prompt: 'Ein Unternehmen betreibt sein ERP im eigenen Rechenzentrum und lagert E-Mail an Microsoft 365 und Backups an einen Cloud-Speicher aus. Welches Bereitstellungsmodell liegt vor?', options: ['Hybrid Cloud', 'Community Cloud', 'Public Cloud', 'Private Cloud'], answer: 0, distractors: { '1': { why: 'Eine Community Cloud teilen sich mehrere Organisationen mit gleichen Anforderungen.', error: 'cloud-bereitstellung' }, '2': { why: 'Ein Teil läuft im eigenen Rechenzentrum – also nicht rein Public.', error: 'cloud-bereitstellung' }, '3': { why: 'Teile laufen in der Public Cloud – also nicht rein Private.', error: 'cloud-bereitstellung' } }, explanation: 'Kombination aus eigener und öffentlicher Cloud → **Hybrid**.' },
    { id: 'b04-q004', kind: 'text', skill: 'cloud.basics', difficulty: 1, prompt: 'Wie nennt man den Betrieb von Servern und Software im **eigenen** Unternehmen (Gegenteil von Cloud)?', accept: ['On-Premises', 'on premises', 'on-prem', 'onpremises', 'on-premise', 'on premise'], explanation: '**On-Premises** (vor Ort, im eigenen Haus).' },
    { id: 'b04-q005', kind: 'table', skill: 'cloud.service', difficulty: 2, prompt: 'Wer ist verantwortlich? Trage **Kunde** oder **Anbieter** ein.', columns: [{ key: 'i', label: 'IaaS', type: 'text' }, { key: 'p', label: 'PaaS', type: 'text' }, { key: 's', label: 'SaaS', type: 'text' }], rows: [{ label: 'Physische Server', cells: { i: { answer: 'Anbieter' }, p: { answer: 'Anbieter' }, s: { answer: 'Anbieter' } } }, { label: 'Betriebssystem patchen', cells: { i: { answer: 'Kunde' }, p: { answer: 'Anbieter' }, s: { answer: 'Anbieter' } } }, { label: 'Anwendung', cells: { i: { answer: 'Kunde' }, p: { answer: 'Kunde' }, s: { answer: 'Anbieter' } } }, { label: 'Daten und Benutzerrechte', cells: { i: { answer: 'Kunde' }, p: { answer: 'Kunde' }, s: { answer: 'Kunde' } } }], explanation: 'IaaS: Kunde ab OS. PaaS: Kunde ab Anwendung. SaaS: Kunde nur Daten/Benutzer/Konfiguration. Daten und Rechte immer beim Kunden.' },
    { id: 'b04-q006', kind: 'match', skill: 'cloud.service', difficulty: 1, prompt: 'Ordne das Angebot dem Servicemodell zu.', left: ['Gemietete VM mit eigenem Linux', 'Plattform, auf die nur der Anwendungscode hochgeladen wird', 'Online-Buchhaltung im Browser', 'Microsoft Teams'], right: ['IaaS', 'PaaS', 'SaaS', 'SaaS (ebenfalls)'], answer: [0, 1, 2, 3], explanation: 'VM = IaaS; Plattform = PaaS; fertige Anwendungen = SaaS.' },
    { id: 'b04-q007', kind: 'free', skill: 'cloud.service', difficulty: 2, prompt: 'Die Geschäftsleitung meint: „Seit wir Microsoft 365 nutzen, ist Microsoft für die Sicherheit unserer Daten verantwortlich.“ Nimm Stellung.', modelAnswer: 'Das stimmt nur teilweise. Nach dem Modell der geteilten Verantwortung betreibt und sichert Microsoft die Infrastruktur und die Anwendung. Für die Daten, Benutzerkonten, Zugriffsrechte und die Konfiguration bleibt die Elektro Krämer GmbH verantwortlich: z. B. Mehr-Faktor-Authentifizierung einschalten, Freigaben kontrollieren, Berechtigungen pflegen, ausgeschiedene Konten sperren, ggf. eigene Datensicherung, Datenschutz (AVV nach Art. 28 DSGVO, sie bleibt Verantwortliche).', keywords: ['geteilte Verantwortung', 'Daten', 'Benutzer', 'MFA', 'Backup', 'Verantwortlicher'], explanation: 'Shared Responsibility.' },
    { id: 'b04-q008', kind: 'text', skill: 'cloud.service', difficulty: 2, prompt: 'Wofür steht die Abkürzung **PaaS**?', accept: ['Platform as a Service', 'Plattform as a Service', 'Platform-as-a-Service'], explanation: '**Platform as a Service**.' },
    { id: 'b04-q009', kind: 'single', skill: 'cloud.service', difficulty: 2, prompt: 'Ein Softwarehaus will sich **nicht** um Betriebssystem-Updates und Laufzeitumgebungen kümmern, aber eigene Anwendungen betreiben. Welches Modell passt am besten?', options: ['PaaS', 'IaaS', 'SaaS', 'On-Premises'], answer: 0, distractors: { '1': { why: 'Bei IaaS müsste es das Betriebssystem selbst pflegen.', error: 'cloud-verantwortung' }, '2': { why: 'SaaS liefert fertige Software – eigene Anwendungen kann man dort nicht betreiben.', error: 'cloud-verantwortung' }, '3': { why: 'On-Premises bedeutet maximalen eigenen Aufwand.', error: 'cloud-verantwortung' } }, explanation: 'PaaS: Plattform inkl. OS und Laufzeit vom Anbieter, eigene Anwendung vom Kunden.' },
    { id: 'b04-q010', kind: 'free', skill: 'cloud.eval', difficulty: 2, prompt: 'Nenne drei Vorteile und drei Risiken, wenn die Elektro Krämer GmbH ihren Dateiserver durch einen Cloud-Speicher ersetzt.', modelAnswer: 'Vorteile: keine Investition in Serverhardware (laufende statt einmalige Kosten), flexibel erweiterbar, Zugriff von überall (Homeoffice, Außendienst), professioneller Betrieb mit Redundanz, kein eigener Hardwaretausch. Risiken: Abhängigkeit von der Internetverbindung, Datenschutz (Serverstandort, Drittlandtransfer, AVV), Abhängigkeit vom Anbieter (Lock-in, Preisänderungen), laufende Kosten über die gesamte Nutzung, weniger Kontrolle; große Dateien über schmale Leitungen langsam.', keywords: ['Investition', 'skalierbar', 'überall', 'Internet', 'Datenschutz', 'Lock-in'], explanation: 'Je drei begründete Punkte.' },
    { id: 'b04-q011', kind: 'number', skill: 'cloud.eval', difficulty: 2, prompt: 'Eigener Server: Anschaffung **7.500 €**, Betrieb **1.500 € pro Jahr**. Cloud-VM: **260 € pro Monat**. Wie viel Euro beträgt die **Differenz** der Gesamtkosten über **4 Jahre**? (positiver Betrag)', answer: 1020, unit: '€', hints: ['On-Prem: 7.500 + 4 · 1.500.', 'Cloud: 260 · 48.'], explanation: 'On-Prem: 7.500 + 6.000 = 13.500 €. Cloud: 260 · 48 = 12.480 €. Differenz **1.020 €** (Cloud günstiger).' },
    { id: 'b04-q012', kind: 'multi', skill: 'cloud.eval', difficulty: 2, prompt: 'Welche Maßnahmen verringern die Datenschutzrisiken bei der Nutzung eines Cloud-Speichers?', options: ['Auftragsverarbeitungsvertrag nach Art. 28 DSGVO abschließen', 'Rechenzentrum in der EU wählen', 'Daten vor dem Hochladen verschlüsseln (eigener Schlüssel)', 'Freigabelinks für jeden ohne Anmeldung erstellen', 'Nachweise wie BSI C5 oder ISO 27001 prüfen'], answer: [0, 1, 2, 4], explanation: 'Anonyme Freigabelinks erhöhen das Risiko; alle anderen Maßnahmen senken es.' },
    { id: 'b04-q013', kind: 'single', skill: 'cloud.eval', difficulty: 3, prompt: 'Warum kann ein US-Cloudanbieter selbst bei einem Rechenzentrum in Frankfurt ein datenschutzrechtliches Risiko darstellen?', options: ['Der US CLOUD Act kann ihn verpflichten, Daten an US-Behörden herauszugeben – unabhängig vom Speicherort.', 'Rechenzentren in Frankfurt unterliegen nicht der DSGVO.', 'US-Anbieter dürfen in der EU keine Verträge schließen.', 'Daten in Frankfurt werden automatisch in die USA kopiert.'], answer: 0, distractors: { '1': { why: 'In Deutschland gilt die DSGVO selbstverständlich.', error: 'cloud-datenschutz' }, '2': { why: 'US-Anbieter schließen in der EU regulär Verträge (inkl. AVV).', error: 'cloud-datenschutz' }, '3': { why: 'Eine automatische Kopie findet nicht grundsätzlich statt – das Risiko ist der behördliche Zugriff.', error: 'cloud-datenschutz' } }, explanation: 'CLOUD Act (2018): Herausgabepflicht für US-Unternehmen auch bei Speicherung im Ausland.' },
    { id: 'b04-q014', kind: 'free', skill: 'cloud.eval', difficulty: 2, prompt: 'Was versteht man unter **Vendor-Lock-in**, und wie kann man ihm vorbeugen?', modelAnswer: 'Vendor-Lock-in ist die starke Abhängigkeit von einem Anbieter, weil Daten, Formate, Schnittstellen oder Spezialdienste so an ihn gebunden sind, dass ein Wechsel nur mit großem Aufwand oder hohen Kosten möglich ist. Vorbeugung: offene Standards und Formate verwenden, Exit-Strategie und Datenexport vertraglich regeln, regelmäßige Exporte/Backups außerhalb des Anbieters, möglichst portable Technologien (z. B. Container), Kündigungsfristen und Migrationsunterstützung im Vertrag festlegen.', keywords: ['Abhängigkeit', 'Wechsel', 'offene Formate', 'Exit-Strategie', 'Export'], explanation: 'Definition + Gegenmaßnahmen.' },
    { id: 'b04-q015', kind: 'free', skill: 'virt.basics', difficulty: 2, prompt: 'Erkläre den Unterschied zwischen einem **Typ-1**- und einem **Typ-2**-Hypervisor und nenne je ein Produkt.', modelAnswer: 'Ein Typ-1-Hypervisor (Bare Metal) läuft direkt auf der Hardware ohne darunterliegendes Betriebssystem; er ist leistungsfähig und wird für Server eingesetzt, z. B. VMware ESXi, Microsoft Hyper-V, KVM/Proxmox VE. Ein Typ-2-Hypervisor (Hosted) läuft als Anwendung auf einem Host-Betriebssystem wie Windows 11; er hat mehr Overhead und eignet sich für Test- und Schulungszwecke, z. B. Oracle VirtualBox oder VMware Workstation.', keywords: ['direkt auf Hardware', 'Host-Betriebssystem', 'ESXi', 'Hyper-V', 'VirtualBox'], explanation: 'Unterscheidung nach der Schicht, auf der der Hypervisor läuft.' },
    { id: 'b04-q016', kind: 'number', skill: 'virt.sizing', difficulty: 2, prompt: 'Ein Host hat **128 GB RAM**; 8 GB sind für den Hypervisor reserviert. Jede VM bekommt **12 GB**. Wie viele VMs passen maximal drauf (ohne Überbuchung)?', answer: 10, unit: 'VMs', misconceptions: [{ answer: '11', error: 'vm-reserve-vergessen', why: '128 / 12 = 10,67 → ohne Reserve gerechnet und dann aufgerundet.' }], explanation: '(128 − 8) / 12 = 120 / 12 = **10 VMs**.' },
    { id: 'b04-q017', kind: 'free', skill: 'virt.basics', difficulty: 2, prompt: 'Nenne vier Vorteile der Servervirtualisierung für die Elektro Krämer GmbH.', modelAnswer: 'Bessere Auslastung der Hardware (Konsolidierung: weniger physische Server), geringerer Strom-, Kühl- und Platzbedarf, schnelle Bereitstellung neuer Server über Vorlagen, Snapshots vor Änderungen, Live-Migration ohne Ausfall bei Wartung, Hochverfügbarkeit im Cluster, einfache Test- und Schulungsumgebungen, hardwareunabhängige Wiederherstellung.', keywords: ['Auslastung', 'Strom', 'Vorlagen', 'Snapshot', 'Migration', 'Hochverfügbarkeit'], explanation: 'Vier begründete Vorteile.' },
    { id: 'b04-q018', kind: 'table', skill: 'virt.container', difficulty: 2, prompt: 'Vergleiche VM und Container. Trage **VM** oder **Container** ein.', columns: [{ key: 'x', label: 'trifft eher zu auf', type: 'text' }], rows: [{ label: 'startet in wenigen Sekunden', cells: { x: { answer: 'Container' } } }, { label: 'hat ein eigenes Betriebssystem mit eigenem Kernel', cells: { x: { answer: 'VM', accept: ['virtuelle maschine'] } } }, { label: 'teilt sich den Kernel des Hosts', cells: { x: { answer: 'Container' } } }, { label: 'Windows-Server-Gast auf einem Linux-Host möglich', cells: { x: { answer: 'VM', accept: ['virtuelle maschine'] } } }, { label: 'Image oft nur wenige MB groß', cells: { x: { answer: 'Container' } } }], explanation: 'Container: schnell, klein, gemeinsamer Kernel. VM: eigenes OS, beliebige Gastsysteme.' },
    { id: 'b04-q019', kind: 'match', skill: 'virt.container', difficulty: 2, prompt: 'Ordne die Container-Begriffe zu.', left: ['Image', 'Container', 'Registry', 'Kubernetes', 'Dockerfile'], right: ['unveränderlicher Bauplan einer Anwendung', 'laufende Instanz eines Images', 'Ablage, aus der Images geladen werden', 'Orchestrierung vieler Container über mehrere Hosts', 'Rezept zum Bauen eines Images'], answer: [0, 1, 2, 3, 4], explanation: 'Image → Container; Registry speichert Images; Kubernetes orchestriert; Dockerfile baut.' },
    { id: 'b04-q020', kind: 'single', skill: 'virt.container', difficulty: 2, prompt: 'Warum gelten Container als **schwächer isoliert** als VMs?', options: ['Sie teilen sich den Kernel des Hosts – eine Kernel-Schwachstelle kann alle Container betreffen.', 'Sie haben keine eigene IP-Adresse.', 'Sie können nicht verschlüsselt werden.', 'Sie laufen nur mit root-Rechten.'], answer: 0, distractors: { '1': { why: 'Container können eigene IP-Adressen/virtuelle Netze haben.', error: 'vm-container' }, '2': { why: 'Verschlüsselung ist möglich – das ist kein Isolationsmerkmal.', error: 'vm-container' }, '3': { why: 'Container können (und sollten) ohne root laufen.', error: 'vm-container' } }, explanation: 'Gemeinsamer Kernel = gemeinsame Angriffsfläche.' },
    { id: 'b04-q021', kind: 'free', skill: 'virt.vdi', difficulty: 2, prompt: 'Die Elektro Krämer GmbH überlegt, die Lager-Arbeitsplätze auf **Thin Clients** mit Terminalserver umzustellen. Nenne je zwei Vor- und Nachteile.', modelAnswer: 'Vorteile: zentrale Verwaltung und Updates nur am Server; Daten bleiben im Serverraum (Diebstahl/Defekt eines Thin Clients unkritisch); geringer Stromverbrauch und lange Lebensdauer der Endgeräte; schneller Gerätetausch. Nachteile: Abhängigkeit von Netzwerk und Terminalserver – fallen sie aus, steht das Lager; zusätzliche Serverhardware und Lizenzen (RDS-CALs); Peripheriegeräte (Scanner, Etikettendrucker) müssen unterstützt werden; ungeeignet für grafikintensive Anwendungen.', keywords: ['zentrale Verwaltung', 'Daten', 'Strom', 'Netzwerk', 'Server', 'RDS-CAL'], explanation: 'Je zwei begründete Punkte.' },
    { id: 'b04-q022', kind: 'number', skill: 'virt.vdi', difficulty: 3, prompt: '25 PCs mit je **55 W** werden durch Thin Clients mit je **7 W** ersetzt. Betrieb 9 h/Tag an 225 Tagen, Strompreis 0,32 €/kWh. Wie viel Euro werden pro Jahr an den Arbeitsplätzen eingespart? (auf Cent runden)', answer: 777.6, tolerance: 0.01, unit: '€', hints: ['Leistungsdifferenz · Anzahl · Stunden.'], explanation: '(55 − 7) W · 25 = 1.200 W = 1,2 kW; 9 · 225 = 2.025 h; 1,2 kW · 2.025 h = 2.430 kWh; · 0,32 €/kWh = **777,60 €**.' },
    { id: 'b04-q023', kind: 'match', skill: 'virt.vdi', difficulty: 1, prompt: 'Ordne die Begriffe zu.', left: ['Fat Client', 'Thin Client', 'Terminalserver (RDS)', 'VDI'], right: ['vollwertiger PC mit lokalen Programmen', 'schlankes Zugangsgerät ohne lokale Daten', 'viele Benutzersitzungen auf einem Server-Betriebssystem', 'jeder Benutzer hat eine eigene Desktop-VM'], answer: [0, 1, 2, 3], explanation: 'Siehe Begriffstabelle der Lektion.' },
    { id: 'b04-q024', kind: 'text', skill: 'virt.snapshot', difficulty: 2, prompt: 'Nach welcher Regel sollen Backups mit **3** Kopien, **2** Medientypen und **1** Kopie außer Haus angelegt werden? (Zahlenfolge)', accept: ['3-2-1', '321', '3-2-1-Regel', '3 2 1', '3-2-1 regel'], explanation: '**3-2-1-Regel** (erweitert: 3-2-1-1-0).' },
    { id: 'b04-q025', kind: 'number', skill: 'virt.snapshot', difficulty: 2, prompt: 'Vollsicherung am Sonntag, **inkrementelle** Sicherungen Montag bis Samstag jeweils abends. Am Samstagmittag fällt der Server aus. Wie viele Sicherungen müssen insgesamt eingespielt werden?', answer: 6, unit: 'Sicherungen', misconceptions: [{ answer: '2', error: 'backup-inkrementell-differenziell', why: '2 wären es bei **differenzieller** Sicherung. Inkrementell braucht alle Sicherungen seit der Vollsicherung.' }, { answer: '7', error: 'backup-zeitpunkt', why: 'Die Samstagabend-Sicherung fand noch nicht statt.' }], explanation: 'Voll (So) + Mo, Di, Mi, Do, Fr = **6** Sicherungen.' },
    { id: 'b04-q026', kind: 'table', skill: 'virt.snapshot', difficulty: 2, prompt: 'Snapshot oder Backup? Trage ein, was für den Zweck geeignet ist.', columns: [{ key: 'x', label: 'Snapshot / Backup', type: 'text' }], rows: [{ label: 'kurz vor einem Windows-Update einen Rückweg sichern', cells: { x: { answer: 'Snapshot', accept: ['prüfpunkt', 'checkpoint'] } } }, { label: 'Schutz bei Brand im Serverraum', cells: { x: { answer: 'Backup', accept: ['datensicherung'] } } }, { label: 'Wiederherstellung nach Ransomware-Verschlüsselung des Speichers', cells: { x: { answer: 'Backup', accept: ['datensicherung'] } } }, { label: 'Konfigurationsänderung testen und ggf. sofort zurücksetzen', cells: { x: { answer: 'Snapshot', accept: ['prüfpunkt', 'checkpoint'] } } }], explanation: 'Snapshots: kurzfristiger Rückweg auf demselben Speicher. Backups: unabhängige Kopie für echte Schadensfälle.' },
    { id: 'b04-q027', kind: 'free', skill: 'virt.snapshot', difficulty: 2, prompt: 'Erkläre den Unterschied zwischen **differenzieller** und **inkrementeller** Sicherung und nenne je einen Vorteil.', modelAnswer: 'Die differenzielle Sicherung speichert alle Änderungen seit der letzten Vollsicherung; zur Wiederherstellung braucht man nur die Vollsicherung und die letzte differenzielle Sicherung (schnellere Wiederherstellung). Die inkrementelle Sicherung speichert nur die Änderungen seit der letzten Sicherung (egal welcher Art); sie ist am schnellsten und braucht am wenigsten Speicherplatz, zur Wiederherstellung werden aber die Vollsicherung und alle folgenden inkrementellen Sicherungen benötigt.', keywords: ['seit Vollsicherung', 'seit letzter Sicherung', 'Wiederherstellung', 'Speicherplatz'], explanation: 'Bezugspunkt: Vollsicherung (differenziell) vs. letzte Sicherung (inkrementell).' },
    { id: 'b04-q028', kind: 'single', skill: 'virt.basics', difficulty: 2, prompt: 'VirtualBox meldet beim Start einer 64-Bit-VM, dass die Hardware-Virtualisierung nicht verfügbar ist. Was prüfst du zuerst?', options: ['Ob Intel VT-x bzw. AMD-V im UEFI aktiviert ist', 'Ob die Festplatte mit GPT partitioniert ist', 'Ob Secure Boot deaktiviert ist', 'Ob der Bildschirm Full HD unterstützt'], answer: 0, distractors: { '1': { why: 'Der Partitionsstil hat mit der CPU-Virtualisierung nichts zu tun.', error: 'virt-voraussetzung' }, '2': { why: 'Secure Boot beeinflusst die CPU-Virtualisierung nicht.', error: 'virt-voraussetzung' }, '3': { why: 'Die Bildschirmauflösung spielt keine Rolle.', error: 'virt-voraussetzung' } }, explanation: 'Hardwarevirtualisierung muss in der Firmware eingeschaltet sein (VT-x/AMD-V).' },
    { id: 'b04-q029', kind: 'number', skill: 'virt.sizing', difficulty: 3, prompt: 'Host: **48 physische Kerne**, erlaubte Überbuchung **4 vCPUs pro Kern**, **384 GB RAM** (davon 32 GB Reserve). VM-Profil: **8 vCPUs, 32 GB RAM**. Wie viele VMs sind maximal möglich?', answer: 11, unit: 'VMs', hints: ['RAM- und CPU-Grenze getrennt berechnen, dann das Minimum nehmen.'], misconceptions: [{ answer: '24', error: 'vm-engpass', why: '24 ist die CPU-Grenze – der RAM begrenzt stärker.' }, { answer: '6', error: 'vm-ueberbuchung', why: 'Die erlaubte Überbuchung 4:1 wurde nicht berücksichtigt.' }], explanation: 'RAM: (384 − 32) / 32 = 11. CPU: 48 · 4 / 8 = 24. Minimum → **11 VMs**.' },
    { id: 'b04-q030', kind: 'free', skill: 'cloud.service', difficulty: 3, prompt: 'Die Elektro Krämer GmbH möchte ihren Webshop in die Cloud verlagern. Vergleiche **IaaS** und **PaaS** für diesen Zweck und gib eine begründete Empfehlung.', modelAnswer: 'Bei IaaS mietet die Firma virtuelle Server und betreibt Betriebssystem, Webserver, Datenbank und Shop selbst: volle Kontrolle und freie Softwarewahl, aber hoher Administrationsaufwand (Patches, Härtung, Skalierung, Backups des OS). Bei PaaS stellt der Anbieter Betriebssystem, Laufzeit und verwaltete Datenbank bereit; die Firma kümmert sich nur um die Shop-Anwendung und Daten, Skalierung ist oft automatisch – dafür weniger Kontrolle und stärkere Bindung an den Anbieter. Empfehlung: Wenn die Shop-Software auf der PaaS-Plattform unterstützt wird und wenig eigenes Admin-Personal vorhanden ist, PaaS (weniger Betriebsaufwand, bessere Skalierung); wenn spezielle Software/Konfiguration nötig ist, IaaS.', keywords: ['Kontrolle', 'Administrationsaufwand', 'Patches', 'Skalierung', 'Bindung', 'Empfehlung'], explanation: 'Abwägung Kontrolle vs. Aufwand mit begründeter Empfehlung.' },
    {
      id: 'b04-q031', kind: 'table', skill: 'virt.basics', difficulty: 1,
      prompt: 'Ordne jedes Produkt dem Hypervisor-Typ zu. Trage **1** (Bare Metal) oder **2** (Hosted) ein.',
      columns: [{ key: 't', label: 'Typ', type: 'number' }],
      rows: [
        { label: 'VMware ESXi', cells: { t: { answer: '1' } } },
        { label: 'Oracle VirtualBox', cells: { t: { answer: '2' } } },
        { label: 'Proxmox VE', cells: { t: { answer: '1' } } },
        { label: 'Microsoft Hyper-V', cells: { t: { answer: '1' } } },
        { label: 'VMware Workstation', cells: { t: { answer: '2' } } },
      ],
      misconceptions: [{ cell: '2:t', answer: '2', error: 'proxmox-typ2', why: 'Proxmox VE wird direkt auf dem Server installiert und nutzt KVM im Linux-Kernel – das ist Typ 1, auch wenn darunter Debian steckt.' }],
      explanation: '**Typ 1:** ESXi, Proxmox VE, Hyper-V. **Typ 2:** VirtualBox, VMware Workstation.\n\nPrüffrage: Wird das Produkt direkt auf die leere Hardware installiert (Typ 1) oder als Programm in ein Arbeitsplatz-Betriebssystem (Typ 2)?\n\nHäufiger Fehler: Proxmox VE als Typ 2 einordnen, weil darunter Debian läuft. Der Hypervisor KVM ist aber Teil dieses Linux-Kernels – kein Programm auf einem fremden Betriebssystem.',
    },
  ],
};
