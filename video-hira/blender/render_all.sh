#!/bin/bash
# Renders every Blender shot as a PNG sequence (960x540, 16 spp + denoise). Skips frames already rendered.
cd "$(dirname "$0")"
for n in ${SHOTS:-s4_valley s5_market s6_caravan s7_pilgrims s2_oldman s0_hook}; do
  mkdir -p out/$n
  F=$(grep -m1 '^F = ' shots/$n.py | cut -d' ' -f3)
  done_n=$(ls out/$n 2>/dev/null | wc -l)
  if [ "$done_n" -ge "$F" ]; then echo "$n done"; continue; fi
  start=$((done_n + 1))
  echo "$n: frames $start-$F"
  /opt/blender/blender -b -P shots/$n.py -- $PWD/out/$n/f_ 16 0.5 $start $F 2>&1 | grep -E "Error|Traceback" -A4
done
echo ALL_DONE
