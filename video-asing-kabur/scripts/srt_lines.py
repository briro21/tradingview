"""Dari naskah + SRT hasil tts_vo.py: buat captions.json dan lines.json (waktu mulai/selesai per kalimat naskah).

Pakai: python3 scripts/srt_lines.py input/rupiah-20000/naskah.txt input/rupiah-20000/vo_rupiah_20000.srt src/rupiah
"""
import json
import os
import sys

MAX_WORDS = 7  # harus sama dengan tts_vo.py


def ts(s):
    h, m, r = s.split(':')
    sec, ms = r.split(',')
    return int(h) * 3600 + int(m) * 60 + int(sec) + int(ms) / 1000


def main(naskah, srt, outdir):
    cues = []
    for block in open(srt, encoding='utf-8').read().strip().split('\n\n'):
        l = block.split('\n')
        a, b = l[1].split(' --> ')
        cues.append({'start': ts(a), 'end': ts(b), 'text': ' '.join(l[2:])})
    lines, k = [], 0
    for i, line in enumerate(l.strip() for l in open(naskah, encoding='utf-8') if l.strip()):
        shown = line[3:] if line.startswith('>> ') and ':' in line else line  # sama dengan tts_vo.parse
        n = -(-len(shown.split()) // MAX_WORDS)
        lines.append({'i': i, 'start': cues[k]['start'], 'end': cues[k + n - 1]['end'], 'text': line})
        k += n
    assert k == len(cues)
    json.dump(cues, open(os.path.join(outdir, 'captions.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    json.dump(lines, open(os.path.join(outdir, 'lines.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    for x in lines:
        print(f"{x['i']:3} {x['start']:7.2f} {x['text'][:80]}")


if __name__ == '__main__':
    main(*sys.argv[1:4])
