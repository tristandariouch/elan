#!/bin/zsh
cd -- "${0:A:h}"
ELAN_NODE='/Users/tristan-dariouchshoeibi/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node'
"$ELAN_NODE" scripts/build.mjs || exit 1
"$ELAN_NODE" scripts/start-local.mjs &
ELAN_LOCAL_PID=$!
trap 'kill "$ELAN_LOCAL_PID" 2>/dev/null' EXIT INT TERM
sleep 0.5
open 'http://127.0.0.1:4180/#home'
wait "$ELAN_LOCAL_PID"
