"""Hitung jendela waktu Shorts dari indeks kalimat (lines.json) -> src/shorts/shorts.json.

Pakai: python3 scripts/shorts_plan.py
"""
import json

MAX = 56.0  # detik

# (slug, id, baris mulai, baris akhir yang diinginkan, hook atas, judul YouTube)
PLAN = [
    ('arb-7', 'arb-berjilid', 43, 54, 'SAHAMMU TURUN\n5 HARI BERTURUT?', 'Kenapa Saham Bisa ARB 5 Hari Berturut-turut? #ARB #saham'),
    ('arb-7', 'arb-gorengan', 56, 61, 'NAIK 35%,\nTURUN CUMA 7%?', 'ARB 7% Bikin Saham Gorengan Makin Menggoda? Hati-hati! #saham'),
    ('msci-standalone', 'msci-robot', 17, 24, 'ROBOT INI BISA\nJUAL SAHAM INDONESIA', 'Kenapa ETF Bisa Jual Saham Indonesia Tanpa Peduli Laba? #MSCI'),
    ('msci-standalone', 'msci-ihsg', 3, 8, 'IHSG -11,57%\nDALAM SEHARI', 'Apa yang Membuat IHSG Anjlok 11% dalam Sehari? #IHSG #MSCI'),
    ('danantara', 'danantara-18t', 33, 40, 'Rp18 TRILIUN\nCUKUP?', 'Danantara Siapkan Rp18 Triliun, Cukup Tahan IHSG? #Danantara'),
    ('danantara', 'danantara-moral', 41, 47, 'NEGARA SELALU\nMENYELAMATKAN?', 'Bahaya Moral Hazard Kalau Negara Borong Saham #Danantara #IHSG'),
    ('bi-rate-7', 'bi-kpr', 33, 40, 'CICILAN KPR-MU\nBISA NAIK SEGINI', 'BI Rate Naik, Cicilan KPR Rp500 Juta Naik Berapa? #KPR #BIRate'),
    ('bi-rate-7', 'bi-penabung', 54, 63, 'BUNGA NAIK,\nSIAPA UNTUNG?', 'Siapa yang Untung Saat Suku Bunga Naik? #BIRate #tabungan'),
    ('bank-bangkrut', 'bank-lps', 34, 42, 'BANKMU BANGKRUT,\nUANGMU AMAN?', 'Bank Bangkrut, Uang Kembali? Aturan LPS Rp2 Miliar #LPS'),
    ('bank-bangkrut', 'bank-investasi', 54, 61, 'DIBELI DI BANK,\nTAPI TIDAK DIJAMIN', 'Produk Bank Ini TIDAK Dijamin LPS! #LPS #reksadana'),
    ('emas-3-juta', 'emas-spread', 61, 70, 'HARGA EMAS NAIK,\nKOK MASIH RUGI?', 'Harga Emas Naik tapi Kamu Rugi? Ini Sebabnya #emas #Antam'),
    ('emas-3-juta', 'emas-kurs', 17, 22, 'EMAS BISA NAIK\nTANPA HARGA DUNIA NAIK', 'Kenapa Harga Emas Antam Naik Walau Harga Dunia Diam? #emas'),
    ('lihat-10-detik', 'lihat-hook', 0, 14, 'KAMU BISA LIHAT HARGA\n10 DETIK KE DEPAN', 'Bisa Lihat Harga Saham 10 Detik ke Depan? #whatif #saham'),
    ('lihat-10-detik', 'lihat-pilihan', 68, 88, '10 DETIK:\nUANGMU ATAU AYAHMU?', '10 Detik untuk Memilih: Uangmu atau Ayahmu? #whatif #cerita'),
]

out = []
for slug, sid, a, b, hook, title in PLAN:
    lines = json.load(open(f'src/videos/{slug}/lines.json', encoding='utf-8'))
    start = max(0, lines[a]['start'] - 0.3)
    end = lines[b]['end'] + 0.6
    while end - start > MAX and b > a:
        b -= 1
        end = lines[b]['end'] + 0.6
    out.append({'id': sid, 'slug': slug, 'from': round(start, 2), 'to': round(end, 2), 'hook': hook, 'title': title, 'lastLine': b})
    print(f'{sid:16} {end - start:5.1f}s  baris {a}-{b}')
json.dump(out, open('src/shorts/shorts.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
