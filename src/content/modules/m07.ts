import type { Module, Question } from '../types';

/**
 * Modul 7 – IPv6
 * Fachliche Grundlagen: RFC 4291 (Adressarchitektur), RFC 5952 (Textdarstellung),
 * RFC 4862 (SLAAC), RFC 4861 (NDP), RFC 8981 (Privacy Extensions), RFC 4193 (ULA),
 * RFC 8415 (DHCPv6), RFC 3849 (Dokumentationspräfix 2001:db8::/32).
 */

const questions: Question[] = [
  /* ---------------------------------------------------------------- */
  /* ipv6.structure                                                    */
  /* ---------------------------------------------------------------- */
  {
    id: 'm07-q001',
    kind: 'single',
    skill: 'ipv6.structure',
    difficulty: 1,
    prompt: 'Wie lang ist eine IPv6-Adresse?',
    options: ['32 Bit', '48 Bit', '64 Bit', '128 Bit'],
    answer: 3,
    distractors: {
      '0': { why: '32 Bit ist die Länge einer IPv4-Adresse.', error: 'ipv4-verwechselt' },
      '1': { why: '48 Bit ist die Länge einer MAC-Adresse (und ein typisches Standortpräfix /48).', error: 'mac-verwechselt' },
      '2': { why: '64 Bit ist nur die Hälfte: So lang ist bei einem /64-Netz die Interface-ID.', error: 'interface-id-verwechselt' },
    },
    explanation:
      'Eine IPv6-Adresse hat **128 Bit**. Sie wird in **8 Blöcken à 16 Bit** geschrieben, jeder Block als 4 Hex-Zeichen: 8 · 16 = 128.',
    hints: ['IPv4 hat 32 Bit – IPv6 hat das Vierfache.'],
  },
  {
    id: 'm07-q002',
    kind: 'number',
    skill: 'ipv6.structure',
    difficulty: 1,
    prompt: 'Aus wie vielen durch Doppelpunkte getrennten Blöcken besteht eine **vollständig** ausgeschriebene IPv6-Adresse?',
    answer: 8,
    unit: 'Blöcke',
    explanation: '128 Bit ÷ 16 Bit pro Block = **8 Blöcke**, z. B. `2001:0db8:0000:0000:0000:ff00:0042:8329`.',
    hints: ['Ein Block hat 16 Bit.', '128 ÷ 16 = ?'],
  },
  {
    id: 'm07-q003',
    kind: 'number',
    skill: 'ipv6.structure',
    difficulty: 1,
    prompt: 'Wie viele Bit stellt **ein** Block (Hextet) einer IPv6-Adresse dar?',
    answer: 16,
    unit: 'Bit',
    explanation:
      'Ein Block besteht aus 4 Hex-Zeichen. Jedes Hex-Zeichen steht für 4 Bit (ein Nibble): 4 · 4 = **16 Bit**.',
    hints: ['Ein Hex-Zeichen = 4 Bit.', 'Ein Block hat 4 Hex-Zeichen.'],
  },
  {
    id: 'm07-q004',
    kind: 'single',
    skill: 'ipv6.structure',
    difficulty: 1,
    prompt: 'Was ist der **Hauptgrund** für die Einführung von IPv6?',
    options: [
      'IPv4 ist zu langsam für Gigabit-Netze.',
      'Der IPv4-Adressraum (rund 4,3 Mrd. Adressen) ist erschöpft.',
      'IPv4 unterstützt keine Verschlüsselung.',
      'IPv4 funktioniert nicht über WLAN.',
    ],
    answer: 1,
    distractors: {
      '0': { why: 'Die Geschwindigkeit hängt von Schicht 1/2 ab (Ethernet, WLAN), nicht von der IP-Version.', error: 'schichten-verwechselt' },
      '2': { why: 'Auch IPv4 kann mit IPsec oder TLS verschlüsselt werden. IPsec war bei IPv6 anfangs Pflicht-Implementierung, ist es heute aber nicht mehr – und es ist nicht der Hauptgrund.', error: 'mythos-ipsec' },
      '3': { why: 'IP ist unabhängig vom Übertragungsmedium (Schicht 3). IPv4 läuft problemlos über WLAN.', error: 'schichten-verwechselt' },
    },
    explanation:
      'IPv4 hat 32 Bit → 2³² ≈ 4,3 Milliarden Adressen. Die regionalen Registrierungsstellen haben ihre freien IPv4-Pools aufgebraucht. IPv6 bietet mit 128 Bit 2¹²⁸ ≈ 3,4 · 10³⁸ Adressen. Weitere Vorteile (einfacherer Header, SLAAC, kein NAT nötig) sind Nebeneffekte.',
  },
  {
    id: 'm07-q005',
    kind: 'number',
    skill: 'ipv6.structure',
    difficulty: 2,
    prompt:
      'Ein Netz hat das Präfix `/64`. Wie viele Bit stehen für die **Interface-ID** (den Host-Anteil) zur Verfügung?',
    answer: 64,
    unit: 'Bit',
    explanation: '128 Bit gesamt − 64 Bit Präfix = **64 Bit Interface-ID**. Daraus ergeben sich 2⁶⁴ mögliche Interface-IDs pro Subnetz.',
    hints: ['Gesamtlänge minus Präfixlänge.'],
  },

  /* ---------------------------------------------------------------- */
  /* ipv6.hex                                                          */
  /* ---------------------------------------------------------------- */
  {
    id: 'm07-q006',
    kind: 'number',
    skill: 'ipv6.hex',
    difficulty: 2,
    prompt: 'Rechne den Hex-Block `2001` in eine Dezimalzahl um.',
    answer: 8193,
    explanation:
      'Stellenwerte im Hexadezimalsystem: 16³ = 4096, 16² = 256, 16¹ = 16, 16⁰ = 1.\n\n`2001` = 2 · 4096 + 0 · 256 + 0 · 16 + 1 · 1 = 8192 + 1 = **8193**.',
    hints: ['Die Stellenwerte sind 4096, 256, 16, 1.', '2 · 4096 = 8192'],
  },
  {
    id: 'm07-q007',
    kind: 'text',
    skill: 'ipv6.hex',
    difficulty: 1,
    prompt: 'Wandle die Binärzahl `1010 1111` in Hexadezimal um (zwei Zeichen, ohne Präfix).',
    accept: ['af', '0xaf'],
    placeholder: 'z. B. 3c',
    explanation:
      'Jedes Nibble (4 Bit) einzeln umrechnen:\n\n- `1010` = 8 + 2 = 10 = **a**\n- `1111` = 8 + 4 + 2 + 1 = 15 = **f**\n\nErgebnis: **af**.',
    hints: ['Teile in zwei 4-Bit-Gruppen.', '1010 = 10, und 10 entspricht welchem Buchstaben?'],
  },
  {
    id: 'm07-q008',
    kind: 'text',
    skill: 'ipv6.hex',
    difficulty: 1,
    prompt: 'Wandle die Dezimalzahl **255** in Hexadezimal um.',
    accept: ['ff', '0xff', '00ff'],
    placeholder: 'Hex-Zahl',
    explanation:
      '255 ÷ 16 = 15 Rest 15. 15 = f, Rest 15 = f → **ff**. Probe: 15 · 16 + 15 = 255. (255 ist auch 1111 1111 binär – zweimal das Nibble `1111` = f.)',
    hints: ['Teile durch 16 und notiere den Rest.'],
  },
  {
    id: 'm07-q009',
    kind: 'number',
    skill: 'ipv6.hex',
    difficulty: 1,
    prompt: 'Wie viele Bit werden durch **ein** Hexadezimalzeichen dargestellt?',
    answer: 4,
    unit: 'Bit',
    explanation: 'Ein Hex-Zeichen hat 16 mögliche Werte (0–f). 16 = 2⁴, also braucht man **4 Bit** (ein „Nibble“).',
  },
  {
    id: 'm07-q010',
    kind: 'match',
    skill: 'ipv6.hex',
    difficulty: 1,
    prompt: 'Ordne jedem Hex-Zeichen das passende Nibble (4 Bit) zu.',
    left: ['a', '7', 'f', '3', 'c'],
    right: ['0011', '0111', '1010', '1100', '1111'],
    answer: [2, 1, 4, 0, 3],
    explanation:
      'a = 10 = 8+2 = `1010`; 7 = 4+2+1 = `0111`; f = 15 = `1111`; 3 = 2+1 = `0011`; c = 12 = 8+4 = `1100`.',
    hints: ['Stellenwerte eines Nibbles: 8 4 2 1.'],
  },
  {
    id: 'm07-q011',
    kind: 'text',
    skill: 'ipv6.hex',
    difficulty: 2,
    prompt: 'Schreibe den IPv6-Block `0db8` als **16-stellige** Binärzahl (Leerzeichen erlaubt).',
    accept: ['0000110110111000', '0000 1101 1011 1000'],
    placeholder: '16 Bit',
    explanation:
      'Jedes Hex-Zeichen → 4 Bit:\n\n| Hex | 0 | d | b | 8 |\n|---|---|---|---|---|\n| Binär | 0000 | 1101 | 1011 | 1000 |\n\nErgebnis: `0000 1101 1011 1000`.',
    hints: ['d = 13 = 8+4+1', 'b = 11 = 8+2+1'],
  },
  {
    id: 'm07-q012',
    kind: 'number',
    skill: 'ipv6.hex',
    difficulty: 2,
    prompt: 'Welchem Dezimalwert entspricht der Hex-Block `fe80`?',
    answer: 65152,
    explanation:
      '`fe80` = 15 · 4096 + 14 · 256 + 8 · 16 + 0 = 61440 + 3584 + 128 + 0 = **65152**.',
    hints: ['f = 15, e = 14', 'Stellenwerte: 4096, 256, 16, 1'],
  },

  /* ---------------------------------------------------------------- */
  /* ipv6.compress                                                     */
  /* ---------------------------------------------------------------- */
  {
    id: 'm07-q013',
    kind: 'text',
    skill: 'ipv6.compress',
    difficulty: 1,
    prompt: 'Kürze die Adresse so weit wie möglich (RFC 5952):\n\n`2001:0db8:0000:0000:0000:ff00:0042:8329`',
    accept: ['2001:db8::ff00:42:8329'],
    placeholder: 'gekürzte Adresse',
    explanation:
      '1. Führende Nullen je Block weg: `2001:db8:0:0:0:ff00:42:8329`\n2. Längste Nullfolge (Blöcke 3–5) durch `::` ersetzen: **`2001:db8::ff00:42:8329`**\n\nAchtung: `ff00` bleibt `ff00` – nur **führende** Nullen dürfen weg.',
    hints: ['Erst führende Nullen je Block streichen.', 'Dann die zusammenhängenden 0-Blöcke durch :: ersetzen.'],
    widget: { kind: 'ipv6-compress', data: { address: '2001:0db8:0000:0000:0000:ff00:0042:8329' } },
  },
  {
    id: 'm07-q014',
    kind: 'text',
    skill: 'ipv6.compress',
    difficulty: 2,
    prompt: 'Kürze RFC-5952-konform:\n\n`2001:0db8:0000:0000:0001:0000:0000:0001`',
    accept: ['2001:db8::1:0:0:1'],
    placeholder: 'gekürzte Adresse',
    explanation:
      'Nach dem Entfernen führender Nullen: `2001:db8:0:0:1:0:0:1`. Es gibt **zwei** Nullfolgen gleicher Länge (je 2 Blöcke). `::` darf nur **einmal** vorkommen. Bei Gleichstand wird nach RFC 5952 die **erste** (linke) Folge ersetzt: **`2001:db8::1:0:0:1`**.',
    hints: ['Zwei gleich lange Nullfolgen – welche nimmt man?', 'Bei Gleichstand: die erste.'],
  },
  {
    id: 'm07-q015',
    kind: 'text',
    skill: 'ipv6.compress',
    difficulty: 2,
    prompt: 'Kürze RFC-5952-konform:\n\n`2001:0db8:0001:0000:0001:0001:0001:0001`',
    accept: ['2001:db8:1:0:1:1:1:1'],
    placeholder: 'gekürzte Adresse',
    explanation:
      'Führende Nullen weg: `2001:db8:1:0:1:1:1:1`. Es gibt nur **einen einzelnen** Null-Block. Nach RFC 5952 wird `::` **nicht** für einen einzelnen 16-Bit-Nullblock verwendet, er wird als `0` geschrieben. Ergebnis: **`2001:db8:1:0:1:1:1:1`**.\n\n(Technisch wäre `2001:db8:1::1:1:1:1` nach RFC 4291 noch eine gültige Schreibweise, aber nicht die empfohlene kanonische Form.)',
    hints: ['Wie viele Null-Blöcke hängen zusammen?'],
  },
  {
    id: 'm07-q016',
    kind: 'single',
    skill: 'ipv6.compress',
    difficulty: 3,
    prompt: 'Welche ist die **kanonische** (RFC 5952) Kurzform von\n\n`2001:0db8:0000:0000:abcd:0000:0000:0000`?',
    options: ['2001:db8::abcd::', '2001:db8::abcd:0:0:0', '2001:db8:0:0:abcd::', '2001:db8::abcd'],
    answer: 2,
    distractors: {
      '0': { why: '`::` darf nur **einmal** vorkommen – sonst ist nicht eindeutig, wie viele Nullblöcke jeweils fehlen.', error: 'doppelpunkt-doppelt' },
      '1': { why: 'Gültig, aber nicht kanonisch: Hier wurde die kürzere Folge (2 Blöcke) ersetzt. Die **längste** Folge (3 Blöcke am Ende) muss mit `::` gekürzt werden.', error: 'nicht-laengste-nullfolge' },
      '3': { why: 'Diese Adresse ist eine **andere** Adresse: Sie wird zu `2001:0db8:0000:0000:0000:0000:0000:abcd` expandiert.', error: 'bloecke-verloren' },
    },
    explanation:
      'Nach dem Entfernen führender Nullen: `2001:db8:0:0:abcd:0:0:0`. Nullfolgen: Blöcke 3–4 (Länge 2) und Blöcke 6–8 (Länge 3). Die **längste** wird gekürzt → **`2001:db8:0:0:abcd::`**.',
    hints: ['Zähle die Länge beider Nullfolgen.'],
  },
  {
    id: 'm07-q017',
    kind: 'multi',
    skill: 'ipv6.compress',
    difficulty: 2,
    prompt:
      'Welche Schreibweisen bezeichnen **dieselbe** Adresse wie `2001:0db8:0000:0000:0000:0000:0000:0001`? (Gültig, nicht unbedingt kanonisch.)',
    options: ['2001:db8::1', '2001:db8:0:0:0:0:0:1', '2001:0db8::0001', '2001:db8:::1', '2001:db8:1', '2001:db8::1::'],
    answer: [0, 1, 2],
    explanation:
      '- `2001:db8::1` ✔ (kanonisch)\n- `2001:db8:0:0:0:0:0:1` ✔ (nur führende Nullen entfernt)\n- `2001:0db8::0001` ✔ (führende Nullen *dürfen* stehen bleiben – gültig, aber nicht kanonisch)\n- `:::` ist keine gültige Syntax\n- `2001:db8:1` hat nur 3 Blöcke und kein `::` → ungültig\n- `::` doppelt → ungültig',
  },
  {
    id: 'm07-q018',
    kind: 'text',
    skill: 'ipv6.compress',
    difficulty: 1,
    prompt: 'Kürze die Unique-Local-Adresse des Druckers bei Elektro Krämer:\n\n`fd12:3456:789a:0001:0000:0000:0000:0010`',
    accept: ['fd12:3456:789a:1::10'],
    placeholder: 'gekürzte Adresse',
    explanation:
      '`0001` → `1`, `0010` → `10` (nur die **führenden** Nullen fallen weg, die Null am Ende bleibt!). Blöcke 5–7 sind 0 → `::`. Ergebnis: **`fd12:3456:789a:1::10`**.',
    hints: ['Achtung bei 0010: Welche Nullen sind „führend“?'],
  },
  {
    id: 'm07-q019',
    kind: 'text',
    skill: 'ipv6.compress',
    difficulty: 2,
    prompt: 'Kürze RFC-5952-konform (Achtung: Groß-/Kleinschreibung beachten):\n\n`2001:0DB8:00A0:0000:0000:0BCD:0000:0001`',
    accept: ['2001:db8:a0::bcd:0:1'],
    placeholder: 'gekürzte Adresse',
    explanation:
      '1. Kleinschreibung: `2001:0db8:00a0:0000:0000:0bcd:0000:0001`\n2. Führende Nullen weg: `2001:db8:a0:0:0:bcd:0:1` (`00a0` → `a0`, **nicht** `a`!)\n3. Längste Nullfolge (Blöcke 4–5) → `::`; der einzelne Nullblock danach bleibt `0`.\n\nErgebnis: **`2001:db8:a0::bcd:0:1`**',
    hints: ['00A0 – welche Nullen sind führend, welche nicht?', 'Der einzelne Nullblock vor der 1 wird nicht mit :: gekürzt.'],
  },
  {
    id: 'm07-q020',
    kind: 'single',
    skill: 'ipv6.compress',
    difficulty: 2,
    prompt:
      'Dein Kollege soll `2001:0db8:0c00:0000:0000:0000:0000:0000` kürzen und schreibt `2001:db8:c::`. Was stimmt?',
    options: [
      'Richtig, das ist die kanonische Form.',
      'Falsch – richtig ist `2001:db8:c00::`, weil nur führende Nullen entfernt werden dürfen.',
      'Falsch – richtig ist `2001:db8:c00:0::`, weil :: nur 3 Blöcke ersetzen darf.',
      'Falsch – richtig ist `2001:db8:0c00::`, weil führende Nullen bleiben müssen.',
    ],
    answer: 1,
    distractors: {
      '0': { why: '`c::` würde zu Block `000c` expandieren – das ist eine andere Adresse.', error: 'nachgestellte-nullen-entfernt' },
      '2': { why: '`::` darf beliebig viele (mind. 2) zusammenhängende Nullblöcke ersetzen.', error: 'regel-erfunden' },
      '3': { why: 'Führende Nullen *dürfen* bleiben, kanonisch werden sie aber entfernt: `0c00` → `c00`.', error: 'nicht-gekuerzt' },
    },
    explanation:
      'Im Block `0c00` ist nur die erste 0 eine **führende** Null. Die beiden hinteren Nullen sind Stellenwerte (wie bei 300 ≠ 3). Korrekt: **`2001:db8:c00::`**.',
  },
  {
    id: 'm07-q021',
    kind: 'order',
    skill: 'ipv6.compress',
    difficulty: 1,
    prompt: 'Bringe die Schritte zum Kürzen einer IPv6-Adresse in die richtige Reihenfolge.',
    items: [
      'Adresse vollständig notieren (8 Blöcke à 4 Hex-Zeichen) und Buchstaben klein schreiben',
      'In jedem Block die führenden Nullen entfernen (mind. eine 0 bleibt stehen)',
      'Die längste zusammenhängende Folge von 0-Blöcken suchen (mindestens 2 Blöcke)',
      'Bei gleich langen Folgen die erste (linke) wählen',
      'Diese Folge einmalig durch :: ersetzen',
    ],
    explanation:
      'Erst die Blöcke einzeln vereinfachen, dann die Nullfolge suchen. Wer die Reihenfolge vertauscht, übersieht leicht Blöcke wie `0000`, die erst nach Schritt 2 als `0` erkennbar sind.',
  },
  {
    id: 'm07-q022',
    kind: 'table',
    skill: 'ipv6.compress',
    difficulty: 2,
    prompt: 'Trage für jedes Gerät bei Elektro Krämer die **kanonisch gekürzte** Adresse ein.',
    columns: [
      { key: 'full', label: 'Vollständige Adresse', type: 'text' },
      { key: 'short', label: 'Gekürzt', type: 'text' },
    ],
    rows: [
      { label: 'Router (LAN)', cells: { full: { given: '2a02:0810:0b00:4b00:0000:0000:0000:0001' }, short: { answer: '2a02:810:b00:4b00::1' } } },
      { label: 'Server', cells: { full: { given: '2a02:0810:0b00:4b00:0000:0000:0000:00a1' }, short: { answer: '2a02:810:b00:4b00::a1' } } },
      { label: 'Loopback', cells: { full: { given: '0000:0000:0000:0000:0000:0000:0000:0001' }, short: { answer: '::1' } } },
      { label: 'Netz', cells: { full: { given: '2001:0db8:4b00:0010:0000:0000:0000:0000' }, short: { answer: '2001:db8:4b00:10::' } } },
    ],
    explanation:
      '- `2a02:0810:0b00:4b00:0:0:0:1` → `2a02:810:b00:4b00::1`\n- …`00a1` → `a1` → `2a02:810:b00:4b00::a1`\n- 7 Nullblöcke + 1 → `::1`\n- `0010` → `10`, Rest Nullen → `2001:db8:4b00:10::`',
    hints: ['Achte auf Nullen am Blockende (0810, 0b00, 4b00): die bleiben!'],
  },

  /* ---------------------------------------------------------------- */
  /* ipv6.expand                                                       */
  /* ---------------------------------------------------------------- */
  {
    id: 'm07-q023',
    kind: 'text',
    skill: 'ipv6.expand',
    difficulty: 1,
    prompt: 'Schreibe die Adresse `2001:db8:a::12` **vollständig** aus (8 Blöcke à 4 Zeichen).',
    accept: ['2001:0db8:000a:0000:0000:0000:0000:0012'],
    placeholder: 'xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx',
    explanation:
      '1. Vorhandene Blöcke zählen: `2001`, `db8`, `a`, `12` = 4 Blöcke.\n2. `::` steht für 8 − 4 = **4** Nullblöcke.\n3. Jeden Block links mit Nullen auf 4 Stellen auffüllen.\n\nErgebnis: **`2001:0db8:000a:0000:0000:0000:0000:0012`**',
    hints: ['Wie viele Blöcke sind schon da?', '8 minus vorhandene Blöcke = Anzahl der Nullblöcke für ::'],
    widget: { kind: 'ipv6-compress', data: { address: '2001:db8:a::12' } },
  },
  {
    id: 'm07-q024',
    kind: 'text',
    skill: 'ipv6.expand',
    difficulty: 1,
    prompt: 'Schreibe `fe80::1` vollständig aus.',
    accept: ['fe80:0000:0000:0000:0000:0000:0000:0001'],
    placeholder: 'vollständige Adresse',
    explanation: 'Vorhanden: 2 Blöcke (`fe80`, `1`) → `::` = 6 Nullblöcke. Ergebnis: **`fe80:0000:0000:0000:0000:0000:0000:0001`**.',
  },
  {
    id: 'm07-q025',
    kind: 'number',
    skill: 'ipv6.expand',
    difficulty: 2,
    prompt: 'Wie viele Null-Blöcke ersetzt `::` in der Adresse `2001:db8:0:5::c0:ffee`?',
    answer: 2,
    unit: 'Blöcke',
    explanation:
      'Vorhandene Blöcke: `2001`, `db8`, `0`, `5`, `c0`, `ffee` = 6. Achtung: Der einzelne `0`-Block zählt mit! 8 − 6 = **2**.\n\nVollständig: `2001:0db8:0000:0005:0000:0000:00c0:ffee`.',
    hints: ['Auch ein ausgeschriebener 0-Block ist ein Block.'],
  },
  {
    id: 'm07-q026',
    kind: 'single',
    skill: 'ipv6.expand',
    difficulty: 2,
    prompt: 'Warum ist `2001::db8::1` **keine** gültige IPv6-Adresse?',
    options: [
      'Weil `db8` nicht auf 4 Stellen aufgefüllt ist.',
      'Weil `::` zweimal vorkommt und dadurch nicht eindeutig ist, wie viele Nullblöcke wo fehlen.',
      'Weil eine Adresse nie mit `1` enden darf.',
      'Weil `2001` kein gültiges Präfix ist.',
    ],
    answer: 1,
    distractors: {
      '0': { why: 'Führende Nullen dürfen weggelassen werden – `db8` ist korrekt.', error: 'regel-erfunden' },
      '2': { why: 'Eine Endung auf `1` ist völlig normal (z. B. `::1`, `2001:db8::1`).', error: 'regel-erfunden' },
      '3': { why: '`2001` liegt im Global-Unicast-Bereich 2000::/3 – völlig gültig.', error: 'regel-erfunden' },
    },
    explanation:
      'Es fehlen insgesamt 5 Nullblöcke. Ob 1+4, 2+3, 3+2 oder 4+1 – das kann der Empfänger nicht entscheiden. Deshalb darf `::` **nur einmal** pro Adresse stehen.',
  },
  {
    id: 'm07-q027',
    kind: 'text',
    skill: 'ipv6.expand',
    difficulty: 2,
    prompt: 'Schreibe die Multicast-Adresse `ff02::1:ff00:1` vollständig aus.',
    accept: ['ff02:0000:0000:0000:0000:0001:ff00:0001'],
    placeholder: 'vollständige Adresse',
    explanation:
      'Vorhanden: `ff02`, `1`, `ff00`, `1` = 4 Blöcke → `::` ersetzt 4 Nullblöcke. Ergebnis: **`ff02:0000:0000:0000:0000:0001:ff00:0001`** (das ist eine Solicited-Node-Multicast-Adresse, wie sie NDP nutzt).',
  },

  /* ---------------------------------------------------------------- */
  /* ipv6.type / ipv6.prefix                                           */
  /* ---------------------------------------------------------------- */
  {
    id: 'm07-q028',
    kind: 'match',
    skill: 'ipv6.type',
    difficulty: 1,
    prompt: 'Ordne jede Adresse ihrem Adresstyp zu.',
    left: ['fe80::a1b2:3ff:fe4c:5d6e', '2a02:810:b00:4b00::a1', 'fd12:3456:789a:1::10', 'ff02::1', '::1', '::'],
    right: ['Global Unicast', 'Link-Local', 'Loopback', 'Multicast', 'Unique Local (ULA)', 'Unspezifizierte Adresse'],
    answer: [1, 0, 4, 3, 2, 5],
    explanation:
      '| Adresse | Erkennungsmerkmal | Typ |\n|---|---|---|\n| `fe80::…` | fe80::/10 | Link-Local |\n| `2a02:…` | beginnt mit 2 oder 3 (2000::/3) | Global Unicast |\n| `fd…` | fc00::/7, in der Praxis fd00::/8 | Unique Local |\n| `ff02::1` | ff00::/8 | Multicast (alle Knoten) |\n| `::1` | | Loopback |\n| `::` | alles 0 | unspezifiziert |',
    hints: ['Schau auf die ersten 1–2 Hex-Zeichen.'],
  },
  {
    id: 'm07-q029',
    kind: 'single',
    skill: 'ipv6.type',
    difficulty: 1,
    prompt: 'Welchen Adresstyp gibt es bei IPv6 **nicht** mehr?',
    options: ['Unicast', 'Multicast', 'Anycast', 'Broadcast'],
    answer: 3,
    distractors: {
      '0': { why: 'Unicast (1:1) ist der Normalfall, z. B. Global Unicast oder Link-Local.', error: 'adresstypen' },
      '1': { why: 'Multicast (ff00::/8) ist bei IPv6 sogar wichtiger als bei IPv4 – er ersetzt den Broadcast.', error: 'adresstypen' },
      '2': { why: 'Anycast gibt es: Eine Adresse wird mehreren Geräten zugewiesen, das „nächste“ antwortet.', error: 'adresstypen' },
    },
    explanation:
      'IPv6 kennt **keinen Broadcast**. Wo IPv4 „an alle“ sendet (z. B. ARP), nutzt IPv6 gezielte **Multicast**-Gruppen (z. B. `ff02::1` alle Knoten, Solicited-Node-Multicast bei NDP). Das entlastet alle Geräte, die nicht gemeint sind.',
  },
  {
    id: 'm07-q030',
    kind: 'single',
    skill: 'ipv6.type',
    difficulty: 2,
    prompt: 'An welche Geräte geht ein Paket an `ff02::2`?',
    options: ['An alle Knoten im lokalen Link', 'An alle Router im lokalen Link', 'An alle DHCPv6-Server weltweit', 'An den Loopback des eigenen Rechners'],
    answer: 1,
    distractors: {
      '0': { why: 'Alle Knoten wäre `ff02::1`.', error: 'multicast-gruppen' },
      '2': { why: 'DHCPv6-Server/Relays im Link erreicht man über `ff02::1:2`. Der Scope `2` (ff**02**) bedeutet link-lokal, nicht weltweit.', error: 'multicast-scope' },
      '3': { why: 'Loopback ist `::1`.', error: 'adresstypen' },
    },
    explanation:
      '`ff02::2` = **All-Routers-Multicast** im Link-Scope (die 2 in ff0**2** steht für „link-local“). Clients senden ihre Router Solicitation dorthin.',
  },
  {
    id: 'm07-q031',
    kind: 'multi',
    skill: 'ipv6.type',
    difficulty: 2,
    prompt: 'Welche dieser Adressen sind im Internet **global routbar**?',
    options: ['2a02:810:b00:4b00::a1', '2003:e5:1f00:2::7', 'fe80::1', 'fd00:1234::10', 'ff02::1', '::1'],
    answer: [0, 1],
    explanation:
      'Nur **Global-Unicast**-Adressen (2000::/3, erste Hex-Ziffer 2 oder 3) werden im Internet geroutet. `fe80::` bleibt im Link, `fd..` (ULA) ist nur intern gedacht (vergleichbar mit privaten IPv4-Netzen), `ff02::1` ist link-lokaler Multicast, `::1` Loopback.',
  },
  {
    id: 'm07-q032',
    kind: 'single',
    skill: 'ipv6.prefix',
    difficulty: 1,
    prompt: 'Was bedeutet `/64` hinter einer IPv6-Adresse?',
    options: [
      'Die Adresse ist 64 Bit lang.',
      'Die ersten 64 Bit bilden das Präfix (Netzanteil), die restlichen 64 Bit die Interface-ID.',
      'Im Netz dürfen maximal 64 Geräte sein.',
      'Die Adresse gehört zum 64. Subnetz.',
    ],
    answer: 1,
    distractors: {
      '0': { why: 'Jede IPv6-Adresse ist 128 Bit lang. Die Zahl gibt nur die Länge des Präfixes an.', error: 'praefix-missverstanden' },
      '2': { why: 'Ein /64 bietet 2⁶⁴ Interface-IDs – praktisch unbegrenzt.', error: 'praefix-missverstanden' },
      '3': { why: 'Die Präfixlänge sagt nichts über die Nummer des Subnetzes.', error: 'praefix-missverstanden' },
    },
    explanation:
      'Wie bei CIDR in IPv4 gibt die Zahl nach dem Schrägstrich an, **wie viele Bit von links zum Netz gehören**. `/64` ist das Standard-Subnetz für LANs.',
  },
  {
    id: 'm07-q033',
    kind: 'text',
    skill: 'ipv6.prefix',
    difficulty: 2,
    prompt: 'Der Server hat die Adresse `2001:db8:4b00:12:a::1/64`. Wie lautet das **Netzpräfix** (in Kurzform mit /64)?',
    accept: ['2001:db8:4b00:12::/64', '2001:db8:4b00:12::', '2001:0db8:4b00:0012::/64'],
    placeholder: 'z. B. 2001:db8:…::/64',
    explanation:
      '/64 = die ersten **4 Blöcke** (4 · 16 Bit) gehören zum Netz: `2001:db8:4b00:12`. Die Interface-ID (`a::1` → `000a:0000:0000:0001`) wird auf 0 gesetzt → **`2001:db8:4b00:12::/64`**.',
    hints: ['Bei /64 sind es genau 4 Blöcke.', 'Den Rest auf 0 setzen und mit :: kürzen.'],
  },
  {
    id: 'm07-q034',
    kind: 'single',
    skill: 'ipv6.prefix',
    difficulty: 2,
    prompt: 'Welche Präfixlänge erhält ein Unternehmensstandort typischerweise vom Provider?',
    options: ['/32', '/48 (bei kleineren Anschlüssen oft /56)', '/64', '/128'],
    answer: 1,
    distractors: {
      '0': { why: '/32 ist eine typische Zuteilung an einen **Provider** (LIR) von der Registry.', error: 'praefix-hierarchie' },
      '2': { why: '/64 ist **ein einzelnes** Subnetz – damit könnte der Standort nicht unterteilen.', error: 'praefix-hierarchie' },
      '3': { why: '/128 ist eine einzelne Adresse (Host-Route).', error: 'praefix-hierarchie' },
    },
    explanation:
      'Die übliche Hierarchie: Registry → Provider **/32** → Standort **/48** (Privat- und Kleinkundenanschlüsse oft **/56**) → einzelnes LAN **/64** → Host /128. Mit /48 hat ein Standort 2¹⁶ = 65.536 /64-Subnetze.',
  },
  {
    id: 'm07-q035',
    kind: 'single',
    skill: 'ipv6.type',
    difficulty: 2,
    prompt:
      '`ipconfig` zeigt auf einem PC: `Verbindungslokale IPv6-Adresse . . : fe80::a65e:60ff:fe12:3456%12`. Was bedeutet `%12`?',
    options: [
      'Die Präfixlänge ist /12.',
      'Die Zonen-ID: Die Adresse gehört zur Netzwerkschnittstelle mit Index 12.',
      'Die Adresse ist zu 12 % ausgelastet.',
      'Es ist das 12. Subnetz.',
    ],
    answer: 1,
    distractors: {
      '0': { why: 'Die Präfixlänge wird mit `/` angegeben, nicht mit `%`.', error: 'notation' },
      '2': { why: 'Adressen haben keine Auslastung.', error: 'notation' },
      '3': { why: 'Link-Local-Adressen haben kein Subnetz-Numbering; fe80::/64 ist auf jedem Link gleich.', error: 'notation' },
    },
    explanation:
      'Link-Local-Adressen beginnen auf **jeder** Schnittstelle mit `fe80::/64`. Damit der PC weiß, über welche Schnittstelle er senden soll, hängt man die **Zonen-ID** an (`%12` unter Windows = Interface-Index, unter Linux z. B. `%eth0`). Beispiel: `ping fe80::1%12`.',
  },

  /* ---------------------------------------------------------------- */
  /* ipv6.slaac / ipv6.dhcpv6 / ipv6.vs4                                */
  /* ---------------------------------------------------------------- */
  {
    id: 'm07-q036',
    kind: 'order',
    skill: 'ipv6.slaac',
    difficulty: 2,
    prompt: 'Ein neuer PC bei Elektro Krämer wird per SLAAC konfiguriert. Bringe die Schritte in die richtige Reihenfolge.',
    items: [
      'PC bildet eine Link-Local-Adresse (fe80::/64 + Interface-ID)',
      'Duplicate Address Detection (DAD) für die Link-Local-Adresse per Neighbor Solicitation',
      'PC sendet Router Solicitation (RS) an ff02::2',
      'Router antwortet mit Router Advertisement (RA): Präfix, Präfixlänge, Flags, Gateway = Absender',
      'PC bildet die globale Adresse aus Präfix + Interface-ID',
      'DAD für die neue globale Adresse, danach ist sie nutzbar',
    ],
    explanation:
      'Ohne Link-Local-Adresse kann der PC gar nicht mit dem Router sprechen – deshalb kommt sie zuerst. DAD prüft jeweils, ob die Adresse schon belegt ist. Das RA liefert das Präfix; der Router (seine Link-Local-Adresse) wird automatisch Default-Gateway.',
  },
  {
    id: 'm07-q037',
    kind: 'text',
    skill: 'ipv6.slaac',
    difficulty: 3,
    prompt:
      'Bilde die **modifizierte EUI-64-Interface-ID** zur MAC-Adresse `00:11:22:33:44:55`. Schreibe sie als 4 Blöcke (z. B. `xxxx:xxxx:xxxx:xxxx`).',
    accept: ['0211:22ff:fe33:4455', '211:22ff:fe33:4455'],
    placeholder: 'xxxx:xxxx:xxxx:xxxx',
    explanation:
      '1. MAC teilen: `00:11:22` | `33:44:55`\n2. `ff:fe` einfügen: `00:11:22:ff:fe:33:44:55`\n3. Im ersten Byte das 7. Bit (U/L-Bit, Wert 2) umdrehen: `00` = `0000 0000` → `0000 0010` = `02`\n4. In 16-Bit-Blöcke gruppieren: **`0211:22ff:fe33:4455`**\n\nDie Link-Local-Adresse wäre dann `fe80::211:22ff:fe33:4455`.',
    hints: ['In der Mitte wird ff:fe eingefügt.', 'Im ersten Byte wird das Bit mit dem Wert 2 invertiert.'],
  },
  {
    id: 'm07-q038',
    kind: 'single',
    skill: 'ipv6.dhcpv6',
    difficulty: 3,
    prompt:
      'Der Router sendet Router Advertisements mit **M-Flag = 0** und **O-Flag = 1**. Wie konfiguriert sich ein Client?',
    options: [
      'Adresse komplett per DHCPv6 (stateful), keine Nutzung des RA',
      'Adresse per SLAAC, zusätzliche Infos wie DNS-Server per stateless DHCPv6',
      'Nur Link-Local-Adresse, keine globale Adresse',
      'Adresse per DHCPv4, DNS per RA',
    ],
    answer: 1,
    distractors: {
      '0': { why: 'Stateful DHCPv6 wird mit **M = 1** (Managed) signalisiert.', error: 'ra-flags' },
      '2': { why: 'Enthält das RA ein Präfix mit A-Flag, bildet der Client per SLAAC auch eine globale Adresse.', error: 'ra-flags' },
      '3': { why: 'DHCPv4 hat mit der IPv6-Konfiguration nichts zu tun.', error: 'protokolle-verwechselt' },
    },
    explanation:
      '**M (Managed)** = Adressen vom DHCPv6-Server (stateful). **O (Other)** = „weitere Informationen“ (DNS, Domain) vom DHCPv6-Server, Adresse aber selbst per SLAAC → **stateless DHCPv6**. Das Default-Gateway kommt bei IPv6 **immer aus dem RA**, nie aus DHCPv6.',
  },
  {
    id: 'm07-q039',
    kind: 'match',
    skill: 'ipv6.vs4',
    difficulty: 2,
    prompt: 'Ordne jedem IPv4-Konzept das IPv6-Gegenstück zu.',
    left: ['ARP', 'Broadcast', 'TTL', '127.0.0.1', 'APIPA 169.254.0.0/16', 'Privates Netz 192.168.0.0/16'],
    right: ['::1', 'fe80::/10 (Link-Local)', 'Hop Limit', 'Multicast', 'NDP (Neighbor Discovery, ICMPv6)', 'ULA fd00::/8'],
    answer: [4, 3, 2, 0, 1, 5],
    explanation:
      '- ARP → **NDP** (Neighbor Solicitation/Advertisement über ICMPv6)\n- Broadcast → **Multicast**\n- TTL → **Hop Limit** (gleiche Funktion, neuer Name)\n- 127.0.0.1 → **::1**\n- APIPA → **Link-Local fe80::** (bei IPv6 aber immer vorhanden, nicht nur als Notlösung)\n- Private Netze → **ULA** (fd00::/8)',
  },
  {
    id: 'm07-q040',
    kind: 'multi',
    skill: 'ipv6.slaac',
    difficulty: 2,
    prompt: 'Welche Aussagen zu **Privacy Extensions** (temporäre/zufällige Interface-IDs) sind richtig?',
    options: [
      'Sie verhindern, dass ein Gerät über die aus der MAC-Adresse abgeleitete Interface-ID im Internet wiedererkannt wird.',
      'Die Interface-ID wird zufällig erzeugt und bei temporären Adressen regelmäßig gewechselt.',
      'Sie ersetzen die Firewall.',
      'Windows verwendet standardmäßig zufällige Interface-IDs statt EUI-64.',
      'Sie funktionieren nur mit stateful DHCPv6.',
    ],
    answer: [0, 1, 3],
    explanation:
      'Bei EUI-64 steckt die MAC-Adresse in der Adresse – ein Laptop wäre in jedem Netz am gleichen Adressende erkennbar. Privacy Extensions (RFC 8981) erzeugen **zufällige, wechselnde** IIDs für ausgehende Verbindungen. Windows und die meisten modernen Systeme nutzen standardmäßig zufällige IIDs. Mit Firewall oder DHCPv6 hat das nichts zu tun – es ist ein SLAAC-Mechanismus.',
  },
  {
    id: 'm07-q041',
    kind: 'multi',
    skill: 'ipv6.vs4',
    difficulty: 2,
    prompt: 'Welche Aussagen zum IPv6-Header im Vergleich zu IPv4 sind richtig?',
    options: [
      'Der IPv6-Basisheader hat eine feste Länge von 40 Byte.',
      'Der IPv6-Header hat keine Header-Prüfsumme mehr.',
      'Router fragmentieren IPv6-Pakete unterwegs, genau wie bei IPv4.',
      'Optionen werden in Extension Headern über das Feld „Next Header“ verkettet.',
      'Das Feld TTL heißt bei IPv6 Hop Limit.',
    ],
    answer: [0, 1, 3, 4],
    explanation:
      'IPv6 vereinfacht den Header (feste 40 Byte statt 20–60 Byte), lässt die Prüfsumme weg (Schicht 2 und 4 prüfen ohnehin) und verlagert Optionen in Extension Header. **Router fragmentieren bei IPv6 nicht** – nur der Absender, nach Path-MTU-Discovery (Mindest-MTU 1280 Byte).',
  },
  {
    id: 'm07-q042',
    kind: 'free',
    skill: 'ipv6.slaac',
    difficulty: 2,
    prompt:
      'Eine Kollegin wundert sich: Auf einem frisch installierten Windows-PC zeigt `ipconfig` eine Adresse `fe80::…`, obwohl es im Netz weder DHCP noch eine IPv6-Konfiguration gibt. Erkläre ihr in 3–5 Sätzen, woher die Adresse kommt und wofür sie gebraucht wird.',
    modelAnswer:
      'Das ist eine Link-Local-Adresse aus dem Bereich fe80::/10. Jedes IPv6-fähige Interface erzeugt sie automatisch selbst, sobald es aktiv ist – ohne Router oder DHCP: fe80::/64 plus eine (bei Windows zufällige) Interface-ID; per Duplicate Address Detection wird geprüft, dass sie eindeutig ist. Sie gilt nur im lokalen Netzsegment und wird nicht geroutet. Gebraucht wird sie für die Kommunikation im Link, z. B. für Neighbor Discovery, um Router Solicitations zu senden und Router Advertisements zu empfangen; auch das Default-Gateway ist die Link-Local-Adresse des Routers. Sie ist also kein Fehler, sondern Normalzustand.',
    keywords: ['Link-Local', 'fe80', 'automatisch', 'nicht geroutet', 'NDP', 'Router Advertisement', 'Interface-ID'],
    explanation:
      'Kernpunkte: automatisch selbst erzeugt, fe80::/10, nur lokaler Link, Grundlage für NDP/SLAAC. Unterschied zu APIPA bei IPv4: Link-Local ist bei IPv6 **immer** da, nicht nur als Notlösung.',
  },
  {
    id: 'm07-q043',
    kind: 'free',
    skill: 'ipv6.vs4',
    difficulty: 3,
    prompt:
      'Herr Krämer sagt: „Mit IPv6 hat jeder PC eine öffentliche Adresse. Dann sind wir doch schutzlos, weil das NAT fehlt.“ Nimm Stellung (4–6 Sätze).',
    modelAnswer:
      'Richtig ist, dass bei IPv6 in der Regel kein NAT verwendet wird und jeder PC eine global eindeutige Adresse bekommt. NAT ist aber kein Sicherheitsmechanismus, sondern ein Notbehelf gegen Adressknappheit; der Schutz kam bei IPv4 eigentlich von der zustandsbehafteten Firewall-Funktion des Routers. Bei IPv6 übernimmt diese Rolle eine Stateful Firewall: Sie lässt nur Antworten auf von innen aufgebaute Verbindungen herein und blockiert unaufgeforderte eingehende Verbindungen. Zusätzlich sorgen Privacy Extensions dafür, dass Clients mit wechselnden Adressen nach außen kommunizieren. Mit korrekt konfigurierter Firewall ist das Netz also nicht schlechter geschützt als mit IPv4 und NAT.',
    keywords: ['NAT ist keine Sicherheit', 'Firewall', 'stateful', 'eingehende Verbindungen blockieren', 'Privacy Extensions'],
    explanation:
      'Entscheidend: Firewall-Regeln, nicht Adressübersetzung, schützen das Netz. Gute Antworten trennen „Erreichbarkeit/Adressierung“ von „Zugriffserlaubnis“.',
  },
  {
    id: 'm07-q044',
    kind: 'single',
    skill: 'ipv6.dhcpv6',
    difficulty: 2,
    prompt: 'Welche Information kann ein Client bei IPv6 **nicht** per DHCPv6 erhalten, sondern nur über Router Advertisements?',
    options: ['DNS-Server', 'Domain-Suchliste', 'Default-Gateway', 'IPv6-Adresse'],
    answer: 2,
    distractors: {
      '0': { why: 'DNS-Server liefert DHCPv6 (stateless oder stateful); zusätzlich geht es auch per RA (RDNSS-Option).', error: 'dhcpv6-umfang' },
      '1': { why: 'Die Domain-Suchliste ist eine typische DHCPv6-Option.', error: 'dhcpv6-umfang' },
      '3': { why: 'Genau dafür ist stateful DHCPv6 da.', error: 'dhcpv6-umfang' },
    },
    explanation:
      'DHCPv6 hat **keine Option für das Default-Gateway**. Der Client nimmt den Absender des Router Advertisements (dessen Link-Local-Adresse) als Gateway. Ohne RA funktioniert daher auch mit DHCPv6 kein Routing nach außen.',
  },

  /* ---------------------------------------------------------------- */
  /* ipv6.subnets                                                      */
  /* ---------------------------------------------------------------- */
  {
    id: 'm07-q045',
    kind: 'number',
    skill: 'ipv6.subnets',
    difficulty: 1,
    prompt: 'Elektro Krämer erhält das Präfix `2001:db8:4b00::/48`. Wie viele `/64`-Subnetze lassen sich daraus bilden?',
    answer: 65536,
    unit: 'Subnetze',
    explanation: 'Subnetz-Bits = 64 − 48 = 16. Anzahl = 2¹⁶ = **65.536** Subnetze.',
    hints: ['Differenz der Präfixlängen bilden.', '2 hoch Differenz.'],
  },
  {
    id: 'm07-q046',
    kind: 'number',
    skill: 'ipv6.subnets',
    difficulty: 1,
    prompt: 'Ein Kleinbetrieb erhält ein `/56`. Wie viele `/64`-Subnetze hat er?',
    answer: 256,
    unit: 'Subnetze',
    explanation: '64 − 56 = 8 Bit → 2⁸ = **256** Subnetze (Subnetz-IDs `00` bis `ff` in den letzten beiden Hex-Zeichen des 4. Blocks).',
  },
  {
    id: 'm07-q047',
    kind: 'text',
    skill: 'ipv6.subnets',
    difficulty: 2,
    prompt:
      'Aus `2001:db8:4b00::/48` werden /64-Subnetze gebildet. Das **erste** Subnetz hat die Subnetz-ID 0. Wie lautet das **10.** Subnetz (Kurzform mit /64)?',
    accept: ['2001:db8:4b00:9::/64', '2001:db8:4b00:9::', '2001:0db8:4b00:0009::/64'],
    placeholder: '2001:db8:4b00:…::/64',
    explanation:
      'Die Subnetz-ID steht im **4. Block** (Bit 49–64). Erstes Subnetz = ID 0 → das 10. Subnetz hat ID **9** (dezimal 9 = hex 9).\n\n→ **`2001:db8:4b00:9::/64`**',
    hints: ['Zählung beginnt bei 0.', 'Die Subnetz-ID kommt in den 4. Block.'],
  },
  {
    id: 'm07-q048',
    kind: 'text',
    skill: 'ipv6.subnets',
    difficulty: 2,
    prompt: 'Die Abteilung „Werkstatt“ soll die Subnetz-ID **26 (dezimal)** aus `2001:db8:4b00::/48` erhalten. Wie lautet ihr /64-Präfix?',
    accept: ['2001:db8:4b00:1a::/64', '2001:db8:4b00:1a::', '2001:0db8:4b00:001a::/64'],
    placeholder: '2001:db8:4b00:…::/64',
    explanation:
      'Dezimal 26 in Hex umrechnen: 26 ÷ 16 = 1 Rest 10 → `1` und `a` → **1a**. Ins 4. Block eintragen: **`2001:db8:4b00:1a::/64`**.\n\nTypischer Fehler: `2001:db8:4b00:26::/64` – das wäre Subnetz-ID 0x26 = 38 dezimal.',
    hints: ['Die Subnetz-ID muss in Hex geschrieben werden.', '26 = 1 · 16 + 10'],
  },
  {
    id: 'm07-q049',
    kind: 'table',
    skill: 'ipv6.subnets',
    difficulty: 2,
    prompt:
      'Plane die /64-Subnetze aus `2001:db8:4b00::/48`. Trage für jede Abteilung das Präfix in Kurzform ein (mit /64).',
    columns: [
      { key: 'id', label: 'Subnetz-ID (dezimal)', type: 'number' },
      { key: 'hex', label: 'Subnetz-ID (hex)', type: 'text' },
      { key: 'prefix', label: 'Präfix', type: 'text' },
    ],
    rows: [
      {
        label: 'Verwaltung',
        cells: { id: { given: '1' }, hex: { answer: '1' }, prefix: { answer: '2001:db8:4b00:1::/64', accept: ['2001:db8:4b00:1::'] } },
      },
      {
        label: 'Werkstatt',
        cells: { id: { given: '16' }, hex: { answer: '10', accept: ['0010'] }, prefix: { answer: '2001:db8:4b00:10::/64', accept: ['2001:db8:4b00:10::'] } },
      },
      {
        label: 'Gäste-WLAN',
        cells: { id: { given: '100' }, hex: { answer: '64', accept: ['0064'] }, prefix: { answer: '2001:db8:4b00:64::/64', accept: ['2001:db8:4b00:64::'] } },
      },
      {
        label: 'Server',
        cells: { id: { given: '255' }, hex: { answer: 'ff', accept: ['00ff'] }, prefix: { answer: '2001:db8:4b00:ff::/64', accept: ['2001:db8:4b00:ff::'] } },
      },
    ],
    explanation:
      '1 = 0x1; 16 = 1·16 + 0 = 0x10; 100 = 6·16 + 4 = 0x64; 255 = 15·16 + 15 = 0xff. Die Hex-ID kommt in den 4. Block, der Rest ist 0 → `::`.',
    hints: ['Dezimal durch 16 teilen, Rest notieren.'],
  },
  {
    id: 'm07-q050',
    kind: 'single',
    skill: 'ipv6.subnets',
    difficulty: 2,
    prompt: 'Warum verwendet man für LAN-Segmente bei IPv6 fast immer `/64` und nicht z. B. `/120`, um Adressen zu „sparen“?',
    options: [
      'Weil Switches nur /64 verstehen.',
      'Weil SLAAC (und damit viele Clients) eine 64 Bit lange Interface-ID voraussetzt.',
      'Weil /120 nur für IPv4 gilt.',
      'Weil Router keine Präfixe länger als /64 routen können.',
    ],
    answer: 1,
    distractors: {
      '0': { why: 'Switches arbeiten auf Schicht 2 mit MAC-Adressen – Präfixe interessieren sie nicht.', error: 'schichten-verwechselt' },
      '2': { why: 'Präfixlängen bis /128 sind bei IPv6 gültig.', error: 'praefix-missverstanden' },
      '3': { why: 'Router können auch /127 oder /128 routen (z. B. Punkt-zu-Punkt-Links, Loopbacks).', error: 'praefix-missverstanden' },
    },
    explanation:
      'SLAAC bildet Adressen aus **Präfix (64 Bit) + Interface-ID (64 Bit)**. Mit einem anderen Präfix funktioniert die automatische Konfiguration nicht – und manche Geräte (z. B. Android) unterstützen kein stateful DHCPv6. Adressen sparen ist bei 2⁶⁴ pro Subnetz ohnehin unnötig.',
  },
  {
    id: 'm07-q051',
    kind: 'text',
    skill: 'ipv6.subnets',
    difficulty: 3,
    prompt:
      'Das /48 `2001:db8:4b00::/48` wird in **/52**-Blöcke für Standorte geteilt (erster Block = Nr. 0). Wie lautet der Block **Nr. 3** (Kurzform mit /52)?',
    accept: ['2001:db8:4b00:3000::/52', '2001:db8:4b00:3000::'],
    placeholder: '2001:db8:4b00:…::/52',
    explanation:
      '/48 → /52: 4 zusätzliche Bit = 1 Hex-Zeichen. Es ist das **erste** (höchstwertige) Zeichen des 4. Blocks.\n\n| Nr. | 4. Block |\n|---|---|\n| 0 | `0000` |\n| 1 | `1000` |\n| 2 | `2000` |\n| 3 | **`3000`** |\n\nErgebnis: **`2001:db8:4b00:3000::/52`** (16 Blöcke à 4096 /64-Subnetze).',
    hints: ['4 Bit = 1 Hex-Zeichen.', 'Welches Zeichen im 4. Block gehört zu Bit 49–52?'],
  },
];

export const m07: Module = {
  id: 'm07',
  nr: 7,
  title: 'IPv6',
  short: 'Aufbau, Hexadezimalsystem, Kürzungsregeln, Adresstypen, SLAAC/DHCPv6 und Subnetzplanung mit IPv6.',
  icon: 'Globe',
  relevance: 'ap1-teilweise',
  prerequisites: ['m03', 'm04'],
  generators: ['ipv6.compress', 'ipv6.expand', 'ipv6.subnets', 'ipv6.type', 'bin.hex'],
  skills: [
    { id: 'ipv6.structure', module: 'm07', title: 'Aufbau einer IPv6-Adresse' },
    { id: 'ipv6.hex', module: 'm07', title: 'Hexadezimal ↔ Binär ↔ Dezimal umrechnen' },
    { id: 'ipv6.compress', module: 'm07', title: 'IPv6-Adressen kürzen', requires: ['ipv6.structure', 'ipv6.hex'] },
    { id: 'ipv6.expand', module: 'm07', title: 'IPv6-Adressen vollständig ausschreiben', requires: ['ipv6.structure'] },
    { id: 'ipv6.prefix', module: 'm07', title: 'Präfix und Interface-ID bestimmen', requires: ['ipv6.structure'] },
    { id: 'ipv6.type', module: 'm07', title: 'IPv6-Adresstypen erkennen', requires: ['ipv6.prefix'] },
    { id: 'ipv6.slaac', module: 'm07', title: 'SLAAC, NDP und Interface-IDs (EUI-64/Privacy)', requires: ['ipv6.type'] },
    { id: 'ipv6.dhcpv6', module: 'm07', title: 'DHCPv6 stateful/stateless und RA-Flags', requires: ['ipv6.slaac'] },
    { id: 'ipv6.vs4', module: 'm07', title: 'Unterschiede IPv4 ↔ IPv6' },
    { id: 'ipv6.subnets', module: 'm07', title: 'IPv6-Subnetze planen', requires: ['ipv6.prefix', 'ipv6.hex'] },
  ],
  questions,
  lessons: [
    /* ============================================================== */
    {
      id: 'm07-l01',
      title: 'Warum IPv6? Aufbau einer IPv6-Adresse',
      minutes: 15,
      relevance: 'ap1',
      skills: ['ipv6.structure', 'ipv6.vs4'],
      steps: [
        {
          type: 'explain',
          title: 'Das Problem: IPv4 ist voll',
          body: `Eine IPv4-Adresse hat **32 Bit**. Damit sind höchstens 2³² = **4.294.967.296** Adressen möglich – rund 4,3 Milliarden. Das klang 1981 nach unendlich viel. Heute hat aber fast jeder Mensch mehrere Geräte (Smartphone, Laptop, Smart-TV), dazu kommen Server, Drucker, Kameras und IoT-Geräte.

Die regionalen Vergabestellen (für Europa die RIPE NCC) haben ihre freien IPv4-Bestände längst verteilt. Notlösungen wie **NAT** (viele private Adressen teilen sich eine öffentliche) halten IPv4 am Leben, machen Netze aber komplizierter.

**IPv6** löst das Problem grundsätzlich: Eine Adresse hat **128 Bit**.

| | IPv4 | IPv6 |
|---|---|---|
| Adresslänge | 32 Bit | 128 Bit |
| Anzahl Adressen | 2³² ≈ 4,3 · 10⁹ | 2¹²⁸ ≈ 3,4 · 10³⁸ |
| Schreibweise | 4 Oktette dezimal, Punkte | 8 Blöcke hexadezimal, Doppelpunkte |
| Beispiel | \`192.168.10.25\` | \`2001:db8:4b00:10::25\` |

3,4 · 10³⁸ ist eine Zahl mit 39 Stellen. Man könnte jedem Sandkorn der Erde Billionen Adressen geben – Knappheit ist bei IPv6 kein Thema mehr.`,
        },
        {
          type: 'explain',
          title: 'Aufbau: 8 Blöcke à 16 Bit',
          body: `128 Bit binär zu schreiben wäre unlesbar. Deshalb teilt man die Adresse in **8 Blöcke à 16 Bit** (auch *Hextets* genannt) und schreibt jeden Block als **4 Hexadezimalzeichen**. Die Blöcke werden durch **Doppelpunkte** getrennt.

\`\`\`
2001:0db8:4b00:0010:0000:0000:0000:0025
└─┬┘ └─┬┘ └─┬┘ └─┬┘ └─┬┘ └─┬┘ └─┬┘ └─┬┘
 16    16   16   16   16   16   16   16   = 128 Bit
\`\`\`

Warum gerade Hex? Ein Hex-Zeichen steht für genau **4 Bit**. 4 Zeichen · 4 Bit = 16 Bit pro Block, 8 Blöcke · 16 Bit = 128 Bit. Das geht glatt auf.

**Präfix und Interface-ID:** Wie bei IPv4 besteht eine Adresse aus Netz- und Host-Teil. Bei IPv6 heißen sie **Präfix** und **Interface-ID (IID)**. Im LAN ist das Präfix fast immer **/64**:

| Bit 1–64 | Bit 65–128 |
|---|---|
| Präfix (Netz) – vom Provider/Router | Interface-ID (Gerät) |
| \`2001:0db8:4b00:0010\` | \`0000:0000:0000:0025\` |

**Hinweis zu den Beispielen:** \`2001:db8::/32\` ist ein offizielles **Dokumentationspräfix** (RFC 3849). Es wird in Büchern und Prüfungen verwendet und im Internet nie geroutet – genau wie \`192.0.2.0/24\` bei IPv4.`,
        },
        {
          type: 'visual',
          title: 'IPv4 und IPv6 im Vergleich',
          widget: {
            kind: 'cards',
            data: {
              columns: 2,
              items: [
                { title: 'IPv4: 32 Bit', text: '4 Oktette à 8 Bit, dezimal mit Punkten: 192.168.10.25. Netzanteil per Subnetzmaske oder /CIDR.', icon: 'Binary' },
                { title: 'IPv6: 128 Bit', text: '8 Blöcke à 16 Bit, hexadezimal mit Doppelpunkten: 2001:db8:4b00:10::25. Netzanteil per Präfixlänge (/64).', icon: 'Globe' },
                { title: 'Präfix /64', text: 'Die ersten 64 Bit: Welches Netz? Kommt bei SLAAC vom Router (Router Advertisement).', icon: 'Network' },
                { title: 'Interface-ID', text: 'Die letzten 64 Bit: Welches Gerät? Bildet der Client meist selbst (zufällig oder EUI-64).', icon: 'Laptop' },
              ],
            },
          },
          caption: 'Die Logik „Netzanteil + Hostanteil“ bleibt gleich – nur länger und hexadezimal geschrieben.',
        },
        {
          type: 'example',
          title: 'Adresse zerlegen',
          problem: 'Der neue Server von Elektro Krämer hat die Adresse `2001:0db8:4b00:0010:0000:0000:0000:0025/64`. Bestimme Anzahl der Blöcke, Bits pro Block, Präfix und Interface-ID.',
          steps: [
            { label: 'Blöcke zählen', body: 'Zwischen den Doppelpunkten stehen 8 Gruppen → **8 Blöcke**.' },
            { label: 'Bits pro Block', body: 'Jeder Block hat 4 Hex-Zeichen à 4 Bit → **16 Bit**. Probe: 8 · 16 = 128 Bit.' },
            { label: 'Präfix', body: '/64 = 64 Bit = 64 ÷ 16 = **4 Blöcke**: `2001:0db8:4b00:0010`.' },
            { label: 'Interface-ID', body: 'Die restlichen 4 Blöcke: `0000:0000:0000:0025`.' },
          ],
          result: 'Präfix `2001:db8:4b00:10::/64`, Interface-ID `::25` (gekürzt) – mehr zum Kürzen in Lektion 3.',
        },
        {
          type: 'check',
          question: {
            id: 'm07-c01',
            kind: 'number',
            skill: 'ipv6.structure',
            difficulty: 1,
            prompt: 'Bei einem Präfix /64: Wie viele **Blöcke** gehören zum Präfix?',
            answer: 4,
            unit: 'Blöcke',
            explanation: '64 Bit ÷ 16 Bit pro Block = **4 Blöcke**.',
            hints: ['Ein Block = 16 Bit.'],
          },
        },
        {
          type: 'check',
          question: {
            id: 'm07-c02',
            kind: 'single',
            skill: 'ipv6.structure',
            difficulty: 1,
            prompt: 'Warum schreibt man IPv6-Adressen hexadezimal?',
            options: [
              'Weil Router nur Hex verstehen.',
              'Weil ein Hex-Zeichen genau 4 Bit darstellt und 128 Bit so kompakt und eindeutig lesbar werden.',
              'Weil Hex sicherer ist als Dezimal.',
            ],
            answer: 1,
            distractors: {
              '0': { why: 'Router arbeiten intern mit Bits. Die Schreibweise ist nur für Menschen.', error: 'darstellung-vs-intern' },
              '2': { why: 'Die Schreibweise hat nichts mit Sicherheit zu tun.', error: 'darstellung-vs-intern' },
            },
            explanation: 'Hex ist eine kompakte Darstellung von Bits: 128 Bit = 32 Hex-Zeichen statt 128 Nullen und Einsen.',
          },
        },
        {
          type: 'practice',
          title: 'Aufbau festigen',
          questionIds: ['m07-q001', 'm07-q002', 'm07-q003', 'm07-q004', 'm07-q005'],
          count: 5,
          difficulty: 1,
        },
        {
          type: 'summary',
          points: [
            'IPv6 gibt es, weil der IPv4-Adressraum (32 Bit, ≈ 4,3 Mrd.) erschöpft ist.',
            'Eine IPv6-Adresse hat 128 Bit: 8 Blöcke à 16 Bit, jeder Block 4 Hex-Zeichen, getrennt durch Doppelpunkte.',
            'Präfix (Netz) + Interface-ID (Gerät); im LAN ist das Präfix fast immer /64 → 64 Bit Interface-ID.',
            '2001:db8::/32 ist das Dokumentationspräfix für Beispiele.',
          ],
        },
      ],
    },

    /* ============================================================== */
    {
      id: 'm07-l02',
      title: 'Das Hexadezimalsystem',
      minutes: 20,
      relevance: 'ap1',
      skills: ['ipv6.hex'],
      steps: [
        {
          type: 'explain',
          title: 'Zahlensysteme: Basis 10, 2 und 16',
          body: `Im **Dezimalsystem** (Basis 10) hat jede Stelle den 10-fachen Wert der rechten Nachbarstelle: 1, 10, 100, 1000 …

Im **Binärsystem** (Basis 2, kennst du aus Modul 4) verdoppelt sich der Wert: 1, 2, 4, 8, 16 …

Im **Hexadezimalsystem** (Basis 16) hat jede Stelle den **16-fachen** Wert:

| Stelle | 4. | 3. | 2. | 1. |
|---|---|---|---|---|
| Wert | 16³ = 4096 | 16² = 256 | 16¹ = 16 | 16⁰ = 1 |

Weil eine Stelle 16 verschiedene Werte annehmen kann, reichen die Ziffern 0–9 nicht. Man nimmt **a–f** dazu:

| Dez | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hex | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | a | b | c | d | e | f |
| Bin | 0000 | 0001 | 0010 | 0011 | 0100 | 0101 | 0110 | 0111 | 1000 | 1001 | 1010 | 1011 | 1100 | 1101 | 1110 | 1111 |

**Der Trick:** 16 = 2⁴. Ein Hex-Zeichen entspricht deshalb **exakt 4 Bit** – einem *Nibble* (Halbbyte). Zwei Hex-Zeichen = 1 Byte (8 Bit). Darum ist Hex so beliebt in der IT: MAC-Adressen, IPv6, Farbcodes, Speicheradressen.

Merkhilfe für die Buchstaben: **a = 10, c = 12, f = 15** – den Rest zählst du ab.`,
        },
        {
          type: 'explain',
          title: 'Die drei Umrechnungswege',
          body: `**1. Hex → Binär (der wichtigste Weg für IPv6):** Jedes Hex-Zeichen einzeln in 4 Bit übersetzen (Stellenwerte 8-4-2-1).

\`db8\` → d = 13 = 8+4+1 → \`1101\`; b = 11 = 8+2+1 → \`1011\`; 8 → \`1000\` → \`1101 1011 1000\`

**2. Binär → Hex:** Von **rechts** in 4er-Gruppen teilen, links mit Nullen auffüllen, jede Gruppe übersetzen.

\`10 1111 0001\` → \`0010 1111 0001\` → 2 f 1 → \`2f1\`

**3. Hex ↔ Dezimal:**
- *Hex → Dez:* Ziffer · Stellenwert, dann addieren. \`1a\` = 1 · 16 + 10 · 1 = **26**
- *Dez → Hex:* Wiederholt durch 16 teilen, Reste von unten nach oben lesen.
  300 ÷ 16 = 18 Rest **12 (c)**; 18 ÷ 16 = 1 Rest **2**; 1 ÷ 16 = 0 Rest **1** → \`12c\`

**Achtung Falle:** \`10\` (hex) ist **nicht** zehn, sondern 16! Bei IPv6-Subnetz-IDs ist das ein klassischer Fehler.`,
        },
        {
          type: 'visual',
          title: 'Ein Hex-Zeichen = 4 Bit',
          widget: { kind: 'binary-octet', data: { value: 175, editable: true } },
          caption: '175 = `1010 1111` = `af`: Das linke Nibble `1010` ist a (10), das rechte `1111` ist f (15). Probe: 10 · 16 + 15 = 175. Probiere andere Werte aus!',
        },
        {
          type: 'example',
          title: 'Den Block 4b00 in alle Systeme umrechnen',
          problem: 'Elektro Krämer hat ein Präfix mit dem Block `4b00`. Rechne ihn in Binär und Dezimal um.',
          steps: [
            { label: 'Hex → Binär (nibbleweise)', body: '4 → `0100`, b (11) → `1011`, 0 → `0000`, 0 → `0000` → **`0100 1011 0000 0000`**' },
            { label: 'Hex → Dezimal', body: '4 · 4096 + 11 · 256 + 0 · 16 + 0 · 1 = 16384 + 2816 + 0 + 0 = **19200**' },
            { label: 'Probe über Binär', body: 'Gesetzte Bits: 2¹⁴ (16384) + 2¹¹ (2048) + 2⁹ (512) + 2⁸ (256) = 19200 ✔' },
          ],
          result: '`4b00` (hex) = `0100 1011 0000 0000` (bin) = **19200** (dez).',
        },
        {
          type: 'check',
          question: {
            id: 'm07-c03',
            kind: 'text',
            skill: 'ipv6.hex',
            difficulty: 1,
            prompt: 'Wandle `1100 0011` in Hexadezimal um.',
            accept: ['c3', '0xc3'],
            explanation: '`1100` = 8+4 = 12 = **c**, `0011` = 2+1 = **3** → **c3**.',
            hints: ['Nibbleweise: 8-4-2-1.'],
          },
        },
        {
          type: 'check',
          question: {
            id: 'm07-c04',
            kind: 'number',
            skill: 'ipv6.hex',
            difficulty: 2,
            prompt: 'Welchem Dezimalwert entspricht `10` (hexadezimal)?',
            answer: 16,
            explanation: '`10` hex = 1 · 16 + 0 · 1 = **16**. Nicht verwechseln mit zehn!',
          },
        },
        {
          type: 'practice',
          title: 'Hex-Training',
          generator: 'bin.hex',
          count: 6,
          difficulty: 1,
        },
        {
          type: 'practice',
          title: 'Hex-Aufgaben aus dem Pool',
          questionIds: ['m07-q006', 'm07-q007', 'm07-q008', 'm07-q010', 'm07-q011', 'm07-q012'],
          count: 6,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Hex = Basis 16, Ziffern 0–9 und a–f (a = 10 … f = 15). Stellenwerte 4096 · 256 · 16 · 1.',
            'Ein Hex-Zeichen = 4 Bit (Nibble), zwei Hex-Zeichen = 1 Byte, ein IPv6-Block = 4 Hex-Zeichen = 16 Bit.',
            'Hex → Binär nibbleweise; Binär → Hex von rechts in 4er-Gruppen.',
            'Dezimal → Hex durch wiederholtes Teilen durch 16 (Reste von unten lesen).',
            'Vorsicht: 10 (hex) = 16 (dez).',
          ],
        },
      ],
    },

    /* ============================================================== */
    {
      id: 'm07-l03',
      title: 'IPv6-Adressen kürzen und erweitern',
      minutes: 25,
      relevance: 'ap1',
      skills: ['ipv6.compress', 'ipv6.expand'],
      steps: [
        {
          type: 'explain',
          title: 'Die zwei Kürzungsregeln',
          body: `Eine vollständige IPv6-Adresse ist lang. Zum Glück enthält sie oft viele Nullen. Es gibt genau **zwei** Kürzungsregeln:

**Regel 1 – Führende Nullen je Block weglassen**
In jedem Block dürfen die Nullen **am Anfang** entfallen. Mindestens eine Ziffer bleibt stehen.

| Block | gekürzt | Warum |
|---|---|---|
| \`0db8\` | \`db8\` | eine führende 0 |
| \`0042\` | \`42\` | zwei führende Nullen |
| \`0000\` | \`0\` | eine 0 muss bleiben |
| \`ff00\` | \`ff00\` | Nullen am **Ende** sind Stellenwerte – bleiben! |
| \`0c00\` | \`c00\` | nur die erste 0 ist führend |

Denk an Dezimalzahlen: Aus 0042 darfst du 42 machen, aus 300 aber nicht 3.

**Regel 2 – Eine Folge von Null-Blöcken durch \`::\` ersetzen**
Zusammenhängende Blöcke, die nur aus Nullen bestehen, dürfen durch \`::\` ersetzt werden – aber **nur ein einziges Mal** pro Adresse. Sonst wüsste niemand, wie viele Nullblöcke an welcher Stelle fehlen.

**Feinregeln nach RFC 5952 (kanonische Form):**
1. \`::\` ersetzt die **längste** Nullfolge.
2. Bei **Gleichstand** wird die **erste** (linke) Folge ersetzt.
3. Ein **einzelner** Nullblock wird **nicht** mit \`::\` gekürzt, sondern als \`0\` geschrieben.
4. Hex-Buchstaben werden **klein** geschrieben.
5. Führende Nullen werden immer entfernt.

Andere Schreibweisen (z. B. \`2001:0db8::1\`) sind technisch gültig, aber nicht kanonisch. In Prüfungen ist meist die **maximal gekürzte** Form gefragt – RFC 5952 ist die sichere Wahl.`,
        },
        {
          type: 'visual',
          title: 'Interaktiv kürzen und erweitern',
          widget: { kind: 'ipv6-compress', data: { address: '2001:0db8:0000:0000:0000:ff00:0042:8329' } },
          caption: 'Beobachte, welche Nullen in Schritt 1 fallen und welche Nullfolge in Schritt 2 durch `::` ersetzt wird. Probiere eigene Adressen aus.',
        },
        {
          type: 'example',
          title: 'Kürzen mit Gleichstand und Einzel-Null',
          problem: 'Kürze RFC-5952-konform: `2001:0db8:0000:0000:0001:0000:0000:0001`',
          steps: [
            { label: 'Kleinschreibung prüfen', body: 'Alles ist bereits klein.' },
            { label: 'Regel 1: führende Nullen', body: '`2001` · `db8` · `0` · `0` · `1` · `0` · `0` · `1` → `2001:db8:0:0:1:0:0:1`' },
            { label: 'Nullfolgen suchen', body: 'Folge A: Blöcke 3–4 (Länge 2). Folge B: Blöcke 6–7 (Länge 2). → Gleichstand.' },
            { label: 'Regel 2 anwenden', body: 'Bei Gleichstand die **erste** Folge ersetzen: `2001:db8::1:0:0:1`. Folge B bleibt als `0:0` stehen.' },
          ],
          result: '**`2001:db8::1:0:0:1`**',
        },
        {
          type: 'explain',
          title: 'Erweitern: Der Rückweg',
          body: `Zum Erweitern (Expandieren) gehst du umgekehrt vor:

1. **Vorhandene Blöcke zählen** (auch ausgeschriebene \`0\`-Blöcke zählen mit!).
2. \`::\` steht für **8 − Anzahl vorhandener Blöcke** Nullblöcke.
3. Jeden Block **links** mit Nullen auf 4 Zeichen auffüllen.

**Beispiel:** \`fe80::211:22ff:fe33:4455\`
- Vorhanden: \`fe80\`, \`211\`, \`22ff\`, \`fe33\`, \`4455\` = 5 Blöcke
- \`::\` = 8 − 5 = **3** Nullblöcke
- Auffüllen: \`211\` → \`0211\`

→ \`fe80:0000:0000:0000:0211:22ff:fe33:4455\`

**Wichtig beim Auffüllen:** Immer **links** auffüllen. \`a0\` wird zu \`00a0\` – niemals zu \`a000\`.`,
        },
        {
          type: 'example',
          title: 'Erweitern mit einzelnem Nullblock',
          problem: 'Schreibe `2001:db8:0:5::c0:ffee` vollständig aus.',
          steps: [
            { label: 'Blöcke zählen', body: '`2001`, `db8`, `0`, `5`, `c0`, `ffee` = **6** Blöcke (der `0`-Block zählt mit).' },
            { label: 'Fehlende Blöcke', body: '8 − 6 = **2** Nullblöcke für `::`.' },
            { label: 'Einsetzen', body: '`2001:db8:0:5:0:0:c0:ffee`' },
            { label: 'Auffüllen', body: '`db8` → `0db8`, `0` → `0000`, `5` → `0005`, `c0` → `00c0`' },
          ],
          result: '**`2001:0db8:0000:0005:0000:0000:00c0:ffee`**',
        },
        {
          type: 'check',
          question: {
            id: 'm07-c05',
            kind: 'text',
            skill: 'ipv6.compress',
            difficulty: 2,
            prompt: 'Kürze RFC-5952-konform: `fe80:0000:0000:0000:0211:22ff:fe33:4455`',
            accept: ['fe80::211:22ff:fe33:4455'],
            explanation: 'Führende Nullen: `0211` → `211`. Drei Nullblöcke → `::`. Ergebnis: **`fe80::211:22ff:fe33:4455`**.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'm07-c06',
            kind: 'single',
            skill: 'ipv6.compress',
            difficulty: 2,
            prompt: 'Welche Kurzform von `2001:0db8:0000:0001:0000:0000:0000:0001` ist kanonisch?',
            options: ['2001:db8::1:0:0:0:1', '2001:db8:0:1::1', '2001:db8::1::1', '2001:db8:0:1:0:0:0:1'],
            answer: 1,
            distractors: {
              '0': { why: 'Hier wurde der einzelne Nullblock (Länge 1) statt der Dreierfolge gekürzt.', error: 'nicht-laengste-nullfolge' },
              '2': { why: '`::` darf nur einmal vorkommen.', error: 'doppelpunkt-doppelt' },
              '3': { why: 'Gültig, aber nicht maximal gekürzt – die Nullfolge (3 Blöcke) muss durch `::` ersetzt werden.', error: 'nicht-gekuerzt' },
            },
            explanation: 'Nullfolgen: Block 3 (Länge 1) und Blöcke 5–7 (Länge 3). Die längere wird ersetzt: **`2001:db8:0:1::1`**.',
          },
        },
        {
          type: 'practice',
          title: 'Kürzen üben',
          generator: 'ipv6.compress',
          count: 6,
          difficulty: 2,
        },
        {
          type: 'practice',
          title: 'Erweitern üben',
          generator: 'ipv6.expand',
          count: 4,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Regel 1: Führende Nullen in jedem Block weglassen (0db8 → db8, 0000 → 0). Nullen am Blockende bleiben (ff00, c00).',
            'Regel 2: Eine Folge von Nullblöcken einmalig durch :: ersetzen.',
            'RFC 5952: längste Folge; bei Gleichstand die erste; einzelner Nullblock wird 0, nicht ::; Kleinbuchstaben.',
            'Erweitern: Blöcke zählen, :: = 8 − vorhandene Blöcke, jeden Block links auf 4 Zeichen auffüllen.',
          ],
        },
      ],
    },

    /* ============================================================== */
    {
      id: 'm07-l04',
      title: 'Präfixe und Adresstypen',
      minutes: 25,
      relevance: 'ap1',
      skills: ['ipv6.prefix', 'ipv6.type'],
      steps: [
        {
          type: 'explain',
          title: 'Präfixlängen und ihre Bedeutung',
          body: `Die Präfixlänge (\`/n\`) gibt an, wie viele Bit von links zum Netz gehören – genau wie CIDR bei IPv4. Bei IPv6 hat sich eine feste **Hierarchie** eingebürgert:

| Präfix | Wer bekommt das? | Enthält |
|---|---|---|
| /32 | Provider (von der Registry, z. B. RIPE NCC) | 65.536 /48 |
| **/48** | **Standort / Unternehmen** | 65.536 /64-Subnetze |
| /56 | kleiner Standort, Privatanschluss | 256 /64-Subnetze |
| **/64** | **ein Subnetz (LAN, VLAN, WLAN)** | 2⁶⁴ Interface-IDs |
| /127 | Punkt-zu-Punkt-Link zwischen Routern | 2 Adressen |
| /128 | eine einzelne Adresse (z. B. Loopback) | 1 Adresse |

**Merke:** Ein /64 ist **ein** Subnetz. Ab /64 aufwärts (kleiner als 64) wird geplant, /64 selbst wird nicht weiter unterteilt (sonst geht SLAAC kaputt).

**Präfix aus einer Adresse ermitteln:** Bei /64 bleiben die ersten **4 Blöcke**, der Rest wird 0.
\`2001:db8:4b00:12:a::1/64\` → Präfix \`2001:db8:4b00:12::/64\`

Bei /48 bleiben die ersten **3 Blöcke**: \`2001:db8:4b00::/48\`.`,
        },
        {
          type: 'explain',
          title: 'Die wichtigsten Adresstypen',
          body: `IPv6 unterscheidet **Unicast** (an ein Gerät), **Multicast** (an eine Gruppe) und **Anycast** (an das „nächste“ von mehreren Geräten mit gleicher Adresse). **Broadcast gibt es nicht mehr.**

| Typ | Präfix | Erkennen an | Zweck / IPv4-Vergleich |
|---|---|---|---|
| **Global Unicast (GUA)** | 2000::/3 | beginnt mit **2** oder **3** | weltweit eindeutig, im Internet geroutet (wie öffentliche IPv4) |
| **Link-Local (LLA)** | fe80::/10 | beginnt mit **fe80** | nur im lokalen Segment, **jedes** IPv6-Interface hat eine; ähnlich APIPA, aber immer vorhanden |
| **Unique Local (ULA)** | fc00::/7, genutzt **fd00::/8** | beginnt mit **fd** | intern, nicht im Internet geroutet (wie 10.x / 192.168.x) |
| **Multicast** | ff00::/8 | beginnt mit **ff** | an Gruppe: \`ff02::1\` alle Knoten, \`ff02::2\` alle Router |
| **Loopback** | ::1/128 | \`::1\` | eigener Rechner (wie 127.0.0.1) |
| **Unspezifiziert** | ::/128 | \`::\` | „noch keine Adresse“, z. B. als Absender bei DAD (wie 0.0.0.0) |

**Wichtige Multicast-Adressen** (die \`2\` in \`ff02\` = Gültigkeitsbereich *link-local*):
- \`ff02::1\` – alle Knoten im Link
- \`ff02::2\` – alle Router im Link
- \`ff02::1:2\` – alle DHCPv6-Server/Relays
- \`ff02::1:ffXX:XXXX\` – Solicited-Node-Multicast (für NDP)

**Ein Gerät hat mehrere IPv6-Adressen gleichzeitig** – das ist normal! Typisch: eine Link-Local-, eine oder mehrere Global-Unicast-Adressen (stabil + temporär) und evtl. eine ULA.`,
        },
        {
          type: 'visual',
          title: 'Adresstypen auf einen Blick',
          widget: {
            kind: 'cards',
            data: {
              columns: 3,
              items: [
                { title: 'Global Unicast 2000::/3', text: 'z. B. 2a02:810:b00:4b00::a1 – im Internet erreichbar.', icon: 'Globe' },
                { title: 'Link-Local fe80::/10', text: 'z. B. fe80::211:22ff:fe33:4455 – automatisch, nur im Segment.', icon: 'Link' },
                { title: 'Unique Local fd00::/8', text: 'z. B. fd12:3456:789a:1::10 – intern, nicht ins Internet.', icon: 'Building' },
                { title: 'Multicast ff00::/8', text: 'ff02::1 alle Knoten, ff02::2 alle Router – ersetzt Broadcast.', icon: 'Radio' },
                { title: 'Loopback ::1', text: 'Der eigene Rechner, z. B. ping ::1.', icon: 'RotateCcw' },
                { title: 'Unspezifiziert ::', text: 'Noch keine Adresse – Absender bei Duplicate Address Detection.', icon: 'CircleDashed' },
              ],
            },
          },
          caption: 'Faustregel: Auf die ersten Hex-Zeichen schauen – 2/3 = global, fe80 = link-local, fd = ULA, ff = Multicast.',
        },
        {
          type: 'example',
          title: 'Adressen aus ipconfig einordnen',
          problem:
            'Auf einem PC bei Elektro Krämer zeigt `ipconfig`:\n\n```\nIPv6-Adresse. . . . . . . . . . . : 2a02:810:b00:4b00:5d3c:91a2:7e10:44f1\nTemporäre IPv6-Adresse. . . . . . : 2a02:810:b00:4b00:e1b9:2c4:8a77:1d02\nVerbindungslokale IPv6-Adresse  . : fe80::5d3c:91a2:7e10:44f1%12\nStandardgateway . . . . . . . . . : fe80::1%12\n```\n\nOrdne jede Adresse ein.',
          steps: [
            { label: 'IPv6-Adresse', body: 'Beginnt mit `2` → **Global Unicast**. Präfix /64 = `2a02:810:b00:4b00::/64` (vom Router per RA), IID zufällig.' },
            { label: 'Temporäre Adresse', body: 'Gleiches Präfix, andere zufällige IID → **Privacy Extension**, wird für ausgehende Verbindungen genutzt und regelmäßig gewechselt.' },
            { label: 'Verbindungslokale Adresse', body: '`fe80::` → **Link-Local**. `%12` = Zonen-ID (Interface-Index 12).' },
            { label: 'Standardgateway', body: 'Ebenfalls **Link-Local** – bei IPv6 ist das Gateway typischerweise die Link-Local-Adresse des Routers (aus dem Router Advertisement).' },
          ],
          result: 'Ein Interface mit 3 eigenen Adressen (GUA stabil, GUA temporär, LLA) und einem Link-Local-Gateway – alles korrekt.',
        },
        {
          type: 'check',
          question: {
            id: 'm07-c07',
            kind: 'single',
            skill: 'ipv6.type',
            difficulty: 1,
            prompt: 'Welcher Adresstyp ist `fd00:4b::25`?',
            options: ['Global Unicast', 'Link-Local', 'Unique Local', 'Multicast'],
            answer: 2,
            distractors: {
              '0': { why: 'Global Unicast beginnt mit 2 oder 3.', error: 'adresstypen' },
              '1': { why: 'Link-Local beginnt mit fe80.', error: 'adresstypen' },
              '3': { why: 'Multicast beginnt mit ff.', error: 'adresstypen' },
            },
            explanation: '`fd…` liegt in fc00::/7 (praktisch fd00::/8) → **Unique Local Address**, vergleichbar mit privaten IPv4-Adressen.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'm07-c08',
            kind: 'text',
            skill: 'ipv6.prefix',
            difficulty: 2,
            prompt: 'Wie lautet das /64-Präfix der Adresse `2a02:810:b00:4b00:5d3c:91a2:7e10:44f1`?',
            accept: ['2a02:810:b00:4b00::/64', '2a02:810:b00:4b00::'],
            explanation: 'Erste 4 Blöcke behalten, Rest 0: **`2a02:810:b00:4b00::/64`**.',
          },
        },
        {
          type: 'practice',
          title: 'Adresstypen erkennen',
          generator: 'ipv6.type',
          count: 6,
          difficulty: 1,
        },
        {
          type: 'practice',
          title: 'Präfixe und Typen – Prüfungsaufgaben',
          questionIds: ['m07-q028', 'm07-q029', 'm07-q030', 'm07-q031', 'm07-q033', 'm07-q034', 'm07-q035'],
          count: 7,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Hierarchie: Provider /32 → Standort /48 (oder /56) → Subnetz /64 → Host /128.',
            'Präfix aus Adresse: bei /64 die ersten 4 Blöcke, bei /48 die ersten 3 Blöcke, Rest 0.',
            'GUA 2000::/3 (2…/3…), Link-Local fe80::/10, ULA fc00::/7 (fd…), Multicast ff00::/8, Loopback ::1, unspezifiziert ::.',
            'Kein Broadcast bei IPv6 – stattdessen Multicast (ff02::1 alle Knoten, ff02::2 alle Router). Anycast gibt es.',
            'Ein Interface hat normalerweise mehrere IPv6-Adressen gleichzeitig; Link-Local ist immer da.',
          ],
        },
      ],
    },

    /* ============================================================== */
    {
      id: 'm07-l05',
      title: 'Automatische Konfiguration: SLAAC, NDP und DHCPv6',
      minutes: 30,
      relevance: 'ap1-teilweise',
      skills: ['ipv6.slaac', 'ipv6.dhcpv6', 'ipv6.vs4'],
      steps: [
        {
          type: 'explain',
          title: 'NDP – der Ersatz für ARP',
          body: `Bei IPv4 fragt ARP per **Broadcast** „Wer hat 192.168.10.1?“. IPv6 hat kein ARP und keinen Broadcast. Stattdessen gibt es das **Neighbor Discovery Protocol (NDP)**, das über **ICMPv6** läuft:

| ICMPv6-Nachricht | Typ | Aufgabe |
|---|---|---|
| Router Solicitation (RS) | 133 | Client: „Gibt es hier einen Router?“ → an \`ff02::2\` |
| Router Advertisement (RA) | 134 | Router: „Hier bin ich, das Präfix ist …“ → an \`ff02::1\` oder direkt |
| Neighbor Solicitation (NS) | 135 | „Wer hat Adresse X? Nenne mir deine MAC.“ (ARP-Ersatz) |
| Neighbor Advertisement (NA) | 136 | Antwort mit MAC-Adresse |
| Redirect | 137 | Router: „Nimm für dieses Ziel einen besseren Router.“ |

**Folge für die Praxis:** Wer ICMPv6 in der Firewall komplett sperrt, legt IPv6 lahm! Bei IPv4 konnte man ICMP (ping) noch blockieren – bei IPv6 sind bestimmte ICMPv6-Typen Pflicht.

**Duplicate Address Detection (DAD):** Bevor ein Gerät eine Adresse benutzt, schickt es eine Neighbor Solicitation (Absender \`::\`) an die Solicited-Node-Multicast-Adresse. Antwortet niemand, ist die Adresse frei.`,
        },
        {
          type: 'explain',
          title: 'SLAAC – Stateless Address Autoconfiguration',
          body: `Mit **SLAAC** (RFC 4862) konfiguriert sich ein Client **selbst**, ganz ohne DHCP-Server:

1. **Link-Local-Adresse** bilden: \`fe80::/64\` + eigene Interface-ID, DAD.
2. **Router Solicitation** an \`ff02::2\` senden (oder auf das nächste periodische RA warten).
3. Der Router sendet ein **Router Advertisement** mit
   - dem **Präfix** (z. B. \`2a02:810:b00:4b00::/64\`) und der Präfixlänge,
   - Gültigkeitsdauern,
   - **Flags**: *A* (Autonomous – SLAAC erlaubt), *M* (Managed – Adressen per DHCPv6), *O* (Other – Zusatzinfos per DHCPv6),
   - optional DNS-Server (RDNSS-Option, RFC 8106).
4. Client bildet **Präfix + Interface-ID** = globale Adresse, DAD.
5. **Default-Gateway** = Link-Local-Adresse des Routers (Absender des RA).

„Stateless“ heißt: Kein Server merkt sich, wer welche Adresse hat.

**Wie entsteht die Interface-ID?**

| Verfahren | So geht's | Vor-/Nachteil |
|---|---|---|
| **Modifiziertes EUI-64** | MAC (48 Bit) teilen, \`ff:fe\` einfügen, 7. Bit des 1. Bytes (U/L-Bit) invertieren | stabil, aber MAC ist von außen erkennbar → Tracking möglich |
| **Zufällig, stabil** (RFC 7217) | Hash aus Präfix, Interface, Geheimnis | pro Netz stabil, verrät keine MAC |
| **Privacy Extensions / temporär** (RFC 8981) | zufällig, wird regelmäßig gewechselt | Datenschutz für ausgehende Verbindungen |

Windows und die meisten modernen Betriebssysteme verwenden standardmäßig **zufällige** IIDs; EUI-64 findet man noch bei Routern, Druckern und manchen Linux-Systemen.`,
        },
        {
          type: 'visual',
          title: 'SLAAC-Ablauf',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['PC (neu)', 'Andere Knoten', 'Router'],
              messages: [
                { from: 0, to: 0, label: 'Link-Local bilden: fe80:: + IID', note: 'ohne Router möglich' },
                { from: 0, to: 1, label: 'NS (DAD) an Solicited-Node-Multicast', note: 'Absender ::' },
                { from: 0, to: 2, label: 'Router Solicitation an ff02::2', note: 'ICMPv6 Typ 133' },
                { from: 2, to: 0, label: 'Router Advertisement: 2a02:810:b00:4b00::/64, A=1, M=0, O=1', note: 'ICMPv6 Typ 134' },
                { from: 0, to: 0, label: 'GUA = Präfix + IID, Gateway = fe80::1' },
                { from: 0, to: 1, label: 'NS (DAD) für neue GUA', note: 'keine Antwort = frei' },
              ],
            },
          },
          caption: 'Der Client braucht vom Router nur das Präfix – den Rest erledigt er selbst.',
        },
        {
          type: 'example',
          title: 'EUI-64-Interface-ID berechnen',
          problem: 'Der Netzwerkdrucker bei Elektro Krämer hat die MAC-Adresse `a4:5e:60:12:34:56` und nutzt EUI-64. Das Präfix ist `2a02:810:b00:4b00::/64`. Bestimme die Link-Local- und die globale Adresse.',
          steps: [
            { label: 'MAC halbieren', body: '`a4:5e:60` | `12:34:56`' },
            { label: 'ff:fe einfügen', body: '`a4:5e:60:ff:fe:12:34:56` (jetzt 64 Bit)' },
            { label: 'U/L-Bit invertieren', body: 'Erstes Byte `a4` = `1010 0100`. Das 7. Bit von links (Wert 2) umdrehen: `1010 0110` = `a6`.' },
            { label: 'In Blöcke gruppieren', body: '`a65e:60ff:fe12:3456`' },
            { label: 'Adressen bilden', body: 'Link-Local: `fe80::a65e:60ff:fe12:3456` · Global: `2a02:810:b00:4b00:a65e:60ff:fe12:3456`' },
          ],
          result: 'IID `a65e:60ff:fe12:3456` → GUA **`2a02:810:b00:4b00:a65e:60ff:fe12:3456`**. Erkennungszeichen von EUI-64: `ff:fe` in der Mitte der IID.',
        },
        {
          type: 'explain',
          title: 'DHCPv6: stateful und stateless',
          body: `Manche Netze wollen die Adressen zentral steuern (Dokumentation, feste Zuordnung). Dafür gibt es **DHCPv6** (RFC 8415). Ports: Client **UDP 546**, Server **UDP 547**. Der Client sucht Server über die Multicast-Adresse \`ff02::1:2\`.

| Variante | RA-Flags | Adresse von | DNS & Co. von |
|---|---|---|---|
| nur SLAAC | M=0, O=0 | SLAAC | RA (RDNSS) |
| **stateless DHCPv6** | M=0, O=1 | SLAAC | DHCPv6 |
| **stateful DHCPv6** | M=1 | DHCPv6-Server | DHCPv6 |

**Ablauf stateful (SARR):** **S**olicit → **A**dvertise → **R**equest → **R**eply (vergleichbar mit DORA bei DHCPv4).
**Ablauf stateless:** Information-Request → Reply.

**Wichtige Unterschiede zu DHCPv4:**
- DHCPv6 liefert **kein Default-Gateway** – das kommt immer aus dem Router Advertisement.
- Clients identifizieren sich über eine **DUID**, nicht über die MAC-Adresse.
- Nicht jedes Gerät kann stateful DHCPv6 (z. B. Android nutzt nur SLAAC).`,
        },
        {
          type: 'visual',
          title: 'DHCPv6 stateful (SARR)',
          widget: {
            kind: 'sequence',
            data: {
              actors: ['Client', 'Router', 'DHCPv6-Server'],
              messages: [
                { from: 1, to: 0, label: 'Router Advertisement (M=1)', note: 'Gateway = Router' },
                { from: 0, to: 2, label: 'Solicit an ff02::1:2', note: 'UDP 546 → 547' },
                { from: 2, to: 0, label: 'Advertise (Angebot)' },
                { from: 0, to: 2, label: 'Request (Adresse anfordern)' },
                { from: 2, to: 0, label: 'Reply (Adresse, DNS, Domain)' },
              ],
            },
          },
          caption: 'Auch bei stateful DHCPv6 braucht der Client das RA – sonst kennt er kein Gateway.',
        },
        {
          type: 'explain',
          title: 'IPv4 und IPv6 im Vergleich',
          body: `| Merkmal | IPv4 | IPv6 |
|---|---|---|
| Adresslänge | 32 Bit | 128 Bit |
| Header | 20–60 Byte, mit Prüfsumme | **fest 40 Byte**, **keine** Prüfsumme, Extension Header |
| Lebensdauer | TTL | **Hop Limit** |
| Adressauflösung | ARP (Broadcast) | **NDP** (ICMPv6, Multicast) |
| Broadcast | ja | **nein** – Multicast |
| Autokonfiguration | DHCP (APIPA als Notlösung) | **SLAAC** und/oder DHCPv6 |
| Fragmentierung | Router und Absender | **nur Absender** (Mindest-MTU 1280 Byte) |
| NAT | üblich | i. d. R. nicht nötig – Firewall schützt |
| Private Adressen | 10/8, 172.16/12, 192.168/16 | ULA fd00::/8 |
| Loopback | 127.0.0.1 | ::1 |

**Dual Stack:** In der Praxis laufen IPv4 und IPv6 meist **parallel** auf denselben Geräten. Windows bevorzugt IPv6, wenn beide funktionieren.`,
        },
        {
          type: 'visual',
          title: 'Dual-Stack-Netz bei Elektro Krämer',
          widget: {
            kind: 'topology',
            data: {
              nodes: [
                { id: 'inet', type: 'internet', label: 'Internet', sub: 'Provider-Präfix /48', x: 400, y: 40 },
                { id: 'fw', type: 'firewall', label: 'Router/Firewall', sub: 'fe80::1 · RA: 2a02:810:b00:4b00::/64', x: 400, y: 150 },
                { id: 'sw', type: 'switch', label: 'Switch', x: 400, y: 260 },
                { id: 'pc1', type: 'pc', label: 'PC Büro', sub: 'SLAAC, zufällige IID', x: 160, y: 370 },
                { id: 'prn', type: 'printer', label: 'Drucker', sub: 'EUI-64: …a65e:60ff:fe12:3456', x: 400, y: 370 },
                { id: 'srv', type: 'server', label: 'Server', sub: 'statisch: 2a02:810:b00:4b00::a1', x: 640, y: 370 },
              ],
              links: [
                { from: 'inet', to: 'fw', style: 'wan', label: 'IPv4 + IPv6' },
                { from: 'fw', to: 'sw', style: 'lan' },
                { from: 'sw', to: 'pc1', style: 'lan' },
                { from: 'sw', to: 'prn', style: 'lan' },
                { from: 'sw', to: 'srv', style: 'lan' },
              ],
              zones: [{ label: 'LAN 2a02:810:b00:4b00::/64 + 192.168.10.0/24', x: 80, y: 225, w: 640, h: 190, color: 'blue' }],
            },
          },
          caption: 'Clients per SLAAC, Server mit statischer Adresse (gut merkbar), Drucker mit EUI-64. Das Gateway für alle ist die Link-Local-Adresse fe80::1 des Routers.',
        },
        {
          type: 'check',
          question: {
            id: 'm07-c09',
            kind: 'single',
            skill: 'ipv6.slaac',
            difficulty: 2,
            prompt: 'Welche Nachricht liefert dem Client bei SLAAC das Netzpräfix?',
            options: ['Neighbor Advertisement', 'Router Advertisement', 'DHCPv6 Reply', 'ARP Reply'],
            answer: 1,
            distractors: {
              '0': { why: 'Neighbor Advertisements beantworten Adressauflösung (MAC-Adresse), kein Präfix.', error: 'ndp-nachrichten' },
              '2': { why: 'Bei SLAAC ist kein DHCPv6-Server beteiligt.', error: 'slaac-dhcp-verwechselt' },
              '3': { why: 'ARP gibt es bei IPv6 nicht.', error: 'ipv4-verwechselt' },
            },
            explanation: 'Das **Router Advertisement** (ICMPv6 Typ 134) enthält Präfix, Präfixlänge und Flags. Sein Absender wird Default-Gateway.',
          },
        },
        {
          type: 'check',
          question: {
            id: 'm07-c10',
            kind: 'single',
            skill: 'ipv6.slaac',
            difficulty: 2,
            prompt: 'Woran erkennst du, dass eine Interface-ID per EUI-64 gebildet wurde?',
            options: ['Sie beginnt mit fe80.', 'Sie enthält in der Mitte ff:fe (z. B. …60ff:fe12…).', 'Sie endet immer auf ::1.', 'Sie ist immer 48 Bit lang.'],
            answer: 1,
            distractors: {
              '0': { why: 'fe80 ist das Präfix der Link-Local-Adresse, nicht die IID.', error: 'praefix-iid-verwechselt' },
              '2': { why: '::1 ist Loopback bzw. eine manuell vergebene Adresse.', error: 'adresstypen' },
              '3': { why: 'Die IID hat 64 Bit; die MAC 48 Bit wird durch ff:fe auf 64 Bit erweitert.', error: 'laengen' },
            },
            explanation: 'EUI-64 fügt `ff:fe` zwischen die beiden MAC-Hälften ein – das ist das typische Erkennungsmerkmal.',
          },
        },
        {
          type: 'practice',
          title: 'SLAAC, DHCPv6 und Vergleich',
          questionIds: ['m07-q036', 'm07-q037', 'm07-q038', 'm07-q039', 'm07-q040', 'm07-q041', 'm07-q044', 'm07-q042'],
          count: 8,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'NDP (über ICMPv6) ersetzt ARP: RS/RA für Router, NS/NA für Nachbarn, DAD prüft Adresskonflikte. ICMPv6 nie komplett sperren!',
            'SLAAC: Link-Local bilden → RS an ff02::2 → RA mit Präfix → Präfix + IID → DAD. Gateway = Link-Local des Routers.',
            'IID per modifiziertem EUI-64 (MAC + ff:fe, U/L-Bit invertiert) oder zufällig (Privacy Extensions, Standard bei Windows).',
            'RA-Flags: M=1 stateful DHCPv6 (Adressen vom Server), O=1 stateless DHCPv6 (nur Zusatzinfos). DHCPv6 liefert kein Gateway.',
            'IPv6-Header: fest 40 Byte, keine Prüfsumme, Hop Limit statt TTL, keine Fragmentierung durch Router.',
          ],
        },
      ],
    },

    /* ============================================================== */
    {
      id: 'm07-l06',
      title: 'IPv6-Subnetzplanung',
      minutes: 25,
      relevance: 'ap1-teilweise',
      skills: ['ipv6.subnets'],
      steps: [
        {
          type: 'explain',
          title: 'Subnetting bei IPv6 – viel einfacher als bei IPv4',
          body: `Bei IPv4 musst du jedes Bit sparen und Hostanzahlen exakt planen. Bei IPv6 ist das anders:

- Jedes LAN-Segment bekommt **immer ein /64** – egal ob 5 oder 5.000 Geräte.
- Geplant wird nur die **Anzahl der Subnetze**, nicht die Hosts.
- Die Bits zwischen dem zugeteilten Präfix und /64 sind die **Subnetz-ID**.

Bei einem **/48** sind das 64 − 48 = **16 Bit** = genau **der 4. Block**:

\`\`\`
2001:0db8:4b00 : XXXX : 0000:0000:0000:0000
└── /48 vom ──┘  └┬─┘  └──── Interface-ID ────┘
    Provider   Subnetz-ID       (64 Bit)
               (16 Bit)
\`\`\`

**Anzahl der Subnetze** = 2^(64 − Präfixlänge):
| Zuteilung | Subnetz-Bits | /64-Subnetze | Subnetz-ID-Bereich |
|---|---|---|---|
| /48 | 16 | 2¹⁶ = 65.536 | \`0000\`–\`ffff\` im 4. Block |
| /52 | 12 | 2¹² = 4.096 | |
| /56 | 8 | 2⁸ = 256 | \`00\`–\`ff\` (letzte 2 Zeichen des 4. Blocks) |
| /60 | 4 | 2⁴ = 16 | \`0\`–\`f\` (letztes Zeichen) |

**Das n-te Subnetz bestimmen:** Subnetz-ID in **Hex** umrechnen und in den 4. Block schreiben.
- Zählung beginnt bei **0**: Das 1. Subnetz hat ID 0, das 10. hat ID 9.
- Dezimal 26 → hex \`1a\` → \`2001:db8:4b00:1a::/64\`

**Tipp aus der Praxis:** Subnetz-IDs gern an **Nibble-Grenzen** strukturieren (z. B. erstes Hex-Zeichen = Standort, zweites = Gebäude …) und VLAN-Nummern spiegeln (VLAN 10 → \`:10:\`). Das ist rein organisatorisch – dann steht in der Adresse \`10\` als Hex, das ist okay, solange es einheitlich dokumentiert ist.`,
        },
        {
          type: 'visual',
          title: 'Subnetz-ID im 4. Block',
          widget: {
            kind: 'cards',
            data: {
              columns: 4,
              items: [
                { title: 'Block 1–3', text: '2001:db8:4b00 – vom Provider (/48), fix.', icon: 'Building2' },
                { title: 'Block 4', text: 'Subnetz-ID 0000–ffff – plant die IT von Elektro Krämer.', icon: 'Network' },
                { title: 'Block 5–8', text: 'Interface-ID – SLAAC, DHCPv6 oder statisch.', icon: 'Laptop' },
                { title: 'Ergebnis', text: 'z. B. 2001:db8:4b00:1a::/64 für die Werkstatt (ID 26).', icon: 'CircleCheck' },
              ],
            },
          },
          caption: 'Bei /48 ist der 4. Block komplett die Subnetz-ID – das macht IPv6-Subnetting so übersichtlich.',
        },
        {
          type: 'example',
          title: 'Subnetzplan für Elektro Krämer',
          problem:
            'Elektro Krämer erhält `2001:db8:4b00::/48`. Die IT-Leitung legt fest: Verwaltung = Subnetz-ID 1, Werkstatt = 26, Gäste-WLAN = 100, Server = 255. Bestimme jeweils das /64-Präfix und die Anzahl verfügbarer /64-Subnetze insgesamt.',
          steps: [
            { label: 'Anzahl Subnetze', body: '64 − 48 = 16 Subnetz-Bits → 2¹⁶ = **65.536** /64-Subnetze.' },
            { label: 'Verwaltung (1)', body: '1 = hex `1` → `2001:db8:4b00:1::/64`' },
            { label: 'Werkstatt (26)', body: '26 ÷ 16 = 1 Rest 10 (a) → `1a` → `2001:db8:4b00:1a::/64`' },
            { label: 'Gäste-WLAN (100)', body: '100 ÷ 16 = 6 Rest 4 → `64` → `2001:db8:4b00:64::/64`' },
            { label: 'Server (255)', body: '255 ÷ 16 = 15 (f) Rest 15 (f) → `ff` → `2001:db8:4b00:ff::/64`' },
          ],
          result: 'Verwaltung `…:1::/64`, Werkstatt `…:1a::/64`, Gäste `…:64::/64`, Server `…:ff::/64` – und es bleiben über 65.000 Subnetze frei.',
        },
        {
          type: 'example',
          title: 'Aufteilung auf Standorte mit /52',
          problem: 'Elektro Krämer bekommt eine zweite und dritte Filiale. Das /48 soll in /52-Blöcke je Standort geteilt werden. Welche Blöcke erhalten Standort 0 (Zentrale), 1 und 2, und wie viele /64 hat jeder Standort?',
          steps: [
            { label: 'Zusätzliche Bits', body: '52 − 48 = **4 Bit** = 1 Hex-Zeichen → 2⁴ = 16 Standortblöcke.' },
            { label: 'Position', body: 'Es sind Bit 49–52 = das **erste** Zeichen des 4. Blocks.' },
            { label: 'Blöcke', body: 'Standort 0: `2001:db8:4b00::/52` (4. Block `0xxx`), Standort 1: `2001:db8:4b00:1000::/52`, Standort 2: `2001:db8:4b00:2000::/52`' },
            { label: '/64 je Standort', body: '64 − 52 = 12 Bit → 2¹² = **4.096** Subnetze pro Standort.' },
          ],
          result: 'Standort n erhält `2001:db8:4b00:n000::/52` mit je 4.096 /64-Subnetzen (n = 0…f).',
        },
        {
          type: 'check',
          question: {
            id: 'm07-c11',
            kind: 'text',
            skill: 'ipv6.subnets',
            difficulty: 2,
            prompt: 'Welches /64-Präfix hat die Subnetz-ID **300 (dezimal)** aus `2001:db8:4b00::/48`?',
            accept: ['2001:db8:4b00:12c::/64', '2001:db8:4b00:12c::'],
            explanation: '300 ÷ 16 = 18 Rest 12 (c); 18 ÷ 16 = 1 Rest 2; 1 ÷ 16 = 0 Rest 1 → `12c` → **`2001:db8:4b00:12c::/64`**.',
            hints: ['Wiederholt durch 16 teilen.'],
          },
        },
        {
          type: 'check',
          question: {
            id: 'm07-c12',
            kind: 'number',
            skill: 'ipv6.subnets',
            difficulty: 1,
            prompt: 'Wie viele /64-Subnetze enthält ein /60?',
            answer: 16,
            unit: 'Subnetze',
            explanation: '64 − 60 = 4 Bit → 2⁴ = **16**.',
          },
        },
        {
          type: 'practice',
          title: 'Subnetze berechnen',
          generator: 'ipv6.subnets',
          count: 5,
          difficulty: 2,
        },
        {
          type: 'practice',
          title: 'Subnetzplanung – Prüfungsaufgaben',
          questionIds: ['m07-q045', 'm07-q046', 'm07-q047', 'm07-q048', 'm07-q049', 'm07-q050', 'm07-q051'],
          count: 7,
          difficulty: 2,
        },
        {
          type: 'summary',
          points: [
            'Jedes LAN-Segment erhält ein /64 – geplant wird die Zahl der Subnetze, nicht die der Hosts.',
            'Anzahl /64-Subnetze = 2^(64 − Präfixlänge): /48 → 65.536, /56 → 256, /60 → 16.',
            'Bei /48 ist der 4. Block die Subnetz-ID. Subnetz-ID dezimal → hex umrechnen und eintragen.',
            'Zählung ab 0: Das n-te Subnetz hat die ID n − 1.',
            'Weitere Aufteilung an Nibble-Grenzen (/52, /56, /60) hält die Adressen lesbar.',
          ],
        },
      ],
    },
  ],
};
