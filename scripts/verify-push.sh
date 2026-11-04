#!/bin/sh
# Prüft den letzten Commit in einem sauberen Worktree (Tests + Typecheck) und pusht nur bei Erfolg.
cd "$(dirname "$0")/.." || exit 1
ROOT=$(pwd); W="$ROOT/../.bbs-verify"
git worktree remove --force "$W" 2>/dev/null; rm -rf "$W"
git worktree add -q "$W" HEAD && ln -s "$ROOT/node_modules" "$W/node_modules"
OUT=$(cd "$W" && npx vitest run 2>&1); T=$?
TC=$(cd "$W" && npx tsc --noEmit -p tsconfig.json 2>&1); C=$?
echo "$OUT" | grep -E "Test Files|Tests |FAIL|AssertionError" | head -12; echo "$TC" | head -5
git worktree remove --force "$W"
if [ $T -eq 0 ] && [ $C -eq 0 ]; then git push -q origin main && echo "PUSHED $(git log --oneline -1)"; else echo "VERIFY FAILED – nicht gepusht"; fi
