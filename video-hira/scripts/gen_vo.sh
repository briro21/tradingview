#!/bin/bash
cd "$(dirname "$0")/.."
python3 - <<'PY'
import json,subprocess,os
L=json.load(open('voice/full_lines.json'))
for i,l in enumerate(L):
    if i<4: continue
    p=f'voice/f{i:03d}.wav'
    if os.path.exists(p): continue
    subprocess.run(['python3','-m','piper','-m','voice/en_US-ryan-high.onnx','--length-scale','0.97','-f',p],input=l.encode(),stderr=subprocess.DEVNULL)
print('VO_DONE')
PY
