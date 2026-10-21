"""Buat file judul/deskripsi/tag SEO dari meta.json + lines.json (timestamp bab otomatis).

Pakai: python3 scripts/seo.py <slug>   -> youtube/<slug>.md
"""
import json
import sys


def mmss(t):
    t = int(t)
    return f'{t // 60}:{t % 60:02}'


def main(slug):
    meta = json.load(open(f'src/videos/{slug}/meta.json', encoding='utf-8'))
    lines = json.load(open(f'src/videos/{slug}/lines.json', encoding='utf-8'))
    stamps = '\n'.join(f'{mmss(0 if i == 0 else lines[i]["start"])} {label}' for i, label in meta['chapters'])
    out = [f"# YouTube: {meta['titles'][0]}", '']
    for n, t in enumerate(meta['titles'], 1):
        out += [f'## Opsi {n}: thumbnail `{slug}-thumb-{n}.png`', f'**Judul:** {t}', '']
    out += ['---', '', '## Deskripsi', '', meta['intro'], '', '⏱️ Timestamp', stamps, '', f"💬 {meta['question']} Tulis di kolom komentar.", '', '📚 Sumber data']
    out += [f'- {s}' for s in meta['sources']]
    out += [meta['note'], '', '⚠️ Disclaimer: Video ini untuk edukasi, bukan ajakan membeli atau menjual aset apa pun. Lakukan riset sendiri.', '', ' '.join(meta['hashtags']), '', '---', '', '## Tag', ', '.join(meta['tags']), '']
    out += ['## Tips upload', '- Pakai Opsi 1 sebagai utama, lalu uji Opsi 2/3 lewat Test & Compare di YouTube Studio.', f'- Unggah `input/{slug}/vo_{slug}.srt` sebagai subtitle bahasa Indonesia.', '- Kategori: Pendidikan. Bahasa: Indonesia.', '']
    open(f'youtube/{slug}.md', 'w', encoding='utf-8').write('\n'.join(out))
    print(f'youtube/{slug}.md')


if __name__ == '__main__':
    main(sys.argv[1])
