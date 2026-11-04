# Registriert neue Module und Generatoren.
# Aufruf: python scripts/register-modules.py p06,p07 programmierung GENERATORS_PROGRAMMIERUNG
#         (ohne Generatoren: python scripts/register-modules.py x01 - -)
import sys, re
mods = sys.argv[1].split(',')
gen_file, gen_export = sys.argv[2], sys.argv[3]
p='src/content/index.ts'; s=open(p,encoding='utf-8').read()
imports=[l for l in s.splitlines() if l.startswith("import { ") and "./modules/" in l]
last=imports[-1]
for m in mods:
    line=f"import {{ {m} }} from './modules/{m}';"
    if line not in s: s=s.replace(last,last+"\n"+line); last=line
mm=re.search(r"export const MODULES: Module\[\] = \[([^\]]*)\]", s)
items=[x.strip() for x in mm.group(1).split(',')]
for m in mods:
    if m not in items: items.append(m)
s=s[:mm.start(1)]+", ".join(items)+s[mm.end(1):]
open(p,'w',encoding='utf-8').write(s)
if gen_file!='-':
    p='src/core/generators.ts'; s=open(p,encoding='utf-8').read()
    imp=f"import {{ {gen_export} }} from './gen/{gen_file}';"
    if imp not in s:
        s=s.replace("import { GENERATORS_HARDWARE } from './gen/hardware';","import { GENERATORS_HARDWARE } from './gen/hardware';\n"+imp)
        s=s.replace("  ...GENERATORS_HARDWARE,","  ...GENERATORS_HARDWARE,\n  ..."+gen_export+",")
    open(p,'w',encoding='utf-8').write(s)
