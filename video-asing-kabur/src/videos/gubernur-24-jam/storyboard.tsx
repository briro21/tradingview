import {Chapter} from '../../asing-kabur/scenes';
import * as S from '../../rupiah/scenes';
import {C} from '../../theme';
import * as Y from '../custom2';
import * as T from '../story';
import {Seg} from '../WhatIf';

// What If Kamu Jadi Gubernur Bank Indonesia Selama 24 Jam? (cerita fiksi)
const rapat = (who: 'kamu' | 'deputi', face: 'serius' | 'kaget' | 'senang' | 'sedih' = 'serius') => [{who, face}];

export const timeline = (L: (i: number, d?: number) => number): Seg[] => [
  {start: 0, el: <T.Dialog set="meeting" left={rapat('kamu', 'kaget')} right={[{who: 'deputi'}, {who: 'deputi'}, {who: 'deputi'}]} talks={[{name: 'Deputi', who: 'deputi', text: 'Selamat pagi, Pak Gubernur. Kami menunggu keputusan Bapak.', at: L(2), side: 'right'}]} lines={[{text: 'JAM 09.00 · RUANG RAPAT', at: L(0, 0.5), size: 56, color: '#9fb3e0'}]} />},
  {start: L(3, -0.3), el: <S.Dark lines={[{text: 'Gubernur? Kamu?', at: L(3), size: 80, color: C.yellow}, {text: 'Papan nama: GUBERNUR BANK INDONESIA', at: L(4, 2), size: 50}, {text: 'HANYA 24 JAM', at: L(5), size: 120, color: C.red}]} />, sfx: 'boom'},
  {start: L(6, -0.3), el: <Chapter at={L(6)} label="WHAT IF" sub="Jadi Gubernur BI selama 24 jam?" color="#9fb3e0" />, sfx: 'boom'},
  {start: L(7, -0.3), el: <S.Cards title={{text: '3 ALAT UTAMA', at: L(9), size: 80}} cards={[{e: '🎚️', t: 'Suku bunga', sub: 'naik = uang mahal', at: L(10)}, {e: '💵', t: 'Cadangan devisa', sub: 'tameng rupiah', at: L(11)}, {e: '🏦', t: 'Aturan bank', sub: 'seberapa banyak kredit', at: L(12)}]} />, sfx: 'whoosh'},
  {start: L(13, -0.3), el: <S.LineChart data={[17800, 17950, 18100, 18300, 18450, 18600]} from={L(14)} to={L(15, 2)} min={17500} max={18800} marker="Rp" lines={[{text: 'Rupiah melemah · asing jual', at: L(14), size: 54, color: C.red}, {text: 'Inflasi bisa melonjak', at: L(15), size: 54}]} caption="Cerita fiksi. Angka ilustrasi." />, sfx: 'whoosh'},
  {start: L(16, -0.3), el: <Y.Faucet openAt={L(16, -2)} closeAt={L(17)} lines={[{text: 'JAM 10.00 · KEPUTUSAN PERTAMA', at: L(16), size: 54}, {text: 'BUNGA NAIK TEGAS', at: L(17, 1), size: 76, color: C.red}]} />, sfx: 'boom'},
  {start: L(19, -0.3), el: <S.LineChart data={[18600, 18550, 18400, 18250, 18150, 18100]} color={C.green} from={L(19)} to={L(20, 2)} min={17500} max={18800} marker="Rp" lines={[{text: 'Rupiah berbalik menguat', at: L(19, 1), size: 56, color: C.green}, {text: '👏 Ruangan bertepuk tangan', at: L(20), size: 50}]} caption="Ilustrasi." />},
  {start: L(21, -0.3), el: <T.Dialog set="house" left={[{who: 'raka', pose: 'headInHands', face: 'kaget'}]} right={[]} talks={[{name: 'Raka', who: 'raka', text: 'Bunga KPR-ku naik? Cicilanku nambah 600 ribu sebulan? Aku baru akad 3 bulan lalu!', at: L(23), side: 'left'}]} lines={[{text: 'Sementara itu, di Depok...', at: L(21), size: 54}]} />, sfx: 'thump'},
  {
    start: L(24, -0.3),
    el: (
      <Y.ChatHoax
        title="🔥 Trending #GubernurBI"
        msgs={[
          {text: 'Gubernur baru nggak punya hati! Cicilan rakyat dinaikin! 😡', at: L(26)},
          {text: 'KPR-ku naik, terima kasih ya Pak 🙃', at: L(26, 2)},
          {text: 'Rupiah aman, tapi dompet rakyat?', at: L(27)},
        ]}
        lines={[{text: 'JAM 12.00', at: L(25), size: 70}]}
      />
    ),
    sfx: 'whoosh',
  },
  {
    start: L(28, -0.3),
    el: (
      <T.Dialog
        set="meeting"
        left={rapat('kamu', 'sedih')}
        right={[{who: 'deputi'}, {who: 'deputi'}]}
        talks={[
          {name: 'Kamu', who: 'kamu', text: 'Bagaimana kalau kita turunkan lagi suku bunganya?', at: L(29), side: 'left'},
          {name: 'Deputi', who: 'deputi', text: 'Kalau diturunkan hari ini juga, pasar menganggap kita tidak konsisten. Rupiah bisa jatuh lebih dalam.', at: L(30), side: 'right'},
          {name: 'Deputi', who: 'deputi', text: 'Kepercayaan itu mahal, Pak. Sekali hilang, sulit dikembalikan.', at: L(31), side: 'right'},
        ]}
        lines={[{text: 'JAM 14.00', at: L(28), size: 56, color: '#9fb3e0'}]}
      />
    ),
  },
  {start: L(33, -0.3), el: <T.PhoneCall talks={[{name: 'Pak Joko', who: 'joko', text: 'Bunga naik lagi. Kasihan tetangga yang baru beli motor.', at: L(34), side: 'right'}, {name: 'Pak Joko', who: 'joko', text: 'Tapi kata pedagang, harga barang impor mulai berhenti naik.', at: L(35), side: 'right'}]} />, sfx: 'thump'},
  {start: L(36, -0.3), el: <S.Split at={L(36)} left="PEMINJAM" right="PEDAGANG IMPOR" lines={[{text: 'Satu keputusan, dua cerita', at: L(36), size: 60}]} />},
  {start: L(37, -0.3), el: <T.Dialog set="meeting" left={rapat('kamu')} right={[{who: 'deputi', face: 'senang'}]} talks={[{name: 'Pejabat', who: 'deputi', text: 'Pak, bagaimana kalau kita cetak uang saja? Bantu semua yang kesulitan bayar cicilan.', at: L(38), side: 'right'}]} lines={[{text: 'JAM 16.00 · JALAN PINTAS?', at: L(37), size: 54, color: C.yellow}]} />, sfx: 'whoosh'},
  {start: L(39, -0.3), el: <S.LineChart data={[100, 103, 110, 125, 160, 230, 380]} from={L(40)} to={L(41, 3)} min={80} max={400} color={C.red} lines={[{text: 'Ingat dompet ajaibmu', at: L(40), size: 60, color: C.yellow}, {text: 'Uang bertambah > barang → harga melonjak', at: L(41), size: 44, color: C.red}]} caption="Ilustrasi indeks harga." />},
  {start: L(42, -0.3), el: <S.Dark lines={[{text: '"TIDAK. Kita tidak akan', at: L(42), size: 70, color: '#fff'}, {text: 'mencetak uang untuk menutup masalah."', at: L(42, 1), size: 60, color: C.green}]} />, sfx: 'boom'},
  {start: L(43, -0.3), el: <S.Cards flow="in" title={{text: 'JAM 18.00 · PARA BANKIR', at: L(43), size: 66}} cards={[{e: '⏳', t: 'Perpanjang tenor', sub: 'cicilan tak melonjak', at: L(44)}, {e: '🏪', t: 'Kredit UMKM', sub: 'aturan cadangan dilonggarkan', at: L(45)}, {e: '⚖️', t: 'Beban dibagi', sub: 'bukan satu kelompok', at: L(46)}]} />, sfx: 'whoosh'},
  {start: L(47, -0.3), el: <T.Dialog set="meeting" left={rapat('kamu', 'kaget')} right={[{who: 'deputi', face: 'kaget'}]} talks={[{name: 'Deputi', who: 'deputi', text: 'Pak, dana asing raksasa menjual obligasi pemerintah. Rupiah tertekan lagi!', at: L(48), side: 'right'}]} lines={[{text: 'JAM 20.00', at: L(47), size: 60, color: C.red}]} />, sfx: 'thump'},
  {start: L(49, -0.3), el: <S.TwoDoors a={{text: 'HABISKAN', at: L(50)}} b={{text: 'SECUKUPNYA', at: L(51)}} lines={[{text: 'Pahlawan malam ini, atau tameng untuk besok?', at: L(52), size: 46}]} />, sfx: 'riser'},
  {start: L(54, -0.3), el: <S.Dark lines={[{text: 'Kamu memandang jam di dinding', at: L(54), size: 56}, {text: 'TERSISA 13 JAM', at: L(54, 2.5), size: 120, color: C.yellow}]} />},
  {start: L(55, -0.3), el: <T.Dialog set="meeting" left={rapat('kamu')} right={[{who: 'deputi', face: 'serius'}, {who: 'deputi', face: 'senang'}]} talks={[{name: 'Kamu', who: 'kamu', text: 'Kita intervensi secukupnya. Jangan habiskan cadangan dalam satu malam.', at: L(55), side: 'left'}, {name: 'Deputi', who: 'deputi', text: 'Itu keputusan yang tidak populer, Pak. Tapi itu keputusan yang benar.', at: L(57), side: 'right'}]} />, sfx: 'ding'},
  {start: L(58, -0.3), el: <S.LineChart data={[18300, 18420, 18460, 18400, 18350, 18300]} from={L(58)} to={L(59, 3)} min={17500} max={18800} marker="Rp" lines={[{text: 'Melemah sedikit, lalu stabil', at: L(58), size: 54}, {text: 'Pasar Asia: tekanan mereda', at: L(59), size: 50, color: C.green}]} caption="Ilustrasi." />},
  {start: L(60, -0.3), el: <T.Dialog set="house" left={[{who: 'raka', pose: 'cheer', face: 'senang'}]} right={[]} talks={[{name: 'Raka', who: 'raka', text: 'Bro, bank ngasih opsi perpanjang tenor. Cicilanku nggak naik sebanyak kemarin!', at: L(61), side: 'left'}]} lines={[{text: '(tak ada yang tahu siapa yang memutuskan)', at: L(62), size: 42}]} />, sfx: 'ding'},
  {start: L(63, -0.3), el: <T.TimeWarp from={24} to={0} at={L(63)} lines={[{text: 'Papan nama menghilang...', at: L(63), size: 54}]} />, sfx: 'riser'},
  {start: L(64, -0.3), el: <S.Lessons items={[{e: '⚖️', t: 'Tak ada pilihan sempurna', sub: 'Selalu ada yang menanggung', at: L(65)}, {e: '⬆️', t: 'Bunga tinggi', sub: 'Rupiah aman, cicilan berat', at: L(66)}, {e: '⬇️', t: 'Bunga rendah', sub: 'Cicilan ringan, rupiah tertekan', at: L(67)}, {e: '🖨️', t: 'Cetak uang', sub: 'Inflasi rugikan orang kecil', at: L(68)}]} />},
  {start: L(69, -0.3), el: <S.Cards flow="in" title={{text: 'UNTUK KAMU', at: L(69), size: 80, color: C.green}} cards={[{e: '🔍', t: 'Kenali bunga cicilan', at: L(70)}, {e: '🛟', t: 'Dana darurat', at: L(70, 2)}, {e: '🧾', t: 'Utang secukupnya', sub: 'sanggup di masa sulit', at: L(70, 4)}]} />, sfx: 'whoosh'},
  {start: L(71, -0.3), el: <T.Dialog set="shop" left={[{who: 'kamu', face: 'kaget'}]} right={[]} talks={[]} lines={[{text: '🕰️ Jam saku Pak Harso di mejamu', at: L(71), size: 56, color: '#ffd59e'}, {text: '📜 dan secarik kertas...', at: L(72), size: 52}]} />, sfx: 'riser'},
  {start: L(73, -0.3), el: <S.Dark lines={[{text: 'Masa depan. Masa lalu. Kursi kekuasaan.', at: L(73), size: 52, color: '#ffd59e'}, {text: 'UJIAN TERAKHIR: DIRIMU SENDIRI', at: L(73, 4), size: 76, color: C.yellow}]} />, sfx: 'boom'},
  {start: L(74, -0.3), el: <S.TwoDoors a={{text: 'NAIKKAN BUNGA', at: L(74, 4)}} b={{text: 'TURUNKAN BUNGA', at: L(74, 5)}} lines={[{text: 'Jadi Gubernur BI 24 jam, apa keputusanmu?', at: L(74), size: 50}]} comment={{text: 'Tulis jawabanmu di komentar', at: L(75)}} />, sfx: 'whoosh'},
  {start: L(76, -0.3), el: <S.Outro shareAt={L(76)} subAt={L(76, 2)} byeAt={L(77, 1)} />},
];
