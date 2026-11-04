# Kleindokumente: Begleitmaterial, Vertragsmuster, Schülerabgaben

Stand: 04.11.2026. Je Datei: **Inhalt** · **Lernfeld** · **Relevanz** (`ap1`, `ap1-teilweise`, `ap2`, `unnötig`) · **Verwertbarkeit** für die App. Alles in eigenen Worten; Mustertexte (Verträge, AGB, AV-Vereinbarungen, EVB-IT) sind **nicht** ins Repo zu kopieren, sondern höchstens als Strukturvorlage für selbst formulierte Szenarien zu nutzen.

Die Dateien der Westermann-Begleitdownloads stammen aus `material/Bücher Fachinformatiker Ausbildung/220144_Download_blaues Symbol_2022/Download_final 2022/` (Ordner Lernfeld 6, 7, 8; Autor der Vorlagen laut Dateieigenschaften: J. Gratzke; Modellfirma JIKU IT-Solutions). Der Download gehört zur Ausgabe für **kaufmännische IT-Berufe** (Lernfelder 6–9); er ist für FISI nur teilweise passend.

Nicht ausgewertet (persönliche Daten, gemäß Auftrag): `Notenübersicht*.xlsx`, `Protokoll 22.01.2026.docx`. Zusätzlich nicht im Auftrag und deshalb ungeprüft: `Strüder.docx`, `Screenshot 2026-11-04 145337.png`.

Abgleich mit der App (grep in `src/content/modules/*.ts`, `src/core/gen/*.ts`): w04 deckt Kauf-/Werk-/Dienstvertrag, Mängelrechte, SLA/OLA/UC ab; s02 den AV-Vertrag; b05/w05 Abnahmeprotokoll und PDCA; b06 Ticket/Service Desk. **Es fehlen:** AGB-Recht (§§ 305 ff. BGB), der Begriff „Governance“, Präferenzmatrix/Paarvergleich, Buchführung.

---

## A. EVB-IT (Vertragsrecht öffentlicher Auftraggeber)

### `evb_it_service_vertrag_pdf_download.pdf` (33 S., Version 1.0 vom 24.03.2014)
- **Inhalt:** Bundesmuster für Verträge über IT-Serviceleistungen: Vertragsgegenstand und -bestandteile, Leistungsübersicht, Beschreibung von IT-System und Systemumgebung, Beginn/Dauer/Kündigung, Vergütung (Service, Ersatzgegenstände, Fälligkeit, Preisanpassung), Servicezeiten, Ticketsystem und weitere Regelungen; Begriffe mit Sternchen sind in den zugehörigen AGB definiert.
- **Lernfeld:** LF6 (Serviceanfragen/Verträge), LF8 (SLA).
- **Relevanz:** `ap1-teilweise` nur als Beispiel, wie ein Servicevertrag aufgebaut ist; EVB-IT steht nicht im AP1-Katalog. Für `w04` kein Pflichtinhalt.
- **Verwertbarkeit:** Als eigene Merkliste „Was gehört in einen Servicevertrag?“ (Leistung, Servicezeit, Reaktions- und Wiederherstellungszeit, Ticketprozess, Preis, Laufzeit/Kündigung) in w04 `w.sla`, ohne Wortlaut. Aktualität der Fassung (2014) nicht geprüft.

### `evb_it_systemlieferungsvertrag_pdf_download.pdf` (26 S., Version 1.1 vom 23.11.2012)
- **Inhalt:** Vertrag über die Lieferung eines IT-Systems (Hard- und Software gemeinsam): Hardwareverkauf, Standardsoftware gegen Einmalvergütung, Schulung, Dokumentation, Systemservice, Termin-/Leistungsplan, Zahlungsplan, Ansprechpartner, Mitwirkung des Auftraggebers, Systemlieferung/Abnahme, Mängelhaftung, Haftung, Vertragsstrafen bei Verzug.
- **Lernfeld:** LF6/LF8 (Lieferung, Abnahme, Gewährleistung).
- **Relevanz:** `ap1-teilweise` als Gliederungsbeispiel für Leistungsumfang und Abnahme; sonst Spezialwissen der öffentlichen Beschaffung (`unnötig` für die Prüfung).
- **Verwertbarkeit:** Checkliste „Bestandteile eines Lieferungsvertrags“ für w04/w05; die Verbindung zu Kauf- und Werkvertrag (Mischvertrag) kann als Begriff „gemischter Vertrag“ aufgenommen werden.

### `evb_it_systemlieferungsvertrag_nutzungshinweise_pdf_download.pdf` (96 S.)
- **Inhalt:** Kommentar zum Systemlieferungsvertrag: Anwendungsbereich, Aufbau, Geltungshierarchie der Unterlagen, Abgrenzung zu EVB-IT System und Basis-EVB-IT (gemischttypologischer Vertrag, Haftungskonzept), Ausfüllhilfen, AGB-Erläuterungen, Nutzungsrechtsmatrix, Teleservicevereinbarung.
- **Lernfeld:** LF6/LF8.
- **Relevanz:** `unnötig` für AP1; für WiSo/AP2 höchstens Hintergrund.
- **Verwertbarkeit:** keine eigene Lektion; Quelle für Fachfragen („Welche Rangfolge gilt bei Widersprüchen zwischen Vertragsteilen?“) nur bei Bedarf.

**Gesamturteil EVB-IT:** keine neuen Lektionen. Ein kurzer Kasten in w04 („Öffentliche Auftraggeber nutzen standardisierte Vertragsmuster, z. B. EVB-IT“) genügt; Priorität P3.

---

## B. JIKU-Muster im Ordner Lernfeld 6

### `JIKU_AGB_Schulungsmuster1.docx` und `…1_plus.docx`
- **Inhalt:** Kurz-AGB eines Hardwarehändlers (8 000 Zeichen): Allgemeines, Preise ohne Installation, Schriftform von Nebenabreden, Liefertermine/Verzug/Gefahrenübergang, Zahlung, Eigentumsvorbehalt, Gewährleistung, Haftung (HGB-Rügepflichten §§ 377, 378). Die Variante „plus“ ist bis auf Markierungen für Services textgleich.
- **Lernfeld:** LF6.
- **Relevanz:** `ap1-teilweise` (Kaufvertragsrecht, Eigentumsvorbehalt, Mängelrechte).
- **Verwertbarkeit:** Szenarien für w04 („Welche Klausel regelt …?“, Rügepflicht im Handelskauf). Es fehlt in der App eine Lektion **AGB** (Einbeziehung, Inhaltskontrolle) → P2 für w04, mit selbst geschriebenen Beispielklauseln.

### `JIKU_AGB_Schulungsmuster2.docx` und `…2plus.docx`
- **Inhalt:** Lange AGB eines Systemhauses (72 000 Zeichen) mit Besonderen Vertragsbedingungen je Geschäftsform: Hardware/Software, Individualsoftware, Dienstleistungen, Rechenzentrum/Cloud; Zahlung (inkl. Verzugszinssatz, Vorauszahlung, Widerruf bei Verbrauchern), Haftungsbeschränkung, Verjährung, Gerichtsstand.
- **Lernfeld:** LF6/LF8.
- **Relevanz:** `ap1-teilweise` (Verträge, Widerruf, Haftungsgrenzen); `ap2` (WiSo) für Verbraucherrecht.
- **Verwertbarkeit:** Als Fundus für Beurteilungsaufgaben („Ist diese Klausel gegenüber Verbrauchern wirksam?“) nur mit eigenen Texten; nicht abschreiben.

### `JIKU_Wartungsvertrag_Muster1.docx`, `…Muster2.docx`, `…Muster3_Medizintechnik.docx`
- **Inhalt:** Muster 1: System-Wartungsvertrag (Vertragsgegenstand, Leistungsumfang mit Inspektion/Instandsetzung/Hotline innerhalb 4 Stunden, Wartungsbereitschaft Mo–Fr 8:00–16:30 Uhr, Mitwirkungspflichten, Vergütung als Pauschale plus Stundensatz, Haftung, Wartungsbuch). Muster 2: Wartungs- und Servicevertrag mit 24-Stunden-Reaktionszeit, Leistungspaketen, Datenschutz, Laufzeit mit automatischer Verlängerung um ein Jahr und Kündigungsfrist von drei Monaten. Muster 3: Servicevertrag für ein Praxisumfeld mit Medizintechnik (Ausschlüsse für Medizinprodukte, Pakete mit Wiederherstellung in den Auslieferungszustand, Datensicherungspflicht des Kunden, Haftungsregeln).
- **Lernfeld:** LF6, LF8.
- **Relevanz:** `ap1-teilweise` (Wartungs-/Servicevertrag: Dienst- oder Werkvertrag? Leistungsumfang, Mitwirkungspflichten, SLA-Bestandteile).
- **Verwertbarkeit:** Gut als Quelle für Aufgaben „Vertrag lesen und auswerten“ (Reaktionszeit, Laufzeit, Kündigungsfrist, Vergütung berechnen: z. B. Pauschale + Zusatzstunden × Satz). Generator `w.sla`/`w.dienstleistung` kann Pauschale + Kontingent + Zusatzstunden nutzen (Idee, noch nicht umgesetzt).

### `JIKU_Reaktionszeiten_Diverse_Regelungen.docx`
- **Inhalt:** Sammlung zu Serviceverträgen: monatlich wiederkehrende Wartungsaufgaben (Hardwareprüfung, Logs, Virenschutz/Firewall, Platten/RAID/BBU, USV, Updates), Wartungs- und Hotlinezeiten, Pauschalpreise mit Zeitkontingent (z. B. 5 h/3 Arbeitsplätze), **Bestandteile eines SLA** (Zweck, Glossar, Leistungsbeschreibung, Supportlevel, Laufzeit, Verantwortlichkeiten, Verfügbarkeit, Schweregrade, Antwort-, Reaktions- und Wiederherstellungszeiten, Wartungsfenster, Haftung, Sanktionen, salvatorische Klausel) sowie Tabelle Schweregrad ↔ Reaktionszeit ↔ Rückruf ↔ Eskalation.
- **Lernfeld:** LF6 (Service), LF8 (SLA).
- **Relevanz:** `ap1` (SLA und Service-Level-Kennzahlen sind Prüfungsstoff der Serviceanfragen).
- **Verwertbarkeit:** **Hoch.** Stützt b06/w04: Aufgabentyp „Schweregrad zuordnen und Reaktionsfrist ablesen“, „Eskalationsstufe nach Zeitablauf bestimmen“, Begriffsabgrenzung Reaktions- vs. Wiederherstellungszeit. Bestehende App enthält SLA/Verfügbarkeit (w04 `w.sla`, b06); Schweregrad-/Eskalationstabelle ergänzen (P2).

### `JIKU_Preisliste_Wartungspakete_Muster.docx`
- **Inhalt:** Vier Servicevertragsstufen (Standard, Advanced, Professional, Professional „Sorglos“) mit Grundbetrag pro Monat, enthaltenen Arbeitsstunden und Anfahrten, Zusatzstunde, Anfahrt je Doppelkilometer, Support ohne Vertrag (Vor-Ort-/Remote-Stundensatz), Mindestlaufzeit ein Jahr, Kündigung zum Quartalsende, Rechnung monatlich im Voraus, Preise inklusive USt.
- **Lernfeld:** LF6/LF2 (Kalkulation).
- **Relevanz:** `ap1` (Angebotsvergleich/Kalkulation Dienstleistung).
- **Verwertbarkeit:** **Hoch.** Passende Rechenaufgabe: Gesamtkosten pro Jahr für Vertrag A vs. Einzelabrechnung bei x Einsätzen und y Stunden; Break-even-Stunden. Generator-Idee `w.servicevertrag` (Grundbetrag × 12 + Zusatzstunden × Satz + Anfahrten × Satz) mit Vergleich zu „ohne Vertrag“. Preise selbst variieren.

### `JIKU_Services_Preisstaffel.docx`
- **Inhalt:** Monatliche Nettopreise von Managed-Services je Gerät/User/GB (Desktop Basis/Plus/Premium, Server, Firewall-Management, E-Mail-Archivierung, WLAN, Backup nach Volumen, Testwiederherstellung, File Cloud), Zuschlag für Einsätze außerhalb der Servicezeiten, Hinweispflicht bei kritischen Abweichungen, Veröffentlichungsrecht.
- **Lernfeld:** LF6, LF8.
- **Relevanz:** `ap1` (Kalkulation von Managed Services).
- **Verwertbarkeit:** Aufgabe „Monatspreis eines Kunden mit n Desktops, m Servern, k Backup-GB berechnen“. **Datenfehler:** Der Preis für „JIKU-Safe Server Plus“ steht als 15000 € (vermutlich 150,00 €) – beim Übernehmen nicht kopieren.

### `JIKU_Managed_Server_Services_Flyer.docx` und `JIKU_Netzwerk-IT-Services.docx`
- **Inhalt:** Werbetexte: Leistungsstufen von „Monitoring Only“ (Ereignisprotokoll-, System- und Dienstüberwachung) bis Rundum-Betrieb; Netzwerk-IT-Service mit Administration, präventiver Wartung, Patch-/Updatemanagement, Rechte- und Benutzerverwaltung, Outsourcing.
- **Lernfeld:** LF6.
- **Relevanz:** `ap1-teilweise` (Leistungen eines Systemhauses beschreiben).
- **Verwertbarkeit:** Szenariohintergrund für b06/w01 (Welches Servicepaket passt zum Kunden?); Texte nicht kopieren.

### `JIKU_Helpdesk_Marketing.docx`
- **Inhalt:** Entwurf einer Kundenmitteilung zur Einführung eines Ticketsystems mit der Arbeitsanweisung, den Text zu überarbeiten (Zielgruppe: Geschäftsleitung/IT-Leitung). Themen: Incident Management, Kategorisierung/Priorisierung, Ticket-ID, Nachverfolgung, Erreichbarkeit, Reaktions- und Eskalationszeit.
- **Lernfeld:** LF6 (Kommunikation, Service).
- **Relevanz:** `ap1-teilweise` (Kundenkommunikation).
- **Verwertbarkeit:** Aufgabentyp `free`: „Formulieren Sie die Kundenmitteilung adressatengerecht um“ (Modellantwort + Stichwörter) → w01/b06. Eigenes Szenario schreiben.

### `JIKU_Ticketfomular_Schulung.docx`
- **Inhalt:** Feldliste eines Service-Tickets: Titel, Nummer, Bearbeiter, Melder, Kommunikationsweg, Symptome, Klassifizierung (Incident, Service Request, Change Request), Kategorie, Freigabe, Kostenübernahme, Status, Fälligkeit, Case Owner, Support-Team, Anlagen, Priorität, Zeiten, Configuration Items, Known Errors, Servicekatalog.
- **Lernfeld:** LF6.
- **Relevanz:** `ap1` (Ticket und Priorisierung).
- **Verwertbarkeit:** In b06 vorhanden (Ticket-Lebenszyklus, Priorisierung). Ergänzbar: Aufgabe „Ticket aus Kundenmeldung ausfüllen“ (Tabelle mit Klassifizierung, Kategorie, Priorität).

### `JIKU_Servicebericht_Formular_Online.docx`
- **Inhalt:** Leeres Formular „Servicebericht Online“ mit Kopf (Firma, Kunden-Nr., Techniker); kaum Text.
- **Lernfeld:** LF6.
- **Relevanz:** `ap1-teilweise` (Dokumentation eines Einsatzes).
- **Verwertbarkeit:** Nur als Idee für eine Tabellenaufgabe „Servicebericht ausfüllen“; Inhalt selbst liefert nichts.

### `JIKU_Formular_Rechnung.doc` (Word-97-Format, nicht automatisch ausgelesen)
- **Inhalt:** Rechnungsvorlage eines Einkaufsverbands (Titel in den Dateieigenschaften; ca. 125 Wörter), 1 Seite.
- **Lernfeld:** LF6/LF2.
- **Relevanz:** `ap1-teilweise` (Rechnungsangaben).
- **Verwertbarkeit:** Die App behandelt Pflichtangaben und E-Rechnung bereits (w05 `w.rechnung`). Keine Übernahme.

### `JIKU_VereinbarungzurAuftragsverarbeitung.docx`
- **Inhalt:** Muster einer AV-Vereinbarung (DSGVO Art. 28): Geltungsbereich, Gegenstand/Dauer, Art und Zweck der Verarbeitung, Datenarten, betroffene Personen, Pflichten des Auftragnehmers, Sicherheit der Verarbeitung, Rechte/Pflichten des Auftraggebers, Mitteilungs- und Weisungspflichten, Beendigung, Haftung, Vertragsstrafe; Wahlvarianten sind im Text markiert.
- **Lernfeld:** LF6/LF8 (Datenschutz im Service).
- **Relevanz:** `ap1` (AV-Vertrag, Auftragsverarbeitung).
- **Verwertbarkeit:** s02 deckt AV-Vertrag ab. Ergänzbar: Aufgabe „Pflichtbestandteile eines AV-Vertrags nennen / Klausel zuordnen“ mit eigenen Formulierungen.

### `JIKU_VereinbarungzurHelpdesk-Auftragsverarbeitung.docx`
- **Inhalt:** AV-Vereinbarung speziell für Helpdesk-Dienstleistungen in 12 Paragraphen: Anwendungsbereich, Verantwortlichkeit, **TOM** (Zutritts-, Zugangs-/Zugriffs-, Trennungs-, Weitergabekontrolle, Pseudonymisierung), Pflichten beider Seiten, Weisungen, Unterstützung, Kontrollrechte, Unterauftragsverarbeiter, Löschung/Rückgabe, Haftung.
- **Lernfeld:** LF6/LF8.
- **Relevanz:** `ap1` (TOM nach Art. 32, Auftragsverarbeitung bei Fernwartung).
- **Verwertbarkeit:** Passend zu s02 (TOM-Zuordnung). Szenario: Helpdesk mit Fernzugriff auf Kundendaten → AV-Vertrag notwendig? Welche Kontrolle ist betroffen?

---

## C. Ordner Lernfeld 7 und 8

### `Lernfeld 7/Kapitel 2.5.x … 2.7.x`: Java-Beispiele (19 Dateien)
- **Inhalt:** `BeispielEinUndAusgabe`, `BeispielExceptionHandling`, `BeispielZufallszahlen`, `Notenauswertung` (Arrays/Mittelwert), Vererbung (`Luftfahrzeug`, `Flugzeug`, `Heißluftballon` in zwei Versionen), `Serververwaltung` (`Server`, `DatenbankServer`, `ProxyServer`), `Erstes_Fenster` (GUI), JDBC mit MySQL (`MySQLConnection`, `Beispiel_Abfrage`, `Program`).
- **Lernfeld:** LF7 (Programmierung, Java).
- **Relevanz:** `unnötig` (Schule unterrichtet Python; AP1 arbeitet mit Pseudocode/UML).
- **Verwertbarkeit:** Allenfalls Vorlage für Szenarien zu Vererbung (Serverklassen) in p04 – dort als UML/Pseudocode, nicht in Java.

### `Lernfeld 7/Kapitel 2.6.1 … 2.7.7`: Python-Beispiele (12 Dateien)
- **Inhalt:** `Musikinstrumente` (Vererbung in zwei Versionen: ohne und mit Unterklassen `Gitarre`/`Saxophon`), `Gebäude`/`Lagerhalle`/`Wohnhaus` (Kapselung, Getter/Setter), `tankkosten.py` und `fenster_mit_button.py` (tkinter-GUI, Eingabe mit `try/except`), `mongodb.py` (pymongo `insert_one`, NoSQL).
- **Lernfeld:** LF7.
- **Relevanz:** `ap1-teilweise` für Objektorientierung (p04) und Fehlerbehandlung (p02/p05); GUI und MongoDB `unnötig`.
- **Verwertbarkeit:** **Fehlersuche-Aufgabe:** In `gebäude.py` greift `get_adresse` auf `self._adresse` zu, obwohl das Attribut `__adresse` heißt, und `set_baujahr` setzt `self._baujahr` statt `__baujahr` → Aufgabentyp „Finden Sie den Fehler im Code“ (selbst nachgebautes Beispiel, nicht kopieren). Vererbungspaare gut für p04-Vergleich „Version 1 vs. 2“.

### `Lernfeld 7/Kapitel 2.8.2/Abnahmeprotokoll.docx`
- **Inhalt:** Vorlage Abnahmeprotokoll: Teilnehmer, Software, Vertragsnummer, Ergebnis der Annahmeprüfung getrennt nach funktionalen, nichtfunktionalen und technischen Anforderungen, offene Punkte (zu erfüllen / Verzicht), Schlussbeurteilung, Freigabe durch Auftraggeber und Auftragnehmer.
- **Lernfeld:** LF7/LF8 (Abnahme).
- **Relevanz:** `ap1` (Leistungsübergabe, Abnahme).
- **Verwertbarkeit:** In b05/w05 bereits abgedeckt (22 Treffer „Abnahmeprotokoll“). Evtl. Tabellenaufgabe „Abnahmeprotokoll ausfüllen“; kein Zusatzbedarf.

### `Lernfeld 8/Analysemethoden.xlsx` (Blätter: Übersicht, Benchmarking, Präferenzmatrix, Risikomatrix, Beispiel)
- **Inhalt:** Vorlagen für „Vorlagen für Lernfeld 8, Kaufmännische IT-Berufe“: **Benchmarking** (Kennzahlen JIKU Vorjahr/Jahr/Branche mit prozentualer Veränderung und Abweichung), **Präferenzmatrix** (paarweiser Vergleich; Gewichtung = Anzahl Nennungen ÷ Gesamtnennungen; Rangfolge), **Risikomatrix** (5×5 aus Eintrittshäufigkeit „häufig … unwahrscheinlich“ × Schadenshöhe „unbedeutend … existenzbedrohend“), Beispielblatt mit Risiken als Koordinate E4S3 usw.
- **Lernfeld:** LF8 (Daten, Analysemethoden), teils LF11b.
- **Relevanz:** Präferenzmatrix und Risikomatrix `ap1-teilweise` (Gewichtung von Kriterien, Risikobewertung); Benchmarking `unnötig`.
- **Verwertbarkeit:** **Präferenzmatrix fehlt in der App** (0 Treffer): Aufgabe „Gewichtung aus paarweisem Vergleich berechnen“ → Generator-Idee `w.praeferenz` (n Kriterien, zufälliger Vergleichsausgang, Gewicht = Nennungen/Σ, Rang). Risikomatrix in s01 vorhanden (`sich.risiko`). Formeln im Blatt nachrechnen, bevor sie übernommen werden.

### `Lernfeld 8/Kontenplan_JIKU.xlsx` (Blätter: Übersicht, Buchbeispiel, Kontenplan kurz, Kontenplan lang)
- **Inhalt:** Kontenplan des Modellunternehmens (Bestands-/Erfolgskonten mit Zu-/Abnahme S/H und Abschluss über SBK/GuV; lange Variante mit 134 Zeilen).
- **Lernfeld:** LF8 (kaufmännisch).
- **Relevanz:** `unnötig` für FISI AP1 (Buchführung ist nicht Prüfungsgegenstand).
- **Verwertbarkeit:** keine.

---

## D. Schulunterlagen und Schülerabgaben (Unterrichtsthemen)

### `material/Was ist Kommunikation_Präsentation_BSIT25.pdf` (57 Folien, 20 MB)
- **Inhalt:** Unterrichtsfolien: Definition Kommunikation, Sender-Empfänger-Modell (Shannon/Weaver), Missverständnisse im IT-Alltag (Beispielsätze wie „Geht nicht.“), Rollenübung Kunde/Entwickler/Admin/Projektleitung, Fachbegriffe ohne Fachsprache erklären, goldene Kommunikationsregeln, Watzlawick (fünf Axiome), Eisbergmodell, verbale/nonverbale Kommunikation (Signalliste), Schulz von Thun.
- **Lernfeld:** LF1/LF2 und Deutsch/Kommunikation; Schulprojekt.
- **Relevanz:** `ap1-teilweise` (Kundenkommunikation, Kommunikationsmodelle im Katalog-Umfeld); nonverbale Signale und Eisberg `unnötig`.
- **Verwertbarkeit:** w01/b06 enthalten bereits Sender-Empfänger, 4-Ohren-Modell, Watzlawick (11 Treffer). Möglich: Aufgabe „Fachbegriff für Laien erklären“ und „Kundenmeldung klar formulieren“ als `free` mit Modellantwort.

### `material/Aufgabenstellung_IT-Projekt_Kommunikation.pdf` (1 S.)
- **Inhalt:** Gruppenprojekt „Kommunikation, die funktioniert – IT aus der Praxis“ in drei Phasen: Kommunikationsproblem wählen und analysieren, kreatives Produkt (Video, Podcast, Comic, Ticket-Doku, Chatverlauf: schlecht vs. gut), Mini-Leitfaden mit 3–5 Regeln; Tools Miro, OneNote, Canva.
- **Lernfeld:** Kommunikation/Projekt; Schulprojekt.
- **Relevanz:** `unnötig` als Lernstoff; zeigt aber, welche Alltagsszenarien (unklare Tickets, „Software geht nicht“) die Klasse beschäftigen.
- **Verwertbarkeit:** Szenarien für `free`-Aufgaben in b06 („Ticket verbessern“).

### `material/Fehst_…_Sozialkunde_BSIT_Erwartungshorizont_Alternative Leistungsfeststellung.pdf` (2 S.)
- **Inhalt:** Bewertungsraster für einen Gallery Walk zu Gesetzesauszügen (BBiG, ArbSchG): Kriterien inhaltliche Richtigkeit 20 %, Fallbezug 20 %, Handlungsorientierung 10 %, Visualisierung 10 %, mündliche Präsentation 10 % (Einzel), Zusammenarbeit u. a.; Notenbeschreibungen.
- **Lernfeld:** Sozialkunde/WiSo.
- **Relevanz:** `ap2` (WiSo-Themen Ausbildungs- und Arbeitsschutzrecht), kein Fachstoff selbst.
- **Verwertbarkeit:** Zeigt Unterrichtsthemen für das spätere WiSo-Modul: Berufsbildungsgesetz, Arbeitsschutzgesetz, betriebliche Problemfälle. Keine Aufgaben daraus ableitbar ohne zusätzliche Quelle.

### `material/Abgabe 4 .docx` (Schülerabgabe, 3 400 Zeichen)
- **Inhalt:** Antworten zu LF8: Governance und Compliance in IT-Services (Risiken: Cyberangriffe, Datenverlust, Cloud, DSGVO), AV-Vertrag (Zweck, Bestandteile), Zuordnung Vertragsarten SLA / Underpinning Contract / OLA / AV-Vertrag, Tabelle Risiko – Folge – Maßnahme.
- **Lernfeld:** LF8.
- **Relevanz:** `ap1-teilweise`; zeigt, dass der Unterricht SLA/OLA/UC und AV-Vertrag prüft. Die Zuordnung zu Aussage (d) (Eigenleistung des Kunden) ist fraglich – bei Übernahme nicht als Musterlösung verwenden.
- **Verwertbarkeit:** w04 enthält SLA/OLA/UC bereits. **Fehlt:** Begriff „Governance“ (Regeln und Verantwortlichkeiten) → kurzer Kasten in b05 oder w04 (P2).

### `material/PDCA_IT_Dokumentation_Confluence.docx` (Schülerabgabe, 2 200 Zeichen)
- **Inhalt:** PDCA-Zyklus zur Verbesserung der IT-Dokumentation: Plan (Ist-Analyse: drei Werkzeuge parallel, wenige Beiträge, keine Regeln), Do (Hauptplattform festlegen, Vorlage, Erinnerungen), Check (nach 4–6 Wochen Anzahl Beiträge, Feedback), Act (Standard festschreiben oder nachjustieren).
- **Lernfeld:** LF8/QM.
- **Relevanz:** `ap1` (PDCA im Katalog: Qualitätsplanung/-lenkung).
- **Verwertbarkeit:** b05 deckt PDCA ab. Als Muster für eine `free`-Aufgabe „Ordnen Sie Maßnahmen den PDCA-Phasen zu“ geeignet (eigenes Szenario).

### `material/LF8 Aufgabenabgabe.docx` (Schülerabgabe, sehr kurz)
- **Inhalt:** Richtig/Falsch-Antworten A–O zu einer Aufgabe des Schulbuchs (Seite 175, Aufgabe 1); ohne Aufgabentext nicht interpretierbar.
- **Relevanz:** `unnötig`.
- **Verwertbarkeit:** keine (Buchbezug im Arbeitsbuch LF6–9 nachsehen, falls nötig).

---

## E. Zusammenfassung der verwertbaren Ideen

| Priorität | Idee | Ziel | Quelle |
|---|---|---|---|
| P2 | AGB-Lektion (Einbeziehung, Inhaltskontrolle, Verbraucher/Unternehmer) | w04 | AGB-Muster 1/2 |
| P2 | Generator Servicevertrag-Jahreskosten (Grundbetrag, Zusatzstunden, Anfahrten, Vergleich ohne Vertrag) | `wirtschaft.ts`, w03/w04 | Preisliste Wartungspakete |
| P2 | Generator Managed-Services-Monatspreis (Geräte × Preis + GB-Staffel) | `wirtschaft.ts` | Preisstaffel (Preisfehler beachten) |
| P2 | Schweregrad-/Eskalationstabelle zu SLA | b06/w04 | Reaktionszeiten-Dokument |
| P2 | Präferenzmatrix (paarweiser Vergleich → Gewichtung) | w02, neuer Generator | Analysemethoden.xlsx |
| P2 | Begriff Governance (kurzer Kasten) | b05/w04 | Abgabe 4 |
| P3 | Fehlersuche im OOP-Code (Kapselung) | p04 | `gebäude.py` |
| P3 | EVB-IT-Hinweis „Vertragsmuster der öffentlichen Hand“ | w04 | EVB-IT |
| – | Nicht übernehmen: Java-Beispiele, Kontenplan, Benchmarking, GUI/MongoDB, Kommunikation nonverbal | – | – |
