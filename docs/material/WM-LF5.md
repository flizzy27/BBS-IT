# Buchauswertung WM-LF5: Westermann „IT-Berufe Lernfelder 1–5“, Lernfeld 5 (Software zur Verwaltung von Daten anpassen)

Stand der Auswertung: November 2026. Alle Inhalte in eigenen Worten; Aufgaben nur als Typen beschrieben. Seitenangaben sind PDF-Seiten (beim Fachbuch identisch mit der gedruckten Seitenzahl). „AB“ = Arbeitsbuch-PDF-Seite.

Lesehinweis zur Gründlichkeit: Kapitel 5.1–5.6 und 5.8–5.11 sowie die Arbeitsbuch-Lernsituationen wurden im OCR-Text gelesen; das Python-Kapitel 5.7 (S. 545–585) wurde nur auf Struktur, Beispielprogramme und Aufgabentypen durchgesehen. OCR-Tabellen (ASCII-Tabelle, Zweierkomplement) wurden nicht visuell gegen das PDF geprüft; die genannten Fakten sind aber Standardwissen und wurden unabhängig nachgerechnet (Unix-Zeitbeispiele, Prüfziffer, Speicherbeispiele).

---

## 1. Steckbrief

| | |
|---|---|
| Titel | Westermann, IT-Berufe, Lernfelder 1–5 (Schülerbuch) und Arbeitsbuch zum gleichen Band; Lernfeld 5 „Software zur Verwaltung von Daten anpassen“ |
| Auflage | im OCR nicht erkennbar; Inhalte stammen laut Quellenangaben aus 2024 (Rankings Q1/2024, Unicode 15.0) |
| Umfang LF 5 | Fachbuch S. 468–650 (183 Seiten) plus Sachwortverzeichnis S. 651–663; Arbeitsbuch AB S. 258–357 (7 Lernsituationen) |
| Aufbau | Zwei Hälften: (a) Datenverwaltung und Grundlagen (Informationen, Zahlensysteme, Codes, Dateiformate, Datenmengen, Informationssicherheit, Prozess, Anforderungen, Modellierung, Werkzeuge), (b) Umsetzung (Python, Dateien, Datenbanken mit SQL und SQLite, Testen, Dokumentation, Evaluation) |
| Stil | Erklärtext, Definitionskästen, „Kompetenzcheck“ (Richtig/Falsch-Listen plus Handlungsaufgaben), Arbeitsbuch mit Lernsituationen, Teamaufgaben, englischen Lesetexten |
| Gesamturteil AP1 | **Etwa die Hälfte ist für AP1 relevant.** Hoch: Zahlensysteme und Codes, Dateiformate, Datenmengen, Informationssicherheit, Lasten-/Pflichtenheft, Pseudocode/UML/ERM, Programmierwerkzeuge, Testen, Dokumentation. Wenig bis gar nicht: Python-Syntax, PyCharm, SQLite-Anbindung, Struktogramm/PAP, Programmiersprachen-Ranglisten. |
| Gesamturteil AP2 FISI | LF 5 ist weitgehend Grundlage; SQL (S. 614–626) ist laut Katalog 2. Auflage AP2-Stoff. Das Buch verweist selbst auf „2. und 3. Ausbildungsjahr“ für Normalisierung, Vorgehensmodelle, UML, DCL/TCL. |
| Passung zur App | Sehr gut bei Pseudocode, UML, ERM/Normalisierung, SQL, Testen, Lasten-/Pflichtenheft, Werkzeuge. **Größte Lücke: der gesamte Block „Darstellung von Daten“ (Codes, Dateiformate, Medien-Datenmengen).** |

---

## 2. Gliederung mit PDF-Seiten

| Kap. | Thema | PDF-Seiten |
|---|---|---|
| 5.1 | Umfeld der Softwareentwicklung (Softwarearten, Anpassung, Rollen) | 468–474 |
| 5.1.1 | Software, Individual/Standard, Customizing, Erweiterungsprogrammierung, Datenmigration | 469–471 |
| 5.1.2 | Aufgaben/Kompetenzen von Entwicklern | 472–474 |
| 5.2 | Grundlagen der Datenverwaltung | 474–507 |
| 5.2.1 | Information vs. Daten, EVA | 475–477 |
| 5.2.2 | Datenarten (analog/digital, Struktur, Sicherheitsstufe), Datenherkunft (intern/extern, primär/sekundär) | 477–481 |
| 5.2.3 | Zahlensysteme (dez, dual, hex), Kennzeichnung (0b, 0x, #), Umrechnung | 481–486 |
| 5.2.4 | Darstellungsformen: Zahlen (Ganzzahl, Zweierkomplement, Gleitkomma), Text (ASCII, ISO 8859, Unicode/UTF), Grafik (Raster/Vektor, RGB/CMYK, Farbtiefe), Audio (Sampling), Datum/Zeit (Unix-Zeit, Y2K38, ISO 8601), Algorithmus/Programm | 486–498 |
| 5.2.5 | Datenmengen (Bit/Byte, SI- und IEC-Präfixe, Speicherbedarf) | 498–500 |
| 5.2.6 | Speichern, Dateien, Dateiformate (File-/Block-/Object-Storage; Video, Audio, Text, Grafik) | 500–505 |
| 5.2.7 | Informationssicherheit (Datenschutz, Datensicherheit, CIA) | 505–507 |
| 5.3 | Softwareprojekte (Merkmale, Phasen, Organisation, Management) | 507–511 |
| 5.4 | Entwicklungsprozess: Phasen (IEEE 12207) und Vorgehensmodelle (Wasserfall, Spirale, V-Modell, Scrum, DevOps) | 511–519 |
| 5.5 | Anforderungen und Entwurf | 519–534 |
| 5.5.1/5.5.2 | funktionale/nicht funktionale Anforderungen, Lasten-/Pflichtenheft | 520–523 |
| 5.5.3 | Entwurf, Top-down/Bottom-up | 524–525 |
| 5.5.4 | Modellierung: PAP, Struktogramm, Datenflussplan, Entscheidungstabelle, Pseudocode, UML-Überblick, ERM | 525–533 |
| 5.6 | Programmiersprachen und -werkzeuge (Aufbau, Generationen, Paradigmen, Auswahl, Rankings, IDE, Compiler/Interpreter, Frameworks) | 534–545 |
| 5.7 | Python (IDE, Syntax, Datentypen, Exceptions, Verzweigung, Funktionen, Schleifen, Listen, Dateien) | 545–585 |
| 5.8 | Datenbanken | 586–629 |
| 5.8.1 | DBMS bestandteile, ANSI/SPARC, Betriebskonzepte, Datenmodelle (inkl. NoSQL) | 586–597 |
| 5.8.2–5.8.4 | ERM (Chen), relationales Modell, Anomalien, Überführung ERM → Tabellen | 597–614 |
| 5.8.5 | SQL (DDL, DML, SELECT, Aggregat, GROUP BY, JOIN, Datum, LIMIT, Index) | 614–626 |
| 5.8.6 | SQLite mit Python (`sqlite3`) | 626–629 |
| 5.9 | Testen und Debuggen (Prozess, statisch/dynamisch, Testarten, Teststufen, Alpha/Beta, Testdokumente, Debugging, TDD) | 629–642 |
| 5.10 | Dokumentation (Entwickler-/Benutzerdoku, Qualitätskriterien, Kommentare) | 642–649 |
| 5.11 | Evaluation des Prozesses | 649–650 |
| – | Sachwortverzeichnis | 651–663 |

Arbeitsbuch LF 5 (AB-PDF-Seiten): LS 1 Umfeld (258–262), LS 2 Daten/Codes/Datenmengen (263–279), LS 3 Prozess, Anforderungen, Algorithmen (280–303), LS 4 Python (304–320), LS 5 Dateien/CSV (321–326), LS 6 Datenbanken (327–349), LS 7 Testen/Dokumentation (350–357).

---

## 3. Auswertung je Thema

Legende Relevanz: `ap1`, `ap1-teilweise`, `ap2`, `unnötig`. Die Einstufung stützt sich auf `docs/AP1-RELEVANZ.md` und `docs/AP-QUELLEN-UND-THEMEN.md`; der Katalog der 2. Auflage selbst liegt nicht vor, deshalb sind Einstufungen ohne Beleg mit **[unverifiziert]** markiert. Dass „Beratung zu Dateiformaten und Codes“ ein AP1-Kapitel ist, übernehme ich laut Auftrag.

### 3.1 Softwarearten, Anpassung (S. 469–474)

| Aspekt | Inhalt (eigene Worte) | Relevanz | Abdeckung |
|---|---|---|---|
| Softwarebegriff | IEEE-Sicht: Programme plus Daten plus Dokumentation. Aufgabenbezogene Einteilung nach ISO/IEC 2382: Systemsoftware, Unterstützungssoftware (Entwicklungs-/Hilfswerkzeuge), Anwendersoftware | ap1-teilweise | **voll** `b03-l01` (dort vier Klassen: System, Dienstprogramme, Entwicklungssoftware, Anwendung; inhaltlich gleich) |
| Standard vs. Individual | Standard: Massenmarkt, passt nur grob, wird angepasst. Individual: maßgeschneidert, flexibel, teurer | ap1 | **voll** `b03-l01` (plus Branchensoftware, Make-or-Buy) |
| Arten der Anpassung | Customizing (ohne Quellcodeänderung): **Konfiguration** (Module wählen) und **Parametrisierung** (Funktionen per Parameter ein/aus). Reicht das nicht: **Erweiterungsprogrammierung** über Schnittstellen. Reicht auch das nicht: **Neuentwicklung**. Individualsoftware wird dagegen im Quellcode geändert. **Datenmigration** = Daten vom Altsystem ins neue System übertragen | ap1-teilweise [unverifiziert] | **teilweise** `b03-l01` kennt „Customizing“ nur als Stichwort in einer Tabellenzelle; Stufenfolge Konfiguration → Parametrisierung → Erweiterung → Neuentwicklung und Datenmigration fehlen |
| Entwicklerrollen, Kompetenzen | Aufzählung von Berufsbildern, Soft Skills | unnötig | – |

Aufgabentyp im Buch/AB: richtig/falsch, Software einer Art zuordnen (AB 260), eigenes Customizing-Beispiel schildern.

### 3.2 Information, Daten, Datenarten (S. 475–481)

| Aspekt | Inhalt | Relevanz | Abdeckung |
|---|---|---|---|
| Information vs. Daten | Information = Wissensübertragung mit Bedeutung; Daten = formalisierte, wiederverwendbare Darstellung davon; Interpretation hängt vom Bezugssystem ab (Beispielfolge 1000001 = Dezimalzahl, 65 oder „A“). Eigenschaften von Information: immateriell, trägergebunden, nicht kostenlos, leicht übertragbar, beliebig kopierbar. EVA-Prinzip | ap1-teilweise | **voll** `d01-l01`, `p01-l01` (EVA); Mehrdeutigkeit der Datenfolge (gleiche Bits, andere Bedeutung) fehlt als Aufgabe |
| Datenarten | Nach Repräsentation (analog/digital), Struktur (strukturiert, semistrukturiert wie E-Mail, unstrukturiert wie Video/Text), Beständigkeit (flüchtig/dauerhaft), Verwendung, Erscheinungsform, **Sicherheitsstufe** (öffentlich, intern, vertraulich, geheim) | ap1-teilweise [unverifiziert] | **fehlt** als Lektion. Die vier Stufen entsprechen nicht den BSI-Schutzbedarfskategorien (normal/hoch/sehr hoch) aus LF 4 und `s01`; Gegenüberstellung wäre nützlich |
| Datenherkunft | intern/extern; Primärdaten (selbst erhoben, aktuell, teuer) vs. Sekundärdaten (vorhanden, billig, ggf. veraltet) | unnötig bis ap1-teilweise | **fehlt**; reines Definitionswissen, bei Wirtschaftsthemen (Marktanalyse) höchstens am Rand |

Aufgabentyp AB: Kreuzworträtsel, Primär/Sekundär mit je drei Beispielquellen, englischer Lesetext zu quantitativen/qualitativen Daten (AB 274).

### 3.3 Zahlensysteme (S. 481–486; AB 265–268)

| Aspekt | Inhalt | Relevanz | Abdeckung |
|---|---|---|---|
| Stellenwertsysteme | Dezimal (10), Dual (2), Hexadezimal (16) mit Stellenwerten, Berechnung mit Nachkommastellen (Beispiele 7042,31 / 1011,11₂ = 11,75 / 2A7F,5C₁₆ ≈ 10879,36) | ap1-teilweise | **teilweise** `m04` (Dual, nur Ganzzahlen), `m07` (Hex im IPv6-Kontext). Nachkommastellen in anderen Systemen fehlen (prüfungsfern) |
| Kennzeichnung | mathematisch tiefgestellte Basis; in der IT-Praxis Präfixe `0b…`, `0x…`, `#RRGGBB`, `$…`; Dezimalzahlen ohne führende Null (sonst Oktal-Falle) | ap1 | **teilweise**: `0x` nur als akzeptierte Eingabe in `m07`; keine Lektion zu Präfixen |
| Umrechnung | Dezimal → Dual per **Divisionsmethode** (Rest von unten nach oben lesen); Dual → Dezimal per **Additionsmethode**; Dual ↔ Hex per Vierergruppen (Tabelle 0–F). AB verlangt zusätzlich Subtraktions- und Multiplikationsmethode | ap1 | **teilweise**: Subtraktionsmethode `m04-l02` (Divisionsmethode nur erwähnt), Hex-Umrechnung `m07` + Generator `bin.hex`. **Fehlt:** Dual ↔ Hex über Nibbles als eigene Lektion, Oktal, Umrechnung 16-Bit-Werte |
| Typische Werte im AB | Tabellen mit dez/dual/hex-Zeilen (z. B. 255, 10371, 65000, FFAE, 16-Bit-Dualzahlen), jeweils ohne Taschenrechner | ap1 | siehe oben |

Aufgabentypen: Tabelle „fehlende Zellen ergänzen“ (dez/dual/hex gemischt), Rechenweg mit benannter Methode, eigenes Zahlensystem (Basis 3/7/11) entwerfen (prüfungsfern).

### 3.4 Darstellungsformen von Daten (S. 486–498; AB 267–273)

| Teilthema | Kernaussagen | Relevanz | Abdeckung |
|---|---|---|---|
| Ganzzahlen | ohne Vorzeichen: 0 … 2ⁿ−1; mit Vorzeichen: höchstes Bit = Vorzeichen, negative Werte als **Zweierkomplement** (kein ±0). 4 Bit: −8 … 7; 8 Bit: −128 … 127; 11111111 = −1 (vorzeichenbehaftet) bzw. 255 (ohne) | ap1-teilweise | **teilweise** `p01-l04` (Wertebereich), **fehlt:** Umrechnung negativer Zahlen ins Zweierkomplement und zurück (AB 268 hat 20 Zeilen davon, 8 und 16 Bit) |
| Gleitkomma | Aufbau Vorzeichen/Exponent/Mantisse nach IEEE 754: 32 Bit = 1+8+23, 64 Bit = 1+11+52; Genauigkeit hängt an der Mantissenlänge | ap1-teilweise | **teilweise** `p01-l04` (float/double-Genauigkeit, 0,1+0,2); Bitaufbau fehlt (prüfungsfern, Aufgabentyp „Bitaufbau nennen“) |
| Text/Zeichensätze | **ASCII**: 7 Bit, 128 Zeichen (0–31 Steuerzeichen, 32 Leerzeichen, 127 DEL; `A`=65=0x41, `a`=97=0x61, `0`=48=0x30); 8. Bit früher Parität, heute Erweiterung auf 256 (**ISO 8859**, Latin-1; Latin-9 ersetzt u. a. ¤ durch €). **Unicode** (ISO/IEC 10646): ein Zeichensatz für alle Schriften; Kodierungen **UTF-8** (1–4 Byte, ASCII-kompatibel, spart Platz), UTF-16 (2 oder 4 Byte), UTF-32 (immer 4 Byte) | **ap1** (laut Auftrag) | **fehlt**: nur Randerwähnung „ASCII, UTF-8“ in `m02` (Darstellungsschicht) und ASCII-Zeichenzahl in `s04` (Passwortraum) |
| Grafik | Rastergrafik (Pixel, nicht verlustfrei skalierbar) vs. Vektorgrafik (Koordinaten/Parameter, verlustfrei skalierbar, meist kleiner, ungeeignet für Fotos). Farbmodelle: **RGB** additiv, **CMYK** subtraktiv. **Farbtiefe**: 8 Bit = 256, 16 Bit = 65 536, 24 Bit = 16,7 Mio. Farben. Hex-Farbcode `#RRGGBB` | ap1 | **teilweise** `h03-l05` (Farbtiefe, Bildspeicher, Generator `hw.bildspeicher`). **Fehlt:** Raster vs. Vektor, RGB/CMYK, Hex-Farbcode ↔ Dezimaltripel (AB 271) |
| Audio | **Sampling**: Abtastrate (Messungen pro Sekunde, Audio-CD 44,1 kHz), Abtasttiefe (Bit pro Messwert, CD 16 Bit = 65 536 Stufen), Kanalzahl (mono, stereo, Surround) | **ap1** | **fehlt** komplett (kein „Sampling“/„Abtastrate“ im Bestand) |
| Datum/Zeit | Text vs. Ganzzahl; **Systemzeit** zählt Ticks seit einem Startdatum (Unix: Sekunden seit 1.1.1970 00:00:00 UTC; Windows ab 1601, macOS ab 2001); **Y2K38**: vorzeichenbehaftete 32 Bit laufen am 19.1.2038 03:14:07 UTC über; **ISO 8601**: größte Einheit zuerst `JJJJ-MM-TT`, `hh:mm:ss`, optional Zeitzonenabstand (`+01:00`), sortierbar, eindeutig | ap1-teilweise [unverifiziert] | **fehlt** |
| Algorithmus/Programm | Algorithmus = endliche, eindeutige Vorgehensweise, sprachunabhängig; Programm = Umsetzung in einer Sprache | ap1 | **voll** `p01-l01` |

Aufgabentypen AB: Text ↔ Binärcode über ASCII-Tabelle (Wörter wie „IT-Berufe“, „Python“; rückwärts 8-Bit-Gruppen entziffern, AB 269–270), Farbtabelle (Name ↔ RGB ↔ Hex ↔ 24 Bit), Audio-Kenngrößen erläutern, Tonformate recherchieren (prüfungsfern), ISO-8601-Schreibweisen bilden (AB 273).

### 3.5 Datenmengen (S. 498–500; AB 276–279)

| Aspekt | Inhalt | Relevanz | Abdeckung |
|---|---|---|---|
| Einheiten | Bit, Byte (8 Bit), Nibble (4), Word (16), Double Word (32). Dezimalpräfixe (10³-Schritte) und IEC-Binärpräfixe (Ki, Mi, Gi, Ti … , 2¹⁰-Schritte) | ap1 | **voll** `m15-l01`, `h02-l04`, Generatoren `calc.units`, `hw.kapazitaet` (Word/DWord fehlt) |
| Speicherbedarf | Bild: Pixelanzahl × Bit pro Pixel ÷ 8; Beispiel 500 Bilder à 2000×1500 px RGB 8 Bit je Kanal = 4,5 · 10⁹ Byte ≈ 4,19 GiB (Divisionsweg über 1024-Stufen, 2 Nachkommastellen) | ap1 | **voll** für Bilder (`h03-l05`, `hw.bildspeicher`); **teilweise** für Videoströme (`m15-l06`, Kamerarechnung ohne Bildformel) |
| Aufgaben im AB (Muster) | (1) Umrechnungsketten: Byte → MB und MiB, MiB → TiB, GiB → TB, PB → MB, TiB → Byte; (2) 1000 Rasterbilder aus Abmessungen in cm, ppi (cm → Inch → Pixel), 12 Bit je Kanal, Ergebnis in TiB; (3) Streaming-Server: Auflösung, Bit/Pixel, Bilder pro Sekunde, Laufzeit, Kompressionsfaktor 1:100, Anzahl Videos, TiB; (4) Datenbankgröße: Anzahl Datensätze × Feldgrößen (Ganzzahl 4 Byte, Gleitkomma 8 Byte, Text 2 Byte je Zeichen), zwei Tabellen, **+20 % Reserve**, GiB | **ap1** | Typ (1) voll; Typen (2)–(4) **fehlen** als Generator, (2) nur als Teilschritt |
| Konvention | Das Buch rechnet beim Wechsel zu Binärpräfixen schrittweise durch 1024 und rundet auf zwei Nachkommastellen; es schreibt „KB“ für 1000 Byte (SI wäre „kB“) | – | App nutzt kB und erklärt die Explorer-Schreibweise (`m15.ts` ~Z. 729–738); Tippfehler-Toleranz bei „KB/kB“ in Eingabefeldern sicherstellen |

### 3.6 Dateien, Speicherformen, Dateiformate (S. 500–505; AB 322–326)

| Aspekt | Inhalt | Relevanz | Abdeckung |
|---|---|---|---|
| Speicherarten | File-Storage (Verzeichnisbaum), Block-Storage (adressierte Blöcke), Object-Storage (Objekt + Metadaten) | ap1-teilweise | **teilweise**: Datei- vs. Blockebene in `h02-l06` (NAS/SAN); Objektspeicher fehlt |
| Datei, Dateiformat | Datei = benannte, dauerhaft gespeicherte, logisch zusammengehörige Daten; Format = innere Struktur und Bedeutung. Vier Lösungswege für gemeinsame Nutzung: Dateiendung, einheitliche Struktur (CSV), Beschreibungssprache (XML/HTML), Auslagerung in Datenbank. **Proprietär vs. Standardformat**; Spezifikation öffentlich oder geheim | **ap1** (laut Auftrag) | **fehlt** (nur OOXML vs. ODF als Stichwort `b03-l07`, „offene Formate beim Cloud-Ausstieg“ `b04`, „CSV/JSON“ in DSGVO Art. 20 `s02`) |
| Textformate | `.txt` (unformatiert, Zeichencodierung wichtig), `.rtf`, `.pdf` (plattformunabhängig, Adobe → PDF Association), `.doc/.docx` | ap1 | fehlt |
| Grafikformate | `.bmp` (kaum komprimiert), `.gif` (verlustfrei, 256 Farben, Animation, Transparenz), `.jpg/.jpeg` (verlustbehaftet, Fotos), `.png` (verlustfrei), `.tif` (Druckvorstufe, CMYK), `.psd` (Ebenen); Vektor: `.svg`, `.eps`, `.ai`, `.pdf` | ap1 | fehlt |
| Audioformate | verlustfrei: `.flac`, `.wv`; verlustbehaftet: `.mp3` (Psychoakustik). *Das Buch führt `.wav` und `.aiff` fälschlich als verlustbehaftet, siehe Abschnitt 5.* Verlustfreie Kompression spart nur etwa ein Viertel bis gut zwei Drittel | ap1 | fehlt |
| Videoformate | Containerformate (`.mp4` MPEG-4, `.mkv` Matroska, `.avi`, `.mov` QuickTime, `.3gp`), MPEG-2 (`.mpg`); Format bestimmt Auflösung, Farbtiefe, Bildrate, Seitenverhältnis | ap1 | fehlt |
| CSV | zeilenweise Datensätze, Felder per Trennzeichen (Komma, in Deutschland oft Semikolon, weil Dezimalkomma); nicht genormt; Problem: Trennzeichen im Feldinhalt | ap1 | fehlt (AB 322–326: Daten ins CSV-Format bringen, mit Python schreiben/lesen) |
| JSON | **Im Buch nicht behandelt** (kommt nur einmal als Wort vor, nicht erklärt) | ap1-teilweise [unverifiziert] | fehlt; trotzdem ergänzenswert, weil heute Austauschstandard |

Aufgabentypen: Dateiendung zu Beschreibung zuordnen (AB 323), CSV-Zeilen aus Tabelle bilden (Wetterdaten mit Ort/Datum/Uhrzeit/Messwert), „welches Problem entsteht bei Datei-Speicherung und wie löst man es“, Formate recherchieren.

### 3.7 Informationssicherheit (S. 505–507; AB 276)

| Aspekt | Inhalt | Relevanz | Abdeckung |
|---|---|---|---|
| Begriffe | Datenschutz (Personen, Persönlichkeitsrecht), Datensicherheit (Schutz aller Daten), Informationssicherheit (Oberbegriff, auch analog) | ap1 | **voll** `s01`, `s02` |
| Schutzziele | Vertraulichkeit, Integrität, Verfügbarkeit (Verfügbarkeit 99 % reicht gewerblich nicht, Ziel 99,999 %, Mittel RAID/Cluster) | ap1 | **voll** `s01`; Verfügbarkeitsrechnung `b06`, `w.sla` |

### 3.8 Projekte, Prozess, Vorgehensmodelle (S. 507–519; AB 280–288)

| Aspekt | Inhalt | Relevanz | Abdeckung |
|---|---|---|---|
| Projektmerkmale und -phasen | einmalig, befristet, Ziel/Ressourcen definiert (DIN 69901). Phasen im Buch: Start, Planung, Durchführung, Kontrolle, Abschluss. Projektinstanzen: Lenkungsausschuss, Projektleitung, Teilprojektleitung, Team. „Magisches Dreieck“ Umfang/Zeit/Kosten | ap1-teilweise | **voll** `w05` (dort Phasen nach DIN 69901-2: Initialisierung, Definition, Planung, Steuerung, Abschluss; **andere Benennung**) |
| Phasen der Softwareentwicklung (IEEE 12207) | Analyse (inkl. Lasten-/Pflichtenheft, Aufwandsschätzung), Entwurf, Umsetzung, Test, Dokumentation, Auslieferung, Wartung/Support | ap1-teilweise | **teilweise**: V-Modell-Teststufen in `p05-l04`, Projektphasen in `w05`; die Software-Lebenszyklus-Phasen als Zuordnungsaufgabe (Tätigkeit → Phase, AB 280) fehlen |
| Vorgehensmodelle | **Wasserfall** (linear, einfache Planung, späte Fehlerentdeckung, Kunde kaum eingebunden), **Spiralmodell** (iterativ, risikogetrieben, vier Schritte je Zyklus), **V-Modell XT** (Entwicklungs- und Teststufe gepaart, Pflicht bei öffentlichen Aufträgen, dokumentationslastig), **Scrum** (Sprints bis max. 4 Wochen, Product/Sprint Backlog, Product Owner, Scrum Master, Daily, Review, Retrospektive, Teams 3–9), **DevOps** (Entwicklung plus Betrieb, schnelle Auslieferung). Jeweils Vor-/Nachteile im Tabellenformat | ap1-teilweise [unverifiziert] | **teilweise**: `w05` nennt Wasserfall vs. Scrum in zwei Sätzen, `p05` nennt DevOps/V-Modell am Rand. Spiral, Kanban/XP, Scrum-Rollen und Vorteils-/Nachteilsvergleich **fehlen** |

Aufgabentypen: Aussagen richtig/falsch (z. B. Sprintlänge, V-Modell für Kleinprojekte), DevOps erläutern mit je zwei Vor-/Nachteilen, englischer Scrum-Text (AB 283–285).

### 3.9 Anforderungen, Lasten-/Pflichtenheft, Entwurf (S. 519–525; AB 289–294)

| Aspekt | Inhalt | Relevanz | Abdeckung |
|---|---|---|---|
| Anforderungsarten | funktional (was) vs. nicht funktional (wie): Qualitätsanforderungen (Benutzbarkeit, Zuverlässigkeit, Effizienz, Änderbarkeit, Übertragbarkeit) und Rahmenbedingungen (technologisch, organisatorisch, normativ/rechtlich/kulturell). Gütekriterien: korrekt/vollständig, eindeutig, prüfbar, nachverfolgbar | ap1 | **teilweise** `w01`, `b05` (funktional/nicht funktional ja; Qualitätsmerkmale Benutzbarkeit … Übertragbarkeit als Liste und Rahmenbedingungen-Dreiteilung nicht prüfbar vorhanden) |
| Lasten-/Pflichtenheft | Lastenheft: Auftraggeber, „Was und Wofür“; Pflichtenheft: Auftragnehmer, „Wie und Womit“ auf Basis des Lastenhefts, Grundlage für Vertrag und Abnahme. Beispielgliederung mit Muss-/Kann-/Abgrenzungskriterien, Datenvolumen, Lieferumfang, Abnahmekriterien; idealtypischer 9-Schritte-Ablauf bis Projektstart (DIN 69901-5) | ap1 | **voll** `w01-l` (Lasten-/Pflichtenheft) |
| Entwurfsmethoden | Top-down (Gesamtarchitektur → Module) vs. Bottom-up (Bausteine → System), meist Mischform | unnötig [unverifiziert] | fehlt (nicht mit gleichnamiger „Top-down-Fehlersuche“ in `m13` verwechseln) |

### 3.10 Modellierungsmittel (S. 525–533; AB 295–303)

| Mittel | Aussage im Buch | Relevanz | Abdeckung |
|---|---|---|---|
| Programmablaufplan (DIN 66001) | Pfeil-Flussdiagramm, beliebig verschachtelbar, unstrukturiert möglich | **unnötig für AP1 ab 2025** (Katalog 2. Auflage: entfallen) | App führt es bewusst nur als Randhinweis `p01.ts` ~Z. 60 |
| Struktogramm (DIN 66261) | Nassi-Shneiderman, geschlossener Block, Top-down | **unnötig für AP1 ab 2025** | wie oben; Buch und AB nutzen es **durchgängig** für Algorithmen (AB 295–298, 325) |
| Datenflussplan | veraltet, selten | unnötig | – |
| Entscheidungstabelle | Bedingungen × Regeln; Anzahl Regeln = 2^Bedingungen; J/N-Spalten, Aktionen mit X markiert (DIN 66241) | ap1-teilweise [unverifiziert] | **fehlt** als Lektion (`p05` nennt sie nur als Testverfahren-Stichwort) |
| Pseudocode | nicht genormt, Muster mit `Wenn … dann … sonst … Ende Verzweigung`, `Wiederhole solange …`, `Wiederhole … solange …`, `Von … Bis …`, Zuweisung `:=`, Modulo | ap1 | **voll** `p01`–`p03` (andere Schreibweise, siehe Abschnitt 5) |
| UML | Überblick der Diagrammarten; Klassendiagramm-Beispiel | ap1 | **voll** `p04` |
| ER-Modell | Chen-Notation | ap1-teilweise | **voll** `d02` |

Aufgabentypen im AB zu Algorithmen (alle als Struktogramm/PAP, lassen sich 1:1 als Pseudocode oder Aktivitätsdiagramm stellen): Vielfaches von 3 durch wiederholte Subtraktion (Varianten vergleichen, korrekte wählen und begründen), Anmeldung mit drei Versuchen, Urlaubsanspruch mit gestaffelten Regeln und Sonderfällen, Zahlenraten mit Versuchszähler, Zinseszins, Passwort aus 8 Zufallszeichen (mit vorgegebenen Hilfsfunktionen `toChar`, Zufallszahl), gestaffeltes Bruttogehalt (Betriebszugehörigkeit × Umsatzstaffel), **Prüfziffer nach dem Luhn-Verfahren** (Verdoppeln jeder zweiten Ziffer, Quersumme, Differenz zur nächsten Zehn; Beispiel wurde nachgerechnet: Summe 74 → Prüfziffer 6), fehlerhaften Algorithmus erweitern/korrigieren (Sortieranlage).

### 3.11 Programmiersprachen und -werkzeuge (S. 534–545; AB 285–288)

| Aspekt | Inhalt | Relevanz | Abdeckung |
|---|---|---|---|
| Sprachaufbau | Syntax, Schlüsselwörter, Zeichensatz, Grundbefehlssatz | ap1-teilweise | **voll** `p01` |
| Generationen (Maschinen-, Assembler-, höhere, 4GL, KI-Sprachen) | Buch selbst: „nur noch untergeordnet“ | unnötig | – |
| Paradigmen | imperativ, objektorientiert, deklarativ | ap1-teilweise | **voll** `p05-l01` (dort funktional statt „deklarativ“ als Oberbegriff) |
| Sprachwahl, Rankings (TIOBE, PYPL, RedMonk) | Kriterien: Plattform, Erfahrung, Verbreitung; Rankings | unnötig (Rankings), ap1-teilweise (Auswahlkriterien) | fehlt, nur Auswahlkriterien nützlich |
| Werkzeuge | Texteditor mit Syntaxhervorhebung, **IDE**, GUI-Editor, Compiler/Interpreter/Assembler, Debugger, Versionsverwaltung, Frameworks (Application/Domain/Test/Web). Compiler: einmal übersetzen, plattformabhängig; Interpreter: zur Laufzeit, plattformunabhängig, langsamer; Mischform Bytecode | **ap1** (laut Verlagsstatistik häufigster Themenkreis, `AP1-PRUEFUNGSANALYSE`) | **voll** `p05-l02` (Compiler/Interpreter/IDE/Debugger), `p05-l03` (Git); **fehlt:** GUI-Editor, Framework-Arten, Bibliothek vs. Framework |

### 3.12 Python (S. 545–585; AB 304–321)

| Aspekt | Inhalt | Relevanz |
|---|---|---|
| IDE, Projekt anlegen (PyCharm/IDLE/VS Code), erstes Programm | Bedienschritte | unnötig |
| Syntax | Einrückung bildet Blöcke, Groß-/Kleinschreibung, Bezeichnerregeln (Buchstaben/Unterstrich/Ziffern, nicht am Anfang eine Ziffer), Literale (`0x…`, `0b…`), Schlüsselwörter, Kommentare `#`, Module/`import`, Built-ins | Python-spezifisch; Bezeichnerregeln und Syntaxfehler-Erkennung sprachneutral nutzbar |
| Variablen, Datentypen, Ein-/Ausgabe | `input()` liefert Text → `int()`/`float()`; `print`, `.format` | wie oben |
| Operatoren | `//` ganzzahlig, `%` Rest, `**` Potenz, `+=`, relational und logisch (`and`/`or`/`not`), Identität (`is`) | Brücke zu Pseudocode DIV/MOD |
| Exception Handling | `try … except … else … finally`; Buchbeispiele fangen pauschal `Exception` und lesen `e.args[0]` | didaktisch dünn |
| Verzweigung, Funktionen, Rekursion | `if/elif/else`, `def`, `return`, Fakultät rekursiv („nur vollständigkeitshalber“) | Python-spezifisch |
| Schleifen, Listen, Zufall | `while`, `for`; Listenmethoden `append/extend/insert/pop/remove/reverse/sort`; `random` | Python-spezifisch |
| Dateien | `open`, Lesen/Schreiben von Textdateien, Schließen | Python-spezifisch |
| Relevanz AP1 | AP1 ist sprachneutral/Pseudocode. Python-Syntax wird nicht geprüft. | **unnötig für AP1**, **Schulbonus** für Klassenarbeiten |
| Abdeckung | Python erscheint in der App nur als Vergleichsspalte in Tabellen (`p01.ts` ~Z. 145, `p02.ts` ~Z. 149, 335) | **teilweise (bewusst)** |

Aufgabentypen AB 304–321: englischen Pressetext über Python-Popularität auswerten, IDEs vergleichen, vorgegebenen Code abtippen und beschreiben, Syntaxfehler in einem Skript finden, Bezeichner gültig/ungültig bewerten (z. B. mit Leerzeichen oder `$` am Anfang), Datentypen für eine Mitarbeitertabelle wählen, Rest- und Zuweisungsoperatoren auswerten, Programme zu Kraftstoffverbrauch, Ohmschem Gesetz, Bildspeicher in GiB, BMI-Kategorie, Jahreszahl/Schaltjahr, Fakultät, Sternfiguren, Bankautomat (Teamaufgabe).

### 3.13 Datenbanken (S. 586–629; AB 327–349)

| Aspekt | Inhalt | Relevanz | Abdeckung |
|---|---|---|---|
| DBMS, ANSI/SPARC (extern/konzeptionell/intern), Betriebskonzepte (Stand-alone, File-Share, Client-Server), Datenmodelle (hierarchisch, Netzwerk, relational, objekt, **NoSQL**: Dokument, Spalten, Graph) | Begriffe und Beispiele (MySQL, SQLite, MongoDB …) | ap1-teilweise bzw. unnötig (ANSI/SPARC) | **teilweise**: `d01-l01`; Client/Server in `m01`; **NoSQL und Betriebskonzepte fehlen** |
| ER-Modell (Chen: Rechteck, Ellipse, Raute, Kardinalität 1:1, 1:n, m:n), Beispiele Zoo, Arztpraxis | ap1-teilweise | **voll** `d02-l01/02` (zusätzlich Krähenfuß, (min,max)) |
| Relationales Modell: Tabelle, PK (eindeutig, minimal, unveränderlich), FK, Kardinalitäten, m:n über Kreuztabelle, Redundanz, Anomalien (Änderung/Einfüge/Lösch), referenzielle Integrität | ap1-teilweise | **voll** `d01-l02–l06` |
| ERM → Tabellen (4 Regeln) | ap1-teilweise | **voll** `d02-l03` |
| Normalisierung | Buch nennt nur Ziel, Vertiefung später | ap1-teilweise | **voll** `d02-l04–l06` (über Buchniveau) |
| SQL: DDL/DML/DCL/TCL, CREATE/ALTER/DROP, INSERT/UPDATE/DELETE, SELECT mit WHERE, BETWEEN, LIKE, Rechnen, ORDER BY, DISTINCT, Aggregat, GROUP BY/HAVING, INNER JOIN, LIMIT/OFFSET, Datumsfunktionen, Index | **ap2** (Katalog 2. Auflage) | **voll** `d03` (Relevanz „vertiefung“ stimmt) |
| `sqlite3` in Python (connect, cursor, execute, fetch) | unnötig | fehlt (bewusst) |

Aufgabentypen: ER-Modell aus Szenario zeichnen, Kardinalitäten bestimmen („Postleitzahl–Ort“, „Planet–Mond“ …), ERM → relationales Modell, SQL-Abfragen auf Übungsdatenbanken (Monitore, Wohnungen, Aktien), Datenbankarten zuordnen.

### 3.14 Testen und Debuggen (S. 629–642; AB 350–354)

| Aspekt | Inhalt | Relevanz | Abdeckung |
|---|---|---|---|
| Grundsatz | Tests sind Stichproben, beweisen nie Fehlerfreiheit; früh testen spart Kosten | ap1 | **voll** `p05-l04` (sinngemäß) |
| Testprozess | Planung → Entwurf → Vorbereitung → Durchführung → Auswertung → Abschluss | ap1 | **fehlt** als Reihenfolge-Aufgabe (AB 350 verlangt sie) |
| Testverfahren | statisch (Inspektion, Review, Walkthrough, Audit, statische Codeanalyse) vs. dynamisch (**Whitebox**: Anweisungs-/Zweig-/Pfadüberdeckung; **Blackbox**: Äquivalenzklassen, Grenzwerte) | ap1 | **teilweise** `p05-l04/05` (C0/C1, Äquivalenzklassen, Grenzwerte, Black/White vorhanden; Inspektion/Review/Walkthrough/Audit-Abgrenzung fehlt, Pair Programming fehlt) |
| Testarten (ISO 9126) | Funktion, Zuverlässigkeit (Robustheit, Recovery, Stress), Benutzbarkeit, Effizienz (Performance, Last), Änderbarkeit, Übertragbarkeit | ap1-teilweise | **teilweise**: Stichwörter in `p05`; strukturierte Zuordnung „Testart → Qualitätsmerkmal“ fehlt |
| Teststufen | Modul/Unit, Integration, System, Abnahme; Alpha-, Beta-Test, Release Candidate | ap1 | **teilweise** `p05-l04` (Stufen voll; Alpha/Beta/RC fehlen) |
| Testdokumentation | Testkonzept, Testentwurfs-/Testfall-/Testablaufspezifikation, Testprotokoll, Abweichungs-, Abschlussbericht; **Testprotokoll** als Tabelle mit Testdaten, erwartetem und tatsächlichem Ergebnis, Bemerkung, Unterschrift | ap1 (Belegaufgabe!) | **teilweise**: Testfälle ja (`p.testcases`), Tabelle mit „Ist vs. Soll, Schlussfolgerung“ als Belegaufgabe fehlt |
| Debugging | statische Analyse, Print-Ausgaben, Debugger (Haltepunkt, Einzelschritt, Variablenanzeige); Beispiel: Schleife läuft einmal zu wenig, weil Anzahl falsch initialisiert | ap1 | **voll** `p05-l02` (Debugger ausführlicher als Buch) |
| TDD | Test zuerst, minimal implementieren, refaktorisieren (rot–grün–refactor); Vor-/Nachteile | ap1-teilweise [unverifiziert] | **fehlt** |

Aufgabentypen AB: Testprozess-Phasen in Reihenfolge einsetzen, Vorteile statisch/dynamisch, Alpha vs. Beta an Beispiel, Black- vs. Whitebox beschreiben, **Schreibtischtest eines vorgegebenen Struktogramms mit Testdaten** und **Fehler im Algorithmus finden** (Rezeptfarbe-Beispiel mit Soll/Ist-Tabelle, AB 352–353), Testprotokoll für Datumsprüfung erstellen, Walkthrough durchführen.

### 3.15 Dokumentation und Evaluation (S. 642–650; AB 354–357)

| Aspekt | Inhalt | Relevanz | Abdeckung |
|---|---|---|---|
| Dokumentationsarten | Entwicklerseite: Projekt-, System-, Testdokumentation; Benutzerseite: Benutzerhandbuch, Installationsanleitung, Schulungsunterlagen, Marketingunterlagen; Zielgruppen | ap1-teilweise | **teilweise** `b05` (Benutzerhandbuch/Installationsanleitung als Teil der Leistungsübergabe); Entwickler- vs. Benutzerdokumentation und Systemdokumentation fehlen |
| Qualitätskriterien | auffindbar, relevant, verständlich, zielgruppengerecht, aktuell, widerspruchsfrei, vollständig; Entwickler plus technische Redaktion | ap1 | **teilweise** `b05` (Dokumentationsqualität allgemein) |
| Quellcode kommentieren | Kommentar erklärt das **Warum**, nicht das Was; sinnvoll: Lizenz, Warnung, TODO, API-Kommentar; vermeiden: redundant, Frust-/Spaßkommentare, auskommentierter Alt-Code; Kommentare aktuell halten | ap1-teilweise | **teilweise** `p01` (Kommentar-Syntax), Regeln fehlen |
| Evaluation | rückblickende Bewertung des Prozesses (Vorgehensmodell, Sprache, IDE, Team, Planung, Test, Doku) | ap1-teilweise | **voll** `w05` (Projektabschluss, Lessons Learned) |

---

## 4. Lückenliste (priorisiert)

P1 = AP1-relevant und fehlt/schwach, P2 = AP1-Randthema oder Ergänzung vorhandener Module, P3 = AP2 oder Schulbonus.

### P1-1: Zeichencodierung und Zahlensysteme („Codes“)

- Warum: Block „Beratung zu Dateiformaten und Codes“ (laut Auftrag AP1); Buch und AB bearbeiten ihn ausführlich; in der App fehlt ASCII/Unicode vollständig, Hex/Dual nur im Netzwerkkontext.
- Ziel: **neues Modul** `d04` „Datendarstellung: Zahlensysteme, Zeichencodes, Dateiformate“ (Bereich `daten`, Relevanz `ap1`), vor `d01`-Bezug; `m04`/`m07` bleiben, werden verlinkt.
- Lektionen:
  1. Dual, Hex, Oktal, Kennzeichnung (`0b`, `0x`, `#`), Nibble-Methode Dual ↔ Hex, Divisionsmethode.
  2. Ganzzahlen mit/ohne Vorzeichen, Zweierkomplement, Wertebereich, Überlauf.
  3. ASCII: 7 Bit, Steuerzeichen, `A`=0x41, Groß/Klein unterscheiden sich um 32 (Bit 5), `0`=0x30; Textlänge in Byte.
  4. ISO 8859 → Unicode → UTF-8/16/32: Warum Umlaute „kaputt“ aussehen (Mojibake), Beratungsfall: Altsystem Latin-1 trifft UTF-8.
  5. Farben: RGB, `#RRGGBB`, Farbtiefe, CMYK.
- Aufgabentypen (offen): `table` dez/bin/hex (je Zeile eine Zelle gegeben); `number` Zweierkomplement; `text` Wort ↔ Hex-/Binärfolge; `free` „Erläutern Sie, warum die Datei im Editor falsche Umlaute zeigt und was zu tun ist“; `match` Zeichensatz ↔ Eigenschaft.
- **Generatoren** (Ids mit Präfix `data.`):
  - `data.numconv`: Erweiterung von `bin.hex`; Werte 8-Bit 0–255, 16-Bit 256–65 535; Modus dez/bin/hex/okt gemischt. Fehlbilder: Hex-Ziffern falsch (A=11), Gruppen verrutscht.
  - `data.twos`: n ∈ {4, 8, 16}, x ∈ [−2ⁿ⁻¹, 2ⁿ⁻¹−1]; Lösung `(2ⁿ + x) mod 2ⁿ` als n-stelliges Dual; Rückrichtung. Fehlbilder: Vorzeichen-Betrag (z. B. −5 in 8 Bit → `1000 0101` statt `1111 1011`), Einerkomplement (`1111 1010`).
  - `data.ascii`: Buchstabe/Ziffer ↔ dez/hex/dual; Wörter 3–6 Zeichen; Zusatz „Bit 5 gesetzt = Kleinbuchstabe“. Zahlen: `A`=65, `Z`=90, `a`=97, `z`=122, `0`=48, `9`=57.
  - `data.utfbytes`: Textlänge und Byte je Codierung. Regeln: ASCII/Latin-1 = 1 Byte pro Zeichen, UTF-8 = 1 (ASCII), 2 (ä ö ü ß Ä Ö Ü), 3 (€), 4 (Emoji); UTF-16 = 2 (BMP) oder 4; UTF-32 = 4. Ergebnis ganzzahlig, keine Rundung.

### P1-2: Dateiformate und Formatberatung

- Warum: AP1-Kapitel (laut Auftrag) und im Buch tabellarisch aufbereitet; klassisches Beleg-/Beratungsthema („Welches Format empfehlen Sie?“).
- Ziel: Lektionen 6–7 im neuen Modul `d04` (oder eigenes Modul `d05` „Dateiformate und Datenaustausch“).
- Inhalte (eigene Worte, mit Entscheidungsregeln): verlustfrei vs. verlustbehaftet; Raster vs. Vektor; Foto → JPEG, Logo/Screenshot → PNG, Skalierbarkeit → SVG, Druck → TIFF/PDF; Audio: FLAC/WAV unkomprimiert bzw. verlustfrei, MP3 verlustbehaftet; Video: Container (mp4, mkv) vs. Codec (H.264); Text: txt, rtf, docx, odt, pdf (Archivierung PDF/A); proprietär vs. offener Standard (Herstellerunabhängigkeit, Exit aus Cloud, DSGVO Art. 20); Austauschformate **CSV** (Trennzeichen, Dezimalkomma, Semikolon, Anführungszeichen, Kodierung), **XML** (Baum, Tags), **JSON** (Schlüssel/Wert, Arrays), mit je einem kleinen Beispiel zum Lesen („Wie viele Kunden stehen in der JSON-Datei? Welche Spalte fehlt in der CSV?“).
- Aufgabentypen: `match` Endung ↔ Format ↔ Eigenschaft; `table` „Szenario → Format + Begründung“; `free` Beratungsfall (Elektro Krämer: Katalog als PDF, Produktfotos, Telefonansagen, Messdaten-Export); `number` „Welche Datei ist kleiner, und um welchen Faktor?“; CSV-Zeile bauen (Beleg-Tabelle → CSV-Text), CSV mit Semikolon und Dezimalkomma lesen.

### P1-3: Datenmengen für Medien und Datenbanken

- Warum: AB LS 2 hat dazu vier komplette Aufgabentypen (Umrechnungsketten, Raster, Video, Datenbank + Reserve); AP1-Leistungsdaten/Speicherdimensionierung; heute nur Bild- und Kamerastrom-Beispiele.
- Ziel: neue Lektion „Speicherbedarf von Text, Audio, Video und Datenbanken“ in `m15` (nach l06) oder `d04`; Generatoren in `src/core/gen/daten.ts`.
- **Generatoren**:
  - `data.audio`: `Byte = fs · Tiefe/8 · Kanäle · t`; fs ∈ {22 050, 32 000, 44 100, 48 000, 96 000} Hz, Tiefe ∈ {8, 16, 24}, Kanäle ∈ {1, 2, 6}, t ∈ [30, 600] s. Eckwert: 44,1 kHz/16 Bit/stereo = 1 411,2 kbit/s; 1 min = 10,584 MB = 10,09 MiB. Einheit (MB oder MiB) im Text nennen; Zusatzmodus „Datenrate in kbit/s“.
  - `data.video`: `Bit = B · H · Bit/Pixel · fps · t`, dann `/ Kompressionsfaktor` und `· Anzahl Videos`; Auflösungen 1280×720 bis 3840×2160, 12–24 Bit/Pixel, fps ∈ {24, 25, 30, 60}, t ∈ [1, 30] min, Faktor 1:50…1:200 oder unkomprimiert, Ergebnis in GiB oder TiB. Rundung 2 Stellen im Text vorgeben. Fehlbilder: Bit/Byte, 1000/1024, Kompression vergessen.
  - `data.dbsize`: Σ Feldgrößen · Datensätze · (1 + Reserve); Feldtypen Ganzzahl 4 Byte, Gleitkomma 8 Byte, Datum 4 Byte, Text[n] mit n · (1 oder 2 Byte je Zeichen); Datensätze 10 000–2 000 000, Reserve 10–30 %, Ergebnis GiB (2 Stellen). Mehrfaches Auftreten (Ø zwei Verträge je Kunde) als Faktor einbauen.
  - `data.unitchain`: Umrechnungsketten MiB → TiB, GiB → TB, PB → MB, Byte → MiB mit Richtungswechsel dezimal/binär. (Teilweise durch `calc.units` abgedeckt; nur prüfen, ob Binär↔Dezimal-Mischketten enthalten sind.)

### P1-4: Testprotokoll, Testprozess, Alpha/Beta (Erweiterung `p05`)

- Warum: Testprotokoll und Abnahme sind belegt AP1-Stoff (`AP-QUELLEN-UND-THEMEN` 3.7); Buch und AB geben Aufgabenmuster mit Soll/Ist-Tabelle.
- Ziel: `p05-l04` erweitern oder neue Lektion `p05-l08` „Testprozess und Testprotokoll“.
- Inhalte: sechs Prozessschritte, Testdokumente, Alpha/Beta/Release Candidate, Inspektion/Review/Walkthrough/Audit unterscheiden, Testarten ↔ Qualitätsmerkmal.
- Aufgabentypen: `order` Testprozess; `table` Testprotokoll aus Belegen: Testdaten, **erwartet**, **tatsächlich**, bestanden/nicht bestanden, Schlussfolgerung; `free` „Beurteilen Sie das Testprotokoll und nennen Sie die nötige Korrektur“ (Beispiel Schaltjahrregel: 29.02.1900 muss abgelehnt werden, 29.02.2000 ist gültig); `match` Review-Form ↔ Merkmal.
- Generator `p.testprotokoll`: Algorithmus mit Fehler (z. B. falscher Grenzwert `>` statt `≥`), 5 Testfälle, Schüler ergänzt Ist-Spalte; Fehlbild „Soll statt Ist eingetragen“. (Anschluss an `p.testcases`.)

### P2-1: Anpassungsstufen von Standardsoftware und Datenmigration

- Warum: Titel des Lernfelds; Beratungsfall „Standard anpassen oder neu entwickeln?“.
- Ziel: `b03-l01` um eine Tabelle Konfiguration / Parametrisierung / Erweiterungsprogrammierung / Neuentwicklung / Datenmigration erweitern, plus 3–4 Fragen (`match`, `free` Entscheidungsfall mit Kosten- und Zeitargumenten).

### P2-2: Vorgehensmodelle und Software-Lebenszyklus

- Ziel: `w05` (oder `p05-l08`) um Lektion „Vorgehensmodelle im Vergleich“: Wasserfall, Spiral, V-Modell, Scrum (Rollen, Artefakte, Sprintlänge ≤ 1 Monat), DevOps, Kanban/XP als Stichwort; Vorteil-/Nachteil-Matrix als `table`; Entscheidungsfälle (feststehende Anforderungen → Wasserfall/V; unklare Anforderungen → agil). Tätigkeiten den Phasen Analyse/Entwurf/Umsetzung/Test/Doku/Auslieferung/Wartung zuordnen (`match`). Namensunterschied zu den DIN-Projektphasen in `w05` ausdrücklich gegenüberstellen.

### P2-3: Entscheidungstabellen

- Ziel: neue Lektion in `p02` oder `p05` („Entscheidungstabelle lesen und aufstellen“).
- Regeln: n Bedingungen → 2ⁿ Regeln (vollständig); Konsolidierung gleicher Aktionen; Lesefragen („Wann erhält der Kunde X?“).
- **Generator `p.dectable`**: 2–3 Bedingungen (J/N), 2–3 Aktionen, zufällige Regelbelegung ohne Widerspruch; Fragen: Anzahl Regeln (2ⁿ), Aktion bei gegebener Kombination, Anzahl Regeln mit Aktion X. Werte: n ∈ {2, 3, 4}. Typische Aufgabenquelle: Rabattstaffel (10 % über 100 €, 3 % bei Vorkasse), Urlaubsanspruch, Zahlungsarten.

### P2-4: Dokumentation von Software, Kommentieren

- Ziel: `b05` oder `p05` Lektion: Entwickler- vs. Benutzerdokumentation (Projekt-, System-, Testdoku; Handbuch, Installationsanleitung, Schulungsunterlagen), Qualitätskriterien, Kommentarregeln. Aufgabentypen: `match` Dokument ↔ Zielgruppe; `free` „Welche Kommentare würden Sie löschen und warum?“ anhand eines Code-Schnipsels mit redundanten, veralteten und auskommentierten Zeilen; Belegaufgabe: Gliederung einer Installationsanleitung bewerten.

### P2-5: Datum und Zeit (ISO 8601, Systemzeit)

- Ziel: Lektion in `d04`: Warum Text-Datum riskant ist (02-06-24), ISO 8601 (`2026-11-04`, `2026-11-04T10:43+01:00`, sortierbar), Unix-Zeit (Sekunden seit 1.1.1970 UTC; Tag = 86 400 s), Y2038 (2³¹−1 = 2 147 483 647 s = 19.1.2038 03:14:07 UTC).
- Generator `data.unixtime` (optional, niedrig): „Wie viele Sekunden liegen zwischen zwei Zeitpunkten gleicher Tage“; Ganzzahl; Tage 1–30, Stunden/Minuten.

### P2-6: Daten- und Informationsarten, Datenbanksysteme im Überblick

- Ziel: kurze Lektion `d01-l07`: strukturiert/semistrukturiert/unstrukturiert (E-Mail, CSV, Video), Sicherheitsstufen im Vergleich zu BSI-Schutzbedarf (siehe Abschnitt 5), DBMS-Betriebskonzepte, relational vs. NoSQL (Dokument, Schlüssel-Wert, Spalten, Graph) mit je einem Einsatzfall. Aufgabentyp `match` und `free` („Warum eignet sich eine relationale DB nicht für …?“).

### P2-7: Weitere kleine Ergänzungen

- Schleifenschreibweise der Bücher (Abschnitt 5): Hinweiskasten in `p01-l02`/`p02-l05`.
- Prüfziffer/Luhn und gestaffelte Gehalts-/Urlaubsberechnung als zusätzliche `free`/`number`-Aufgaben in `p02`/`p03` (Algorithmus selbst formulieren; Soll-Wert mit Beispiel 1 · 74 → 6 nachrechnen).
- GUI-Editor, Bibliothek vs. Framework, Framework-Arten in `p05-l02` ergänzen (zwei Absätze).
- Object-Storage neben File/Block in `h02-l06`.
- Gleitkomma-Bitaufbau 1+8+23 / 1+11+52 als Randfrage in `p01-l04`.

### P3: AP2/Schulbonus

- **P3-1 Python-Brücke** (Details Abschnitt 6): Lektion/Modul „Python lesen“.
- P3-2 SQLite mit Python: nicht übernehmen.
- P3-3 Normalisierung/SQL-DCL/TCL: vorhanden bzw. AP2.
- P3-4 Entwurf Top-down/Bottom-up: höchstens als Glossarkarte.

---

## 5. Widersprüche und Korrekturen

### 5.1 Abweichungen Buch ↔ App (Konventionen, keine App-Fehler)

| Stelle | Buch | App | Empfehlung |
|---|---|---|---|
| **Fußgesteuerte Schleife** | `Wiederhole … solange Bedingung` (Bedingung = **Lauf**bedingung, S. 532) | `WIEDERHOLE … BIS Bedingung` (Bedingung = **Abbruch**bedingung), `p02.ts` ~Z. 404–418, Tabelle `p01.ts` ~Z. 125–137 | Hinweiskasten: „Manche Bücher schreiben `Wiederhole … solange`; dann gilt die Bedingung als Laufbedingung (wie `do … while`). In Prüfungen immer die in der Aufgabe vorgegebene Notation lesen.“ Fehlbilder in `p.trace.loop` ergänzen („Bedingung umgekehrt gelesen“). **Verwechslungsgefahr hoch**, weil die Klasse mit dem Buch lernt. |
| Zuweisung | `:=` | `←` (`p01.ts` ~Z. 125) | in der Konventionstabelle `:=` als gleichwertige Schreibweise nennen |
| Blockende | `Ende Verzweigung`, `Ende Schleife` | `ENDE WENN`, `ENDE SOLANGE`, `ENDE FÜR` | Synonymtabelle |
| Zählschleife | `Von i := 0 Bis 10 … Ende Schleife` | `FÜR i VON 0 BIS 10 … ENDE FÜR` | Synonymtabelle |
| Modulo | Operator `modulo` | `MOD` | Synonym |
| Projektphasen | Start, Planung, Durchführung, Kontrolle, Abschluss (S. 508–509) | DIN 69901-2: Initialisierung, Definition, Planung, Steuerung, Abschluss (`w05.ts` ~Z. 97–110) | Gegenüberstellung in `w05`; beide Begriffssätze akzeptieren |
| Softwareklassen | System-, Unterstützungs-, Anwendersoftware (ISO/IEC 2382) | System, Dienstprogramme, Entwicklung, Anwendung (`b03.ts` ~Z. 36–41) | Hinweis „Unterstützungssoftware = Dienstprogramme + Entwicklungssoftware“ |
| Sicherheitsstufen von Daten | öffentlich, intern, vertraulich, geheim (S. 479) | BSI-Schutzbedarf normal/hoch/sehr hoch (`s01`) | Beide erwähnen, Zuordnung zeigen; in Aufgaben mit dem im Beleg genannten Schema arbeiten |
| Binärpräfixe | „1996 eingeführt“ | „1998 … IEC“ (`m15.ts` ~Z. 729) | **App ist korrekter**; Buch nicht übernehmen |
| Einheitenschreibweise | „KB“ für 1000 Byte | „kB“ | Eingabeprüfung akzeptiert beide Schreibweisen (Prüfen) |
| Entwurf „Top-down“ | Entwurfsmethode | `m13` Fehlersuche | Begriffsdoppelung nur im Glossar klären |

### 5.2 Fehler und Fragwürdiges im Buch (nicht übernehmen)

| Stelle | Problem |
|---|---|
| S. 504 Audioformate | `.wav` und `.aiff` stehen unter „verlustbehaftet“. Falsch: beide speichern normalerweise **unkomprimierte PCM-Daten** (verlustfrei). Verlustbehaftet sind z. B. MP3, AAC, Ogg Vorbis. |
| S. 496 ISO 8601 | Zeitspanne als `2024-06-02P2025-02-21` notiert. Falsch: Intervalle werden mit `/` geschrieben (`2024-06-02/2025-02-21`), `P…` leitet eine **Dauer** ein (`P3M`). Ebenso ist „02-06-24“ kein ISO-8601-Datum (zweistelliges Jahr). |
| S. 471 Kompetenzcheck | Aussagenliste enthält „Windows 11 ist Anwendersoftware“ als zu bewertende Aussage; richtig ist Systemsoftware. Nur als Hinweis, kein Fehler im Fließtext. |
| S. 506 Datenschutz | nennt nur BDSG/Landesgesetze; maßgeblich ist die **DSGVO** (App `s02` korrekt). |
| S. 506 Integrität | verbindet Integrität mit „Schutz vor Verlust“; Verlust betrifft **Verfügbarkeit**, Integrität ist Unverfälschtheit (App `s01` korrekt). |
| S. 490 Unicode | Zeichenzahl „149 186“ gehört zu Unicode 15.0 (2022) und ist veraltet; nie als Wissensfrage übernehmen. |
| S. 494 Audio | „Spiele nutzen meist 22,05 kHz“ ist eine Pauschalaussage; Abtasttheorem (Abtastrate ≥ 2 × höchste Frequenz) fehlt. |
| S. 608–609 | Beispiel 2 zu m:n ohne Kreuztabelle (Spiel mit zwei Mannschafts-Fremdschlüsseln) ist ein Sonderfall und leicht missverständlich. |
| S. 617–618 SQL | `AUTOINCREMENT`, `MODIFY COLUMN` sind dialektabhängig (SQLite/MySQL); die Buchsyntax ist nicht Standard-SQL (App `d03.ts` ~Z. 820–822 benennt Dialekte korrekt). |
| S. 562–564, 574 Python | pauschales `except Exception as e` mit `e.args[0]`; mehrere `if` statt `elif`; für die Lehre nutzbar, als Stilvorlage nicht. |
| S. 488 Kompetenzcheck | Aufgabe „Vorzeichen-Bit bei 1010 …“ lässt offen, ob Vorzeichen-Betrag oder Zweierkomplement gemeint ist; in Aufgaben immer angeben. |

### 5.3 Echte Fehler in der App

**Keine gefunden.** Alle geprüften Fundstellen (`m15.ts` Binärpräfixe, `p01.ts` Wertebereiche und Operatoren, `p02.ts` Schleifen, `p05.ts` Teststufen/Debugger, `b03.ts` Softwarearten, `d02.ts` Chen-Notation) stimmen fachlich mit dem Buch bzw. sind genauer. Auffällig bleibt nur das ungesicherte Verständnis der Schleifenschreibweise (5.1).

---

## 6. Python statt nur Pseudocode: Einschätzung

**Ist-Zustand:** Es gibt keinen Fragetyp für Codeeingabe (`types.ts`: single, multi, number, text, ip, cidr, free, match, order, table, vlsm), keine Python-Ausführung und keine Python-Aufgaben. Python erscheint nur als Vergleichsspalte (Pseudocode | Python | Java/C#) in `p01-l02`, `p02` (zwei Tabellen) und in einzelnen Hinweisen.

**Sinnvoll?** Für AP1: nein als Hauptweg. Der Katalog verlangt sprachneutrale Algorithmen (Pseudocode oder Aktivitätsdiagramm) und die Aufgaben bringen ihre Notation mit. Für die Schule: ja als **begrenzte Brücke**, weil die Klasse Python lernt und Klassenarbeiten Python-Code lesen/schreiben lassen.

**Empfehlung (kleinste vollständige Lösung):** eine optionale Lektionsreihe `p06` „Python lesen und übersetzen“ (Relevanz `vertiefung`), ohne Ausführungsumgebung und ohne Code-Bewertung:

- Lektionen: (1) Einrückung als Block und typische Syntaxfehler; (2) Pseudocode ↔ Python zuordnen (`if/elif/else`, `while`, `for … in range(a, b)` mit **ausgeschlossenem** Ende, `//`, `%`, `and/or/not`, `==` vs. `=`, `input()` liefert Text); (3) Schreibtischtest an Python-Schnipsel; (4) `try/except`, Dateien mit `with open`, Listen; (5) Fehler finden (Off-by-one, `=` statt `==`, Einrückung).
- Fragetypen vorhandener Art: `number` (Ausgabe bestimmen), `text` (Zeilennummer des Fehlers), `match` (Pseudocode ↔ Python), `order` (Zeilen eines Programms in Reihenfolge; „Parsons-Aufgabe“), `free` (Fehler erklären).
- Generator `p.pyread`: wie `p.trace.loop`, Ausgabe aber als Python-Schnipsel angezeigt; Lösungswert gleich, nur Darstellungsvariante (Zählschleife `for i in range(a, b+1)`, Fußschleife als `while True: … if bed: break`). Aufwand klein, weil die Berechnungslogik schon vorhanden ist.
- Nicht tun: Python im Browser ausführen (Pyodide), Freitext-Code automatisch bewerten, `sqlite3`, PyCharm-Bedienung.

---

## 7. Nicht übernehmen

| Thema | Grund |
|---|---|
| Struktogramm und Programmablaufplan (S. 525–530; AB 295–298, 325) | im Katalog der 2. Auflage entfallen. Buch und AB nutzen sie als Standard; Aufgaben dort nur nach Pseudocode/Aktivitätsdiagramm übersetzen. |
| Datenflussplan | veraltet, auch laut Buch selten. |
| Programmiersprachen-Generationen, Sprachgeschichte (Ada Lovelace, Zuse), TIOBE/PYPL/RedMonk-Ranglisten | kein Prüfungswissen, Daten veralten sofort. |
| Entwicklerrollen und Soft-Skills-Listen (S. 472–474) | keine prüfbaren Fakten. |
| PyCharm-/IDLE-Bedienung, Python-Installation, Projektanlage | nicht prüfungsrelevant. |
| `sqlite3` mit Python (S. 626–629) | Programmierung, nicht AP1. |
| ANSI/SPARC-Drei-Ebenen-Architektur | nur Begriffswissen, AP2/Studium. |
| Hierarchische/Netzwerk-/Objektdatenbanken im Detail | historisch. |
| SQL-Teil (S. 614–626) | bleibt `vertiefung` (AP2); App-Modul `d03` deckt ihn über Buchniveau ab. |
| Normalisierung als eigenes Buchkapitel | Buch verweist auf Jahr 2; App deckt ab. |
| Gleitkommadarstellung im Bit-Detail, Oktal-/Maya-/römische Zahlen, „eigenes Zahlensystem entwerfen“ | prüfungsfern; höchstens Randfrage. |
| Datenherkunft Primär/Sekundär mit Statistik der Informationsquellen 2019 | reines Wissenswissen, wirtschaftlich ohne Prüfungsbezug. |
| Dauerhafter Ausbau von Marketingunterlagen, Evaluationsbögen, Teamprojektaufgaben (AB 357, 358) | Projektarbeit der Schule, nicht schriftlich prüfbar. |
| Englische Lesetexte (AB) | Sprachübung, kein AP1-Stoff (höchstens als Anregung für Fachenglisch). |

---

## 8. Offene Punkte

- Katalog der 2. Auflage nicht eingesehen: Einstufungen mit [unverifiziert] vor dem Bau prüfen (Entscheidungstabelle, TDD, Vorgehensmodelle, ISO 8601).
- Falls die Lehrkraft ein bestimmtes Pseudocode-Dialekt der Schule (Wiederhole-solange) verlangt: Klären und Hinweiskasten daran ausrichten.
- Tabellen aus dem OCR (ASCII-Tabelle S. 489, Zweierkomplementtabelle S. 487) vor einer Übernahme im PDF kontrollieren.
