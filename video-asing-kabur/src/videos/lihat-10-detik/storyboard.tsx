import {Chapter} from '../../asing-kabur/scenes';
import * as S from '../../rupiah/scenes';
import {C} from '../../theme';
import * as Y from '../custom2';
import * as T from '../story';
import {Seg} from '../WhatIf';

// What If Kamu Bisa Melihat Harga Saham 10 Detik Lebih Awal? (gaya cerita, sudut pandang "kamu")
export const timeline = (L: (i: number, d?: number) => number): Seg[] => [
  // ── Hook
  {start: 0, el: <T.TradeRoom price={1000} future={1100} seeAt={L(2)} buyAt={L(3)} riseAt={L(4, 1)} lines={[{text: 'JAM 09.00', at: L(0, 0.3), size: 60}]} />},
  {start: L(5, -0.3), el: <T.Dialog set="room" left={[{who: 'kamu', pose: 'stand', face: 'netral'}]} right={[{who: 'raka', pose: 'point', face: 'kaget'}]} talks={[{name: 'Raka', who: 'raka', text: 'Bro... kok bisa beli pas banget sebelum naik?', at: L(5), side: 'right'}]} />, sfx: 'whoosh'},
  {start: L(6, -0.3), el: <S.Dark lines={[{text: 'Sejak bangun pagi ini...', at: L(7), size: 60}, {text: 'KAMU BISA MELIHAT', at: L(7, 2), size: 90, color: '#6fe7ff'}, {text: '10 DETIK KE DEPAN', at: L(7, 3), size: 120, color: '#6fe7ff'}]} />, sfx: 'riser'},
  {start: L(8, -0.3), el: <Chapter at={L(8)} label="WHAT IF" sub="Kamu melihat harga 10 detik lebih awal?" color="#6fe7ff" />, sfx: 'boom'},
  // ── Aturan
  {start: L(9, -0.3), el: <S.Cards title={{text: 'ATURANNYA', at: L(9), size: 80}} cards={[{e: '📅', t: 'Besok?', sub: 'TIDAK BISA', at: L(10), color: C.red}, {e: '🗓️', t: 'Minggu depan?', sub: 'TIDAK BISA', at: L(10, 2), color: C.red}, {e: '⏱️', t: '10 detik', sub: 'hanya itu', at: L(11), color: C.green}]} />, sfx: 'whoosh'},
  {start: L(12, -0.3), el: <S.LineChart data={[1000, 1010, 995, 1020, 1005, 1040, 1025, 1060, 1045, 1100]} from={L(12, 1)} to={L(13, 4)} min={960} max={1120} marker="Rp" lines={[{text: '10 detik itu LAMA', at: L(12, 1.5), size: 70, color: '#6fe7ff'}, {text: 'Ribuan order · naik · turun · naik', at: L(13), size: 46}, {text: 'Orang lain MENEBAK. Kamu MELIHAT.', at: L(14), size: 50, color: C.green}]} caption="Ilustrasi." />},
  // ── Eskalasi 1: hari pertama
  {start: L(15, -0.3), el: <T.Balance steps={[{at: L(15), v: 500000}, {at: L(17), v: 550000}, {at: L(18), v: 600000}]} lines={[{text: 'HARI PERTAMA', at: L(15), size: 70}, {text: 'Modal: sisa uang jajan', at: L(16), size: 50}, {text: '+Rp100 ribu · 0 rugi', at: L(19), size: 56, color: C.green}]} />, sfx: 'whoosh'},
  {start: L(20, -0.3), el: <T.Dialog set="street" left={[{who: 'kamu', face: 'senang'}]} right={[{who: 'raka', pose: 'armUp', face: 'kaget'}]} talks={[{name: 'Raka', who: 'raka', text: 'Kamu pakai robot ya? Ajarin dong!', at: L(20), side: 'right'}]} lines={[{text: '(kamu cuma tersenyum)', at: L(21), size: 44}]} />},
  // ── Eskalasi 2: minggu pertama
  {start: L(22, -0.3), el: <T.Balance steps={[{at: L(22), v: 5000000}, {at: L(23), v: 7000000}, {at: L(23, 2.5), v: 10000000}]} lines={[{text: 'MINGGU PERTAMA', at: L(22), size: 70}, {text: 'Bayar kos 3 bulan · traktir teman', at: L(24), size: 46, color: C.green}]} />, sfx: 'whoosh'},
  {start: L(25, -0.3), el: <S.PriceGrid items={[{e: '🍜', n: 'Pesan apa saja', p: 25000, at: L(25), pct: 0}, {e: '🧋', n: 'Tanpa lihat harga', p: 30000, at: L(25, 1), pct: 0}, {e: '🍣', n: 'Pertama kali', p: 150000, at: L(25, 2), pct: 0}]} lines={[{text: 'Hidup terasa mudah...', at: L(25), size: 60, color: C.green}]} />},
  {start: L(26, -0.3), el: <S.Dark lines={[{text: 'Tapi ada satu hal aneh.', at: L(26), size: 70}, {text: 'Dunia terasa seperti TAYANGAN ULANG', at: L(27, 2), size: 60, color: '#6fe7ff'}, {text: 'Semua kejutan sudah kamu lihat duluan', at: L(28), size: 50}]} />, sfx: 'riser'},
  {start: L(29, -0.3), el: <T.Dialog set="street" left={[{who: 'kamu', face: 'netral'}]} right={[{who: 'raka', pose: 'cheer', face: 'senang'}]} talks={[{name: 'Raka', who: 'raka', text: 'HAHAHA! Lucu banget kan?!', at: L(29), side: 'right'}, {name: 'Kamu', who: 'kamu', text: '(...sudah kudengar 10 detik lalu)', at: L(29, 2), side: 'left'}]} />},
  // ── Eskalasi 3: rumah orang tua
  {start: L(30, -0.3), el: <T.Balance steps={[{at: L(30), v: 10000000}, {at: L(30, 1), v: 350000000}]} lines={[{text: 'BULAN KEDUA', at: L(30), size: 70}, {text: 'Ratusan juta', at: L(30, 1.5), size: 60, color: C.green}]} />, sfx: 'whoosh'},
  {start: L(31, -0.3), el: <T.Dialog set="house" left={[{who: 'kamu', face: 'senang'}]} right={[{who: 'ana', face: 'kaget'}, {who: 'joko', face: 'senang'}]} talks={[{name: 'Bu Ana', who: 'ana', text: 'Nak, ini... uang dari mana?', at: L(32), side: 'right'}, {name: 'Kamu', who: 'kamu', text: 'Dari saham, Bu. Tenang saja.', at: L(33), side: 'left'}]} lines={[{text: '🏠 Rumah untuk Ayah & Ibu', at: L(31, 0.5), size: 56}, {text: 'Tapi matanya menyimpan pertanyaan', at: L(34, 2), size: 48}]} />, sfx: 'ding'},
  // ── Eskalasi 4: viral
  {
    start: L(35, -0.3),
    el: (
      <Y.ChatHoax
        title="🔥 Grup Saham Cuan"
        msgs={[
          {text: 'Ada anak muda TIDAK PERNAH RUGI 😱', at: L(35, 1)},
          {text: 'Followers-nya naik ribuan dalam sehari!', at: L(36)},
          {text: 'Bro kamu viral!! Ada yang nawarin jadi admin grup sinyal berbayar!', at: L(37)},
          {text: 'Nggak. Ini nggak bisa diajarkan.', at: L(38), me: true},
        ]}
        lines={[{text: 'VIRAL', at: L(35, 0.5), size: 100, color: C.red}]}
      />
    ),
    sfx: 'whoosh',
  },
  {start: L(39, -0.3), el: <S.Cards title={{text: 'AKUN PALSU BERMUNCULAN', at: L(39), size: 70, color: C.red}} cards={[{e: '🎭', t: '@sinyal_10detik', sub: 'pakai namamu', at: L(39, 2)}, {e: '💸', t: '"Untung pasti tiap hari"', sub: 'janji palsu', at: L(39, 4)}, {e: '😢', t: 'Banyak yang percaya', at: L(40)}]} />},
  // ── Harga yang harus dibayar
  {start: L(41, -0.3), el: <Chapter at={L(41)} label="RUMIT" sub="Ada yang mengawasi" />, sfx: 'boom'},
  {start: L(42, -0.3), el: <X1000 L={L} />, sfx: 'whoosh'},
  {start: L(46, -0.3), el: <T.Dialog set="room" left={[{who: 'kamu', pose: 'point', face: 'kaget'}]} right={[]} talks={[{name: 'Petugas (telepon)', who: 'petugas', text: 'Selamat pagi. Kami dari tim pengawasan. Kami ingin meminta penjelasan.', at: L(47), side: 'left'}]} lines={[{text: '📱 Suatu pagi...', at: L(46), size: 56}]} />, sfx: 'thump'},
  {
    start: L(48, -0.3),
    el: (
      <T.Dialog
        set="white"
        left={[{who: 'kamu', face: 'kaget'}]}
        right={[{who: 'petugas', face: 'serius'}, {who: 'petugas', face: 'serius'}, {who: 'petugas', face: 'serius'}]}
        talks={[
          {name: 'Petugas', who: 'petugas', text: 'Siapa yang memberi Anda informasi?', at: L(49), side: 'right'},
          {name: 'Kamu', who: 'kamu', text: 'Tidak ada. Saya hanya... melihat grafik.', at: L(50), side: 'left'},
          {name: 'Petugas', who: 'petugas', text: 'Seribu transaksi tanpa rugi. Anda ingin kami percaya itu?', at: L(51), side: 'right'},
        ]}
        lines={[{text: 'RUANG PEMERIKSAAN', at: L(48), size: 56}]}
      />
    ),
  },
  {start: L(52, -0.3), el: <S.Cards title={{text: 'DIPERIKSA', at: L(52), size: 80}} cards={[{e: '📱', t: 'Ponsel', sub: 'bersih', at: L(52, 1), color: C.green}, {e: '💬', t: 'Pesan', sub: 'bersih', at: L(52, 2), color: C.green}, {e: '🏦', t: 'Rekening', sub: 'bersih', at: L(52, 3), color: C.green}, {e: '🔒', t: 'Akun dibatasi', sub: 'diawasi terus', at: L(54)}]} />},
  {start: L(55, -0.3), el: <S.Dark lines={[{text: 'Bukan cuma hadiah.', at: L(55, 1.5), size: 70}, {text: 'INI JUGA BEBAN.', at: L(55, 3), size: 120, color: C.red}]} />, sfx: 'boom'},
  {start: L(56, -0.3), el: <T.Insomnia lines={[{text: 'Sulit tidur', at: L(56), size: 64}, {text: 'Hijau. Merah. Hijau lagi.', at: L(57, 2), size: 56, color: C.yellow}]} />, sfx: 'whoosh'},
  {start: L(58, -0.3), el: <T.Dialog set="street" left={[{who: 'kamu', face: 'sedih'}]} right={[{who: 'raka', pose: 'stand', face: 'serius'}]} talks={[{name: 'Raka', who: 'raka', text: 'Jujur deh. Kamu orang dalam, ya?', at: L(59), side: 'right'}]} lines={[{text: 'Teman-teman menjauh', at: L(58), size: 56}, {text: 'Uang bertambah, teman berkurang', at: L(61), size: 50, color: C.red}]} />},
  // ── Klimaks
  {start: L(62, -0.3), el: <Chapter at={L(62)} label="HARI ITU" sub="10.05 pagi" />, sfx: 'boom'},
  {start: L(63, -0.3), el: <T.TradeRoom price={1450} future={1350} seeAt={L(64, 1)} face="kaget" lines={[{text: 'Pasar terlihat biasa saja...', at: L(63), size: 56}]} />},
  {
    start: L(65, -0.3),
    el: <S.LineChart data={[5300, 5280, 5180, 5000, 4800, 4650, 4600]} from={L(65, 0.5)} to={L(67, 3)} min={4400} max={5400} target={{v: 4650, label: 'BATAS BAWAH', at: L(67, 2)}} lines={[{text: 'DALAM 10 DETIK...', at: L(65), size: 70, color: '#6fe7ff'}, {text: 'Hampir semua saham merah', at: L(66), size: 52, color: C.red}]} caption="Ilustrasi (fiksi)." />,
    sfx: 'riser',
  },
  {start: L(68, -0.3), el: <S.TwoDoors a={{text: 'JUAL SEMUA', at: L(69)}} b={{text: 'PERINGATKAN', at: L(70)}} lines={[{text: 'KAMU PUNYA 10 DETIK', at: L(68), size: 70, color: C.red}]} />, sfx: 'whoosh'},
  {start: L(71, -0.3), el: <T.Dialog set="house" left={[]} right={[{who: 'joko', face: 'senang'}]} talks={[{name: 'Pak Joko', who: 'joko', text: 'Kalau kamu bisa, Ayah juga pasti bisa, kan?', at: L(74), side: 'right'}]} lines={[{text: 'AYAHMU. PAK JOKO.', at: L(72), size: 80, color: C.yellow}, {text: 'Seluruh tabungan pensiun → saham', at: L(73, 1), size: 48, color: C.red}]} />, sfx: 'boom'},
  {
    start: L(75, -0.3),
    el: <T.Countdown ticks={[{at: L(75, -0.3), n: 9}, {at: L(77), n: 8}, {at: L(79), n: 7}, {at: L(85), n: 3}, {at: L(85, 0.9), n: 2}, {at: L(85, 1.7), n: 1}]} callAt={L(81)} redAt={L(86)} lines={[{text: 'Jual → kamu selamat', at: L(76), size: 46}, {text: 'Telepon → milikmu terjebak', at: L(78), size: 46}]} />,
    sfx: 'riser',
  },
  {start: L(82, -0.3), el: <T.PhoneCall talks={[{name: 'Kamu', who: 'kamu', text: 'Yah! Jual sekarang! Semuanya! Jangan tanya!', at: L(82), side: 'left'}, {name: 'Pak Joko', who: 'joko', text: 'Hah? Kenapa...', at: L(83), side: 'right'}, {name: 'Kamu', who: 'kamu', text: 'SEKARANG, YAH!', at: L(84), side: 'left'}]} />, sfx: 'thump'},
  {start: L(85, -0.3), el: <T.Countdown ticks={[{at: L(85, -0.3), n: 3}, {at: L(85, 0.9), n: 2}, {at: L(85, 1.7), n: 1}]} callAt={L(85, -1)} redAt={L(86)} />, sfx: 'boom'},
  {start: L(87, -0.3), el: <S.Split at={L(87)} left="MILIKMU TERJEBAK" right="TABUNGAN AYAH SELAMAT" lines={[{text: 'Pak Joko keluar tepat waktu', at: L(87), size: 56, color: C.green}, {text: 'Kamu kehilangan hampir setengahnya', at: L(88, 2), size: 50, color: C.red}]} />},
  {start: L(89, -0.3), el: <T.FloorMessage msgAt={L(90, 1)} lines={[{text: 'Diam. Lama.', at: L(89, 1), size: 60}]} />, sfx: 'ding'},
  {start: L(92, -0.3), el: <S.Dark lines={[{text: 'Malam itu, kamu tidur nyenyak.', at: L(92), size: 60}, {text: 'Uang bisa dicari lagi.', at: L(95), size: 80, color: C.yellow}, {text: 'Orang tua tidak.', at: L(95, 1.8), size: 110, color: C.yellow}]} />, sfx: 'boom'},
  // ── Pelajaran singkat di dalam cerita
  {start: L(96, -0.3), el: <S.Lessons items={[{e: '🎲', t: 'Tidak ada kepastian', sub: 'Melihat ke depan pun bisa rugi', at: L(97)}, {e: '🧺', t: 'Jangan semua di satu tempat', sub: 'Sebar tabunganmu', at: L(98)}, {e: '👀', t: 'Jangan ikut-ikutan', sub: 'Untung orang lain bukan alasan', at: L(98, 3)}, {e: '🚫', t: 'Untung pasti = penipuan', sub: 'Waspadai "sinyal" berbayar', at: L(99)}]} />},
  // ── Cliffhanger
  {start: L(100, -0.3), el: <T.Envelope openAt={L(101)} noteAt={L(102, 1)} addrAt={L(104)} lines={[{text: 'Seminggu kemudian...', at: L(100), size: 56}]} />, sfx: 'riser'},
  {start: L(105, -0.3), el: <S.Dark lines={[{text: 'Untuk pertama kalinya...', at: L(105), size: 60}, {text: 'kamu tidak bisa melihat', at: L(105, 2.5), size: 80, color: '#6fe7ff'}, {text: '10 detik ke depan.', at: L(105, 4), size: 100, color: '#6fe7ff'}]} />, sfx: 'boom'},
  {start: L(106, -0.3), el: <S.TwoDoors a={{text: 'BELI SAHAM APA?', at: L(106, 3)}} b={{text: 'SIAPA PENGIRIMNYA?', at: L(108)}} lines={[{text: 'Kalau kamu bisa melihat 10 detik ke depan...', at: L(106), size: 50}]} comment={{text: 'Tulis jawabanmu di komentar', at: L(107)}} />, sfx: 'whoosh'},
  {start: L(108, 3), el: <S.Outro shareAt={L(108, 3)} subAt={L(108, 4)} byeAt={L(109, 1)} />},
];

// Pengawasan pasar: 1.000 transaksi, 0 rugi → alarm.
const X1000: React.FC<{L: (i: number, d?: number) => number}> = ({L}) => (
  <S.Bars
    bars={[{t: 'Transaksi untung', v: 1, at: L(44), color: C.green, value: '1.000'}, {t: 'Transaksi rugi', v: 0.02, at: L(44, 1)}]}
    lines={[{text: 'PENGAWASAN PASAR', at: L(42), size: 70}, {text: 'Pola terlalu sempurna = alarm', at: L(43), size: 50, color: C.red}]}
    stamp={{text: 'TIDAK WAJAR', at: L(45), size: 100, color: C.red}}
  />
);
