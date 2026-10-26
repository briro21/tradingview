import {Chapter} from '../../asing-kabur/scenes';
import * as S from '../../rupiah/scenes';
import {C} from '../../theme';
import * as Y from '../custom2';
import * as T from '../story';
import {Seg} from '../WhatIf';

// What If Kamu Menabung Saham Rp100 Ribu Setiap Bulan Sejak Tahun 2000? (angka = ilustrasi kasar mengikuti IHSG)
export const timeline = (L: (i: number, d?: number) => number): Seg[] => [
  {start: 0, el: <T.Dialog set="house" left={[{who: 'kamu', pose: 'armUp', face: 'netral'}]} right={[{who: 'joko', face: 'netral'}]} talks={[]} lines={[{text: '📦 Gudang belakang rumah', at: L(0, 0.5), size: 56}, {text: '📁 Map cokelat · "TAHUN 2000"', at: L(2), size: 54, color: '#c98a3a'}]} />},
  {
    start: L(3, -0.3),
    el: (
      <T.Dialog
        set="house"
        left={[{who: 'kamu', face: 'kaget'}]}
        right={[{who: 'joko', face: 'senang'}]}
        talks={[
          {name: 'Kamu', who: 'kamu', text: 'Pak, ini apa? Kok ada nama saya?', at: L(3), side: 'left'},
          {name: 'Pak Joko', who: 'joko', text: 'Astaga. Ayah sampai lupa. Itu tabungan sahammu, Nak.', at: L(5), side: 'right'},
        ]}
      />
    ),
    sfx: 'whoosh',
  },
  {start: L(6, -0.3), el: <S.Dark lines={[{text: 'Ratusan bukti setoran', at: L(6), size: 60}, {text: 'Rp100.000 / BULAN', at: L(7), size: 110, color: C.green}, {text: 'SELAMA 26 TAHUN', at: L(7, 2.5), size: 90, color: C.yellow}]} />, sfx: 'boom'},
  {start: L(8, -0.3), el: <Chapter at={L(8)} label="WHAT IF" sub="Nabung saham Rp100 ribu/bulan sejak 2000?" color={C.green} />, sfx: 'boom'},
  {start: L(9, -0.3), el: <S.Cards title={{text: 'ATURANNYA', at: L(9), size: 80}} cards={[{e: '📅', t: 'Rp100 ribu', sub: 'setiap bulan', at: L(10), color: C.green}, {e: '🌦️', t: 'Naik atau turun', sub: 'tetap setor', at: L(11), color: C.yellow}, {e: '🔒', t: 'Tidak dijual', sub: 'apa pun yang terjadi', at: L(12), color: C.red}]} />, sfx: 'whoosh'},
  {
    start: L(13, -0.3),
    el: (
      <T.Dialog
        set="house"
        left={[{who: 'kamu', face: 'senang'}]}
        right={[{who: 'ana', face: 'senang'}, {who: 'joko', face: 'netral'}]}
        talks={[
          {name: 'Bu Ana', who: 'ana', text: 'Itu ide Ibu. Waktu itu kamu masih balita. Ibu cuma ingin kamu punya sesuatu saat dewasa.', at: L(13), side: 'right'},
          {name: 'Pak Joko', who: 'joko', text: 'Ayah titip ke teman Ayah yang kerja di perusahaan efek. Lalu Ayah lupa.', at: L(14), side: 'right'},
        ]}
      />
    ),
  },
  {start: L(15, -0.3), el: <T.TimeWarp from={2026} to={2000} at={L(15)} lines={[{text: 'Lembar pertama: Januari 2000', at: L(15), size: 56}]} />, sfx: 'riser'},
  {start: L(16, -0.3), el: <S.Dark lines={[{text: 'IHSG ± 500-an', at: L(16), size: 90, color: C.yellow}, {text: 'Baru keluar dari krisis 1998', at: L(16, 3), size: 52}, {text: '"Saham = bakar uang"', at: L(17, 2), size: 64, color: C.red}]} />, sfx: 'whoosh'},
  {start: L(18, -0.3), el: <T.Balance label="NILAI TABUNGAN SAHAM" sub="setor Rp100.000 tiap bulan" steps={[{at: L(18), v: 100000}, {at: L(18, 2), v: 1200000}, {at: L(19, 2), v: 2300000}]} lines={[{text: 'Membosankan. Hampir tak bergerak.', at: L(19), size: 52}]} />},
  {
    start: L(20, -0.3),
    el: (
      <T.Dialog
        set="house"
        left={[{who: 'joko', face: 'sedih'}]}
        right={[{who: 'ana', face: 'serius'}]}
        talks={[
          {name: 'Pak Joko', who: 'joko', text: 'Ayah sempat ingin berhenti. Seratus ribu waktu itu lumayan untuk beli beras.', at: L(20), side: 'left'},
          {name: 'Bu Ana', who: 'ana', text: 'Kita tidak menabung untuk tahun ini. Kita menabung untuk anak kita dua puluh tahun lagi.', at: L(21), side: 'right'},
        ]}
        lines={[{text: 'Tahun 2002', at: L(20), size: 50}]}
      />
    ),
  },
  {start: L(22, -0.3), el: <S.LineChart data={[676, 416, 392, 425, 691, 1000, 1162, 1805, 2745]} labels={[[0, '2000'], [4, '2003'], [8, '2007']]} from={L(22)} to={L(23, 3)} min={0} max={3000} color={C.green} lines={[{text: 'Ekonomi pulih · IHSG menanjak', at: L(22), size: 54, color: C.green}, {text: '2007: IHSG ± 2.700 (5× lipat)', at: L(23), size: 50}]} caption="IHSG akhir tahun, dibulatkan." />, sfx: 'whoosh'},
  {start: L(24, -0.3), el: <T.Balance label="NILAI TABUNGAN SAHAM · 2007" sub="▲ disetor ± Rp10 juta" steps={[{at: L(24), v: 10000000}, {at: L(24, 2), v: 39000000}]} lines={[{text: 'Ayah merasa paling pintar di kantor 😎', at: L(25), size: 48}]} />, sfx: 'ding'},
  {start: L(26, -0.3), el: <S.Dark lines={[{text: 'Halaman berikutnya...', at: L(26), size: 56}, {text: '2008', at: L(27), size: 200, color: C.red}, {text: 'KRISIS KEUANGAN GLOBAL', at: L(27, 1.5), size: 70, color: C.red}]} />, sfx: 'boom'},
  {start: L(28, -0.3), el: <S.NewsRoom kicker="2008" title1="BURSA DUNIA RONTOK" title2="IHSG ANJLOK > 50%" headlineAt={L(28)} shockAt={L(29)} />, sfx: 'thump'},
  {start: L(30, -0.3), el: <S.BigPrice e="📉" label="Nilai tabunganmu" from={39000000} to={17000000} at={L(30, 1)} delta="-56%" lines={[{text: 'Hampir Rp40 juta → ± Rp17 juta', at: L(30), size: 52, color: C.red}]} />},
  {
    start: L(31, -0.3),
    el: (
      <T.Dialog
        set="house"
        left={[{who: 'joko', pose: 'headInHands', face: 'sedih'}]}
        right={[{who: 'ana', pose: 'point', face: 'serius'}]}
        talks={[
          {name: 'Pak Joko', who: 'joko', text: 'Teman Ayah menelepon tiap minggu. Katanya, jual saja, Pak. Selamatkan yang tersisa.', at: L(31), side: 'left'},
          {name: 'Bu Ana', who: 'ana', text: 'Ayahmu sudah memegang telepon untuk menjual. Ibu yang merebutnya.', at: L(32), side: 'right'},
          {name: 'Bu Ana', who: 'ana', text: 'Perusahaannya tidak hilang, Pak. Yang hilang cuma keberanian orang-orang.', at: L(33), side: 'right'},
        ]}
      />
    ),
    sfx: 'thump',
  },
  {start: L(34, -0.3), el: <S.Bars bars={[{t: '2007', v: 36, at: L(35), value: '1×', color: '#9aa3b8'}, {t: '2008', v: 72, at: L(35, 1.5), value: '2×', color: C.green}]} lines={[{text: 'Tetap setor saat harga murah', at: L(34), size: 56}, {text: 'Rp100 ribu = 2× lebih banyak saham', at: L(35, 3), size: 48, color: C.green}]} />, sfx: 'whoosh'},
  {start: L(36, -0.3), el: <S.LineChart data={[2745, 2300, 1355, 1700, 2534, 3200, 3703, 4316]} labels={[[0, '2007'], [2, '2008'], [7, '2012']]} from={L(36)} to={L(37, 2)} min={0} max={4600} color={C.green} lines={[{text: 'Pulih dalam ± 2 tahun', at: L(36), size: 56, color: C.green}, {text: 'Yang panik menjual, tertinggal', at: L(37), size: 48}]} caption="Ilustrasi kasar arah IHSG." />},
  {start: L(38, -0.3), el: <S.Cards flow="out" title={{text: 'UJIAN DATANG LAGI', at: L(38), size: 74, color: C.red}} cards={[{e: '🇺🇸', t: '2013', sub: 'taper tantrum', at: L(39)}, {e: '📰', t: '2015', sub: '"tahun terburuk"', at: L(40)}, {e: '🗣️', t: '"Kali ini berbeda"', at: L(41)}]} />, sfx: 'whoosh'},
  {
    start: L(42, -0.3),
    el: (
      <Y.ChatHoax
        title="💬 Grup Arisan Kantor"
        msgs={[
          {text: 'Saham XYZ naik 200% seminggu!! 🚀🚀', at: L(43)},
          {text: 'Mobil baru dari cuan gorengan 😎', at: L(43, 2.5)},
          {text: 'Pak Joko masih nabung yang lambat itu? 😂', at: L(44)},
        ]}
        lines={[{text: 'Godaan saham "roket"', at: L(42), size: 56}]}
      />
    ),
  },
  {start: L(45, -0.3), el: <S.Split at={L(45, 1)} left="SAHAM ROKET" right="TABUNGANMU" lines={[{text: 'Jatuh secepat naiknya', at: L(45), size: 56, color: C.red}, {text: 'Pelan. Membosankan. Tapi tidak hilang.', at: L(46), size: 48, color: C.green}]} />, sfx: 'boom'},
  {start: L(47, -0.3), el: <S.NewsRoom kicker="2020" title1="PANDEMI" title2="IHSG KE 3.900-AN" headlineAt={L(47)} shockAt={L(48)} />, sfx: 'thump'},
  {start: L(49, -0.3), el: <S.BigPrice e="😷" label="Nilai tabunganmu" from={110000000} to={72000000} at={L(49, 1)} delta="-35%" lines={[{text: 'Kali ini Ayah tidak panik', at: L(50), size: 52, color: C.green}]} />},
  {start: L(51, -0.3), el: <T.PhoneCall talks={[{name: 'Pak Joko', who: 'joko', text: 'Setor seperti biasa. Seratus ribu. Jangan dijual.', at: L(51), side: 'right'}]} />, sfx: 'ding'},
  {start: L(52, -0.3), el: <S.LineChart data={[6300, 3937, 5000, 5979, 6581, 6850, 7272, 7079, 7300, 5800]} labels={[[0, '2019'], [1, '2020'], [8, '2025'], [9, '2026']]} from={L(52)} to={L(53, 3)} min={3000} max={8000} color={C.yellow} lines={[{text: 'Pulih lagi...', at: L(52), size: 56, color: C.green}, {text: '...lalu tahun ini terpukul lagi', at: L(53), size: 52, color: C.red}]} caption="Ilustrasi kasar arah IHSG." />},
  {start: L(54, -0.3), el: <S.Bars bars={[{t: 'Disetor', v: 32, at: L(55), value: 'Rp32 jt', color: '#9aa3b8'}, {t: 'Nilai hari ini', v: 100, at: L(56), value: '± Rp100 jt', color: C.green}]} lines={[{text: 'HALAMAN TERAKHIR', at: L(54), size: 64}]} stamp={{text: '3× LIPAT · belum termasuk dividen', at: L(56, 3), size: 44, color: C.green}} />, sfx: 'boom'},
  {start: L(57, -0.3), el: <T.Dialog set="room" left={[{who: 'kamu', face: 'kaget'}]} right={[{who: 'raka', pose: 'cheer', face: 'senang'}]} talks={[{name: 'Raka', who: 'raka', text: 'Seratus juta? Bro, itu cukup buat DP rumah!', at: L(58), side: 'right'}]} lines={[{text: 'Dari Rp100 ribu sebulan', at: L(57), size: 52}]} />, sfx: 'ding'},
  {start: L(59, -0.3), el: <S.TwoDoors a={{text: 'CAIRKAN', at: L(60)}} b={{text: 'BIARKAN', at: L(61)}} lines={[{text: 'DP rumah sekarang, atau 10 tahun lagi?', at: L(59), size: 52}, {text: 'Pasar sedang turun...', at: L(62), size: 48, color: C.red}]} />, sfx: 'riser'},
  {
    start: L(63, -0.3),
    el: (
      <T.Dialog
        set="house"
        left={[{who: 'kamu', face: 'serius'}, {who: 'raka', face: 'serius'}]}
        right={[{who: 'ana', face: 'senang'}]}
        talks={[
          {name: 'Raka', who: 'raka', text: 'Tapi kalau turun terus? Kamu sendiri bilang, kali ini berbeda.', at: L(63), side: 'left'},
          {name: 'Bu Ana', who: 'ana', text: 'Jangan putuskan karena takut. Putuskan karena kamu tahu untuk apa uang itu.', at: L(65), side: 'right'},
        ]}
      />
    ),
  },
  {start: L(66, -0.3), el: <S.Cards flow="in" title={{text: 'KEPUTUSANMU', at: L(66), size: 80, color: C.green}} cards={[{e: '🛟', t: 'Sebagian', sub: 'dana darurat', at: L(67)}, {e: '🌱', t: 'Sisanya', sub: 'dibiarkan tumbuh', at: L(68)}, {e: '➕', t: 'Setor sendiri', sub: 'Rp500 ribu/bulan', at: L(68, 3)}]} />, sfx: 'whoosh'},
  {start: L(69, -0.3), el: <S.Dark lines={[{text: 'Bukan menebak waktu yang tepat.', at: L(69), size: 60}, {text: 'TAPI WAKTU YANG PANJANG.', at: L(69, 3), size: 90, color: C.green}]} />, sfx: 'boom'},
  {start: L(70, -0.3), el: <S.Lessons items={[{e: '📅', t: 'Nominal tetap', sub: 'Murah beli banyak, mahal beli sedikit', at: L(71)}, {e: '📉', t: 'Penurunan pasti datang', sub: 'Yang penting reaksimu', at: L(72)}, {e: '🚀', t: 'Hindari "roket"', sub: 'Pilih bisnis jelas / reksa dana indeks', at: L(73)}, {e: '⚠️', t: 'Tak ada jaminan', sub: 'Pakai uang jangka panjang', at: L(74)}]} />},
  {start: L(75, -0.3), el: <T.Envelope openAt={L(75, 2)} noteAt={L(76, 1)} addrAt={1e9} note="Untuk adikmu juga ada satu." lines={[{text: 'Sesuatu terjatuh dari map...', at: L(75), size: 52}]} />, sfx: 'riser'},
  {start: L(77, -0.3), el: <S.Dark lines={[{text: '"Untuk adikmu juga ada satu.', at: L(77), size: 64, color: '#ffd59e'}, {text: 'Simpan baik-baik."', at: L(77, 2), size: 64, color: '#ffd59e'}, {text: 'ADIK?', at: L(78, 1), size: 160, color: C.yellow}]} />, sfx: 'boom'},
  {start: L(79, -0.3), el: <S.TwoDoors a={{text: 'CAIRKAN', at: L(79, 3)}} b={{text: 'BIARKAN', at: L(79, 4)}} lines={[{text: 'Dapat Rp100 juta, apa pilihanmu?', at: L(79), size: 52}]} comment={{text: 'Tulis jawabanmu di komentar', at: L(80)}} />, sfx: 'whoosh'},
  {start: L(81, -0.3), el: <S.Dark lines={[{text: 'Bukan ajakan membeli saham tertentu.', at: L(81), size: 52}, {text: 'Angka = ilustrasi kasar dari perjalanan IHSG.', at: L(81, 2), size: 46}]} />},
  {start: L(82, -0.3), el: <S.Outro shareAt={L(82)} subAt={L(82, 2)} byeAt={L(83)} />},
];
