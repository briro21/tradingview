# Cave of Hira — video pilot (Remotion + Three.js)

Pilot of the first ~44 s of the narration script, stylised 3D. Sacred figures are never shown with faces (silhouette / POV / light only).

## Build
```bash
pip install piper-tts scipy numpy
cd voice && curl -LO https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/ryan/high/en_US-ryan-high.onnx && curl -LO https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/ryan/high/en_US-ryan-high.onnx.json && cd ..
# generate vo0..vo7.wav from voice/lines.txt (one line per scene)
i=0; while IFS= read -r l; do echo "$l" | python3 -m piper -m voice/en_US-ryan-high.onnx --length-scale 0.95 -f voice/vo$i.wav; i=$((i+1)); done < voice/lines.txt
python3 scripts/audio.py   # synth SFX + mix -> public/pilot.wav, src/timeline.json
npm install && npm run render   # -> out/pilot.mp4
```
