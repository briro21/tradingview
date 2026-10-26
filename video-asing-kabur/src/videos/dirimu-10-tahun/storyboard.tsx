import {Chapter} from '../../asing-kabur/scenes';
import * as S from '../../rupiah/scenes';
import {C} from '../../theme';
import * as Y from '../custom2';
import * as T from '../story';
import {Seg} from '../WhatIf';

// What If Kamu Bertemu Dirimu Sendiri 10 Tahun dari Sekarang? (penutup seri Pak Harso)
export const timeline = (L: (i: number, d?: number) => number): Seg[] => [
  {start: 0, el: <T.Dialog set="room" left={[{who: 'kamu', face: 'kaget'}]} right={[]} talks={[]} lines={[{text: '🌧️ Malam · hujan deras', at: L(0, 0.3), size: 60}, {text: 'TOK · TOK · TOK', at: L(0, 2.5), size: 90, color: '#ffd59e'}]} />, sfx: 'thump'},
  {start: L(1, -0.3), el: <T.Dialog set="room" left={[{who: 'kamu', face: 'kaget'}]} right={[{who: 'dirimu', face: 'sedih'}]} talks={[]} lines={[{text: '± 35 tahun · lusuh · mata cekung', at: L(1, 2), size: 50}, {text: 'Bekas luka di dagu... sama denganmu', at: L(2, 2), size: 48, color: '#ffd59e'}]} />, sfx: 'whoosh'},
  {start: L(3, -0.3), el: <T.Dialog set="room" left={[{who: 'kamu', face: 'kaget'}]} right={[{who: 'dirimu', face: 'senang'}]} talks={[{name: 'Dirimu (10 tahun lagi)', who: 'dirimu', text: 'Jangan kaget. Aku kamu. Sepuluh tahun dari sekarang.', at: L(4), side: 'right'}]} lines={[{text: '🕰️ Jam saku Pak Harso', at: L(3), size: 52, color: '#ffd59e'}]} />, sfx: 'boom'},
  {start: L(5, -0.3), el: <S.Dark lines={[{text: '"Ujian terakhir:', at: L(5), size: 70, color: '#ffd59e'}, {text: 'DIRIMU SENDIRI."', at: L(5, 2), size: 100, color: C.yellow}]} />},
  {start: L(6, -0.3), el: <Chapter at={L(6)} label="WHAT IF" sub="Bertemu dirimu 10 tahun lagi?" color="#7fb2ff" />, sfx: 'boom'},
  {start: L(7, -0.3), el: <S.Cards title={{text: 'ATURANNYA', at: L(7), size: 80}} cards={[{e: '7️⃣', t: '7 hari', sub: 'lalu dia pergi', at: L(8), color: C.yellow}, {e: '🔄', t: 'Ubah kebiasaan', sub: 'hari ini', at: L(9), color: C.green}, {e: '👔', t: 'Dia berubah', sub: 'baju · wajah · dompet', at: L(9, 3), color: '#7fb2ff'}]} />, sfx: 'whoosh'},
  {start: L(10, -0.3), el: <T.Dialog set="room" left={[{who: 'kamu', face: 'serius'}]} right={[{who: 'dirimu', pose: 'point', face: 'serius'}]} talks={[{name: 'Dirimu', who: 'dirimu', text: 'Semuanya dimulai dari situ. Dari tombol bayar nanti.', at: L(11), side: 'right'}]} lines={[{text: '📱 Dia menatap ponselmu', at: L(10), size: 52}]} />},
  {start: L(12, -0.3), el: <S.Cards flow="out" title={{text: 'HARI 1 · PAYLATER', at: L(12), size: 74, color: C.red}} cards={[{e: '👟', t: 'Sepatu', sub: 'cicil 3×', at: L(13)}, {e: '📱', t: 'Ponsel baru', sub: 'cicil 12×', at: L(13, 2)}, {e: '📲', t: '1 → 3 → 5', sub: 'aplikasi', at: L(14)}]} />, sfx: 'whoosh'},
  {start: L(15, -0.3), el: <T.Balance label="UTANG DIRIMU" sub="▲ bunga + denda harian" steps={[{at: L(15), v: 2000000}, {at: L(16), v: 4300000}, {at: L(16, 3), v: 7000000}]} lines={[{text: 'Gali lubang, tutup lubang', at: L(15), size: 56, color: C.red}]} />},
  {
    start: L(17, -0.3),
    el: (
      <Y.ChatHoax
        title="📵 Nomor tidak dikenal"
        msgs={[
          {text: 'SEGERA BAYAR TAGIHAN ANDA HARI INI!!', at: L(17)},
          {text: 'Kami akan hubungi keluarga & kantor Anda', at: L(17, 2)},
          {text: 'Bu, anak Ibu punya utang ke kami.', at: L(17, 4)},
        ]}
        lines={[{text: 'Penagih menghubungi semua kontak', at: L(17), size: 48}]}
      />
    ),
    sfx: 'thump',
  },
  {start: L(18, -0.3), el: <T.Dialog set="house" left={[{who: 'dirimu', face: 'sedih'}]} right={[{who: 'ana', pose: 'headInHands', face: 'sedih'}]} talks={[{name: 'Dirimu', who: 'dirimu', text: 'Ibu menangis waktu ditelepon penagih. Itu pertama kalinya aku melihat Ibu malu karena aku.', at: L(18), side: 'left'}]} />},
  {start: L(19, -0.3), el: <T.FutureSelf start={0.12} steps={[{at: L(20), label: 'Hapus 3 aplikasi paylater'}]} lines={[{text: '3 aplikasi paylater · semua aktif', at: L(19), size: 48}]} />, sfx: 'ding'},
  {start: L(22, -0.3), el: <T.Dialog set="room" left={[{who: 'kamu', face: 'serius'}]} right={[{who: 'dirimu', face: 'sedih'}]} talks={[{name: 'Dirimu', who: 'dirimu', text: 'Waktu utang sudah tidak tertolong, aku mencari jalan pintas. Situs yang katanya gampang menang.', at: L(23), side: 'right'}]} lines={[{text: 'HARI 2 · YANG PALING DISESALI', at: L(22), size: 56, color: C.red}]} />},
  {start: L(24, -0.3), el: <T.Balance label="SALDO DIRIMU" sub="▼ mengejar kekalahan" steps={[{at: L(24), v: 2000000}, {at: L(24, 1.5), v: 2500000}, {at: L(25), v: 900000}, {at: L(25, 3), v: 0}]} lines={[{text: 'Menang Rp500 ribu dalam 5 menit...', at: L(24), size: 48, color: C.green}, {text: '...lalu tidak bisa berhenti', at: L(25), size: 48, color: C.red}]} />},
  {start: L(26, -0.3), el: <S.Scale tiltAt={L(26, 1)} dollars={7} lines={[{text: 'Sistemnya dibuat supaya kamu KALAH', at: L(26), size: 54, color: C.red}, {text: 'Tabungan · motor · cincin Bu Ana: habis', at: L(27), size: 46}]} />, sfx: 'boom'},
  {start: L(28, -0.3), el: <T.FutureSelf start={0.3} steps={[{at: L(29), label: 'Blokir iklan judi online'}, {at: L(29, 3), label: 'Cerita ke Bu Ana'}]} lines={[{text: 'Iklan minggu lalu... hampir kamu klik', at: L(28), size: 46}]} />, sfx: 'ding'},
  {start: L(31, -0.3), el: <S.PriceGrid items={[{e: '☕', n: 'Kopi', p: 450000, at: L(32), pct: 0}, {e: '🛵', n: 'Ojek', p: 250000, at: L(32, 1.5), pct: 0}, {e: '📺', n: 'Langganan', p: 150000, at: L(32, 3), pct: 0}, {e: '🛍️', n: 'Diskon & jajan', p: 300000, at: L(32, 4.5), pct: 0}]} lines={[{text: 'HARI 3 · MENGHITUNG BERSAMA', at: L(31), size: 58}]} note="> Rp1 juta/bulan yang tak terasa" />, sfx: 'whoosh'},
  {start: L(34, -0.3), el: <S.LineChart data={[0, 12.5, 26, 40.5, 56, 73, 91, 110, 131, 153, 177]} labels={[[0, 'Tahun 0'], [10, 'Tahun 10']]} from={L(34, 1)} to={L(35, 3)} min={0} max={200} color={C.green} lines={[{text: 'Rp1 juta/bulan, rutin 10 tahun', at: L(34), size: 50, color: C.green}, {text: 'BUNGA MAJEMUK', at: L(35), size: 70, color: C.green}]} caption="Ilustrasi (juta rupiah), asumsi imbal hasil ±7%/tahun, tidak dijamin." />},
  {start: L(36, -0.3), el: <S.Split at={L(36, 1)} left="UTANG" right="TABUNGAN" lines={[{text: 'Bunga majemuk bekerja DUA ARAH', at: L(36), size: 56}]} />},
  {start: L(37, -0.3), el: <T.FutureSelf start={0.6} steps={[{at: L(37, 2), label: 'Autodebet Rp1 juta tiap gajian'}]} lines={[{text: 'Rekening yang tak bisa diambil lewat ponsel', at: L(37), size: 46}]} />, sfx: 'ding'},
  {start: L(39, -0.3), el: <Y.ChatHoax title="💬 Raka" msgs={[{text: 'Bro, boleh pinjam 3 juta? Mendesak 🙏', at: L(40)}]} lines={[{text: 'HARI 4', at: L(39), size: 70}, {text: 'Raka tak pernah meminjam sebelumnya', at: L(41), size: 46, color: C.red}]} />, sfx: 'thump'},
  {start: L(42, -0.3), el: <T.Dialog set="room" left={[{who: 'kamu', face: 'kaget'}]} right={[{who: 'dirimu', face: 'kaget'}]} talks={[{name: 'Dirimu', who: 'dirimu', text: 'Di masaku, Raka juga terjerat. Pinjol, lalu judi. Aku tidak sempat menolongnya.', at: L(43), side: 'right'}]} />},
  {
    start: L(44, -0.3),
    el: (
      <T.Dialog
        set="house"
        left={[{who: 'kamu', face: 'serius'}]}
        right={[{who: 'raka', pose: 'headInHands', face: 'sedih'}]}
        talks={[{name: 'Raka', who: 'raka', text: 'Aku malu, Bro. Awalnya cuma satu aplikasi. Sekarang aku nggak tahu lagi utangku berapa.', at: L(45), side: 'right'}]}
        lines={[{text: 'Bukan transfer. Kamu datang.', at: L(44), size: 50, color: C.green}]}
      />
    ),
  },
  {start: L(46, -0.3), el: <S.Cards flow="in" title={{text: 'MENOLONG RAKA', at: L(46), size: 76, color: C.green}} cards={[{e: '📝', t: 'Catat semua utang', at: L(46, 1)}, {e: '🔍', t: 'Cek izin OJK', sub: '2 ilegal', at: L(47)}, {e: '📞', t: 'Layanan pengaduan', at: L(48)}, {e: '🧾', t: 'Susun ulang cicilan', at: L(48, 3)}]} />, sfx: 'whoosh'},
  {start: L(49, -0.3), el: <T.FutureSelf start={0.92} steps={[]} fadeAt={L(50)} lines={[{text: 'Tubuhnya mulai memudar...', at: L(50), size: 54}]} />, sfx: 'riser'},
  {
    start: L(51, -0.3),
    el: (
      <T.Dialog
        set="room"
        left={[{who: 'kamu', face: 'serius'}]}
        right={[{who: 'dirimu', face: 'serius'}]}
        talks={[
          {name: 'Dirimu', who: 'dirimu', text: 'Waktuku hampir habis. Aku bisa pulang membawa satu pesan. Hanya satu.', at: L(51), side: 'right'},
          {name: 'Dirimu', who: 'dirimu', text: 'Untuk kita, atau untuk Raka di masaku?', at: L(52), side: 'right'},
        ]}
      />
    ),
  },
  {start: L(53, -0.3), el: <S.TwoDoors a={{text: 'UNTUK DIRIKU', at: L(54)}} b={{text: 'UNTUK RAKA', at: L(55)}} lines={[{text: 'Dilema terakhir', at: L(53), size: 60, color: C.yellow}]} />, sfx: 'riser'},
  {
    start: L(56, -0.3),
    el: (
      <T.Dialog
        set="room"
        left={[{who: 'kamu', face: 'serius'}]}
        right={[{who: 'kamu', face: 'senang'}]}
        talks={[
          {name: 'Kamu', who: 'kamu', text: 'Bawa pesan untuk Raka. Aku sudah tahu apa yang harus kulakukan.', at: L(57), side: 'left'},
          {name: 'Dirimu', who: 'kamu', text: 'Kamu tahu? Pak Harso juga dulu memilih seperti itu. Pada akhirnya.', at: L(59), side: 'right'},
        ]}
        lines={[{text: 'Kemeja rapi · sepatu utuh · wajah cerah', at: L(56), size: 46, color: C.green}]}
      />
    ),
    sfx: 'ding',
  },
  {start: L(60, -0.3), el: <S.Dark lines={[{text: 'Dia menghilang.', at: L(60), size: 70}, {text: '🕰️ Hanya jam saku di meja', at: L(60, 2), size: 56, color: '#ffd59e'}]} />, sfx: 'boom'},
  {start: L(61, -0.3), el: <S.Lessons items={[{e: '💳', t: 'Paylater/pinjol', sub: 'Uang masa depan + bunga', at: L(62)}, {e: '🔍', t: 'Cek OJK', sub: 'Hindari pinjol ilegal', at: L(63)}, {e: '🎰', t: 'Judi online', sub: 'Dirancang untuk kalah', at: L(64)}, {e: '🌱', t: 'Bunga majemuk', sub: 'Mulai kecil, mulai hari ini', at: L(65)}]} />},
  {start: L(66, -0.3), el: <S.Dark lines={[{text: 'Bagian belakang jam saku...', at: L(66), size: 56}, {text: 'Sebuah nama terukir', at: L(67), size: 64, color: '#ffd59e'}]} />, sfx: 'riser'},
  {start: L(68, -0.3), el: <S.Dark lines={[{text: 'NAMAMU.', at: L(68), size: 160, color: C.yellow}, {text: '"Penjaga jam berikutnya"', at: L(69), size: 60, color: '#ffd59e'}]} />, sfx: 'boom'},
  {start: L(70, -0.3), el: <T.TimeWarp from={2026} to={2026} at={L(70)} lines={[{text: 'TOK · TOK · TOK', at: L(70, 2), size: 80, color: '#ffd59e'}]} />, sfx: 'thump'},
  {start: L(71, -0.3), el: <S.TwoDoors a={{text: 'HAPUS PAYLATER', at: L(71, 3)}} b={{text: 'MULAI NABUNG', at: L(71, 4)}} lines={[{text: 'Satu kebiasaan apa yang kamu ubah malam ini?', at: L(71), size: 48}]} comment={{text: 'Tulis jawabanmu di komentar', at: L(72)}} />, sfx: 'whoosh'},
  {start: L(73, -0.3), el: <S.Dark lines={[{text: 'Terjerat utang atau judi online?', at: L(73), size: 56}, {text: 'Ceritakan ke orang terdekat & cari bantuan resmi.', at: L(73, 2.5), size: 46, color: C.green}]} />},
  {start: L(74, -0.3), el: <S.Outro shareAt={L(74)} subAt={L(74, 2)} byeAt={L(75)} />},
];
