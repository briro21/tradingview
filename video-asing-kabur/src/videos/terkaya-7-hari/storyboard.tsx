import {Chapter} from '../../asing-kabur/scenes';
import * as S from '../../rupiah/scenes';
import {C} from '../../theme';
import * as Y from '../custom2';
import * as T from '../story';
import {Seg} from '../WhatIf';

// What If Kamu Jadi Orang Terkaya di Indonesia Selama 7 Hari? (tokoh & perusahaan fiktif, angka ilustrasi)
export const timeline = (L: (i: number, d?: number) => number): Seg[] => [
  {start: 0, el: <T.Dialog set="white" left={[{who: 'kamu', face: 'kaget'}]} right={[]} talks={[]} lines={[{text: 'Ini bukan kamarmu.', at: L(0, 0.3), size: 64}, {text: '🏙️ Lantai 60 · dinding kaca', at: L(1), size: 56, color: '#3b7be0'}]} />},
  {start: L(2, -0.3), el: <T.Dialog set="white" left={[{who: 'kamu', face: 'kaget'}]} right={[{who: 'asisten', face: 'senang'}]} talks={[{name: 'Asisten', who: 'asisten', text: 'Selamat pagi, Pak. Kekayaan bersih Bapak pagi ini Rp450 triliun. Bapak masih orang terkaya di Indonesia.', at: L(3), side: 'right'}]} />, sfx: 'ding'},
  {start: L(4, -0.3), el: <T.Balance label="KEKAYAAN BERSIH" sub="▲ orang terkaya #1 (fiktif)" steps={[{at: L(4, -0.3), v: 4500000}, {at: L(4, 0.5), v: 450000000000000}]} lines={[{text: '📺 Wajahmu di semua berita', at: L(4, 3), size: 50}]} />, sfx: 'boom'},
  {start: L(5, -0.3), el: <S.Dark lines={[{text: '🕰️ Jam saku + selembar kertas', at: L(5), size: 56, color: '#ffd59e'}, {text: '7 HARI', at: L(5, 3), size: 160, color: C.yellow}]} />},
  {start: L(6, -0.3), el: <Chapter at={L(6)} label="WHAT IF" sub="Jadi orang terkaya di Indonesia 7 hari?" color={C.yellow} />, sfx: 'boom'},
  {start: L(7, -0.3), el: <S.Cards title={{text: 'ATURANNYA', at: L(7), size: 80}} cards={[{e: '👑', t: 'Semua hartanya', sub: 'milikmu 7 hari', at: L(8), color: C.yellow}, {e: '🔙', t: 'Hari ke-8', sub: 'kembali biasa', at: L(8, 3), color: '#9aa3b8'}, {e: '🎁', t: 'Yang diberikan', sub: 'tetap tinggal', at: L(9), color: C.green}]} />, sfx: 'whoosh'},
  {start: L(10, -0.3), el: <S.Cards flow="in" title={{text: 'RENCANAMU: BAGI-BAGI', at: L(10), size: 70, color: C.green}} cards={[{e: '👨‍👩‍👦', t: 'Pak Joko & Bu Ana', at: L(10, 2)}, {e: '🤝', t: 'Raka', at: L(10, 3)}, {e: '👧', t: 'Laras', at: L(10, 4)}, {e: '🏘️', t: 'Satu kampung', at: L(10, 5)}]} />},
  {
    start: L(11, -0.3),
    el: (
      <T.Dialog
        set="white"
        left={[{who: 'kamu', pose: 'point', face: 'senang'}]}
        right={[{who: 'asisten', face: 'serius'}]}
        talks={[
          {name: 'Kamu', who: 'kamu', text: 'Saya mau transfer sepuluh triliun ke beberapa rekening. Hari ini.', at: L(12), side: 'left'},
          {name: 'Asisten', who: 'asisten', text: 'Maaf, Pak. Uang tunai Bapak sekitar dua triliun. Sisanya dalam bentuk saham perusahaan Bapak.', at: L(14), side: 'right'},
        ]}
      />
    ),
  },
  {start: L(15, -0.3), el: <S.Split at={L(15, 1)} left="TUNAI ± Rp2 T" right="SAHAM ± Rp448 T" lines={[{text: 'Kurang dari 0,5% berupa uang', at: L(15), size: 54, color: C.yellow}]} />, sfx: 'boom'},
  {start: L(16, -0.3), el: <S.Cards title={{text: 'KEKAYAAN = HARGA SAHAM × LEMBAR', at: L(16, 2), size: 58}} cards={[{e: '📈', t: 'Saham naik', sub: 'kamu makin kaya', at: L(17), color: C.green}, {e: '📉', t: 'Saham turun', sub: 'kamu makin miskin', at: L(17, 2), color: C.red}, {e: '😴', t: 'Walau kamu', sub: 'tidak berbuat apa-apa', at: L(17, 4)}]} />, sfx: 'whoosh'},
  {start: L(18, -0.3), el: <S.Dark lines={[{text: 'HARI 2', at: L(18), size: 70}, {text: 'Jual 5% saja...', at: L(18, 2), size: 64, color: C.yellow}, {text: '"Pemiliknya jual? Ada yang tidak beres!"', at: L(20), size: 54, color: C.red}]} />, sfx: 'thump'},
  {start: L(21, -0.3), el: <T.Balance label="KEKAYAANMU DALAM 1 JAM" sub="▼ -Rp40 triliun · saham -8%" steps={[{at: L(21, -0.3), v: 450000000000000}, {at: L(21, 1), v: 410000000000000}]} lines={[{text: 'IHSG ikut memerah', at: L(21), size: 54, color: C.red}]} />, sfx: 'boom'},
  {start: L(22, -0.3), el: <T.Dialog set="house" left={[{who: 'raka', pose: 'typing', face: 'kaget'}]} right={[]} talks={[{name: 'Raka', who: 'raka', text: 'Bro, saham konglomerat itu anjlok. Reksa danaku ikut turun. Ada apa sih sama orang-orang kaya ini?', at: L(23), side: 'left'}]} lines={[{text: 'Sementara itu, di Depok...', at: L(22), size: 52}]} />},
  {start: L(25, -0.3), el: <T.Dialog set="meeting" left={[{who: 'kamu', face: 'kaget'}]} right={[{who: 'bankir', face: 'serius'}]} talks={[{name: 'Bankir', who: 'bankir', text: 'Sebagian saham Bapak dijaminkan ke bank kami. Turun 15% lagi, kami terpaksa menjualnya.', at: L(26), side: 'right'}]} />, sfx: 'thump'},
  {start: L(27, -0.3), el: <S.Domino items={[{e: '📉', t: 'Harga turun'}, {e: '🏦', t: 'Bank jual jaminan'}, {e: '📉', t: 'Harga turun lagi'}, {e: '🏦', t: 'Bank jual lagi'}, {e: '💥', t: 'Bola salju'}]} startAt={L(28)} lines={[{text: 'Orang terkaya pun punya utang', at: L(27), size: 56, color: C.red}]} />, sfx: 'whoosh'},
  {start: L(29, -0.3), el: <T.Dialog set="white" left={[{who: 'kamu', face: 'sedih'}]} right={[{who: 'asisten', face: 'serius'}]} talks={[{name: 'Asisten', who: 'asisten', text: 'Banyak konglomerat meminjam dengan jaminan saham, Pak. Selama harga naik, semuanya aman.', at: L(29), side: 'right'}]} />},
  {start: L(30, -0.3), el: <S.Split at={L(31)} left="BEREDAR DI PUBLIK" right="DIPEGANG PEMILIK" lines={[{text: 'HARI 4 · barangnya sedikit', at: L(30), size: 56}, {text: 'Mudah naik, mudah jatuh', at: L(32), size: 54, color: C.yellow}]} />},
  {start: L(33, -0.3), el: <S.Cards flow="out" title={{text: 'YANG IKUT MEMEGANG', at: L(33), size: 72}} cards={[{e: '🧑‍💼', t: 'Investor ritel', at: L(33, 1.5)}, {e: '🧺', t: 'Reksa dana', sub: 'tabungan orang biasa', at: L(33, 3)}, {e: '👴', t: 'Dana pensiun', at: L(33, 4.5)}]} />},
  {
    start: L(34, -0.3),
    el: (
      <T.Dialog
        set="meeting"
        left={[{who: 'kamu', face: 'serius'}]}
        right={[{who: 'deputi', face: 'serius'}, {who: 'deputi', face: 'senang'}]}
        talks={[
          {name: 'Direksi', who: 'deputi', text: 'Kami mengusulkan efisiensi: tutup dua pabrik, kurangi sepuluh ribu karyawan.', at: L(35), side: 'right'},
          {name: 'Direksi', who: 'deputi', text: 'Laba naik, target harga naik, saham Bapak pulih, bank berhenti menekan.', at: L(36), side: 'right'},
        ]}
      />
    ),
    sfx: 'thump',
  },
  {start: L(37, -0.3), el: <S.Dark lines={[{text: 'Di balik setiap angka: keluarga', at: L(37, 1), size: 56}, {text: '🏭 Pabrik Cikarang', at: L(38), size: 80, color: C.red}, {text: 'tempat Raka bekerja 7 tahun', at: L(38, 2), size: 54}]} />, sfx: 'boom'},
  {start: L(39, -0.3), el: <T.Dialog set="house" left={[{who: 'kamu', face: 'sedih'}]} right={[{who: 'joko', face: 'sedih'}, {who: 'ana', face: 'serius'}]} talks={[{name: 'Pak Joko', who: 'joko', text: 'Nak, Ayah dengar pabrik-pabrik besar mau PHK. Tetangga kita banyak yang kerja di sana.', at: L(40), side: 'right'}]} lines={[{text: '🍳 Nasi goreng Bu Ana', at: L(41, 2), size: 48}]} />},
  {start: L(42, -0.3), el: <S.TwoDoors a={{text: 'SETUJUI PHK', at: L(43)}} b={{text: 'TOLAK PHK', at: L(44)}} lines={[{text: 'HARI 6 · tak ada pilihan tanpa korban', at: L(42), size: 50}]} />, sfx: 'riser'},
  {start: L(46, -0.3), el: <T.Dialog set="white" left={[{who: 'kamu', face: 'serius'}]} right={[{who: 'laras', face: 'serius'}]} talks={[{name: 'Laras', who: 'laras', text: 'Kak, kalau Kakak cuma punya tujuh hari, Kakak mau dikenang sebagai apa?', at: L(47), side: 'right'}]} />},
  {
    start: L(48, -0.3),
    el: (
      <T.Dialog
        set="meeting"
        left={[{who: 'kamu', pose: 'point', face: 'serius'}]}
        right={[{who: 'deputi', face: 'kaget'}, {who: 'deputi', face: 'serius'}]}
        talks={[
          {name: 'Kamu', who: 'kamu', text: 'Kita tidak menutup pabrik Cikarang. Lini yang rugi kita alihkan, karyawan kita latih ulang.', at: L(49), side: 'left'},
          {name: 'Kamu', who: 'kamu', text: 'Saya jual sebagian saham pribadi secara terbuka dan bertahap, untuk melunasi utang bank.', at: L(50), side: 'left'},
        ]}
      />
    ),
    sfx: 'ding',
  },
  {start: L(51, -0.3), el: <S.LineChart data={[100, 98, 95, 96, 97, 99, 101]} from={L(52)} to={L(53, 3)} min={85} max={105} color={C.yellow} lines={[{text: 'Saham -5% · dibilang "terlalu lunak"', at: L(52), size: 50, color: C.red}, {text: 'Tapi bank berhenti menekan', at: L(53), size: 52, color: C.green}]} caption="Ilustrasi." />},
  {start: L(54, -0.3), el: <T.Dialog set="room" left={[{who: 'kamu', face: 'senang'}]} right={[]} talks={[]} lines={[{text: 'HARI 8 · kamar sendiri', at: L(54), size: 60}, {text: 'Saldo kembali seperti semula', at: L(54, 3), size: 50}]} />},
  {start: L(55, -0.3), el: <Y.ChatHoax title="💬 Raka" msgs={[{text: 'Bro! Pabrik nggak jadi tutup 😭', at: L(56)}, {text: 'Kami malah ditawari pelatihan mesin baru', at: L(56, 2)}, {text: 'Pengen berterima kasih ke yang mutusin 🙏', at: L(56, 4)}]} lines={[]} />, sfx: 'ding'},
  {start: L(57, -0.3), el: <S.Lessons items={[{e: '📜', t: 'Kekayaan = saham', sub: 'Bukan uang tunai', at: L(58)}, {e: '🏦', t: 'Jual / gadai saham', sub: 'Cek keterbukaan informasi', at: L(59)}, {e: '🎢', t: 'Free float kecil', sub: 'Lebih mudah bergejolak', at: L(60)}, {e: '🧮', t: 'Hitung kekayaanmu', sub: 'Harta − utang', at: L(61)}]} />},
  {start: L(62, -0.3), el: <S.Dark lines={[{text: '📅 Rapat tertutup', at: L(62, 1), size: 64}, {text: 'Tanpa asisten. Tanpa catatan.', at: L(63), size: 54}, {text: 'Tamu: PEMILIK TOKO JAM', at: L(64), size: 76, color: C.yellow}]} />, sfx: 'boom'},
  {start: L(65, -0.3), el: <S.TwoDoors a={{text: 'BAGI-BAGI', at: L(65, 3)}} b={{text: 'SELAMATKAN PABRIK', at: L(65, 4)}} lines={[{text: 'Orang terkaya 7 hari, apa yang pertama?', at: L(65), size: 50}]} comment={{text: 'Tulis jawabanmu di komentar', at: L(66)}} />, sfx: 'whoosh'},
  {start: L(67, -0.3), el: <S.Dark lines={[{text: 'Tokoh & perusahaan fiktif · angka ilustrasi.', at: L(67), size: 50}, {text: 'Bukan ajakan membeli/menjual saham.', at: L(67, 2), size: 48}]} />},
  {start: L(68, -0.3), el: <S.Outro shareAt={L(68)} subAt={L(68, 2)} byeAt={L(69)} />},
];
