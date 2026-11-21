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
    ('terkaya-7-hari', 'trk-hook', 0, 17, 'KAMU JADI ORANG TERKAYA\nDI INDONESIA 7 HARI', 'Jadi Orang Terkaya di Indonesia Selama 7 Hari? #whatif #saham'),
    ('terkaya-7-hari', 'trk-gadai', 25, 29, 'SAHAM DIGADAI:\nBOLA SALJU KEJATUHAN', 'Kenapa Saham Konglomerat Bisa Jatuh Beruntun? #saham #IHSG'),
    ('tanpa-belanja-30-hari', 'tbl-hook', 0, 10, 'SATU INDONESIA\n30 HARI TANPA BELANJA', 'Kalau Satu Indonesia 30 Hari Tanpa Belanja? #whatif #ekonomi'),
    ('tanpa-belanja-30-hari', 'tbl-paradoks', 27, 35, 'SEMUA BERHEMAT,\nKOK MALAH PHK?', 'Paradoks Hemat: Semua Berhemat, Malah Banyak PHK #ekonomi #hemat'),
    ('ihsg-crash', 'ihc-hook', 0, 7, 'IHSG ANJLOK 11,57%\nDALAM SEHARI', 'IHSG Anjlok 11,57% dalam Sehari, Pemicunya dari New York #IHSG #MSCI'),
    ('ihsg-crash', 'ihc-msci', 8, 17, 'SIAPA SEBENARNYA\nMSCI?', 'Kenapa Satu Pengumuman MSCI Bisa Hancurkan IHSG? #MSCI #saham'),
    ('badak-jawa', 'bdk-hook', 0, 12, 'HANYA 80–100 BADAK JAWA\nTERSISA DI DUNIA', 'Hanya 80 Badak Jawa Tersisa, Kenapa Mau Dipindah? #badakjawa #ujungkulon'),
    ('badak-jawa', 'bdk-emas', 53, 58, 'EMAS HABIS,\nEKOWISATA BERULANG', 'Tambang Emas vs Ekowisata: Mana yang Lebih Untung? #badakjawa #ekonomi'),
    ('pesangon', 'psg-hook', 0, 6, 'SEMISAL NIH PABRIKMU\nBANGKRUT BESOK', 'Semisal Nih Pabrikmu Bangkrut Besok, Pesangonmu di Mana? #pesangon #PHK'),
    ('pesangon', 'psg-austria', 28, 31, 'CARA AUSTRIA AGAR\nPESANGON TAK HILANG', 'Austria Punya Cara Agar Pesangon Tidak Pernah Hilang #pesangon #buruh'),
    ('ump-2027', 'ump-hook', 0, 6, 'UMP JAKARTA RP6,13 JUTA.\nGAJIMU IKUT NAIK?', 'UMP Jakarta 2027 Rp6,13 Juta, Gajimu Ikut Naik? #UMP2027 #gaji'),
    ('pesangon', 'psg-hoaks', 14, 17, 'PESANGON DISETOR\nKE DANANTARA?', 'Pesangon Disetor ke Danantara? Ini Faktanya #pesangon #hoaks'),
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
# Shorts dari adegan OpusCar (isometrik, spreadsheet, briefing board, sketchnote): mulai tepat di awal baris a,
# sepanjang adegannya. Tanpa 'clip': Short menampilkan video panjangnya sendiri (adegan OpusCar ada di dalamnya).
SCENES = [
    ('pesangon', 'psg-pabrik', 19, 37.4, 'PABRIK BANGKRUT,\nPESANGON NYANGKUT', 'Pabrik Bangkrut, Kenapa Pesangon Nyangkut Bertahun-tahun? #pesangon #buruh'),
    ('pesangon', 'psg-raka', 32, 23.7, 'RP76.500 SEBULAN,\n7 TAHUN JADI BERAPA?', 'Simulasi Dana Pesangon: Rp76.500 Sebulan, 7 Tahun Jadi Berapa? #pesangon #gaji'),
    ('pesangon', 'psg-3tanya', 45, 19.6, '3 PERTANYAAN\nUNTUK NEGARA', 'Dana Pesangon Dititipkan ke Negara: 3 Pertanyaan yang Belum Dijawab #pesangon'),
    ('ump-2027', 'ump-lantai', 29, 42.2, 'UMP NAIK,\nGAJIMU IKUT NAIK?', 'UMP Naik, Tapi Gajimu Belum Tentu Ikut Naik #UMP2027 #gaji'),
    ('ump-2027', 'ump-gaji', 38, 58.8, 'NAIK RP407 RIBU,\nTERASA BERAPA?', 'UMP Jakarta Naik Rp407 Ribu, Tapi Kenaikan Nyatanya Segini #UMP2027 #inflasi'),
    ('ump-2027', 'ump-khl', 18, 53.8, 'BALI NAIK 42%,\nJAKARTA 7%. KOK BISA?', 'Kenapa UMP Bali Naik 42% Tapi Jakarta Cuma 7%? #UMP2027 #KHL'),
    ('ump-2027', 'ump-cek', 52, 33.7, 'UMP NAIK?\nCEK 4 HAL INI', '4 Hal yang Harus Kamu Cek Setelah UMP 2027 Naik #UMP2027 #UMK2027'),
    ('pesangon', 'psg-cek', 59, 42.2, 'CEK 4 HAL INI\nSEBELUM 2027', '4 Hal yang Wajib Dicek Pekerja Sebelum Aturan Pesangon Berlaku #pesangon #BPJS'),
]
for slug, sid, a, dur, hook, title in SCENES:
    lines = json.load(open(f'src/videos/{slug}/lines.json', encoding='utf-8'))
    start = lines[a]['start']
    out.append({'id': sid, 'slug': slug, 'from': round(start, 3), 'to': round(start + dur, 3), 'hook': hook, 'title': title})
    print(f'{sid:16} {dur:5.1f}s  adegan OpusCar')
for o in out:
    if o['slug'] == 'pesangon' and 'badge' not in o:
        o['badge'] = 'PESANGON'
    if o['slug'] == 'ump-2027' and 'badge' not in o:
        o['badge'] = 'UMP 2027'
json.dump(out, open('src/shorts/shorts.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
