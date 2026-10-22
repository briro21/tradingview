import {Chapter} from '../../asing-kabur/scenes';
import * as S from '../../rupiah/scenes';
import {C} from '../../theme';
import * as X from '../custom';
import {Seg} from '../WhatIf';

// What If Harga Emas Tembus Rp3 Juta per Gram?
export const timeline = (L: (i: number, d?: number) => number): Seg[] => [
  {start: 0, el: <X.GoldBoard price={2554000} to={3000000} at={L(0, 3)} lines={[{text: 'Rp3 JUTA / GRAM', at: L(0, 4), size: 90, color: C.yellow}]} />},
  {start: L(1, -0.3), el: <X.People items={[{t: 'Pemilik emas', face: 'senang', jacket: C.green, at: L(1)}, {t: 'Calon pengantin', face: 'kaget', jacket: C.red, at: L(2)}]} lines={[{text: 'Satu angka. Dua reaksi.', at: L(3), size: 70, color: C.yellow}]} />, sfx: 'whoosh'},
  {start: L(4, -0.3), el: <X.GoldBoard price={2554000} lines={[{text: 'Tidak sejauh yang kamu kira', at: L(4), size: 60}, {text: '21 Okt 2026: Rp2.554.000', at: L(5, 2), size: 60, color: C.yellow}, {text: 'Tinggal naik ±17%', at: L(6), size: 70, color: C.red}]} caption="Sumber: ANTARA, Logam Mulia (21 Okt 2026)." />, sfx: 'whoosh'},
  {start: L(7, -0.3), el: <S.Roadmap items={[{text: 'HARI 1', at: L(7, 1)}, {text: 'MINGGU 1', at: L(7, 1.5)}, {text: 'BULAN 1', at: L(7, 2)}, {text: 'TAHUN 1', at: L(7, 2.5)}]} lines={[{text: 'Siapa untung? Siapa terpukul? Kenapa?', at: L(8), size: 54}]} />, sfx: 'whoosh'},
  {start: L(9, -0.3), el: <S.Mystery lines={[{text: '1 JEBAKAN', at: L(9, 2), size: 100}, {text: 'harga naik, tapi tetap rugi', at: L(9, 3.5), size: 56, color: C.yellow}]} />, sfx: 'riser'},
  {start: L(10, -0.3), el: <Chapter at={L(10)} label="BAGIAN 1" sub="Kenapa harga emas bisa naik?" color={C.yellow} />, sfx: 'boom'},
  {
    start: L(12, -0.3),
    el: <X.Engines aAt={L(13)} bAt={L(17)} lines={[{text: 'DUA MESIN', at: L(12), size: 80}, {text: 'Dunia tidak tenang → cari aman', at: L(14, 2), size: 44, color: C.red}, {text: 'Bank sentral borong emas', at: L(15), size: 44}, {text: 'Rupiah melemah → emas naik', at: L(18), size: 44, color: C.green}]} />,
    sfx: 'whoosh',
  },
  {start: L(19, -0.3), el: <S.BigPrice e="🪙" label="Harga dunia tetap · kurs 18.000 → 20.000" from={2554000} to={2828000} at={L(20, 3)} delta="+Rp274 RIBU" lines={[{text: 'COBA KITA HITUNG', at: L(19), size: 70}, {text: 'Hanya karena kurs.', at: L(21), size: 60, color: C.red}]} />, sfx: 'whoosh'},
  {start: L(22, -0.3), el: <S.Dark lines={[{text: 'Dua mesin menyala bersamaan', at: L(22), size: 60}, {text: '= Rp3 JUTA', at: L(22, 3), size: 150, color: C.yellow}]} />, sfx: 'boom'},
  {start: L(23, -0.3), el: <S.Dark lines={[{text: 'Pernah terjadi?', at: L(23), size: 70}, {text: 'BERKALI-KALI.', at: L(24), size: 130, color: C.yellow}]} />},
  {
    start: L(25, -0.3),
    el: (
      <S.LineChart
        data={[550, 600, 560, 580, 620, 650, 700, 760, 1000, 950, 980, 1100, 1300, 1600, 2000, 2554]}
        labels={[[0, '2012'], [8, '2020'], [15, '2026']]}
        from={L(25, 0.5)}
        to={L(26, 6)}
        min={300}
        max={3000}
        color={C.yellow}
        marker="Rp"
        lines={[{text: 'EMAS ANTAM (ribu Rp/gr)', at: L(25), size: 56}, {text: 'Rekor tiap krisis', at: L(26, 2), size: 50, color: C.green}, {text: 'Tapi bisa turun & diam bertahun-tahun', at: L(27), size: 44, color: C.red}, {text: 'Minggu ini: turun 2 hari', at: L(28), size: 44}]}
        caption="Ilustrasi tren; titik akhir Rp2.554.000 (21 Okt 2026)."
      />
    ),
    sfx: 'whoosh',
  },
  {start: L(30, -0.3), el: <Chapter at={L(30)} label="SKENARIO" sub="Hari demi hari" color={C.yellow} />, sfx: 'riser'},
  {start: L(31, -0.3), el: <Chapter at={L(31)} label="HARI 1" sub="Rp3 juta di semua berita" />, sfx: 'boom'},
  {start: L(32, -0.3), el: <S.NewsRoom kicker="BREAKING NEWS" title1="EMAS ANTAM TEMBUS" title2="Rp3 JUTA/gr" headlineAt={L(32)} shockAt={L(34)} />},
  {start: L(35, -0.3), el: <S.Queue sign="BUTIK EMAS" board="1 GRAM" value="3.000.000" color="#c9962a" growAt={L(35)} lines={[{text: 'ANTREAN MENGULAR', at: L(35, 0.5), size: 76}, {text: 'Harga di atas resmi', at: L(36, 1), size: 52, color: C.red}, {text: 'FOMO: ikut-ikutan', at: L(37, 2), size: 52, color: C.red}]} />, sfx: 'whoosh'},
  {start: L(39, -0.3), el: <Chapter at={L(39)} label="MINGGU 1" sub="Batangan ramai, perhiasan sepi" />, sfx: 'boom'},
  {start: L(40, -0.3), el: <S.Cards title={{text: 'DUA HAL BERTOLAK BELAKANG', at: L(40), size: 66}} cards={[{e: '🪙', t: 'Emas batangan', sub: 'RAMAI', at: L(41), color: C.green}, {e: '💍', t: 'Perhiasan', sub: 'SEPI', at: L(41, 2.5)}]} />},
  {start: L(42, -0.3), el: <S.BigPrice e="💍" label="5 gram emas" from={12770000} to={15000000} at={L(43)} delta="+Rp2,2 JUTA" lines={[{text: 'Calon pengantin hitung ulang', at: L(42), size: 56}, {text: 'Turunkan berat / kadar', at: L(44), size: 50}]} />, sfx: 'whoosh'},
  {start: L(45, -0.3), el: <X.People items={[{t: 'Pengrajin', face: 'sedih', jacket: '#b98455', at: L(45)}, {t: 'Pembeli', face: 'kaget', jacket: C.blue, at: L(45, 2)}]} lines={[{text: 'Bahan baku mahal, pembeli sedikit', at: L(45, 1), size: 54, color: C.red}]} />},
  {start: L(46, -0.3), el: <Chapter at={L(46)} label="BULAN 1" sub="Gelombang kedua" />, sfx: 'boom'},
  {start: L(47, -0.3), el: <X.People items={[{t: 'Ibu-ibu', face: 'senang', jacket: '#ff7aa8', at: L(48)}, {t: 'Modal usaha', face: 'serius', jacket: C.blue, at: L(48, 2)}, {t: 'Biaya sekolah', face: 'senang', jacket: C.green, at: L(48, 4)}]} lines={[{text: 'PEMILIK LAMA MENJUAL', at: L(47), size: 76, color: C.green}]} />, sfx: 'whoosh'},
  {start: L(50, -0.3), el: <S.Cards flow="in" title={{text: 'YANG IKUT RAMAI', at: L(50), size: 76}} cards={[{e: '⛏️', t: 'Saham tambang emas', sub: 'laba bisa melonjak', at: L(50, 1)}, {e: '🏦', t: 'Pegadaian', sub: 'taksiran naik', at: L(51)}]} />},
  {start: L(52, -0.3), el: <S.Cards title={{text: 'TREN BARU', at: L(52), size: 76}} cards={[{e: '📱', t: 'Tabungan emas digital', sub: 'mulai nominal kecil', at: L(52, 1), color: C.green}, {e: '⚠️', t: 'Waspada penipuan', sub: 'emas murah, untung pasti', at: L(53, 2)}]} />, sfx: 'whoosh'},
  {start: L(55, -0.3), el: <Chapter at={L(55)} label="TAHUN 1" sub="Bagian yang menentukan" />, sfx: 'boom'},
  {start: L(56, -0.3), el: <S.Split at={L(57)} left="BELI DI PUNCAK" right="BELI LEBIH AWAL" lines={[{text: 'Bertahan di atas Rp3 juta?', at: L(57), size: 56}, {text: 'Atau terkoreksi?', at: L(58), size: 56, color: C.yellow}, {text: 'Pembeli di puncak terjebak', at: L(59), size: 50}]} />, sfx: 'whoosh'},
  {start: L(60, -0.3), el: <S.Dark lines={[{text: 'ITULAH SKENARIONYA.', at: L(60), size: 90}]} />, sfx: 'boom'},
  {start: L(61, -0.3), el: <S.Mystery openAt={L(62)} lines={[{text: 'Ingat jebakannya?', at: L(61), size: 70}]} reveal={{text: 'SPREAD', at: L(63), size: 130, color: C.red}} />, sfx: 'ding'},
  {start: L(64, -0.3), el: <X.GoldBoard price={2554000} buyback={2369000} spreadAt={L(66)} lines={[{text: 'BELI vs JUAL KEMBALI', at: L(64), size: 64, color: C.yellow}, {text: 'Langsung minus ±7%', at: L(67), size: 64, color: C.red}]} caption="Harga Logam Mulia 21 Okt 2026 (ANTARA)." />, sfx: 'whoosh'},
  {start: L(68, -0.3), el: <S.Dark lines={[{text: 'Naik 7% dulu, baru balik modal', at: L(68), size: 64}, {text: '+ pajak + ongkos perhiasan', at: L(69), size: 64, color: C.yellow}, {text: 'HARGA NAIK, TETAP RUGI.', at: L(70, 2), size: 84, color: C.red}]} />, sfx: 'boom'},
  {start: L(71, -0.3), el: <Chapter at={L(71)} label="PELAJARAN" sub="Cara berpikir, bukan saran investasi" color={C.green} />, sfx: 'boom'},
  {
    start: L(72, -0.3),
    el: (
      <S.Lessons
        items={[
          {e: '🛡️', t: 'Penjaga nilai', sub: 'Bukan mesin cepat kaya', at: L(72)},
          {e: '🔍', t: 'Cek buyback', sub: 'Untung dihitung dari harga jual', at: L(73)},
          {e: '🪜', t: 'Beli bertahap', sub: 'Jangan karena FOMO', at: L(74)},
          {e: '🧺', t: 'Diversifikasi', sub: 'Emas hanya sebagian', at: L(75)},
          {e: '✅', t: 'Resmi & aman', sub: 'Simpan sertifikat', at: L(76)},
        ]}
      />
    ),
  },
  {start: L(77, -0.3), el: <S.Dark lines={[{text: 'BUKAN SARAN INVESTASI.', at: L(77), size: 80}, {text: 'Untuk apa & berapa lama', at: L(79), size: 70, color: C.yellow}, {text: 'kamu memegang emas?', at: L(79, 1), size: 70, color: C.yellow}]} />, sfx: 'boom'},
  {start: L(80, -0.3), el: <S.TwoDoors a={{text: 'MENJUAL', at: L(80, 4)}} b={{text: 'MEMBELI', at: L(80, 5)}} lines={[{text: 'Emas Rp3 juta/gram:', at: L(80), size: 64}]} comment={{text: 'Tulis jawabanmu di komentar', at: L(81)}} />, sfx: 'whoosh'},
  {start: L(82, -0.3), el: <S.Outro shareAt={L(82)} subAt={L(83)} byeAt={L(85)} />},
];
