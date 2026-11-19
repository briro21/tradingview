#!/usr/bin/env bash
# Export an episode's beats + icons + theme + timing to JSON for the motion engine.
#   scripts/export_scenes.sh ep9 > /tmp/src9.json
set -euo pipefail
EP=$1; N=${EP#ep}
cd "$(dirname "$0")/.."
T=$(mktemp -d)
echo 'export const loadFont = () => ({ fontFamily: "stub" });' > "$T/stub.js"
cat > "$T/entry.ts" <<TS
import { EP${N}_SCENES } from "$PWD/src/episodes/$EP/scenes";
import { ICONS } from "$PWD/src/board/icons";
import { theme } from "$PWD/src/theme";
import timing from "$PWD/src/episodes/$EP/timing.json";
console.log(JSON.stringify({ scenes: EP${N}_SCENES, icons: ICONS, theme, timing }));
TS
node_modules/.bin/esbuild "$T/entry.ts" --bundle --platform=node --format=esm --log-level=warning \
  --alias:@remotion/google-fonts/PatrickHand="$T/stub.js" --alias:@remotion/google-fonts/PermanentMarker="$T/stub.js" \
  --outfile="$T/entry.mjs"
node "$T/entry.mjs"
rm -rf "$T"
