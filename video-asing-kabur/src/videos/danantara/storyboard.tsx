import {Chapter} from '../../asing-kabur/scenes';
import * as S from '../../rupiah/scenes';
import {C} from '../../theme';
import * as X from '../custom';
import * as Y from '../custom2';
import {Seg} from '../WhatIf';

// What If Danantara Borong Saham Saat IHSG Jatuh?
export const timeline = (L: (i: number, d?: number) => number): Seg[] => [
  {
    start: 0,
    el: <S.LineChart data={[5863, 5700, 5480, 5300, 5185, 5050, 4950]} from={L(0, 0.5)} to={L(0, 5)} min={4600} max={6000} lines={[{text: 'IHSG JATUH BEBAS', at: L(0, 1), size: 80, color: C.red}, {text: 'Asing jual triliunan setiap hari', at: L(0, 3), size: 48}]} caption="Ilustrasi." />,
  },
  {start: L(1, -0.3), el: <Y.Pillar riseAt={L(2)} label="???" lines={[{text: '1 PEMBELI RAKSASA', at: L(1, 2), size: 80, color: C.green}, {text: 'Membeli saat semua menjual', at: L(2), size: 54}]} />, sfx: 'riser'},
  {start: L(3, -0.3), el: <S.Dark lines={[{text: 'Bukan asing. Bukan konglomerat.', at: L(3), size: 60}, {text: 'PEMBELINYA: NEGARA.', at: L(3, 3), size: 110, color: C.yellow}]} />, sfx: 'boom'},
  {start: L(4, -0.3), el: <S.Cards title={{text: 'BUKAN FIKSI', at: L(4), size: 80}} cards={[{e: '💼', t: '±USD3 miliar', sub: 'sudah dialokasikan (saham & obligasi)', at: L(5, 3)}, {e: '➕', t: '+USD1 miliar', sub: 's/d akhir 2026', at: L(5, 7)}, {e: '🛟', t: 'Standby buyer', sub: '16 Okt, saat IHSG -11%', at: L(6)}]} />, sfx: 'whoosh'},
  {start: L(7, -0.3), el: <S.Dark lines={[{text: 'Masih perlu payung aturan yang jelas', at: L(7), size: 56}, {text: 'Kalau benar-benar MEMBORONG?', at: L(8), size: 84, color: C.yellow}, {text: 'Penyelamat atau masalah baru?', at: L(9), size: 60}]} />, sfx: 'riser'},
  {start: L(10, -0.3), el: <S.Roadmap items={[{text: 'HARI 1', at: L(10, 1)}, {text: 'MINGGU 1', at: L(10, 1.5)}, {text: 'BULAN 1', at: L(10, 2)}, {text: 'TAHUN 1', at: L(10, 2.5)}]} lines={[]} />, sfx: 'whoosh'},
  {start: L(11, -0.3), el: <S.Mystery lines={[{text: '1 PERTANYAAN PENTING', at: L(11, 2), size: 80}, {text: 'UANG SIAPA YANG DIPAKAI?', at: L(11, 4), size: 64, color: C.yellow}]} />, sfx: 'riser'},
  {start: L(12, -0.3), el: <Chapter at={L(12)} label="BAGIAN 1" sub="Apa itu Danantara?" color={C.yellow} />, sfx: 'boom'},
  {start: L(13, -0.3), el: <S.Cards title={{text: 'SOVEREIGN WEALTH FUND', at: L(13), size: 72}} cards={[{e: '🏛️', t: 'Danantara', sub: 'kelola aset & saham BUMN', at: L(13, 1)}, {e: '🇸🇬', t: 'Temasek', sub: 'Singapura', at: L(14, 3)}, {e: '🇳🇴', t: 'Dana Norwegia', sub: 'kekayaan negara', at: L(14, 5)}, {e: '⏳', t: 'Bisa menunggu', sub: 'tak harus jual saat panik', at: L(15)}]} />},
  {start: L(16, -0.3), el: <S.Scale tiltAt={L(17)} lines={[{text: 'Kenapa butuh pembeli besar?', at: L(16), size: 64}, {text: 'Penjual >> pembeli = harga jatuh', at: L(17, 1), size: 50, color: C.red}]} />, sfx: 'whoosh'},
  {start: L(18, -0.3), el: <S.Bars bars={[{t: 'Net sell asing 2026', v: 1, at: L(18, 1), value: '±Rp88 T'}]} lines={[{text: 'ASING KELUAR', at: L(18), size: 80, color: C.red}]} stamp={{text: 'BUTUH PENAHAN', at: L(19), size: 80, color: C.green}} />},
  {start: L(20, -0.3), el: <S.Dark lines={[{text: 'Negara lain pernah?', at: L(20), size: 70}, {text: 'PERNAH. HASILNYA BERAGAM.', at: L(21), size: 90, color: C.yellow}]} />, sfx: 'boom'},
  {start: L(22, -0.3), el: <S.Cards title={{text: 'INTERVENSI DI NEGARA LAIN', at: L(22), size: 70}} cards={[{e: '🇭🇰', t: 'Hong Kong 1998', sub: 'pasar tertahan, lalu untung', at: L(22, 1), color: C.green}, {e: '🇨🇳', t: 'Tiongkok 2015', sub: '"tim nasional", tetap lesu', at: L(23)}, {e: '🇯🇵', t: 'Jepang', sub: 'bank sentral borong ETF', at: L(24), color: C.yellow}]} />, sfx: 'whoosh'},
  {start: L(25, -0.3), el: <S.Dark lines={[{text: 'Cara. Harga. Waktu.', at: L(25, 1.5), size: 100, color: C.yellow}]} />},
  {start: L(26, -0.3), el: <Chapter at={L(26)} label="SKENARIO" sub="Danantara turun ke lantai bursa" color={C.yellow} />, sfx: 'riser'},
  {start: L(27, -0.3), el: <Chapter at={L(27)} label="HARI 1" sub="Efek pengumuman" />, sfx: 'boom'},
  {start: L(28, -0.3), el: <S.NewsRoom kicker="DANANTARA" title1="MULAI MEMBELI" title2="SAHAM MURAH" headlineAt={L(28)} shockAt={L(29)} />},
  {start: L(30, -0.3), el: <S.LineChart data={[4950, 4990, 5080, 5150, 5210, 5280]} color={C.green} from={L(30, 0.5)} to={L(31, 3)} min={4800} max={5400} lines={[{text: '"Kalau negara berani beli..."', at: L(30, 2), size: 54}, {text: 'Bank BUMN, telko, energi memimpin', at: L(31), size: 46, color: C.green}]} caption="Ilustrasi skenario." />, sfx: 'whoosh'},
  {start: L(32, -0.3), el: <S.Dark lines={[{text: 'EFEK PENGUMUMAN', at: L(32), size: 100, color: C.green}, {text: 'Kepercayaan bergerak lebih cepat dari uang', at: L(32, 2), size: 50}]} />},
  {start: L(33, -0.3), el: <Chapter at={L(33)} label="MINGGU 1" sub="Seberapa besar sebenarnya?" />, sfx: 'boom'},
  {start: L(34, -0.3), el: <S.Bars bars={[{t: 'Dana tambahan', v: 0.2, at: L(34, 3), color: C.green, value: '±Rp18 T'}, {t: 'Net sell asing', v: 1, at: L(35, 2), value: '±Rp88 T'}]} lines={[{text: 'USD1 MILIAR ≈ Rp18 T', at: L(34, 1), size: 70}]} stamp={{text: 'HANYA ±1/5', at: L(36), size: 90, color: C.red}} />, sfx: 'whoosh'},
  {start: L(37, -0.3), el: <S.Dark lines={[{text: 'Bisa menahan harga', at: L(37), size: 64, color: C.green}, {text: 'Tak bisa menggantikan semua asing', at: L(37, 2), size: 60, color: C.red}, {text: 'Sampai kapan? Di harga berapa?', at: L(38), size: 56, color: C.yellow}]} />},
  {start: L(39, -0.3), el: <Y.Ownership at={L(40)} from={65} to={52} lines={[{text: 'Siapa yang menjual ke Danantara?', at: L(39), size: 60}, {text: 'Kepemilikan berpindah tangan', at: L(40), size: 56, color: C.yellow}]} />, sfx: 'whoosh'},
  {start: L(41, -0.3), el: <Chapter at={L(41)} label="BULAN 1" sub="Lantai tak terlihat" />, sfx: 'boom'},
  {start: L(42, -0.3), el: <S.LineChart data={[5280, 5150, 5050, 5000, 5000, 5000, 5000]} from={L(42, 0.5)} to={L(43, 3)} min={4600} max={5400} target={{v: 5000, label: '"Lantai negara"?', at: L(42, 2)}} lines={[{text: '"Kalau turun, pasti dibeli lagi"', at: L(43), size: 54}]} caption="Ilustrasi." />},
  {start: L(44, -0.3), el: <S.Dark lines={[{text: 'MORAL HAZARD', at: L(44), size: 120, color: C.red}, {text: 'Merasa diselamatkan → ambil risiko lebih besar', at: L(44, 3), size: 46}]} />, sfx: 'boom'},
  {start: L(45, -0.3), el: <S.Split at={L(45, 1)} left="TIDAK DIBELI" right="DISUKAI NEGARA" lines={[{text: 'Pasar terbelah', at: L(45), size: 64}, {text: 'Disukai negara vs tidak', at: L(46), size: 56, color: C.yellow}]} />, sfx: 'whoosh'},
  {start: L(47, -0.3), el: <S.Cards title={{text: 'TATA KELOLA', at: L(47), size: 80}} cards={[{e: '🏛️', t: 'Pengelola BUMN', at: L(47, 2)}, {e: '🛒', t: 'Pembeli saham BUMN', at: L(47, 4)}, {e: '⚖️', t: 'Harus independen', at: L(47, 6), color: C.green}]} />},
  {start: L(48, -0.3), el: <Chapter at={L(48)} label="TAHUN 1" sub="Dua kemungkinan" />, sfx: 'boom'},
  {start: L(49, -0.3), el: <S.TwoDoors a={{text: 'MENUNDA MASALAH', at: L(51)}} b={{text: 'BERHASIL', at: L(50)}} lines={[{text: 'Ada dua kemungkinan', at: L(49), size: 64}]} />, sfx: 'whoosh'},
  {start: L(52, -0.3), el: <S.Dark lines={[{text: 'Campur tangan negara = risiko baru?', at: L(52), size: 60, color: C.red}, {text: 'Moody\'s sudah menyorotinya', at: L(52, 4), size: 54}]} />},
  {start: L(53, -0.3), el: <S.Dark lines={[{text: 'ITULAH DUA SISI SKENARIONYA.', at: L(53), size: 84}]} />, sfx: 'boom'},
  {start: L(54, -0.3), el: <S.Mystery openAt={L(55)} lines={[{text: 'Ingat pertanyaannya?', at: L(54), size: 70}]} reveal={{text: 'UANG SIAPA?', at: L(55), size: 120, color: C.yellow}} />, sfx: 'ding'},
  {start: L(56, -0.3), el: <S.Cards flow="in" title={{text: 'KEKAYAAN NEGARA = MILIK PUBLIK', at: L(56), size: 64}} cards={[{e: '🏭', t: 'Aset & laba BUMN', at: L(56, 2)}, {e: '👥', t: 'Untuk seluruh rakyat', at: L(56, 5)}, {e: '📆', t: 'Jangka panjang', at: L(56, 8), color: C.green}]} />, sfx: 'whoosh'},
  {start: L(57, -0.3), el: <S.Split at={L(57)} left="RISIKO PUBLIK" right="INVESTASI BAIK" lines={[{text: 'Beli murah + sabar = untung', at: L(57), size: 56, color: C.green}, {text: 'Tahan harga tanpa valuasi = risiko publik', at: L(58), size: 50, color: C.red}]} />},
  {start: L(59, -0.3), el: <Checklistish L={L} />, sfx: 'whoosh'},
  {start: L(61, -0.3), el: <Chapter at={L(61)} label="PELAJARAN" sub="Cara kerja pasar" color={C.green} />, sfx: 'boom'},
  {
    start: L(62, -0.3),
    el: (
      <S.Lessons
        items={[
          {e: '📢', t: 'Pengumuman ≠ pembelian', sub: 'Pasar bereaksi sebelum uang masuk', at: L(62)},
          {e: '🛟', t: 'Jangan andalkan penyelamat', sub: 'Berharap ditahan negara itu berisiko', at: L(63)},
          {e: '📏', t: 'Perhatikan ukuran', sub: 'Dana penyelamat vs uang yang keluar', at: L(64)},
          {e: '📊', t: 'Kembali ke fundamental', sub: 'Saham bagus pulih karena kinerja', at: L(65)},
        ]}
      />
    ),
  },
  {start: L(66, -0.3), el: <S.Dark lines={[{text: 'BUKAN SARAN INVESTASI.', at: L(66), size: 80}, {text: 'INI CARA KERJA PASAR.', at: L(66, 2), size: 90, color: C.yellow}]} />, sfx: 'boom'},
  {start: L(67, -0.3), el: <S.TwoDoors a={{text: 'INTERVENSI BERISIKO', at: L(67, 6)}} b={{text: 'PENYELAMAT', at: L(67, 4.5)}} lines={[{text: 'Danantara borong saham:', at: L(67), size: 64}]} comment={{text: 'Tulis pendapatmu di komentar', at: L(68)}} />, sfx: 'whoosh'},
  {start: L(69, -0.3), el: <S.Outro shareAt={L(69)} subAt={L(70)} byeAt={L(72)} />},
];

// Syarat pembelian yang sehat: valuasi, uji tuntas, jangka panjang, transparan.
const Checklistish: React.FC<{L: (i: number, d?: number) => number}> = ({L}) => (
  <X.People items={[{t: 'Valuasi', face: 'serius', jacket: C.blue, at: L(59, 1)}, {t: 'Uji tuntas', face: 'serius', jacket: C.green, at: L(59, 3)}, {t: 'Transparan', face: 'senang', jacket: C.yellow, at: L(60)}]} lines={[{text: 'KUNCINYA', at: L(59), size: 80, color: C.yellow}]} />
);
