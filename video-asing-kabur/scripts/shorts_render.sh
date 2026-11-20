#!/bin/sh
# Render semua Shorts (atau id tertentu) ke out/shorts/.
set -e
cd "$(dirname "$0")/.."
BROWSER=${BROWSER:-$(ls -d /opt/pw-browsers/chromium_headless_shell-*/*/headless_shell /opt/pw-browsers/chromium_headless_shell-*/*/chrome-headless-shell 2>/dev/null | sort -V | tail -1)}
mkdir -p out/shorts
IDS=${*:-$(python3 -c "import json;print(' '.join(s['id'] for s in json.load(open('src/shorts/shorts.json'))))")}
for id in $IDS; do
  npx remotion render Short-$id out/shorts/$id.mp4 --browser-executable="$BROWSER" --video-bitrate=8M --concurrency=4 > out/shorts/$id.log 2>&1
  ls -la out/shorts/$id.mp4
done
