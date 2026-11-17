# Vertical Shorts from the finished film: blurred-fill 9:16, burned-in captions, title on top.
import json, subprocess, re, sys
from pathlib import Path
HERE = Path(__file__).resolve().parent.parent
SRC = '/home/user/tradingview/video-output/hira-chapter1-motionreel.mp4'
OUT = Path('/home/user/tradingview/video-output/hira-youtube'); WORK = Path(sys.argv[1])
T = json.load(open(HERE / 'timeline.json')); P = T['period']; items = T['items']; by = {e['key']: e for e in items}
SHORTS = [  # name, title on screen, first key, last key
  ('short1-khadijah-answer', "KHADIJAH’S ANSWER", '73', '85'),
  ('short2-three-times', 'SQUEEZED THREE TIMES', '46', '57'),
  ('short3-five-verses', 'THE FIRST FIVE VERSES', '58', '65'),
  ('short4-waraqah-prophecy', 'WARAQAH’S WARNING', '96', '104'),
]
def ts(x): h = int(x // 3600); m = int(x % 3600 // 60); s = x % 60; return f'{h}:{m:02d}:{s:05.2f}'
def esc(t): return t.replace('\\', '').replace('{', '(').replace('}', ')')
for name, title, k0, k1 in SHORTS:
    a = by[k0]['beat'] * P - 0.15; b = (by[k1]['beat'] + by[k1]['nb']) * P; d = b - a
    ev = []
    for e in items:
        if e['vo_t'] is None or e['vo_t'] < a - 0.01 or e['vo_t'] > b: continue
        words = e['text'].split(); n = len(words); chunks = []; i = 0
        while i < n:
            sz = 3 if n - i > 4 else n - i   # 3 words at a time, never a 1-word orphan
            if n - i == 4: sz = 2
            chunks.append(words[i:i + sz]); i += sz
        t0 = e['vo_t'] - a; dur = e['vo_dur']; tot = sum(len(w) + 1 for c in chunks for w in c); c0 = t0
        for c in chunks:
            L = sum(len(w) + 1 for w in c) / tot * dur
            ev.append((c0, c0 + L, ' '.join(c))); c0 += L
    ass = ['[Script Info]', 'ScriptType: v4.00+', 'PlayResX: 1080', 'PlayResY: 1920', 'WrapStyle: 0', '', '[V4+ Styles]',
      'Format: Name,Fontname,Fontsize,PrimaryColour,SecondaryColour,OutlineColour,BackColour,Bold,Italic,Underline,StrikeOut,ScaleX,ScaleY,Spacing,Angle,BorderStyle,Outline,Shadow,Alignment,MarginL,MarginR,MarginV,Encoding',
      'Style: Cap,Inter,84,&H00F4F4FF,&H00F4F4FF,&H00000000,&H80000000,1,0,0,0,100,100,0,0,1,7,2,2,60,60,420,1',
      'Style: Ttl,Inter,92,&H004AC8FF,&H004AC8FF,&H00000000,&H80000000,1,0,0,0,100,100,2,0,1,8,2,8,60,60,300,1', '',
      '[Events]', 'Format: Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text', f'Dialogue: 0,{ts(0)},{ts(d)},Ttl,,0,0,0,,{esc(title)}']
    for s0, s1, t in ev: ass.append(f'Dialogue: 1,{ts(s0)},{ts(s1)},Cap,,0,0,0,,{esc(t.upper())}')
    (WORK / f'{name}.ass').write_text('\n'.join(ass) + '\n')
    vf = ("[0:v]split[a][b];[a]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=50:12,eq=brightness=-0.18[bg];"
          "[b]scale=1080:-2[fg];[bg][fg]overlay=0:(H-h)/2-60[v];[v]ass=" + str(WORK / f'{name}.ass') + "[vo]")
    cmd = ['ffmpeg', '-loglevel', 'error', '-y', '-ss', f'{a:.3f}', '-t', f'{d:.3f}', '-i', SRC, '-filter_complex', vf, '-map', '[vo]', '-map', '0:a',
           '-af', f'afade=t=in:d=0.2,afade=t=out:st={d-0.5:.2f}:d=0.5', '-c:v', 'libx264', '-crf', '22', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-r', '30',
           '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', str(OUT / f'{name}.mp4')]
    print(name, round(a, 1), round(d, 1), 's', flush=True); subprocess.run(cmd, check=True)
print('SHORTS_DONE')
