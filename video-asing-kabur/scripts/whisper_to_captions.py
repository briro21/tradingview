"""Ubah transkrip Whisper (segmen + waktu per kata) menjadi potongan subtitle dengan teks terkoreksi.

Pakai: python3 scripts/whisper_to_captions.py input/vo_asing_keluar.whisper.json src/asing-kabur/captions.json
"""
import json
import sys

# Koreksi salah dengar Whisper.
FIX = {
    'hargami instan': 'harga mi instan',
    'hayalan': 'khayalan',
    'anjok': 'anjlok',
    'Tapi tumbuh sampai akhir': 'Tapi tonton sampai akhir',
    'Bang Indonesia': 'Bank Indonesia',
    'sken hario': 'skenario',
    'skenario-nya': 'skenarionya',
    'Expansi': 'Ekspansi',
    'Recruitment': 'Rekrutmen',
    'Mi Instan': 'mi instan',
    'diwarung': 'di warung',
    'disini': 'di sini',
    'disinilah': 'di sinilah',
    'Disinilah': 'Di sinilah',
    'IHS dia': 'IHSG',
    'Rokal': 'lokal',
    'dalam netri': 'dalam negeri',
    'indek ': 'indeks ',
    'Bursa mendapatkan': 'bursa mendapati',
    'Antrian': 'Antrean',
    'satu persatu': 'satu per satu',
    'Satu persatu': 'Satu per satu',
    'nafas': 'napas',
}
MAX_WORDS = 7


def fix(text):
    for a, b in FIX.items():
        text = text.replace(a, b)
    return text


def main(src, dst):
    out = []
    for seg in json.load(open(src, encoding='utf-8')):
        words = seg['words']
        fixed = fix(seg['text']).split()
        n = -(-len(fixed) // MAX_WORDS)
        size = -(-len(fixed) // n)
        for k in range(n):
            part = fixed[k * size:(k + 1) * size]
            i0 = min(len(words) - 1, round(k * size / len(fixed) * len(words)))
            i1 = max(i0, min(len(words), round(min((k + 1) * size, len(fixed)) / len(fixed) * len(words))) - 1)
            out.append({'start': round(words[i0][0], 2), 'end': round(words[i1][1], 2), 'text': ' '.join(part)})
    json.dump(out, open(dst, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    print(len(out), 'captions')


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
