#!/usr/bin/env bash
# Render an episode's opening for one hook variant and put it in front of the unchanged body.
#
#   scripts/assemble_opening.sh ep9 A            -> out/ep9-opening-hookA.mp4, out/ep9-preview30-hookA.mp4
#   scripts/assemble_opening.sh ep9 A --full     -> also out/ep9-final-hookA.mp4 + .srt (for upload)
#
# Body = the existing motion render (out/<ep>-reel/final.mp4) from the start of Part 1 (the old
# S00 hook is replaced by the opening). Nothing in the body is re-rendered or changed.
set -euo pipefail
EP=$1; V=$2; MODE=${3:-}
cd "$(dirname "$0")/.."
COMP="$(echo "${EP:0:1}" | tr a-z A-Z)${EP:1}Opening"
OPEN="out/${EP}-opening-hook${V}.mp4"
BODY_SRC="out/${EP}-reel/final.mp4"
python3 scripts/build_opening.py "$EP"
node_modules/.bin/remotion render "$COMP" "$OPEN" --props="{\"episode\":\"$EP\",\"hookVariant\":\"$V\"}" \
  --ignore-certificate-errors --crf=18 --log=error
BODY_START=$(python3 -c "import json;t=json.load(open('src/episodes/$EP/timing.json'));print(t['S00']['frames']/30)")
# opening audio to the body's loudness (-14 LUFS), 48 kHz stereo like the body mix
ffmpeg -v error -y -i "$OPEN" -c:v copy -af "loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000" -ac 2 -c:a aac -b:a 192k "out/.${EP}-open-norm.mp4"
if [ "$MODE" = "--full" ]; then
  LEN=""; OUT="out/${EP}-final-hook${V}.mp4"
else
  OPEN_LEN=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "out/.${EP}-open-norm.mp4")
  LEN="-t $(python3 -c "print(max(1, 30 - $OPEN_LEN + 0.5))")"; OUT="out/${EP}-preview30-hook${V}.mp4"
fi
ffmpeg -v error -y -ss "$BODY_START" -i "$BODY_SRC" $LEN -c:v libx264 -crf 18 -preset fast -pix_fmt yuv420p -r 30 \
  -c:a aac -b:a 192k -ar 48000 -ac 2 "out/.${EP}-body.mp4"
ffmpeg -v error -y -i "out/.${EP}-open-norm.mp4" -i "out/.${EP}-body.mp4" \
  -filter_complex "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[v][a]" -map "[v]" -map "[a]" \
  -c:v libx264 -crf 18 -preset fast -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart \
  $( [ "$MODE" = "--full" ] || echo "-t 30" ) "$OUT"
if [ "$MODE" = "--full" ]; then
  python3 - "$EP" "$V" "$BODY_START" <<'PY'
import json, re, subprocess, sys
ep, v, body_start = sys.argv[1], sys.argv[2], float(sys.argv[3])
open_len = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f"out/.{ep}-open-norm.mp4"]))
fmt = lambda t: f"{int(t // 3600):02}:{int(t % 3600 // 60):02}:{int(t % 60):02},{round(t % 1 * 1000) % 1000:03}"
props = json.load(open(f"src/episodes/{ep}/opening.props.json"))[v]
audio = props["audioSrc"].split("/")[-1][:-4]
cues = [(a, b, t) for a, b, t in json.load(open(f"src/episodes/{ep}/opening_timing.json"))[audio]["cues"]]
def parse(ts):
    h, m, s = ts.replace(",", ".").split(":"); return int(h) * 3600 + int(m) * 60 + float(s)
srt = open(f"public/{ep}/full.srt").read().strip().split("\n\n")
shift = open_len - body_start
for blk in srt:
    ln = blk.split("\n"); a, b = [parse(x) for x in ln[1].split(" --> ")]
    if a >= body_start - 0.05:
        cues.append((a + shift, b + shift, " ".join(ln[2:])))
out = "\n".join(f"{i}\n{fmt(a)} --> {fmt(b)}\n{t}\n" for i, (a, b, t) in enumerate(cues, 1))
open(f"out/{ep}-final-hook{v}.srt", "w").write(out)
t = json.load(open(f"src/episodes/{ep}/timing.json")); c = 0.0
print(f"chapters for hook {v} (body shifted by {shift:+.2f}s):")
for k in sorted(t):
    s = 0 if k == "S00" else c + shift
    print(f"  {k}: {int(s // 60)}:{int(s % 60):02}"); c += t[k]["frames"] / 30
PY
fi
rm -f "out/.${EP}-open-norm.mp4" "out/.${EP}-body.mp4"
echo "-> $OUT"
