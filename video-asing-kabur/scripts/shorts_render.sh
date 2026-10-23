#!/bin/sh
# Render semua Shorts (atau id tertentu) ke out/shorts/.
set -e
cd "$(dirname "$0")/.."
BROWSER=${BROWSER:-/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell}
mkdir -p out/shorts
IDS=${*:-$(python3 -c "import json;print(' '.join(s['id'] for s in json.load(open('src/shorts/shorts.json'))))")}
for id in $IDS; do
  npx remotion render Short-$id out/shorts/$id.mp4 --browser-executable="$BROWSER" --video-bitrate=8M --concurrency=4 > out/shorts/$id.log 2>&1
  ls -la out/shorts/$id.mp4
done
