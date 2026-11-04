# Analyse: fi-lab.de als Vorbild für die FISI Academy

Stand der Analyse: 04.11.2026. Untersucht wurden Startseite, Sitemap (34 URLs) und alle verlinkten Unterseiten per Browser-Automatisierung (die Seite ist eine JavaScript-Anwendung, reines Abrufen liefert nur den Seitentitel). Fast alle Tools und alle sieben AP1-Lernkatalog-Seiten wurden geöffnet; die Prüfungssimulation wurde gestartet und eine Frage beantwortet.

**Urheberrechtshinweis:** Dieses Dokument beschreibt Aufbau, Themen und Funktionen in eigenen Worten. Aufgabentexte, Zahlenwerte und Erklärtexte von fi-lab.de werden bewusst nicht übernommen. Die Seite wirbt für ihre WiSo-Simulationen mit „originalgetreuen Aufgaben“ – diese Fragen sind für uns tabu, auch als Vorlage zum Umformulieren.

Nicht geprüft bzw. unsicher: das Zeitverhalten des zweiten Modus „Prüfungssimulation“ (Timer, Auswertung) – der Modus-Umschalter ist sichtbar, aber ich habe keinen kompletten Durchlauf gemacht. Der genaue Fragenumfang der Tools (z. B. Anzahl der Fragen im OSI-Trainer: 39 Karten sichtbar) wurde nur stichprobenartig erfasst.

---

## 1. Was ist fi-lab.de

| Merkmal | Befund |
|---|---|
| Name / Betreiber | „FI-Lab – IT & Netzwerk Lernplattform“. Kein Impressumsname ausgewertet; Kontakt per E-Mail, Feedback-Seite vorhanden. |
| Zielgruppe | Auszubildende Fachinformatiker (Schwerpunkt Systemintegration; ein IPv6-Tool nennt ausdrücklich „IHK-Prüfungen für Fachinformatiker Systemintegration“). Selbstbeschreibung: Ergänzung zur Ausbildung, risikofreies Üben. |
| Prüfungsteile | **AP1** („Einrichten eines IT-gestützten Arbeitsplatzes“): Lernkatalog vollständig befüllt. **AP2** („Konzeption und Administration von IT-Systemen“, „Analyse und Entwicklung von Netzwerken“, „WiSo“): Seiten existieren, sind aber gesperrt bzw. fast leer („Inhalte werden in Kürze ergänzt“); angekündigt war „Mitte 2026“, im November 2026 weiterhin nicht verfügbar. Eine Simulationskategorie gibt es nur für **WiSo**. |
| Preis | Kostenlos, ohne Registrierung, keine Anmeldung. Kein Lernstand wird gespeichert (localStorage ist leer, keine Konten). |
| Technik | Single-Page-App, Sitemap + robots.txt vorhanden, auf Smartphone-Breite (375 px) kein horizontaler Überlauf, Viewport-Meta gesetzt. Kein strukturiertes Daten-Markup gefunden. |
| Navigation | Startseite, Üben (Tools), Lernkatalog, Prüfungssimulation, Über, Feedback. Auf jeder Unterseite ein Suchfeld und ein Inhaltsverzeichnis. |
| Umfang | 26 Übungstools in 9 Gruppen, 7 AP1-Lernkatalogseiten (Fragenkomplexe), 8 WiSo-Simulationen à 30 Fragen. |

**Einordnung:** Kein Konkurrent im Funktionsumfang (kein Fortschritt, keine Wiederholungslogik, keine Prüfungssimulation für AP1), aber eine saubere, werbefreie „Werkzeugkiste“ mit Lernkatalog, der **exakt der Gliederung des IHK-Prüfungskatalogs für AP1 folgt**.

---

## 2. Themen- und Inhaltsstruktur

### 2.1 Lernkatalog AP1 – sieben „Fragenkomplexe“ (fk1–fk7)

Jeder Komplex trägt die zugehörigen Lernfelder und folgt den Katalog-Überschriften des Prüfungsbereichs. Die Seiten sind reine Lesetexte mit Tabellen, Grafiken (13–33 je Seite), Inhaltsverzeichnis, Suchfeld und teils Verweis auf ein passendes Übungstool. Es gibt **keine Fragen, keine Lernkontrolle und keinen Fortschritt** im Lernkatalog.

| Komplex | Lernfelder | Inhaltsgruppen (Katalogpunkte, paraphrasiert) | Verknüpftes Tool |
|---|---|---|---|
| fk1 Arbeitsaufgaben planen und durchführen | LF 1, 2, 3, 5, 6 | Projektmerkmale, Struktur-/Netz-/Gantt-Plan, SMART, Meilensteine, Wasserfall und Scrum, Teamphasen nach Tuckman, Feedback/Lessons Learned; Machbarkeit, Vor- und Nachkalkulation, Stakeholder, Risikoanalyse; Kundenkommunikation, Fehler- und Störungsmanagement, Ticketstatus, KI-Unterstützung, 1st/2nd/3rd-Level-Support | Netzplan |
| fk2 Kunden informieren und beraten | LF 1, 2 | Marktformen und Käufer-/Verkäufermarkt, Zielgruppenabgrenzung, quantitative/qualitative Angebotsbewertung; Bedarfsanalyse (Befragung, Kanäle, Fragetypen, Bias, Auswertung vorhandener Daten); Kommunikationsmodelle (4-Ohren, Sender-Empfänger), Angebot und Präsentation, englische Texte; Präsentation und Medienkompetenz; Nutzwertanalyse, Vertriebsformen | Marktformen, Handelskalkulation, Nutzwertanalyse |
| fk3 Leistungen in der IT bewerten | LF 1, 2, 3 | Funktionale/ökonomische/ökologische Bewertung; Hardware- und Softwareprodukte, Cloud (IaaS/PaaS/SaaS/DaaS/FaaS), KI-Software mit Risiken, virtuelle Desktops; Kommunikationssysteme, Client-Server, Domäne, mobile Geräte, Protokolle/OSI; BIOS/UEFI, CPU, RAM, HDD/SSD, Dateisysteme, Ethernet-/WLAN-Standards, Barrierefreiheit, Gütesiegel, Datenraten, SI vs. IEC, Energie und Kosten; Anschaffungs-, Betriebs-, fixe/variable, Lizenz- und Finanzierungskosten, Kauf/Leasing/Pay-per-Use, Preis-Leistung, Nutzwertanalyse, Wertschöpfung | Finanzierung, Nutzwertanalyse |
| fk4 IT-Lösungen entwickeln und betreuen | LF 5 | Bedarfsanalyse, Lasten-/Pflichtenheft; Installation und Einrichtung (OS, UEFI, Partitionen, IP-Konfiguration, RDP, KI-Software); Hardware- und Softwareauswahl nach Bedarf; Urheberrecht und Lizenzarten (EULA, OEM, GNU, Pay-per-Use); Installation/Konfiguration von Hardware, OS, Kommandozeile, Netzwerk (DHCP, WLAN, VPN, Troubleshooting); Compiler/Linker/Interpreter, prozedural vs. OOP, Datentypen, Kontrollstrukturen, Funktionen, Klassen, Bibliotheken, Skripte, Debugging; Pseudocode, UML (Use-Case, Klasse, Aktivität), Bildschirmmasken, Fehlersuche im Code, Schreibtischtest; ER-Modell nach Chen | – (Pseudocode-Tool existiert separat) |
| fk5 Qualitätssichernde Maßnahmen | LF 3, 5, 6 | QM-Systeme, Normen (ISO 9001/14001/27001, ITIL), Zertifizierung; Qualitätsplanung (Ist/Soll, SMART), Qualitätslenkung, PDCA, Testprotokoll beim Einrichten eines Arbeitsplatzes | – |
| fk6 IT-Sicherheit und Datenschutz | LF 4 | DSGVO/BDSG, Schutzziele, Betroffenenrechte, TOM-Gebote, Sicherheits- vs. Datenschutzbeauftragter, Passwort-Policy, technische/personelle Maßnahmen, BSI-Auszüge; Anonymisierung/Pseudonymisierung; Schutzbedarfsanalyse (Anwendungen, Systeme, Räume, Verbindungen); Bausteine, Schutzbedarfskategorien, 5×5-Risikomatrix, ISMS; Security by Design/Default, Härtung, 3-2-1-Backup, RAID, Verfügbarkeitsklassen, Zugangs-/Zugriffskontrolle, sym./asym./hybride Verschlüsselung, Hash, PKI, Signatur, 2FA, Personal Firewall | – |
| fk7 Leistungen erbringen und Auftrag abschließen | LF 2, 3, 6, 7 | Vertragsarten (Kauf, Miete, Leasing, Lizenz, Service/SLA, Werk, Dienst), Vertragsbestandteile und -störungen; Unternehmensziele aus dem Leitbild; Leistungserbringung vor Ort/remote, Ticketsystem, Kundenvorgaben; Aufbauorganisation (Ein-/Mehrlinien, Stablinien, Matrix), Vollmachten (Handlungsvollmacht, Prokura); Veränderungsprozesse (Widerstände, Promotoren/Bremser, Qualifizierung); Abnahmeprotokoll, Mängelarten; Soll-Ist-Vergleich, Nachkalkulation, Lessons Learned, Folgeaufträge | – |

AP2-Seiten (ap2fk1–4): nur Gerüst; ap2fk1 listet Kundenbeziehung/Recht (BGB/HGB, UWG, AGB, Compliance, CRM) und Präsentationstechnik, alle Abschnitte mit „Inhalte folgen“. Nicht verwertbar.

### 2.2 Übungstools (26)

| Gruppe | Tools | Anzahl Aufgaben sichtbar |
|---|---|---|
| Zahlensysteme (5) | Interaktive Stellenwerttafel (Bits anklicken), Zahlensystem-Trainer (dez/bin/hex/okt gemischt, 8 oder 16 Bit), Binär-Trainer (beide Richtungen), Hex-Trainer, Oktal-Trainer | unbegrenzt (zufällig erzeugt) |
| Schichtenmodelle (2) | OSI-Trainer mit vier Modi (Zuordnung, Reihenfolge, PDU-Quiz, Nachschlagewerk), Ports-Trainer Top 25 (Training und Lernkarten; beide Richtungen Port↔Dienst) | OSI: 39 Karten im Zuordnungsmodus; Ports: 25 |
| IPv4 (4) | Netzbildung (Netz-, Broadcast-, Host-Adressen aus IP + CIDR), Subnetting FLSM, Subnetting VLSM (mehrere Abteilungen), Supernetting (mehrere Netze zu einem zusammenfassen) | zufällig erzeugt |
| IPv6 (5) | Adresse kürzen (RFC 5952), Adresse ausschreiben, Präfix-/Subnetzrechner, Adresstyp erkennen (6 Typen, Radioauswahl), „IPv6-Subnetting (IHK)“ (Abteilungsnetze zuweisen, Subnetzzugehörigkeit) | zufällig erzeugt |
| WiSo/Rechnungswesen (3) | Finanzierung (Tilgungsplan Ratendarlehen), Handelskalkulation (Bezug, Verkauf, Differenz; Lernkarte mit Begriffen), Marktformen-Zuordnung (Anbieter/Nachfrager) | Finanzierung 2, Handelskalkulation 3 feste Übungen; Marktformen unbegrenzt |
| Durchsatz & Datenmengen (2) | Durchsatzrechner (Zeit/Menge/Rate), Dateneinheiten-Trainer (Bit/Byte, SI/IEC) | zufällig erzeugt |
| Mathe (2) | Dreisatz (direkt/indirekt), Prozentrechnung | zufällig erzeugt |
| Projektmanagement (2) | Nutzwertanalyse (4 feste Übungen), Netzplan Vorgangsknoten (5 feste Übungen) | 4 bzw. 5 |
| Programmierung (1) | Pseudocode (2 feste Übungen, Rückgabewerte von Aufrufen bestimmen) | 2 |

### 2.3 Prüfungssimulation

Nur Kategorie **WiSo**: 8 Prüfungen à 30 Fragen, je 60 Minuten. Zwei Modi („Übungsmodus“, „Prüfungssimulation“). Format: Einfachauswahl mit fünf Antworten.

---

## 3. Aufgabenformate und Interaktionsmuster

| Muster | Wo | Beobachtung |
|---|---|---|
| Zufallsgenerierte Rechenaufgabe mit Eingabefeldern | IPv4, IPv6, Zahlensysteme, Durchsatz, Dreisatz, Prozent | Feste Schaltflächen **Neue Aufgabe / Überprüfen / Lösung / Zurücksetzen**; unter jeder Aufgabe eine einklappbare FAQ „Hilfe & Anleitung“ (Rechenweg, häufige Fehler). Teil-Bewertung möglich (im Zahlensystem-Trainer werden nur ausgefüllte Felder gewertet). |
| Ausfülltabelle | Netzbildung, FLSM, VLSM, Handelskalkulation, Tilgungsplan, Nutzwertanalyse | Tabellen mit leeren Zellen; Prozentspalte und Wertspalte getrennt (Kalkulationsschema). |
| Grafischer Netzplan mit Eingabefeldern in den Knoten | Netzplan | Knoten mit FAZ/FEZ/SAZ/SEZ/GP/FP als Eingabe, Aufgabenliste mit Vorgängern, Pfeile werden automatisch gezeichnet, zusätzlich Feld „Kritischer Pfad“. |
| Matrix ausfüllen und anschließend Entscheidung treffen | Nutzwertanalyse | Fehlende Punkte nach Regel „jeder Punktwert nur einmal“ ergänzen, Summe bilden, dann Gerät auswählen. |
| Karteikarten/Quiz-Modi mit Zähler | OSI, Ports, Marktformen | Treffer, Gesamt, Trefferquote, Streak, „Gemeistert x/25“. Hinweis-Schaltfläche, Merkkarte zum Aufklappen. |
| Interaktive Visualisierung | Stellenwerttafel | Bits umschalten, Dezimalwert live. |
| Pseudocode lesen und Rückgabewert angeben | Pseudocode | Verschachtelte Bedingungen, mehrere Aufrufe, Texteingabe. |
| Einzelfrage mit Prüfen und Erklärung | WiSo-Simulation | Fragenraster 1–30 als Navigator, Fortschrittsbalken, pro Frage „Prüfen“ → „Richtig/Falsch“ plus Erklärung zu allen Optionen. |

**UX-Funktionen, die es gibt:** Suchfeld, Inhaltsverzeichnis je Seite, Seitenleiste mit Toolgruppen, Lernkarten-Ausklapper, Tipps, Lösung anzeigen, Streak-/Trefferzähler in Karten-Tools, keine Registrierung, Mobil ohne Überlauf.
**UX-Funktionen, die es nicht gibt:** Lernfortschritt, Speicherung, Konto, Lernpfad/Empfehlung, Wiederholungsplanung, Adaptivität, Fehleranalyse, Abzeichen/Gamification (außer Streak), AP1-Prüfungssimulation, Timer in Tools, Export. Mehrfach-/Freitextbewertung nicht beobachtet.

**Qualitätsmängel (zur Abgrenzung, nicht übernehmen):** erkennbare Umlaut-Ersetzungsfehler im Fließtext (z. B. „steürt“, „Nutzungsdaür“), ein Entwickler-Kommentar (`eslint-disable`) erscheint als Text in einer Tabellenzelle, AP2-Teaser seit Monaten „bald verfügbar“. Hinweis: Das ist ein Argument für unsere automatischen Inhaltstests.

---

## 4. Vergleich mit der FISI Academy

Abdeckung wurde per Suche in `src/content/modules/*.ts` und `src/core/gen/*.ts` geprüft (Stichworte, nicht nur Titel).

### 4.1 Themen: was fi-lab hat, wir (noch) nicht oder nur schwach

| Priorität | Thema (fi-lab) | Abdeckung bei uns | Begründung |
|---|---|---|---|
| **P1** | **Supernetting / Netze zusammenfassen** (mehrere /24 zu einem kürzesten gemeinsamen Präfix) | teilweise: eine Frage zur Routenzusammenfassung in m09 (ca. Zeile 1289); kein Generator, keine Lektion | Kommt in Netzwerkaufgaben als Routen-Zusammenfassung vor; gut generierbar, deterministisch. |
| **P1** | **Tilgungsplan (Ratendarlehen) / Finanzierung** | fehlt (nur `w.kaufleasing`, `w.amortisation`, `w.afa`) | Katalogpunkt „Finanzierungskosten“, Kostenvergleich Kauf/Leasing/Finanzierung. Tabellenaufgabe passt zum offenen Prüfungsformat. |
| **P1** | **Verkaufskalkulation vorwärts und Differenzkalkulation** (Rabatt, Skonto, Gewinn, USt, Handlungskosten) | teilweise: `w.bezugspreis` (Bezug) und `w.angebotspreis` (Angebot inkl. USt); Differenzkalkulation und Rückwärtsrechnung unklar/fehlend | Kalkulationsschemata sind klassische Rechenaufgaben mit eindeutiger Lösung. Prüfen, ob unsere Varianten das volle Schema (Skonto/Rabatt-Reihenfolge) abdecken. |
| P1 | **Netzplan-Tabelle** mit FAZ/FEZ/SAZ/SEZ/GP/FP | teilweise: `w.netzplan` (Projektdauer und Puffer); eine Knoten-Darstellung zum Ausfüllen fehlt | Gleiche Rechnung, aber eigener Aufgabentyp (alle sechs Werte pro Vorgang + kritischer Pfad). |
| P2 | Zahlensysteme: **Oktal** und Mehrsystem-Umwandlung in einer Aufgabe | teilweise: `bin.dec2bin`, `bin.bin2dec`, `bin.hex`; Oktal nur bei Linux-Rechten | Randthema für AP1, aber trivial zu ergänzen. |
| P2 | **Marktformen** (Monopol/Oligopol/Polypol, ein- und zweiseitig) | fehlt | Steht im Katalog („Marktsituationen bewerten“), die Aufgaben sind reine Zuordnung. |
| P2 | **Dreisatz / Prozentrechnung** als eigener Trainer | teilweise: Prozent in Sicherheits-/Rechengeneratoren, kein Dreisatz | Hilfsrechnen für Kalkulation und Kosten. Eher als Übungsblock in Rechenmodulen. |
| P2 | **Teamphasen nach Tuckman** | fehlt | Katalogpunkt im PM-Teil; ein Lernabschnitt + 2–3 Fragen. |
| P2 | **Aufbauorganisation** (Ein-/Mehrlinien, Stablinie, Matrix) und **Vollmachten** (Handlungsvollmacht, Einzel-/Gesamtvollmacht, Prokura) | fehlt | Katalog fk7; typische Auswendig-/Zuordnungsfragen. |
| P2 | **Unternehmensziele aus dem Leitbild** (ökonomisch/ökologisch/sozial) | fehlt | Katalog fk7, kurzer Textabschnitt. |
| P2 | **Vertragsstörungen: Konventionalstrafe** und Vertragsbestandteile | teilweise: `w04` hat Mängelarten/Mängelrechte, Vertragsarten; „Konventionalstrafe“ nicht gefunden | Kleine Ergänzung in w04. |
| P2 | **Vertriebsformen** (direkt/indirekt), Marketing | fehlt | Randthema. |
| P2 | **Wertschöpfung**, **Gütesiegel** (Energy Star, Blauer Engel) | Wertschöpfung fehlt; Gütesiegel teilweise (h04/w02) | Kleine Ergänzung. |
| P2 | **Kundenbefragung / Fragetypen / Bias** | teilweise (w05 erwähnt Fragetypen) | Randthema Bedarfsanalyse. |
| P3 | **WiSo-Simulation (MC)**, ökonomische Grundbegriffe | fehlt (AP2-Thema, ROADMAP nennt es) | Erst nach AP1. |
| P3 | AP2-Inhalte | bei fi-lab selbst leer | Nichts zu lernen. |

Bereits **voll** vergleichbar abgedeckt: Binär/Dezimal/Hex, IPv4-Netzbildung, FLSM/VLSM, IPv6 kürzen/ausschreiben/Adresstyp/Subnetting, Durchsatz und Einheiten, Nutzwertanalyse, Bezugspreis, Pseudocode (bei uns mit Schreibtischtests, Arrays, Funktionen), OSI/PDU, Ports (Tabelle), Lasten-/Pflichtenheft, Scrum/Wasserfall/Gantt (w05), SLA, Vertragsarten, Schutzbedarf, Risikomatrix, 3-2-1, RAID, Verschlüsselung/Hash/PKI, DSGVO/TOM, UML, ER-Modell, Lizenzen, Cloud-Modelle, KI am Arbeitsplatz.

### 4.2 Funktionen: was fi-lab hat, wir nicht

| Priorität | Funktion bei fi-lab | Bei uns | Bewertung |
|---|---|---|---|
| **P1** | **Ports-Trainer als Lernkarten/Quiz** (Port↔Dienst, Streak, „gemeistert x/25“) | Nur Referenztabelle in den Werkzeugen (`Tools.tsx`, Ports & Protokolle); Port-Fragen sind in den Modulen verstreut | Reiner Auswendiglernstoff, den viele Azubis als Erstes üben; sehr billig umzusetzen, zahlt direkt auf AP1 ein. |
| **P1** | **OSI-Trainer mit vier Modi** (Zuordnung Begriff→Schicht, Reihenfolge, PDU-Quiz, Nachschlagen) | Lektionen, Fragen und Kapselungs-Widget in m02, aber kein schneller Drill-Modus | Drill-Modus für Merkstoff fehlt; Vorlage ist eine Art „Blitzrunde“. |
| P2 | **Grafischer Netzplan zum Ausfüllen** | nur Zahlenaufgabe | Passt zu „Belege“ in der Prüfung (Netzplan als Beleg). |
| P2 | **Interaktive Stellenwerttafel** | `BinaryOctet`-Widget (anklickbare Bits) vorhanden | Haben wir in ähnlicher Form; kein Handlungsbedarf. |
| P2 | **Teilbewertung** („nur ausgefüllte Felder prüfen“) | unsere Bewertung ist aufgabenweise; Tabellen mit Teilpunkten vorhanden (Grading) | Prüfen, ob Tabellenaufgaben pro Zeile Feedback geben. |
| P2 | **Suchfeld über alle Inhalte** | Prüfen (nicht gefunden in `Learn.tsx`/`Tools.tsx` als globale Suche) | Bei 45 Modulen und 284 Lektionen nützlich. |
| P2 | **Merkkarten zum Aufklappen** (Begriffe zur Kalkulation, Marktformen-Zuordnung) | keine Lernkarten-Funktion | Karteikarten als Modus der Wiederholung. |
| P3 | Kostenlos ohne Anmeldung | gleiches Prinzip (Lernstand im Browser) | gleichauf |
| P3 | Sitemap/robots.txt, SEO | Als SPA auf GitHub Pages unklar | eher Nebensache (Zielgruppe kommt über Klasse/Link). |

### 4.3 Was wir besser machen

- **Lernlogik:** Fortschritt, Kenntnisstand aus nachgewiesenem Verständnis, Spaced Repetition, Förderschleife, adaptive Schwierigkeit – fi-lab speichert gar nichts.
- **Prüfungsnähe für AP1:** Simulation aus vier Handlungssituationen à 25 Punkte, 90 Minuten, IHK-Notenschlüssel, offene Aufgaben; fi-lab bietet nur WiSo-Multiple-Choice.
- **Tiefe:** 45 Module / 284 Lektionen mit dem Muster Erklären → Visualisieren → Beispiel → Verständnisfrage → Übung; fi-lab hat Lesetext ohne Lernkontrolle.
- **Breite der Generatoren:** 74 Generatoren inkl. Sicherheit, Systeme, Hardware, SQL, VLSM mit Diagramm und Bild-Upload; fi-lab: IP-/Zahlenrechner und Kalkulationen.
- **Auswertung:** Fehleranalyse mit Fehlerkategorien, Lösungsweg, Historie, Dashboard, KI-Prompt/Tutor.
- **Korrektheit:** automatisierte Tests prüfen jede Frage und jeden Generator; fi-lab zeigt sichtbare Text- und Darstellungsfehler.
- **Mehrfach akzeptierte Lösungen** (jeder korrekte VLSM-Plan wird akzeptiert).

### 4.4 Wo fi-lab nützlich als Gegenprobe ist

- Die sieben Fragenkomplexe sind eine **Checkliste gegen den Prüfungskatalog**: Jeder Katalogpunkt, den wir nicht abdecken, steht in 4.1.
- fi-lab ordnet auch **Programmierung, Pseudocode, UML, ER-Modell, Schreibtischtest** in AP1 ein. Bei uns ist SQL/Datenbank als „ap1-teilweise/Vertiefung“ geführt. fi-lab erwähnt im Lernkatalog **kein SQL** und von Datenbanken nur das ER-Modell nach Chen – das stützt unsere Einstufung (SQL AP2).

---

## 5. Umsetzungsvorschläge

Nummerierung nach Nutzen für AP1 (Aufwand in Klammern). Alle Vorschläge enthalten **eigene** Aufgaben und Texte.

1. **Ports-Drill mit Lernkarten (P1, klein).** In `Tools.tsx` (oder als Übungsmodus in m10/m11) die vorhandene `PORTS`-Liste als Karten-Quiz nutzen: Richtung Port→Dienst, Dienst→Port, Transportprotokoll (TCP/UDP) und „sicher/unsicher“ (HTTP↔HTTPS). Streak und „gemeistert“ pro Eintrag in den vorhandenen Skill-Fortschritt schreiben, damit Spaced Repetition greift. Distraktoren aus ähnlichen Ports ziehen (139 vs. 445, 110 vs. 995).
2. **Supernetting-Generator `subnet.supernet` (P1, klein–mittel).** Zufällig 2, 4 oder 8 aufeinanderfolgende, ausgerichtete Netze (gleiche Präfixlänge 20–28) vorgeben, Antwort = kleinstes gemeinsames Netz/CIDR. Schwierigkeit 3: ein nicht zusammenfassbares Netz dazwischen (Antwort „nicht zusammenfassbar“ oder „zwei Routen“). Bewertung in `grading.ts` über Netz + Präfix. Lektion in m09 oder m05, Bezug Routentabelle/Standardroute.
3. **Finanzierung: Tilgungsplan-Generator `w.tilgungsplan` (P1, mittel).** Zwei Varianten: Ratendarlehen (gleiche Tilgung, sinkende Zinsen) und Annuitätendarlehen (nur Rate/Restschuld, keine Formel nötig, wenn nicht Prüfungsstoff). Tabelle Jahr × Restschuld/Zins/Tilgung/Rate; Wertebereiche: 6.000–60.000 €, 3–5 Jahre, 2–8 % p.a. auf ganze Euro/Cent runden. Zielmodul w03; zusätzlich Aufgabe „Gesamtkosten Kredit vs. Leasing vs. Barkauf“ (verknüpft mit `w.kaufleasing`).
4. **Kalkulationsschema vollständig (P1, mittel).** `w.angebotspreis` um Vorwärtskalkulation (Skonto/Rabatt in richtiger Reihenfolge), Rückwärtskalkulation (aus Bruttoverkaufspreis den Einstandspreis ermitteln) und Differenzkalkulation (Spielraum zum Wettbewerbspreis, Gewinnzuschlag in %) erweitern. Tabellenantwort mit Prozent- und Euro-Spalte; Rundungsregel in der Lösung klar nennen.
5. **Netzplan-Ausfüllmodus (P1/P2, mittel).** In Widget-Form 6–8 Vorgänge mit Dauer und Vorgängern, Eingabe von FAZ/FEZ/SAZ/SEZ/GP/FP und kritischem Pfad. Generator aus bestehendem `w.netzplan`: zufälliger DAG (kein Zyklus), kritischer Pfad eindeutig machen. Bewertung zeilenweise, damit Teilpunkte entstehen. Die Rechenlogik gibt es schon; es fehlt die Darstellung.
6. **Blitzrunde-Modus für Merkstoff (P1/P2, mittel).** Einen generischen „Drill“ einführen: 10–20 Karten, Zuordnungs- oder Reihenfolgefragen, Zeitdruck optional, Ergebnis als Skill-Update. Erste Themen: OSI (Protokoll→Schicht, Gerät→Schicht, Schicht→PDU), Schutzziele, Vertragsarten, Support-Level, Mängelarten. Nutzt vorhandene Fragentypen `match`/`order`; nur die Oberfläche ist neu.
7. **Katalog-Lücken schließen (P2, klein je Thema).** Je ein kurzer Lernabschnitt mit 3–5 Fragen: Tuckman-Phasen und Marktformen (w05/w01), Aufbauorganisation + Vollmachten + Leitbild (w05 oder w04), Konventionalstrafe/Vertragsbestandteile (w04), Wertschöpfung und Gütesiegel (w02/h04). Vorher gegen den offiziellen Prüfungskatalog prüfen, ob der Punkt in der aktuellen 2. Auflage noch steht – fi-lab folgt offenbar der älteren Gliederung.
8. **Zahlensysteme: Oktal und Mehrsystem-Aufgabe (P2, klein).** `bin.hex` zu `bin.convert` erweitern (Ziel: dez/bin/hex/okt), mit 8- und 16-Bit-Auswahl. Prüfungsnähe gering; nur wenn Aufwand minimal.
9. **Globale Suche (P2, klein).** Suchfeld im Kopf der Lern-Seite über Modul-, Lektions- und Kompetenztitel (Daten liegen schon in `MODULES`/`SKILL_MAP`). Hilft bei 284 Lektionen und beim Nachschlagen kurz vor Klassenarbeiten.
10. **Mobile Nutzung verbessern (P2, mittel).** fi-lab bleibt auf 375 px ohne Querscroll. Wir sind laut ROADMAP „nur eingeschränkt“ mobil. Zumindest die Drill-Modi (Ports, OSI-Blitzrunde) smartphonefreundlich bauen – Karten-Interaktionen werden meist unterwegs genutzt.
11. **Sichtbare Qualitätsabgrenzung (P3).** Im README kurz vermerken, dass jeder Generator und jede Frage automatisch getestet wird (Alleinstellungsmerkmal gegenüber ähnlichen Gratis-Seiten).

### Nicht übernehmen

- Die WiSo-MC-Simulationen (ihre Fragen sind „originalgetreu“ und damit riskant; WiSo ist zudem AP2).
- Das Prinzip „nur Lesetext ohne Lernkontrolle“ im Lernkatalog – wir haben die bessere Lektionsstruktur.
- Gesperrte AP2-Teaser ohne Inhalt.
- Ausführliche Erklärtexte, Tabellen und Beispielzahlen von fi-lab: urheberrechtlich geschützt; Inhalte bei uns aus eigenen Quellen/Büchern aufbauen.
