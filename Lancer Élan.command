#!/bin/zsh
cd -- "${0:A:h}"
ELAN_BUN="$(command -v bun)"
if [[ -z "$ELAN_BUN" && -x .tools/bun ]]; then ELAN_BUN="$PWD/.tools/bun"; fi
if [[ -z "$ELAN_BUN" ]]; then echo "Installez Bun depuis https://bun.sh puis relancez Élan."; read; exit 1; fi
export PATH="${ELAN_BUN:h}:$PATH"
"$ELAN_BUN" run dev &
ELAN_LOCAL_PID=$!
trap 'kill "$ELAN_LOCAL_PID" 2>/dev/null' EXIT INT TERM
sleep 0.5
open 'http://127.0.0.1:4180/#/home'
wait "$ELAN_LOCAL_PID"
