#!/bin/sh
# Produksi batch video "What If": naskah -> VO + SRT -> timing -> video -> 3 thumbnail -> SEO.
# Pakai: scripts/batch.sh arb-7 emas-3-juta msci-standalone
# Syarat per slug: input/<slug>/naskah.txt, src/videos/<slug>/{storyboard.tsx,meta.json}, terdaftar di src/videos/registry.tsx.
set -e
cd "$(dirname "$0")/.."
BROWSER=${BROWSER:-/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell}
export TTS_RATE=${TTS_RATE:--8%}
[ -f public/sfx/pad.wav ] || scripts/make_sfx.sh

for slug in "$@"; do
  echo "== $slug: voice-over"
  [ -n "$SKIP_TTS" ] || python3 -I scripts/tts_vo.py input/$slug/naskah.txt public/vo_$slug.mp3 input/$slug/vo_$slug.srt | tail -1
  python3 -I scripts/srt_lines.py input/$slug/naskah.txt input/$slug/vo_$slug.srt src/videos/$slug > /dev/null
done

npx tsc -p .

for slug in "$@"; do
  echo "== $slug: thumbnail & SEO"
  for n in 1 2 3; do
    npx remotion still Thumb-$slug-$n youtube/$slug-thumb-$n.png --frame=0 --browser-executable="$BROWSER" > /dev/null
  done
  python3 -I scripts/seo.py $slug
  echo "== $slug: render video"
  npx remotion render WhatIf-$slug out/what-if-$slug.mp4 --browser-executable="$BROWSER" --concurrency=4 > out/render-$slug.log 2>&1
  ls -la out/what-if-$slug.mp4
  # Salinan ringan (~5 Mbps) bila file asli terlalu besar untuk dikirim/diunduh cepat.
  if [ "$(stat -c %s out/what-if-$slug.mp4)" -gt 390000000 ]; then
    ffmpeg -v error -y -i out/what-if-$slug.mp4 -c:v libx264 -preset medium -b:v 4600k -maxrate 6000k -bufsize 9000k -pix_fmt yuv420p -c:a copy -movflags +faststart out/what-if-$slug-send.mp4
  fi
done
