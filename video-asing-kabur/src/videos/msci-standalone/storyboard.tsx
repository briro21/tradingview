import {Chapter} from '../../asing-kabur/scenes';
import {Checklist} from '../../pasar-hijau/scenes-a';
import * as S from '../../rupiah/scenes';
import {C} from '../../theme';
import * as X from '../custom';
import {Seg} from '../WhatIf';

const LEVELS = (L: (i: number, d?: number) => number, a: number[]) => [
  {t: 'DEVELOPED', ex: 'AS, Jepang, Eropa', at: a[0]},
  {t: 'EMERGING', ex: 'Indonesia, India, Brasil', at: a[1]},
  {t: 'FRONTIER', ex: 'pasar lebih kecil', at: a[2]},
  {t: 'STANDALONE', ex: 'berdiri sendiri', at: a[3]},
];

// What If Indonesia Benar-benar Jadi Standalone Market MSCI?
export const timeline = (L: (i: number, d?: number) => number): Seg[] => [
  {start: 0, el: <X.Letter openAt={L(1, 2)} lines={[{text: 'KLUB TRILIUNAN DOLAR', at: L(0, 1), size: 70, color: C.yellow}, {text: 'Hari terburuk dalam ~3 dekade', at: L(2, 2), size: 50, color: C.red}]} />},
  {
    start: L(3, -0.3),
    el: (
      <S.LineChart
        data={[5863, 5790, 5650, 5480, 5390, 5250, 5185]}
        labels={[[0, '15 Okt'], [6, '16 Okt']]}
        from={L(6)}
        to={L(6, 4)}
        min={5000}
        max={6000}
        lines={[{text: 'BUKAN PERUMPAMAAN.', at: L(3), size: 64}, {text: '15 Okt: MSCI buka konsultasi', at: L(4, 2), size: 48}, {text: 'EMERGING → STANDALONE', at: L(5), size: 56, color: C.red}, {text: 'IHSG -11,57% · asing jual Rp3,34 T', at: L(6, 1), size: 44, color: C.red}, {text: 'Baru usulan, belum final', at: L(7), size: 44, color: C.green}]}
        caption="Sumber: Kontan, Kompas, IDN Financials (Okt 2026). Garis antar titik ilustrasi."
      />
    ),
    sfx: 'whoosh',
  },
  {start: L(8, -0.3), el: <S.Dark lines={[{text: 'Bagaimana kalau', at: L(8), size: 70}, {text: 'BENAR-BENAR DISETUJUI?', at: L(8, 1), size: 100, color: C.yellow}]} />, sfx: 'riser'},
  {start: L(9, -0.3), el: <S.Roadmap items={[{text: 'HARI 1', at: L(9, 1)}, {text: 'MINGGU 1', at: L(9, 1.5)}, {text: 'BULAN 1', at: L(9, 2)}, {text: 'TAHUN 1', at: L(9, 2.5)}]} lines={[]} />, sfx: 'whoosh'},
  {start: L(10, -0.3), el: <S.Mystery lines={[{text: '1 SISI CERITA', at: L(10, 2), size: 90}, {text: 'yang hampir tidak dibahas', at: L(10, 3.5), size: 56, color: C.yellow}]} />, sfx: 'riser'},
  {start: L(11, -0.3), el: <Chapter at={L(11)} label="BAGIAN 1" sub="Apa itu MSCI & kenapa penting?" color={C.yellow} />, sfx: 'boom'},
  {start: L(12, -0.3), el: <X.ClassLadder levels={LEVELS(L, [L(13), L(14), L(15), L(16)])} markerAt={L(14, 2)} lines={[{text: 'KELAS PASAR SAHAM DUNIA', at: L(12), size: 60}]} />, sfx: 'whoosh'},
  {start: L(17, -0.3), el: <S.Cards title={{text: 'KENAPA PENTING?', at: L(17), size: 80}} cards={[{e: '💰', t: 'Triliunan dolar', sub: 'ikut indeks otomatis', at: L(17, 2)}, {e: '🤖', t: 'Dana pasif & ETF', sub: 'meniru isi indeks', at: L(18)}, {e: '✅', t: 'Masuk indeks', sub: 'otomatis dibeli', at: L(19), color: C.green}, {e: '❌', t: 'Dikeluarkan', sub: 'otomatis dijual', at: L(20)}]} />},
  {start: L(21, -0.3), el: <X.Robot strikeAt={L(24)} sellAt={L(24, 1.5)} lines={[{text: 'ROBOT BELANJA', at: L(21), size: 76}, {text: 'Tidak baca laporan keuangan', at: L(22), size: 46}, {text: 'Dicoret = DIJUAL', at: L(24, 1), size: 64, color: C.red}]} />, sfx: 'whoosh'},
  {start: L(25, -0.3), el: <S.Cards title={{text: 'KENAPA MSCI KHAWATIR?', at: L(25), size: 70}} cards={[{e: '🔍', t: 'Investability', sub: 'mudah masuk & keluar?', at: L(26)}, {e: '🏷️', t: 'Struktur kepemilikan', sub: 'transparan?', at: L(27)}, {e: '🤝', t: 'Perdagangan terkoordinasi', sub: 'harga wajar?', at: L(27, 3)}]} />, sfx: 'whoosh'},
  {start: L(29, -0.3), el: <S.Cards title={{text: 'PERNAH TERJADI', at: L(30), size: 80, color: C.yellow}} cards={[{e: '🇦🇷', t: 'Argentina', sub: '→ standalone market', at: L(31)}, {e: '🇵🇰', t: 'Pakistan', sub: 'emerging → frontier', at: L(32)}, {e: '📉', t: 'Dampaknya', sub: 'dana asing menyusut', at: L(33)}]} />},
  {start: L(34, -0.3), el: <Chapter at={L(34)} label="SKENARIO" sub="Kalau status benar-benar turun" color={C.yellow} />, sfx: 'riser'},
  {start: L(35, -0.3), el: <Chapter at={L(35)} label="HARI 1" sub="Keputusan final" />, sfx: 'boom'},
  {start: L(36, -0.3), el: <S.NewsRoom kicker="MSCI" title1="INDONESIA KELUAR DARI" title2="EMERGING MARKET" headlineAt={L(36)} shockAt={L(37, 3)} />},
  {start: L(38, -0.3), el: <X.Robot strikeAt={L(38, 1)} sellAt={L(39)} lines={[{text: 'Dana pasif menghitung', at: L(38), size: 60}, {text: 'TIDAK PUNYA PILIHAN', at: L(39), size: 70, color: C.red}]} />, sfx: 'whoosh'},
  {start: L(40, -0.3), el: <Chapter at={L(40)} label="MINGGU 1" sub="Penjualan paksa" />, sfx: 'boom'},
  {start: L(41, -0.3), el: <S.Cards flow="out" title={{text: 'PENJUALAN PAKSA', at: L(41), size: 80, color: C.red}} cards={[{e: '🏦', t: 'Bank besar', at: L(42, 1)}, {e: '📡', t: 'Telekomunikasi', at: L(42, 3)}, {e: '🛒', t: 'Konsumen', at: L(42, 5)}]} />, sfx: 'whoosh'},
  {
    start: L(43, -0.3),
    el: <S.LineChart data={[5185, 5000, 4850, 4700, 4560, 4440, 4330]} from={L(43, 1)} to={L(45, 2)} min={4000} max={5400} lines={[{text: 'Saham terbaik paling dijual', at: L(43), size: 54}, {text: 'ARB 7% → tekanan menyebar', at: L(44, 2), size: 48, color: C.red}, {text: 'Rupiah ikut tertekan', at: L(45), size: 48, color: C.red}]} caption="Ilustrasi skenario, bukan proyeksi." />,
  },
  {start: L(46, -0.3), el: <Chapter at={L(46)} label="BULAN 1" sub="Pasar jadi sepi" />, sfx: 'boom'},
  {start: L(47, -0.3), el: <S.QuietStreet closeAt={L(47, 2)} lines={[{text: 'Pasar lebih sepi', at: L(47, 1), size: 64}, {text: 'Analis asing berhenti meliput', at: L(48, 2), size: 52, color: C.red}]} />, sfx: 'whoosh'},
  {start: L(49, -0.3), el: <S.Cards title={{text: 'EFEK BERANTAI', at: L(49), size: 80}} cards={[{e: '🏢', t: 'Modal lebih mahal', at: L(49, 1)}, {e: '💼', t: 'Reksa dana turun', sub: 'investor rutin ikut kena', at: L(50)}, {e: '⏸️', t: 'IPO ditunda', at: L(51)}]} />},
  {start: L(52, -0.3), el: <Chapter at={L(52)} label="TAHUN 1" sub="Label baru, harga baru" />, sfx: 'boom'},
  {start: L(53, -0.3), el: <S.Bars bars={[{t: 'Tetangga', v: 0.8, at: L(53, 1), color: C.blue}, {t: 'Indonesia', v: 0.5, at: L(53, 2)}]} lines={[{text: 'VALUASI TERTINGGAL', at: L(53), size: 76, color: C.red}, {text: 'Laba sama, dihargai lebih murah (ilustrasi)', at: L(53, 4), size: 42}]} />, sfx: 'whoosh'},
  {start: L(54, -0.3), el: <S.Cards title={{text: 'PERUBAHAN ARAH', at: L(54), size: 76}} cards={[{e: '✈️', t: 'Listing di luar negeri', sub: 'supaya terlihat global', at: L(54, 1)}, {e: '🇮🇩', t: 'Bergantung investor lokal', at: L(55), color: C.green}]} />},
  {start: L(56, -0.3), el: <S.Dark lines={[{text: 'ITULAH SKENARIO BURUKNYA.', at: L(56), size: 90}]} />, sfx: 'boom'},
  {start: L(57, -0.3), el: <S.Mystery openAt={L(58)} lines={[{text: 'Ingat sisi cerita tadi?', at: L(57), size: 70}]} reveal={{text: 'DAFTAR PEKERJAAN RUMAH', at: L(59), size: 90, color: C.green}} />, sfx: 'ding'},
  {
    start: L(60, -0.3),
    el: (
      <Checklist
        title="PR UNTUK PASAR KITA"
        items={[
          {text: 'Transparansi', at: L(60, 1)},
          {text: 'Struktur kepemilikan jelas', at: L(60, 3)},
          {text: 'Perdagangan adil', at: L(60, 5)},
          {text: 'Bisa naik kelas lagi', at: L(62)},
        ]}
      />
    ),
    sfx: 'whoosh',
  },
  {start: L(63, -0.3), el: <S.Bars bars={[{t: 'Asing jual', v: 0.6, at: L(64, 1), value: 'Rp2+ T'}, {t: 'IHSG 20 Okt', v: 0.5, at: L(64, 3), color: C.green, value: '+5,65%'}]} lines={[{text: 'KEKUATAN LOKAL', at: L(63), size: 80, color: C.green}]} stamp={{text: 'JUTAAN INVESTOR LOKAL', at: L(65), size: 66, color: C.green}} />, sfx: 'whoosh'},
  {start: L(66, -0.3), el: <S.Cards title={{text: 'KESEMPATAN?', at: L(66), size: 80, color: C.yellow}} cards={[{e: '🏷️', t: 'Dijual karena aturan', sub: 'bukan karena kinerja', at: L(66, 2), color: C.green}, {e: '⚠️', t: 'Murah ≠ bagus', sub: 'pilih fundamental kuat', at: L(67)}]} />},
  {start: L(68, -0.3), el: <Chapter at={L(68)} label="PELAJARAN" sub="Cara kerja pasar" color={C.green} />, sfx: 'boom'},
  {
    start: L(69, -0.3),
    el: (
      <S.Lessons
        items={[
          {e: '🔎', t: 'Kenali pemilik saham', sub: 'Banyak asing = lebih rentan', at: L(69)},
          {e: '🗓️', t: 'Usulan ≠ keputusan', sub: 'Pasar sering bereaksi berlebihan', at: L(70)},
          {e: '🏛️', t: 'Tata kelola', sub: 'Transparansi perusahaan', at: L(71)},
          {e: '🧘', t: 'Jangan ikut panik', sub: 'Jual paksa ≠ nilai perusahaan', at: L(72)},
        ]}
      />
    ),
  },
  {start: L(73, -0.3), el: <S.Dark lines={[{text: 'BUKAN SARAN INVESTASI.', at: L(73), size: 80}, {text: 'Panik', at: L(75, 2), size: 90, color: C.red}, {text: 'atau BERBENAH?', at: L(75, 3), size: 90, color: C.green}]} />, sfx: 'boom'},
  {start: L(76, -0.3), el: <S.TwoDoors a={{text: 'KIAMAT', at: L(76, 4)}} b={{text: 'TITIK BALIK', at: L(76, 5.5)}} lines={[{text: 'Indonesia jadi standalone market:', at: L(76), size: 56}]} comment={{text: 'Tulis pendapatmu di komentar', at: L(77)}} />, sfx: 'whoosh'},
  {start: L(78, -0.3), el: <S.Outro shareAt={L(78)} subAt={L(79)} byeAt={L(81)} />},
];
