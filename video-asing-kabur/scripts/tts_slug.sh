#!/bin/bash
# Suara + timing untuk satu atau lebih slug: scripts/tts_slug.sh <slug...>
cd "$(dirname "$0")/.."
export SSL_CERT_FILE=${SSL_CERT_FILE:-/root/.ccr/ca-bundle.crt} TTS_RATE=${TTS_RATE:--8%}
for s in "$@"; do
  python3 -I scripts/tts_vo.py input/$s/naskah.txt public/vo_$s.mp3 input/$s/vo_$s.srt > input/$s/tts.log 2>&1
  echo "$s $(tail -1 input/$s/tts.log)"
  python3 -I scripts/srt_lines.py input/$s/naskah.txt input/$s/vo_$s.srt src/videos/$s > /dev/null
done
