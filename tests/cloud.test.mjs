import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createCloudServer } from '../server/cloud.mjs';

let base = '';
let close = () => {};
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fisi-cloud-'));

beforeAll(async () => {
  const { server, db } = createCloudServer({ dataDir: dir });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  base = `http://127.0.0.1:${server.address().port}`;
  close = () => { server.close(); db.close(); };
});
afterAll(() => close());

const call = async (method, p, body, token) => {
  const r = await fetch(base + p, { method, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: 'Bearer ' + token } : {}) }, body: body ? JSON.stringify(body) : undefined });
  return { status: r.status, body: await r.json() };
};

describe('Online-Server: Konten und Lernstand', () => {
  it('Registrieren, Anmelden, Lernstand speichern und laden', async () => {
    expect((await call('POST', '/api/auth/register', { username: 'ab', password: 'geheim123' })).status).toBe(400);
    expect((await call('POST', '/api/auth/register', { username: 'marcel', password: 'kurz' })).status).toBe(400);
    const reg = await call('POST', '/api/auth/register', { username: 'Marcel', password: 'geheim123' });
    expect(reg.status).toBe(200);
    expect((await call('POST', '/api/auth/register', { username: 'marcel', password: 'anderes123' })).status).toBe(409);
    expect((await call('POST', '/api/auth/login', { username: 'marcel', password: 'falsch123' })).status).toBe(401);
    const login = await call('POST', '/api/auth/login', { username: 'marcel', password: 'geheim123' });
    expect(login.status).toBe(200);
    const t = login.body.token;

    expect((await call('GET', '/api/cloud/doc')).status).toBe(401);
    expect((await call('GET', '/api/cloud/doc', undefined, t)).body).toMatchObject({ rev: 0, data: null, user: { name: 'Marcel' } });
    expect((await call('PUT', '/api/cloud/doc', { rev: 0, data: { kv: { a: 1 } } }, t)).body).toEqual({ rev: 1 });
    // zweites Gerät mit veraltetem Stand wird abgewiesen und bekommt den aktuellen Stand
    const conflict = await call('PUT', '/api/cloud/doc', { rev: 0, data: { kv: { a: 2 } } }, reg.body.token);
    expect(conflict.status).toBe(409);
    expect(conflict.body).toEqual({ rev: 1, data: { kv: { a: 1 } } });
    expect((await call('GET', '/api/cloud/doc', undefined, reg.body.token)).body.data).toEqual({ kv: { a: 1 } });

    // anderer Benutzer sieht nichts davon
    const other = await call('POST', '/api/auth/register', { username: 'lisa', password: 'passwort1' });
    expect((await call('GET', '/api/cloud/doc', undefined, other.body.token)).body.data).toBeNull();

    expect((await call('POST', '/api/auth/logout', {}, t)).status).toBe(200);
    expect((await call('GET', '/api/cloud/doc', undefined, t)).status).toBe(401);
  });

  it('bremst Passwort-Raten', async () => {
    for (let i = 0; i < 10; i++) await call('POST', '/api/auth/login', { username: 'lisa', password: 'falsch' + i });
    expect((await call('POST', '/api/auth/login', { username: 'lisa', password: 'passwort1' })).status).toBe(429);
  });
});
