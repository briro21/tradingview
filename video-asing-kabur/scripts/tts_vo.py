"""Buat voice-over (edge-tts) + SRT dari naskah, satu kalimat per baris.

Pakai: python3 scripts/tts_vo.py input/rupiah-20000/naskah.txt public/vo_rupiah_20000.mp3 input/rupiah-20000/vo_rupiah_20000.srt
"""
import os
import subprocess
import sys
import tempfile
import time

VOICE = 'id-ID-ArdiNeural'
RATE = os.environ.get('TTS_RATE', '+0%')
GAP = 0.45        # jeda antar kalimat (detik)
CHAPTER_GAP = 0.9  # jeda lebih panjang setelah baris pendek seperti "Hari pertama."
MAX_WORDS = 7

# Suara per tokoh untuk baris dialog berformat ">> Nama: teks".
VOICES = {
    'Kamu': ('id-ID-ArdiNeural', '+0%', '+12Hz'),
    'Raka': ('id-ID-ArdiNeural', '+8%', '+25Hz'),
    'Pak Joko': ('id-ID-ArdiNeural', '-14%', '-18Hz'),
    'Bu Ana': ('id-ID-GadisNeural', '-6%', '-4Hz'),
    'Petugas': ('id-ID-ArdiNeural', '-6%', '-10Hz'),
    'Surat': ('id-ID-GadisNeural', '-18%', '-12Hz'),
    'Pak Harso': ('id-ID-ArdiNeural', '-22%', '-24Hz'),
    'Joko Muda': ('id-ID-ArdiNeural', '-2%', '+4Hz'),
    'Pedagang': ('id-ID-ArdiNeural', '+4%', '-6Hz'),
    'Bu Sri': ('id-ID-GadisNeural', '-10%', '+6Hz'),
    'Tamu': ('id-ID-ArdiNeural', '-10%', '-14Hz'),
    'Deputi': ('id-ID-ArdiNeural', '-4%', '-8Hz'),
    'Pejabat': ('id-ID-ArdiNeural', '+2%', '-2Hz'),
    'Warganet': ('id-ID-GadisNeural', '+10%', '+10Hz'),
    'Dirimu': ('id-ID-ArdiNeural', '-12%', '-4Hz'),
    'Notaris': ('id-ID-ArdiNeural', '-10%', '-16Hz'),
    'Om Darto': ('id-ID-ArdiNeural', '+2%', '-12Hz'),
    'Sales': ('id-ID-ArdiNeural', '+12%', '+8Hz'),
}


def parse(line):
    """Kembalikan (teks tampilan untuk subtitle, teks yang diucapkan, (voice, rate, pitch))."""
    if line.startswith('>> ') and ':' in line:
        name, said = line[3:].split(':', 1)
        name, said = name.strip(), said.strip()
        voice, rate, pitch = VOICES.get(name, (VOICE, RATE, '+0Hz'))
        return f'{name}: {said}', said, (voice, rate, pitch)
    return line, line, (VOICE, RATE, '+0Hz')


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
        display, spoken, (voice, rate, pitch) = parse(line)
        cmd = ['edge-tts', '--voice', voice, f'--rate={rate}', f'--pitch={pitch}', '--text', spoken, '--write-media', raw]
        if os.environ.get('HTTPS_PROXY'):
            cmd[1:1] = ['--proxy', os.environ['HTTPS_PROXY']]
        # Layanan TTS kadang gagal sesaat: coba ulang beberapa kali.
        for attempt in range(5):
            if subprocess.run(cmd, capture_output=True).returncode == 0:
                break
            time.sleep(2 ** attempt)
        else:
            raise RuntimeError(f'TTS gagal untuk baris {i + 1}: {line}')
        wav = os.path.join(tmp, f'{i:03}.wav')
        # Buang hening bawaan TTS di awal & akhir kalimat agar jeda dan waktu subtitle akurat.
        trim = 'silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse'
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', raw, '-af', trim, '-ar', '24000', '-ac', '1', wav], check=True)
        d = dur(wav)
        # Bagi kalimat menjadi potongan subtitle, waktu proporsional dengan jumlah huruf.
        words = display.split()
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
