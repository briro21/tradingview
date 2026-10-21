"""Buat voice-over (edge-tts) + SRT dari naskah, satu kalimat per baris.

Pakai: python3 scripts/tts_vo.py input/rupiah-20000/naskah.txt public/vo_rupiah_20000.mp3 input/rupiah-20000/vo_rupiah_20000.srt
"""
import os
import subprocess
import sys
import tempfile

VOICE = 'id-ID-ArdiNeural'
RATE = '+0%'
GAP = 0.45        # jeda antar kalimat (detik)
CHAPTER_GAP = 0.9  # jeda lebih panjang setelah baris pendek seperti "Hari pertama."
MAX_WORDS = 7


def dur(path):
    out = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path], capture_output=True, text=True)
    return float(out.stdout.strip())


def ts(t):
    ms = round(t * 1000)
    return f'{ms // 3600000:02}:{ms // 60000 % 60:02}:{ms // 1000 % 60:02},{ms % 1000:03}'


def main(src, mp3, srt):
    lines = [l.strip() for l in open(src, encoding='utf-8') if l.strip()]
    tmp = tempfile.mkdtemp()
    parts, cues, t = [], [], 0.3
    silence = os.path.join(tmp, 'sil.wav')
    for i, line in enumerate(lines):
        raw = os.path.join(tmp, f'{i:03}.mp3')
        cmd = ['edge-tts', '--voice', VOICE, f'--rate={RATE}', '--text', line, '--write-media', raw]
        if os.environ.get('HTTPS_PROXY'):
            cmd[1:1] = ['--proxy', os.environ['HTTPS_PROXY']]
        subprocess.run(cmd, check=True, capture_output=True)
        wav = os.path.join(tmp, f'{i:03}.wav')
        # Buang hening bawaan TTS di awal & akhir kalimat agar jeda dan waktu subtitle akurat.
        trim = 'silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse'
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', raw, '-af', trim, '-ar', '24000', '-ac', '1', wav], check=True)
        d = dur(wav)
        # Bagi kalimat menjadi potongan subtitle, waktu proporsional dengan jumlah huruf.
        words = line.split()
        n = -(-len(words) // MAX_WORDS)
        size = -(-len(words) // n)
        chunks = [' '.join(words[k * size:(k + 1) * size]) for k in range(n)]
        total = sum(len(c) for c in chunks)
        start = t
        for c in chunks:
            end = start + d * len(c) / total
            cues.append((start, end, c))
            start = end
        gap = CHAPTER_GAP if len(words) <= 4 else GAP
        parts += [wav, ('sil', gap)]
        t += d + gap
        print(f'{i + 1}/{len(lines)} {d:.2f}s {line[:50]}', flush=True)

    concat = os.path.join(tmp, 'list.txt')
    with open(concat, 'w') as f:
        lead = os.path.join(tmp, 'lead.wav')
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'lavfi', '-i', 'anullsrc=r=24000:cl=mono', '-t', '0.3', lead], check=True)
        f.write(f"file '{lead}'\n")
        for p in parts:
            if isinstance(p, tuple):
                s = os.path.join(tmp, f'sil{p[1]}.wav')
                if not os.path.exists(s):
                    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'lavfi', '-i', 'anullsrc=r=24000:cl=mono', '-t', str(p[1]), s], check=True)
                f.write(f"file '{s}'\n")
            else:
                f.write(f"file '{p}'\n")
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', concat, '-ar', '44100', '-ac', '2', '-b:a', '192k', mp3], check=True)

    with open(srt, 'w', encoding='utf-8') as f:
        for i, (a, b, c) in enumerate(cues, 1):
            f.write(f'{i}\n{ts(a)} --> {ts(b)}\n{c}\n\n')
    print('durasi', round(dur(mp3), 2), 'detik;', len(cues), 'subtitle')


if __name__ == '__main__':
    main(*sys.argv[1:4])
