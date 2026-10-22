import {Chapter} from '../../asing-kabur/scenes';
import {Checklist} from '../../pasar-hijau/scenes-a';
import * as S from '../../rupiah/scenes';
import {C} from '../../theme';
import * as X from '../custom';
import * as Y from '../custom2';
import {Seg} from '../WhatIf';

// What If Bank Tempat Kamu Menabung Bangkrut?
export const timeline = (L: (i: number, d?: number) => number): Seg[] => [
  {
    start: 0,
    el: (
      <Y.ChatHoax
        msgs={[
          {text: '⚠️ PENTING!! Bank tempat kalian nabung mau BANGKRUT minggu ini!!', at: L(0, 3)},
          {text: 'Segera tarik semua uang sebelum terlambat. Sebarkan ke keluarga!!', at: L(1, 1)},
          {text: 'Serius ini? 😰', at: L(2, 2), me: true},
        ]}
        lines={[{text: 'Ikut mengantre, atau tetap tenang?', at: L(3), size: 54}]}
      />
    ),
  },
  {start: L(2, 3), el: <S.Queue sign="BANK" board="ANTREAN" value="TARIK TUNAI" color="#3b7be0" growAt={L(2, 3.5)} lines={[{text: 'Antrean mulai memanjang...', at: L(2, 3.5), size: 60, color: C.red}]} />, sfx: 'whoosh'},
  {start: L(4, -0.3), el: <S.Cards title={{text: 'BUKAN HAL LANGKA', at: L(4), size: 80}} cards={[{e: '🏦', t: 'BPR dicabut izinnya', sub: 'hampir setiap tahun', at: L(5)}, {e: '📜', t: 'Sejarah', sub: 'kepanikan bank picu krisis', at: L(6)}]} />, sfx: 'whoosh'},
  {start: L(7, -0.3), el: <S.Dark lines={[{text: 'Bagaimana kalau bankmu bangkrut?', at: L(7), size: 66}, {text: 'Uangmu? Berapa kembali? Berapa lama?', at: L(8), size: 56, color: C.yellow}]} />, sfx: 'riser'},
  {start: L(9, -0.3), el: <S.Roadmap items={[{text: 'HARI 1', at: L(9, 1)}, {text: 'MINGGU 1', at: L(9, 1.5)}, {text: 'BULAN 1', at: L(9, 2)}, {text: 'TAHUN 1', at: L(9, 2.5)}]} lines={[]} />, sfx: 'whoosh'},
  {start: L(10, -0.3), el: <S.Mystery lines={[{text: '1 JENIS "SIMPANAN"', at: L(10, 2), size: 80}, {text: 'dikira aman, padahal tidak dijamin', at: L(10, 4), size: 54, color: C.red}]} />, sfx: 'riser'},
  {start: L(11, -0.3), el: <Chapter at={L(11)} label="BAGIAN 1" sub="Bagaimana bank bekerja?" color={C.yellow} />, sfx: 'boom'},
  {start: L(12, -0.3), el: <Y.Vault lendAt={L(13)} lines={[{text: 'Uangmu tidak diam di brankas', at: L(12), size: 60}, {text: 'Sebagian besar dipinjamkan lagi', at: L(13, 1), size: 52, color: C.yellow}, {text: 'Tunai hanya sebagian kecil', at: L(14), size: 48}]} />, sfx: 'whoosh'},
  {start: L(15, -0.3), el: <S.Dark lines={[{text: 'Kuncinya satu:', at: L(15), size: 64}, {text: 'KEPERCAYAAN.', at: L(15, 2), size: 140, color: C.yellow}, {text: 'Diawasi OJK: modal & likuiditas', at: L(16), size: 48}]} />, sfx: 'boom'},
  {start: L(17, -0.3), el: <S.Queue sign="BANK" board="SEMUA" value="TARIK!" color="#c94a3a" growAt={L(17)} lines={[{text: 'BANK RUN', at: L(18), size: 100, color: C.red}, {text: 'Panik jadi kenyataan karena panik', at: L(18, 2), size: 48}]} />, sfx: 'whoosh'},
  {start: L(19, -0.3), el: <S.Dark lines={[{text: 'Pernah terjadi di Indonesia?', at: L(19), size: 64}, {text: 'PERNAH.', at: L(20), size: 160, color: C.red}]} />, sfx: 'boom'},
  {start: L(21, -0.3), el: <S.Cards title={{text: 'NOVEMBER 1997', at: L(21), size: 80, color: C.red}} cards={[{e: '🏦', t: '16 bank ditutup', sub: 'sekaligus', at: L(21, 3)}, {e: '😱', t: 'Belum ada penjaminan', sub: 'nasabah panik', at: L(22)}, {e: '📉', t: 'Krisis makin dalam', at: L(23)}, {e: '🛡️', t: 'Lahirlah LPS', at: L(24), color: C.green}]} />},
  {start: L(25, -0.3), el: <Chapter at={L(25)} label="SKENARIO" sub="Bankmu benar-benar bangkrut" color={C.yellow} />, sfx: 'riser'},
  {start: L(26, -0.3), el: <Chapter at={L(26)} label="HARI 1" sub="Izin dicabut" />, sfx: 'boom'},
  {start: L(27, -0.3), el: <Y.BankFront closeAt={L(27, 1)} lines={[{text: 'OJK cabut izin usaha', at: L(27), size: 60}, {text: 'Kantor, aplikasi, ATM berhenti', at: L(28), size: 50, color: C.red}]} />, sfx: 'whoosh'},
  {start: L(30, -0.3), el: <Y.ChatHoax msgs={[{text: 'Katanya semua uang hilang!! 😭', at: L(30, 1)}, {text: 'Bank lain juga mau tutup, buruan tarik!!', at: L(30, 2.5)}, {text: 'Hoaks lebih cepat dari klarifikasi...', at: L(31, 2), me: true}]} lines={[{text: 'Hoaks menyebar', at: L(30), size: 64, color: C.red}]} />},
  {start: L(32, -0.3), el: <S.Cards flow="in" title={{text: 'LPS BERGERAK', at: L(32), size: 80, color: C.green}} cards={[{e: '🗂️', t: 'Ambil alih', sub: 'data semua simpanan', at: L(32, 2)}, {e: '🏛️', t: 'Bank sistemik', sub: 'bisa diselamatkan', at: L(33, 2)}]} />, sfx: 'whoosh'},
  {start: L(34, -0.3), el: <Chapter at={L(34)} label="MINGGU 1" sub="Verifikasi LPS" />, sfx: 'boom'},
  {start: L(35, -0.3), el: <S.Cards title={{text: 'ATURAN PENJAMINAN', at: L(36), size: 76}} cards={[{e: '🛡️', t: 'Rp2 MILIAR', sub: 'per nasabah, per bank', at: L(37), color: C.green}, {e: '💳', t: 'Tabungan · giro · deposito', at: L(38)}]} />},
  {
    start: L(39, -0.3),
    el: <Checklist title="SYARAT 3T" items={[{text: 'Tercatat di pembukuan bank', at: L(40)}, {text: 'Tingkat bunga ≤ bunga penjaminan', at: L(40, 2.5)}, {text: 'Tidak merugikan bank', at: L(40, 5)}]} />,
    sfx: 'whoosh',
  },
  {start: L(41, -0.3), el: <S.Bars bars={[{t: 'Bank umum', v: 0.37, at: L(41, 3), color: C.blue, value: '3,5%'}, {t: 'BPR', v: 0.63, at: L(41, 5), color: C.yellow, value: '6%'}]} lines={[{text: 'BUNGA PENJAMINAN LPS', at: L(41), size: 70}, {text: 'Lebih tinggi = bisa tidak dijamin', at: L(42), size: 50, color: C.red}]} />},
  {start: L(43, -0.3), el: <Chapter at={L(43)} label="BULAN 1" sub="Pembayaran klaim" />, sfx: 'boom'},
  {start: L(44, -0.3), el: <X.People items={[{t: 'Layak bayar', face: 'senang', jacket: C.green, at: L(44, 2)}, {t: '> Rp2 miliar', face: 'serius', jacket: C.yellow, at: L(47)}, {t: 'Bunga terlalu tinggi', face: 'sedih', jacket: C.red, at: L(48)}]} lines={[{text: '±99,97% rekening BPR di bawah batas', at: L(45), size: 50, color: C.green}]} />, sfx: 'whoosh'},
  {start: L(49, -0.3), el: <Chapter at={L(49)} label="TAHUN 1" sub="Likuidasi" />, sfx: 'boom'},
  {start: L(50, -0.3), el: <S.Cards title={{text: 'PROSES LIKUIDASI', at: L(50), size: 80}} cards={[{e: '🏷️', t: 'Aset bank dijual', at: L(50, 1)}, {e: '🧾', t: 'Utang tetap utang', sub: 'peminjam wajib bayar', at: L(51)}, {e: '💡', t: 'Bukan cuma di mana', sub: 'tapi bagaimana menyimpan', at: L(52), color: C.green}]} />},
  {start: L(53, -0.3), el: <S.Dark lines={[{text: 'ITULAH SKENARIONYA.', at: L(53), size: 90}]} />, sfx: 'boom'},
  {start: L(54, -0.3), el: <S.Mystery openAt={L(55)} lines={[{text: 'Ingat "simpanan" yang dikira aman?', at: L(54), size: 60}]} reveal={{text: 'PRODUK INVESTASI DI BANK', at: L(56), size: 80, color: C.red}} />, sfx: 'ding'},
  {start: L(57, -0.3), el: <S.Split at={L(59)} left="TIDAK DIJAMIN" right="DIJAMIN LPS" lines={[{text: 'Reksa dana · asuransi · obligasi', at: L(57), size: 50}, {text: 'PADAHAL TIDAK DIJAMIN LPS', at: L(58), size: 64, color: C.red}, {text: 'Hanya tabungan, giro, deposito', at: L(59), size: 50, color: C.green}]} />, sfx: 'whoosh'},
  {start: L(60, -0.3), el: <S.Dark lines={[{text: 'Tanyakan satu hal:', at: L(60, 2), size: 64}, {text: 'SIMPANAN', at: L(61, 2), size: 110, color: C.green}, {text: 'atau INVESTASI?', at: L(61, 3), size: 110, color: C.yellow}]} />, sfx: 'boom'},
  {start: L(62, -0.3), el: <Chapter at={L(62)} label="PELAJARAN" sub="Cara melindungi uangmu" color={C.green} />, sfx: 'boom'},
  {
    start: L(63, -0.3),
    el: (
      <S.Lessons
        items={[
          {e: '✅', t: 'Peserta LPS', sub: 'Bank resmi & terdaftar', at: L(63)},
          {e: '📉', t: 'Bunga wajar', sub: 'Cek bunga penjaminan LPS', at: L(64)},
          {e: '🧺', t: 'Sebar simpanan', sub: 'Rp2 M per nasabah per bank', at: L(65)},
          {e: '🔀', t: 'Simpanan ≠ investasi', sub: 'Berlaku juga bank digital', at: L(66)},
          {e: '🚫', t: 'Stop hoaks', sub: 'Cek OJK & LPS', at: L(68)},
        ]}
      />
    ),
  },
  {start: L(69, -0.3), el: <S.Dark lines={[{text: 'BUKAN SARAN INVESTASI.', at: L(69), size: 80}, {text: 'Sudahkah uangmu disimpan', at: L(71), size: 64, color: C.yellow}, {text: 'dengan cara yang benar?', at: L(71, 1), size: 64, color: C.yellow}]} />, sfx: 'boom'},
  {start: L(72, -0.3), el: <S.TwoDoors a={{text: 'IKUT ANTRE', at: L(72, 5)}} b={{text: 'TETAP TENANG', at: L(72, 6)}} lines={[{text: 'Dapat pesan berantai bank bangkrut:', at: L(72), size: 54}]} comment={{text: 'Tulis jawabanmu di komentar', at: L(73)}} />, sfx: 'whoosh'},
  {start: L(74, -0.3), el: <S.Outro shareAt={L(74)} subAt={L(75)} byeAt={L(77)} />},
];
