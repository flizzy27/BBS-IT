# Buchauswertung WM-LF3-4: Westermann „IT-Berufe Lernfelder 1–5“, Lernfeld 3 und 4

Stand: 04.11.2026. Alles in eigenen Worten; Aufgabentexte sind nicht übernommen, nur Aufgaben-*Typen*, Muster und Zahlenkonventionen. Seitenangaben: Fachbuch (FB) = PDF-Seite = gedruckte Seite (an Seite 320 und 390 visuell geprüft). Arbeitsbuch (AB) = Seitenmarker der OCR = gedruckte Seite. Das AB hat **keinen Lösungsteil**; Lösungswege unten sind eigene Nachrechnungen.

---

## 1. Steckbrief

| Punkt | Befund |
|---|---|
| Titel | Westermann, IT-Berufe, Lernfelder 1–5 (Schulbuch/Fachbuch + Arbeitsbuch mit Lernsituationen) |
| Auflage | nicht erkennbar; Inhalte mit Stand 2023/2024 (GSK Edition 2023, BSI-Lagebericht 2023, KI-VO noch als „geplant“) |
| Umfang | LF3 = FB S. 280–399 (ca. 120 S.), LF4 = FB S. 402–466 (ca. 65 S.); AB LF3 = S. 166–214, AB LF4 = S. 216–256 |
| Lernfelder | LF3 Clients in Rechnernetzwerke einbinden; LF4 Schutzbedarfsanalyse im eigenen Arbeitsbereich durchführen |
| Modellbetrieb | JIKU IT-Solutions (Systemhaus); LF4 zusätzlich das BSI-Beispiel RECPLAST GmbH |
| Aufgabenstil | Schulbuch: „Kompetenzcheck“ mit Wahr/falsch-Listen, Diskussions- und Rechercheaufträgen. AB: Lernsituationen mit Tabellen, Zuordnungen, Datenblättern, Rechenaufgaben, Teamprojekten; zwei Teiltests in LF4 mit Punkteschlüssel |

**Gesamturteil Prüfungsrelevanz**

- **LF3: überwiegend AP1.** Netzaufbau, Adressierung, Protokolle, Verkabelung, Komponenten, Client-Einbindung, Diagnose, Dokumentation, Strom/USV und Backup sind klassische AP1-Stoffe. Nicht AP1 (laut Katalog 2. Auflage nur Teil 2): RAID (3.8.1), plus SDN, Switch-Durchschaltverfahren, Netztypen TN/TT/IT.
- **LF4: AP1-Kern.** Schutzziele, BSI-Grundschutz-Logik, Schutzbedarfsfeststellung (Maximumprinzip, Kumulation, Verteilung), TOM, Social Engineering/Schadsoftware, Datenschutz-Grundlagen. Das Buch ist hier inhaltlich nah am BSI-Standard 200-2, aber teils anders gegliedert als die App.
- **Die App ist in Netzwerk (m01–m16) und Sicherheit (s01–s05) deutlich tiefer als das Buch.** Der Nutzen der Auswertung liegt daher in (a) **Konventionskonflikten**, die Schüler:innen aus dem Schulbuch mitbringen, (b) wenigen echten Lücken (Komponenten-/Datenblattauswahl, IP-Konfiguration einstellen, Verfügbarkeitsrechnung, Strom/Drehstrom, Prozess-/Rollen-Aufgabenmuster in LF4) und (c) Aufgabenmustern.
- **Vorsicht Buchfehler:** Die WLAN-Tabelle (S. 320) hat verrutschte Zeilen, die Redundanzrechnung (S. 388) hat einen Zehnerpotenzfehler, „DSGVO gilt nur in Deutschland“ (S. 362) ist falsch, das Kapitel zu Gesetzen (S. 408–410) ist veraltet. Nicht ungeprüft übernehmen (siehe Abschnitt 5).

---

## 2. Gliederung mit PDF-Seiten

### Fachbuch LF3 (PDF S. 280–399)

| Kap. | Thema | PDF-S. |
|---|---|---|
| 3.1 | Netz des Ausbildungsbetriebs (Überblick, Verbundarten) | 280–283 |
| 3.2 | Hauptbestandteile: Netzarten/Netzbereiche (LAN, WLAN, VLAN, VPN, SAN, PAN, WAN …), Clients, Servertypen, Rechenzentren | 283–296 |
| 3.3 | Datenübertragung: Kenngrößen/Datenrate, Schnittstellenraten, Übertragungs- und Adressierungsarten, Medienzugriff, Ethernet-Frame, TCP/IP | 297–308 |
| 3.4 | Topologien, strukturierte Verkabelung (Kategorie/Klasse, Ethernet-Bezeichnungen), Medien (Kupfer, LWL, WLAN-Standards, WPAN), OSI/TCP-IP, Protokolle, ARP/DNS/DHCP, TLS/IPsec, Adressen (MAC, IPv4, IPv6, Ports), Komponenten (NIC, Switch, Router, AP), Normung | 309–345 |
| 3.5 | Clients einbinden: Anforderungen, Ist-Aufnahme, IP-Konfiguration (ipconfig/ip), Dokumentation, WLAN-Anbindung, Drucker, statisch/dynamisch/DHCP, Cloud-Dienste, Benutzer/AD/RADIUS | 346–364 |
| 3.6 | Funktion prüfen: ping, tracert, nslookup, Schnelltest, proaktive Wartung/Baseline | 365–370 |
| 3.7 | Komponenten auswählen und konfigurieren (NIC, Switch, SoHo-/Profi-Router, WLAN-Zugang, telnet/ssh) | 371–377 |
| 3.8 | Daten-/Netzsicherheit: RAID (379–382), Backup (382–385), Proxy/Firewall/DMZ/SDN (385–387), Verfügbarkeit und Redundanz (387–389) | 377–389 |
| 3.9 | Stromversorgung: Komponenten, USV-Typen, PoE, Formeln, Gefahren, Drehstrom, Wirkungsgrad/Laufzeit (389–396); Green IT (397–399) | 389–399 |

### Fachbuch LF4 (PDF S. 402–466; S. 400–401 und 467 sind Lernfeld-Aufmacher)

| Kap. | Thema | PDF-S. |
|---|---|---|
| 4.1.1 | Verantwortung, Zuständigkeiten, Rollen (Leitung, ISB, DSB, QMB, BSI-Rollen), Infoquellen | 403–407 |
| 4.1.2 | Gesetze/Standards: IT-SiG, BSIG, DSGVO, BDSG, TKG, ISO 27000, KI-Verordnung | 407–413 |
| 4.1.3 | IT-Grundschutz (10 Schichten, Bausteine), Schutzziele/Grundwerte, 14 Gebote (§ 64 BDSG), Gefährdungen, Anforderungen, Schadenskategorien | 413–424 |
| 4.1.4 | Aktuelle Bedrohungen, Malware-Arten, APT, Botnetz, DoS/DDoS | 424–430 |
| 4.1.5 | Social Engineering, Identitätsdiebstahl, Passwörter, MFA/SSO, Signatur, Verschlüsselung, pseudonym/anonym, Privacy by Design/Default | 430–437 |
| 4.2 | TOM und Sicherheitskonzept (13 Stichwort-Kontrollen, Auswahlkriterien Art. 32/BSI) | 437–440 |
| 4.3 | BSI-Sicherheitsprozess, Leitlinie, Sicherheitskonzept, Strukturanalyse, Schutzbedarfsfeststellung (RECPLAST) | 440–447 |
| 4.4 | Schutzbedarf JIKU: Software/Office/Container (448–456), Clients (456–461), mobile Datenträger (461–466) | 448–466 |

### Arbeitsbuch (Lernsituationen)

LF3: LS1 Überblick (S. 167–175) · LS2 Grundlagen/Berechnungen/Verkabelung/Adressen (176–192) · LS3 Clients einbinden, Ping/Wireshark/DNS (193–200) · LS4 Komponenten auswählen (201–204) · LS5 Backup/RAID/Verfügbarkeit (205–208) · LS6 Strom/USV (209–210) · Bonus WLAN-Analyse (211–214).
LF4: LS1 Grundlagen + Test „Grundschutz Einstieg“ (217–235) · LS2 TOM (236–240) · LS3 Schutzbedarf am BSI-Beispiel + Test „Praktiker“ (241–245) · LS4 Schutzbedarf Software/Clients/mobile Datenträger (246–256).

---

## 3. Auswertung je Thema

Legende Relevanz: `ap1` / `ap1-teilweise` / `ap2` / `unnötig`. Abdeckung: `voll` / `teilweise` / `fehlt` (Modul-ID). Relevanzurteile sind aus dem Katalogauszug (docs/AP1-RELEVANZ.md) abgeleitet und nicht an Originalprüfungen verifiziert.

### 3.1 LF3: Netzgrundlagen und Datenübertragung

| Thema (FB-S.) | Kernaussagen (eigene Worte) | Aufgabentypen / Konventionen | Relevanz | Abdeckung App |
|---|---|---|---|---|
| Netzaufgaben/Verbundarten (282) | Netz bringt Kommunikations-, Daten-, Funktions-, Ressourcen-, Last- und Sicherheits-/Verfügbarkeitsverbund; zentrale Datenhaltung = Konsistenz, Redundanz = Verfügbarkeit | Begriffe erläutern, Wahr/falsch zu Datacenter/LAN | ap1-teilweise | voll (m01) |
| Netzbereiche (286–288) | privat vs. öffentlich; LAN, WLAN, VLAN, VPN, SAN, PAN, WAN, LPWAN, MAN, GAN; Intranet vs. Internet; Telefonnetz leitungsvermittelt, Internet paketvermittelt | Zuordnung Begriff ↔ Merkmal; „bei welchem Netz exklusive Leitung?“ | ap1-teilweise | teilweise (m01: PAN/LAN/MAN/WAN/GAN; **fehlt**: leitungs- vs. paketvermittelt, PSTN, Extranet, LPWAN) |
| VPN-Arten (288–290) | Tunnel = verschlüsselte Pakete in Internet-Paketen; End-to-Site (Homeoffice), Site-to-Site (Niederlassung), End-to-End (zwei Rechner) | Wahr/falsch, Zuordnung Szenario ↔ VPN-Art | ap1 | voll bis auf End-to-End (m11, m14) |
| Clients (290–293) | Fat Client (alles lokal), Thin Client (Terminal, Desktop als VM auf Terminalserver, wenig Datenverkehr, geringer Strombedarf, kein USB-Schadcode), BYOD (Sicherheitsrisiko), Embedded/CPS (niedrige Datenrate, aber geringe Latenz) | Anforderungsprofil ↔ Gerätetyp zuordnen (5 Standardrechner, 10 Arbeitsplätze) | ap1 | teilweise (h01, b04, s05; **fehlt**: CPS/Embedded/Sensor-Aktor-Clients) |
| Client-Server vs. P2P, Servertypen (293–295) | Jeder Rechner mit Freigabe kann Server sein (P2P); professionell immer Client-Server; Servertypen File/Print/Mail/DNS/Web/Anwendung/NAS/Terminal | Wahr/falsch, Servertyp ↔ Dienst | ap1 | voll (m01, m11) |
| Rechenzentren (295–296) | On-Premises (Strom, Klima, Anbindung selbst), Off-Premises/Cloud, **Colocation** (eigene Hardware im fremden RZ, Anbieter liefert Strom, Kühlung, Anbindung, Zutritt) | Vor-/Nachteile; Empfehlung bei schlechter Internetanbindung (→ lokal/Colocation prüfen) | ap1-teilweise | teilweise (b04; **Colocation fehlt**) |
| Datenrate (299–302) | C = D/t; t = D/C; Rate immer dezimal; Datenmenge meist binär (laut Buch); Signalgeschwindigkeit ≈ 2/3 c bei Kupfer **und** Glas; Glas ist nicht „schneller“, nur höhere Rate | Übertragungszeit, Rate aus Zeit (z. B. Datei in 0,5 s), Paket 1000 Byte bei 100 Mbit/s, Paket über 1000 km, HDD/SSD/USB-Speicherzeit (Mbit/s vs. MByte/s) | ap1 | voll (m15, `calc.*`) |
| Schnittstellenraten (302) | Tabelle USB, Thunderbolt, SATA, SAS, FC, Ethernet, DSL, RS232 (Bit/s vs. Byte/s beachten) | Raten lesen und umrechnen | ap1 | voll (h02, h03, m15) |
| Übertragungsarten (302–303) | seriell/parallel; simplex, halb-/vollduplex; Multiplex (Zeit/Frequenz/Wellenlänge); Unicast/Multicast/Broadcast/Anycast | Begriff ↔ Beispiel | ap1-teilweise | voll bis auf Multiplex (m12, m07) |
| Medienzugriff (304–305) | Listen before talk; CSMA/CD (LAN, Kollisionserkennung, Backoff), CSMA/CA (WLAN, RTS/CTS), Token Passing (historisch) | Kürzel ausschreiben, Verfahren LAN vs. WLAN nennen | ap1-teilweise | teilweise (m12: CD/CA; RTS/CTS, Token nur am Rand) |
| Ethernet-Frame (306–308) | Preamble 8, Ziel-MAC 6, Quell-MAC 6, Typ 2, Nutzdaten 46–1500, FCS 4; Overhead 18 B; MTU 1500; Typ 0x0800 = IPv4, 0x86DD = IPv6; VLAN-Tag 4 B (TPID 0x8100, 3 Bit Priorität, 1 Bit DEI, 12 Bit ID) | max./min. Framegröße, Frame bei 2-Byte-Nachricht (Auffüllen auf 46), Typfeld deuten, Prioritätsstufen (8) | ap1 | voll (m02, m08) |
| TCP/UDP, Ports, Socket (307–308, 337–338) | TCP verbindungsorientiert/quittiert/Flusskontrolle, UDP verbindungslos; Ports 16 Bit; well-known 0–1023, registriert 1024–49151, dynamisch 49152–65535; Socket = IP:Port, zwei Sockets pro Verbindung | Port-Tabelle ergänzen (22, 53, 80, 110, 143, 443, 631, 1194 …) | ap1 | voll (m02, m10); **Ports 2049 NFS, 546/547, 631 IPP, 5060 SIP, 8080 fehlen in der Haupttabelle m10** |

### 3.2 LF3: Verkabelung, Medien, Adressen, Komponenten

| Thema (FB-S.) | Kernaussagen | Aufgabentypen / Konventionen | Relevanz | Abdeckung App |
|---|---|---|---|---|
| Topologien (309–311) | Stern, erweiterter Stern/Baum (Standard im LAN), vollständige/unvollständige Masche, Zelle, P2P, Bus, Ring; Fehlersuche im Stern leicht | Wahr/falsch, drei häufigste Topologien beschreiben (Fehlersuche, Leitungsverbrauch) | ap1 | voll (m01) |
| Strukturierte Verkabelung (311–314) | Primär (SV–GV, LWL), Sekundär (GV–EV, LWL/Kupfer), Tertiär (EV–TA, Kupfer); Permanent Link max. 90 m, Channel max. 100 m; Sammelpunkt (TA als CP) als einzige Ausnahme von „keine Unterverteiler“; Faustformel 1 EV je ca. 1000 m²; Dosen-Beschriftungsschema Gebäude-Etage-Verteiler-Patchfeld-Steckplatz; Etagen ab 0 zählen | Lageplan mit SV/GV/EV zeichnen (AB), Kabelwahl begründen, Permanent-/Channel-Link-Längen, Dose/Patchplan beschriften | ap1 | teilweise (m12 sehr gut; **fehlt**: Beschriftungsschema, 1000-m²-Regel, Sammelpunkt) |
| Kategorie vs. Klasse (314–315) | Kategorie = Komponente (Bandbreite), Klasse = installierte Strecke (D, E, EA, F, FA); Messung nach Verlegung; schlechte Verarbeitung kann die Klasse verfehlen | Kategorie ↔ Datenrate/Frequenz | ap1 | teilweise (m12 nur Kategorien; **Klassen D/E/EA/F/FA fehlen**) |
| Ethernet-Bezeichnungen (315–317) | 10Base-T bis 100GBase-…; Reichweiten; T1-Varianten (ein Paar, Auto/IoT) | Standard ↔ Datenrate verbinden (AB 190) | ap1 | voll (m12) mit abweichenden Werten, siehe 5. |
| Kupfer (318) | 4 Paare, AWG22–24 (Durchmesser 0,644/0,572/0,511 mm), Schirmung S/FTP, F/UTP, SF/UTP, U/UTP, Verdrillung gegen Störstrahlung | Datenblätter lesen, AWG-Beziehung (größere Zahl = dünner), warum AWG26/7-Patchkabel nicht für Dauerverlegung/PoE-Geräte | ap1 | teilweise (m12: Schirmung ja; AWG-Beziehung/Litze vs. Draht nur am Rand) |
| LWL (318–320) | Totalreflexion; Multimode 50/62,5 µm (OM1–OM5), Singlemode 9 µm (OS1/OS2); modale Bandbreite B′ = B·l (500 MHz·km ÷ 2,5 km = 200 MHz); Dämpfung dB/km nach Wellenlänge | Rechenbeispiel Bandbreite-Längenprodukt; Faserklassen | ap1-teilweise | teilweise (m12: Typen, Farben, Reichweiten; **B·l und dB/km fehlen** → P3) |
| WLAN-/WPAN (320–321, 375–376) | 802.11 a/b/g/n/ac/ax/be, Bänder 2,4/5/6 GHz, Ad-hoc vs. Infrastruktur, Teilnehmer teilen Bandbreite; Bluetooth/ZigBee; WPS, PSK, QR-Code, WPA2/WPA3, RADIUS/802.1X; dBm (20 dBm = 100 mW) | Standard ↔ Band/Rate; PSK vs. Enterprise erklären; WLAN-Analyse-App (AB 213) | ap1 | voll (m12, m14); **dBm/Feldstärke lesen fehlt** |
| OSI/TCP-IP (321–324) | 7 vs. 4 Schichten, Geräte ↔ Schicht (Hub 1, Switch 2, Router 3), Kapselung/Entkapselung | Tabelle ausfüllen (AB 191) | ap1 | voll (m02) |
| Protokolle (324–330) | Liste HTTP(S), SMB, FTP/SFTP, SMTP, POP3, IMAP, TLS, TCP, UDP, QUIC, IP, IPsec, ARP, DNS, DHCP, ICMP, SNMP; ARP-Ablauf; DNS A/AAAA; DHCP-DORA; symmetrisch/asymmetrisch/hybrid; TLS-Handshake; IPsec AH/ESP, Transport/Tunnel | Abkürzung + Langform + Aufgabe (AB 191) | ap1 | voll (m10, m11, m14); **IPsec AH vs. ESP/Transport vs. Tunnel fehlt**, Schichtzuordnung abweichend (siehe 5.) |
| MAC-Adresse (331) | 48 Bit, OUI + Seriennummer, Bit 0 = Multicast, Bit 1 = lokal administriert, Broadcast ff-…-ff | Tabelle Adresstypen ausfüllen | ap1 | voll (m08) |
| IPv4 (331–335) | Netz-/Hostanteil, UND-Verknüpfung, CIDR vs. dotted decimal, 2^H − 2, Klassen historisch, Spezialadressen, private Bereiche | „In welchem Netz liegt Host x/n“ (Präfixe /8, /16, /24, /29, /30), gültige Adressen erkennen, Broadcast bei 255.255.240.0 und /30, private Bereiche (1/16/256 klassische Netze) | ap1 | voll (m03, m05) |
| IPv6 (334–337) | 128 Bit, /64-Interface-ID, Provider /32, Kunde /48 oder /56, Kürzen (nur eine ::), Typen (GUA 2000::/3, LL fe80::/10, ULA fc00::/7, MC ff00::/8, ::1, ::), Site-Local veraltet, SLAAC + meist DHCP, URI mit [ ] | Kürzen, Typ erkennen, Subnetzbits berechnen | ap1-teilweise | voll (m07) |
| Komponenten (339–344) | NIC; Hub/Repeater (L1); Bridge/Switch (lernt MAC, FIFO-Puffer, Weiterleitungstabelle); Switchtypen Cut-through/Fast-forward/Store-and-forward; managebar (Web, SSH, VLAN, Spiegelport); Router (Routingtabelle, TTL −1, Default-Route); AP | Wahr/falsch Switch (15 Aussagen, AB 201), Funktionsweise Switch vs. Router (Adressen, Schichten) | ap1 (Funktion), ap2 (Durchschaltverfahren) | teilweise (m01, m08, m09 voll; **managebar/unmanaged und Durchschaltverfahren fehlen**) |
| Normung (344–345) | ISO, IEC, ITU, IEEE, IETF, NIST, ANSI, DIN; CEN/CENELEC/ETSI; IEEE 802.x, EN 50173 | Gremium ↔ Aufgabe | ap1-teilweise | fehlt (nur Normnummern in m12) → P3 |

### 3.3 LF3: Client-Einbindung, Prüfung, Auswahl, Sicherheit, Strom

| Thema (FB-S.) | Kernaussagen | Aufgabentypen / Konventionen | Relevanz | Abdeckung App |
|---|---|---|---|---|
| Anforderungen/Netzlast (346–348) | Vor dem Einbinden: Datenrate abschätzen (CAD-Station hoch, Büro gering, Streaming dauerhaft), Netztechnik und Ist-Zustand klären; Task-Manager zeigt **Byte/s**; Überschlag 300 kB/s ≈ 2,4 Mbit/s → ca. 40 Clients an 100 Mbit/s, 400 an 1 Gbit/s | Ladezeit bei verschiedenen Standards; Clients pro Leitung | ap1 | teilweise (m15: Auslastung; **„Clients pro Leitung“ fehlt**) |
| IP-Konfiguration (348–351, 356–359) | vier Bestandteile: IP, Maske, Gateway, DNS; `ipconfig`, `ipconfig /all`, `ip address`, `ip route`; Metric (niedriger = bevorzugt); Lease, DHCP-Server, MAC lesen | ipconfig-Ausgaben auswerten, gleiches Subnetz prüfen (IP …210 mit Maske …128 und GW …1), Gültigkeit/Lease aus /all lesen | ap1 | voll (m13, m16); **Einstellen von Hand (GUI, netsh, nmcli) fehlt** |
| Ist-Aufnahme, Dokumentation (348–353) | Doku gehört dem Betreiber und wird laufend gepflegt; Lagepläne, Listen, Messprotokolle, Netzpläne, IP-Bereiche; je Leitung Messprotokoll mit PASS/FAIL (Länge, Pinbelegung, Dämpfung, Übersprechen, Laufzeit) | Netzplan mit 192.168.200.64/26 zeichnen und IP-Konfigurationen ergänzen, Abnahme-/Übergabeformular entwerfen | ap1 | teilweise (m16, b05, w05; **Messprotokoll-Inhalte nur 1 Satz in m12**) |
| WLAN-Anbindung, Drucker (354–356) | Client einbinden = patchen, IP prüfen, Server/Internet testen, dokumentieren; Drucker suchen, Treiber, Testseite; PSK vs. RADIUS/802.1X | Schritte nennen | ap1 | voll (m12, m14, b06) |
| Statisch/dynamisch/DHCP (359–360) | Server statisch, Clients dynamisch; DHCP-Reservierung (statisches DHCP); Lease-Erneuerung nach 50 % | Ablauf-Reihenfolge, Vor-/Nachteile | ap1 | voll (m11, T1/T2) |
| Cloud nutzen (361–363) | Speicher/Office in der Cloud: Vorteile (Sync, Versionen, immer aktuell), Nachteile (Datenschutz, Abhängigkeit); Daten vor dem Upload verschlüsseln; **Buchfehler:** „DSGVO gilt nur in Deutschland“ | Wahr/falsch, Einsatzszenarien Cloud vs. eigenes RZ (AB 182) | ap1 | voll (b04, s02) |
| Benutzer/AD/RADIUS (363–365) | lokal vs. Netzwerkbenutzer (AD); RADIUS = AAA (Authentifizierung, Autorisierung, Accounting) | Benutzer per GUI und Konsole (`net user`) anlegen, Batch-Datei mit Parameter | ap1 | teilweise (b02, m14: AAA ja; **Windows-Konsole `net user`/Batch fehlt**) |
| Ping/Tracert/nslookup (365–369) | Echo Request/Reply = RTT; Windows 4 Pakete à 32 Byte; TTL-Trick bei traceroute; Ping kann durch Firewall geblockt sein; `nslookup` (optional mit DNS-Server), `dig`; **Schnelltest**: ein Ping auf externen Namen prüft IP, Gateway und DNS zugleich | Parameter -n/-l/-t ausprobieren, Wireshark-Filter `icmp`, RTT aus Mitschnitt | ap1 | voll (m13); Schnelltest als Begriff fehlt, Wireshark nur m14 |
| Wartung (369–370) | reaktiv vs. proaktiv; Systemüberwachung mit Bordmitteln; **Baseline** = Normalwerte (CPU, RAM, Rate, RTT) | Auslastung beobachten (AB 200) | ap1-teilweise | teilweise (b06: proaktiv/reaktiv; **Baseline fehlt**) |
| Komponentenauswahl (371–377) | NIC: Standard, Rate, Medium, Bauform, PCIe, Portzahl. Switch: Bauform (19″/10″/Tisch), Betriebsart, Port-Raten, **PoE-Speisung (PSE)**, Management (VLAN, STP, Mirroring), MAC-Tabellengröße, Puffer. Router: SoHo (WAN-Port, 2–4 Switchports, AP, DHCP, TK, USB-NAS, Kindersicherung, DynDNS, VPN) vs. Profi (19″, SSH/CLI-Konfiguration, kein AP/DHCP); telnet unverschlüsselt → ssh | Switch aus drei Modellen auswählen (24 Ports, 9 PCs, 2 Drucker, 9 IP-Telefone → PoE nötig, Preis-Leistung), Router-Lückentext, SoHo/KMU/Profi anhand Datenblatt-Auszug | **ap1** (Katalog: „Leistungsdaten von Netzwerkkarte, Router, Switch“) | **fehlt** (kein „managebar/unmanaged“, kein SoHo-Router, keine Auswahlaufgabe; nur PoE-Budget in m12) |
| RAID (379–382) | Level 0/1/4/5/6, 10/01/51, Hardware vs. Software, Hot-Spare, JBOD; Buch-Schreibweise RAID (n,m): Kapazität (n−m)·C, Leserate n·R, Schreibrate (n−m)·R | Nutzkapazität bei 4×1 TB RAID 5/6, 2×1 TB RAID 0/1; Zuverlässigkeit vergleichen | **ap2** (Katalog 2. Aufl.) | App: nur „RAID ≠ Backup“ (h02, s03, m14), Details laut h02 „AP2“ → **konsistent, nicht nachziehen** |
| Backup (382–385; AB 205–207, 238) | Ursachen Datenverlust; Test von Sicherung **und** Rücksicherung; Off-Premises (Abstand), Band (Rotation 4 Tages-/4 Wochen-/12 Monatsbänder), Cloud-Checkliste (Verfügbarkeit, Recovery-Zeit, Standort, Fremdzugriff); Voll/differenziell/inkrementell; Image-Backup; 3-2-1; Generationenprinzip; BSI-Minimalkonzept | 1 TiB bei LTO-8 mit 360 bzw. 900 MB/s, Zeitfenster Nacht/Schicht prüfen, Rotationsschema ausfüllen | ap1 | voll (s03, `sich.backup*`) |
| Proxy/Firewall/DMZ/SDN (385–387) | Proxy = Stellvertreter (Cache, Sperrlisten, Adressverbergung); Firewall-Typen (Paketfilter nach IP/Port bis Inhaltsprüfung); DMZ zwischen zwei Firewalls; SDN: Controller + einfache Switches | „Wozu DMZ/Proxy?“, Firewall/DMZ als VM aufbauen | ap1 (Proxy, Firewall, DMZ), ap2 (SDN) | voll (m14, m11) |
| Verfügbarkeit/Redundanz (387–389) | A = t_up/t_ges = 1 − t_down/t_ges; Jahr = 8760 h = 525 600 min; Tabelle 99 % = 87,6 h … 99,999 % ≈ 5,2 min; Redundanz: p_ges = pⁿ | 95 % Drucker: Up-/Downtime, 99,95 % pro Monat, Ausfallwahrscheinlichkeit Strom + USV (Netz 99,998 %, USV 95 %) | ap1-teilweise | teilweise (b06 `sys.sla` voll für Ausfallzeit/SLA; **Redundanzrechnung p^n / Reihe-Parallel fehlt**) |
| Strom (389–396; AB 209–210) | 230 V/50 Hz, Effektiv- vs. Spitzenwert (325 V), T = 20 ms; Schuko 16 A = 3,68 kW; Drehstrom 3×230 V (400 V Phase–Phase), Last gleichmäßig verteilen, 2 Netzteile an verschiedene Phasen; P = U·I, W = P·t, S = U·I, cos φ, η; USV-Typen VFI/VI/VFD; Gesamt-η = Produkt; Überbrückungszeit t = W/P; Netzersatzanlage; PoE 802.3af/at/bt | 5 Server à 500 W an einer Phase (Strom, 16 A reicht?), Rack 2×500 + 400 W, 1 kVA bei cos φ 0,9, USV-Laufzeit aus 2×12 V/10 Ah bei 90 % η, Leistungsbedarf Datacenter (Kühlung mitzählen) | ap1 (P=U·I, W=P·t, USV), ap1-teilweise (Drehstrom) | teilweise (h04 voll: USV, cos φ, η, Stromkosten, 3,68 kW; **Drehstrom/Phasenverteilung, Effektivwert/Periodendauer fehlen**) |
| Gefahren Strom (391–393) | Wahrnehmung ca. 1 mA, Loslassgrenze ca. 10 mA, Herzkammerflimmern ab ca. 50 mA; IT-Fachkraft ist Laie, kein Arbeiten an Anlagen > 50 V AC/120 V DC, Steckdose/Sicherung nicht selbst; freischalten, gegen Wiedereinschalten sichern | Was dürfen IT-Fachleute nicht (Liste) | ap1-teilweise (Arbeitsschutz) | teilweise (h05: DGUV V3, Elektrofachkraft am Rande; **Grenzwerte/Laienregel fehlen**) |
| Green IT (397–399) | Refurbished, Energiesparoptionen, Standby, Schaltsteckdosen; typische Leistungen (Router 10–30 W, Switch 5–10 W, Gaming-PC bis 300 W, Idle 50–100 W); Google-Suche 0,3 Wh | Dauerbetrieb-Kosten (100 W × 8760 h × Preis), Einsparpotenzial nennen | ap1 | voll (h04, `hw.stromkosten`) |

### 3.4 LF4: Informationssicherheit

| Thema (FB-S.) | Kernaussagen | Aufgabentypen / Konventionen | Relevanz | Abdeckung App |
|---|---|---|---|---|
| Rollen (403–407; AB 233) | Oberste Leitung trägt die Gesamtverantwortung und stellt Ressourcen; ISB und DSB setzen um; DSB-Pflicht ab 20 Personen mit ständiger automatisierter Verarbeitung (§ 38 BDSG); MUSS = verbindlich, SOLLTE = i. d. R. umsetzen; BSI-Rollenliste im GSK | Wahr/falsch („der ISB ist an oberster Stelle verantwortlich“ = falsch) | ap1 | teilweise (s02: DSB; **Leitungsverantwortung, ISB/DSB/QMB-Abgrenzung fehlen**; MUSS/SOLLTE in s01) |
| Gesetze/Standards (407–413) | IT-SiG/BSIG (KRITIS), DSGVO (Bußgeld bis 20 Mio. €/4 %), BDSG, TKG/TMG, UrhG, ISO 27001 (ISMS), ISO-27000-Familie, KI-VO mit 4 Risikostufen | Vorfall ↔ Gesetz zuordnen, Wahr/falsch (IT-SiG für kleinen Shop = falsch) | ap1-teilweise | teilweise (s02: DSGVO/BDSG voll; p05: KI-VO aktuell; s01: ISO 27001; **BSIG/NIS2/KRITIS fehlen**; Buchstand veraltet) |
| IT-Grundschutz (413–417) | 10 Schichten: Prozess (ISMS, ORP, CON, OPS, DER) und System (APP, SYS, IND, NET, INF); 47 elementare Gefährdungen; Standards 200-1…200-4; Anforderungen Basis/Standard/erhöht; Kompendium jährlich; Grundschutzprofile | Baustein-Kürzel ↔ Zielobjekt (Arbeitsplatzrechner, Browser, WLAN, Sicherheitsbeauftragter, Stromschwankung, IoT-Sensor …), Wahr/falsch (Kompendium alle 3 Jahre = falsch) | ap1 | voll (s01-l04) |
| Schutzziele (417–419) | V, I, A; BSI nennt sie Grundwerte; Authentizität ist nach BSI **Teilziel der Integrität**; Art. 32 DSGVO | Schutzziele V/I/A ↔ Grundwerte C/I/A (Sprachwechsel), Wahr/falsch | ap1 | voll (s01-l01), abweichende Einordnung der Authentizität (siehe 5.) |
| TOM/Gebote (418–419, 437–440) | Liste „14 Gebote“ (§ 64 BDSG) **und** 13 Stichwort-Kontrollen (Zutritt, Zugang, Zugriff, Weitergabe, Eingabe, Auftrag, Verfügbarkeit, Trennung u. a.); Auswahl der TOM nach Art. 32 (Stand der Technik, Kosten, Art/Umfang/Zweck, Eintrittswahrscheinlichkeit, Schwere) und BSI-Kriterien (Wirksamkeit, Eignung, Praktikabilität, Akzeptanz, Wirtschaftlichkeit) | Fall ↔ verletztes Kriterium (5 + 11 Fälle), Maßnahmen ↔ Kontrolle | ap1 | teilweise (s02: 8 Kontrollen sehr gut; **§-64-Liste und beide Kriterienlisten fehlen**) |
| Gefährdungen/Schadenskategorien (419–423) | Bedrohung → Schwachstelle → Gefährdung; **4 Schadenskategorien** gering/mittel/hoch/sehr hoch, davon 3 Schutzbedarfskategorien normal/hoch/sehr hoch; Schadensszenarien direkt/materiell vs. indirekt/immateriell; Einflussfaktoren: tolerierbare Ausfallzeit, Notfallpläne, Kumulation, Verteilung, Maximalfälle | „Welche vier Schadenskategorien?“, Wahr/falsch (5 Kategorien = falsch) | ap1 | teilweise (s01-l05: 3 Kategorien + 6 Szenarien; 4 Stufen nur in der Risikomatrix s01-l02; **Zuordnung 4 → 3 fehlt**) |
| Bedrohungen/Malware (424–430) | Ransomware, Phishing, Wurm/Virus/Trojaner, PUA, Scareware, Hoax, APT, Botnetz/C&C, DoS (SYN-/Ping-Flood, Mailbombing), DDoS; BSI-Lage 2023 | Stichwort ↔ Beschreibung (11 Begriffe), Wahr/falsch (12 Aussagen) | ap1 | voll (s01-l03); **Hoax, PUA, SYN-Flood, Doxing, Combosquatting fehlen** (P3) |
| Social Engineering, Authentifizierung, Verschlüsselung (430–437) | CEO-Fraud, MitM, Keylogger, Jailbreak/Rooting, Black-/Whitelisting, Passwortregeln, MFA/SSO, qualifizierte Signatur (eIDAS), PGP vs. S/MIME, TLS nur Transport, pseudonym vs. anonym, Privacy by Design/Default | Maßnahme ↔ Anforderung (5), Schlüsselwort-Zuordnung (9), URL-Betrug erkennen, Schaubild sym./asym./hybrid benennen (AB 240) | ap1 | voll (s01, s04, s05, m14, s02) |
| Sicherheitsprozess (440–442; AB 242) | 6 Phasen: Initiierung → Leitlinie → Organisation → Konzeption → Umsetzung → Aufrechterhaltung/Verbesserung; vor der Schutzbedarfsfeststellung: Leitlinie, Sicherheitskonzept (Erstaufnahme), Strukturanalyse | Phasen sortieren (6 P.), 14 Teilaufgaben den 4 Hauptaufgaben zuordnen (Leitlinie/Konzept/Strukturanalyse/Schutzbedarf) | ap1 | teilweise (s01-l04: 8-Schritt-Ablauf nach 200-2, aber **anderer Schnitt**; Leitlinie/Konzept-Zuordnung fehlt) |
| Strukturanalyse (443–444) | Informationsverbund; Prozesse, Anwendungen, IT-Systeme, Räume, Verbindungen; Netzplan; Systeme-Anwendungs-Matrix | Zuordnungstabelle lesen | ap1 | teilweise (s01 nennt Schritt; **Begriff „Informationsverbund“ fehlt komplett**) |
| Schutzbedarfsfeststellung (444–447; AB 244–245) | Reihenfolge Anwendungen → Systeme → Räume → Verbindungen; je Grundwert Kategorie **mit Begründung**; Tabellenköpfe: Kürzel, Bezeichnung, Beschreibung, Art, Lokation, IT-Systeme, Grundwert, Schutzbedarf, Begründung; Maximumprinzip; Kumulation (Beispiel Virtualisierungsserver, Schutzziel **Vertraulichkeit**); Verteilung (Verfügbarkeit, Lastausgleich) | Wahr/falsch (Kumulation, Verteilung, Maximum, „Minimumprinzip = falsch“), 17-Punkte-Aufgabe „welche Spalten“, eigene Tabellen mit Begründung | **ap1 (Kern)** | teilweise (s01-l05 + `sich.maximum`: Maximum **voll**; Kumulation/Verteilung nur mit Verfügbarkeitsbeispiel; **Räume/Kommunikationsverbindungen nur kurz, keine Tabellenaufgabe mit Begründungstext**) |
| Software/OS/Office/Container (448–456) | Gefährdungen Software (u. a. Testversionen, unsichere Quellen); Basis: Integrität, Installationsanweisung, Lizenzverwaltung, vollständige Deinstallation; OS: minimales System, Ports sperren, Updates, Logs; Office: aktive Inhalte, Viewer, Metadaten entfernen; Container: Images, Persistenz, Host sichern | Mehrfachauswahl Maßnahmen; Schutzbedarf „EasyTravel“ (Integrität hoch wegen Datenbank, Verfügbarkeit normal) | ap1 (Software/Office/OS), ap2 (Container) | teilweise (s05, s03, b03: Makros, Whitelisting, Härtung ja; **Metadaten/Viewer, Deinstallation, Container fehlen**) |
| Clients (456–461) | Client-Schutzbedarf mindestens so hoch wie Daten/Software (Maximum); Gefährdungslage; Maßnahmen: Authentisierung, Rollentrennung, Updates, Backup, Bildschirmsperre, Virenschutz, Protokollierung, Boot-Absicherung (kein Booten von Wechselmedien), Verschlüsselung | Ereignisse ↔ Gefährdungskategorie (A–D), Laptop Außendienst: V/I hoch, A hoch (Image) | ap1 | voll (s05, s01) |
| Mobile Datenträger (461–466) | Arten: Wechsel-, externe, integrierte Datenträger; USB-Sticks häufigster Fall; Maßnahmen: Verlustmeldung, Kennzeichnung, sicheres Löschen (nicht nur Löschbefehl), Verschlüsselung, Versandregeln, Datenträgerverwaltung | Arten mit je 2 Beispielen, 3 Bedrohungen + Maßnahme, Schutzbedarf Anwaltskanzlei (V/I sehr hoch) | ap1 | teilweise (s05: USB-Sperre, DIN 66399; **Arten, Verlustmeldung, Kennzeichnung, Datenträgerverwaltung fehlen**) |
| Urheber-/Markenrecht (AB 226–230) | UrhG-Schutz für Programme (persönliche geistige Schöpfung, § 69a ff.), Arbeitgeber (§ 69b), Bilder/Einwilligung, Unterrichtsprivileg 15 %, Quellenangabe, Abmahnung/Strafe (3/5 Jahre), MarkenG | Wahr/falsch-Blöcke (ca. 30 Aussagen) | ap1-teilweise | teilweise (w04, b03: Software voll; **Bild-/Markenrecht fehlt**) |

---

## 4. Lückenliste

### P1: AP1-relevant und fehlend/schwach

| # | Thema | Warum relevant | Ziel-Modul | Vorschläge Lektion und Aufgabentypen |
|---|---|---|---|---|
| 1 | **Netzwerkkomponenten nach Datenblatt auswählen** (NIC, Switch, SoHo-/KMU-/Profi-Router, AP) | Katalog nennt Leistungsdaten von Netzwerkkarte, Router, Switch; AP1 liefert Datenblatt-Belege. In der App fehlt „managebar/unmanaged“, SoHo-Router, Auswahlkriterien komplett. | neue Lektion in **m08** (Switch) + **m09/m12** (Router/AP), Praxisaufgaben in **m16** | Inhalte: Kriterienliste Switch (Portzahl + Reserve, Port-Raten, PoE-Ports und -Budget, managebar: VLAN/STP/Mirror/SSH, MAC-Tabelle, Uplinks/SFP, Bauform 19″), Router-Klassen (SoHo: Modem, AP, DHCP, USB-NAS, DynDNS; Profi: CLI/SSH, kein AP), NIC (Standard, PCIe, Medium). Aufgaben: Datenblatt-Tabelle mit 3 Geräten und Anforderungsliste, „begründe Auswahl“ (frei), Lückentext Router. **Generator `net.switchwahl`:** Eingabe PCs 6–24, Drucker 1–4, IP-Telefone 0–12, APs 0–4, Reserve 20–25 %; Ports = ⌈(Summe)·(1+Reserve)⌉ → Standardgröße 8/16/24/48; PoE-Ports = Telefone + APs; PoE-Budget = Σ Gerätewatt aus Prompt; Ausgabe: günstigstes Modell der 3 Optionen, das alle Bedingungen erfüllt (Typ `single` + Begründung `free`). |
| 2 | **IP-Konfiguration einstellen** (Windows GUI/netsh/PowerShell, Linux `ip`/nmcli), statisch vs. DHCP, Test danach | Katalog: „IP-Konfiguration“, „Konfiguration, Test, Troubleshooting“. App liest Konfiguration (m13), erklärt aber nicht, wie man sie setzt. | **m13** (+ m16) | Lektion „Konfigurieren und testen“: Reihenfolge (IP, Maske, Gateway, DNS) → ipconfig /all → Schnelltest (ein Ping auf Namen prüft IP, Gateway, DNS). Aufgaben: „Beschreibe die Schritte“ (frei, modelAnswer + keywords), Fehlerbild-Beleg (falsches Gateway/Maske) – Generator nutzt bestehenden `ipv4.samesubnet`. |
| 3 | **LF4: Terminologie-Brücke Schadens-/Schutzbedarfskategorien** | Buch kennt 4 Schadenskategorien (gering…sehr hoch) und leitet 3 Schutzbedarfskategorien ab (mittel → normal); AB fragt nach „vier Schadenskategorien“. App lehrt nur 3 + 6 Szenarien (BSI 200-2); Schüler:innen könnten in der Prüfung beides sehen. | **s01-l05** | Kurzblock „Zwei Skalen, die nicht verwechselt werden dürfen“ mit Zuordnungstabelle; `table`-Aufgabe (Schadenskategorie → Schutzbedarf), `free` („Erläutern Sie den Unterschied“). |
| 4 | **Kumulations-/Verteilungseffekt über alle Grundwerte** | Buch (S. 446) koppelt Kumulation an **Vertraulichkeit** (viele vertrauliche Datenbestände auf einem System), Verteilung an **Verfügbarkeit**. App zeigt Kumulation nur bei Verfügbarkeit. Beide Sichten gehören in die App (siehe 5.). | **s01-l05**, Generator `sich.maximum` (Stufe 3) | Zweites Beispiel „Kumulation Vertraulichkeit“ (Dateiserver mit Personal-, Gehalts-, Vertragsdaten), Typ `single` + `free`. Generator-Erweiterung: Zeile „Effekt prüfen: Kumulation/Verteilung/keiner“ mit einer Begründung. |
| 5 | **Schutzbedarfsfeststellung als offene Belegaufgabe** (Begründungen, Räume, Kommunikationsverbindungen, Software/Client/mobile Datenträger) | AP1-Kern. Die Musteraufgaben im Buch verlangen Begründungen und Folgerungen, nicht nur Kategorien. App-Generator deckt nur Anwendungen → Server → Raum ohne Text. | **s01** (Pool) + **s05** | Neue `table`-Aufgaben nach BSI-Tabellenformat (Kürzel, Grundwert, Schutzbedarf, Begründung). Szenarien: Außendienst-Laptop (Daten beträchtlicher Schaden, Offline-Zugriff nötig → V/I hoch, A hoch), Personal-PC mit Ersatzgerät (A normal), Quellcode auf USB-Stick (V/I sehr hoch, A normal da zentral), Standleitung (V/I/A hoch). Dazu `free`: „Begründen Sie“, „Schlagen Sie zwei Maßnahmen vor“. **Generator `sich.schutzbedarf.beleg`:** Grenzwerttabelle des Unternehmens (finanzieller Schaden, tolerierbare Ausfallzeit) + Szenario mit Zahlen → Kategorie je Grundwert; Variante: Ausfalltoleranz 3 Tage/1 Woche/2 h → normal/normal/sehr hoch. |
| 6 | **Sicherheitsprozess, Leitlinie, Rollen, Informationsverbund** | Buch und AB haben dafür eigene Testaufgaben (Phasen sortieren, 14 Teilaufgaben zuordnen, „ISB oder Leitung verantwortlich?“). Die App nennt Schritte, aber nicht diese Zuordnungsmuster; „Informationsverbund“ fehlt. | **s01-l04**, kleine neue Lektion „Wer ist wofür verantwortlich?“ (s01 oder s02) | `order`: 6 Phasen; `match`: Teilaufgabe ↔ Hauptaufgabe (Leitlinie/Konzept/Strukturanalyse/Schutzbedarf); `single`: „Wer trägt die Gesamtverantwortung?“ (Leitung); Rollenvergleich ISB/DSB/QMB als Tabelle; Inhalte einer Leitlinie (5 Punkte). |
| 7 | **TOM: 14 Gebote (§ 64 BDSG) vs. 8 Kontrollarten** | Zweideutige Begriffe: im Buch ist „Zugangskontrolle“ der **räumliche** Zugang, in der App/IHK-Praxis ist das die **Zutrittskontrolle**. Schüler:innen verwechseln sonst Zutritt/Zugang. | **s02** (TOM-Lektion) | Mapping-Tabelle (siehe 5.5) + `match`-Aufgabe „Buchbegriff ↔ Prüfungsbegriff“; Hinweis: Aufgabenstellung entscheidet, Begründung nennen. |
| 8 | **Port-/Protokolltabelle: NFS und weitere** | Katalog nennt NFS ausdrücklich; in m10 fehlt NFS (nur in h02). Buch listet zusätzlich DHCPv6 546/547, IPP 631, SIP 5060/5061, 8080, FTPS 989/990. | **m10** (Haupttabelle, Zeile 255–280) | Zeilen ergänzen, Zuordnungsaufgabe (Port ↔ Dienst) um NFS 2049 (Linux-Dateifreigabe, Pendant zu SMB) erweitern. |

### P2: AP1-Randthemen

| # | Thema | Ziel-Modul | Vorschläge |
|---|---|---|---|
| 9 | Verfügbarkeit mit Redundanz (A_ges = 1 − (1 − A)ⁿ, Reihenschaltung A₁·A₂, Ausfallwahrscheinlichkeit p, Netz + USV) | b06 (`itsm.sla`) oder h04 | **Generator `sys.redundanz`:** A ∈ {95, 98, 99, 99,5, 99,9} %, n = 2–3, Jahr = 8760 h; Ausgabe Gesamtverfügbarkeit in % (4 Stellen) oder Ausfallzeit in min/Jahr; Variante Reihe: Netz 99,998 % × USV 95 %. Regel im Prompt: p als Anteil, nicht in %. |
| 10 | Kategorie vs. Klasse (D, E, EA, F, FA), Messprotokoll-Inhalte, Dosen-Beschriftungsschema, 1000-m²-Faustformel, Sammelpunkt | m12 (Lektion strukturierte Verkabelung) | `match` Kategorie ↔ Klasse ↔ Frequenz; `table` Patchplan mit Kürzel „A-1.2-3.11“ (Gebäude, Etage, Verteiler, Patchfeld, Port) ergänzen; `free`: „Warum erreicht eine Strecke trotz Cat-6A-Bauteilen die Klasse EA nicht?“ |
| 11 | Signallaufzeit mit NVP / Brechungsindex (v = c·NVP, v = c/n; Datenblatt „NVP 69 %“) | m15 (`calc.latency`) | **Generator `calc.nvp`:** l 100–2000 m (oder km bei LWL), NVP 0,64–0,78 oder n 1,45–1,5, c = 3·10⁸ m/s im Prompt; Ausgabe µs (Hinweg) oder RTT; Hinweis „Kupfer und Glas ≈ gleich schnell“. |
| 12 | Clients pro Leitung (Netzlast aus Task-Manager, Byte/s → Mbit/s) | m15 (`calc.overhead`) | **Generator `calc.clientslast`:** mittlere Last 100–500 kB/s (Faktor 8, /1000), Leitung 100 Mbit/s oder 1 Gbit/s, Zielauslastung 50–70 %; Ausgabe max. Clients (abrunden). |
| 13 | Drehstrom und Phasenverteilung (3×230 V, 3×16 A = 11,04 kW; Last je Phase; Netzteile auf verschiedene Phasen), Effektivwert 230 V ↔ 325 V, T = 1/f | h04 | `number`-Aufgaben + Generator-Variante in `hw.leistung`: n Geräte à P an 1 Phase → I und „16 A reicht?“ (Wertebereich 3–8 Geräte, 200–700 W). |
| 14 | Elektrische Gefahren und Rolle der IT-Fachkraft (Laie: nicht > 50 V AC/120 V DC, Steckdose/Sicherung, freischalten) | h05 | Kurzblock + `multi` „Was darf ein Fachinformatiker?“ + `free`. |
| 15 | Rechenzentrumsmodelle (On-Prem, Off-Prem, **Colocation**) und Netzbereiche (leitungs-/paketvermittelt, PSTN, Extranet) | b04 / m01 | `match` + `free` „Empfehlung für Betrieb mit schlechter Anbindung“. |
| 16 | WLAN-Feldstärke in dBm (−50 besser als −60; 0 dBm = 1 mW; 20 dBm = 100 mW), WLAN-Analyse, WPS/QR | m12 | `single`/`order` nach Signalstärke; `free` Funklöcher erkennen. |
| 17 | Mobile Datenträger: Arten, Verlustmeldung, Kennzeichnung, Datenträgerverwaltung | s05 | `table` Arten (Beispiele), `multi` Maßnahmen, `free` Anwaltskanzlei-Szenario. |
| 18 | Gesetze: BSIG/KRITIS/NIS2-Stand (Buch veraltet), TKG, IT-SiG-Abgrenzung | s02 | Kurzblock + Zuordnung Vorfall ↔ Gesetz. **[Stand der NIS2-Umsetzung 2026 nicht verifiziert, vor Übernahme prüfen]** |
| 19 | VPN End-to-End (Host-to-Host) und IPsec AH/ESP, Transport-/Tunnelmodus | m11 | ein Absatz + `match`. |
| 20 | Windows-Konsole `net user`, PowerShell `New-LocalUser`, Batch zum Anlegen mehrerer Benutzer | b02 | `text`-Aufgabe, `free`. |
| 21 | Baseline (Normalwerte) und Systemüberwachung | b06 / m13 | `free`: „Warum Normalwerte vor dem Störungsfall erfassen?“ |
| 22 | Bild-/Markenrecht, Unterrichtsprivileg, Abmahnung | w04 | Wahr/falsch-Block (kleiner Umfang). |

### P3: AP2 oder Randthema

RAID-Level, Kapazität (n−m)·C, Lese-/Schreibrate, 10/01/51, Hot-Spare, JBOD (**AP2**, Katalog 2. Aufl.; bleibt außerhalb des AP1-Pfads, ggf. als markierte Vertiefung in h02) · Switch-Durchschaltverfahren Cut-through/Store-and-Forward · SDN · Netztypen TN/TT/IT · Multiplexverfahren · Bandbreiten-Längenprodukt und dB/km bei LWL · Software-Container (SYS.1.6) · IT-Forensik, Penetrationstest · ISO-27000-Familie im Detail · Normungsgremien (IEEE, IETF, ISO …) · Hoax/PUA/SYN-Flood/Doxing/Combosquatting · KI-VO-Strafrahmen · eIDAS/qualifizierte Signatur · Leitungscodes.

---

## 5. Widersprüche und Korrekturen

Die App ist an den hier geprüften Stellen **fachlich korrekt**; es wurde **kein echter Fachfehler** in der App gefunden. Es gibt aber Stellen, an denen das Buch (und damit der Schulunterricht) anders darstellt. Das ist für Prüfungsvorbereitung relevant, weil Schüler:innen mit dem Buch lernen.

### 5.1 Konventionen, die in der Prüfung kippen können

| # | Thema | Buch | App (Fundstelle) | Bewertung / Empfehlung |
|---|---|---|---|---|
| 1 | Einheiten bei Übertragungszeit | S. 301: Beispiel 1 GB über 50 Mbit/s: 160 s mit Dezimal, **„korrekt“ 172 s mit Binärpräfix**; S. 299/347: Datenmengen „meist binär“; AB 179, 206–207 mischen **GiB/TiB mit MB/s** | `src/core/generators.ts` ca. 855–870 und `src/content/modules/m15.ts` ca. 738, 998–1007: SI-Standard, „Aufgabe entscheidet“, beide Werte (160 s / 171,8 s) | Kein App-Fehler, aber Risiko: Schule rechnet evtl. binär. Aufgaben mit **GiB/TiB-Datenmenge und MB/s-Rate** ergänzen (Generator-Variante), Lösungsweg nennt beide Wege. |
| 2 | **Authentizität** | S. 418 und AB 233: nach BSI **Teilziel der Integrität** | `s01.ts` ca. 57–62, 138: eigenes „erweitertes Schutzziel“ | Beides vertretbar. Satz ergänzen: „Das BSI ordnet Authentizität der Integrität zu; viele Lehrbücher führen sie separat.“ |
| 3 | **Kumulationseffekt** | S. 446: Beispiel beim Schutzziel **Vertraulichkeit**; Verteilung bei **Verfügbarkeit**; AB 245 fragt Kumulation „bei Verfügbarkeit“ | `s01.ts` ca. 556–560: Kumulation nur mit Verfügbarkeitsbeispiel; Verteilung „meist Verfügbarkeit“ | Ergänzen: Kumulation gilt je Grundwert (Verfügbarkeit: VM-Host; Vertraulichkeit: viele Datenbestände auf einem System). Siehe Lücke 4. |
| 4 | **Schadenskategorien** | S. 422–423: 4 (gering, mittel, hoch, sehr hoch) ↔ 3 Schutzbedarfskategorien; AB 233: „vier Schadenskategorien“ | `s01.ts` ca. 543–555: 3 Kategorien; 4 Stufen nur als Risikomatrix (ca. 177–190) | Brücke ergänzen (Lücke 3). |
| 5 | **TOM-Begriffe** | S. 418–419: „14 Gebote“ nach § 64 BDSG; dort heißt „Zugangskontrolle“ = Zutritt zu Verarbeitungsanlagen, „Benutzerkontrolle“ = Systemnutzung; S. 439: 13 Stichworte nach klassischem Schema | `s02.ts` ca. 331–345: 8 Kontrollen (Zutritt/Zugang/Zugriff …) | **Mapping:** Buch-Zugangskontrolle = App-**Zutritt**; Buch-Benutzerkontrolle = App-**Zugang**; Zugriffskontrolle gleich; Übertragungs-/Transportkontrolle = **Weitergabe**; Eingabe, Auftrag, Verfügbarkeit gleich; Trennbarkeit = **Trennung**; zusätzlich Datenträger-/Speicherkontrolle, Wiederherstellbarkeit, Zuverlässigkeit, Datenintegrität. Rechtlich ist § 64 BDSG Teil 3 des BDSG (Strafverfolgung/Gefahrenabwehr), nicht die allgemeine Wirtschaft [aus dem Gesetzesaufbau; nicht am Volltext geprüft]. |
| 6 | **Schichtzuordnung von Protokollen** | S. 325–326: DHCP „Layer 3“, DNS „Layer 3 und 7“, ARP „2 und 3“, ICMP „3“, TLS in der Tabelle „Layer 5“, im Text „Layer 4“ | `m02.ts` ca. 650 (DHCP = 7), 341 (TLS „teils Schicht 5“), 211 (ARP 2/3), 1078 | App folgt der üblichen Prüfungslösung (DHCP/DNS = Anwendungsschicht). Satz ergänzen: „Manche Bücher ordnen DHCP/DNS Schicht 3 zu; entscheidend ist die Funktion.“ |
| 7 | **PoE-Leistungen** | S. 390, 397: af 15,4 W, PoE+ **25,5 W**, bt „bis **100 W**“ (Kompetenzcheck „bis 100 W“ = wahr) | `m12.ts` 577–580: af/at/bt am **PSE** 15,4/30/60/90 W, am PD 12,95/25,5/51/71,3 W | Buch mischt PSE- und PD-Werte (25,5 W ist PD) und nennt die Marketinggrenze 100 W. App ist genauer. Ergänzen: „Oft wird 802.3bt mit ‚bis 100 W‘ beschrieben; Aufgabe/Datenblatt entscheidet.“ |
| 8 | **2,5/5GBase-T, Cat 6, 10GBase-T** | S. 316: 2,5G und 5G über Cat 6A, 10GBase-T über Cat 7; S. 315: Cat 6 „bis 10 Gbit/s“ (ohne 55-m-Grenze); AB-Datenblatt Cat 6 (S. 188) nennt dagegen 2,5G/5G | `m12.ts` 255–256, 411–412: 2,5G Cat 5e, 5G Cat 6, 10G Cat 6A, Cat 6 nur bis ca. 55 m | App entspricht der Norm; das Buch widerspricht sich selbst. Hinweis in m12: „Ältere Lehrbuchtabellen nennen Cat 6A/Cat 7 – diese Kategorien sind ebenfalls geeignet (Obermenge).“ Fragen so stellen, dass „mindestens“ und „geeignet“ unterschieden werden. |
| 9 | **WLAN-Höchstraten** | S. 320: n bis 150, ac bis 867 (theoretisch 6 936), ax/6E „bis 4,8 Gbit/s“; Tabelle hat **verrutschte Zeilen** (802.11ad als „Wi-Fi 6“, WiGig bei be) | `m12.ts` 850–854: n 600 Mbit/s, ac ca. 6,9 Gbit/s, ax ca. 9,6 Gbit/s | Werte hängen von Streams/Kanalbreite ab; App nennt theoretische Maxima. Zusatz: „Je nach Quelle 150/300/600 Mbit/s – Datenblatt in der Aufgabe gilt.“ 802.11ad/WiGig (60 GHz) fehlt, ist P3. |
| 10 | **Private Adressen** | S. 334: 10/8 = 1 Klasse-A-Netz, 172.16–172.31 = **16 Klasse-B-Netze** (Maske 255.255.0.0), 192.168/16 = 256 Klasse-C-Netze; AB 192: „RFC 1597“, Subnetze zählen | `m03.ts` ca. 394, 415: 172.16.0.0/12, RFC 1918 | Beides richtig (1597 ist veraltet). Satz: „172.16.0.0/12 entspricht 16 aufeinanderfolgenden Klasse-B-Netzen.“ Aufgabe „erstes/zweites/letztes Subnetz“ als Generator-Variante. |
| 11 | **Anzahl VLANs** | S. 288, 308: 2¹² unterscheidbar | `m08.ts` ca. 606: 4096 Werte, **4094 nutzbar** | Beide Antworten in der Erklärung nennen. |
| 12 | **USV: VA ↔ W** | AB 210: Last „650 VA“ wird wie Wattleistung gegen Akkuenergie gerechnet; FB S. 396: „1 kVA, Wirkfaktor 0,9“ | `h04.ts` ca. 455–470, `hw.usv`: strikt VA ≠ W, cos φ nötig | App ist korrekt. Ergänzen: „Fehlt cos φ in der Aufgabe, VA = W annehmen und die Annahme notieren.“ Nachrechnung AB-Aufgabe: 2·12 V·10 Ah = 240 Wh; 240·0,9/650 ≈ 0,33 h ≈ 20 min (mit cos φ 0,9: ≈ 22 min). Reihen- oder Parallelschaltung ändert die Energie nicht. |
| 13 | **Switch-Tabelle** | AB 201 (Aufgabe 3, 9): Switch-Weiterleitungstabelle heißt „ARP-Tabelle“; FB 340: Forwarding/Switching/Bridge Table | `m08.ts` ca. 194, 213: **MAC-Adresstabelle** | Buch-AB ist hier sprachlich falsch (ARP-Tabelle gehört zum Host). Hinweis in m08: „Synonyme: Forwarding Table, CAM-Tabelle; ‚ARP-Tabelle des Switches‘ ist falsch.“ |
| 14 | **OM1/OM2** | S. 319: OM1 „50/125 oder 62,5/125“ | `m12.ts` 73, 85: OM1 62,5 µm, OM2–OM5 50 µm | App korrekt. |
| 15 | **Passwortlänge** | S. 433: mindestens 8 Zeichen (Merksatz-Methode) | `s04.ts` 124–125, 188: BSI-Varianten (8–12 mit vier Zeichenarten oder Passphrase 20–25) | Kein Widerspruch, App aktueller. |

### 5.2 Fehler im Buch (nicht übernehmen)

- S. 388: Redundanzbeispiel rechnet 0,001·0,001 = 0,0000001 (richtig: 10⁻⁶ = 0,000001 = 0,0001 %); „Faktor 1000“ stimmt trotzdem.
- S. 388 und AB 208: Stromnetz „99,997 %“ bzw. „99,998 %“ bei „etwa 15 Minuten pro Jahr“ (99,998 % ≈ 10,5 min, 99,997 % ≈ 15,8 min); S. 388: 99,9 % = „8,7 h“ (genau 8,76 h).
- S. 362: „DSGVO gilt nur in Deutschland“ (falsch: EU-weit, Marktortprinzip). App s02 ist richtig.
- S. 410: „§ 5a DSGVO“ (gemeint Art. 5 Abs. 2); S. 412–413: KI-VO als „soll 2024 in Kraft treten“ und Strafrahmen 7 % (nur Höchststufe) – App p05 nennt Verordnung (EU) 2024/1689 korrekt.
- S. 408–409: IT-SiG/BSIG (§ 8a–8d, TKG § 166) im Stand vor der NIS2-Umsetzung [genauer Stand 2026 nicht geprüft].
- S. 320: WLAN-Tabelle mit verrutschten Zeilen (siehe oben).
- S. 380: RAID-Kapazitätsformel (n−m)·C gilt nur für Paritäts-Level, nicht für Spiegelungen.
- AB 198: Wireshark-Arbeitsanweisungen sind für Schul-VMs gedacht; „Mitschneiden fremder Daten ist strafbar“ ist als Hinweis korrekt, in der App nur m14 erwähnt.

### 5.3 RAID: Einordnung in der App

Die App behandelt RAID nur als „Ausfallsicherheit, kein Backup“ (h02 Z. 479/545 „Details: AP2“, s03, m14, s02 Verfügbarkeitskontrolle). Es gibt weder Level-Tabellen noch Kapazitätsgeneratoren. Das **passt zum Katalog 2. Auflage** (RAID nur Teil 2). Empfehlung: nichts nachziehen; falls Schüler:innen aus dem Buchteil 3.8.1 fragen, genügt ein Verweis „AP2-Stoff“. Nützlich für AP1 bleibt der Merksatz „RAID ersetzt kein Backup“ (Buch AB 238 und App s03 stimmen überein).

---

## 6. Nicht übernehmen

| Thema (FB-S.) | Grund |
|---|---|
| RAID-Level, -Kapazitäts- und -Ratenformeln (379–382) | Katalog 2. Auflage: nur Teil 2 (AP2). |
| Switch-Durchschaltverfahren Cut-through/Fragment-free/Store-and-Forward (342–343) | Vertiefung (AP2/Praxis), kein Katalogstichwort. |
| SDN (386–387) | Buch sagt selbst „spätere Lernfelder“; AP2. |
| TN/TT/IT-Netze, Effektivwert-Herleitung, Phasenwinkel (390, 393–394) | Elektrotechnik-Tiefe; für AP1 genügen P = U·I, W = P·t, 230 V/16 A, Drehstrom-Grundidee. |
| Bandbreiten-Längenprodukt, dB/km, WDM (319–320, 303; AB 204) | Tiefe nicht AP1; Datenblatt-Lesen reicht (P3). |
| Normungsgremien-Tabelle, Ethernet-Geschichte (306, 344–345) | Merkwissen ohne Prüfungsbezug. |
| ISO-27000-Familie im Detail, BSI-Rollenliste, Infoquellen-Linklisten (404–407, 411; AB 218–219) | Recherche-/Schulungsstoff; ISO 27001 + BSI 200-x genügen. |
| Container-Sicherheit SYS.1.6 (454–455), IT-Forensik, Pentest (AB 239) | AP2-Niveau. |
| Rollenspiele, Kampagnen, Präsentationen, Reflexionen, Kreuzworträtsel, VM-/Wireshark-Installation (AB, durchgehend) | Methoden-/Praxisaufträge der Schule, nicht prüfbar im AP1-Format. |
| Marken-/Bildrecht-Paragrafen im Detail (AB 226–229) | Randthema; höchstens kurzer Wahr/falsch-Block (Lücke 22). |
| Zeitgebundene Statistiken (BSI-Lage 2023, Bitkom 2023, Passwort-Top-Listen) (424–426) | veraltend, nicht prüfungsrelevant. |

---

## 7. Aufgabenmuster aus dem AB (für Aufgabenbau; keine Texte übernommen)

**LF3:** Übertragungszeit/Rate (auch Rate aus Zeitvorgabe, Paketzeit, Streckenlaufzeit, Autofahrstrecke während RTT) · Frame-Größen (Header, Overhead, Mindest-/Höchstgröße) · Bitmuster im Typfeld deuten (0x0800 vs. 0x8100) · Tabelle Adressen (MAC/IPv4/IPv6/Port: Länge, Schreibweise, Adressierungsobjekt) · „In welchem Netz liegt Host x/n“ · Datenblatt-Zuordnung Kabel zu Einsatz (Workstation, PoE-Webcam, Arbeitsplatz + Telefon) mit Begründung · Ethernet-Standard ↔ Rate verbinden · OSI-Tabelle ausfüllen · Dienstprotokoll benennen · Netzplan aus gegebenem /26 mit IP-Konfigurationen · Switch-Auswahl aus 3 Datenblättern mit Preis · Wahr/falsch Switch/Router · RAID-Nutzkapazität (AP2) · Bandsicherung 1 TiB bei 360/900 MB/s · Backup-Zeitfenster prüfen (Voll Samstag, inkrementell Di–Fr) · 99,95 % pro Monat · Stromausfall-Wahrscheinlichkeit (Netz × USV) · USV-Laufzeit aus Akkus + η · Leistungsbedarf Rechenzentrum (Kühlung mitzählen).

**LF4:** Wahr/falsch-Tests mit Punkteschlüssel (Grundschutz 23 P., Malware 12 P.) · Zuordnung Social-Engineering-Maßnahmen · Verstoß ↔ DSGVO-Artikel 12–23 (18 Fälle) · Verstoß ↔ Grundsatz Art. 5 · Phasen sortieren · Teilaufgaben ↔ Hauptaufgabe · Verstoß ↔ Art.-32-Kriterium · Fall ↔ BSI-Maßnahmenkriterium (Mehrfachnennung) · Ereignis ↔ Gefährdungskategorie · Schutzbedarfstabelle Software/Client/Datenträger mit Begründung und Maßnahmen · Verschlüsselungsverfahren aus Schaubild erkennen · Baustein-Kürzel ↔ Zielobjekt.

**Offene Punkte dieser Auswertung:** Lösungen des AB liegen nicht vor (Rechenwege selbst ermittelt). Relevanzurteile folgen dem Katalogauszug der 1. Auflage plus Hinweis zur 2. Auflage, nicht Originalprüfungen. NIS2/BSIG-Stand 2026 und die Anwendbarkeit des § 64 BDSG sind aus Allgemeinwissen eingeordnet und nicht an Gesetzestexten verifiziert.
