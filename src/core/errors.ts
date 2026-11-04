/**
 * Katalog bekannter Fehlerkategorien mit Erklärung und Wiederholungsempfehlung.
 * Unbekannte Kategorien (z. B. aus Distraktoren der Inhaltsmodule) werden lesbar formatiert.
 */
export interface ErrorInfo {
  title: string;
  /** Warum passiert dieser Denkfehler? */
  cause: string;
  /** Skill, der wiederholt werden sollte */
  skill?: string;
  /** Lektion zur Wiederholung */
  lesson?: string;
}

export const ERROR_CATALOG: Record<string, ErrorInfo> = {
  'broadcast-naechstes-netz': {
    title: 'Nächste Netzadresse statt Broadcast',
    cause: 'Der Broadcast ist die **letzte** Adresse eines Subnetzes. Die nächste Netzadresse gehört bereits zum folgenden Subnetz. Merksatz: Broadcast = nächstes Netz − 1.',
    skill: 'ipv4.broadcast',
    lesson: 'm05-l05',
  },
  'broadcast-letzter-host': {
    title: 'Broadcast und letzter Host verwechselt',
    cause: 'Beim Broadcast sind **alle** Hostbits 1. Der letzte nutzbare Host ist eine Adresse kleiner.',
    skill: 'ipv4.broadcast',
    lesson: 'm05-l05',
  },
  'netz-broadcast-verwechselt': {
    title: 'Netz- und Broadcastadresse verwechselt',
    cause: 'Netzadresse = alle Hostbits 0 (erste Adresse). Broadcast = alle Hostbits 1 (letzte Adresse).',
    skill: 'ipv4.network',
    lesson: 'm03-l04',
  },
  'netz-host-statt-netz': {
    title: 'Hostadresse statt Netzadresse',
    cause: 'Die Netzadresse entsteht durch bitweises UND von IP und Maske – die Hostbits werden auf 0 gesetzt.',
    skill: 'ipv4.network',
    lesson: 'm05-l04',
  },
  'netz-oktettgrenze': {
    title: 'Wie /24 gerechnet',
    cause: 'Bei Präfixen, die nicht auf einer Oktettgrenze liegen, wird das „interessante Oktett“ in Blöcke aufgeteilt. Nicht jedes Netz beginnt bei .0.',
    skill: 'subnet.blocksize',
    lesson: 'm05-l03',
  },
  'erster-host-netz': {
    title: 'Netzadresse als ersten Host angegeben',
    cause: 'Die Netzadresse identifiziert das Netz selbst und ist keinem Gerät zuweisbar. Erster Host = Netzadresse + 1.',
    skill: 'ipv4.hostrange',
    lesson: 'm03-l04',
  },
  'reservierte-vergessen': {
    title: 'Reservierte Adressen vergessen',
    cause: 'In klassischen IPv4-Subnetzen sind Netz- und Broadcastadresse nicht für Hosts nutzbar: nutzbare Hosts = 2^h − 2.',
    skill: 'ipv4.hostcount',
    lesson: 'm05-l02',
  },
  'netzbits-hostbits-verwechselt': {
    title: 'Netz- und Hostbits verwechselt',
    cause: 'Hostbits = 32 − Präfix. Die Anzahl der Adressen hängt nur von den Hostbits ab.',
    skill: 'ipv4.hostcount',
    lesson: 'm03-l03',
  },
  'praefix-zu-gross-netz': {
    title: 'Netz größer als nötig',
    cause: 'Gesucht ist das kleinste Netz, das genügend nutzbare Adressen bietet. Ein Bit weniger Präfix verdoppelt das Netz.',
    skill: 'subnet.hosts2prefix',
    lesson: 'm05-l06',
  },
  'subnetze-minus-zwei': {
    title: '−2 bei der Subnetzanzahl',
    cause: 'Das −2 gilt nur für Hostadressen in einem Subnetz, nicht für die Anzahl der Subnetze (2^ausgeliehene Bits).',
    skill: 'subnet.count',
    lesson: 'm05-l02',
  },
  'bits-statt-anzahl': {
    title: 'Bitanzahl statt Anzahl',
    cause: 'n Bits ergeben 2^n Kombinationen.',
    skill: 'subnet.count',
    lesson: 'm05-l02',
  },
  'subnetze-bits': {
    title: 'Zu wenige Bits ausgeliehen',
    cause: 'Mit b ausgeliehenen Bits entstehen 2^b Subnetze. Prüfe, ob 2^b ≥ benötigte Subnetze ist.',
    skill: 'subnet.count',
    lesson: 'm05-l02',
  },
  'subnetz-index': {
    title: 'Zählfehler beim n-ten Subnetz',
    cause: 'Das 1. Subnetz beginnt bei Offset 0. Das n-te Subnetz beginnt bei (n − 1) · Blockgröße.',
    skill: 'subnet.nth',
    lesson: 'm05-l03',
  },
  blockgroesse: {
    title: 'Blockgröße falsch bestimmt',
    cause: 'Blockgröße im interessanten Oktett = 256 − Maskenwert = 2^(Hostbits im Oktett).',
    skill: 'subnet.blocksize',
    lesson: 'm05-l03',
  },
  'maske-teiloktett': {
    title: 'Teil-Oktett der Maske übersehen',
    cause: 'Auch ein Maskenoktett wie 192 (11000000) enthält Einsen, die zum Präfix zählen.',
    skill: 'ipv4.mask',
    lesson: 'm03-l03',
  },
  'bin-reihenfolge': {
    title: 'Bitreihenfolge vertauscht',
    cause: 'Das höchstwertige Bit (128) steht links, das niederwertigste (1) rechts.',
    skill: 'bin.dec2bin',
    lesson: 'm04-l01',
  },
  'private-bereiche': {
    title: 'Private Adressbereiche unsicher',
    cause: 'RFC 1918: 10.0.0.0/8, 172.16.0.0/12 (bis 172.31.255.255), 192.168.0.0/16.',
    skill: 'ipv4.private',
    lesson: 'm03-l05',
  },
  'subnetz-zugehoerigkeit': {
    title: 'Subnetz-Zugehörigkeit falsch eingeschätzt',
    cause: 'Zwei Hosts sind nur dann im selben Subnetz, wenn ihre Netzadressen (IP UND Maske) identisch sind.',
    skill: 'ipv4.network',
    lesson: 'm05-l04',
  },
  'vlsm-not-aligned': {
    title: 'VLSM: Netz nicht auf Blockgrenze',
    cause: 'Ein Netz der Größe 2^h muss bei einem Vielfachen von 2^h beginnen. Vergib größte Netze zuerst – dann passt die Ausrichtung automatisch.',
    skill: 'vlsm.plan',
    lesson: 'm06-l03',
  },
  'vlsm-overlap': {
    title: 'VLSM: Überlappende Netze',
    cause: 'Jede Adresse darf nur zu einem Netz gehören. Prüfe Anfang und Ende (Broadcast) jedes Netzes.',
    skill: 'vlsm.plan',
    lesson: 'm06-l04',
  },
  'vlsm-too-small': {
    title: 'VLSM: Netz zu klein',
    cause: 'Nutzbare Hosts = 2^h − 2 müssen den Bedarf decken.',
    skill: 'vlsm.sizing',
    lesson: 'm06-l02',
  },
  'vlsm-too-large': {
    title: 'VLSM: Netz größer als nötig',
    cause: 'VLSM soll Adressen sparen: kleinstes passendes Präfix wählen.',
    skill: 'vlsm.sizing',
    lesson: 'm06-l02',
  },
  'vlsm-outside-base': {
    title: 'VLSM: Netz außerhalb des Ausgangsnetzes',
    cause: 'Alle Subnetze müssen im vorgegebenen Adressbereich liegen.',
    skill: 'vlsm.plan',
    lesson: 'm06-l03',
  },
  'vlsm-wan-convention': {
    title: 'VLSM: WAN-Netz falsch dimensioniert',
    cause: 'Punkt-zu-Punkt-Verbindungen brauchen nur 2 Adressen: /30 (bzw. /31 nach RFC 3021, falls vorgegeben).',
    skill: 'vlsm.wan',
    lesson: 'm06-l05',
  },
  'vlsm-broadcast': { title: 'VLSM: Broadcast falsch', cause: 'Broadcast = Netzadresse + Blockgröße − 1.', skill: 'ipv4.broadcast', lesson: 'm05-l05' },
  'vlsm-first-host': { title: 'VLSM: erster Host falsch', cause: 'Erster Host = Netzadresse + 1.', skill: 'ipv4.hostrange', lesson: 'm03-l04' },
  'vlsm-last-host': { title: 'VLSM: letzter Host falsch', cause: 'Letzter Host = Broadcast − 1.', skill: 'ipv4.hostrange', lesson: 'm03-l04' },
  'vlsm-order': { title: 'VLSM: Reihenfolge nicht eingehalten', cause: 'Die Aufgabe verlangt: größte Netze zuerst, lückenlos ab Netzanfang.', skill: 'vlsm.plan', lesson: 'm06-l03' },
  'ipv6-doppelpunkt-vergessen': { title: 'IPv6: :: nicht verwendet', cause: 'Die längste Folge von 0-Blöcken (mind. 2) wird einmalig durch :: ersetzt.', skill: 'ipv6.compress' },
  'ipv6-nicht-gekuerzt': { title: 'IPv6: nicht gekürzt', cause: 'Führende Nullen entfernen und längste Null-Folge durch :: ersetzen.', skill: 'ipv6.compress' },
  'einheit-bit-byte': { title: 'Bit und Byte verwechselt', cause: 'Datenraten in Bit/s, Datenmengen meist in Byte: 1 Byte = 8 Bit.', skill: 'calc.units' },
  'einheit-1000-1024': { title: 'Dezimal- und Binärpräfixe verwechselt', cause: 'k/M/G = 1000er-Schritte (SI), Ki/Mi/Gi = 1024er-Schritte (IEC).', skill: 'calc.units' },
  'routing-nicht-laengster-praefix': { title: 'Nicht den längsten Präfix-Treffer gewählt', cause: 'Passen mehrere Routen, gewinnt die spezifischste (längstes Präfix).', skill: 'routing.lpm' },
  'routing-netz-falsch': { title: 'Ziel liegt nicht im gewählten Netz', cause: 'Prüfe mit der Maske, ob die Zieladresse im Zielnetz des Eintrags liegt.', skill: 'routing.lpm' },
  eingabeformat: { title: 'Eingabeformat', cause: 'Die Eingabe hatte nicht das erwartete Format.' },
};

export function errorInfo(tag: string): ErrorInfo {
  if (ERROR_CATALOG[tag]) return ERROR_CATALOG[tag];
  const [skill, kind] = tag.includes(':') ? tag.split(':') : [undefined, tag];
  const pretty = (kind ?? tag).replace(/-/g, ' ');
  return { title: pretty.charAt(0).toUpperCase() + pretty.slice(1), cause: '', skill };
}
