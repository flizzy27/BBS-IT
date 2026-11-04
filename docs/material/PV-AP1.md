# Auswertung: „Prüfungsvorbereitung aktuell IT – Teil 1“ (Kürzel PV-AP1)

Stand der Auswertung: 04.11.2026. Alle Inhalte sind in eigenen Worten zusammengefasst. Es werden Aufgabentypen, Muster, Konventionen und Zahlenbeispiele beschrieben, keine Aufgabentexte übernommen. Seitenangaben sind **PDF-Seiten** (im Buch identisch mit der gedruckten Seitenzahl). Bildlastige Seiten (Tabellen, Diagramme) wurden bei Zweifeln visuell geprüft (S. 203, 232, 236, 245, 247, 253).

Methode: komplette Textauswertung aller Aufgabenseiten (S. 15–196) und aller Lösungsseiten (S. 198–323); Abgleich mit `src/content/modules/*.ts` und `src/core/generators.ts` bzw. `src/core/gen/*.ts` per Suche nach Fachbegriffen.

---

## 1. Steckbrief

| Merkmal | Wert |
|---|---|
| Titel | Prüfungsvorbereitung aktuell – Teil 1 der gestreckten Abschlussprüfung, Alle IT-Berufe |
| Verlag / Auflage | Verlag Europa-Lehrmittel, Europa-Nr. 30982, 2. Auflage 2022, ISBN 978-3-7585-3177-4; Autoren Hardy, Schellenberg, Stiefel |
| Umfang | 324 Seiten; ca. 150 Seiten Aufgaben, 31 Seiten Prüfungssimulationen, ca. 126 Seiten ausführliche Musterlösungen (in der PDF eingebunden, im Lösungsteil mit Ausfüllfeldern des Aufgabenteils ausgefüllt) |
| Aufbau | Teil 1 Einführung in die Prüfung (S. 7–14); Teil 2 „Fachkompetenz“ in 8 Themenkapiteln mit je einer Einleitung und kleinen Aufgabenblöcken (S. 15–165); Teil 3 drei komplette Prüfungssimulationen (S. 166–196); Lösungen zu allem (S. 198–323) |
| Szenario | Teil 2: fiktive IT-Firma „ConSystem GmbH“, du bist Azubi; Teil 3: IT-Systemhaus „IT-ProSystem GmbH“ mit drei Kundenfällen (Reisebüro, Versicherungsmakler, CNC-Fertiger) |
| Format der Aufgaben | Ausfüllbuch: Aufgaben mit Freifeldern, Kästchen zum Ankreuzen, Platzhalter in Diagrammen und Tabellen. Keine Belege im Sinn echter Datenblätter, sondern Fließtext-Angebote, Screenshots (`ipconfig`), Rechnungs- und Tabellenausschnitte |
| Katalogstand | Geschrieben für die **1. Auflage des Prüfungskatalogs** (vor 2025). Enthält deshalb Themen, die laut 2. Auflage entfallen oder in AP2 wandern: SQL (S. 112–113, 264, 266), RAID (S. 94, 253), Struktogramm/PAP (S. 108, 195, 263, 322), ER-Diagramm (S. 111) |
| Urteil AP1 | **Hoch relevant** als Format- und Stoffvorbild, weil es ausdrücklich die AP1 „Einrichten eines IT-gestützten Arbeitsplatzes“ simuliert (4 Handlungsschritte, 100 Punkte). Inhaltlich aber veraltet in Details (ISO 9000-Grundsätze, Datenschutzbeauftragter-Schwelle, PAP/SQL/RAID) und stark Richtung WiSo/BWL und Beratung statt Technik |
| Urteil AP2 FISI | Gering. SQL, RAID, Industrie 4.0 und ER sind nur oberflächlich; für AP2 ungeeignet |
| Besonderheit | **Kein Subnetting, kein VLSM, keine Binär-Netzmaskenrechnung im ganzen Buch.** Netzwerk wird über Begriffe, Protokolle, Ports, WLAN, Verkabelung, IPv6-Kürzen und das Lesen von `ipconfig` geprüft. Das stützt die Einstufung von m05/m06 als Randthema bzw. Vertiefung |

Prüfungsrahmen laut Buch (S. 8, 10–14): 90 Minuten; vier ungebundene Aufgaben mit je 20–30 Punkten, insgesamt 100 Punkte; fünf Kompetenzbereiche (Kundenbedarf ermitteln; Hard-/Software auswählen und beschaffen; Arbeitsplatz konfigurieren/testen unter Beachtung von Datenschutz, IT-Sicherheit, Qualitätssicherung; Kunden einweisen; Leistungserbringung kontrollieren und protokollieren). Prüfungstipps: 6–8 Minuten Aufgaben durchlesen, Reihenfolge nach Machbarkeit wählen, zu jeder Teilaufgabe etwas schreiben (Teilpunkte), bei unklarer Aufgabe die eigene Interpretation kurz notieren. Notenschlüssel und Bestehensregeln stehen auf S. 11–14 (Teil 1 darf „nicht ausreichend“ sein; Bestehen hängt an Teil 2).

---

## 2. Gliederung mit PDF-Seiten

| Abschnitt | Aufgaben | Lösungen |
|---|---|---|
| 1 Die IHK-Abschlussprüfung im Überblick (Ablauf, Inhalte aus FIAusbV, Tipps, Bestehen) | 7–14 | – |
| 2.1 Projektmanagement: Grundlagen 1–3, Gantt, Netzplan, Wasserfall, Agile Modelle, Scrum | 17–29 | 198–207 |
| 2.2 Qualitätsmanagement: Grundlagen 1–2 (Kano, Grundsätze), DIN EN ISO 9000ff., QM-Systeme, TQM, Softwarequalität, Barrierefreiheit | 30–43 | 208–217 |
| 2.3 Datenschutz: Grundlagen 1–3, Standard-Datenschutzmodell, Kontaktformular | 44–54 | 218–222 |
| 2.4 IT-Sicherheit: Gefährdung, Maßnahmen, IT-Grundschutz, Schutzbedarf, IT-Sicherheitsgesetz, Überblick-Mindmap, Verschlüsselung | 55–69 | 223–230 |
| 2.5 IT-Systeme (14 Blöcke): Datensicherung, Ausstattungskonzept/Nutzwert, Hardwareinstallation (Übertragungsrate), IT-Grundlagen (Zahlensysteme, Energie, Logik), Dateiformate/Codes (Bildspeicher), Cloud, Virtualisierung, VDE-Schutzmaßnahmen, Betriebssysteme, Schnittstellen, Industrie 4.0, Anwendungssysteme/Shell, Prozessoren/RAM, Datenspeicherung/RAID | 70–94 | 231–253 |
| 2.6 Software (12 Blöcke): Programmierparadigmen, Pseudocode, Algorithmus (Lauflängenkodierung), HTML/XML, UML-Klassendiagramm, UML-Use-Case, PAP/Refactoring, Datenbankaspekte, ER-Diagramm, SQL, Softwareentwicklungsprozess, Debugging | 95–115 | 254–268 |
| 2.7 Netzwerke (8 Blöcke): OSI/TCP-IP/Protokolle, WLAN, Gebäudeverkabelung, IP-Konfiguration/DHCP, IPv6, Kupferkabel, Fehlersuche (ping, ipconfig), Fernwartung | 116–140 | 269–286 |
| 2.8 Arbeits- und Geschäftsprozesse (5 Blöcke): Unternehmen und Umfeld, Ziele/Wirtschaftlichkeit/Finanzierung, Beschaffungsprozess, Vertragsrecht, Auftragseingang/Preisbildung | 141–165 | 286–303 |
| 3.1 Prüfungssimulation 1 (Reisebüro, 4 PC-Arbeitsplätze) | 166–176 | 304–310 |
| 3.2 Prüfungssimulation 2 (Versicherungsmakler, BYOD, Firmenhandys) | 177–186 | 311–316 |
| 3.3 Prüfungssimulation 3 (CNC-Fertiger, Industrie 4.0, Cloud) | 187–196 | 317–323 |

---

## 3. Je Kapitel: Kernaussagen, Aufgabentypen, Konventionen, Relevanz, Abdeckung

Legende Relevanz: `ap1`, `ap1-teilweise`, `ap2`, `unnötig`. Abdeckung: `voll` (Modul), `teilweise` (was fehlt), `fehlt`.

### 3.1 Projektmanagement (S. 17–29, Lsg 198–207)

| Thema | Kernaussage (eigene Worte) | Aufgabentyp | Relevanz | Abdeckung |
|---|---|---|---|---|
| Projektbegriff, magisches Dreieck, SMART | Projekt = einmalig, klares Ziel, fester Anfang und Ende; Dreieck Qualität–Kosten–Zeit; SMART-Ziele (spezifisch, messbar, akzeptiert, realistisch, terminiert) | Fehler im Text finden; Begriffe in Platzhalter eintragen; Eigenschaften ankreuzen | ap1 | voll (w05, w01 für SMART) |
| Phasen, Stakeholder, Machbarkeit | vier Phasen (Definition inkl. Machbarkeitsstudie, Planung mit Gantt/Meilensteinen, Durchführung, Abschluss); Stakeholderanalyse ist Teil der Machbarkeitsstudie neben Risikoanalyse | Reihenfolge herstellen und Bestandteile zuordnen; „nenne ≥ 3 Stakeholder“; Unterschied erläutern | ap1 | teilweise: Stakeholder und Phasen in w05, **Machbarkeitsstudie/Stakeholderanalyse als Begriffe fehlen** |
| Risikomanagement | fünf Schritte: identifizieren, analysieren, priorisieren, behandeln, überwachen | Reihenfolge prüfen (auf Englisch vorgegeben) | ap1-teilweise | teilweise (s01 Risikobehandlung, andere Reihenfolge der Begriffe) |
| Gantt-Diagramm | Balkenplan aus Vorgangsliste (8 Vorgänge A–H, Dauer, Vorgänger); kritischer Pfad hervorheben; schraffiert = Puffer | Diagramm zeichnen (Gesamtdauer 22 Zeiteinheiten) | ap1 | teilweise: Netzplanrechnung vorhanden (`w.netzplan`), **Balkendiagramm zeichnen/lesen fehlt als Aufgabe** |
| Netzplan | Kästchen mit FAZ, FEZ, SAZ, SEZ, Dauer, Puffer; Start bei 0; FEZ = FAZ + D; kritischer Pfad = Puffer 0 (A–B–D–F–H) | Netzplan zeichnen, kritischen Pfad angeben (S. 203 zeigt Musterplan) | ap1 | voll (w05 / `w.netzplan`); Begriffsunterschied: Buch „P = Pufferzeit“, App „GP“ |
| Wasserfall | dokumentgetrieben, Meilenstein, Lastenheft (Auftraggeber, **was/wofür**) vs. Pflichtenheft (Auftragnehmer, **wie/womit**), Top-down; ≥ 3 Vor-/Nachteile; 4 Qualitätskriterien einer Präsentation | Definieren; Aufzählen | ap1 | voll (w05, w01, b05); Präsentationskriterien fehlen |
| Agil, Scrum | Agiles Manifest (englisch zu übersetzen); Scrum: Sprint 1–4 Wochen nicht unterbrechbar, Scrum Master entwickelt nicht, Team 3–9 Personen, Product Owner ist nicht „der Kunde“, Daily 15 Minuten | Aussagenliste auf Richtig/Falsch prüfen und begründen; Übersetzung | ap1 | teilweise (w05 nennt Scrum nur im Vergleich; **Rollen/Artefakte/Sprint-Regeln fehlen**) |
| PRINCE2, DIN ISO 21500, DIN 69901 | Normen/Methoden nur genannt, PRINCE2-Definition übersetzen | Übersetzung | unnötig (nur als Nennung) | fehlt (ok) |

### 3.2 Qualitätsmanagement (S. 30–43, Lsg 208–217)

| Thema | Kernaussage | Aufgabentyp | Relevanz | Abdeckung |
|---|---|---|---|---|
| Qualitätsbegriff, DIN/EN/ISO/IEC | Qualität = Grad, in dem inhärente Merkmale Anforderungen erfüllen (ISO 9000:2015); Normen sind freiwillig | Abkürzungen auflösen, definieren | ap1 | voll (b05) |
| ISO 9000/9001/9004, PDCA, Zertifizierung/Audit | 9000 Grundbegriffe, 9001 zertifizierbare Mindestanforderungen, 9004 nachhaltiger Erfolg | Plakat ausfüllen, Mindmap, Grundsätze ankreuzen | ap1-teilweise | voll (b05). **Buch nutzt veraltete Grundsatzliste** (siehe Abschnitt 5) |
| Kano-Modell | Basis-, Leistungs-, Begeisterungsmerkmale | Diagramm beschriften | ap1-teilweise (Beratung/Kundenzufriedenheit) | fehlt |
| QM-System, Organisation | Aufbau- und Ablauforganisation, Qualitätspolitik, Ressourcen; Einführung: Ist-Analyse, Soll-Konzept, Handbuch, Schulung, interne Audits | Organigramm beschriften; Schritte ordnen | ap1-teilweise | teilweise (b05: PDCA, Audit; Organisation fehlt) |
| TQM, EFQM | nur zur Übersetzung (EN → DE) | Übersetzen | unnötig | fehlt (ok) |
| Softwarequalität (ISO 9126-Merkmale) | sechs Hauptmerkmale mit Teilmerkmalen (z. B. Zeitverhalten/Verbrauchsverhalten unter Effizienz) | Begriffe zu Hauptmerkmalen zuordnen | ap1-teilweise | teilweise (w01 erwähnt 9126/25010) |
| Testverfahren | Modul-, Integrations-, System-, Abnahmetest; White-/Black-Box; JUnit | Kurz beschreiben | ap1 | voll (b05/p05) |
| Barrierefreiheit | EU-RL 2016/2102, BGG, BITV 2.0; Alt-Texte, Tastaturbedienung, Überschriftenstruktur, Skalierung bis 200 % | Webseiten-Skizze mit Hinweisen beschriften; Definition | ap1 (Katalog nennt Barrierefreiheit) | voll (b05, h05, w01) |
| Suchmaschinenoperatoren | exakte Phrase, Ausschluss mit Minus, ODER | Suchanfrage formulieren | unnötig / ap1-teilweise (Recherche) | fehlt |

### 3.3 Datenschutz (S. 44–54, Lsg 218–222)

| Thema | Kernaussage | Aufgabentyp | Relevanz | Abdeckung |
|---|---|---|---|---|
| DSGVO vs. BDSG, Betroffenenrechte | DSGVO gilt EU-weit, BDSG füllt Öffnungsklauseln; Rechte auf Auskunft, Berichtigung, Löschung | Info-Mail ausformulieren | ap1 | voll (s02) |
| DSB-Pflicht als Ablauf | Entscheidungs-PAP: Personenzahl, hohes Risiko, geschäftsmäßige Übermittlung, Überwachung, besondere Datenkategorien | Programmablaufplan zeichnen | ap1 | voll (s02), aber **Buch nennt Schwelle 10 statt 20** |
| Art. 5 DSGVO anwenden | Datenminimierung (Geburtsdatum/Familienstand unnötig), Zweckbindung (Wartungskundendaten nicht für Partnerwerbung), Speicherbegrenzung (Eventdaten löschen) | Drei Projektideen beurteilen | ap1 | voll (s02) |
| Standard-Datenschutzmodell | sieben Gewährleistungsziele: Datenminimierung, Verfügbarkeit, Integrität, Vertraulichkeit, Nichtverkettung, Transparenz, Intervenierbarkeit | Anforderungen den Zielen zuordnen | ap1-teilweise | **fehlt** |
| Kontaktformular prüfen | http statt https, unnötige Felder, vorangekreuzte Einwilligung (Art. 7), fehlende Datenschutzerklärung (Transparenz) | Prototyp bewerten | ap1 | teilweise (s02 deckt Einwilligung/Information; Beleg-Aufgabe „Formular prüfen“ fehlt) |

### 3.4 IT-Sicherheit (S. 55–69, Lsg 223–230)

| Thema | Kernaussage | Aufgabentyp | Relevanz | Abdeckung |
|---|---|---|---|---|
| Angriffsbegriffe | Identitätsdiebstahl, Phishing, Vishing, **Pharming** (DNS-Manipulation), Spoofing, **Nicknapping**, Spam, Spyware, Adware, Virus, Trojaner, Wurm, Ransomware, DDoS, Botnetz, APT | je Begriff kurz erklären | ap1 | teilweise (s01 hat die meisten; Pharming, Nicknapping, APT fehlen) |
| Abwehr | je 3 Maßnahmen gegen Phishing, Ransomware (Netz trennen, keine Admin-Anmeldung, Backups prüfen), DDoS (UPnP aus, sichere Passwörter, statische Ausweichseite) | Handlungsanweisung schreiben | ap1 | voll (s01, s05) |
| IT-Grundschutz | BSI, Methodik kompatibel zu ISO 27001; Leitlinie vs. Konzept; Schritte Standard-Absicherung; ISB-Aufgaben | Test beantworten, Schritte ordnen, ankreuzen | ap1 | voll (s01) |
| Schutzbedarfsfeststellung | Tabelle System × Schutzziel → normal/hoch/sehr hoch mit Begründung | Tabelle ausfüllen (kommt auch in Sim 1 vor) | ap1 | voll (s01) |
| IT-Sicherheitsgesetz, KRITIS | Sektoren (Energie, Wasser, Ernährung, IT/TK, Gesundheit, Finanz/Versicherung, Transport/Verkehr); Meldeablauf: Spam, ungezieltes Phishing, Hardwareausfall = keine Meldung; unbekannte Schadsoftware, Spear-Phishing, ungewöhnliche Defekte = Meldung | Ablaufplan beschriften | ap1-teilweise (Randthema) | **fehlt** |
| Verschlüsselung | symmetrisch vs. asymmetrisch (Schlüsselpaar, öffentlicher Schlüssel verschlüsselt), OpenPGP = hybrid; Verfahren auf „heutiger Standard ja/nein“ prüfen | Erläutern; Tabelle ja/nein | ap1 | voll (s04/m14) |

### 3.5 IT-Systeme (S. 70–94, Lsg 231–253) – **Rechenaufgaben, siehe Abschnitt 3.10**

| Block | Kernaussage | Aufgabentyp | Relevanz | Abdeckung |
|---|---|---|---|---|
| Datensicherungskonzept | Voll (komplettes Abbild), differenziell (alles seit letzter Vollsicherung; Restore = Voll + letzte Diff), inkrementell (seit letzter Sicherung; Restore = Voll + alle Inkremente). Revisionssicherheit = Vollständigkeit, Schutz vor Veränderung und Verlust, nur Berechtigte, dokumentiertes Verfahren. Medienlebensdauer mit Einflussfaktoren | Beschreiben; Unterstreichen; Tabelle (Medium, Jahre, Einfluss) | ap1 | voll (s03); Lebensdauer-Tabelle fehlt (Buchwerte grob, nicht übernehmen) |
| Ausstattung, Nutzwertanalyse | Desktop/Laptop/Tablet nach Leistung, Wirtschaftlichkeit, Erweiterbarkeit, Zukunft; Gewichte 20/50/15/15 %, Punkte 0–10 | Beurteilen; Tabelle | ap1 | voll (w02), Skalen-Konvention abweichend (Abschnitt 5) |
| Lizenzen | Open Source, GPL (Copyleft), Public Domain/Gemeinfreiheit, OEM, EULA | Definieren | ap1 | voll (b03) |
| Hardwareinstallation | seriell vs. parallel (Übersprechen); Übertragungsrate aus Datenmenge und Zeitfenster; HDD vs. SSD (7 Ja/Nein-Aussagen) | Rechnen; Ja/Nein-Tabelle | ap1 | teilweise (siehe 3.10) |
| IT-Grundkenntnisse | Dezimal↔Dual↔Hex; W = P·t; I = P/U gegen Absicherung; Logikschaltung → Funktionsterm | Rechnen, Schaltung lesen | ap1 | voll (m04, h04); Schaltung→Term teilweise (p01 hat Wahrheitstabellen) |
| Dateiformate, Codes | Formate zuordnen (PNG, TIFF, JPG, PDF, DOCX, XLSX, ODT, ODP, CSV, MP4); Bildspeicher aus cm und ppi; UTF-8/16/32, Latin-1, ASCII | Zuordnen; Rechnen; Aussagen ankreuzen | ap1-teilweise | teilweise (Bildspeicher in h03, **Formatzuordnung und UTF-Details fehlen**) |
| Cloud | engl. ENISA-Text übersetzen, IaaS/PaaS/SaaS erläutern, je 3 Vor-/Nachteile | Übersetzen; Erläutern | ap1 | voll (b04); Übersetzungsformat fehlt |
| Virtualisierung | Server-Virtualisierung erklären, 2 Vorteile/1 Nachteil, Bare-Metal vs. Hosted (Aussagen zuordnen), Snapshot, Produkte | Erklären; Zuordnen | ap1 | voll (b04) |
| VDE-Schutzmaßnahmen | Basisschutz (Isolierung/Abdeckung), Fehlerschutz (Abschaltung), Zusatzschutz (RCD); Schutzklassen I–III (PC, Kopierer, Laserdrucker = I; Schreibtischlampe = II; Ladegeräte/Powerbank Schutzkleinspannung = III) | Zuordnen | ap1-teilweise | **fehlt** |
| Betriebssysteme | Marktanteile Desktop/mobil; Schichtenbild Hardware – Kern – Anwendungen | Diagramm beschriften | ap1-teilweise | teilweise (b01) |
| Schnittstellen | Tabelle VGA/DVI-D/HDMI 1/HDMI 2/DP 1.2/1.3 gegen HD/Full HD/4K/Ton; USB-C Ja/Nein (beidseitig steckbar, nicht mit USB-A mechanisch kompatibel, schneller als USB 3.0 möglich, 60 V nicht) | Tabelle ankreuzen | ap1 | voll (h03) |
| Industrie 4.0 | Mindmap (IIoT, Sensoren, Big Data, kognitive Systeme, technische Assistenz) | Mindmap | unnötig/ap1-teilweise | fehlt |
| Anwendungssysteme, Shell | WWS, CRM, ERP, SCM nennen; `tree`, `chkdsk`, `diskpart`, `del` vs. `pwd`, `df`, `ls`, `rm` erklären; Kopierbefehl wählen (`xcopy install tmp`, `cp install/*.* tmp`) | Nennen; Erklären; Ankreuzen | ap1 | teilweise (Shell in b01/b02; **Anwendungssystem-Begriffe und Dateikopierbefehle fehlen**) |
| Prozessoren, RAM | Mehrprozessor vs. Mehrkern; empfohlene Kernzahl je Einsatz; Takt = Impulse je Sekunde, nicht allein aussagekräftig; DDR = beide Flanken; Datenrate aus Takt × Prefetch × Busbreite | Erläutern; Rechnen; Angebotsvergleich begründen | ap1 | voll (h01, `hw.ram`) |
| RAID | RAID 0/1/5, Kapazitätsformeln (n·kleinste / kleinste / (n−1)·kleinste), RAID ≠ Backup | Tabelle ergänzen | **ap2** (Katalog 2025) | teilweise (s03: „Backup ≠ RAID“) |

### 3.6 Software (S. 95–115, Lsg 254–268)

| Block | Kernaussage | Aufgabentyp | Relevanz | Abdeckung |
|---|---|---|---|---|
| Paradigmen | imperativ (prozedural, strukturiert, objektorientiert) vs. deklarativ (funktional, mengenorientiert/SQL) | ungeordnete Notizen in Schema einsortieren | ap1 | voll (p05) |
| Pseudocode | C → deutsche Notation: PROGRAMMSTART, FESTLEGEN … ALS, `:=`, FALLS … DANN … SONST … ENDE FALLS, SOLANGE, WIEDERHOLE … SOLANGE, FÜR … BIS … MIT SCHRITTWEITE; C-Programm (Schleife, Verzweigung) übersetzen | Übersetzen | ap1 | voll (p01–p02), andere Schreibweise (Abschnitt 5) |
| Algorithmus | Lauflängenkodierung auf Zeichenarray (Zusammenfassung ab 4 gleichen Zeichen, Sonderzeichen davor, Zählschleifen mit Index) | Algorithmus in Pseudocode schreiben | ap1 | teilweise (p03 hat Arrays/Standardalgorithmen, **kein Kodierungs-/Stringalgorithmus**) |
| HTML/XML | HTML5-Grundgerüst, meta, title, video/audio/canvas/svg/math; XML mit DTD (ELEMENT, #PCDATA, Wiederholung +) | beschriften/zuordnen | ap1-teilweise | teilweise (b01/b03 streifen XML) |
| UML-Klassendiagramm | aus Rechnungsbeleg Klassen (Rechnung, Kunde, Artikel, Mitarbeiter), Attribute, Methoden, Multiplizitäten, Sichtbarkeit | zeichnen | ap1 (neu 2025) | voll (p04) |
| UML-Use-Case | Pizzeria-Bestellung: Akteure, include/extend | zeichnen | ap1 | voll (p04) |
| PAP/Refactoring | PAP mit 6 Ausgabezweigen auf Min/Max mit Hilfsvariablen vereinfachen | PAP überarbeiten | **unnötig** (PAP entfällt) | fehlt (ok) |
| Datenbank | relational vs. objektorientiert, SQL-Kategorien DML/DDL/DCL/TCL, ER-Diagramm aus Text (feste/freie Mitarbeiter, Projekte, Lohngruppe), SQL-Abfragen (SELECT, JOIN + GROUP BY, UPDATE, INSERT mit MAX+1) | zeichnen; SQL schreiben | ap1-teilweise (ER-Grundlagen), SQL = **ap2** | voll (d01–d03) |
| Entwicklungsprozess | Quellcode → Compiler → Objektcode → Linker (+ Bibliotheken) → ausführbares Programm; Java-Code mit 10 Begriffen beschriften | Reihenfolge; Beschriften | ap1 | teilweise (p01: Compiler; Linker-Kette, Code beschriften fehlt) |
| Debugging | Herkunft „Bug“; Haltepunkt, bedingter Haltepunkt; Variablenwerte aus Debugger-Ansicht auf Bedingung schließen | Fragen; Ankreuzen | ap1 | voll (p05); Buch-Erklärung zu „Just-in-time-Debugging“ ist fachlich falsch (Abschnitt 5) |

### 3.7 Netzwerke (S. 116–140, Lsg 269–286)

| Block | Kernaussage | Aufgabentyp | Relevanz | Abdeckung |
|---|---|---|---|---|
| OSI/TCP-IP | 7 Schichten mit deutschen und englischen Namen; TCP/IP 4 Schichten (Anwendung, Transport, Internet, Netzzugang); Protokolle zuordnen (IMAP/HTTPS Anwendung; TCP/UDP Transport; IP/ICMP Internet; WLAN/DSL Netzzugang) | Tabelle beschriften | ap1 | voll (m02) |
| Protokoll-Port-Tabelle | DNS 53, SMTP 25/465/587, IMAPS 993, Telnet 23 (Klartext), SSH 22, HTTPS 443, DHCP 67/68 UDP, NFS 2049, SMB 445, ICMP (ping) | Tabelle ergänzen (Name, Port, Zweck) | ap1 | voll (m10) |
| WLAN | Begriffe IEEE 802.11n, AP, SSID; Standardvergleich b/g/a/n/ac/ad nach Rate, Band, Kanalbreite; Controller-Netzplan; Verschlüsselung (WPA2 mit AES nach 802.11i bzw. WPA3); Personal (PSK) vs. Enterprise (RADIUS/802.1X) | Tabelle; zeichnen; Begründung | ap1 | voll (m12, m14); „Standardtabelle ergänzen“ als Aufgabenformat fehlt |
| Gebäudeverkabelung, LWL | Primär (Campus, LWL, > 100 m), Sekundär (Steigbereich, LWL/Kupfer), Tertiär (Etage, Kupfer, < 100 m); Singlemode, Multimode-Stufen-/Gradientenindex; Aussagen auf Richtig prüfen | Zuordnen; ankreuzen; Skizzen zuordnen | ap1 | voll (m12; Faserprofil-Skizzen Stufen-/Gradientenindex fehlen) |
| Kupferkabel | Cat 8 für Büro überdimensioniert; Tabelle Cat 5e/6a/7/8: MHz, Gbit/s, Länge | Stellungnahme; Tabelle | ap1 | voll (m12) |
| IP-Konfiguration | Beleg `ipconfig /all`: IP/24, Gateway im anderen Netz (Tippfehler im 3. Oktett), DHCP: Nein → Gateway korrigieren bzw. DHCP einführen; DHCP: Abkürzung, 2 Vorteile, DORA-Diagramm beschriften, Nachrichten erklären, nur bekannte Geräte (MAC-Liste/Reservierung, 802.1X) | Beleg auswerten; Diagramm beschriften; erläutern | ap1 | voll (m11, m13, m16) |
| IPv6 | Aussagen prüfen (2¹²⁸, Tunnel, gültige Schreibweisen); drei Adressen kürzen; /64 = 64 Bit Präfix + 64 Bit Interface-ID → 2⁶⁴ Adressen; Warum /64 (SLAAC/EUI-64); Privacy Extensions; DS-Lite (4-in-6-Tunnel, CG-NAT) | Rechnen/Kürzen; erklären | ap1-teilweise | voll (m07, `ipv6.compress`) |
| Fehlersuche | Beleg 2: Laptop erreicht Wiki per Name nicht; Ping auf Server und Gateway OK (TTL 64), DNS-Server manuell auf externe Adresse gesetzt statt internem DNS → per DHCP beziehen; mit IP statt Name testen | Beleg auswerten, Lösungsweg erklären | ap1 | voll (m13) |
| Fernwartung | VNC (RFB), RDP (TLS), SSH, clientless; TeamViewer/AnyDesk; Linux-Befehle `ls -al`, `ping`, `traceroute`/`tracert`, `cp`, `chmod 775` | Beschreiben; Tabelle | ap1 | teilweise (RDP/SSH ja, VNC/TeamViewer-Vergleich fehlt) |

### 3.8 Arbeits- und Geschäftsprozesse (S. 141–165, Lsg 286–303) – **Rechenaufgaben, siehe 3.10**

| Block | Kernaussage | Aufgabentyp | Relevanz | Abdeckung |
|---|---|---|---|---|
| Markt und Betrieb | Marktform (zweiseitiges Polypol, Käufermarkt); Wirtschaftskreislauf-Geldströme zuordnen; Mehrliniensystem mit Vor-/Nachteilen; kooperativer Führungsstil; Management by Objectives; Handlungsvollmacht (Allgemein/Art/Einzel) vs. Prokura (§ 49 HGB; Prokurist darf Grundstücke erwerben, nicht belasten oder verkaufen) | Fallfragen, Zuordnung | ap1-teilweise (LF 1) | **fehlt** |
| Ziele, Kennzahlen | Leitbild; ökonomische/ökologische/soziale Ziele und Zielkonflikt; Wirtschaftlichkeit = Ertrag/Aufwand, Produktivität = Ausbringung/Einsatz, Eigenkapitalrentabilität = Gewinn·100/EK | Nennen; Formelnummern zuordnen | ap1-teilweise | **fehlt** (nur Wirtschaftlichkeitsrechnung in w03) |
| Kosten, Finanzierung | Anschaffungskosten netto (Preis + Nebenkosten − Skonto, USt nicht); fixe/variable Kosten; Deckungsbeitrag = Umsatz − variable Kosten; Kredit (Abzahlungsdarlehen) vs. Leasing | Rechnen (siehe 3.10) | ap1 | teilweise (w03: AK, Break-even; Kredit/Deckungsbeitrag fehlen) |
| Beschaffungsprozess | Wertschöpfungskette Beschaffung (Bedarf, Menge, Zeit, Lieferant, Bestellung, Verfolgung, Wareneingang, Lager); Kern- vs. Unterstützungsprozess; ABC-Analyse; optimale Bestellmenge; Meldebestand, Höchstbestand, Bestellpunktverfahren; eEPK der Beschaffung | Reihenfolge; Rechnen; Diagramm zeichnen | ap1-teilweise | teilweise (w02: Ablauf), **ABC, Meldebestand, eEPK fehlen** |
| Recht | Rechts-/Geschäftsfähigkeit; Anfrage/Angebot/Anpreisung (nur Angebot verbindlich, alle formfrei); Freizeichnungsklausel; Kaufvertrag aus zwei Willenserklärungen; abweichende Bestellmenge = neuer Antrag; AGB (§ 305 BGB); Eigentumsvorbehalt; Pflichten und Störungen (Verzug, Schlechtleistung) | erklären, Fälle | ap1 | voll (w02, w04) |
| Preisbildung | Handelskalkulation, Kalkulationszuschlag, Handelsspanne; TCO; Gleichgewichtspreis, Umsatz, Nachfrageüberhang aus Diagramm; Rechnungspflichtangaben (§ 14 UStG); Skonto | Rechnen; Diagramm lesen | ap1 | teilweise (siehe 3.10) |

### 3.9 Prüfungssimulationen (S. 166–196, Lsg 304–323)

Alle drei Sätze haben **4 Handlungsschritte**, die den Kompetenzbereichen entsprechen (HS 1 Bedarf ermitteln; HS 2 Hard-/Software auswählen und Beschaffung; HS 3 konfigurieren/testen unter Datenschutz/IT-Sicherheit/QS; HS 4 einweisen und Leistung kontrollieren/protokollieren). Summe jeweils 100 Punkte. Teilaufgaben tragen 2–20 Punkte; die Punkte stehen im Aufgabentext in eckigen Klammern. Eine Zeitangabe je Teilaufgabe gibt es nicht (Hinweis S. 10: 6–8 Minuten Lesezeit). Die Aufgaben sind „ganzheitlich“: ein Kundenfall führt durch alle Schritte.

| Satz | Fall | HS 1 | HS 2 | HS 3 | HS 4 | Teilaufg. |
|---|---|---|---|---|---|---|
| Sim 1 | Reisebüro, 4 moderne Arbeitsplätze | 24 P | 20 P | 30 P | 26 P | 13 |
| Sim 2 | Makler mit 30 freien Mitarbeitern, BYOD → Firmenhandys | 20 P | 26 P | 24 P | 30 P | 12 |
| Sim 3 | CNC-Fertiger, Vernetzung, Cloud | 22 P | 30 P | 20 P | 28 P | 9 |

**Themenmix je Satz (Teilaufgaben mit Punkten):**

- **Sim 1:** Bedarfsermittlungsmethode beschreiben (4); Netzwerkplan in Grundriss zeichnen mit Kabelwegen, PoE, 2 Dosen/Platz, Cat 7 (12); Office-Pakete nach Kosten/Lizenz vergleichen (8); quantitativer Angebotsvergleich 3 Anbieter für 4 Monitore mit Rabatt, Skonto, Beförderung (12); drei nicht quantifizierbare Kriterien (6) und Methode dafür = Nutzwertanalyse (2); Schutzbedarfstabelle Router/Firewall/PC (12); IDS ergänzt Firewall, ersetzt sie nicht (5); DS-Grundsätze für Mitarbeiterpräsentation (8); E-Mail-Verschlüsselung per PGP/Ende-zu-Ende (5); englische Anleitung (LibreOffice Writer: Kopieren/Ausschneiden/Einfügen) übersetzen (12); Mängelrüge als Geschäftsbrief mit Datum, Mangelart, Recht, Verbleib der Ware (10); Kommunikationsmodelle Watzlawick und Vier-Seiten-Modell (4).
- **Sim 2:** Bedarfsanalyse BYOD → Firmenhandys (6); Use-Case-Diagramm mit include/extend (14); Hardwareoptionen nennen (6); Nutzwertanalyse mit vorgegebenen Gewichten 50/25/25 % (8); Nachhaltigkeitsaspekte (6); einseitiger/zweiseitiger Handelskauf und Vertragsart (6); Sicherheitskonzept in vier vorgegebenen Schritten mit Eintrittswahrscheinlichkeit gering/mittel/hoch und Schadenshöhe unter 10.000 / 10.000–100.000 / über 100.000 € (16); WPA2-4-Wege-Handshake laienverständlich erklären anhand Grafik (8); Videoüberwachung rechtlich (Einwilligung: freiwillig, zweckbezogen, ausdrücklich, widerrufbar) (8); Prüf-/Rügefrist zweiseitiger Handelskauf vs. Verbrauchsgüterkauf (6); Abnahme: Formen und Folgen (8); vier Schulungsformen (8).
- **Sim 3:** Fragebogen mit mindestens 5 Ja/Nein-Fragen zur Cloud-Bedarfsermittlung (10); Tabelle SaaS vs. IaaS ergänzen (12); englischen MQTT-Text übersetzen (8); Publish/Subscribe vs. Request/Response erläutern (8); Cloud-Angebotsvergleich mit Staffelpreisen und Break-even (14); Auftragsverarbeitung und Drittland (10); Online-Hilfe-Modelle erklären und empfehlen (10); Struktogramm auf Fehler prüfen (8); EPK Rechnungseingang vervollständigen (20).

### 3.10 Aufgabentyp-Statistik

**A. Teil 3 (3 Simulationen, 34 Teilaufgaben, 300 Punkte)** – nach Punkten:

| Aufgabenform | Teilaufgaben | Punkte | Anteil |
|---|---|---|---|
| Freitext: erläutern, beurteilen, beraten, aufzählen, begründen | 20 | 134 | 45 % |
| Zeichnen/Modellieren (Netzwerkplan, Use-Case, EPK, Struktogramm korrigieren) | 4 | 54 | 18 % |
| Tabelle ausfüllen/Vergleich (Schutzbedarf, Sicherheitskonzept, Softwarevergleich, SaaS/IaaS) | 4 | 48 | 16 % |
| Rechnen (Bezugspreis-Tabelle, Nutzwert, Cloud-Tarife) | 3 | 34 | 11 % |
| Übersetzen Englisch → Deutsch | 2 | 20 | 7 % |
| Geschäftsbrief nach Vorlage | 1 | 10 | 3 % |

Belegarten in den Simulationen: Grundriss (zum Einzeichnen), Angebots-Stichpunkte als Fließtext, Tarifliste (Cloud), englische Textauszüge, Herstellergrafik (WPA2-Handshake), Briefvorlage, vorgegebene Struktogramm-Skizze, EPK-Rohgerüst. **Keine echten Datenblätter mit Kennzahlen-Tabellen, keine mitgelieferten Belegsätze**, anders als im aktuellen IHK-Format; die Aufgaben sind textlastiger als die echte AP1.

**B. Teil 2 (≈ 65 Aufgabenblöcke, keine Punktwerte angegeben)** – grobe manuelle Zählung der Aufgabenformen je Kapitel:

| Kapitel | Freitext/Definition | Ankreuzen/Richtig-Falsch | Zuordnen/Reihenfolge/Beschriften | Tabelle ausfüllen | Zeichnen/Modellieren | Rechnen | Übersetzen EN→DE | Code/Pseudocode/SQL | Beleg lesen |
|---|---|---|---|---|---|---|---|---|---|
| 2.1 Projekt | 7 | 3 | 3 | – | 2 (Gantt, Netzplan) | 2 (kritischer Pfad) | 4 | – | 2 (Vorgangsliste) |
| 2.2 QM | 6 | 1 | 6 | – | – | – | 2 | – | 1 (Webseite) |
| 2.3 Datenschutz | 4 | – | 1 | – | 1 (PAP) | – | – | – | 2 (Formular, Gesetzestexte) |
| 2.4 IT-Sicherheit | 5 | 2 | 5 | 2 | – | – | – | – | – |
| 2.5 IT-Systeme | 10 | 6 | 6 | 8 | 1 (Schaltung lesen) | 8 | 1 | 1 (Shell) | 3 (Angebote, Tarife) |
| 2.6 Software | 4 | 2 | 6 | 1 | 4 (UML, ER, PAP) | – | – | 5 (Pseudocode, SQL, XML, Java) | 2 |
| 2.7 Netzwerke | 8 | 4 | 8 | 4 | 2 (Netzplan, DHCP-Diagramm) | 2 (Adressen kürzen, 2⁶⁴) | – | – | 3 (ipconfig, ping) |
| 2.8 BWL | 14 | – | 5 | 4 | 2 (Bestandsverlauf, eEPK) | 8 | – | – | 2 (Rechnung, Marktdiagramm) |

Schlussfolgerung: Die Simulationen sind **freitextlastig und modellierlastig (Diagramme, Pläne)**, Rechnen macht nur gut ein Zehntel der Punkte aus, tritt aber fast immer in Verbindung mit einer Auswahlentscheidung auf („günstigster Lieferant“, „welcher Tarif“, „ab wann lohnt sich Anbieter 1“). Übersetzung aus dem Englischen kommt in 2 von 3 Sätzen vor und im Teil 2 mindestens zehnmal.

### 3.11 Rechen-Aufgabenmuster (Grundlage für Generatoren)

Spalte „Generator“ nennt vorhandene IDs aus `src/core/generators.ts` bzw. `src/core/gen/*.ts`.

| # | Muster | Formel / Weg | Konvention im Buch | Wertebereich (Buchbeispiel / Vorschlag) | Generator |
|---|---|---|---|---|---|
| R1 | Benötigte Datenrate bei Zeitvorgabe, danach Tarif aus Liste wählen | Rate = Datenmenge·8 / Zeit; GiB = 1024³ Byte; Ergebnis in kbit/s ganzzahlig; Tarif muss ≥ Rate liefern | Datenmenge in **GiB (binär)**, Rate dezimal; Tabelle der Upload-Stufen vorgegeben (1.000 / 5.000 / 10.000 / 20.000 kbit/s) | Buch: 12 GiB in 2 h → 14.317 kbit/s → größter Tarif. Vorschlag: 4–40 GiB, 1–4 h, Tarifstufen 1–50 Mbit/s | **teilweise**: `calc.transfertime` (Zeit), `calc.rate` (Rate aus Zeit); nicht: Soll-Zeitfenster + Tarifauswahl, kein GiB |
| R2 | Bildspeicher aus physischem Format | Zoll = cm/2,54; Pixel = Zoll·ppi je Seite; Bit = Pixel·Farbtiefe; MiB = Bit/8/1024² | **Zwischenergebnisse gerundet** (11,81 Zoll → 3.543 px; 7,09 → 2.127 px), Ergebnis 21,56 MiB; exakt gerechnet 21,55 MiB | 20–40 × 15–30 cm, 150–600 ppi, 24 Bit, 2 Nachkommastellen | **teilweise**: `hw.bildspeicher` nur aus Pixelmaßen; Zoll-Foto steht im Fließtext von h03 |
| R3 | Elektrische Arbeit mehrerer Geräte | W = P·t·n, Ergebnis kWh; Kosten optional | kWh, Tagesbetrachtung | 20–100 PCs, 100–400 W, 4–10 h | **teilweise**: `hw.stromkosten` rechnet Jahreskosten je Gerät; Variante „n Geräte, Tagesarbeit in kWh“ ergänzen |
| R4 | Stromstärke gegen Absicherung | I = P/U (230 V); „reicht 10 A?“ | 2 Nachkommastellen, Ja/Nein plus Begründung | P 1.500–4.000 W, 10/13/16 A | voll (`hw.leistung`, Stufe 3) |
| R5 | Dezimal ↔ Dual ↔ Hex | Divisionsmethode mit Rest; Stellenwerte; Vierergruppen | Rechenweg wird mitverlangt | 8–12 Bit | voll (`bin.*`) |
| R6 | DDR-Datenrate | Takt(MHz)·Prefetch·Busbreite(64 Bit)/8 in MB/s | DDR4-3200: 400·8·64/8 = 25.600 MB/s = 25,6 GB/s | DDR3/4/5 mit Takt 200–800 MHz, Prefetch 8/16 | voll als MT/s-Variante (`hw.ram`); Taktvariante ergänzen |
| R7 | Bezugspreis-Tabelle für 3 Anbieter | Liste → − Rabatt → − Skonto (auf Zieleinkaufspreis) → + Bezugskosten (je Stück oder pauschal); Skonto wird in Anspruch genommen | Cent-genau, Rabatt % auf Liste; Bezugskosten nach Skonto | 3 Anbieter, 4 Stück, Liste 335–395 €, Rabatt 20–30 %, Skonto 0–3 %, Fracht je Stück oder pauschal | voll (`w.bezugspreis`, Stufe 3 hat 2 Anbieter; 3 Anbieter + Pauschale ergänzen) |
| R8 | Nutzwertanalyse | Σ Gewicht·Punkte; Punkte 0–10 | Gewichte in **ganzen Prozent**, Summe ohne Skalierung (725, 670, 680; 775 vs. 750) | 3–4 Kriterien, Gewicht in 5-%-Schritten | voll (`w.nutzwert`), aber Dezimalskala; Buchskala zusätzlich akzeptieren |
| R9 | Handelskalkulation vorwärts | LEP − Rabatt − Skonto + Bezugskosten = Bezugspreis; + Handlungskosten (% vom Bezugspreis) = Selbstkosten; + Gewinn (% von SK) = Barverkaufspreis; Provision und Skonto **im Hundert** zugleich → Zielverkaufspreis (Bar/(1 − Prov − Skonto)); Kundenrabatt im Hundert → Listenverkaufspreis | 2 Nachkommastellen; Gewinnzuschlag krumm (8,87 %), damit die Endsumme glatt wird (Rückwärtsrechnung aus Wunschpreis) | LEP 100–400 €, HK 20–30 %, Gewinn 5–15 %, Skonto 2–3 %, Prov 5–10 %, Rabatt 10–20 % | **teilweise**: `w.angebotspreis` (ohne Provision, ohne Rückwärts/Differenz) |
| R10 | Kalkulationszuschlag, Handelsspanne (und Faktor) | KZ = (LVP − Bezugspreis)/Bezugspreis; HS = (LVP − Bezugspreis)/LVP; Faktor = LVP/Bezugspreis | in %, 2 Stellen (95,53 % / 48,86 %) | Bezugspreis 100–500 €, LVP 1,3–2,2-fach | **fehlt** |
| R11 | Anschaffungskosten | Nettopreis + Nebenkosten (Transport, Aufbau) − Skonto = AK; USt nicht | Skonto hier auf Summe aus Ware und Nebenleistung (laut Rechnungstext), Ergebnis 3.087 € | 1–8 Tsd. € | **teilweise** (`w.afa` nutzt AK, kein eigenes Muster) |
| R12 | Leasing vs. Abzahlungsdarlehen | Netto = Brutto/1,19; Leasing = Netto·Satz/Monat·Monate; Darlehen: Tilgung = Netto/Jahre, Zinsen = Restschuld(Jahresanfang)·Satz, Summe = Netto + Zinsen | USt bleibt außen vor; Zins nur auf Restschuld zum Jahresanfang | Brutto 20–50 Tsd. €, Leasing 2–3 % mtl., Zins 3–6 %, 3–5 Jahre | **teilweise**: `w.kaufleasing` (Kauf/Leasing/Miete, kein Kredit mit Zinsen) |
| R13 | Lagerkennzahlen | Meldebestand = Tagesverbrauch·Lieferzeit + eiserner Bestand; Höchstbestand = eiserner Bestand + Bestellmenge | Bestellpunktverfahren mit fester Menge; Verlauf zeichnen | 20–80 Stück/Tag, 3–10 Tage, eiserner Bestand 60–200 | **fehlt** |
| R14 | Marktgleichgewicht ablesen | Schnittpunkt Angebot/Nachfrage; Umsatz = p·x; Überhang = Nachfrage − Angebot bei festem Preis | aus Diagramm | Preis 10–80 €, Menge 100–1.000 | **fehlt** |
| R15 | Cloud-/Dienstangebote vergleichen | Kosten/Monat = Pauschale + Maschinen·Satz + aufgerundete GB bzw. TB·Satz + Nutzer·Satz; Nutzer wächst mit Maschinen (1 je 2 Maschinen); Break-even über lineare Kostenfunktionen | angefangene GB/TB **aufrunden** (Jahresmenge/12 je Monat); mehrere Szenarien (14, 20, 30 Maschinen), Empfehlung begründen | Buch: 1.778 GB/Jahr → 149 GB/Monat; Anbieter 1: 3.089,50 €, Anbieter 2: 2.727 € bei 14 Maschinen; Break-even ab ca. 21 Maschinen | **fehlt** |
| R16 | Netzplan/Gantt mit kritischem Pfad | Vorwärts-/Rückwärtsrechnung | Start 0, FEZ = FAZ + D, kritischer Pfad = Puffer 0 | 8 Vorgänge, Dauern 1–8 | voll (`w.netzplan`); Gantt-Zeichnung fehlt |
| R17 | Kostenvergleich Wechselmedium (Wartezeit der Mitarbeiter in Euro) | Dauer = Datenmenge/Schreibrate; Kosten = Dauer·Stundensatz/3600·Arbeitstage + Stückpreis | 1 GB = 1.000 MB; 250 Arbeitstage; Zwischenergebnisse gerundet (0,016 € je Vorgang) | 24 €/h, 1 GB/Tag, USB-2.0-Stick ca. 16,5 MB/s vs. USB 3.0 ca. 420 MB/s | **fehlt** |
| R18 | Logikschaltung → Funktionsterm | Gatter ablesen (UND, ODER, NICHT als *, +, ~) | Symbole vorgegeben | 3 Eingänge, 3–4 Gatter | **teilweise** (`p.logic` Wahrheitstabelle) |
| R19 | IPv6-Präfix | 2^(128−Präfix) Adressen; kürzen nach RFC 5952 | `::` nur einmal, längste Nullfolge, bei Gleichstand erste | /56 und /64 | voll (`ipv6.*`) |
| R20 | RAID-Nettokapazität | RAID 0: n·k; RAID 1: k; RAID 5: (n−1)·k | 3 × 1 TB → 3/1/2 TB | n 3–6, k 1–8 TB | fehlt, laut Katalog 2025 **AP2** |
| R21 | Kennzahlen | Wirtschaftlichkeit = Ertrag/Aufwand; Produktivität = Menge/Einsatz; Rentabilität = Gewinn·100/Kapital | Formelnummern zuordnen | – | **fehlt** |

**Typische Rechenweg-Konventionen im Buch:** Zwischenergebnisse werden sichtbar gerundet; Ergebnisse stehen mit Einheit; Ja/Nein-Entscheidung wird immer mit einem Satz begründet; Ergebnis aus dem Rechenweg ist wichtiger als die letzte Nachkommastelle. Für Generatoren bedeutet das: Toleranz ±0,02 bei Bildgrößen, ±1 bei kbit/s-Werten, Rundungsregel immer im Aufgabentext nennen.

---

## 4. Lückenliste

### P1 – AP1-prüfungsrelevant und fehlt/schwach

| Nr | Thema | Warum relevant | Ziel-Modul | Vorschlag Lektion und Aufgabentyp |
|---|---|---|---|---|
| P1-1 | **Englischer Fachtext auswerten/übersetzen** (Datenblatt-Auszug, Anleitung, Produktbeschreibung) | Katalog verlangt, englische Informationsquellen auszuwerten; Buch: 2 von 3 Sätzen + mindestens 10 Einzelaufgaben; Aufgabenformat in der App nicht als Übungstyp vorhanden | w01 (Kundeninformation) plus je 1–2 Texte in h01, b04, m12, w02 | Neuer Fragenpool-Typ `free` mit englischem Text (4–8 Sätze), `modelAnswer` und `keywords` (Fachbegriffe); Zusatzfrage „Was bedeutet X im Kundengespräch?“; Glossar DE/EN der 40 häufigsten IT-Begriffe |
| P1-2 | **Handelskalkulation erweitern**: Vertreterprovision, Rückwärts-/Differenzkalkulation, Kalkulationszuschlag, Handelsspanne, Faktor | im Buch Musteraufgabe (R9, R10); passt zur Prüfungsrubrik „Angebot erstellen“ | w03 | Lektion „Aufschläge und Spannen“; Generator `w.handelsspanne` (Formeln R9/R10, Wertebereiche siehe 3.11, Tabelle zum Ausfüllen mit Zwischenschritten); Stufe 3: Kundenrabatt rückwärts aus Wunschpreis |
| P1-3 | **Finanzierung: Kredit (Abzahlungsdarlehen) vs. Leasing**, Anschaffungskosten netto | „Wirtschaftlichkeit von IT-Systemen beurteilen“ ist eigener Themenkreis in der Verlagsstatistik; w03 hat Kauf/Leasing/Miete, aber keine Tilgungstabelle | w03 | Lektion „Kredit mit Tilgungsplan“; Generator `w.kreditleasing` (R12): Tabelle Jahr/Restschuld/Zinsen/Tilgung/Rate, Gesamtkosten, Empfehlung; Misconceptions: USt mitgerechnet, Zins auf Anfangsschuld statt Restschuld, Leasingsatz auf Brutto |
| P1-4 | **Cloud-/Dienstangebote mit Staffelpreisen und Break-even** | Sim 3 widmet 14 Punkte; verbindet Cloud, Rechnen, Entscheidung | w03 oder b04 (Wirtschaftlichkeit von Cloud) | Generator `w.cloudtarif` (R15): zwei Tarife mit Grundpauschale, Satz je Maschine, aufgerundete GB/TB-Blöcke, Nutzerpauschale; 3 Szenarien; Frage „ab wie vielen Maschinen lohnt Anbieter 1“ (lineare Gleichung); Rundungsregel „angefangene Einheit“ im Prompt |
| P1-5 | **Benötigte Datenrate aus Datenmenge und Zeitfenster, Tarif auswählen** | Standardform für Backup-/Cloud-Entscheidungen, im Buch mit GiB | m15 oder s03 | Generator `calc.sollrate` (R1) mit Varianten GB/GiB, Ergebnis in kbit/s oder Mbit/s, Tarifliste; Misconception „Bit/Byte“ und „1000 vs. 1024“ |
| P1-6 | **Bildspeicher aus Größe in cm und ppi** (mit Zwischenrundung) | im Buch Standardrechnung zum Thema Dateiformate/Codes; App kennt nur Pixelmaße | h03 | Generator `hw.fotospeicher` (R2) mit Tabelle der Zwischenschritte; Toleranz ±0,02 MiB; Hinweis, dass gerundete Zwischenwerte zu 21,56 statt 21,55 führen |
| P1-7 | **Rollen und Regeln in Scrum, Wasserfall-Dokumente, Machbarkeitsstudie/Stakeholderanalyse** | Buch prüft Scrum als „Fehler in Aussagen finden“; App behandelt Scrum nur im Vergleich | w05 | Lektion „Agil arbeiten“ (Rollen, Sprint, Artefakte, Zeremonien); Aufgabentyp „Aussagenliste prüfen und korrigieren“ (`table` mit richtig/falsch + Begründungsfeld) |
| P1-8 | **Kleine Modellier-/Zeichenaufgaben im App-Format**: Netzwerk-Grundrissplan (Komponenten, Kabelwege, PoE, Cat 7), EPK-Ausschnitt, Gantt aus Vorgangsliste, DHCP-Diagramm | Diagramme sind 18 % der Simulationspunkte | m16, w05, w02 | Da Zeichnen nicht automatisch prüfbar ist: `order`/`match` für Reihenfolgen und Zuordnungen plus `free` mit `modelAnswer` und Prüfliste („Hast du Switch, AP, Router, PoE, 2 Dosen/Platz?“) |
| P1-9 | **IDS/IPS im Zusammenspiel mit Firewall** | Sim 1 stellt die Frage „IDS statt Firewall?“; App erwähnt IPS nur als Teil der NGFW | m14 | kurzer Abschnitt IDS vs. IPS vs. Firewall (erkennen/melden vs. blockieren vs. filtern), Fragen `free` und `single` |
| P1-10 | **Schutzklassen I–III, Basis-/Fehler-/Zusatzschutz (DIN VDE 0100-410), RCD** | Buch widmet eigenen Block; passt zu LF 2 (Energie/Arbeitsplatz) und Sicherheit am Arbeitsplatz; im Verlagsmaterial als Energie-/Elektrothema | h04 | Lektion „Elektrische Sicherheit am Arbeitsplatz“ (Symbole, Beispiele: PC = I, Netzteil/Lampe = II, Kleinspannung = III; RCD löst bei Fehlerstrom aus), Zuordnungsaufgaben |

### P2 – AP1-Randthemen

| Nr | Thema | Ziel-Modul | Vorschlag |
|---|---|---|---|
| P2-1 | Standard-Datenschutzmodell: 7 Gewährleistungsziele | s02 | Tabelle Ziel → typische Maßnahme; Aufgabe „Anforderung dem Ziel zuordnen“ (`match`) |
| P2-2 | Pharming, Nicknapping, Spoofing, APT sowie Abwehrliste „3 Maßnahmen“ | s01 | Ergänzung der Begriffsliste; Freitextaufgabe „drei Maßnahmen gegen DDoS“ mit Musterantwort |
| P2-3 | IT-Sicherheitsgesetz und KRITIS, Meldepflicht-Entscheidung | s01 | Kurzabschnitt, Aufgabe „Meldung ja/nein“ (Fälle: Festplattenausfall, Spear-Phishing …) |
| P2-4 | Kontaktformular-Prüfung (Beleg) | s02 | `free`-Aufgabe mit Formularbeschreibung als Markdown-Tabelle, Keywords https, Datenminimierung, Einwilligung, Datenschutzerklärung |
| P2-5 | Kano-Modell, ISO-9126-Merkmale, QM-System-Aufbau | b05 | kurzer Abschnitt, `match`: Merkmal → Hauptmerkmal; Kano: Basis/Leistung/Begeisterung am Beispiel Notebook |
| P2-6 | Lager- und Beschaffungskennzahlen: Meldebestand, Höchstbestand, ABC-Analyse, Bestellpunktverfahren | w02 | Generator `w.lager` (R13), `match` A/B/C-Güter |
| P2-7 | Kennzahlen Wirtschaftlichkeit/Produktivität/Rentabilität, Deckungsbeitrag, fixe/variable Kosten | w03 | Formelzuordnung (`match`), kleiner Generator |
| P2-8 | Marktformen, Käufer-/Verkäufermarkt, Wirtschaftskreislauf, Leitungssysteme, Führungsstile, Handlungsvollmacht/Prokura | w01 oder neues Modul „Betrieb und Markt“ | nur wenn laut Katalog LF 1 geprüft wird; knappe Lektion mit 8–10 Fragen |
| P2-9 | Anwendungssysteme (ERP, CRM, WWS, SCM) als Begriffsblock; Shell-Kopierbefehle `xcopy`/`cp` | b01 | Zuordnungsaufgabe, Kopierbefehl wählen |
| P2-10 | Stringalgorithmus (Lauflängenkodierung) als Pseudocode-Übung; Debugger-Bedingung aus Variablenwerten ableiten | p03, p05 | Aufgabe „Kompressionsregel ab 4 Zeichen“; `trace`-Aufgabe |
| P2-11 | Dateiformate zuordnen (PNG, TIFF, JPG, PDF, DOCX, XLSX, ODT, ODP, CSV), UTF-8/16/32, Latin-1, ASCII | h03 oder m02 | `match` + Aussagenliste |
| P2-12 | Fernwartungstechniken (VNC, RDP, SSH, clientless) im Vergleich | m11 | Tabelle mit Port, Verschlüsselung, Einsatz |
| P2-13 | Kommunikation: „man kann nicht nicht kommunizieren“ und Vier-Seiten-Modell mit Aussage → Ebene | w01 | `match`-Aufgabe (bereits Grundlage in w01 vorhanden, nur Aufgabentyp ergänzen) |
| P2-14 | Geschäftsbrief nach Vorlage (Mängelrüge) | w04 | `free`-Aufgabe mit Checkliste: Datum, Betreff, Sachverhalt, Mangelart, Recht (Nacherfüllung), Verbleib der Ware |

### P3 – AP2 / nicht für AP1

| Nr | Thema | Hinweis |
|---|---|---|
| P3-1 | RAID 0/1/5 mit Nettokapazität | laut Katalog 2. Auflage nur noch Teil 2; in App bewusst nur „Backup ≠ RAID“ |
| P3-2 | SQL-Abfragen mit JOIN, GROUP BY, INSERT-MAX+1 | AP2; d03 ist als Vertiefung korrekt eingestuft |
| P3-3 | IPv6-DS-Lite, Carrier-Grade-NAT im Detail | gehört eher zu AP2 Netzwerke; in m03/m11 genügt die kurze Erklärung |

---

## 5. Widersprüche und Korrekturen

Fundstellen der App sind ungefähr (Zeile aus Stichprobe). **Echte App-Fehler wurden bei der Stichprobe nicht gefunden.** Die Abweichungen betreffen fast immer Fehler oder veralteten Stand im Buch.

| Nr | Thema | Buch | App | Bewertung |
|---|---|---|---|---|
| W1 | DSB-Schwelle | S. 47 zitiert „mindestens zehn Personen“ (§ 38 BDSG alt) | `src/content/modules/s02.ts` ca. Z. 432 und 508: **20 Personen** (seit 2019) | App korrekt, **Buch veraltet**. Bei Buchbezug nicht übernehmen |
| W2 | ISO-9000-Grundsätze | S. 30 und Lösung S. 210: Altfassung (u. a. „systemorientierter Ansatz“, „sachbezogene Entscheidungsfindung“, Zählung 7 vs. 8 inkonsistent) | `b05.ts` ca. Z. 54: sieben Grundsätze nach ISO 9000:2015 (Führung, Engagement von Personen, faktengestützte Entscheidungsfindung, Beziehungsmanagement) | App korrekt, Buch veraltet. Prüfungsfragen, die die Altliste verlangen, wären nur mit 2005er Bezug lösbar |
| W3 | Nutzwertanalyse-Skala | S. 234, 312: Gewichte in ganzen Prozent, Teilnutzen = Gewicht × Punkte (Summen wie 725 und 775) | `w02.ts` ca. Z. 305 (Konvention erklärt) und `wirtschaft.ts` ca. Z. 213–217, 233–236, 253: Dezimalfaktor; die Buchskala wird als Fehlbild „Prozent statt Dezimal“ gewertet | **Konventionsunterschied, kein Fehler.** Empfehlung: bei Prüfungsübungen beide Skalen als richtig akzeptieren und das Fehlbild nur melden, wenn der Prompt Dezimalfaktoren ausdrücklich verlangt |
| W4 | Skonto auf Bezugskosten | S. 291 (Anschaffungskosten): Skonto auf Warenwert **plus** Transport/Aufbau, weil beides auf der Rechnung steht; S. 306 (Bezugspreis): Skonto nur auf Ware, Bezugskosten danach | `wirtschaft.ts` ca. Z. 128–144: Skonto nur auf Zieleinkaufspreis, Fehlbild `w-skonto-auf-bezugskosten` | Buch ist intern uneinheitlich. App-Regel ist die Standardlehre der Bezugskalkulation. Aufgaben sollten bei Rechnungsbelegen schreiben, worauf das Skonto gilt |
| W5 | Netzplan-Begriffe | Feld „P = Pufferzeit“ (Gesamtpuffer), Start bei 0 (S. 203) | `wirtschaft.ts` ca. Z. 704 ff. und Z. 738: GP = SAZ − FAZ, Start 0 | Rechenweg identisch; nur Beschriftung „P“ vs. „GP“. Im Aufgabentext beide Bezeichnungen nennen |
| W6 | Kabelempfehlung | S. 282: Cat 7 sei Standard für Neuinstallationen | `m12.ts` Z. 263–266: Cat 6A als Mindeststandard, Cat 7 mit Cat-6A-Dosen ergibt Cat-6A-Strecke | App differenzierter. In Sim 1 des Buchs wird Cat 7 verwendet; im Modell-Lösungshinweis beide als zulässig kennzeichnen |
| W7 | WLAN-Tabelle | S. 273: ad mit 8,085 Gbit/s (zweifelhaft, übliche Angabe ca. 6,8 Gbit/s), ac mit 6,93 Gbit/s, kein Wi-Fi 6/ax | `m12.ts` Z. 843–853: b/a/g/n/ac/ax (ca. 6,9 und 9,6 Gbit/s), kein ad | App aktueller. Wert 8,085 nicht übernehmen |
| W8 | Pseudocode-Schreibweise | S. 255: `FALLS … DANN … SONST … ENDE FALLS` als Verzweigung, `FÜR … BIS … MIT SCHRITTWEITE` | `p01.ts` Z. 129–133: `WENN … DANN`; `FALLS` = Mehrfachauswahl; `FÜR i VON 1 BIS n` mit **einschließlich** Endwert | **Begriffskollision „FALLS“**. Zusätzlich übersetzt das Buch eine C-Schleife mit `< 10` zu „BIS 10“ (S. 256), also ein Durchlauf mehr; Buchlösung ist hier ungenau. In AP1 gilt „jede nachvollziehbare Notation“; Aufgaben der App sollten die Notation im Prompt erklären |
| W9 | Just-in-time-Debugging | S. 268: „Anweisungen im laufenden Debuggen ändern“ | `p05.ts`: Debugger/Haltepunkt ohne diese Definition | Buch **fachlich falsch**: JIT-Debugging heißt, dass bei einem Absturz ein Debugger nachträglich angehängt wird; das Ändern im Lauf ist „Edit and Continue“. Nicht übernehmen |
| W10 | Rechenweg Bildspeicher | S. 240: 21,56 MiB durch Rundung 11,81/7,09 Zoll und 3.543 × 2.127 px | `hw.bildspeicher` ohne cm-Variante | exakt 21,55 MiB. Wenn eine solche Aufgabe ergänzt wird: Rundungsregel angeben, Toleranz ±0,02 |
| W11 | Ping-Lösung in Beleg-Aufgabe | S. 283: Gateway- und Server-IP beim Ping vertauscht, DNS-IP „172.20.5.200“ statt …0.200 | m13 Beispiele korrekt | Tippfehler im Buch. Nicht übernehmen |
| W12 | BDSG-Verweis Auftragsverarbeitung | S. 321: „§ 62 Abs. 5 BDSG“ | `s02.ts`: Art. 28 DSGVO | App korrekt (§ 62 BDSG betrifft den Anwendungsbereich der JI-Richtlinie) |
| W13 | Norm-Bezeichnung | Buch schreibt „DIN VDE 100-410“ (S. 86, 245) | – | korrekt ist **DIN VDE 0100-410**; bei Übernahme richtig schreiben |
| W14 | Medienlebensdauer | S. 232: CD/DVD 30 Jahre, SSD 10, USB-Stick 30 | `h02.ts`: nur TBW/MTBF-Logik | Buchwerte sind Faustwerte ohne Quelle; nicht als Prüfungsfakt übernehmen, bei Bedarf „Einflussfaktoren“ statt Jahreszahlen fragen |
| W15 | Restore-Regeln, Typ-1/Typ-2-Hypervisor, DHCP-DORA, IPv6-Kürzen, Ports, Rügefrist, Beweislastumkehr, Lastenheft/Pflichtenheft, Schutzbedarfskategorien | wie in 3.x | `s03.ts` Z. 113–118; `b04.ts` Z. 286; `m11.ts` Z. 75–103; `m07.ts` Z. 198–298, 1198; `m10.ts` Z. 257–274; `w04.ts` Z. 128–130; `w01.ts` Z. 297–301; `s01.ts` Z. 518 | **konform** |

### Lösungsvergleich (Stichprobe: 26 Aufgaben aus allen Kapiteln)

| Nr | Buchaufgabe (Seite) | Buchergebnis / Konvention | App-Stelle | Befund |
|---|---|---|---|---|
| 1 | Bezugspreis Monitore (S. 306) | 1.090,16 / 1.039,84 / 1.210,00 € | `w.bezugspreis` | konform |
| 2 | Nutzwert Rechner (S. 234) | 725 / 670 / 680 (ganze Prozent) | `w.nutzwert` | Skala abweichend (W3) |
| 3 | Nutzwert Handys (S. 312) | 775 vs. 750 | `w.nutzwert` | Skala abweichend (W3) |
| 4 | Handelskalkulation Bildschirm (S. 300) | Bezug 179,00; Selbstkosten 223,75; Barpreis 243,60; Ziel 280,00; Liste 350,00 | `w.angebotspreis` | Schema konform, Provision fehlt |
| 5 | Kalkulationszuschlag/Handelsspanne (S. 301) | 95,53 % / 48,86 % | – | fehlt |
| 6 | Anschaffungskosten Server (S. 291) | 3.150 − 2 % = 3.087 € netto | `w03.ts` Z. 400 | konform, Skonto-Basis siehe W4 |
| 7 | Leasing 2,5 %/Monat vs. Kredit 4 % (S. 292) | 33.600 € vs. 30.800 € | `w.kaufleasing` | Kredit fehlt |
| 8 | Meldebestand/Höchstbestand (S. 295) | 360 / 600 Stück | – | fehlt |
| 9 | Gleichgewichtspreis/Umsatz/Überhang (S. 302) | 40 € / 16.000 € / 400 Stück | – | fehlt |
| 10 | Übertragungsrate 12 GiB in 2 h (S. 235) | 14.317 kbit/s → VDSL 100 | `calc.transfertime`, `calc.rate` | Aufgabenform fehlt; Binärpräfix im Buch |
| 11 | Bildspeicher 30×18 cm, 300 ppi (S. 240) | 21,56 MiB (exakt 21,55) | `hw.bildspeicher` | Variante fehlt (W10) |
| 12 | Elektrische Arbeit 75 PCs (S. 238) | 180 kWh/Tag | `hw.stromkosten` | Rechenweg konform, Variante „n Geräte/Tag“ fehlt |
| 13 | I = P/U gegen 10 A (S. 238) | 10,43 A, nicht ausreichend | `hw.leistung` | konform |
| 14 | Dual/Dez/Hex (S. 237) | 1001110; 203; FA1 | `bin.*` | konform |
| 15 | DDR4-3200 (S. 252) | 25,6 GB/s | `hw.ram` | gleichwertig, Takt-Prefetch-Weg ergänzen |
| 16 | USB-Stick-Kostenvergleich (S. 248) | ca. 49 € vs. 107,50 € pro Jahr (Zwischenrundung, Wertangabe im OCR unsicher) | – | fehlt; Buchrechnung ungenau |
| 17 | Cloud-Tarife (S. 319–320) | 3.089,50 vs. 2.727 € bei 14 Maschinen; Break-even ab 21 Maschinen | – | fehlt |
| 18 | Netzplan Software-Projekt (S. 203) | Dauer 22, kritischer Pfad A–B–D–F–H | `w.netzplan` | konform (W5) |
| 19 | IPv6 kürzen (S. 280) | AF00::E255:0:1:332D:81FA; BEAF:776:A0:E222:D000:12::; A000::B | `ipv6.compress` | konform (RFC 5952) |
| 20 | /64-Adressanzahl (S. 280) | 2⁶⁴ = 18.446.744.073.709.551.616 | `ipv6.subnets` | konform |
| 21 | ipconfig-Analyse Gateway (S. 277) | Gateway im anderen /24 → Tippfehler | m13/m16 | konform |
| 22 | DHCP-Ablauf (S. 278) | DORA, 0.0.0.0 → 255.255.255.255, Lease-Erneuerung nach halber Zeit | `m11.ts` Z. 75–103 | konform |
| 23 | Voll/diff/inkr (S. 231) | Restore-Regeln | `s03.ts` Z. 118 | konform |
| 24 | Rügefrist (S. 316) | unverzüglich (HGB 377); Verbrauchsgüterkauf 1 Jahr Beweislastumkehr | `w04.ts` Z. 128–130 | konform |
| 25 | DSB-Schwelle (S. 47) | 10 Personen | `s02.ts` Z. 432 | Buch veraltet (W1) |
| 26 | ISO-9000-Grundsätze (S. 210) | Altliste | `b05.ts` Z. 54 | Buch veraltet (W2) |

---

## 6. Nicht übernehmen

| Thema | Grund |
|---|---|
| PRINCE2, DIN ISO 21500, TQM/EFQM-Geschichte, Kano-Zeitangaben | in der AP1 nicht prüfungstypisch; nur als Übersetzungstext im Buch |
| PAP-Refactoring (S. 108), Struktogramm-Korrektur (Sim 3, S. 195) | Struktogramm/PAP entfallen im Katalog 2025; die Idee „Eingabeprüfung mit ODER statt UND, Schleifenbedingung“ lässt sich im Pseudocode üben |
| SQL-Abfragen, RAID-Tabellen | laut Katalog 2. Auflage AP2 |
| Industrie-4.0-Mindmap, MQTT-Übersetzung | nur beiläufig, in der AP1 nicht belegt; falls gewünscht höchstens als englischer Beispieltext für P1-1 |
| Suchmaschinenoperatoren, Methodik der Internetrecherche | Randthema, kein Katalogpunkt |
| Marktanteile von Betriebssystemen (Zahlen) | veralten rasch; stattdessen Strukturwissen |
| Medienlebensdauer in Jahren (S. 232) | Faustwerte ohne Beleg |
| Alte Werte und Aussagen laut Abschnitt 5 (DSB zehn Personen, ISO-Altgrundsätze, JIT-Debugging, ad 8,085 Gbit/s, „DIN VDE 100“, § 62 BDSG) | im Buch fehlerhaft oder veraltet |
| Struktur „Ausfüllbuch mit Platzhaltern“ | in der App wird mit `table`, `order`, `match`, `free` gearbeitet; Zeichenaufgaben sind mit Prüflisten abzubilden |
