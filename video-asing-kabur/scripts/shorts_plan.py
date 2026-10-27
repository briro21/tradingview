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
    ('kembali-1998', 'k98-hook', 2, 16, 'BANGUN DI TAHUN 1998\nDENGAN INGATAN 2026', 'Bangun di Tahun 1998 dengan Ingatan 2026? #whatif #krismon'),
    ('kembali-1998', 'k98-ayah', 24, 40, 'BANK AYAHMU DITUTUP\n3 BULAN LAGI', 'Kamu Tahu Bank Ayahmu Akan Ditutup di 1998 #whatif #cerita'),
    ('uang-dua-kali', 'udk-hook', 0, 14, 'UANGMU KEMBALI\nDUA KALI LIPAT', 'Setiap Belanja, Uangmu Kembali 2x Lipat #whatif #inflasi'),
    ('uang-dua-kali', 'udk-inflasi', 27, 37, 'KENAPA HARGA\nBISA NAIK?', 'Inflasi Dijelaskan dengan 10 Karung Beras #inflasi #ekonomi'),
    ('gubernur-24-jam', 'gub-hook', 0, 15, 'KAMU JADI GUBERNUR BI\nSELAMA 24 JAM', 'Jadi Gubernur Bank Indonesia 24 Jam? #whatif #bankindonesia'),
    ('gubernur-24-jam', 'gub-malam', 47, 57, 'SERANGAN MALAM:\nPAHLAWAN ATAU TAMENG?', 'Rupiah Diserang Tengah Malam, Apa Keputusanmu? #whatif #rupiah'),
    ('tabung-saham-2000', 'tab-hook', 0, 12, 'NABUNG SAHAM Rp100 RIBU\nSEJAK TAHUN 2000', 'Nabung Saham Rp100 Ribu Sebulan Sejak 2000, Jadi Berapa? #saham #IHSG'),
    ('tabung-saham-2000', 'tab-2008', 26, 37, 'IHSG ANJLOK 50%:\nJUAL ATAU TAHAN?', 'Krisis 2008: Jual atau Tahan Saham? #saham #investasi'),
    ('warisan-10-miliar', 'war-hook', 0, 11, 'BESOK PAGI KAMU\nPUNYA Rp10 MILIAR', 'Tiba-tiba Punya Rp10 Miliar Besok Pagi? #whatif #keuangan'),
    ('warisan-10-miliar', 'war-robot', 29, 37, 'UNTUNG PASTI 3%\nSEBULAN?', 'Robot Trading Untung Pasti 3% Sebulan? Ini Polanya #investasibodong'),
    ('dirimu-10-tahun', 'dir-hook', 0, 11, 'DIRIMU 10 TAHUN LAGI\nMENGETUK PINTU', 'Dirimu dari Masa Depan Mengetuk Pintu #whatif #paylater'),
    ('dirimu-10-tahun', 'dir-bunga', 31, 38, 'Rp1 JUTA YANG\nTIDAK KAMU SADARI', 'Rp1 Juta Sebulan yang Hilang Tanpa Sadar #keuangan #menabung'),
    ('pikiran-bandar', 'pkb-hook', 0, 12, 'KAMU BISA DENGAR\nPIKIRAN BANDAR SAHAM', 'Bisa Dengar Pikiran Bandar Saham 1 Jam Lebih Awal? #saham #whatif'),
    ('pikiran-bandar', 'pkb-pucuk', 38, 43, 'KALAU KAMU UNTUNG,\nUANGNYA DARI SIAPA?', 'Saham Gorengan: Siapa yang Beli di Pucuk? #sahamgorengan #IHSG'),
    ('terkaya-7-hari', 'trk-hook', 0, 17, 'ORANG TERKAYA\nTUNAINYA CUMA 0,5%?', 'Orang Terkaya di Indonesia, Uang Tunainya Cuma 0,5%? #saham #whatif'),
    ('terkaya-7-hari', 'trk-gadai', 25, 29, 'SAHAM DIGADAI:\nBOLA SALJU KEJATUHAN', 'Kenapa Saham Konglomerat Bisa Jatuh Beruntun? #saham #IHSG'),
    ('tanpa-belanja-30-hari', 'tbl-hook', 0, 10, 'SATU INDONESIA\n30 HARI TANPA BELANJA', 'Kalau Satu Indonesia 30 Hari Tanpa Belanja? #whatif #ekonomi'),
    ('tanpa-belanja-30-hari', 'tbl-paradoks', 27, 35, 'SEMUA BERHEMAT,\nKOK MALAH PHK?', 'Paradoks Hemat: Semua Berhemat, Malah Banyak PHK #ekonomi #hemat'),
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
