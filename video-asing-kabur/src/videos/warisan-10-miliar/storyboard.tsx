import {Chapter} from '../../asing-kabur/scenes';
import * as S from '../../rupiah/scenes';
import {C} from '../../theme';
import * as X from '../custom';
import * as Y from '../custom2';
import * as T from '../story';
import {Seg} from '../WhatIf';

// What If Kamu Tiba-tiba Punya Rp10 Miliar Besok Pagi? (cerita fiksi)
export const timeline = (L: (i: number, d?: number) => number): Seg[] => [
  {start: 0, el: <S.Dark lines={[{text: '⏰ 06.12', at: L(0, 0.3), size: 120, color: '#ffd59e'}, {text: '📳 Ponsel bergetar...', at: L(0, 2), size: 60}, {text: '🔔 Notifikasi dari bank', at: L(1), size: 60, color: C.green}]} />},
  {start: L(2, -0.3), el: <T.Balance label="SALDO REKENING" sub="▲ dana masuk" steps={[{at: L(2, -0.3), v: 2350000}, {at: L(2, 0.5), v: 10002350000}]} lines={[{text: 'Hitung nolnya. Sekali. Dua kali. Tiga kali.', at: L(3), size: 48}]} />, sfx: 'boom'},
  {
    start: L(4, -0.3),
    el: (
      <T.PhoneCall
        talks={[
          {name: 'Notaris', who: 'notaris', text: 'Saya notaris yang mengurus wasiat almarhum Om Wiryo, kerabat jauh keluarga Bapak.', at: L(5), side: 'right'},
          {name: 'Notaris', who: 'notaris', text: 'Beliau menunjuk Anda sebagai penerima seluruh hartanya.', at: L(6), side: 'right'},
        ]}
      />
    ),
    sfx: 'thump',
  },
  {start: L(7, -0.3), el: <S.Dark lines={[{text: 'Om Wiryo... siapa?', at: L(7), size: 70, color: '#ffd59e'}]} />},
  {start: L(8, -0.3), el: <Chapter at={L(8)} label="WHAT IF" sub="Besok pagi kamu punya Rp10 miliar?" color={C.yellow} />, sfx: 'boom'},
  {start: L(9, -0.3), el: <S.Cards title={{text: 'ATURANNYA', at: L(9), size: 80}} cards={[{e: '✅', t: 'Sah', sub: 'sudah dipotong pajak', at: L(10), color: C.green}, {e: '💰', t: 'Milikmu', sub: 'bebas dipakai', at: L(10, 2), color: C.green}, {e: '📢', t: 'Semua orang', sub: 'AKAN TAHU', at: L(11), color: C.red}]} />, sfx: 'whoosh'},
  {start: L(12, -0.3), el: <T.Dialog set="warung" left={[{who: 'kamu', face: 'senang'}]} right={[{who: 'joko', face: 'senang'}, {who: 'ana', face: 'serius'}]} talks={[{name: 'Bu Ana', who: 'ana', text: 'Nak, Ibu ikut senang. Tapi uang besar mengundang masalah besar.', at: L(14), side: 'right'}]} lines={[{text: 'HARI PERTAMA', at: L(12), size: 64}]} />},
  {start: L(15, -0.3), el: <S.Dark lines={[{text: '"Masalah apa?"', at: L(15), size: 70}, {text: 'Bunga deposito > gaji setahun', at: L(15, 2), size: 56, color: C.green}]} />},
  {start: L(16, -0.3), el: <S.PriceGrid items={[{e: '🚗', n: 'Mobil', p: 900000000, at: L(16), pct: 0}, {e: '🏠', n: 'Rumah orang tua', p: 600000000, at: L(16, 2), pct: 0}, {e: '🏡', n: 'Rumahmu', p: 500000000, at: L(16, 4), pct: 0}]} lines={[{text: 'MINGGU PERTAMA', at: L(16), size: 64, color: C.yellow}]} note="Rp2 miliar dalam 7 hari" />, sfx: 'whoosh'},
  {
    start: L(18, -0.3),
    el: (
      <Y.ChatHoax
        title="👨‍👩‍👧 Keluarga Besar"
        msgs={[
          {text: '[Foto] Mobil baru keponakan kita 😍', at: L(19)},
          {text: 'Wah sukses! Traktir dong 😁', at: L(19, 2)},
          {text: 'Katanya dapat warisan miliaran ya?', at: L(20)},
        ]}
        lines={[{text: 'Kabar mulai menyebar', at: L(18), size: 56}]}
      />
    ),
  },
  {start: L(21, -0.3), el: <T.PhoneCall talks={[{name: 'Om Darto', who: 'darto', text: 'Keponakanku yang sukses! Om butuh modal sedikit. Lima ratus juta saja. Nanti Om kembalikan.', at: L(21), side: 'right'}]} />, sfx: 'thump'},
  {start: L(22, -0.3), el: <X.People items={[{t: 'Om Darto', face: 'senang', jacket: '#6b8e23', at: L(22)}, {t: 'Sepupu', face: 'serius', jacket: '#ff7aa8', at: L(23)}, {t: 'Teman SMA', face: 'senang', jacket: '#8e44ad', at: L(23, 2)}, {t: 'Tetangga', face: 'sedih', jacket: '#16a085', at: L(23, 4)}]} lines={[{text: 'Yang butuh vs yang coba-coba?', at: L(24), size: 52}]} />, sfx: 'whoosh'},
  {start: L(25, -0.3), el: <S.Cards flow="out" title={{text: 'TIDAK ENAK MENOLAK...', at: L(25), size: 70, color: C.red}} cards={[{e: '👨', t: 'Om Darto', sub: 'Rp500 jt', at: L(25, 1.5)}, {e: '🎓', t: 'Sepupu', sub: 'kuliah', at: L(25, 3)}, {e: '☕', t: 'Teman SMA', sub: 'kafe', at: L(26)}, {e: '⏳', t: '± Rp2 M', sub: 'belum kembali', at: L(26, 2)}]} />},
  {start: L(27, -0.3), el: <T.Dialog set="house" left={[{who: 'kamu', face: 'sedih'}]} right={[{who: 'darto', face: 'serius'}]} talks={[{name: 'Om Darto', who: 'darto', text: 'Sabar dong. Usaha kan butuh waktu. Masa sama keluarga sendiri hitung-hitungan?', at: L(27), side: 'right'}]} lines={[{text: 'Semua senyum terasa menghitung', at: L(28), size: 48}]} />},
  {start: L(29, -0.3), el: <T.Dialog set="room" left={[{who: 'kamu', face: 'serius'}]} right={[{who: 'sales', pose: 'point', face: 'senang'}]} talks={[{name: 'Sales', who: 'sales', text: 'Program robot trading kami. Untung PASTI 3% per bulan. Tanpa risiko.', at: L(30), side: 'right'}]} lines={[{text: 'Tawaran paling menggoda', at: L(29), size: 52, color: C.yellow}]} />, sfx: 'ding'},
  {start: L(31, -0.3), el: <T.Balance label="APLIKASI ROBOT TRADING" sub="▲ untung 3%/bulan" steps={[{at: L(31), v: 1000000000}, {at: L(32), v: 1060000000}, {at: L(33), v: 3180000000}]} lines={[{text: '36% setahun?!', at: L(31, 2), size: 60, color: C.green}, {text: 'Kamu menambah jadi Rp3 miliar', at: L(33), size: 48}]} />},
  {start: L(34, -0.3), el: <S.Dark lines={[{text: '⚠️ Aplikasi tidak dapat dibuka', at: L(34), size: 60, color: C.red}, {text: 'Situs hilang · nomor mati · kantor kosong', at: L(35), size: 48}, {text: 'Rp3 MILIAR LENYAP', at: L(36), size: 110, color: C.red}]} />, sfx: 'boom'},
  {start: L(37, -0.3), el: <S.Domino items={[{e: '💸', t: 'Korban 1 setor'}, {e: '🎁', t: 'Diberi "untung"'}, {e: '📣', t: 'Ajak korban baru'}, {e: '💰', t: 'Uang korban baru'}, {e: '🏃', t: 'Pengelola kabur'}]} startAt={L(37, 1)} lines={[{text: 'Raka: "Itu pola lama, Bro"', at: L(37), size: 52}]} />, sfx: 'whoosh'},
  {start: L(38, -0.3), el: <S.Cards flow="out" title={{text: 'BIAYA GAYA HIDUP', at: L(38), size: 72, color: C.red}} cards={[{e: '⚡', t: 'Listrik', sub: 'jutaan/bulan', at: L(38, 2)}, {e: '🚗', t: 'Perawatan mobil', at: L(39)}, {e: '🧾', t: 'Pajak & pembantu', at: L(39, 2)}, {e: '😳', t: 'Gengsi', sub: 'sulit diturunkan', at: L(39, 4)}]} />},
  {start: L(40, -0.3), el: <T.Dialog set="house" left={[{who: 'darto', pose: 'point', face: 'serius'}]} right={[{who: 'kamu', face: 'sedih'}]} talks={[]} lines={[{text: 'Keluarga mulai retak', at: L(40), size: 60, color: C.red}, {text: '"Dia berubah sejak kaya"', at: L(41), size: 52}]} />, sfx: 'thump'},
  {start: L(42, -0.3), el: <T.PhoneCall talks={[{name: 'Pak Joko', who: 'joko', text: 'Ayah tidak butuh rumah besar, Nak. Ayah cuma kangen kamu datang hari Minggu seperti dulu.', at: L(43), side: 'right'}]} />},
  {start: L(44, -0.3), el: <S.BigPrice e="🏦" label="Sisa uang setelah 6 bulan" from={10000000000} to={2000000000} at={L(45)} delta="-80%" lines={[{text: 'ENAM BULAN KEMUDIAN', at: L(44), size: 60}, {text: 'Bisa habis dalam beberapa tahun', at: L(46), size: 46, color: C.red}]} />, sfx: 'boom'},
  {start: L(47, -0.3), el: <T.Dialog set="warung" left={[{who: 'kamu', face: 'serius'}]} right={[{who: 'raka', face: 'serius'}]} talks={[{name: 'Raka', who: 'raka', text: 'Aku sudah lama ingin buka usaha logistik kecil. Aku sudah hitung semua. Aku butuh modal. Dua miliar.', at: L(48), side: 'right'}]} lines={[{text: 'Satu-satunya yang tak pernah meminta', at: L(49), size: 46}]} />},
  {start: L(50, -0.3), el: <T.Dialog set="house" left={[{who: 'kamu', face: 'sedih'}]} right={[{who: 'ana', pose: 'sit', face: 'sedih'}]} talks={[]} lines={[{text: 'Pensiun Bu Ana kecil', at: L(50, 1), size: 56}, {text: '🦵 Lutut perlu operasi', at: L(51), size: 56, color: C.red}]} />},
  {start: L(52, -0.3), el: <S.TwoDoors a={{text: 'USAHA RAKA', at: L(52)}} b={{text: 'BU ANA', at: L(53)}} lines={[{text: 'Sisa Rp2 miliar untuk siapa?', at: L(52, -0.2), size: 52}]} />, sfx: 'riser'},
  {
    start: L(55, -0.3),
    el: (
      <T.Dialog
        set="warung"
        left={[{who: 'kamu', pose: 'point', face: 'serius'}]}
        right={[{who: 'raka', face: 'senang'}]}
        talks={[
          {name: 'Kamu', who: 'kamu', text: 'Aku tidak bisa kasih dua miliar. Tapi aku bisa jadi investor kecil. Tiga ratus juta, dengan perjanjian tertulis dan laporan tiap bulan.', at: L(56), side: 'left'},
          {name: 'Raka', who: 'raka', text: 'Justru begitu, Bro. Kalau kamu kasih semuanya cuma-cuma, aku malah takut gagal.', at: L(58), side: 'right'},
        ]}
        lines={[{text: 'Keputusan yang tak terbayangkan', at: L(55), size: 48}]}
      />
    ),
    sfx: 'ding',
  },
  {start: L(59, -0.3), el: <S.Cards flow="in" title={{text: 'DIBAGI DENGAN TERTIB', at: L(59), size: 72, color: C.green}} cards={[{e: '🛟', t: 'Dana darurat', sub: '12 bulan', at: L(60)}, {e: '🏥', t: 'Kesehatan ortu', at: L(60, 2)}, {e: '🤝', t: 'Usaha Raka', sub: 'Rp300 jt', at: L(60, 4)}, {e: '🌱', t: 'Investasi legal', sub: 'yang dimengerti', at: L(61)}]} />, sfx: 'whoosh'},
  {start: L(62, -0.3), el: <T.Dialog set="house" left={[{who: 'kamu', face: 'senang'}]} right={[{who: 'joko', pose: 'cheer', face: 'senang'}, {who: 'ana', face: 'senang'}]} talks={[]} lines={[{text: 'Minggu berikutnya · bawa martabak 🥞', at: L(62), size: 54}, {text: 'Benar-benar kaya', at: L(62, 5), size: 70, color: C.green}]} />, sfx: 'ding'},
  {start: L(63, -0.3), el: <S.Lessons items={[{e: '📈', t: 'Gaya hidup naik cepat', sub: 'Sumber utama bangkrut', at: L(64)}, {e: '🚩', t: '"Untung pasti"', sub: 'Cek izin di OJK', at: L(65)}, {e: '🤝', t: 'Pinjam ke keluarga', sub: 'Ikhlas + tercatat', at: L(66)}, {e: '🪜', t: 'Urutan', sub: 'Darurat → utang → lindungi → investasi', at: L(67)}]} />},
  {start: L(68, -0.3), el: <T.PhoneCall talks={[{name: 'Notaris', who: 'notaris', text: 'Maaf, Pak. Ada satu amplop lagi dari almarhum. Seharusnya dibuka bersama surat wasiat. Tapi terselip.', at: L(70), side: 'right'}]} />, sfx: 'thump'},
  {start: L(71, -0.3), el: <S.Dark lines={[{text: '✉️ Amplop kedua', at: L(71), size: 64, color: '#ffd59e'}, {text: '"Uang ini bukan hadiah. Ini ujian."', at: L(72), size: 60, color: '#fff'}]} />, sfx: 'riser'},
  {start: L(72, 1), el: <S.Dark lines={[{text: '"...Dan yang mengirimku', at: L(72, 1.5), size: 60, color: '#ffd59e'}, {text: 'adalah pemilik toko jam."', at: L(72, 3), size: 70, color: C.yellow}]} />, sfx: 'boom'},
  {start: L(73, -0.3), el: <S.TwoDoors a={{text: 'BELANJA', at: L(73, 3)}} b={{text: 'SIMPAN', at: L(73, 4)}} lines={[{text: 'Punya Rp10 miliar, apa yang pertama?', at: L(73), size: 52}]} comment={{text: 'Tulis jawabanmu di komentar', at: L(74)}} />, sfx: 'whoosh'},
  {start: L(75, -0.3), el: <S.Dark lines={[{text: 'Semua tokoh & angka fiktif.', at: L(75), size: 56}, {text: 'Bukan ajakan membeli produk investasi.', at: L(75, 2), size: 48}]} />},
  {start: L(76, -0.3), el: <S.Outro shareAt={L(76)} subAt={L(76, 2)} byeAt={L(77)} />},
];
