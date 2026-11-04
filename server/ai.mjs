// KI-Anbindung: offizielle Anthropic-API (empfohlen) oder lokale Claude-Code-CLI.
// Zugangsdaten stehen NIE im Quellcode: API-Key aus Umgebungsvariable ANTHROPIC_API_KEY
// oder aus data/secrets.json (wird nur lokal gespeichert, nie an den Browser gesendet).
import Anthropic from '@anthropic-ai/sdk';
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export const MODELS = [
  { id: 'claude-opus-5-5', label: 'Claude Opus 5.5 (beste Erklärqualität)', input: 4, output: 20 },
  { id: 'claude-sonnet-5-5', label: 'Claude Sonnet 5.5 (schnell, günstiger)', input: 2, output: 10 },
  { id: 'claude-haiku-5-5', label: 'Claude Haiku 5.5 (sehr günstig)', input: 0.1, output: 0.5 },
];

export class AiService {
  constructor(dataDir) {
    this.dataDir = dataDir;
    this.secretsFile = path.join(dataDir, 'secrets.json');
    this.cliAvailable = null;
  }

  readSecrets() {
    try {
      return JSON.parse(fs.readFileSync(this.secretsFile, 'utf8'));
    } catch {
      return {};
    }
  }

  writeSecrets(s) {
    fs.mkdirSync(this.dataDir, { recursive: true });
    fs.writeFileSync(this.secretsFile, JSON.stringify(s, null, 2), { mode: 0o600 });
  }

  apiKey() {
    return process.env.ANTHROPIC_API_KEY || this.readSecrets().apiKey || '';
  }

  checkCli() {
    if (this.cliAvailable !== null) return this.cliAvailable;
    try {
      const r = spawnSync('claude', ['--version'], { encoding: 'utf8', timeout: 15000 });
      this.cliAvailable = r.status === 0 ? r.stdout.trim() : false;
    } catch {
      this.cliAvailable = false;
    }
    return this.cliAvailable;
  }

  status(config) {
    const key = this.apiKey();
    return {
      provider: config.provider ?? 'none',
      model: config.model ?? MODELS[0].id,
      effort: config.effort ?? 'medium',
      apiKeySet: !!key,
      apiKeySource: process.env.ANTHROPIC_API_KEY ? 'Umgebungsvariable ANTHROPIC_API_KEY' : key ? 'data/secrets.json' : null,
      apiKeyMasked: key ? `${key.slice(0, 7)}…${key.slice(-4)}` : null,
      cli: this.checkCli(),
      models: MODELS,
    };
  }

  setApiKey(key) {
    const s = this.readSecrets();
    if (key) s.apiKey = key.trim();
    else delete s.apiKey;
    this.writeSecrets(s);
  }

  client() {
    const key = this.apiKey();
    if (!key) throw new Error('Kein API-Schlüssel hinterlegt. Bitte unter „Einstellungen → KI-Tutor“ eintragen.');
    return new Anthropic({ apiKey: key });
  }

  /**
   * Streamt eine Tutor-Antwort. onText(delta) wird für jedes Textstück aufgerufen.
   * messages: [{role:'user'|'assistant', content:string}]
   */
  async chat({ config, system, messages, onText, signal }) {
    if (config.provider === 'anthropic') return this.chatApi({ config, system, messages, onText, signal });
    if (config.provider === 'claude-cli') return this.chatCli({ config, system, messages, onText, signal });
    throw new Error('Kein KI-Anbieter konfiguriert. Der Lernbetrieb funktioniert ohne KI – für den Tutor bitte in den Einstellungen einen Anbieter wählen.');
  }

  async chatApi({ config, system, messages, onText, signal }) {
    const client = this.client();
    const model = config.model || MODELS[0].id;
    const params = {
      model,
      max_tokens: 16000,
      system: [{ type: 'text', text: system, cache_control: { type: 'ephemeral' } }],
      messages,
      thinking: { type: 'adaptive' },
      output_config: { effort: config.effort || 'medium' },
    };
    // Serverseitiger Fallback bei Ablehnungen durch Sicherheitsklassifikatoren (nur Claude API)
    const useFallback = model === 'claude-opus-5-5' || model === 'claude-sonnet-5-5';
    const stream = useFallback
      ? client.beta.messages.stream({ ...params, betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' }, { signal })
      : client.messages.stream(params, { signal });
    stream.on('text', (t) => onText(t));
    const final = await stream.finalMessage();
    if (final.stop_reason === 'refusal') {
      onText('\n\n_(Die Anfrage wurde vom Modell abgelehnt. Formuliere die Frage bitte anders.)_');
    }
    return { usage: final.usage, model: final.model };
  }

  chatCli({ config, system, messages, onText, signal }) {
    // Verlauf als ein Prompt übergeben (per stdin, um Längenlimits der Kommandozeile zu umgehen).
    const transcript = messages
      .map((m) => (m.role === 'user' ? `### Lernender\n${m.content}` : `### Tutor (du)\n${m.content}`))
      .join('\n\n');
    const prompt = `${transcript}\n\n### Aufgabe\nAntworte jetzt als Tutor auf die letzte Nachricht des Lernenden. Gib nur deine Antwort aus.`;
    const args = ['-p', '--output-format', 'stream-json', '--verbose', '--include-partial-messages', '--no-session-persistence', '--tools', '', '--system-prompt', system];
    if (config.cliModel) args.push('--model', config.cliModel);
    return new Promise((resolve, reject) => {
      const child = spawn('claude', args, { shell: false, cwd: os.tmpdir(), windowsHide: true });
      let buf = '';
      let gotPartial = false;
      let err = '';
      signal?.addEventListener('abort', () => child.kill());
      child.stdout.on('data', (d) => {
        buf += d.toString('utf8');
        let i;
        while ((i = buf.indexOf('\n')) >= 0) {
          const line = buf.slice(0, i).trim();
          buf = buf.slice(i + 1);
          if (!line) continue;
          try {
            const ev = JSON.parse(line);
            if (ev.type === 'stream_event' && ev.event?.type === 'content_block_delta' && ev.event.delta?.type === 'text_delta') {
              gotPartial = true;
              onText(ev.event.delta.text);
            } else if (ev.type === 'assistant' && !gotPartial) {
              for (const b of ev.message?.content ?? []) if (b.type === 'text') onText(b.text);
            } else if (ev.type === 'result' && ev.is_error) {
              err += ev.result || 'Fehler der Claude-CLI';
            }
          } catch {
            /* keine JSON-Zeile */
          }
        }
      });
      child.stderr.on('data', (d) => (err += d.toString('utf8')));
      child.on('error', (e) => reject(new Error(`Claude-CLI konnte nicht gestartet werden: ${e.message}`)));
      child.on('close', (code) => {
        if (code === 0 && !err) resolve({ usage: null, model: 'claude-cli' });
        else reject(new Error(err.trim() || `Claude-CLI beendet mit Code ${code}`));
      });
      child.stdin.write(prompt);
      child.stdin.end();
    });
  }

  /** Einmalige Anfrage mit strukturierter JSON-Antwort (z. B. Freitextbewertung, Bildanalyse). */
  async structured({ config, system, content, schema }) {
    if (config.provider === 'anthropic') {
      const client = this.client();
      const res = await client.messages.create({
        model: config.model || MODELS[0].id,
        max_tokens: 16000,
        system,
        messages: [{ role: 'user', content }],
        thinking: { type: 'adaptive' },
        output_config: { effort: 'medium', format: { type: 'json_schema', schema } },
      });
      if (res.stop_reason === 'refusal') throw new Error('Die Anfrage wurde vom Modell abgelehnt.');
      const text = res.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
      return JSON.parse(text);
    }
    if (config.provider === 'claude-cli') {
      // Bilder werden als Datei übergeben und mit dem Read-Werkzeug gelesen.
      const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'na-'));
      const parts = [];
      for (const c of Array.isArray(content) ? content : [{ type: 'text', text: content }]) {
        if (c.type === 'text') parts.push(c.text);
        else if (c.type === 'image') {
          const ext = c.source.media_type.split('/')[1].replace('jpeg', 'jpg');
          const f = path.join(tmp, `bild.${ext}`);
          fs.writeFileSync(f, Buffer.from(c.source.data, 'base64'));
          parts.push(`Lies das Bild in der Datei ./bild.${ext} mit dem Read-Werkzeug.`);
        }
      }
      parts.push(`\nAntworte AUSSCHLIESSLICH mit einem JSON-Objekt nach diesem Schema (kein Markdown, kein Text davor oder danach):\n${JSON.stringify(schema)}`);
      const out = spawnSync('claude', ['-p', '--output-format', 'json', '--no-session-persistence', '--tools', 'Read', '--allowedTools', 'Read', '--system-prompt', system], {
        input: parts.join('\n'), cwd: tmp, encoding: 'utf8', timeout: 240000, windowsHide: true, maxBuffer: 20 * 1024 * 1024,
      });
      fs.rmSync(tmp, { recursive: true, force: true });
      if (out.status !== 0) throw new Error(out.stderr || 'Claude-CLI-Fehler');
      const result = JSON.parse(out.stdout).result ?? '';
      const m = result.match(/\{[\s\S]*\}/);
      if (!m) throw new Error('Antwort enthielt kein JSON.');
      return JSON.parse(m[0]);
    }
    throw new Error('Kein KI-Anbieter konfiguriert.');
  }

  async test(config) {
    let text = '';
    await this.chat({ config, system: 'Antworte sehr kurz auf Deutsch.', messages: [{ role: 'user', content: 'Sag „Verbindung steht“.' }], onText: (t) => (text += t) });
    return text.trim();
  }
}
