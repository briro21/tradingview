import {Chapter} from '../../asing-kabur/scenes';
import * as S from '../../rupiah/scenes';
import {C} from '../../theme';
import * as X from '../custom';
import {Seg} from '../WhatIf';

// What If ARB 7% Berlaku Selamanya? — L(i) = detik mulai kalimat ke-i naskah.
export const timeline = (L: (i: number, d?: number) => number): Seg[] => [
  {start: 0, el: <S.NewsRoom kicker="ORDER JUAL" title1="STATUS: ANTRE" title2="ARB -7%" headlineAt={L(1)} shockAt={L(2)} />},
  {start: L(3, -0.3), el: <S.Dark lines={[{text: 'Besok. Lusa.', at: L(3), size: 80}, {text: 'UANGMU TERKUNCI.', at: L(4), size: 110, color: C.red}]} />, sfx: 'boom'},
  {start: L(5, -0.3), el: <X.Asymmetric at={L(7)} oldAt={L(6, 4)} lines={[{text: 'INI BUKAN FIKSI.', at: L(5), size: 70}, {text: 'BEI: ARB 15% → 7% (19 Okt 2026)', at: L(6, 1), size: 46, color: C.red}, {text: 'Berlaku s/d 31 Des 2026', at: L(9), size: 46}]} />, sfx: 'whoosh'},
  {start: L(10, -0.3), el: <S.Dark lines={[{text: 'Bagaimana kalau tidak pernah dicabut?', at: L(10), size: 64}, {text: 'SELAMANYA?', at: L(11, 1), size: 160, color: C.yellow}]} />, sfx: 'riser'},
  {start: L(12, -0.3), el: <S.Roadmap items={[{text: 'HARI 1', at: L(12, 1)}, {text: 'MINGGU 1', at: L(12, 1.5)}, {text: 'BULAN 1', at: L(12, 2)}, {text: 'TAHUN 1', at: L(12, 2.5)}]} lines={[]} />, sfx: 'whoosh'},
  {start: L(13, -0.3), el: <S.Mystery lines={[{text: '1 EFEK SAMPING', at: L(13, 2), size: 90}, {text: 'yang jarang dibicarakan', at: L(13, 3), size: 56, color: C.yellow}]} />, sfx: 'riser'},
  {start: L(14, -0.3), el: <Chapter at={L(14)} label="BAGIAN 1" sub="Apa itu ARB?" color={C.yellow} />, sfx: 'boom'},
  {start: L(15, -0.3), el: <X.Asymmetric at={L(16)} oldAt={L(19)} lines={[{text: 'LANTAI & LANGIT-LANGIT', at: L(15), size: 70}, {text: 'Order di bawah lantai = DITOLAK', at: L(17), size: 46, color: C.red}, {text: 'Lantai jadi lebih dangkal', at: L(20), size: 46}]} />},
  {start: L(21, -0.3), el: <S.Dark lines={[{text: 'KENAPA?', at: L(21), size: 140, color: C.yellow}]} />, sfx: 'boom'},
  {
    start: L(22, -0.3),
    el: (
      <S.LineChart
        data={[5863, 5790, 5650, 5480, 5390, 5250, 5185]}
        labels={[[0, '15 Okt'], [6, '16 Okt']]}
        from={L(22, 0.5)}
        to={L(23, 4)}
        min={5000}
        max={6000}
        lines={[{text: '16 OKTOBER 2026', at: L(22), size: 70}, {text: 'IHSG -11,57% dalam sehari', at: L(23), size: 50, color: C.red}, {text: 'Pemicu: pengumuman MSCI', at: L(24), size: 44}, {text: 'Terdalam sejak 1998', at: L(25), size: 44, color: C.red}]}
        caption="Sumber: Bisnis.com, Kontan, BCA Sekuritas (Okt 2026). Garis antar titik ilustrasi."
      />
    ),
    sfx: 'whoosh',
  },
  {start: L(26, -0.3), el: <S.Cards title={{text: 'REM DARURAT', at: L(26), size: 80}} cards={[{e: '😱', t: 'Investor panik', sub: 'asing jual triliunan', at: L(26, 0.5)}, {e: '🛑', t: 'BEI pangkas ARB', sub: 'didukung OJK', at: L(27)}, {e: '🧱', t: 'Cegah longsor', sub: 'redam kepanikan', at: L(28, 1)}]} />, sfx: 'whoosh'},
  {start: L(29, -0.3), el: <S.Cards title={{text: 'BUKAN PERTAMA KALI', at: L(29), size: 80}} cards={[{e: '🦠', t: '2020: Pandemi', sub: 'ARB 7% asimetris', at: L(30)}, {e: '⏳', t: 'Dikembalikan', sub: 'bertahap, bertahun-tahun', at: L(31)}, {e: '❓', t: 'Berlaku lama?', sub: 'bukan mengada-ada', at: L(32)}]} />},
  {start: L(33, -0.3), el: <Chapter at={L(33)} label="SKENARIO" sub="Kalau rem darurat tak dilepas" color={C.yellow} />, sfx: 'riser'},
  {start: L(34, -0.3), el: <Chapter at={L(34)} label="HARI 1" sub="Penurunan tertahan" />, sfx: 'boom'},
  {
    start: L(35, -0.3),
    el: <S.LineChart data={[1000, 990, 975, 960, 948, 935, 930, 930, 930]} from={L(35, 0.5)} to={L(36, 3)} min={900} max={1010} target={{v: 930, label: 'ARB -7%', at: L(36)}} lines={[{text: 'Tertahan di -7%', at: L(36), size: 64, color: C.red}, {text: 'Grafik terlihat tenang...', at: L(37), size: 50}]} />,
  },
  {start: L(38, -0.3), el: <X.ArbStairs steps={[{at: L(38, 0.5), price: 1000}, {at: L(39, 2), price: 930}]} lines={[{text: 'Di balik layar...', at: L(38), size: 64}, {text: 'Yang mau jual tetap mau jual', at: L(40), size: 50, color: C.red}, {text: 'Kolom beli: KOSONG', at: L(41, 4), size: 50, color: C.red}]} />, sfx: 'whoosh'},
  {start: L(42, -0.3), el: <Chapter at={L(42)} label="MINGGU 1" sub="ARB berjilid" />, sfx: 'boom'},
  {
    start: L(43, -0.3),
    el: (
      <X.ArbStairs
        steps={[
          {at: L(45, 1), price: 1000},
          {at: L(46), price: 930},
          {at: L(47), price: 865},
          {at: L(48), price: 805},
          {at: L(49), price: 750},
          {at: L(49, 2.4), price: 700},
        ]}
        lines={[{text: 'ARB BERJILID', at: L(43), size: 80, color: C.red}, {text: '5 hari = -30%', at: L(50), size: 70, color: C.yellow}]}
      />
    ),
    sfx: 'whoosh',
  },
  {start: L(51, -0.3), el: <X.Elevator from={L(51)} lines={[{text: 'TERJEBAK', at: L(52), size: 90, color: C.red}, {text: 'Rem pakem = sakit lebih lama', at: L(54), size: 52}]} />, sfx: 'whoosh'},
  {start: L(55, -0.3), el: <Chapter at={L(55)} label="BULAN 1" sub="Pasar menyesuaikan diri" />, sfx: 'boom'},
  {start: L(56, -0.3), el: <X.Asymmetric at={L(57, 3)} lines={[{text: 'Pola baru: saham gorengan', at: L(57), size: 60}, {text: '"Risiko kecil, untung besar?"', at: L(58, 3), size: 50, color: C.yellow}]} />},
  {
    start: L(59, -0.3),
    el: <S.LineChart data={[100, 135, 170, 205, 190, 177, 165, 153, 142, 132, 123]} from={L(59, 0.5)} to={L(60, 6)} min={80} max={220} marker="Rp" lines={[{text: 'JANGAN TERTIPU.', at: L(59), size: 80, color: C.red}, {text: 'Jatuhnya berhari-hari', at: L(60, 3), size: 50}, {text: 'Risiko hanya DIPINDAH', at: L(61, 2), size: 56, color: C.red}]} caption="Ilustrasi pola harga saham gorengan." />,
    sfx: 'whoosh',
  },
  {start: L(62, -0.3), el: <Chapter at={L(62)} label="TAHUN 1" sub="Efek samping yang jarang dibahas" />, sfx: 'boom'},
  {start: L(63, -0.3), el: <S.Cards title={{text: 'INVESTABILITY', at: L(65), size: 90, color: C.yellow}} cards={[{e: '🚪', t: 'Mudah masuk?', at: L(64, 2)}, {e: '🏃', t: 'Mudah keluar?', at: L(64, 4)}, {e: '🏦', t: 'Dana miliaran $', sub: 'butuh likuiditas', at: L(66)}]} />},
  {
    start: L(67, -0.3),
    el: (
      <X.ClassLadder
        levels={[
          {t: 'DEVELOPED', ex: 'AS, Jepang', at: L(67, 0.3)},
          {t: 'EMERGING', ex: 'Indonesia?', at: L(67, 0.6)},
          {t: 'FRONTIER', ex: '', at: L(67, 0.9)},
          {t: 'STANDALONE', ex: '', at: L(67, 1.2)},
        ]}
        markerAt={L(67, 1.5)}
        dropAt={L(68, 3)}
        lines={[{text: 'Alasan MSCI', at: L(68), size: 54}, {text: 'mempertanyakan Indonesia', at: L(68, 1), size: 54, color: C.red}]}
      />
    ),
    sfx: 'whoosh',
  },
  {start: L(70, -0.3), el: <S.Dark lines={[{text: 'ITULAH SKENARIO BURUKNYA.', at: L(70), size: 90}]} />, sfx: 'boom'},
  {start: L(71, -0.3), el: <S.Mystery openAt={L(72)} lines={[{text: 'Apakah ARB 7% murni buruk?', at: L(71), size: 64}]} reveal={{text: 'TIDAK JUGA.', at: L(72), size: 110, color: C.green}} />, sfx: 'ding'},
  {start: L(73, -0.3), el: <S.Cards flow="in" title={{text: 'KENAPA ARB BERGUNA', at: L(73), size: 76}} cards={[{e: '🛡️', t: 'Redam panik', sub: 'rumor & salah input', at: L(74)}, {e: '⏳', t: 'Beri waktu', sub: 'klarifikasi & berpikir', at: L(75)}, {e: '💳', t: 'Lindungi margin', sub: 'cegah jual paksa berantai', at: L(76)}]} />, sfx: 'whoosh'},
  {start: L(77, -0.3), el: <S.Bars bars={[{t: 'IHSG 20 Okt', v: 0.55, at: L(77, 1), color: C.green, value: '+5,65%'}]} lines={[{text: 'Sehari setelah ARB 7%', at: L(77), size: 64}]} stamp={{text: 'INVESTOR LOKAL MEMBELI', at: L(77, 5), size: 66, color: C.green}} />},
  {start: L(78, -0.3), el: <S.Dark lines={[{text: 'Masalahnya bukan remnya.', at: L(78), size: 64}, {text: 'TAPI BERAPA LAMA DIINJAK.', at: L(78, 2), size: 90, color: C.yellow}, {text: '🚗 Rem tangan terus ditarik?', at: L(79, 3), size: 56}]} />, sfx: 'boom'},
  {start: L(80, -0.3), el: <Chapter at={L(80)} label="PELAJARAN" sub="Cara memahami aturan main" color={C.green} />, sfx: 'boom'},
  {
    start: L(81, -0.3),
    el: (
      <S.Lessons
        items={[
          {e: '📏', t: 'Pahami aturan main', sub: 'Cek batas ARA & ARB', at: L(81)},
          {e: '💧', t: 'Perhatikan likuiditas', sub: 'Saham ramai lebih mudah dijual', at: L(82)},
          {e: '📉', t: 'Batas kecil ≠ risiko kecil', sub: 'Rugi bisa datang berhari-hari', at: L(83)},
          {e: '💳', t: 'Hindari margin berlebih', sub: 'Saat ARB berjilid, tak bisa keluar', at: L(84)},
        ]}
      />
    ),
  },
  {start: L(85, -0.3), el: <S.Dark lines={[{text: 'BUKAN SARAN INVESTASI.', at: L(85), size: 80}, {text: 'INI CARA MEMAHAMI ATURAN.', at: L(85, 2), size: 84, color: C.yellow}]} />, sfx: 'boom'},
  {start: L(86, -0.3), el: <S.TwoDoors a={{text: 'JEBAKAN', at: L(86, 4.5)}} b={{text: 'PELINDUNG', at: L(86, 3)}} lines={[{text: 'ARB 7%:', at: L(86), size: 70}]} comment={{text: 'Dicabut atau dipertahankan? Tulis di komentar', at: L(88)}} />, sfx: 'whoosh'},
  {start: L(89, -0.3), el: <S.Outro shareAt={L(89)} subAt={L(90)} byeAt={L(92)} />},
];
