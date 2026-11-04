# Fügt Fehlerkategorien in src/core/errors.ts ein (bereits vorhandene Slugs werden übersprungen).
# Aufruf: python scripts/add-errors.py <datei.json>   – JSON: { "slug": ["Titel", "Ursache"], ... }
import io, json, sys
entries = json.load(io.open(sys.argv[1], encoding='utf-8'))
p = 'src/core/errors.ts'
s = io.open(p, encoding='utf-8', newline='').read()
anchor = '  eingabeformat: {'
assert s.count(anchor) == 1
new = ''.join(f"  '{k}': {{ title: {json.dumps(t, ensure_ascii=False)}, cause: {json.dumps(c, ensure_ascii=False)} }},\n"
              for k, (t, c) in entries.items() if f"'{k}'" not in s)
io.open(p, 'w', encoding='utf-8', newline='').write(s.replace(anchor, new + anchor))
print(new.count('\n'), 'neue Einträge')
