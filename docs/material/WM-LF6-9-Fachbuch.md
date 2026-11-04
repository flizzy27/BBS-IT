# WM-LF6-9-Fachbuch – Auswertung Westermann „IT-Berufe Fachstufe, Lernfelder 6–9“

Stand: November 2026. Nur eigene Worte; Quellenangaben als **PDF-Seite (PDF)**. Umrechnung: PDF-Seite = gedruckte Seite + 1 (Vorsatz). Bei „S. xx“ ohne Zusatz ist die PDF-Seite gemeint.
Abdeckungs-Begriffe: `voll`, `teilweise`, `fehlt`. Relevanz: `ap1`, `ap1-teilweise`, `ap2`, `unnötig`.
**Hinweis zur Belegbarkeit:** Ob ein Thema in der echten AP1 vorkommt, ist hier nicht belegt (siehe `docs/AP1-PRUEFUNGSANALYSE.md`). Die Relevanz-Einstufungen sind eine begründete Einschätzung anhand Katalogauszug (`docs/AP1-RELEVANZ.md` Abschnitt 3) und Aufgabenlogik, keine Prüfungsstatistik.

---

## 1. Steckbrief

| Punkt | Wert |
|---|---|
| Titel | IT-Berufe, Fachstufe **Technische IT-Berufe**, Lernfelder 6–9 (Schülerbuch) |
| Verlag / Auflage | Westermann (Bildungsverlag EINS), 1. Auflage 2022, Best.-Nr. 220036; Hrsg. Gratzke; Autoren Gratzke, Käppel, Kullin, Patett |
| Umfang | 437 PDF-Seiten, Textebene vorhanden (OCR-Artefakte nur in Abbildungen) |
| Modellunternehmen | „JIKU IT-Solutions GmbH“ (Systemhaus Hamburg) |
| Begleitmaterial | `220144_Download…` (Verträge, Muster, Java/Python-Code, Excel-Vorlagen), Arbeitsbuch (separat) |
| Aufbau | Je Lernfeld: Handlungssituation, Infoboxen, „Kompetenzcheck“ (meist Richtig/Falsch-Listen, Recherche-/Gruppenaufträge, wenige Rechenaufgaben), Verweis aufs Arbeitsbuch |

**Gesamturteil Prüfungsrelevanz**

| Lernfeld | PDF | Urteil | Begründung |
|---|---|---|---|
| LF6 Serviceanfragen bearbeiten | 10–77 | **ap1** (Kern, ca. 60 % davon wirklich nützlich) | Ticket, Support-Level, Priorität, SLA, KPI, Kommunikation, Wartung = Handlungsfelder der ersten 18 Monate. Viel Rahmenwerk-Lexik (ITIL-Praktiken, CMMI, COBIT) ist nur Hintergrund. |
| LF7 Cyber-physische Systeme | 78–149 | **ap2 / ap1-teilweise** | IoT-Grundlagen, Sensorik, MQTT, FMEA, Git/DevOps sind Fachstufe 2. Jahr; im AP1-Katalogauszug nicht genannt. Nur Anforderungsanalyse/Lastenheft und Inbetriebnahmeprotokoll berühren AP1 (in der App bereits da). |
| LF8 Daten systemübergreifend bereitstellen | 150–301 | **gemischt** | 3.1 Vorgehensmodelle, 3.3 OOP/UML/sichere Software, 3.4 Ergonomie, 3.8 Test/Abnahme = ap1-teilweise (UML/BPMN im neuen Katalog!). 3.2 Datenqualität/Datenquellen = ap1-teilweise bis ap2. 3.5 Java, 3.6 Python-Syntax, 3.7.4–3.7.8 SQL/JDBC/NoSQL/MongoDB = ap2 bzw. unnötig (SQL ab 2. Auflage nur AP2). |
| LF9 Netzwerke und Dienste bereitstellen | 302–427 | **ap1-teilweise / ap2** | Technische Grundlagen (Protokolle, Komponenten, Adressierung, WLAN/PoE/USV, Messen) = ap1, in der App meist besser abgedeckt. Lastenheft/Pflichtenheft, Make-or-Buy, Wirtschaftlichkeit, BSI-Bausteine, SDN/Zero Trust, Virtualisierungskonzept = eher AP2 (FISI „Analyse und Entwicklung von Netzwerken“). |

**Wichtigstes Ergebnis:** Die App deckt die AP1-nahen Teile des Buchs weitgehend ab, bei Netzwerk und UML/Ergonomie sogar genauer und aktueller als das Buch. Echte Lücken sind klein; dagegen enthält das Buch mehrere **Fachfehler und Konventionsabweichungen** (Abschnitt 5), die für Azubis verwirrend sind, die mit dem Schulbuch lernen.

---

## 2. Gliederung mit PDF-Seiten

| Kap. | Titel | PDF |
|---|---|---|
| 1 | **Serviceanfragen bearbeiten (LF6)** | 10–77 |
| 1.1 | Servicearten/-anforderungen: 1.1.1 Services (IMAC/R/D, Servicearten, Cloud) 11–15; 1.1.2 Management-Arten (ITIL-Prozesse) 15–18; 1.1.3 Standards/Rahmenwerke (ISO 20000, ITIL 4, CMMI, COBIT, FitSM) 19–25; 1.1.4 Recht (Gesetze, SLA/OLA/UC, SaaS-Vertrag, AV, § 14 UStG, Urheber-/Lizenzrecht) 25–34 | 11–34 |
| 1.2 | Serviceanfragen entgegennehmen: Ablauf/ACD/SPOC/RACI 34–37; Ticket, Support-Level, Priorität, Eskalation, Workaround 37–44; KPI 44–46 | 34–47 |
| 1.3 | Vertiefend analysieren: Analysemethoden (5-Why, DMAIC, Ishikawa, Ist/Ist-nicht) 47–51; Monitoring 51–55; Teamanalyse (Ticketformular, Ticketsysteme, Reaktionszeit, Störungs-/Problem-/Change-Fälle) 55–62 | 47–62 |
| 1.4 | Kommunikation: Kanäle, Eisenhower/Pareto 63–65; Modelle (Schulz von Thun, Streich, Lewin, Kepner-Tregoe) 65–68; Gespräch/Deeskalation 68–70 | 63–70 |
| 1.5 | Instandhaltung/Prävention (reaktiv→prädiktiv, APM/EUEM, FMEA-Überblick) 70–73; Medienkompetenz/Schulung 73–76 | 70–76 |
| 2 | **Cyber-physische Systeme (LF7)** | 77–149 |
| 2.1 | IoT/CPS: Grundlagen, Anwendungsfelder (Smart Home/Factory/Mobility/Health/City), Aufbau (Sensorik, SBC, MCU) | 79–100 |
| 2.2 | Kommunikation: IoT-Funk/LPWAN 101–104; MQTT 104–109; OPC UA 110–111 | 101–112 |
| 2.3 | Bestehendes CPS analysieren (Serverraum-Gefahren, Datenfluss, I2C/SPI/UART) | 112–120 |
| 2.4 | Erweiterung planen: Requirements Engineering, Stakeholder, DevOps, Git | 121–131 |
| 2.5 | Inbetriebnahme: Prototyp, Arduino-Sketch, MQTT-Broker, Test/Protokoll, Lessons Learned | 132–139 |
| 2.6 | Optimieren: Gefahren OT/IT, **FMEA (RPZ)** 141–146, Vorschlagswesen/Elevator Pitch 146–148 | 140–149 |
| 3 | **Daten systemübergreifend bereitstellen (LF8)** | 149–301 |
| 3.1 | Projekte/Vorgehensmodelle: Wiederholung Projekt 150–152; Wasserfall/V (kurz) 152–153; **Scrum** 154–160, **Kanban** 160–162, XP 162–163 | 150–164 |
| 3.2 | Datenqualität (11 Kriterien) 165–169; Datenquellen, Open Data, CSV/XML/JSON, FTP/SMB, SOAP/REST 170–176; Heterogenität, DWH/Data Lake 176–179 | 165–179 |
| 3.3 | OOP/UML: Paradigmen 180–184; OOP-Konzepte 184–188; UML-Überblick 189–193; Use-Case 193–196; Klassendiagramm 196–201; Aktivitätsdiagramm 201–205; **sichere Software** 205–209 | 180–209 |
| 3.4 | Softwareergonomie, UX, Barrierefreiheit, Corporate Design, Sketch/Wireframe/Mockup/Prototyp | 209–215 |
| 3.5 | Java (Syntax, Konsole, OOP, Swing) | 215–249 |
| 3.6 | Python (OOP, tkinter) | 250–262 |
| 3.7 | Datenbanken: Datenmodelle SQL/NoSQL/Big Data 263–267; Designprozess/ER 267–271; **Normalisierung** 271–275; SQL (JOIN, Unterabfragen, Rechte) 275–280; JDBC 280–284; NoSQL/MongoDB 284–289; Cloud-DB 289–292 | 263–292 |
| 3.8 | Test (Black/White-Box, Äquivalenzklassen, Grenzwerte, Entscheidungstabelle) 292–295; Testdatengeneratoren 295–298; **Abnahme/Abnahmeprotokoll** 298–301 | 292–301 |
| 4 | **Netzwerke und Dienste bereitstellen (LF9)** | 301–427 |
| 4.1 | Kundenanforderungen, Erstgespräch, Lastenheft-Vorlage, Pflichtenheft, Redundanz 302–315; DevOps/Orchestrierung 316–319 | 302–319 |
| 4.2 | Lastenhefte Kleinst-/KMU-/Großunternehmen | 319–323 |
| 4.3 | Technik: IPv4/IPv6, OSI/TCP-IP, Kabel, WLAN, Adressen, Ports, Subnetting 324–331; TCP/UDP, Serverarten 332–333; DHCP/DNS 333–334; Komponenten (AP, Firewall, DNS-Filter, Switch, VoIP/SBC, Repeater, Router, Gateways) 335–345; Virtualisierung/SaaS/IaaS 345–352; Server-Hardware (Dedicated/VDS/VPS/NAS) 353–356; RZ, NAS/SAN/DAS, USV 356–358; WAN (FTTH, DOCSIS, Mobilfunk, DSL) 359–362 | 324–362 |
| 4.4 | Wirtschaft (Make-or-Buy, Kosten, Kalkulation, ROI/Amortisation/TCO, Finanzierung) 362–369; Sicherheit (BSI-Gefährdungen, Zonen/DMZ, Firewall, SDN, Zero Trust, Endpoint) 369–382; Nachhaltigkeit (PUE, Kühlung) 382–385 | 362–385 |
| 4.5 | Pflichtenheft: Ausschreibung/Vergabe 385–389; funktionale Anforderungen (Glasfaser, Etage/Gebäude, DMZ, IP-Schema, WLAN-Signalstärke, VLAN, VPN, PoE, WLAN-Sicherheit, Switch/STP, Firewall, Router, Server) 390–401; nicht funktionale (Open-Source-Lizenzen, Recht) 401–403 | 385–403 |
| 4.6 | Installation: Verlegen, Crimpen, T568A/B, LSA-Patchpanel 404–406; Router/Fritz!Box 407–408; Server (Image-Prüfsumme, Installation, Nextcloud, Härten/ufw) 408–414 | 403–414 |
| 4.7 | Prüfen/Messen: Kabeltester 415; Linux-Befehle (arp, ip, lsof, nmcli, netstat, nslookup, ping, tcpdump, traceroute) 415–419 | 414–419 |
| 4.8 | Virtualisierungskonzept (Proxmox), Managed Services, Marktplätze, Proof of Concept | 420–427 |

---

## 3. Je Kapitel/Thema

### 3.1 LF6 – Serviceanfragen (PDF 10–77)

| Thema (PDF) | Kernaussagen in eigenen Worten | Aufgabentypen im Buch | Relevanz | Abdeckung App |
|---|---|---|---|---|
| Servicearten (12–15) | Katalog von Service-Begriffen: Break/Fix (Techniker vor Ort, Abrechnung nach Aufwand), Swap (Austauschgerät), DIY (Kunde repariert selbst ohne Garantieverlust), Garantie (kostenlos wegen Anspruch) vs. Kulanz (freiwillig), Managed Services (laufend, vorab im SLA geregelt), Helpdesk, Wartung, Reparatur, Outsourcing, Einweisung/Schulung; Servicezeit 24/7 bzw. 12/5. | Begriffe zu Beschreibungen zuordnen; Abkürzungen (FSM, ITSM, KPI, MSP, SOA, IMAC/R/D, SaaS, PaaS) erklären | ap1 | `teilweise` b06-l01, w04 (Garantie/Kulanz), b04 (SaaS/PaaS). **Fehlt:** Break/Fix, Swap, DIY, FSM, SOA, Servicekatalog/Serviceportfolio als Begriffe. |
| IMAC/R/D (14–15) | Lebenszyklus eines IT-Arbeitsplatzes als Dienstleistungsraster: Install, Move, Add, Change, Remove, Dispose (im Stellenprofil IMACD). Kunden ordnen Anfragen einer Phase zu. | Recherche, Zuordnung | ap1 | **`fehlt`** (kein Treffer im Repo) |
| ITIL-Managementarten (15–18) | Liste von Prozessen (Service Level, Capacity, Availability, Continuity, Catalog, Security, Config, Change, Incident, Request, Problem, Knowledge, Access, CSI). | Aussage → passende Managementart zuordnen | ap1-teilweise (nur Incident/Problem/Change/Request/Knowledge/Level sinnvoll) | `teilweise` b06-l05 (I/P/C/Request, Known Error); Rest nicht nötig |
| Rahmenwerke (19–25) | ISO/IEC 20000 = Norm („Was“), ITIL 4 / COBIT / FitSM = Rahmenwerke („Wie“); ITIL 4: Service-Wertschöpfungskette (6 Aktivitäten), 34 Praktiken (14/17/3), 4 Dimensionen, leitende Prinzipien; CMMI Reife-/Fähigkeitsgrade; FitSM frei und schlank. | Richtig/Falsch, Pro/Kontra-Diskussionen | ap1-teilweise (Begriffsebene) | `teilweise` b05/b06 (ITIL, FitSM, ISO 20000 genannt). CMMI/COBIT/ITIL-Wertschöpfungskette `fehlt` – bewusst (siehe 6). |
| Rechtsgrundlagen (25–30) | Verträge: SLA (Anbieter–Kunde), OLA (intern), UC (Subunternehmer); SaaS-Vertrag rechtlich meist Miete (+ Werkvertrag bei Customizing/Updates); AV-Vertrag nach Art. 28 DSGVO, 9 Bestandteile (Bitkom-Muster); Rechnung § 14 UStG; Strafnormen §§ 202a, 263a, 303a/b StGB. | Vertragsart zuordnen; EVB-IT-Servicevertrag mit Hausbedingungen vergleichen | ap1-teilweise | `voll` b06-l04 (SLA/OLA/UC), w04 (Vertragsarten, SaaS), w05 (Rechnung), s02 (AV). |
| Urheber-/Marken-/Lizenzrecht (31–33) | UrhG schützt Software; MarkenG; CC BY / BY-NC; EULA, GPL (Copyleft, vier Freiheiten) vs. LGPL/BSD/MIT; Lizenztypen (Named User, CAL, Concurrent/Floating, KMS, OEM, SPLA, Zweitkopierrecht, Gebrauchtlizenz nach EuGH). | Recherche zu Lizenzvarianten | ap1 | `voll` b03/w04. Lücken: Creative Commons, MarkenG, KMS (Randthemen). |
| Annahme/Ticket (34–40) | Kontaktwege (Servicenummer, ACD mit IVR, SPOC), RACI nach FitSM-Rollen (Case Owner, Service Owner), 9-Schritte-Ablauf: Melden → Protokollieren → Kategorisieren → Klassifizieren → Priorisieren → 1st-Level-Diagnose → ggf. Eskalation (funktional/hierarchisch) → Diagnose/Lösung → Schließen. Ticket = Datensatz, kein Schließen ohne Kundenbestätigung. | Ablauf beschreiben, Bearbeitungsfristen bewerten („Was veranlassen Sie als Case Owner?“), RACI-Matrix erstellen | **ap1** | `voll` b06-l01/l02. `teilweise`: ACD/IVR (nur w05 erwähnt), Kategorisierung vs. Klassifizierung als zwei Schritte. |
| Priorität & Reaktionszeit (40–41, 58–59) | Priorität aus Dringlichkeit × Auswirkung, Stufen 1–5 mit Maximalzeiten (Beispiel: 1 h/4 h/8 h/24 h/48 h); Major Incident; Workaround muss befristet und als Known Error geführt werden. Reaktionszeit = bis zur qualifizierten Aussage; Unterscheidung Störung (eingeschränkt) / dringende Störung (Service weg). | Fristen-Tabelle beurteilen; Wichtigkeits-Matrix diskutieren | **ap1** | `voll` b06-l03/l04 (+ Generator `sys.prio`). |
| KPI/Verfügbarkeit (44–46) | KPI: absolute, prozentuale, Zeitvergleichswerte; Ticketzahlen (offen/gelöst/eskaliert/wiedergeöffnet), Verfügbarkeit = (vereinbarte Servicezeit − Ausfallzeit)/vereinbarte Servicezeit·100, MTTR, MTBF, Anteil erreichter Serviceziele. | Zuordnungen, Ticketanalyse/KPI/SLA im Arbeitsbuch | **ap1** | `voll` (b06-l04, `sys.sla`; MTBF/MTTR-Formel dort). `teilweise`: SLA-Erfüllungsquote, Ticketstatistik als Tabelle. |
| Analysemethoden (47–51, 67) | FAQ/Knowledge Base, Pareto (20/80), 5-Why, DMAIC (Define/Measure/Analyze/Improve/Control), Ishikawa (Fischgräte), Ist/Ist-nicht-Matrix (Kepner-Tregoe: Was/Wo/Wann/Wie viel). | Methode je Fall anwenden | ap1 | `voll` b06-l06 (5-Why, Ishikawa, Pareto, DMAIC; Generator `sys.pareto`). **`fehlt`:** Kepner-Tregoe (Ist/Ist-nicht). |
| Monitoring (51–55) | Überwachung von Geräten, Diensten, Ressourcen, Netzen, Umwelt; Kennzahlen Bandbreite/Durchsatz, Latenz (RTT), Paketverlust, SYN/FIN-Fehler; Logdateien mit Schweregraden (kritisch, Warnung, Fehler, Info, Debug); Event Viewer (eventvwr), SNMP, Sniffer. | Fachbegriffe zuordnen; Ereignisanzeige öffnen und Meldungen beschreiben; „Wie Latenz verkürzen?“ | ap1 | `teilweise` b06-l01 (Monitoring, Schwellwerte), m13 (ping/pathping, Paketverlust), b06 (Ereignisanzeige). **Fehlt:** Log-Schweregrade, SNMP/Syslog-Begriffe als Monitoring-Werkzeuge in b06, RTT-Wert aus ping-Ausgabe lesen. |
| Typische Störungen (60–61) | Netzprobleme: Duplex-Mismatch, Broadcast-Sturm, doppelte IP/MAC/Hostnamen, DHCP-Ausfall; Hardware-/Software-Beispiele. | Fallanalyse | ap1 | `voll` m13 (+ m08). |
| Change (61–62) | Change = Hinzufügen/Ändern/Entfernen; RFC; Standard-Change; Level-1/2/3 (Auswirkung); Genehmigung nach Nutzen/Risiko/Machbarkeit. | Fälle einordnen | ap1-teilweise | `voll` b06-l05 (Standard/normal/Notfall). Hinweis: Buch nutzt **Level 1–3** statt „Notfall-Change“ – anderes Schema, beide zulässig. |
| Kommunikation (63–70) | Synchron/asynchron, Netiquette; Eisenhower (4 Felder), Pareto; Vier-Seiten-Modell; Streich (7 Phasen), Lewin (Auftauen–Bewegen–Einfrieren); Diskussionstypen; Telefon-Tipps (Zauberwörter, Anti-Wörter), Deeskalation. | Beispiele, Rollenspiele, Tagungsplanung | ap1-teilweise | `voll` b06-l07 (Vier Seiten, Telefon/E-Mail). **Fehlt:** Eisenhower-Matrix, Deeskalationsschritte als eigener Block, Lewin/Streich (Change-Kommunikation). |
| Wartung/Prävention (70–73) | Reaktiv (nach Ausfall), periodisch (Zeitplan: Backup, Patches, USV-Check), präventiv (Monitoring), prädiktiv (KI/Analytics); APM/EUEM (synthetisch, RUM, Gerät). FMEA-Arten. | Vorträge | ap1 (reaktiv/periodisch/präventiv); EUEM/FMEA ap2 | `teilweise` b06-l01 (reaktiv vs. proaktiv). **Fehlt:** Vier Wartungsarten + Wartungsplan, Beispiele pro Art. |
| Medienkompetenz/Schulung (73–76) | KMK-Rahmen, Medienkonzept, TOM kurz, Kundenberatung. | Konzept erstellen | unnötig | – |
| Begleitdateien LF6 | EVB-IT-Verträge, Wartungsvertrag-Muster, Preisliste Wartungspakete, SLA-/Reaktionszeit-Auszug, AV-Vereinbarung, Ticketformular, Servicebericht. | – | ap1 (als **Beleg-Vorlage**) | siehe Abschnitt 4, Lücke L2 |

### 3.2 LF7 – Cyber-physische Systeme (PDF 77–149)

| Thema (PDF) | Kernaussagen | Typ | Relevanz | Abdeckung |
|---|---|---|---|---|
| IoT/CPS-Grundlagen (79–100) | IoT = vernetzte, eindeutig adressierbare Objekte mit Standardprotokollen; CPS = Sensorik + Verarbeitung (MCU/SBC) + Aktorik + Kommunikation; Industrie 4.0, Automatisierungspyramide (Feld → ERP), Smart Home/Factory/Mobility/Health/City, AR/VR; Chancen/Risiken; Raspberry Pi (SBC mit OS) vs. Arduino/ESP32 (MCU, zyklisches Programm). | Richtig/Falsch, Recherche, Aufbau eines Versuchsaufbaus | ap2 (Begriffe ap1-teilweise) | `fehlt` (IoT nur als Randwort in m01/m07/b04). |
| IoT-Funk (101–104) | Mobilfunk 2G–5G, WLAN, Bluetooth/BLE, ZigBee, Z-Wave (≈100 kbit/s, 900 MHz, 30 m), LoRaWAN/Sigfox/NB-IoT (LPWAN). | Zuordnung | ap2 | `fehlt` |
| MQTT (104–109) | Publish/Subscribe über Broker, Topics mit `/`, Wildcards `+` (eine Ebene) und `#` (alle darunter), QoS 0/1/2 (höchstens/mindestens/genau einmal; Handshake PUBACK bzw. PUBREC/PUBREL/PUBCOMP), Retained Messages, Last Will, Keep Alive; keine eigene Sicherheit (TLS/Benutzer/ACL). | Wildcard-Abonnements bestimmen, QoS-Einsatzfelder | ap2 | `fehlt` |
| OPC UA / M2M (110–112) | herstellerunabhängige Industrie-Kommunikation mit Sicherheitsstandards. | Vergleich MQTT/OPC UA | ap2 | `fehlt` |
| Serverraum-Gefahren (113) | Temperatur, Feuchte, Einbruch, Wasser, Brand, Strom – Umgebungsmonitoring. | – | ap1 | `voll` h04/s01 (Serverraum, USV, Brandschutz). |
| Schnittstellen I2C/SPI/UART (119–120) | Seriell (2 Leitungen), Bus mit SDA/SCL, SPI mit Master/Slave. | – | ap2 | `fehlt` |
| Requirements Engineering (121–126) | Anforderungskatalog, Lastenheft, Pflichtenheft; Stakeholder; Use Cases, Akzeptanzkriterien. | Anforderungsanalyse | ap1-teilweise | `voll` w01/b05. |
| DevOps, Git (126–131) | CI/CD, CALMS; Git: add/commit/branch/checkout/merge. | Befehle anwenden | ap1-teilweise (Git/CI-Begriffe) | `voll` p05 (Git), b04 (CI/CD kurz). |
| Inbetriebnahme/Test/Lessons Learned (132–139) | Prototyp-Arten, Funktionstest, Inbetriebnahmeprotokoll, Review. | – | ap1-teilweise | `voll` w05/p05. |
| **FMEA** (141–146) | Strukturanalyse, Funktion, Fehler, Folgen; RPZ = B·A·E (je 1–10, Bereich 1–1000), Maßnahmen ab RPZ ≈ 100–150 oder Einzelwert ≥ 8; E=1 bedeutet gut entdeckbar, E=10 praktisch nicht. | RPZ berechnen, Richtig/Falsch | ap2 | `fehlt` (nur Risiko = Wahrscheinlichkeit × Schaden in s01). |
| Vorschlagswesen, AIDA/Elevator Pitch (146–149) | – | – | unnötig | – |

### 3.3 LF8 – Daten systemübergreifend bereitstellen (PDF 149–301)

| Thema (PDF) | Kernaussagen | Typ | Relevanz | Abdeckung |
|---|---|---|---|---|
| Projektwiederholung (150–152) | Projekt = befristet, einmalig, Ziel; magisches Dreieck; Phasen. | R/F | ap1 | `voll` w05. |
| Vorgehensmodelle (152–164) | Klassisch (starr) vs. agil; Agiles Manifest (4 Werte); **Scrum**: Rollen PO/Scrum Master/Team, Ereignisse (Sprint, Planning, Daily, Review, Retrospektive), Artefakte (Product Backlog, Sprint Backlog, Inkrement, Definition of Done), Burn-down-Chart; **Kanban** (Board, WIP, wenige Regeln) im Vergleich; XP. | R/F, Vergleich Kanban/Scrum | ap1-teilweise (die Klasse behandelt es gerade in LS1) | **`teilweise`**: w05 nennt Wasserfall vs. Scrum in 1 Absatz. Rollen/Ereignisse/Artefakte, Kanban, XP `fehlen`. |
| Datenqualität (165–169) | Kriterien (Vollständigkeit, Korrektheit, Konsistenz, Aktualität, Genauigkeit, Eindeutigkeit, Redundanzfreiheit, Einheitlichkeit, Verständlichkeit, Zugänglichkeit, Zuverlässigkeit); Kennzahlen in Prozent (z. B. 23 von 100 veraltet → Aktualität 77 %; 2 von 100 falsche Genauigkeit → 98 %); Datenalterung. | R/F, Kriterium zuordnen | ap1-teilweise | **`fehlt`** (nur „Aktualität“ als Randwort). |
| Datenquellen/-formate (170–176) | Primär/sekundär; Open vs. Closed Data; CSV (Trenner, Kopfzeile), XML (Baum), JSON (Schlüssel-Wert, UTF-8); Transport FTP/SFTP/FTPS, HTTP, NFS, SMB; APIs: SOAP (XML, schwer, WSDL) vs. REST (HTTP-Methoden GET/POST/PUT/DELETE, zustandslos). | Formate umwandeln, SOAP/REST aus englischem Text | ap1-teilweise (Formate, REST-Begriffe), SOAP ap2 | `teilweise`: CSV in d01/m10, JSON in s02, XML in b01/b03 nur als Randwort; REST-API `fehlt`. |
| Heterogenität, DWH/Data Lake (176–179) | Technisch/syntaktisch/Datenmodell/strukturell heterogen; physische vs. virtuelle Integration; Data Warehouse (strukturiert) vs. Data Lake (unstrukturiert). | R/F | ap2 | `teilweise` (DWH-Erwähnung d02). |
| Paradigmen (180–184) | Imperativ (strukturiert → prozedural → OO) vs. deklarativ (funktional, logisch). | R/F | ap1-teilweise | `voll` p05-l01. |
| OOP (184–188) | Klasse/Objekt, Abstraktion, Kapselung (public/protected/private), Vererbung (Einfach/Mehrfach), Polymorphie (dynamische Bindung, Überladen, Überschreiben). | R/F, Klasse erweitern | ap1 | `voll` p04. |
| UML-Überblick (189–193) | 14 Diagrammtypen in Struktur- vs. Verhaltensdiagrammen; XMI. | R/F | ap1 | `voll` p04 (UML 2.5.1, 14 Typen). |
| Use-Case (193–196) | Systemgrenze, Akteur (Mensch/System), Assoziation, include (immer), extend (bedingt), Generalisierung; Beispiel Hotelbuchung, Webshop-Login. | Diagramm aus Text zeichnen | ap1 | `voll` p04-l06 – siehe Notationsabweichungen Abschn. 5. |
| Klassendiagramm (196–201) | Sichtbarkeit + − #, Assoziation/Aggregation (hohle Raute)/Komposition (gefüllte Raute), Multiplizität 0..*, Vererbung (Dreieck); Beispiel Zug/Waggon/Abteil, Maschinenverwaltung. | Diagramm aus Text zeichnen | ap1 | `voll` p04-l07. |
| Aktivitätsdiagramm (201–205) | Aktion, Kante, Verzweigung/Zusammenführung, Aufspaltung/Synchronisation, Partitionen (Swimlanes), Parameter; Beispiele: Durchschnitt mit Division-durch-null-Schutz, Restaurantbesuch; „größte von drei Zahlen“. | Algorithmus/Prozess modellieren | ap1 (UML neu im Katalog) | `voll` p04-l04/l05 (Aktivität ↔ Pseudocode). |
| Sichere Software (205–209) | Security/Privacy by Design; 6 Prinzipien: Minimal-, Berechtigungstrennung, vollständige Zugriffsüberwachung, mehrere Sicherheitsebenen, sicherer Ausfall (sichere Standards), benutzerfreundliche Sicherheit; 8 Umsetzungshinweise (Trennung Verarbeitung/Darstellung, Validierung, Verschlüsselung, Benutzerverwaltung, REST/SOAP-Whitelist, Unittests, SQL-Injection, Protokollierung); Einbettung in Scrum. | R/F, Sicherheit für eigenes Projekt planen | ap1-teilweise | `teilweise` p05 (Security by Design, Validierung, SQL-Injection, Whitelist, Minimalprinzip). **Fehlt:** „Sicherer Ausfall/Fail-safe defaults“, „benutzerfreundliche Sicherheit“, Protokollierung sicherheitsrelevanter Ereignisse, Sicherheit im Scrum-Ablauf. |
| Ergonomie/UX (209–215) | ISO 9241-110:2020 mit 7 Grundsätzen; UX-Design-Bestandteile, Usability, Zugänglichkeit/Barrierefreiheit; Corporate Design; Sketch → Wireframe (statisch/dynamisch) → Mockup → Prototyp. | R/F | ap1-teilweise | `voll` h05 (ISO 9241-110, BITV/BFSG). **Fehlt:** Sketch/Wireframe/Mockup/Prototyp-Abgrenzung, Usability-vs.-UX-Begriffe. |
| Java (215–249) | Syntax, JVM/Bytecode, Konsole, OOP, Swing. | Programmieren | unnötig/ap2 | App nutzt Java-Beispiele in p01–p05 (ok, AP1 nutzt Pseudocode). |
| Python (250–262) | Klassen, Getter/Setter, `__init__`, Vererbung (`super()`), kein Überladen, abstrakte Klassen via ABC, tkinter. | Programmieren | **für die Klasse wichtig**, für AP1 unnötig | `teilweise` (Python-Snippets in p01–p05, kein Python-OOP-Modul). |
| Datenmodelle SQL vs. NoSQL (263–267) | 5 V von Big Data; relational (ACID, vertikale Skalierung) vs. NoSQL (BASE, horizontale Skalierung; Key-Value/Dokument/Graph). | R/F | ap2 | ACID `voll` d01; BASE/NoSQL/Big Data `fehlt`. |
| DB-Design/ER/Normalisierung (267–275) | 4 Phasen (Analyse → konzeptionell ER → logisch relational + Normalisierung → physisch SQL); Chen-ER; 1.–3. NF mit Bestellungs-Beispiel; BCNF/4./5. NF nur genannt; Übernormalisierung. | ER aus Text, NF-Aufgaben | ap1-teilweise | `voll` d02 (Chen, Krähenfuß, (min,max), 1.–3. NF). |
| SQL/JDBC/MongoDB (275–292) | JOIN, GROUP BY, Unterabfragen, Rechte; MySQL via Java; MongoDB via Python; Cloud-DB. | – | ap2 / unnötig | `voll` d03 (SQL), Rest bewusst nicht. |
| Black-/White-Box, Äquivalenzklassen, Grenzwert, Entscheidungstabelle (292–295) | Testdaten aus Spezifikation vs. Code; Beispiel Temperatur ≤ 30 °C (Testwerte 30,00 → True, 30,01 → False). | Testfälle bestimmen | ap1-teilweise | `voll` p05-l05/l06 (Äquivalenzklassen, Grenzwerte). Entscheidungstabelle als Testwerkzeug `fehlt`. |
| Testdatengeneratoren (295–298) | Mockaroo etc. | – | unnötig | – |
| Abnahme/Abnahmeprotokoll (298–301) | Abnahme = Bestätigung der Vertragserfüllung; Rechtsfolgen (Zahlungsfälligkeit, Gewährleistungsbeginn, Verjährung, Beweislast beim Kunden); drei Akzeptanzebenen; Protokollinhalte (Teilnehmer, Version, Kriterien, Ergebnisse, offene Punkte, Verzicht, Unterschrift). | Abnahme durchführen/protokollieren | **ap1** | `voll` w05-l04 (+ b05/p05). |

### 3.4 LF9 – Netzwerke und Dienste (PDF 301–427)

| Thema (PDF) | Kernaussagen | Typ | Relevanz | Abdeckung |
|---|---|---|---|---|
| Erstgespräch/Lastenheft/Pflichtenheft (302–315, 319–323, 385–403) | Ist-Analyse → Ziele/Migrationsstrategie → Konzept; Skalierung (vertikal/horizontal), On-Premises-to-Cloud; Fragebogen zum Kundengespräch; Lastenheft (Muss/Kann/Abgrenzung, Qualitätsanforderungen), Pflichtenheft = fachliche Umsetzung durch Auftragnehmer (Kalkulation nicht offenlegen); Vernetzungsplan; Redundanzarten; Beispiel-Lastenhefte mit Zahlen (Download ≥ 10/Upload ≥ 5 Mbit/s, DHCP/DNS im Router, Firewall „ausgehend ja, eingehend nein“); Ausschreibung/Vergabe (Lose, Wertungsschema). | Anforderungen formulieren, Lastenheft ausfüllen | ap1-teilweise | `voll` w01/w02/b05 (Lasten-/Pflichtenheft, Anforderungsanalyse). Redundanzarten (funktional/räumlich/diversitär) `teilweise`. Ausschreibung/VOL `fehlt` (ap2/ kaufm.). |
| DevOps/Orchestrierung (316–319) | CALMS, Provisionierung, Orchestrierung (Docker/Kubernetes/Ansible), SOA/SOI. | – | ap2 | `teilweise` (p05/b04). |
| IPv4 vs. IPv6 (324) | 32 vs. 128 Bit; NAT bei IPv4 nötig; Header-Checksumme nur v4; IPv6 keine Router-Fragmentierung. Buch nennt „Paketgröße 576 / 1280 Byte“ (= Mindest-Reassembly bzw. Mindest-MTU). | – | ap1 | `voll` m07 (40-Byte-Header, keine Prüfsumme, Mindest-MTU 1280). |
| OSI/TCP-IP-Zuordnung (325) | Tabelle mit Protokollbeispielen je Schicht (ARP/NDP in „Netzzugang“, IPsec/ICMP/BGP/RIP in „Internet“, TLS/DTLS in „Transport“). | Zuordnung | ap1 | `voll` m02 – abweichende Zuordnung von TLS/ARP, siehe Abschn. 5. |
| Kabel/WLAN/LWL (325–326, 361–362) | UTP/STP/S-STP/S-FTP; Cat 5e (Gigabit), Cat 6a/7 (10GBASE-T, 100 m); WLAN-Raten a/b/g/n/ac/ax; LWL ab 10 Gbit/s; Fibre Channel für SAN. | Standards vergleichen | ap1 | `voll` m12 (Cat 5e–8, Wi-Fi 4–7, aktuellere Werte). |
| Adressierung (327–331) | MAC 48 Bit, IPv4-Aufbau, CIDR, Class A/B als Beispiel (2²⁴, 2¹⁶ Adressen), IPv6 Kürzungsregeln, Ports (16 Bit), Subnetting-Beispiel /24 → 16 × /28 (14 Hosts). | Rechnen | ap1 | `voll` m03–m07, m15. |
| Portliste (330) | 22 SSH, 53 DNS, 67/68 DHCP, 80/443, 161 SNMP, 143 IMAP, 445 SMB, 546/547 DHCPv6; fehlerhafter Eintrag „401 USV“. | – | ap1 | `voll` m10. |
| TCP/UDP, Serverarten (332) | TCP verbindungsorientiert, UDP ohne Kontrolle; Anwendungs-, Load-Balancer-, Backup-Server, Reverse Proxy. | – | ap1 | `voll` m10/m11/m02. |
| DHCP/DNS (333–334, 338) | DORA-Ablauf (Discover/Offer/Request/Ack, NAK); DNS-Auflösung; DNS im Klartext → DoT/DoH/DoQ; DynDNS; DNS-Filter (Pi-hole, schwarze Listen). | – | ap1 | `teilweise`: DHCP/DNS `voll` m11; **DoT/DoH, DNS-Filter, DynDNS fehlen**. |
| Komponenten (335–345) | AP-Auswahlkriterien (Wi-Fi-Gen., MU-MIMO, OFDMA, PoE, Ports); Firewall (Paketfilter, Stateful, DPI, IPS/NGFW, VPN-Gateway); Switch (managed/unmanaged, QoS, ACL, PoE, Ports, SFP); VoIP-TK, SBC; Repeater; Router (SoHo, Edge, Core; Ports, IPsec-Tunnel); Gateways (Hub, Bridge, **PowerLAN**, L3, NAT, TLS-Gateway, Proxy/ALG, VPN-Gateway). | Komponenten unterscheiden/auswählen | ap1 | `voll` m01/m08/m09/m12/m14. **Fehlt:** PowerLAN/Powerline, Repeater-Begriff, DNS-Filter, SBC (ap2). |
| Virtualisierung (345–352) | VM vs. Container, Hypervisor Typ 1/2, Snapshot, Überprovisionierung, Live-Migration, SaaS/Webhosting/IaaS, hyperkonvergent, GAIA-X. | R/F, Vergleich | ap1 | `voll` b04 – Fehlzuordnung im Buch, siehe Abschn. 5. |
| Server-Hardware/Hosting (353–356) | Dedicated/Bare Metal, VDS (exklusive Ressourcen), VPS (geteilt, ≥ 25 % mehr vCPU planen); ECC; RAID 1/5/6/10 mit Mindestplattenzahl (2/3/4/4); NAS-Kriterien. | Anbieter vergleichen | ap1-teilweise | `teilweise`: RAID bewusst nur Randthema (Katalog: ab 2. Auflage AP2). VDS/VPS/Dedicated `fehlt`. |
| RZ-Technik, NAS/SAN/DAS, USV (356–358) | Wärmerückgewinnung; NAS (Datei, LAN), SAN (Block, eigenes Netz), DAS; USV-Klassen **VFI/VI/VFD** nach IEC 62040-3; USV-Dimensionierung (Last, Überbrückungszeit, Schnittstelle). | Zuordnung, Auswahl | ap1 | `voll` h02 (DAS/NAS/SAN), h04 (USV, VFD/VI/VFI, PUE). |
| WAN (359–362) | FTTH + ONT, Kabel (DOCSIS 3.1: ≈ 1 Gbit/s down, bis 240 Mbit/s up), Mobilfunk 2G–5G, VDSL2/DSLAM, PPPoE; Cat-Daten. | Zuordnung, Raten | ap1 | `teilweise` m12/m01 (FTTx/DSL/LTE); **DOCSIS/Kabel-Anschluss, GSM–5G-Raten-Tabelle fehlen**. |
| Wirtschaft (362–369) | Make-or-Buy-Kriterien; Anschaffungskosten (§ 255 HGB); Kalkulationsschema Handel/Fertigung/Dienstleistung; Cloud-Preismodelle (Pay-per-use, Reserved, Combined, Pay-as-you-grow); Nutzwertanalyse; **ROI/Amortisation/TCO**, Kauf/Leasing/Miete, Soll-Ist-Vergleich. | Rechenaufgaben (Selbstkosten, ROI/Amortisation, Finanzierungsvergleich Darlehen/Leasing/Miete, Zeit-/Kostenabweichung) | ap1 | `voll` w02/w03 (Bezugs-/Handelskalkulation, Nutzwert, Amortisation, TCO, Kauf/Leasing/Miete). **Fehlt:** ROI-Kennzahl, Soll-Ist-Vergleich, Cloud-Preismodelle, Make-or-Buy-Kriterienliste für Netze (b03 hat Make-or-Buy für Software). **Definitionsabweichung beim ROI, siehe Abschn. 5.** |
| Sicherheit (369–382) | BSI-Gefährdungen/Bausteine NET.1.1–NET.4.x; Schutzbedarf (Struktur-/Schutzbedarfsfeststellung); TOM nach § 64 BDSG (14 Kontrollen); AV, Patches, HTTPS/Let’s Encrypt, VPN; Reverse Proxy; Segmentierung, P-A-P-Struktur, DMZ; Firewall-Generationen, IDS/IPS, DPI, Regelwerk DROP/REJECT/ACCEPT; Zero Trust, SDN (Control/Data Plane), SASE; Endpoint-Security. | R/F, Risikoanalyse | ap1 (Firewall/VPN/DMZ/Schutzbedarf), ap2 (SDN/SASE/NET-Bausteine) | `voll` m14/s01/s02/s04. **Fehlt:** DROP vs. REJECT, DPI, P-A-P-Struktur/ALG (nur Kurzerwähnung), BSI-Baustein-Nummern (nicht nötig). |
| Nachhaltigkeit (382–385) | PUE (Spanne 1,6–2, Optimum ca. 1,1), Kühlung/Abwärme, ISO 14001, Refurbishing/Recycling. | – | ap1-teilweise | `voll` h04 (PUE-Rechnung). |
| IP-Schema/WLAN/VLAN/VPN/PoE (390–398) | FTTx-Varianten und Zwangstrennung; Etagen-/Gebäudeverkabelung (Patchpanel/Switch), DMZ; IPv4/IPv6-Beispiele; WLAN-Signalstärke in dBm (0 dBm = 1 mW, −10 → 0,1 mW, Faktor 10 je 10 dB; gut ca. −30…−40, kritisch < −85); Access-Point-Platzierung nach Raumplan; VLAN 802.1Q; VPN (Remote-Access, Site-to-Site, IoT); PoE af/at/bt; WPA3/WPA2, Schlüssel ≥ 20 Zeichen, WPS, Mesh; STP/RSTP, L2/L3-Switch; Firewall-/Router-Planung. | Anzahl nutzbarer Hosts /25–/27 berechnen, PoE-Vorteile, Broadcast-Sturm skizzieren | ap1 | `voll` m03–m09, m12, m14. **Fehlt: dBm/Signalstärke/Rauschabstand, AP-Platzierung nach Messwerten, WLAN-Schlüssellänge/WPS.** |
| Installation (404–414) | Kabelkanäle, 1 Dose = 1 Kabel zum Verteiler; Crimpen RJ45, Schirm umlegen; T568A/B an **beiden** Enden gleich; LSA-Anlegetechnik; Doku der Portzuordnung; Router-Erstinstallation (Fritz!Box 192.168.178.1, Passwort Rückseite, DHCP-Bereich, Server statisch außerhalb); Server: ISO-Prüfsumme (SHA-256) und Signatur prüfen, Updates automatisch, ufw (22/80/443), Härten. | Werkzeuge beschreiben | ap1 | `teilweise` m12 (T568A/B, Auto-MDI-X, Patchfeld, Messung), m13. **Fehlt:** Prüfsumme/Signatur eines Images prüfen (nur m14 theoretisch), Server-Härtung (s05 teilweise), Crimp-/LSA-Werkzeuge. |
| Prüfen/Messen (415–419) | Kabeltester (LEDs 1–8 synchron + G), Buchsen-LEDs (grün Link, gelb Speed); Linux-Befehle arp, ip a/neigh/route, lsof, nmcli, netstat (TIME_WAIT-Häufung ≈ DDoS-Indiz), nslookup, ping, tcpdump, traceroute, bmon. | Ausgabe lesen | **ap1** | `voll` m13 (Windows und Linux-Befehle, ip, netstat, nslookup, traceroute). **Fehlt:** Kabeltester/Wiremap-Auswertung (Fehlerbilder: Unterbrechung, Kurzschluss, vertauschte/gekreuzte Paare), tcpdump, nmcli (unnötig). |
| Virtualisierungskonzept (420–427) | Proxmox-Fallstudie, VDS statt eigener Server, Leistungsstufen der Mitwirkung (gering/mittel/hoch), Managed Services, Proof of Concept. | Präsentation | ap2 | `teilweise` b04/w05. |

---

## 4. Lückenliste (priorisiert)

Prinzip: nur ergänzen, was in der Prüfung plausibel vorkommt und auf Buchinhalten aufbaut. Alles Netzwerk-/Hardware-Technische ist bereits stark; die Lücken liegen in LF6-Servicebegriffen, Wartung/Verträgen und einem kleinen WLAN-Messthema.

### P1 – AP1-nah und fehlt/schwach

**L1 – IMAC(R/D)-Lebenszyklus und Service-Begriffsraster** (Buch PDF 12–15, 43, 48)
- Warum: Beschreibt exakt die Tätigkeiten rund um den IT-Arbeitsplatz (Aufbau, Umzug, Erweiterung, Änderung, Abbau, Entsorgung); in Stellenprofilen als IMACD genannt; fehlt im Repo vollständig.
- Ziel: **b06** neue Lektion „Servicearten und IMAC(R/D)“ (vor Support-Level) oder Erweiterung von b06-l01.
- Inhalte: Tabelle IMAC/R/D mit je Beispiel und typischer Checkliste (z. B. Move: Daten sichern, Konfig/Berechtigungen anpassen, Inventar aktualisieren; Remove/Dispose: Datenlöschung, Lizenz freigeben, Entsorgungsnachweis – Verknüpfung zu h04/b03); Servicearten Break/Fix vs. Managed vs. Wartungsvertrag; Swap-Service und DIY; Garantie/Kulanz/Gewährleistung (Verweis w04); Service Request vs. Incident vs. Change für jede Phase.
- Aufgabentypen: (1) **table**: 8 Kundenanfragen → Phase (I/M/A/C/R/D) und Klassifikation (Service Request/Incident/Change). (2) **free**: „Beschreiben Sie die Schritte beim Umzug eines Arbeitsplatzes (Move) einschließlich Dokumentation.“ (3) **match**: Serviceart ↔ Beschreibung. Kein Generator nötig.

**L2 – Wartungsarten und Servicevertrag-Kostenvergleich** (Buch PDF 70–72; Begleitdatei „Preisliste Wartungspakete“, „Wartungsvertrag Muster 1–3“, „Reaktionszeiten diverse Regelungen“)
- Warum: Klassische Belegaufgabe: Preisliste/Vertragsauszug, gefragt wird Vertrag vs. Einzelabrechnung, Leistungen im Vertrag, Reaktionszeit-Einhaltung. Die App kalkuliert Stundensatz/Anfahrt (w03), kennt aber keine **Vertragspakete mit Inklusivstunden**.
- Ziel: **w03** neue Lektion „Servicevertrag oder Einzelabrechnung?“ oder **b06**-Lektion „Wartungsarten und Wartungsvertrag“; Kern in w03 wegen Rechnung.
- Inhalte: reaktiv / periodisch / präventiv / prädiktiv mit Beispielen aus dem Buch (Backup-Kontrolle, Patchen, USV-/Batteriecheck, RAID/BBU-Überwachung, Monitoring); Wartungsplan; typische Vertragsbestandteile (Leistungen, Servicezeiten, Hotline-Zeiten, Reaktion, Kontingent, Laufzeit/Kündigung, Zahlung im Voraus, Verfall nicht verbrauchter Stunden).
- Generator-Idee `w.servicevertrag`: Parameter Grundbetrag G ∈ {199, 299, 559, 790} €/Monat, enthaltene Stunden h₀ ∈ {4, 6, 8, 12}, Zusatzstunde s ∈ {55…75} €, Ad-hoc-Satz a ∈ {85…100} €, Bedarf h ∈ [2, 25] Std/Monat. Kosten Vertrag = G + max(0, h − h₀)·s; Kosten ohne Vertrag = h·a; Fragen: (a) Kosten beider Varianten (€, 2 Nachkommastellen), (b) ab wie vielen Stunden lohnt der Vertrag (Break-even: G + (h−h₀)s = h·a → h* = (G − h₀·s)/(a − s), aufrunden auf ganze Stunden; nur wenn a > s und G > h₀·s), (c) Preise inkl. oder exkl. USt im Prompt nennen (Preisliste im Buch ist **brutto**!). Misconceptions: Inklusivstunden vergessen, USt vergessen, Verfall nicht verbrauchter Stunden ignoriert. Wertebereiche so wählen, dass h* ≥ 1 und ≤ 24.
- Zusätzlich table-Aufgabe: Vertragsauszug lesen → Leistung „im Vertrag / nicht im Vertrag“.

**L3 – Monitoring-Kennzahlen aus Ausgaben lesen** (Buch PDF 51–54, 415–419)
- Warum: Belege mit ping/traceroute-Ausgabe oder Monitoring-Screenshot sind plausibel; b06 erwähnt Monitoring nur qualitativ.
- Ziel: **b06-l01** erweitern + 1 Lektion „Monitoring und Logs“ oder in **m13** ergänzen.
- Inhalte: Kennzahlen Durchsatz/Bandbreite, Latenz (RTT), Paketverlust (Anteil in %), Jitter; Log-Schweregrade (kritisch/Fehler/Warnung/Info/Debug) und Pflichtfelder eines Logeintrags (Zeit, Quelle, Schweregrad, Text); SNMP/Syslog als Begriffe; Schwellwert-Alarm.
- Aufgabentypen: **number** „Paketverlust in %“ aus 'x gesendet, y empfangen'; **number** mittlere RTT aus 4 ping-Werten (Mittelwert, 1 Nachkommastelle); **table** Logzeilen → Schweregrad/nötige Reaktion; **free** „Der Kunde klagt über langsame Videokonferenzen – welche Kennzahlen prüfen Sie?“ Generator `sys.rtt` (Werte 8–180 ms, Verlust 0–12 %).

### P2 – AP1-Randthema

**L4 – WLAN-Signalstärke dBm und Funkausleuchtung** (Buch PDF 394–395)
- Warum: „Leistungsdaten WLAN“ und Messung gehören zu den Katalogstichworten; die App hat Kanalwahl, aber keine dBm-Skala.
- Ziel: **m12**-Lektion „WLAN planen und messen“ erweitern.
- Inhalte: dBm logarithmisch; 0 dBm = 1 mW; je −10 dB Faktor 10 weniger, −3 dB ≈ halbe Leistung; Empfangswerte negativ, näher an 0 = besser; Richtwerte (aus Praxis: besser als ca. −67 dBm für Video/Sprache, ab ca. −80 dBm kritisch; **Buch nennt −30…−40 als „gut“, das ist unrealistisch nah am AP – als Buch-Skala kenntlich machen**); SNR; Platzierung der AP nach Raumplan, Messung mit WLAN-Analyzer.
- Aufgaben: **number** P in mW aus dBm (P = 10^(dBm/10); Werte −10, −20, −30, −40, 0, 3, 10 dBm → exakte Zehnerpotenzen bzw. ×2); **table** Messwerte → ausreichend/kritisch laut Beleg-Skala; **free** Maßnahmen bei schwachem Empfang. Generator `m.dbm` (ganzzahlige Vielfache von 10 und ±3 dB; Toleranz 1 %).

**L5 – Scrum/Kanban-Grundbegriffe** (Buch PDF 154–163) – *die Klasse behandelt dies gerade (LF8 LS1)*
- Warum: Vorgehensmodelle kommen im Projektteil vor; w05 hat nur einen Absatz. Nutzen für Klassenarbeit höher als für AP1 → Umfang klein halten (1 Lektion).
- Ziel: **w05** neue Lektion „Agil: Scrum und Kanban“.
- Inhalte: Agile Werte (vier Gegensatzpaare); Scrum-Rollen/Ereignisse/Artefakte als Tabelle; Kanban (Board To do/Doing/Done, WIP-Limit) vs. Scrum (Vergleichstabelle des Buchs); Definition of Done; Burn-down lesen (Restaufwand je Tag).
- Aufgaben: **match** Rolle/Ereignis/Artefakt; **free** „Wann Scrum, wann Kanban?“ (IT-Support = Kanban); **number** Velocity/Restaufwand aus Burn-down-Daten (Sprints à 10 Tage, 80 Story Points; Rest nach Tag n); Wasserfall vs. agil als Tabelle aus Beleg.

**L6 – Datenqualität und Datenformate** (Buch PDF 165–176) – *Klassenstoff LF8 LS2*
- Warum: Aufgabentyp „Datensatz bewerten“ ist leicht prüfbar; CSV/XML/JSON-Lesen ist plausibler AP1-Beleg („Export aus Warenwirtschaft“).
- Ziel: neues Kurzmodul in **d01/d02**-Bereich (Lektion „Datenqualität und Austauschformate“), nicht b/w.
- Inhalte: Kriterien mit Definition + Beispiel (je 1 Zeile); Prozentkennzahlen; CSV (Trennzeichen, Kopfzeile, Anführungszeichen, Dezimal-Komma-Falle), XML (Elemente/Attribute, wohlgeformt), JSON (Schlüssel/Wert, Arrays); Open vs. Closed Data; REST nur Begriffsebene (GET/POST/PUT/DELETE ↔ Lesen/Anlegen/Ändern/Löschen).
- Aufgaben: **table** Datensatzliste (10 Zeilen mit eingebauten Fehlern: leere Pflichtfelder, Dublette, Summe ≠ Menge·Preis, Datumsformate gemischt) → Fehler je Kriterium; **number** Qualitätsquote in % (n fehlerhaft von N); Generator `d.datenqualitaet` (N ∈ {50, 80, 100, 200}, Fehlerzahl 1…N/3; Kriterien Vollständigkeit/Aktualität/Genauigkeit/Konsistenz); **text** JSON/CSV-Ausschnitt lesen („Wie viele Kunden?“).

**L7 – Wartungs-/Kommunikationsmethoden** (Buch PDF 64–70)
- Eisenhower-Matrix (4 Felder) und Deeskalationsschritte (Zuhören, Verständnis zeigen, Lösung anbieten, Vereinbarung per E-Mail bestätigen) als 1 Lektion-Erweiterung in **b06-l07**; Aufgabe: 6 Aufgaben des Tages in die Eisenhower-Matrix einsortieren (table); free: Beschwerdeanruf bearbeiten.

**L8 – Sichere Software: fehlende Prinzipien** (Buch PDF 206–208)
- **p05-l07 (Security by Design)** um Sicherer Ausfall (fail-safe, sichere Standardwerte), benutzerfreundliche Sicherheit, Protokollieren sicherheitsrelevanter Ereignisse (was ja/nein, Datenschutz im Log) ergänzen; Aufgabe: free „Warum sollte eine Anwendung nach einem Fehler gesperrt statt offen sein?“.

**L9 – Netzwerk-Kleinigkeiten (je 1 Abschnitt/ 2–3 Fragen):**
- DNS absichern (DoT/DoH, DNSSEC) und DNS-Filter (Pi-hole) → m11 (Buch 334, 338).
- PowerLAN/Powerline und Repeater als Alternative bei fehlender Verkabelung → m12 (Buch 341, 344, 391).
- Kabelfernsehnetz/DOCSIS und Mobilfunkgenerationen-Tabelle → m12/m01 (Buch 359–361).
- Firewall-Aktionen DROP vs. REJECT, DPI (Buch 377).
- Kabeltester-Auswertung (Fehlerbilder) und LED-Anzeigen → m12/m13 (Buch 415).
- Prüfsumme/Signatur eines Betriebssystem-Images prüfen (Befehl `sha256sum`/`Get-FileHash`, Vergleich, Signatur = Herkunft) → b01 (Buch 410) – gut prüfbar, kurz.

### P3 – AP2 / nur Klassenstoff (nicht für AP1 ausbauen)
- MQTT (Topics, Wildcards `+`/`#`, QoS 0/1/2, LWT) – ggf. später eigenes AP2-Modul; Generator-Idee: Topic-Filter gegen 10 Topics matchen (Anzahl Treffer).
- FMEA mit RPZ = B·A·E (Generator: B,A,E ∈ 1…10, Schwelle 100/150, Maßnahmenbedarf; Zusatzregel „Einzelwert ≥ 8“).
- IoT-Funktechniken, OPC UA, I2C/SPI/UART, Raspberry/Arduino.
- NoSQL/BASE/Big-Data-5V, Data Lake vs. DWH, SOAP.
- ITIL-4-Praktiken (34), CMMI-Stufen, COBIT.
- BSI-NET-Bausteine, SDN/Zero Trust/SASE, SBC, VDS/VPS/Dedicated, hyperkonvergent, Orchestrierung.
- ROI/Make-or-Buy/Finanzierungsvergleich (Darlehen/Leasing/Miete über 3 Jahre) – eher kaufmännisch, falls später gewünscht: Generator `w.finanzierung`.
- Python-OOP-Syntax (nur für Schulalltag der Klasse; ggf. optionales Zusatzmodul „Python für die Klasse“, mit Hinweis „kein AP1-Stoff“).

---

## 5. Widersprüche und Korrekturen

**Ergebnis vorab:** In der App wurde **kein sachlicher Fehler** gefunden. Die App folgt durchgängig der aktuelleren/fachlich korrekteren Darstellung. Die Abweichungen liegen überwiegend **beim Buch**; wichtig, weil Azubis mit dem Buch lernen und Lehrkräfte Aufgaben daraus stellen könnten. Empfehlung: In betroffenen Lektionen kurze Hinweiskästen „Im Schulbuch steht …, in der Prüfung gilt …“.

### 5.1 Buch fehlerhaft oder veraltet (App ist richtig)

| Nr | Stelle im Buch (PDF) | Buch | App (Datei, ca. Zeile) | Hinweis |
|---|---|---|---|---|
| B1 | Hypervisor-Tabelle (346) | Proxmox VE als Beispiel für **Typ 2 (Hosted)** | b04.ts ~291: KVM/Proxmox VE = Typ 1 | Typ 1 ist fachlich richtig (Proxmox ist ein auf Debian basierendes Bare-Metal-System mit KVM). |
| B2 | PoE (397) | PoE++ nach 802.3bt „bis 65 W“; af 12,95 W, at 25 W (netto) | m12.ts ~577–580: PSE 15,4/30/60/90 W, PD 12,95/25,5/51/71,3 W | Aufgaben mit Beleg immer Wert + „am PSE/am Gerät“ beachten; Buch mischt PD/PSE. |
| B3 | Subnetting (393) | /31 „keine Vergabe möglich“ (2¹−2 = 0) | m03.ts ~358, m06.ts ~189, m09.ts ~618: /31 gültig nach RFC 3021 für Punkt-zu-Punkt | In der Prüfung gilt die Konvention der Aufgabe; bei Standard-Hostzahl-Formel 2ⁿ−2 ist /31 „0 Hosts“ – App-Hinweis „nur wenn Aufgabe es vorgibt“ passt. |
| B4 | Bezeichnungen (326, 335) | WLAN-Standards „von der IETF“ bzw. „von der WiFi-Alliance spezifiziert“ | m12.ts ~843: IEEE 802.11, Wi-Fi Alliance zertifiziert | Richtig: IEEE spezifiziert, Wi-Fi Alliance zertifiziert/benennt. |
| B5 | WLAN-Raten (326, 335) | 802.11n „289 Mbit/s (2,4 GHz)“; WiFi 5 „6933 Mbit/s“ vs. „1733 Mbit/s tatsächlich“ | m12.ts ~850–852: n 600, ac ≈ 6,9 Gbit/s, ax ≈ 9,6 Gbit/s | Brutto-Maximalwerte schwanken je Stream-/Kanalbreite-Annahme; bei Beleg-Aufgaben nur die im Beleg genannte Zahl verwenden. |
| B6 | Firewall (336) | „Deep Packet Inspection analysiert die IP-Header“ | m14 (Stateful/Paketfilter: Header; DPI-Begriff fehlt) | DPI prüft **Nutzdaten** zusätzlich zum Header (Buch widerspricht sich selbst auf S. 377). |
| B7 | VPN-Schlüsselaustausch (397) | Diffie-Hellman = Austausch öffentlicher Schlüssel, damit der Sender mit dem öffentlichen Schlüssel des Empfängers verschlüsselt | m14.ts ~461: RSA/ECC/ECDH korrekt getrennt | DH berechnet ein gemeinsames Geheimnis; Verschlüsselung mit öffentlichem Schlüssel ist RSA/ECIES (asymmetrisch). |
| B8 | OSI-Tabelle (325) | TLS auf **Transport**, ARP/NDP auf **Netzzugang**, BGP/RIP auf **Internet** | m02.ts ~209–211, ~341: ARP „2/3“, TLS „teils Schicht 5/zwischen TCP und Anwendung“ | Zuordnung ist uneinheitlich. App erklärt die Mehrdeutigkeit. Für Prüfung: Schichtzuordnung nach Aufgabenvorgabe; BGP/RIP in Büchern oft L3, technisch Anwendungsschicht (BGP über TCP 179, RIP über UDP 520). |
| B9 | Ports (330) | Client-Ports „1024–65535“; „401 = USV“ | m10.ts ~244–245: Dynamic 49152–65535 (IANA) | Port 401 ist registriert, praxisfern. |
| B10 | Latenz (53) | „Geringe Latenz … wirkt sich negativ auf Seitenladen aus“ | m13/b06: hohe Latenz = schlecht | Schreibfehler im Buch. |
| B11 | Problem-Definition (42–43) | Problem = Situation, bei der „eine Störung noch nicht erfolgt ist“ | b06.ts ~395 (ITIL: Ursache eines oder mehrerer Incidents) | App folgt ITIL/FitSM; Buch selbst nutzt auf S. 60 die ITIL-Definition. |
| B12 | Use-Case (194–196) | Beziehungen heißen «extends» (Plural); Beispiel „Kreditkarte prüfen“ als bedingte **include**-Beziehung; Übungsaufgabe Webshop: „Bestellung **erweitert** Einloggen“ | p04.ts ~422–423, 445, 479–486: «include» (immer, Pfeil zum eingebundenen Fall), «extend» (optional, Pfeil zum Basisfall) | Stereotyp heißt «extend». „Bestellen setzt Login voraus“ ist include, nicht extend. Diese Unterschiede sind Quelle für Klassenarbeits-Verwirrung. |
| B13 | ER-Phasen (270, Kompetenzcheck e) | – (Buch-Aufgabe verwechselt bewusst, Lösung: Normalisierung gehört zur logischen Phase) | d02 | konsistent |
| B14 | TMG (26, 28) | „§ 5 TMG Impressumspflicht“ | b01/m14: DDG | TMG wurde 2024 durch das Digitale-Dienste-Gesetz (DDG, dort § 5) ersetzt. |
| B15 | Gebrauchtlizenz/Recht allgemein (33, 26) | „Vertragsstrafen bis zu 5 % des Auftragswerts“ | w04 | Ohne rechtliche Grundlage so nicht verallgemeinerbar; nicht übernehmen. |
| B16 | Firewall-Preisstruktur/QSFP (343) | QSFP56 „50 Gbit/s“, QSFP28 „25 Gbit/s“ | – | Das sind Raten **je Lane** (QSFP28 = 100, QSFP56 = 200 Gbit/s gesamt); nicht AP1. |

### 5.2 Konventions- und Definitionsabweichungen (beide vertretbar, aber unterschiedlich)

| Nr | Thema | Buch | App | Vorschlag |
|---|---|---|---|---|
| K1 | **ROI und Amortisation** (367) | ROI = Rückflüsse / Investition (≥ 1 = kein Verlust; Beispiel 90.000/60.000 = 1,5); Amortisationszeit = Nutzungsdauer / ROI | w03.ts ~320–333: Amortisationsdauer = Investition ÷ Einsparung pro Zeiteinheit; ROI nicht definiert | Rechenergebnis identisch (24 Monate). Kurzen Kasten „ROI: in der Literatur meist (Gewinn / Investition); das Schulbuch nutzt Rückflüsse/Investition“ ergänzen, damit Klassenarbeits-Aufgaben nicht falsch bewertet werden. |
| K2 | **RACI** (35–36) | A und R für dieselbe Rolle „möglichst vermeiden“; je Zeile genau ein A, mindestens ein R | b06.ts ~149: „A und R können dieselbe Rolle sein“ | Beides kommt vor; in Prüfungsaufgaben die Regeln der Aufgabe beachten. Eine Zeile mit „R/A“ nicht als Fehler werten, außer Aufgabe verlangt es. |
| K3 | **Change-Klassen** (62) | Standard-Change + Level 1–3 (Auswirkung) | b06.ts ~410: Standard / normal / Notfall | In b06 Hinweis ergänzen, dass Schulen auch „Level 1–3“ verwenden. |
| K4 | **Priorität/Urgency** (40) | Setzt „Priorität = Urgency (Dringlichkeit)“, Reaktions-/Lösungszeiten 1 h/4 h/8 h/24 h/48 h | b06-l03: Priorität aus Auswirkung × Dringlichkeit, Beispielzeiten 15 min/2 h | Beide sind Beispielwerte; Aufgaben mit Beleg immer nach Beleg rechnen. |
| K5 | **Verfügbarkeit** (46) | (Servicezeit − Ausfallzeit)/Servicezeit · 100 | gleich (b06 ~310) | konsistent. Buch nennt zusätzlich MTBF/MTTR ohne Formel; App ergänzt V = MTBF/(MTBF+MTTR). |
| K6 | **Klassische Netzklassen** (328) | Class A/B mit 2²⁴/2¹⁶ Adressen (inkl. Netz/Broadcast) | m03.ts ~465: Klassen nur historisch, Hosts 2ⁿ−2 | „Adressen“ vs. „nutzbare Hosts“ unterscheiden (Buch: 16 777 216 = alle Adressen). |
| K7 | **Subnetting-Beispiel** (330) | /24 mit 4 Subnetz-Bits: 16 Subnetze à 14 Hosts, inkl. Subnetz 0 und letztes | m05 (alle gleich großen Subnetze, Blockgröße) | konsistent mit moderner Praxis (kein „Subnet Zero“-Verbot). |
| K8 | **WLAN-Signalstärke** (394) | −30…−40 dBm „gut“, < −85 kritisch | m12: keine dBm-Skala | Beim Ergänzen (L4) Buch-Skala und Praxis-Richtwerte getrennt benennen. |
| K9 | **UML-Notation** (195, 197) | Beziehung zeigt Pfeil/Raute wie üblich; Multiplizität `0..*`, `1,3,8` | p04 | konsistent. |
| K10 | **Python im Buch** (250–257) | `self.__preis` (Name Mangling), unvollständige Beispiele (fehlende Parameter in `Lagerhalle`, Tippfehler) | p01–p05 (pseudocodeorientiert) | Buchcode nicht übernehmen; falls Python-Zusatzmodul: eigener korrigierter Code. |
| K11 | **ER-Notation** (268–269) | Chen mit 1:n; PK/FK in relationalem Schema | d02: Chen, Krähenfuß, (min,max) | App umfassender. |

### 5.3 Hinweise zu App-Stellen, die geprüft wurden und in Ordnung sind
- m12.ts ~915 (Kanäle „1, 3 und 6“): bewusst als Fehlkonfiguration im Beispiel angelegt und im Lösungsweg korrigiert – kein Fehler.
- b06 Verfügbarkeitsformel, Reaktionszeit = erste qualifizierte Rückmeldung, Eskalationsarten (funktional/hierarchisch): entsprechen dem Buch.
- h04 USV-Klassen VFD/VI/VFI und Zuordnung Arbeitsplatz/Netzwerkschrank/Server: entsprechen dem Buch.
- p04 UML (14 Diagrammtypen, Struktur/Verhalten, Sichtbarkeit, Aggregation/Komposition, Multiplizität, Swimlanes): entsprechen dem Buch und sind präziser.

### 5.4 Zu den Unterrichtsauszügen LF8 (OCR)
- `LF8_LS1.txt` (≈ Buch PDF 149–164, Kap. 3.1) und `LF8_LS2.txt` (≈ PDF 165–179, Kap. 3.2) sowie `LF8_LS3.3.0.txt` (≈ PDF 180–190, Kap. 3.3.1–3.3.3) sind lesbar und **identisch mit den Buchseiten**; der Unterricht folgt also dem Buch: Projektmanagement/Scrum/Kanban/XP → Datenqualität/-quellen/-formate → Paradigmen/OOP/UML-Überblick.
- `LF8_LS3.3.txt`, `LF8_LS3.4.txt`, `LF8_LS3.5.txt` sind **um 180° gedreht gescannt**, der OCR-Text ist unlesbar. Anhand der Seitenzahlen im Kopf entsprechen sie vermutlich Buch PDF ~190–192 (UML-Rest), ~194–201 (Use-Case/Klassendiagramm) und ~206–210 (sichere Software). Inhaltlich sind diese Seiten oben (Abschn. 3.3) bereits aus dem Buchtext ausgewertet. **Empfehlung:** Bei Bedarf erneut mit Rotation OCR laufen lassen (Bilder liegen unter `ocr/LF8_LS3.x`).
- Konsequenz für die App: Die Klasse braucht kurzfristig Scrum/Kanban (L5), Datenqualität/Formate (L6), und die Notationshinweise zu include/extend (B12); UML selbst ist bereits abgedeckt.

### 5.5 Begleitdateien (kurz bewertet)
| Datei | Inhalt | Nutzen |
|---|---|---|
| EVB-IT Service-/Systemlieferungsvertrag (3 PDF) | Behörden-Vertragsbedingungen | Lesen von Vertragsklauseln; AP1-Beleg unwahrscheinlich, Begriffe Leistungsbeschreibung/Mitwirkung/Abnahme für w04. |
| JIKU Wartungsvertrag Muster 1–3, Preisliste Wartungspakete, Reaktionszeiten, Servicebericht, Ticketformular, AGB-Schulung, AV-Vereinbarung | Klassische Vertrags-/Preisbelege | **Beste Vorlage für Beleg-Aufgaben** (L2, L3); Struktur/Zahlen als Muster verwenden, nicht kopieren. Preisangaben dort sind inkl. MwSt. |
| Java-/Python-Dateien (Ordner „Lernfeld 7“) | Beispielcode LF8 (Ordnerbenennung aus alter Zählung: „Lernfeld 7“ = Kapitel 3.5–3.7) | Für AP1 unnötig. |
| Analysemethoden.xlsx (Benchmarking, Präferenzmatrix, Risikomatrix), Kontenplan_JIKU.xlsx | Vorlagen der kaufmännischen IT-Berufe (Ordner „Lernfeld 8“) | Risikomatrix passt zu s01 (vorhanden); Kontenplan **unnötig** (Buchführung, nicht FISI). |
| Abnahmeprotokoll.docx | Vorlage | passt zu w05-l04. |

---

## 6. Nicht übernehmen

| Thema | PDF | Grund |
|---|---|---|
| ITIL-4-Praktikenlisten, Wertschöpfungskette, CMMI/COBIT/SIAM/SPICE | 19–25 | Reines Rahmenwerk-Wissen; in AP1 höchstens als Namen. Kernbegriffe sind in b06 schon drin. |
| Medienkompetenz, KMK-/Länderrahmen, E-Learning-Tools | 73–76 | Schulkontext, keine Prüfungsrelevanz. |
| Jeff-Bezos-Prinzipien, 360-Grad-Feedback, Diskussionstypen, Streich/Lewin-Modelle | 44–46, 65–70 | Soft-Skills-Lexik; AP1 fragt Kundenkommunikation praktisch (Gesprächsführung), nicht Modellnamen. |
| IoT-Anwendungsfelder, Funkprotokolle, MQTT/OPC UA, I2C/SPI/UART, Raspberry/Arduino | 79–120 | AP2/Fachstufe; nicht im AP1-Katalogauszug. |
| Betriebliches Vorschlagswesen, AIDA/Elevator Pitch | 146–149 | Nicht prüfungsrelevant. |
| Java-Kapitel komplett, Swing | 215–249 | Prüfung nutzt sprachneutralen Pseudocode/UML. |
| Python-Syntax, tkinter | 250–262 | Nur Schulalltag; ggf. Zusatzmodul außerhalb der AP1-Wertung. |
| SQL-Erweiterungen (Joins, Unterabfragen, Rechte), JDBC, MongoDB, Cloud-DB, Testdatengeneratoren | 275–298 | SQL ab 2. Katalogauflage nur AP2; in d03 als `vertiefung` bereits vorhanden. |
| Data Lake/DWH/SOAP | 176–179, 174 | AP2/Praxis. |
| Ausschreibung/Vergabe (VOL/A, VOB, Portale) | 385–389, 402 | Kaufmännisch/öffentliche Hand; veraltete Vergabeverordnungen im Buch (VOL/A, VOF wurden durch UVgO/VgV ersetzt). |
| Cloud-Preismodelle, Finanzierungsrechnung Darlehen, Kontenplan | 364–369 | Kaufmännischer Schwerpunkt, FISI nur am Rande. |
| SDN/SASE/Zero-Trust-Details, BSI-Bausteinlisten, SBC, VoIP-Codecs | 340, 369–382 | AP2 „Analyse und Entwicklung von Netzwerken“. |
| Provider-/Hosting-Details (VDS/VPS, Plesk/cPanel, Softaculous), Proxmox-Fallstudie | 345–356, 420–427 | Produktkunde, keine Prüfungsstoffe. |
| Linux-`nmcli`, `lsof`, `bmon`, `tcpdump` | 415–418 | Katalog nennt ipconfig/ifconfig/ip/arp/ping/traceroute; Rest reicht als Randbemerkung. |
| Fritz!Box-Bedienoberfläche | 407–408, 419 | Produktabhängig; Prinzip (IP/DHCP/DNS/Passwort/Server statisch) ist in m11/m13 abgedeckt. |

---

*Nicht geprüft/Risiko:* PDF-Abbildungen wurden nur an einer Stelle (PDF 195, Use-Case-Beispiel) visuell kontrolliert; Tabellenwerte aus OCR (z. B. Priorisierungsmatrix S. 40, Preise) sollten vor Übernahme in Aufgaben gegen die PDF-Seite geprüft werden. Arbeitsbuch (Aufgaben/Lösungen) nicht ausgewertet. Aussagen zur AP1-Prüfungsrelevanz sind Einschätzungen, nicht belegt.
