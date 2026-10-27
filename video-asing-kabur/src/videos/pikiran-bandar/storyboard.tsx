import {Chapter} from '../../asing-kabur/scenes';
import * as S from '../../rupiah/scenes';
import {C} from '../../theme';
import * as Y from '../custom2';
import * as T from '../story';
import {Seg} from '../WhatIf';

// What If Kamu Bisa Mendengar Isi Pikiran Bandar Saham? (musim 2, episode 1; semua nama perusahaan fiktif)
const KILT = [50, 50, 51, 50, 50, 52, 50, 51, 50, 50];
const PUMP = [50, 55, 62, 80, 95, 120, 150, 200, 240, 300];
const DUMP = [300, 310, 305, 260, 200, 150, 110, 80, 65, 60];

export const timeline = (L: (i: number, d?: number) => number): Seg[] => [
  {start: 0, el: <T.Dialog set="room" left={[{who: 'kamu', face: 'kaget'}]} right={[{who: 'laras', face: 'sedih'}]} talks={[{name: 'Laras', who: 'laras', text: 'Kak. Aku Laras. Aku adikmu.', at: L(2), side: 'right'}]} lines={[{text: 'TOK · TOK · TOK', at: L(0, 0.2), size: 80, color: '#ffd59e'}, {text: '19 tahun · basah kuyup', at: L(1, 1), size: 48}]} />, sfx: 'thump'},
  {start: L(3, -0.3), el: <S.Dark lines={[{text: 'Adik?', at: L(3), size: 110, color: C.yellow}, {text: '"Untuk adikmu juga ada satu."', at: L(3, 3.5), size: 56, color: '#ffd59e'}]} />, sfx: 'boom'},
  {
    start: L(4, -0.3),
    el: (
      <T.Dialog
        set="room"
        left={[{who: 'kamu', face: 'serius'}]}
        right={[{who: 'laras', face: 'serius'}]}
        talks={[{name: 'Laras', who: 'laras', text: 'Ibu menitipkanku ke Bude sejak bayi, waktu keluarga kita sedang susah. Kalau jam ini berdetak, aku harus mencarimu.', at: L(5), side: 'right'}]}
        lines={[{text: '📁 Map Bu Ana · 🕰️ jam saku KEDUA', at: L(4, 2), size: 50, color: '#ffd59e'}]}
      />
    ),
  },
  {start: L(6, -0.3), el: <T.Whisper data={KILT} from={L(7)} to={L(8, 2)} ticker="📱 grafik saham" whispers={[{text: 'Kumpulkan pelan-pelan. Jangan sampai ritel sadar.', at: L(8)}]} lines={[{text: 'Grafik itu... berbisik', at: L(7, 1), size: 52}]} />, sfx: 'riser'},
  {start: L(9, -0.3), el: <Chapter at={L(9)} label="WHAT IF" sub="Bisa dengar isi pikiran bandar saham?" color="#d9a8ff" />, sfx: 'boom'},
  {start: L(10, -0.3), el: <S.Cards title={{text: 'ATURANNYA', at: L(10), size: 80}} cards={[{e: '📈', t: 'Lihat grafik', sub: 'dengar pikiran pengendalinya', at: L(11), color: '#9b59b6'}, {e: '⏱️', t: '1 jam', sub: 'sebelum mereka bertindak', at: L(12), color: C.yellow}]} />, sfx: 'whoosh'},
  {start: L(13, -0.3), el: <T.Whisper data={[4800, 4850, 4900, 4880, 4950, 5000, 4980, 5050, 5100, 5080]} from={L(14)} to={L(16)} ticker="BANK BESAR (fiktif)" color="#3b7be0" whispers={[{text: 'Laba kuartal ini bagus, tapi valuasinya sudah mahal. Tahan dulu.', at: L(15)}]} lines={[{text: 'HARI 1 · saham-saham besar', at: L(13), size: 54}, {text: 'Membosankan. Masuk akal.', at: L(16), size: 50, color: C.green}]} />},
  {start: L(17, -0.3), el: <T.Whisper data={KILT} from={L(17)} to={L(18, 2)} ticker="KILT · PT Kilat Sentosa (fiktif)" color="#9aa3b8" whispers={[{text: 'Sudah kita kumpulkan 60% barangnya. Minggu depan kita angkat. Siapkan cerita.', at: L(19)}]} lines={[{text: 'Rp50 · berbulan-bulan diam', at: L(17, 2), size: 50}]} />, sfx: 'thump'},
  {start: L(20, -0.3), el: <S.Dark lines={[{text: '"Cerita?"', at: L(20), size: 100, color: '#d9a8ff'}, {text: 'Cerita apa?', at: L(20, 1.2), size: 64}]} />},
  {start: L(22, -0.3), el: <T.Whisper data={PUMP.slice(0, 6)} from={L(22)} to={L(23, 2)} ticker="KILT" whispers={[]} lines={[{text: '50 → 60 → 80 · volume ramai', at: L(22), size: 52, color: C.green}]} />, sfx: 'whoosh'},
  {start: L(23, -0.3), el: <S.NewsRoom kicker="KABAR BURSA" title1="KILAT SENTOSA" title2="DIAKUISISI? (tanpa sumber)" headlineAt={L(23)} shockAt={L(23, 3)} />},
  {
    start: L(24, -0.3),
    el: (
      <Y.ChatHoax
        title="📣 Akun saham & influencer"
        msgs={[
          {text: '💎 PERMATA TERSEMBUNYI: $KILT', at: L(24, 1)},
          {text: 'Jangan sampai ketinggalan!! 🚀🚀🚀', at: L(24, 3)},
          {text: 'Target 500 perak, kawal sampai bulan', at: L(24, 5)},
        ]}
        lines={[]}
      />
    ),
  },
  {start: L(25, -0.3), el: <T.Whisper data={PUMP.slice(0, 7)} from={L(25)} to={L(25, 4)} ticker="KILT" whispers={[{text: 'Bagus. Biarkan mereka yang bercerita. Kita tunggu antrean beli.', at: L(25)}]} />},
  {
    start: L(26, -0.3),
    el: (
      <T.PhoneCall
        talks={[
          {name: 'Raka', who: 'raka', text: 'Bro! Aku masuk grup sinyal premium. Dua ratus ribu sebulan. Katanya KILT target lima ratus perak!', at: L(27), side: 'right'},
          {name: 'Raka', who: 'raka', text: 'Aku sudah masuk di seratus dua puluh. Kamu ikut nggak?', at: L(28), side: 'right'},
        ]}
      />
    ),
    sfx: 'thump',
  },
  {
    start: L(29, -0.3),
    el: (
      <T.Dialog
        set="street"
        left={[{who: 'kamu', pose: 'point', face: 'serius'}]}
        right={[{who: 'raka', pose: 'cheer', face: 'senang'}]}
        talks={[
          {name: 'Kamu', who: 'kamu', text: 'Rak, hati-hati. Saham itu digoreng. Ceritanya dibuat-buat.', at: L(31), side: 'left'},
          {name: 'Raka', who: 'raka', text: 'Ah, kamu cuma iri. Di grup semua sudah cuan. Admin-nya pamer mobil baru.', at: L(32), side: 'right'},
        ]}
      />
    ),
  },
  {start: L(33, -0.3), el: <T.Whisper data={PUMP} from={L(33)} to={L(33, 4)} ticker="KILT" whispers={[{text: 'Biarkan ritel masuk penuh. Lalu buang pelan-pelan. Bilang saja koreksi sehat.', at: L(34)}]} lines={[{text: 'Rp200 → Rp300', at: L(33), size: 60, color: C.green}]} />, sfx: 'whoosh'},
  {start: L(35, -0.3), el: <T.Balance label="KALAU KAMU IKUT MENUMPANG" sub="beli Rp300 · jual sebelum mereka" steps={[{at: L(35), v: 10000000}, {at: L(36, 2), v: 30000000}]} lines={[{text: '1 jam lebih cepat dari siapa pun', at: L(37), size: 50, color: C.yellow}]} />, sfx: 'ding'},
  {start: L(38, -0.3), el: <T.Dialog set="room" left={[{who: 'kamu', face: 'kaget'}]} right={[{who: 'laras', face: 'serius'}]} talks={[{name: 'Laras', who: 'laras', text: 'Kak, kalau Kakak ikut beli sekarang, uang Kakak datang dari mana nanti?', at: L(39), side: 'right'}]} />, sfx: 'thump'},
  {start: L(40, -0.3), el: <S.Split at={L(41)} left="PENJUAL DI PUCUK" right="PEMBELI DI PUCUK" lines={[{text: 'Setiap penjual butuh pembeli', at: L(41), size: 56}, {text: 'Pembeli terakhir: orang seperti Raka', at: L(42), size: 48, color: C.red}]} />, sfx: 'boom'},
  {start: L(43, -0.3), el: <S.Cards flow="out" title={{text: '3.000 ANGGOTA GRUP', at: L(43), size: 72, color: C.red}} cards={[{e: '👔', t: 'Karyawan', at: L(43, 2)}, {e: '🎓', t: 'Mahasiswa', at: L(43, 3)}, {e: '🏠', t: 'Ibu rumah tangga', at: L(43, 4)}, {e: '💳', t: 'Uang pinjaman', at: L(43, 6)}]} />},
  {start: L(44, -0.3), el: <T.Whisper data={DUMP.slice(0, 3)} from={L(45)} to={L(46, 3)} ticker="KILT · 09.00" color={C.yellow} whispers={[{text: 'Mulai buang. Sepuluh menit pertama tahan harganya. Lalu lepas semua.', at: L(46)}]} lines={[{text: 'Lalu tibalah hari itu', at: L(44), size: 56}]} />, sfx: 'riser'},
  {start: L(47, -0.3), el: <S.Dark lines={[{text: '⏱️ SATU JAM', at: L(47), size: 130, color: C.yellow}, {text: 'sebelum harga dibuang', at: L(47, 1.5), size: 56}]} />},
  {start: L(48, -0.3), el: <S.Cards title={{text: '3 PILIHAN', at: L(48), size: 84, color: C.yellow}} cards={[{e: '🤫', t: 'Diam & untung', sub: 'tak ada yang tahu', at: L(49), color: C.red}, {e: '📞', t: 'Selamatkan Raka', sub: '2.999 lainnya terjebak', at: L(50), color: C.yellow}, {e: '📝', t: 'Lapor', sub: 'tanpa bukti, bisa diperiksa', at: L(51), color: C.green}]} />, sfx: 'riser'},
  {start: L(52, -0.3), el: <T.Dialog set="room" left={[{who: 'kamu', face: 'serius'}]} right={[{who: 'laras', face: 'senang'}]} talks={[{name: 'Laras', who: 'laras', text: 'Ibu bilang, Kakak selalu memilih yang benar, walaupun lebih sulit.', at: L(53), side: 'right'}]} lines={[{text: 'Tidak membeli satu lembar pun', at: L(54), size: 50, color: C.green}]} />},
  {start: L(55, -0.3), el: <T.PhoneCall talks={[{name: 'Kamu', who: 'kamu', text: 'Rak, jual sekarang. Lalu kirim tangkapan layar grup itu ke aku. Semua pesan admin, semua janji target harga.', at: L(56), side: 'left'}]} />, sfx: 'thump'},
  {start: L(57, -0.3), el: <S.Cards flow="in" title={{text: 'LAPORAN KE BURSA & OJK', at: L(57), size: 66, color: C.green}} cards={[{e: '📊', t: 'Transaksi tidak wajar', at: L(57, 2)}, {e: '📰', t: 'Berita tanpa sumber', at: L(57, 4)}, {e: '💬', t: 'Bukti grup sinyal', at: L(57, 6)}]} />, sfx: 'whoosh'},
  {start: L(59, -0.3), el: <T.Whisper data={DUMP} from={L(59)} to={L(59, 5)} ticker="KILT · 10.00" color={C.red} whispers={[]} lines={[{text: '300 → 200 → 100', at: L(59), size: 64, color: C.red}, {text: 'Admin: "koreksi sehat" → grup dihapus', at: L(60, 3), size: 46}]} />, sfx: 'boom'},
  {start: L(61, -0.3), el: <S.Dark lines={[{text: '⛔ PERDAGANGAN DIHENTIKAN SEMENTARA', at: L(61), size: 60, color: C.red}, {text: 'Otoritas memeriksa dugaan manipulasi', at: L(62), size: 50}, {text: 'Laporan pertama? Darimu.', at: L(63), size: 64, color: C.green}]} />, sfx: 'thump'},
  {start: L(64, -0.3), el: <S.Lessons items={[{e: '🔥', t: 'Pola gorengan', sub: 'Diam lama → naik tajam + berita tanpa sumber', at: L(65)}, {e: '📣', t: 'Grup sinyal & pom-pom', sub: 'Kamu bisa jadi tempat mereka jual', at: L(66)}, {e: '⚠️', t: 'Pengumuman bursa', sub: 'Peringatan, bukan diskon', at: L(67)}, {e: '❓', t: 'Siapa penjualnya?', sub: 'Dan kenapa?', at: L(68)}]} />},
  {start: L(69, -0.3), el: <S.Dark lines={[{text: '🕰️ Jam saku kedua', at: L(69), size: 60, color: '#ffd59e'}, {text: '"Untuk penjaga yang mendengar"', at: L(70), size: 60, color: '#d9a8ff'}]} />, sfx: 'riser'},
  {start: L(71, -0.3), el: <T.Whisper data={DUMP} from={L(71)} to={L(71, 2)} ticker="KILT" color={C.red} whispers={[{text: 'Kamu pikir aku tidak tahu siapa yang melapor, Nak?', at: L(72)}]} lines={[{text: 'Suara yang sangat kamu kenal...', at: L(71, 2), size: 50}]} />, sfx: 'boom'},
  {start: L(73, -0.3), el: <S.TwoDoors a={{text: 'IKUT UNTUNG', at: L(73, 3)}} b={{text: 'LAPOR', at: L(73, 4)}} lines={[{text: 'Dengar pikiran bandar 1 jam, apa pilihanmu?', at: L(73), size: 50}]} comment={{text: 'Tulis jawabanmu di komentar', at: L(74)}} />, sfx: 'whoosh'},
  {start: L(75, -0.3), el: <S.Dark lines={[{text: 'Semua tokoh & perusahaan fiktif.', at: L(75), size: 56}, {text: 'Bukan ajakan membeli/menjual saham.', at: L(75, 2), size: 48}]} />},
  {start: L(76, -0.3), el: <S.Outro shareAt={L(76)} subAt={L(76, 2)} byeAt={L(77)} />},
];
