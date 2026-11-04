import {
  addressClass, bitsForSubnets, blockSize, broadcastAddress, classifyAddress, contains, formatIp, ipToBinary,
  isNetworkAligned, isPrivate, isValidIp, maskToPrefix, networkAddress, nthSubnet, overlaps, parseCidr, parseIp,
  parsePrefixInput, placeValues, prefixForHosts, prefixToMask, sameSubnet, splitNetwork, subnetInfo, toBinary8,
  usableHosts, wildcardMask, binaryToDecimal,
} from '../src/core/ipv4';

const ip = parseIp;

describe('Parsing & Formatierung', () => {
  it('parst gültige Adressen', () => {
    expect(ip('0.0.0.0')).toBe(0);
    expect(ip('255.255.255.255')).toBe(4294967295);
    expect(formatIp(ip('192.168.10.1'))).toBe('192.168.10.1');
    expect(formatIp(ip(' 10.0.0.1 '))).toBe('10.0.0.1');
  });
  it('lehnt ungültige Adressen ab', () => {
    for (const s of ['256.1.1.1', '1.2.3', '1.2.3.4.5', 'a.b.c.d', '01.2.3.4', '', '1..2.3', '-1.2.3.4']) expect(isValidIp(s)).toBe(false);
  });
  it('hohe Adressen bleiben positiv', () => {
    expect(networkAddress(ip('255.255.255.200'), 25)).toBe(ip('255.255.255.128'));
    expect(broadcastAddress(ip('200.1.1.1'), 8)).toBe(ip('200.255.255.255'));
  });
});

describe('Masken & Präfixe', () => {
  it('Präfix ↔ Maske für alle 0..32', () => {
    for (let p = 0; p <= 32; p++) expect(maskToPrefix(prefixToMask(p))).toBe(p);
    expect(prefixToMask(0)).toBe('0.0.0.0');
    expect(prefixToMask(24)).toBe('255.255.255.0');
    expect(prefixToMask(26)).toBe('255.255.255.192');
    expect(prefixToMask(20)).toBe('255.255.240.0');
    expect(prefixToMask(32)).toBe('255.255.255.255');
  });
  it('erkennt nicht zusammenhängende Masken', () => {
    expect(maskToPrefix('255.0.255.0')).toBeNull();
    expect(maskToPrefix('255.255.255.1')).toBeNull();
  });
  it('Präfix-Eingaben', () => {
    expect(parsePrefixInput('/26')).toBe(26);
    expect(parsePrefixInput('26')).toBe(26);
    expect(parsePrefixInput('255.255.255.224')).toBe(27);
    expect(parsePrefixInput('/33')).toBeNull();
  });
  it('Wildcard', () => expect(wildcardMask(26)).toBe('0.0.0.63'));
});

describe('Subnetzberechnung (Beispiele des Lernenden)', () => {
  it('48 Hosts → /26, 23 Hosts → /27', () => {
    expect(prefixForHosts(48)).toBe(26);
    expect(prefixForHosts(23)).toBe(27);
  });
  it('Grenzfälle der Hostanzahl', () => {
    expect(prefixForHosts(62)).toBe(26);
    expect(prefixForHosts(63)).toBe(25);
    expect(prefixForHosts(64)).toBe(25);
    expect(prefixForHosts(126)).toBe(25);
    expect(prefixForHosts(127)).toBe(24);
    expect(prefixForHosts(2)).toBe(30);
    expect(prefixForHosts(1)).toBe(30);
    expect(prefixForHosts(254)).toBe(24);
    expect(prefixForHosts(255)).toBe(23);
    expect(prefixForHosts(115)).toBe(25);
    expect(prefixForHosts(12)).toBe(28);
  });
  it('192.168.1.0/27: zweites Subnetz beginnt bei .32', () => {
    expect(formatIp(nthSubnet(ip('192.168.1.0'), 24, 27, 1))).toBe('192.168.1.32');
  });
  it('192.168.10.192/27 endet bei .223', () => {
    expect(formatIp(broadcastAddress(ip('192.168.10.192'), 27))).toBe('192.168.10.223');
  });
  it('subnetInfo', () => {
    const s = subnetInfo(ip('172.16.45.200'), 20);
    expect(formatIp(s.network)).toBe('172.16.32.0');
    expect(formatIp(s.broadcast)).toBe('172.16.47.255');
    expect(formatIp(s.firstHost!)).toBe('172.16.32.1');
    expect(formatIp(s.lastHost!)).toBe('172.16.47.254');
    expect(s.usable).toBe(4094);
  });
  it('Sonderfälle /31 und /32', () => {
    expect(usableHosts(31)).toBe(0);
    expect(usableHosts(31, { rfc3021: true })).toBe(2);
    expect(usableHosts(32)).toBe(1);
    expect(usableHosts(30)).toBe(2);
    expect(usableHosts(24)).toBe(254);
    expect(usableHosts(0)).toBe(4294967294);
  });
  it('Aufteilung /24 → /26', () => {
    expect(splitNetwork(ip('192.168.10.0'), 24, 26).map(formatIp)).toEqual(['192.168.10.0', '192.168.10.64', '192.168.10.128', '192.168.10.192']);
    expect(splitNetwork(ip('10.0.0.0'), 8, 8)).toHaveLength(1);
  });
  it('Anzahl Bits für Subnetze', () => {
    expect(bitsForSubnets(1)).toBe(0);
    expect(bitsForSubnets(2)).toBe(1);
    expect(bitsForSubnets(5)).toBe(3);
    expect(bitsForSubnets(8)).toBe(3);
    expect(bitsForSubnets(9)).toBe(4);
  });
  it('Ausrichtung, Überlappung, Enthaltensein', () => {
    expect(isNetworkAligned(ip('192.168.10.64'), 26)).toBe(true);
    expect(isNetworkAligned(ip('192.168.10.96'), 26)).toBe(false);
    expect(overlaps({ network: ip('10.0.0.0'), prefix: 24 }, { network: ip('10.0.0.128'), prefix: 25 })).toBe(true);
    expect(overlaps({ network: ip('10.0.0.0'), prefix: 25 }, { network: ip('10.0.0.128'), prefix: 25 })).toBe(false);
    expect(contains({ network: ip('10.0.0.0'), prefix: 24 }, { network: ip('10.0.0.128'), prefix: 25 })).toBe(true);
    expect(contains({ network: ip('10.0.0.0'), prefix: 24 }, { network: ip('10.0.1.0'), prefix: 25 })).toBe(false);
    expect(sameSubnet(ip('192.168.1.10'), ip('192.168.1.70'), 26)).toBe(false);
    expect(sameSubnet(ip('192.168.1.10'), ip('192.168.1.60'), 26)).toBe(true);
  });
  it('Brute-Force-Konsistenz Netz/Broadcast', () => {
    for (let i = 0; i < 2000; i++) {
      const a = Math.floor(Math.random() * 2 ** 32);
      const p = Math.floor(Math.random() * 33);
      const n = networkAddress(a, p);
      const b = broadcastAddress(a, p);
      expect(n).toBeLessThanOrEqual(a);
      expect(b).toBeGreaterThanOrEqual(a);
      expect(b - n + 1).toBe(blockSize(p));
      expect(n % blockSize(p)).toBe(0);
    }
  });
});

describe('Klassifizierung & Binär', () => {
  it('private Bereiche', () => {
    expect(isPrivate(ip('10.1.2.3'))).toBe(true);
    expect(isPrivate(ip('172.16.0.1'))).toBe(true);
    expect(isPrivate(ip('172.31.255.254'))).toBe(true);
    expect(isPrivate(ip('172.32.0.1'))).toBe(false);
    expect(isPrivate(ip('172.15.0.1'))).toBe(false);
    expect(isPrivate(ip('192.169.0.1'))).toBe(false);
    expect(isPrivate(ip('169.254.1.1'))).toBe(false);
    expect(classifyAddress(ip('169.254.1.1')).name).toContain('APIPA');
    expect(classifyAddress(ip('127.0.0.1')).name).toBe('Loopback');
    expect(classifyAddress(ip('8.8.8.8')).name).toContain('Öffentlich');
  });
  it('Klassen', () => {
    expect(addressClass(ip('10.0.0.1'))).toBe('A');
    expect(addressClass(ip('172.16.0.1'))).toBe('B');
    expect(addressClass(ip('192.168.0.1'))).toBe('C');
    expect(addressClass(ip('224.0.0.1'))).toBe('D');
  });
  it('Binärumrechnung', () => {
    expect(toBinary8(192)).toBe('11000000');
    expect(toBinary8(0)).toBe('00000000');
    expect(ipToBinary(ip('255.255.255.192'))).toBe('11111111.11111111.11111111.11000000');
    expect(binaryToDecimal('11000000')).toBe(192);
    expect(binaryToDecimal('10102')).toBeNull();
    expect(placeValues(200)).toEqual([128, 64, 8]);
    expect(parseCidr('192.168.1.5/24')).toEqual({ ip: ip('192.168.1.5'), prefix: 24 });
    expect(parseCidr('192.168.1.5/33')).toBeNull();
  });
});
