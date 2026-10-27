import {Chapter} from '../../asing-kabur/scenes';
import * as S from '../../rupiah/scenes';
import {C} from '../../theme';
import * as Y from '../custom2';
import * as T from '../story';
import {Seg} from '../WhatIf';

// What If Semua Orang Indonesia Berhenti Belanja Selama 30 Hari? (paradoks hemat; cerita fiksi)
export const timeline = (L: (i: number, d?: number) => number): Seg[] => [
  {start: 0, el: <T.Dialog set="room" left={[{who: 'kamu', pose: 'point', face: 'senang'}]} right={[]} talks={[{name: 'Kamu', who: 'kamu', text: 'Tantangan: 30 hari tanpa belanja. Cuma kebutuhan pokok. Siapa berani?', at: L(1), side: 'left'}]} />},
  {start: L(2, -0.3), el: <T.Balance prefix="▶ " label="PENONTON VIDEOMU" sub="▲ viral semalam" steps={[{at: L(2, -0.3), v: 100}, {at: L(3), v: 50000000}]} lines={[{text: 'Pagi harinya...', at: L(3), size: 56}]} />, sfx: 'boom'},
  {
    start: L(4, -0.3),
    el: (
      <Y.ChatHoax
        title="🔥 Trending #1 · #30HariTanpaBelanja"
        msgs={[
          {text: 'Artis A: Aku ikut! 💪', at: L(4, 1)},
          {text: 'Pejabat B: Mari berhemat bersama', at: L(4, 3)},
          {text: 'Grup Keluarga: Mulai hari ini nggak jajan ya!', at: L(4, 5)},
        ]}
        lines={[]}
      />
    ),
    sfx: 'whoosh',
  },
  {start: L(5, -0.3), el: <T.Dialog set="room" left={[{who: 'kamu', face: 'kaget'}]} right={[{who: 'laras', pose: 'cheer', face: 'senang'}]} talks={[{name: 'Laras', who: 'laras', text: 'Kak, satu Indonesia ikut tantangan Kakak.', at: L(6), side: 'right'}]} />, sfx: 'ding'},
  {start: L(7, -0.3), el: <Chapter at={L(7)} label="WHAT IF" sub="Semua orang berhenti belanja 30 hari?" color={C.green} />, sfx: 'boom'},
  {start: L(8, -0.3), el: <S.Cards title={{text: 'ATURANNYA', at: L(8), size: 80}} cards={[{e: '🍚', t: 'Boleh', sub: 'makanan · obat · listrik', at: L(9), color: C.green}, {e: '👕', t: 'Tidak ada', sub: 'baju baru', at: L(10), color: C.red}, {e: '🍜', t: 'Tidak ada', sub: 'makan di luar', at: L(10, 1.5), color: C.red}, {e: '✈️', t: 'Tidak ada', sub: 'gawai & liburan', at: L(10, 3), color: C.red}]} />, sfx: 'whoosh'},
  {start: L(11, -0.3), el: <T.Balance label="TABUNGAN RATA-RATA KELUARGA" sub="▲ minggu pertama (ilustrasi)" steps={[{at: L(11), v: 1500000}, {at: L(12), v: 3500000}]} lines={[{text: 'MINGGU 1 · semua bangga', at: L(11), size: 56, color: C.green}, {text: '"Aku hemat 2 juta minggu ini!"', at: L(12, 2), size: 46}]} />},
  {start: L(13, -0.3), el: <T.Dialog set="house" left={[{who: 'kamu', face: 'senang'}]} right={[{who: 'ana', face: 'senang'}]} talks={[{name: 'Bu Ana', who: 'ana', text: 'Ternyata kita bisa hidup dengan jauh lebih sedikit, ya, Nak.', at: L(14), side: 'right'}]} lines={[{text: '🎙️ Podcast · berita · "pahlawan hemat"', at: L(15, 2), size: 46}]} />, sfx: 'ding'},
  {start: L(16, -0.3), el: <S.QuietStreet closeAt={L(17, 2)} lines={[{text: 'MINGGU 2', at: L(16), size: 70}, {text: 'Mal sepi · kafe tutup · ojek menunggu', at: L(17), size: 48}]} />, sfx: 'whoosh'},
  {
    start: L(18, -0.3),
    el: (
      <T.Dialog
        set="warung"
        left={[{who: 'kamu', face: 'sedih'}]}
        right={[{who: 'sri', face: 'sedih'}]}
        talks={[
          {name: 'Bu Sri', who: 'sri', text: 'Omzet Ibu turun separuh, Nak. Orang cuma beli beras sama minyak.', at: L(19), side: 'right'},
          {name: 'Bu Sri', who: 'sri', text: 'Ibu bangga anak muda pada nabung. Tapi kalau begini terus, Ibu yang nggak bisa makan.', at: L(20), side: 'right'},
        ]}
      />
    ),
  },
  {start: L(21, -0.3), el: <S.Dark lines={[{text: 'Ke mana perginya uang', at: L(21, 2), size: 64}, {text: 'yang tidak kita belanjakan?', at: L(21, 3.5), size: 64, color: C.yellow}]} />},
  {start: L(22, -0.3), el: <S.NewsRoom kicker="MINGGU 3" title1="PENJUALAN RITEL ANJLOK" title2="RIBUAN PEKERJA DIRUMAHKAN" headlineAt={L(22)} shockAt={L(23, 2)} />, sfx: 'thump'},
  {
    start: L(24, -0.3),
    el: (
      <T.Dialog
        set="house"
        left={[{who: 'kamu', face: 'kaget'}]}
        right={[{who: 'raka', pose: 'headInHands', face: 'sedih'}]}
        talks={[
          {name: 'Raka', who: 'raka', text: 'Pabrik kami libur dua minggu, Bro. Tanpa gaji penuh. Pesanan dari toko berhenti total.', at: L(25), side: 'right'},
          {name: 'Raka', who: 'raka', text: 'Lucunya, aku ikut tantanganmu. Aku nabung. Sekarang tabunganku habis buat bertahan.', at: L(26), side: 'right'},
        ]}
      />
    ),
    sfx: 'thump',
  },
  {start: L(27, -0.3), el: <S.Domino items={[{e: '🍱', t: 'Makan siang Rp50 rb'}, {e: '👨‍🍳', t: 'Gaji juru masak'}, {e: '🥬', t: 'Petani sayur'}, {e: '🚚', t: 'Sopir pengantar'}, {e: '🛒', t: 'Mereka belanja lagi'}]} startAt={L(28, 2)} lines={[{text: 'Uang yang dibelanjakan tidak hilang', at: L(27, 1), size: 52}]} />, sfx: 'whoosh'},
  {start: L(29, -0.3), el: <S.Cards flow="in" title={{text: 'BELANJAMU = PENGHASILAN ORANG LAIN', at: L(29), size: 56, color: C.green}} cards={[{e: '☕', t: 'Kopi', sub: '→ gaji barista', at: L(29, 1)}, {e: '👕', t: 'Baju', sub: '→ upah penjahit', at: L(29, 3)}, {e: '🛵', t: 'Ojek', sub: '→ sekolah anaknya', at: L(29, 5)}]} />},
  {start: L(30, -0.3), el: <S.Dark lines={[{text: 'Belanjaku = penghasilanmu.', at: L(30), size: 70, color: C.green}, {text: 'Belanjamu = penghasilanku.', at: L(30, 2.5), size: 70, color: C.yellow}]} />, sfx: 'boom'},
  {start: L(31, -0.3), el: <S.Split at={L(31, 2)} left="BELANJA RUMAH TANGGA" right="SISA EKONOMI" lines={[{text: 'Lebih dari separuh ekonomi Indonesia', at: L(31), size: 54}]} />},
  {start: L(32, -0.3), el: <S.Split at={L(33)} left="1 ORANG HEMAT" right="SEMUA HEMAT" lines={[{text: 'Satu orang: bijak ✅', at: L(32), size: 54, color: C.green}, {text: 'Semua bersamaan: pendapatan turun ❌', at: L(33), size: 50, color: C.red}]} />, sfx: 'whoosh'},
  {start: L(34, -0.3), el: <S.Dark lines={[{text: 'PARADOKS HEMAT', at: L(34), size: 120, color: C.yellow}, {text: 'Semua menabung → pendapatan turun', at: L(35), size: 54}, {text: '→ total tabungan bisa tidak naik', at: L(35, 3), size: 54, color: C.red}]} />, sfx: 'boom'},
  {start: L(36, -0.3), el: <S.Domino items={[{e: '😨', t: 'Takut kehilangan kerja'}, {e: '🛑', t: 'Berhenti belanja'}, {e: '📉', t: 'Omzet turun'}, {e: '✂️', t: 'Pekerja dipangkas'}, {e: '😨', t: 'Makin takut'}]} startAt={L(37)} lines={[{text: 'MINGGU 4 · LINGKARAN SETAN', at: L(36), size: 56, color: C.red}]} />, sfx: 'whoosh'},
  {start: L(39, -0.3), el: <T.Dialog set="house" left={[{who: 'kamu', face: 'sedih'}]} right={[{who: 'joko', face: 'sedih'}]} talks={[{name: 'Pak Joko', who: 'joko', text: 'Ayah pernah lihat ini, Nak. Waktu krisis dulu. Bukan uangnya yang hilang. Kepercayaannya yang hilang.', at: L(40), side: 'right'}]} />},
  {start: L(41, -0.3), el: <S.Cards flow="in" title={{text: 'STIMULUS', at: L(41), size: 80, color: '#3b7be0'}} cards={[{e: '💵', t: 'Bantuan tunai', at: L(41, 2)}, {e: '🧾', t: 'Diskon pajak', at: L(41, 3)}, {e: '🏗️', t: 'Padat karya', at: L(41, 4)}, {e: '🏦', t: 'Bunga BI turun', at: L(41, 5)}]} />, sfx: 'whoosh'},
  {start: L(42, -0.3), el: <S.Dark lines={[{text: 'Stimulus bisa memberi uang...', at: L(42, 1), size: 60}, {text: 'tapi tak bisa memaksa orang berani belanja', at: L(42, 3), size: 54, color: C.yellow}]} />},
  {start: L(43, -0.3), el: <S.NewsRoom kicker="SIARAN LANGSUNG" title1="PENCETUS #30HARI" title2="LANJUT ATAU BERHENTI?" headlineAt={L(43)} shockAt={L(44, 3)} />},
  {start: L(45, -0.3), el: <S.TwoDoors a={{text: 'LANJUTKAN', at: L(46)}} b={{text: 'HENTIKAN', at: L(47)}} lines={[{text: 'Idola jutaan orang, atau dibilang plin-plan?', at: L(45, 1), size: 48}]} />, sfx: 'riser'},
  {
    start: L(48, -0.3),
    el: (
      <T.Dialog
        set="meeting"
        left={[{who: 'kamu', pose: 'point', face: 'serius'}]}
        right={[]}
        talks={[
          {name: 'Kamu', who: 'kamu', text: 'Saya salah memahami hemat. Hemat bukan berhenti belanja. Hemat adalah belanja dengan sadar.', at: L(49), side: 'left'},
          {name: 'Kamu', who: 'kamu', text: 'Ganti tantangannya: 30 hari belanja di warung tetangga dan UMKM. Tetap menabung, tapi biarkan uang berputar.', at: L(50), side: 'left'},
        ]}
      />
    ),
    sfx: 'ding',
  },
  {start: L(51, -0.3), el: <Y.ChatHoax title="🔥 #30HariBelanjaDiTetangga" msgs={[{text: 'Pengkhianat gerakan sendiri 🙄', at: L(51)}, {text: 'Pasti dibayar perusahaan besar', at: L(51, 2)}, {text: 'Aku belanja di warung Bu Sri hari ini 🙌', at: L(51, 5)}]} lines={[]} />},
  {start: L(52, -0.3), el: <T.Dialog set="warung" left={[{who: 'kamu', face: 'senang'}, {who: 'raka', pose: 'cheer', face: 'senang'}]} right={[{who: 'sri', face: 'senang'}, {who: 'ana', face: 'senang'}]} talks={[]} lines={[{text: 'Warung ramai · pabrik jalan lagi', at: L(52), size: 54, color: C.green}, {text: 'Bu Ana tetap menabung (hemat ≠ takut)', at: L(53), size: 46}]} />, sfx: 'ding'},
  {start: L(54, -0.3), el: <S.Lessons items={[{e: '🔄', t: 'Uang berputar', sub: 'Belanjamu = pendapatan orang lain', at: L(55)}, {e: '⚖️', t: 'Paradoks hemat', sub: 'Semua menahan = ekonomi melambat', at: L(56)}, {e: '🏛️', t: 'Stimulus & bunga', sub: 'Cara negara memutar roda', at: L(57)}, {e: '📋', t: 'Hemat berencana', sub: 'Tabung dulu, belanja sadar', at: L(58)}]} />},
  {start: L(59, -0.3), el: <Y.ChatHoax title="📵 Nomor tidak dikenal" msgs={[{text: 'Kamu sudah melihat uang yang kembali dua kali lipat.', at: L(60)}, {text: 'Kamu sudah melihat uang yang berhenti berputar.', at: L(60, 3)}, {text: 'Sekarang, bersiaplah melihat uang yang tidak pernah ada.', at: L(61)}]} lines={[]} />, sfx: 'thump'},
  {start: L(62, -0.3), el: <T.Dialog set="shop" left={[]} right={[]} talks={[]} lines={[{text: '📷 Toko jam tua · lampunya menyala', at: L(62), size: 56, color: '#ffd59e'}]} />, sfx: 'riser'},
  {start: L(63, -0.3), el: <S.TwoDoors a={{text: 'BAIK-BAIK SAJA', at: L(63, 3)}} b={{text: 'MACET', at: L(63, 4)}} lines={[{text: 'Satu Indonesia berhenti belanja 30 hari?', at: L(63), size: 50}]} comment={{text: 'Tulis jawabanmu di komentar', at: L(64)}} />, sfx: 'whoosh'},
  {start: L(65, -0.3), el: <S.Dark lines={[{text: 'Semua tokoh fiktif.', at: L(65), size: 56}, {text: 'Edukasi, bukan saran keuangan pribadi.', at: L(65, 2), size: 48}]} />},
  {start: L(66, -0.3), el: <S.Outro shareAt={L(66)} subAt={L(66, 2)} byeAt={L(67)} />},
];
