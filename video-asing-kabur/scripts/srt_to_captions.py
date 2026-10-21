"""Ubah SRT per-kata menjadi potongan subtitle per kalimat (teks sudah dikoreksi).

Pakai: python3 scripts/srt_to_captions.py input/vo_pasar_hijau.srt src/pasar-hijau/captions.json
"""
import json
import re
import sys

# Koreksi typo hasil transkripsi, urut per kalimat SRT.
FIXED = [
    "Buka aplikasi portofolio hari ini, dan layar Anda kemungkinan besar dipenuhi lautan warna merah.",
    "IHSG belakangan ini sedang menukik tajam, menghapus keuntungan yang susah payah Anda bangun berbulan-bulan hanya dalam hitungan hari.",
    "Jika Anda merasa panik, frustrasi, atau jari Anda gatal ingin memencet tombol sell all sambil menutup aplikasi dan menghapusnya dari HP, percayalah, Anda tidak sendiri.",
    "Itu adalah respons biologis yang sangat wajar saat manusia melihat asetnya menyusut, tapi sebelum Anda mengambil keputusan emosional yang berpotensi menjadi penyesalan terbesar tahun ini, mari kita mundurkan langkah sejenak.",
    "Tarik napas.",
    "Di channel ini, kita tidak akan menjual harapan kosong atau menebak-nebak tanpa dasar.",
    "Kita akan menyingkirkan emosi, membedah data secara objektif, membaca aliran uang yang tersembunyi, dan menyusun strategi logis untuk bertahan hidup di tengah badai bursa.",
    "Karena di pasar modal, uang selalu berpindah dari mereka yang tidak sabar, ke kantong mereka yang sabar dan berbasis data.",
    "Untuk mengerti mengapa IHSG bisa hancur secara tiba-tiba, kita harus melihat keluar dari layar charting dan indikator kita.",
    "Mari gunakan logika sederhana.",
    "Bayangkan pasar modal Indonesia ini sebagai sebuah kolam renang besar.",
    "Air yang mengisi kolam ini adalah likuiditas, alias uang segar.",
    "Faktanya, sebagian besar air di kolam bursa kita adalah milik investor asing.",
    "Di sisi lain dunia, ada kebijakan suku bunga global dan ketegangan geopolitik yang bertindak seperti magnet raksasa.",
    "Ketika negara-negara maju memutar kebijakan ekonominya, misalnya dengan menahan suku bunga dasar tetap tinggi, magnet raksasa ini menyala.",
    "Magnet ini menawarkan imbal hasil yang jauh lebih aman, tanpa risiko fluktuasi nilai tukar bagi para investor raksasa.",
    "Akibatnya sangat logis.",
    "Uang asing pulang kampung.",
    "Mereka melakukan aksi jual masif, mencabut dananya dari bursa kita secara sistematis.",
    "Air kolam menyusut drastis.",
    "Saat likuiditas kering, perusahaan-perusahaan blue chip berfundamental kokoh sekali pun harganya akan ikut rontok.",
    "Mengapa?",
    "Bukan karena perusahaannya tiba-tiba gagal bayar utang.",
    "Bukan karena bisnis mereka bangkrut.",
    "Melainkan murni karena tekanan suplai.",
    "Terlalu banyak institusi asing yang membuang barang secara bersamaan, sementara daya beli investor lokal tidak cukup kuat untuk menampungnya.",
    "Ini adalah hukum supply and demand dasar.",
    "Indeks boleh merah berhari-hari, tapi ingat satu prinsip dasar.",
    "Likuiditas tidak pernah benar-benar menguap.",
    "Ia hanya berpindah tangan.",
    "Di titik kritis inilah, kemampuan membaca order book flow atau aliran pesanan menjadi senjata pembeda antara trader pemula dan analis profesional.",
    "Saat pasar anjlok, investor institusi besar tidak pernah mengeksekusi pembelian atau penjualan secara acak.",
    "Mereka meninggalkan jejak digital.",
    "Ketika harga saham-saham perbankan atau energi sedang ditekan turun tajam, institusi raksasa ini jarang membeli secara agresif dengan memakan harga offer.",
    "Jika Anda perhatikan layar order book, Anda akan sering melihat tumpukan antrean jual atau offer yang sangat tebal.",
    "Seolah-olah menjadi tembok penghalang yang tidak bisa ditembus.",
    "Tembok ini sengaja dipasang untuk memicu kepanikan retail agar membuang barangnya di harga bawah.",
    "Namun, jika kita teliti membedah riwayat transaksinya secara aktual, kita bisa mendeteksi adanya akumulasi senyap.",
    "Di kolom bid, terjadi penyerapan lot-lot saham secara diam-diam oleh sekuritas tertentu di area support.",
    "Ini adalah fase transisi.",
    "Fase perpindahan barang dari tangan investor retail yang panik, ke tangan institusi yang sedang mencicil harga bawah.",
    "Kalau Anda bisa membaca trade flow ini, Anda tidak akan mudah tertipu oleh ilusi tembok offer yang tebal.",
    "",
    "Menghindari bull trap dengan disiplin indikator.",
    "Kesalahan paling fatal dan paling mahal harganya saat IHSG hancur adalah berusaha menangkap pisau yang sedang jatuh.",
    "Melihat sebuah saham turun lima hari berturut-turut, lalu hari ini terlihat hijau satu persen.",
    "Banyak trader retail langsung berteriak reversal dan memborong dengan seluruh modalnya.",
    "Padahal secara statistik, pantulan kecil di tengah tren turun tajam sering kali hanyalah dead cat bounce atau bull trap.",
    "Jebakan teknikal yang diciptakan agar likuiditas retail masuk sebelum harga dibanting lebih dalam lagi.",
    "Di sinilah, kedisiplinan menggunakan indikator teknikal menjadi nyawa pelindung Anda.",
    "Jangan menebak-nebak harga dasar menggunakan perasaan, gunakan alat ukur yang objektif.",
    "Pertama, cari divergensi positif pada indikator osilator seperti MACD atau RSI.",
    "Tunggu momen di mana harga saham membuat titik terendah baru yang lebih dalam.",
    "Tetapi, indikator MACD justru mulai membentuk lembah yang menanjak naik.",
    "Ini adalah indikasi matematis bahwa tekanan jual sudah mulai kehabisan momentum.",
    "Kedua, untuk melihat gambaran tren jangka menengah, andalkan indikator Ichimoku Kinko Hyo.",
    "Selama candlestick harga masih terjebak dan bergerak di bawah awan tebal Kumo, itu artinya resistensi tren turun masih sangat dominan.",
    "Sangat berisiko masuk dengan dana besar sebelum harga benar-benar berhasil menjebol ke atas awan.",
    "Dan jika Anda melakukan eksekusi intraday, pastikan harga saham mampu bertahan di atas garis VWAP atau volume weighted average price.",
    "Jika harga selalu gagal menembus VWAP harian, itu artinya tekanan distribusi masih mengendalikan pasar.",
    "Menyaring ratusan saham di bursa secara manual setiap malam saat pasar berdarah adalah pekerjaan yang tidak efisien.",
    "Di era modern, kita harus mengandalkan otomatisasi data.",
    "Jika kita menarik riwayat data historis pada periode kejatuhan pasar sebelumnya, lalu kita bersihkan data tersebut menggunakan tools pengolah data seperti pustaka Pandas pada bahasa pemrograman Python, kita akan menemukan pola probabilitas yang berulang.",
    "Kita bisa mengekstrak data pasti tentang sektor mana yang paling cepat pulih dan emiten mana yang paling tangguh.",
    "Untuk aplikasi praktis harian, buatlah custom screener yang ketat, misalnya di platform Stockbit.",
    "Jangan gunakan parameter standar.",
    "Atur parameter untuk mencari saham-saham yang harganya sedang menguji area pantulan penting di rasio Fibonacci retracement, khususnya di area golden ratio 61,8%, namun emitennya masih membukukan pertumbuhan laba bersih yang positif secara kuartalan.",
    "Selain itu, pantau anomali sentimen seperti aksi korporasi.",
    "Saham-saham yang memiliki jadwal tender offer di harga premium atau rights issue strategis, sering kali pergerakannya kebal terhadap kejatuhan indeks.",
    "Aksi korporasi ini menciptakan batas bawah psikologis atau harga lantai buatan yang dijaga ketat oleh pemegang saham pengendali, memberikan Anda tempat berlindung yang jauh lebih aman.",
    "Lalu apa yang harus menjadi rencana kerja kita besok pagi ketika bel bursa berbunyi?",
    "Ada tiga aturan survival yang harus Anda pegang.",
    "Pertama, tahan diri dan lindungi modal.",
    "Jika tren makro masih memburuk dan indikator teknikal Anda belum memberikan konfirmasi breakout yang valid, maka duduk diam adalah posisi trading yang sangat elegan dan menguntungkan.",
    "Mengamankan modal adalah kemenangan di saat orang lain kehilangan uangnya.",
    "Kedua, mulai susun watchlist super ketat.",
    "Perusahaan berkinerja solid saat ini sedang didiskon besar-besaran secara tidak rasional, petakan area support historis mereka.",
    "Ketiga, jaga cash ratio Anda.",
    "Uang tunai adalah raja di saat krisis.",
    "Saat badai reda, air kolam kembali tenang dan ikan paus kembali berenang masuk ke pasar, Anda harus memastikan bahwa Anda memiliki amunisi cash yang cukup untuk memborong barang bagus di harga bawah.",
    "Kepanikan adalah musuh terbesar keuntungan.",
    "Tetap dingin, tetap rasional, dan biarkan data yang mengambil keputusan untuk Anda.",
    "Terima kasih sudah menyimak analisis hari ini.",
    "Jika Anda menemukan nilai dari pendekatan berbasis data ini, silakan tekan tombol subscribe agar tidak ketinggalan bedah teknikal dan aliran order book di video selanjutnya.",
    "Sampai jumpa di analisis berikutnya.",
]

MAX_WORDS = 7


def ts(s):
    h, m, r = s.split(':')
    sec, ms = r.split(',')
    return int(h) * 3600 + int(m) * 60 + int(sec) + int(ms) / 1000


def main(src, dst):
    words = []
    for block in open(src, encoding='utf-8').read().strip().split('\n\n'):
        lines = block.split('\n')
        a, b = lines[1].split(' --> ')
        words.append((ts(a), ts(b), ' '.join(lines[2:])))

    sentences, cur = [], []
    for w in words:
        cur.append(w)
        if re.search(r'[.?!]$', w[2]):
            sentences.append(cur)
            cur = []
    if cur:
        sentences.append(cur)
    assert len(sentences) == len(FIXED), (len(sentences), len(FIXED))

    out = []
    for orig, text in zip(sentences, FIXED):
        fixed = text.split()
        if not fixed:
            continue
        n = -(-len(fixed) // MAX_WORDS)
        size = -(-len(fixed) // n)
        for k in range(n):
            part = fixed[k * size:(k + 1) * size]
            # Petakan potongan teks terkoreksi ke kata asli secara proporsional.
            i0 = round(k * size / len(fixed) * len(orig))
            i1 = max(i0, round(min((k + 1) * size, len(fixed)) / len(fixed) * len(orig)) - 1)
            out.append({'start': orig[i0][0], 'end': orig[i1][1], 'text': ' '.join(part)})
    json.dump(out, open(dst, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    print(len(out), 'captions')


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
