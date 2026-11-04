# Auswertung: ausbildung-in-der-it.de (AP1-Bereich)

Stand der Auswertung: 04.11.2026. Alle Inhalte sind in eigenen Worten zusammengefasst; es wurden keine Texte oder Aufgaben übernommen. Quelle ist immer die genannte URL (Domain `https://ausbildung-in-der-it.de`, abgekürzt „AIDI“).

**Methode und Verlässlichkeit:** Die Seiten wurden per WebFetch abgerufen (Zusammenfassung durch ein kleines Modell, kein Rohtext). Angaben sind deshalb Sekundärquellen; Prüfungsformalien immer gegen Einladung der IHK und IHK-AkA gegenprüfen. AIDI ist ein kommerzieller Anbieter einer Lernplattform (App-Subdomain, bezahlt); die Seiten enthalten Eigenwerbung. Autor der AP1-Seite: Noel Lang, Stand der Seite 10.06.2026. Die Lektionstexte der Lernbibliothek wirken teils KI-gestützt erstellt (Fallbeispiele erfunden, „Ordnungsmittel“-Belegmatrix); die Seite selbst gibt an, nur Aufgabenformen früherer Prüfungen als Orientierung zu nutzen.

Abgeglichen mit: `docs/AP1-RELEVANZ.md`, `docs/material/PV-AP1.md` (Abschnitt 3.10 Statistik, 4 Lückenliste), `docs/material/FI-LAB-ANALYSE.md`, `src/content/index.ts`, `src/content/modules/*.ts`, `src/core/gen/*.ts`. Hinweis: Die Lückenliste in `PV-AP1.md` ist teilweise überholt, weil inzwischen die Module e01 (Englisch), w06 (Unternehmen/Markt), d04 (Zeichencodes/Dateiformate), p06 (Softwareprozess) sowie Generatoren wie `w.handelsspanne`, `w.finanzierung`, `routing.supernet`, `calc.sollrate`, `hw.bildspeicher`, `w.abc`, `w.gantt` existieren.

---

## 1. Seitenstruktur und Angebot

### 1.1 Besuchte URLs

| URL | Inhalt |
|---|---|
| `/pruefung/ap1` | Hauptseite AP Teil 1: Aufbau, Format, Inhalte, Schwerpunkte, Tipps, Termine, FAQ, Quellen |
| `/pruefung` | Überblick gestreckte Prüfung (20 % AP1, 50 % Projekt), Tools, Linkverteiler |
| `/pruefung/ap2` | AP Teil 2: Bereiche, Gewichte, Bestehensregeln, MEP, Termine |
| `/pruefung/ap2/fachinformatiker-systemintegration` | FISI-Seite: Prüfungsbereiche, Themen, Aufgabentypen, Tipps |
| `/pruefung/termine` | Schriftliche Termine Herbst 2026 bis Sommer 2027, Anmeldezeiträume, Planungsraster |
| `/pruefung/alte-ihk-pruefungen` | Bezugswege und Übungsmethodik für alte Prüfungen |
| `/ap1-lernguide` | Kostenloser AP1-Leitfaden mit 14-Tage-Plan |
| `/digitale-lernkarten-abschlusspruefung-teil-1` | Produktseite AP1-Lernkarten (Plattform) |
| `/karteikarten-teil-1-download` | Karteikarten als PDF/Anki/Quizlet/CSV auf Anfrage per Lizenz |
| `/pruefungsvorbereitung-fachinformatiker` | Gesamtplan AP1/AP2/Projekt |
| `/pruefungsvorbereitung-fachinformatiker-systemintegration` | FISI-Vorbereitung: Themen, Aufgabentypen, 5-Einheiten-Plan |
| `/subnetting-rechner` | Tool: IPv4, IPv6, VLSM, Supernetting, Übungsmodus |
| `/notenrechner` | Tool: Gesamtnote nach IHK-Gewichtung, Bestehensregeln, MEP |
| `/ihk-notenschluessel` | Punkte-Noten-Tabelle |
| `/lexikon` und `/lexikon/ap-teil-1` | Lexikon (ca. 330 Einträge, alphabetisch), Eintrag AP Teil 1 |
| `/lernen` und `/lernen/systemintegration` | Freie Lernbibliothek (72 Lektionen, ohne Anmeldung), FISI-Lernfelder und Prüfungsbereiche |
| `/lernen/systemintegration/pruefung/einrichten-eines-it-gestuetzten-arbeitsplatzes` | 26 AP1-Lektionen (Titel/Dauer/Kurzinhalt) |
| `/lernen/systemintegration/pruefung/analyse-und-entwicklung-von-netzwerken` und `.../konzeption-und-administration-von-it-systemen` | AP2-FISI-Lektionslisten (nur zur Einordnung) |
| `/lernen/anwendungsentwicklung/lektion/` `ip-subnetting`, `osi-modell`, `schutzbedarf`, `hardware-komponenten` | vier AP1-Lektionen im Volltext (didaktisch ausgewertet) |
| `/lernen/systemintegration/lektion/` `datenmengen-und-uebertragungszeiten`, `energie-und-betriebskosten`, `vertraege-und-service-level`, `netzwerk-clients`, `wirtschaftlichkeit`, `netzwerkfehler-diagnostizieren` | sechs weitere AP1-Lektionen |
| `/lernplattform/lernpfade` und `/lernplattform/lernpfade/ap-teil-1-fuer-alle-it-berufe` | 4 Lernpfade; AP1-Pfad mit 38 Modulen / 188 Lektionen |
| `/lernplattform/dojos` | Übungsräume (nur Pseudocode und SQL, laut Seite vor allem FIAE-AP2) |

Nicht besucht, aber verlinkt: `/uml` und `/uml/*` (UML-Referenz), `/lexikon/*`-Einzelartikel, `/fachgespraech-checkliste`, `/ap2-lernguide`, Projektantrag/-arbeit/-dokumentation (AP2-Projekt, für AP1 irrelevant), Blog (Linux-Befehle, Lerntipps, FIAE oder FISI), Berufs-/Gehalts-/Umschulungsseiten, App-Subdomain `app.ausbildung-in-der-it.de` (bezahlt).

### 1.2 Was angeboten wird

| Angebot | Frei? | Wert für uns |
|---|---|---|
| Prüfungs-Info-Seiten AP1/AP2/Termine | frei | Formalien-Gegenprobe (Abschnitt 2) |
| Subnetting-Rechner mit Übungsmodus (3 Stufen, IPv4/IPv6/VLSM/Supernetting, Lösungsweg nach Antwort) | frei | Bestätigt: wir sind bei Generatoren breiter; Idee „Antwort erst, dann Lösungsweg“ haben wir |
| Notenrechner mit Bestehensregeln und MEP-Simulation | frei | Fehlt bei uns als Gesamtnote-Rechner (Abschnitt 5) |
| Lexikon (330 Begriffe) | frei | Kein Mehrwert, kein AP1-Tag außer einem Eintrag |
| Lernbibliothek 72 Lektionen (kein Konto, Fortschritt im Browser) | frei | Didaktikmuster (Abschnitt 5) |
| Lernpfad AP1 (38 Module/188 Lektionen), Lernkarten, Dojos | bezahlt | Nur die Modulübersicht ist sichtbar; als Themenraster nutzbar |
| Karteikarten PDF/Anki/Quizlet/CSV | auf Anfrage per Lizenz | Nicht nutzen (Lizenz); Format-Idee Anki-Export |

Keine Seite nennt **Themenhäufigkeiten oder Punktgewichte je Thema**. Die Seiten sagen mehrfach ausdrücklich, dass sie keine Häufigkeiten angeben (Lernguide, FISI-Seite, Alte Prüfungen). Wer „Gewicht“ sucht, findet nur qualitative „häufige Themen“ (Abschnitt 3).

---

## 2. Fakten zur AP1 (mit Quelle) und Abweichungen

| Merkmal | Angabe AIDI | Quelle | Abgleich mit `docs/AP1-RELEVANZ.md` |
|---|---|---|---|
| Prüfungsbereich | „Einrichten eines IT-gestützten Arbeitsplatzes“ | `/pruefung/ap1` | gleich |
| Dauer, Form | 90 Minuten, schriftlich | `/pruefung/ap1`, `/lexikon/ap-teil-1` | gleich |
| Punkte | **100 Punkte** insgesamt; Teilaufgaben werden einzeln bepunktet, Punkteverteilung steht auf dem Prüfungsbogen; Teilaufgaben können an eine Ausgangssituation anknüpfen | `/pruefung/ap1` | **neu** (RELEVANZ nennt keine Punktsumme; `m16` und `Exam.tsx` nutzen schon 100) |
| Gewichtung | 20 % der Abschlussbewertung; keine eigene Bestehenshürde (AP1 zählt nur im Gesamtergebnis) | `/pruefung/ap1`, `/notenrechner` | gleich |
| Aufgabenformate | Kurzantworten, Kurzaufsätze, Ergänzungsaufgaben, Konstruktionsaufgaben (Diagramme, Berechnungen, Code); Ebenen Reproduktion, Verständnis, Anwendung, Transfer/Problemlösung. Kein Multiple Choice genannt | `/pruefung/ap1` | passt zu „nur offene Aufgaben“; **neu:** „Code“ und Diagramme ausdrücklich genannt |
| Operatoren | nennen, erläutern, begründen, berechnen, bewerten; Signalwörter wie „begründen/erläutern“ nicht übersehen | `/pruefung/alte-ihk-pruefungen`, `/pruefung/ap1` | **neu** (App hat Operatoren in `m16-l01`) |
| Hilfsmittel | typisch erlaubt: Schreibmaterial, Farbstifte, Spitzer, Radierer, Lineal, Geodreieck, **nicht programmierbarer, netzunabhängiger Taschenrechner**. Häufig verboten: Smartphone, Smartwatch, programmierbarer Rechner, eigene Formelsammlung, Fachliteratur, **Tabellenbücher**. Maßgeblich: Einladung | `/pruefung/ap1` | RELEVANZ führte Tabellenbücher als „nicht verifiziert“: **jetzt von Sekundärquelle gestützt** (weiterhin Einladung prüfen). Neu: Lineal/Geodreieck/Farbstifte (Zeichenaufgaben!) |
| Inhaltsbasis | erste 18 Ausbildungsmonate, Berufsbildpositionen 1 bis 7 der FIAusbV, Berufsschulstoff | `/pruefung/ap1`, `/ap1-lernguide` | gleich |
| Katalog | Prüfungskatalog der ZPA Nord-West, 2025 geändert; Verlag U-Form | `/pruefung/ap1` | gleich; **neu:** Hinweis auf ZPA Nord-West als Katalog-Herausgeber |
| Sonderfall Baden-Württemberg | folgt dem Katalog nicht zwingend, Termin etwa im 4. Halbjahr, kann abweichen | `/pruefung/ap1` | **neu**, für uns (Niedersachsen, Hannover) ohne Relevanz |
| Termine | **AP1 Herbst 2026: Mi 30.09.2026** (vorbei); **AP1 Frühjahr 2027: Mi 24.02.2027**; AP2 Winter 24./25.11.2026; AP2 Sommer 27./28.04.2027 (AkA nennt Zeitfenster; München und Hamburg für IT jeweils den zweiten Tag) | `/pruefung/termine`, Primärquelle laut Seite ihk-aka.de (Prüfungs-News 08/25) | **neu/präzisiert:** Docs sagen „Ende Februar 2027“, genauer Tag 24.02.2027. Vor Übernahme in `docs/` und `settings.examDate` gegen AkA prüfen |
| Anmeldung AP1 Frühjahr | meist Oktober bis Mitte November des Vorjahres, Einladung etwa 2 Wochen vor dem Termin | `/pruefung/termine` | **neu**; aktuell (04.11.2026) wäre das Anmeldefenster für die Klasse gerade offen/endend: Hinweis in der App sinnvoll, aber Betrieb meldet an |
| Notenschlüssel | 100–92: 1; 91–81: 2; 80–67: 3; 66–50: 4; 49–30: 5; 29–0: 6; Dezimalnoten z. B. 50 = 4,4 | `/ihk-notenschluessel` | entspricht `Exam.tsx` (92/81/67/50/30) |
| Gesamtnote | 0,20 · AP1 + 0,10 · K&A + 0,10 · Netzwerke (FISI) + 0,10 · WiSo + 0,50 · Projekt. Bestehen: Gesamt ≥ 50; Teil 2 ≥ 50; mind. 3 von 4 Teil-2-Bereichen ≥ 50; kein Teil-2-Bereich unter 30 | `/notenrechner`, `/pruefung/ap2` | neu (nicht in RELEVANZ). Die Seite zitiert dafür „§ 16 Abs. 2“, an anderer Stelle „§ 24“ (FISI): Paragrafenangabe unsicher, Inhalt mit FIAusbV gegenprüfen |
| AP1-Fehlschlag | kein automatisches Wiederholen, Anrechnung klärt die IHK; schwache Note nur teilweise ausgleichbar | `/pruefung/ap2` (FAQ), `/lexikon/ap-teil-1` | neu, informativ |
| Lernbeginn | spätestens 3 Monate vorher regelmäßig wiederholen; Simulationen: 3–4 Monate vorher Standortbestimmung, 4–6 Wochen vorher zweite Simulation unter Zeitdruck | `/pruefung/ap1`, `/pruefung/alte-ihk-pruefungen` | neu (Methodik) |

**Widerspruch zu `AP1-RELEVANZ.md`:** keiner. Die Behauptung „kein Multiple Choice“ wird nicht widerlegt (AIDI nennt nur offene Formate). Falsch wäre „95 % Multiple Choice“ weiterhin.

**Widersprüche innerhalb von AIDI:** Die Seite zu „Konzeption und Administration“ nennt 10 % und gleichzeitig „80 % der Abschlussbewertung“; die Notenrechner-Seite nennt für die MEP einmal „schlechter als 4,4“, einmal „ausreichend“. Die Dojos-Seite nennt Zahlen im Statistikblock unklar. Fazit: AIDI als Orientierung, nicht als Beleg.

---

## 3. Themen mit Gewicht und Abdeckung

### 3.1 Themenschwerpunkte laut `/pruefung/ap1`

Gewicht: **nicht angegeben**. AIDI listet nur „wichtige/häufige Themen“. Abdeckung = Stand der App (Module nach `src/content/index.ts`).

| Thema (AIDI) | Konkreter Hinweis der Seite | Abdeckung | Modul-ID |
|---|---|---|---|
| Wirtschaftlichkeit | Kostenkalkulation, Nutzwertanalyse, Make-or-Buy | **teilweise** | w02, w03, w06. Make-or-Buy nur qualitativ (b03, p06); rechnerischer Vergleich Eigenerstellung gegen Fremdbezug fehlt (Lücke G2) |
| Netzwerk: IPv6 | als Schwerpunkt genannt | voll | m07 (`ipv6.compress/expand/type/subnets`) |
| Netzwerk: OSI-Modell | 7 Schichten | voll | m02 |
| Netzwerk: Diagnose | ping, traceroute, ARP, IP-Konfiguration | voll bis teilweise | m13, m16; ipconfig-Beleg mit Fehlersuche als Generator fehlt (G1) |
| Netzwerk: privat/öffentlich | Unterschied erläutern | voll | m03 (`ipv4.private`), m11 (NAT) |
| Netzwerk: Subnetting-Grundlagen | Lernguide und Lernkarten: Netz- gegen Broadcastadresse, Hostanzahl | voll (Technik), teilweise (Einkleidung) | m03, m05; Mehrschritt-Szenario fehlt (G4) |
| Projektmanagement: Gantt/Netzplan | Vor- und Nachteile beurteilen | voll (Rechnen), teilweise (Beurteilen) | w05 (`w.gantt`, `w.netzplan`) |
| Projektmanagement: Lasten-/Pflichtenheft | | voll | w01, w05, b05 |
| Projektmanagement: klassisch/agil | Wasserfall, Scrum | voll | p06, w05 |
| Datenschutz/DSGVO | | voll | s02 |
| IT-Sicherheit | Firewall, Backups, 2FA | voll | s01 bis s05, m14 |
| Speichermedien | HDD, SSD, NVMe | voll | h02 |
| Betriebssysteme/Software | Installationsarten, Lizenzen, Updates | voll | b01, b03, s05 |
| Datenbankmodellierung ohne SQL | als AP1-Thema genannt | voll | d01, d02 (d03 SQL = Vertiefung; stützt unsere Einstufung SQL = AP2) |

### 3.2 Moduldaten des AP1-Lernpfads (38 Module, nur Titel sichtbar)

Der Pfad ist ein kommerzielles Themenraster entlang der Berufsbildpositionen, **kein** amtlicher Katalog. Er dient als Gegenprobe auf Vollständigkeit.

| AIDI-Modul (Lektionen) | Abdeckung | Modul-ID / Hinweis |
|---|---|---|
| 1 Projektmanagement-Grundlagen (4), 2 Planung/Strukturierung (5) | voll | w05 |
| 3 Projektorganisation/Teammanagement (3): Organisationsformen, Rollen, Teamentwicklung | **fehlt** | Tuckman, Organisationsformen: 0 Treffer |
| 4 Machbarkeitsanalyse, Stakeholder, Risiken (4) | teilweise | w05, p06 |
| 5 Betriebswirtschaft und Controlling, Vor-/Nachkalkulation (3) | teilweise | w03/w05; Vorkalkulation 0 Treffer, Nachkalkulation vorhanden |
| 6 Operative Durchführung: Support, Störungen (4) | voll | b06 |
| 7 Qualitätsmanagement (5), 8 Qualitätslenkung/PDCA (2) | voll | b05 |
| 9 Veränderungsmanagement (5) | fehlt | nur Randtreffer; Relevanz für AP1 unklar (P3) |
| 10 Marktanalyse/Zielgruppen/Benchmarking (5), 12 Marketing und Vertrieb (5) | teilweise | w06 (Marktformen, ABC), w01 (Zielgruppe); Marketing-Mix, Vertriebswege fehlen |
| 11 Kundenkommunikation inkl. englische Dokumente (3) | voll | w01, e01 |
| 13 bis 15 IT-Systeme, Hardware, Software/OS (15) | voll | h01 bis h03, b01, b03, b04 |
| 16 Netzwerke und Kommunikation (10) | voll | m01 bis m04, m10 bis m12 |
| 17 Grundlagen IT-Systeme, Lasten-/Pflichtenheft (6) | voll | w01, h01 |
| 18 Installation/Konfiguration: BIOS/UEFI, Partitionen, Netzanbindung, Remote Desktop, AD (6) | voll | b01, b02 |
| 19 Kommandozeile (4) | voll | b01, m13, m16 (iproute2) |
| 20 IPv6 (6): Adressaufbau, Subnetting, Sicherheit, Übergang, Adressvergabe | teilweise | m07; Übergangstechniken (Tunnel, DS-Lite, NAT64) nur am Rand |
| 21 Energieeffizienz (4) | voll | h04 |
| 22 Barrierefreiheit (4) | voll | h05, w01, b05 |
| 23 Wirtschaftlichkeitsanalyse (3), 24 Angebotsvergleich (3) | voll | w02, w03 |
| 25 Rechtliche Aspekte/Lizenzen inkl. Creative Commons (3) | teilweise | b03, w04; Creative Commons 0 Treffer |
| 26 Vertragsgrundlagen/Unternehmensziele (4) | voll | w04, w06 |
| 27 Leistungsbewertung/Kostenerfassung, Soll-Ist-Abweichung (3) | teilweise | w05 (Nachkalkulation), b06; Kostenabweichung als Rechenaufgabe fehlt |
| 28 Programmierung (11), 29 OOP (3), 30 UML (7) | voll | p01 bis p04 |
| 31 Relationale Datenbanken (7) | voll | d01 bis d03 |
| 32 KI-Grundlagen (4) | voll | p05 |
| 33 bis 38 Sicherheit, Schutzbedarf, Kryptografie, Netzwerksicherheit (ca. 37 Lektionen) | voll | s01 bis s05, m14 |

Folgerung: **Kein großer Themenblock des AIDI-AP1-Rasters fehlt komplett.** Echte Lücken sind klein: Teammanagement/Tuckman, Vorkalkulation/Abweichungsanalyse, Marketing/Vertrieb, Make-or-Buy-Rechnung, Creative Commons, IPv6-Übergangstechniken.

### 3.3 Termine im Verhältnis zur App

Für die Klasse (AP1 am 24.02.2027) bleiben ab 04.11.2026 noch 112 Tage bis zur Prüfung. AIDI empfiehlt Simulation 1 als Standortbestimmung 3 bis 4 Monate vorher (also jetzt) und Simulation 2 vier bis sechs Wochen vorher (ab Mitte Januar 2027).

---

## 4. Aufgabentypen und Beispielmuster

### 4.1 Typen laut AIDI (eigene Worte)

| Typ | Muster | In der App |
|---|---|---|
| Begriff erläutern | Unterschied zweier Begriffe darlegen (privat gegen öffentlich) | `free`, vorhanden |
| Vorteil nennen und begründen | Technik gegenüber Alternative (SSD gegenüber HDD) | `free`, vorhanden |
| Verfahren beurteilen | Vor-/Nachteile zweier Planungsmethoden (Gantt gegenüber Netzplan) | `free`: in w05 ergänzen (P2) |
| Berechnung | Gesamtkosten einer Beschaffungsvariante inkl. Fremdbezug | w03 teilweise (G2) |
| Beleg auswerten | Konsolenausgabe, Netzplan, Tabelle, Angebot | m16, m13 teilweise (G1) |
| Diagramm zeichnen | Netzplan, UML, Ablauf (Konstruktionsaufgabe) | `order`/`match` plus `free` mit Prüfliste (vorhanden) |
| Code | Pseudocode, einfache Algorithmen | p01 bis p03 |
| Begründungsaufgabe | Entscheidung technisch und wirtschaftlich getrennt begründen | `free`, vorhanden |

Typische Fehler laut AIDI, die als Fehlerkategorien dienen können: Aufgabe nicht vollständig gelesen, Operator übersehen, Zeit falsch verteilt, zu knapp geantwortet, Rechenweg nicht notiert, Lösung ohne Begründung, Allgemeinplatz („ist sicherer“) ohne Szenariobezug, Datenschutz nur als Stichwort, nicht erklärbare Abkürzungen.

### 4.2 Muster aus den AIDI-Lektionen (Szenario, nicht Prüfung)

Alle Beispiele sind von AIDI erfunden; wir übernehmen nur das **Muster**:

1. **Subnetz aus Gerätebedarf:** Gerätezahl inkl. Gateway, Drucker und Reserve zählen, Hostbits bestimmen, Präfix, Blockgrenzen, dann Konfiguration eines Clients prüfen (liegen Client und Gateway im selben Block?). Fehlerbilder: Netz- oder Broadcastadresse an Gerät vergeben; zu kleines Netz; „gleiche ersten drei Oktette“ als Beweis für gleiches Netz.
2. **Stufenweise Fehlereingrenzung:** Link-LED belegt nur Schicht 1; dann IP-Konfiguration, Gateway, Namensauflösung, Dienst. Ein erfolgreicher Ping beweist keine TCP-Verbindung; ein fehlgeschlagener Ping beweist keinen Ausfall (ICMP kann gefiltert sein). Fehlerbilder: Gateway außerhalb des Client-Subnetzes, 169.254.x.x, doppelt vergebene statische Adresse, IP erreichbar aber Name nicht (DNS).
3. **Befund statt Vermutung:** Soll-Ist-Vergleich gegen dokumentierte Sollwerte, Hypothese, gezielter Test, danach Gegenprüfung des ursprünglichen Symptoms, Ticketeintrag (Soll, Ist, Test, Ergebnis).
4. **Schutzbedarf-Dokumentation:** immer das Schema Objekt, betroffenes Schutzziel, konkreter Schaden, Kategorie. Auf Systeme und Verbindungen übertragen (die Seite verweist auf eine Prüfung Herbst 2021 als Vorlage der Aufgabenform).
5. **Hardware nach Auftrag:** Anforderung zuerst, dann Komponente; Kompatibilität als Prüfkette (Sockel allein oder ein M.2-Slot allein beweisen nichts); offene Prüfpunkte gehören in die Begründung.
6. **Freigabe über Testprotokoll:** Sollkriterien ableiten, Positiv- und Negativtests, Abweichungen dokumentieren, Freigabe begründen.
7. **SLA prüfen:** vereinbarte Zusage in Messzeit und Zielwert übersetzen, Ausschlüsse (Wartung außerhalb Servicezeit) richtig behandeln, Reaktions- gegen Wiederherstellungszeit trennen.

### 4.3 Rechenaufgaben mit Formel (Generator-Ideen)

Formeln sind Fakten und frei verwendbar; Zahlen und Fälle müssen wir selbst erfinden.

| Rechnung | Formel / Rechenweg | App-Stand | Generator-Idee |
|---|---|---|---|
| Subnetz aus Bedarf | Hosts nutzbar = 2^h − 2; Präfix = 32 − h; Blockgröße = 256 − Maskenoktett; /31 und /32 Sonderfälle | `subnet.hosts2prefix`, `subnet.blocksize`, `ipv4.samesubnet` | `subnet.szenario`: Bedarfsliste (Clients, Gateway, Drucker, Reserve) → Tabelle Präfix, Netz, Broadcast, Hostbereich, dann „Client X korrekt konfiguriert?“ (G4) |
| Übertragungszeit | Byte × 8 = Bit; t = Bit / Rate; dezimal gegen binär trennen; Overhead als Aufschlag oder gemessene Nutzrate; Frage „reicht das Zeitfenster?“ | `calc.transfertime`, `calc.transfertime.bin`, `calc.sollrate` | vorhanden; Variante „Upload gegen Download verwechselt“ als Fehlerkategorie prüfen |
| Energie/Kosten | P = U · I; E = P · t (Wh durch 1000 = kWh); Kosten = kWh · Preis; η = P_aus / P_ein; Amortisation = Mehrinvestition / jährliche Ersparnis | `hw.leistung`, `hw.stromkosten`, `hw.wirkungsgrad`, `w.amortisation` | vorhanden |
| Netzteil dimensionieren | Planungsleistung = Maximallast · Reservefaktor (z. B. 1,25); Nennleistung ≠ Verbrauch | nicht als Generator gefunden | `hw.netzteil` (P2) |
| Verfügbarkeit/SLA | Messzeit = Werktage · Servicestunden · 60; erlaubte Ausfallzeit = Messzeit · (1 − Zielwert); Verfügbarkeit = (Messzeit − anrechenbarer Ausfall) / Messzeit | `sys.sla`, `w.sla` (Servicezeit Mo–Fr) | vorhanden; Ausschluss „Wartung außerhalb Servicezeit“ als Fehlerkategorie ergänzen |
| Gesamtkosten (TCO) | einmalig + Jahre · laufend, inkl. interner Arbeitszeit; Zeiträume gleich wählen | `w.tco`-Lektion, Generatoren `w.kaufleasing`, `w.preispunkte` | Variante mit interner Arbeitszeit prüfen |
| Nutzwert | Σ (Gewicht · Punkte), Gewichte = 100 %; Muss-Kriterium nicht durch Punkte ausgleichbar; Preis nicht doppelt gewichten | `w.nutzwert` | Muss-Kriterium-Variante ergänzen (P2) |
| Make-or-Buy | Kosten Eigenerstellung = fix + Menge · variabel; Fremdbezug = Menge · Preis; kritische Menge = Differenz fix / Differenz variabel; Entscheidung unterhalb/oberhalb | nur Begriff (b03, p06); `w.amortisation` hat „kritische Menge“ | `w.makeorbuy` (G2) |
| Angebotskalkulation | Bezugspreis, Zuschlagssätze, Verkaufspreis | `w.bezugspreis`, `w.kalkulation`, `w.handelsspanne`, `w.angebotspreis` | vorhanden |
| Kostenabweichung | Soll-Kosten gegen Ist-Kosten, absolute und prozentuale Abweichung, Ursachen | nicht gefunden | `w.kostenabweichung` (P2) |

---

## 5. Funktionen und Didaktik-Ideen

Übernehmen wir als **Prinzip**, nicht als Text:

1. **Fehlerliste mit Ursache nach jeder Simulation** (AIDI nennt fünf Ursachen: falsch gelesen, Operator übersehen, Rechenweg fehlt, Beleg nicht ausgewertet, Zeit). Unser `errors.ts` kennt inhaltliche Fehlerkategorien; verhaltensbezogene Ursachen und eine Selbsteinschätzung pro Teilaufgabe fehlen. Aufwand klein.
2. **Befund-gegen-Vermutung-Aufgabentypen** (Mehrfachauswahl: Welche Aussagen sind Befunde? Sortieren des Diagnosezyklus; „aussagekräftigsten Test wählen“; „abweichende Zeile in der Ausgabe markieren“). Passt zu `single`, `order`, `multi`; Ausgabe-Beleg per Generator.
3. **Transferaufgabe mit Musterlösung und Selbstcheck-Liste** am Ende jeder Lektion: bei uns `free` mit `modelAnswer` und `keywords`; Selbstcheck-Liste („Hast du X genannt?“) als sichtbare Checkliste ergänzbar.
4. **Fehlerbilder-Kasten je Lektion** (typische Denkfehler vorab benennen) – haben wir über `misconceptions`.
5. **Durchgängiges Szenario je Lektion** mit einem erfundenen Betrieb – haben wir (Elektro Krämer GmbH).
6. **Gesamtnote-Rechner** FISI (0,20 / 0,10 / 0,10 / 0,10 / 0,50) mit Bestehensregeln und „Was brauche ich in AP2?“ nach AP1-Ergebnis. Der Notenschlüssel steckt in `Exam.tsx`; Rechner würde Motivation und Einordnung der 20 % verbessern.
7. **Phasenplan zum Stichtag** (14 Tage plus Simulationsplan 3–4 Monate / 8–10 Wochen / 4–6 Wochen / 1–2 Wochen) auf dem vorhandenen Countdown (`Dashboard.tsx`, `settings.examDate`).
8. **Prüfungstag-Checkliste** (Einladung, Ausweis, nicht programmierbarer Rechner, Lineal/Geodreieck/Farbstifte, Ersatzstift): als Karte im Dashboard oder in `m16`.
9. **Lernkarten-Modus** (täglich 15 bis 25 Karten, falsche Antworten in ganzen Sätzen neu formulieren, Anki/CSV als Exportformat): deckt sich mit FI-LAB-Vorschlag „Blitzrunde“; Ergänzung: Export der eigenen Fragen als CSV für Anki.
10. **Berufsbildposition (1 bis 7) als Tag je Lektion/Modul** mit Abdeckungsmatrix: AIDI führt je Lektion eine Belegmatrix Lernziel gegen Ordnungsmittel. Für uns ein Qualitätsnachweis gegenüber dem Rahmenplan; Aufwand mittel, Nutzen eher intern.
11. **Rechnerseite mit Antwort-zuerst-Prinzip** (erst eigene Eingabe, dann Lösungsweg) haben wir bei Generatoren bereits.

Nicht übernehmen: Gamification (AIDI hat keine), KI-Auswertung als Verkaufsargument (wir haben Tutor-Prompt), Bezahlmodell, Texte der Lektionen.

---

## 6. Priorisierte Lückenliste (nur FISI/AP1, Stand Repo 04.11.2026)

Bereits in `PV-AP1.md` (Abschnitt 4) und `FI-LAB-ANALYSE.md` geführte Lücken (z. B. IDS/IPS, Schutzklassen/RCD, Pharming, Standard-Datenschutzmodell, KRITIS, Marktformen, Prokura, Meldebestand) bleiben dort; hier nur **neue oder durch AIDI neu bestätigte** Punkte. Keine der Lücken ist ein ganzer Themenblock.

### P1

| Nr | Lücke | Ziel-Modul | Konkreter Vorschlag |
|---|---|---|---|
| G1 | Diagnose anhand eines Konsolen-Belegs mit Soll-Ist-Vergleich fehlt als Generator; Befund-gegen-Vermutung nur punktuell (`m13` hat 5 Freitextfragen, `m16` Praxisblock `ipv4.samesubnet`) | m13, m16 | Generator `diag.ipconfigfehler`: erzeugt eine gekürzte `ipconfig /all`-Ausgabe plus Sollwerte (IP, Maske, Gateway, DNS, DHCP an/aus) mit genau **einem** eingestreuten Fehler (Gateway außerhalb des Subnetzes, 169.254.x.x, falscher DNS, Maske zu groß, doppelte Adresse). Antworten: fehlerhafte Zeile, Ursache, nächster Test. Dazu `order`-Aufgabe „Diagnosezyklus“ und `multi` „Welche Aussagen sind Befunde, welche Vermutungen?“ (ping-OK beweist nur ICMP-Erreichbarkeit; ping-Fehler beweist keinen Ausfall) |
| G2 | **Make-or-Buy rechnerisch** (Eigenerstellung gegen Fremdbezug, kritische Menge) fehlt; AIDI nennt Make-or-Buy und „Gesamtkosten für den Fremdbezug“ ausdrücklich als AP1-Muster | w03 (Lektion), b03 (Verweis) | Lektion „Selber machen oder zukaufen“ + Generator `w.makeorbuy`: Eigenerstellung (Fixkosten + variable Stückkosten) gegen Fremdbezug (Stückpreis, optional Mengenstaffel); Tabelle mit Kosten bei Menge x, kritische Menge, Empfehlung; Stufe 3 mit zusätzlichem Nutzwert-Kriterium (Zeit, Know-how). Fehlerkategorien: Fixkosten vergessen, Mengen unterschiedlich, kritische Menge falsch interpretiert |
| G3 | Verhaltensbezogene Fehlerkategorien und Prüfungsnachbereitung (Operator übersehen, Rechenweg fehlt, Beleg nicht ausgewertet, Zeit, zu knapp) | `Exam.tsx`, `errors.ts`, m16-l01 | Nach jeder Simulation je Teilaufgabe Selbstdiagnose per Einzelauswahl (fachlich unklar / Operator übersehen / Beleg nicht ausgewertet / Zeit / Rechenfehler / sonstiges) und Auswertung im Dashboard; Tipps pro Kategorie als kurze Karte |
| G4 | Subnetting im **Szenario** (Bedarf zählen inkl. Gateway/Drucker/Reserve → Präfix → Netz/Broadcast/Hostbereich → Konfigurationsprüfung) fehlt als zusammenhängende Aufgabe; AIDI ordnet diese Aufgabe der AP1 zu (Lektion `ip-subnetting`, Lernguide, Lernkarten, Subnetting-Rechner-Seite „Teil 1“) | m05, m16 | Generator `subnet.szenario` (Tabelle, Teilbewertung je Zeile); Fehlerbilder aus dem Katalog `errors.ts` wiederverwenden (`reservierte-vergessen`, `netz-broadcast-verwechselt`). Hinweis: AIDI-Beleg für AP1-Relevanz von Subnetting ist **ein Indiz**, kein Katalogbeleg; `PV-AP1.md` (Buch ohne Subnetting) widerspricht, Einstufung m05 „ap1-teilweise“ bleibt, Gewicht moderat |

### P2

| Nr | Lücke | Ziel-Modul | Konkreter Vorschlag |
|---|---|---|---|
| G5 | Gesamtnote-/Bestehensrechner FISI (20/10/10/10/50; mind. 3 von 4 Teil-2-Bereichen ≥ 50, keiner < 30) | `Exam.tsx` oder `Tools.tsx` | Rechner mit Eingabe AP1 und Schätzwerten; Hinweis „AP1 hat keine eigene Hürde“; Hinweis auf IHK-Bescheid. Paragrafenangabe vorher prüfen (AIDI uneinheitlich) |
| G6 | Phasenplan und Prüfungstag-Checkliste auf den Stichtag 24.02.2027 (nach Gegenprüfung bei AkA) | `Dashboard.tsx`, m16 | Countdown um Phasen ergänzen (Standortbestimmung, Lücken schließen, 2. Simulation, nur Wiederholung); Checkliste mit Rechner, Lineal/Geodreieck, Farbstifte (Zeichenaufgaben) |
| G7 | Positiv-/Negativtests und Freigabeentscheidung im Testprotokoll | b05 (`qm.testing`), p06 (`qa.testprotocol`) | Tabellenaufgabe „Testprotokoll ergänzen“ (Sollkriterium, Test, Erwartung, Ergebnis, Bewertung); Freitext „Darf der Arbeitsplatz freigegeben werden?“; Begriffe Positiv-/Negativtest (derzeit 0 Treffer) |
| G8 | Teammanagement: Organisationsformen, Rollen, Tuckman-Phasen | w05 | Kurzabschnitt + 4 Fragen (`match` Phase → Merkmal); Tuckman wird auch von FI-LAB gelistet (zweite Bestätigung) |
| G9 | Vorkalkulation/Soll-Ist-Kostenabweichung (Controlling) | w03/w05 | Generator `w.kostenabweichung` (Soll gegen Ist, absolut und prozentual, Ursachenfreitext); Vorkalkulation vs. Nachkalkulation als `match` |
| G10 | Netzteil-Dimensionierung mit Reserve | h01/h04 | Generator `hw.netzteil`: Maximallast aus Komponentenliste · 1,25 → nächstgrößere Nennleistung; Fehlerbild „Nennleistung = Verbrauch“ |
| G11 | Vor-/Nachteile Gantt gegenüber Netzplan beurteilen (Freitext) | w05 | 2 `free`-Fragen mit `modelAnswer` und Keywords (Übersicht/Termin gegenüber Abhängigkeiten/kritischer Pfad) |
| G12 | Nutzwertanalyse mit Muss-Kriterium (K.-o.-Kriterium) und „Preis nicht doppelt gewichten“ | w02/w06 | Variante in `w.nutzwert`: ein Angebot hat höchste Punktzahl, erfüllt aber ein Muss-Kriterium nicht |
| G13 | Marketing-Mix, Vertriebswege, Produktlebenszyklus, Benchmarking/Wettbewerbsanalyse (Berufsbildposition 2) | w01 oder w06 | Nur 1 kurze Lektion + 6 Fragen, **vorher gegen den ZPA-Katalog prüfen** (AIDI-Raster, kein Katalog) |
| G14 | Lernkarten-Modus mit CSV/Anki-Export der eigenen Fragen | Learn/Practice | Siehe FI-LAB-ANALYSE Vorschlag 6 (Blitzrunde); Export-Format ergänzen |

### P3

| Nr | Lücke | Ziel-Modul | Hinweis |
|---|---|---|---|
| G15 | Creative-Commons-Lizenzen | b03/w04 | 3 Fragen (BY, SA, NC, ND); Randthema |
| G16 | IPv6-Übergangstechniken (Dual-Stack, Tunnel, NAT64/DS-Lite) | m07 | In AIDI-Pfad vorhanden, in Katalog unverifiziert; DS-Lite siehe PV-AP1 P3-3 |
| G17 | Veränderungsmanagement (Widerstände, Schritte) | w05 | Unklare AP1-Relevanz; nur nach Katalogprüfung |
| G18 | Berufsbildposition-Matrix (BBP 1 bis 7) je Lektion | `content/types`, Doku | Interner Qualitätsnachweis; kein Prüfungsgewinn |

### Nicht tun

- AIDI-Lektionstexte, Beispielszenarien (Ersatzteilhändler, Pflegedienst, Fahrradkurier u. a.) und Aufgabenformulierungen **nicht übernehmen** (Urheberrecht); eigene Betriebe und Zahlen erfinden.
- Keine AP2-Inhalte aus AIDI für AP1 verwenden (Routing, VLAN-Konzepte, DMZ-Firewall-Regelwerke, RAID, PowerShell-Automatisierung): diese FISI-AP2-Themen decken wir mit m06, m08, m09, m14, s03 und späteren AP2-Modulen ab.
- Karteikarten und Lernpfad-Inhalte nicht beziehen/importieren (Lizenz).
- Keine Häufigkeitsaussagen in der App auf AIDI stützen: AIDI liefert dazu keine Zahlen.

---

## 7. Offene Punkte

- Termine (24.02.2027) stammen von AIDI-Seite „Termine“ mit Verweis auf IHK-AkA Prüfungs-News 08/25; AkA direkt nicht abgerufen. Vor Eintrag in `settings.examDate` oder Docs verifizieren.
- Hilfsmittel: nur Sekundärangabe („typisch“); Einladung der eigenen IHK ist verbindlich.
- Paragrafenangaben für Bestehensregeln (FIAusbV § 16/§ 24) bei AIDI widersprüchlich; Inhalt entspricht der bekannten Systematik, Wortlaut gegen gesetze-im-internet.de prüfen.
- Der Umfang des amtlichen AP1-Katalogs (2. Auflage) bleibt unverändert unverifiziert (siehe `AP1-RELEVANZ.md`, Abschnitt 7). AIDI liefert dazu keine neuen Primärbelege.
