#!/bin/bash
# Renders every still scene (1632x918, 48 spp, denoised). Skips existing. Log: out/stills_log.txt
cd "$(dirname "$0")"; mkdir -p out/stills
for n in ${SCENES:-$(SCENE=LIST /opt/blender/blender -b -P scenes.py -- x 1 1 2>&1 | tail -1)}; do
  [ -f out/stills/${n}_0001.png ] && continue
  s=$(date +%s); ./run_scene.sh $n ${SAMPLES:-48} ${RES:-0.85} out/stills; echo "$n $(( $(date +%s)-s ))s" >> out/stills_log.txt
done
echo ALL_DONE >> out/stills_log.txt
