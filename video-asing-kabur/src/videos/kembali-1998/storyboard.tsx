import {Chapter} from '../../asing-kabur/scenes';
import * as S from '../../rupiah/scenes';
import {C} from '../../theme';
import * as Y from '../custom2';
import * as T from '../story';
import {Seg} from '../WhatIf';

// What If Kamu Bangun di Tahun 1998 dengan Ingatan Tahun 2026? (Episode 2 dari "10 Detik")
export const timeline = (L: (i: number, d?: number) => number): Seg[] => [
  {start: 0, el: <T.Dialog set="shop" left={[{who: 'kamu', face: 'serius'}]} right={[]} talks={[]} lines={[{text: 'Gang sempit. Toko jam tua.', at: L(0, 1), size: 60, color: '#ffd59e'}, {text: 'Tak ada jam yang sama', at: L(1, 2), size: 48}]} />},
  {
    start: L(2, -0.3),
    el: (
      <T.Dialog
        set="shop"
        left={[{who: 'kamu', face: 'kaget'}]}
        right={[{who: 'harso', face: 'serius'}]}
        talks={[
          {name: 'Pak Harso', who: 'harso', text: 'Akhirnya kamu datang. Kamu yang bisa melihat 10 detik ke depan, kan?', at: L(3), side: 'right'},
          {name: 'Kamu', who: 'kamu', text: 'Bapak... yang mengirim amplop itu?', at: L(4), side: 'left'},
          {name: 'Pak Harso', who: 'harso', text: 'Aku dulu sama sepertimu. Dan aku membuat pilihan yang salah.', at: L(5), side: 'right'},
          {name: 'Pak Harso', who: 'harso', text: 'Sekarang giliranmu memilih.', at: L(7), side: 'right'},
        ]}
      />
    ),
    sfx: 'whoosh',
  },
  {start: L(8, -0.3), el: <T.TimeWarp from={2026} to={1998} at={L(8)} lines={[{text: 'Jarum berputar...', at: L(8), size: 60}]} />, sfx: 'riser'},
  {start: L(9, -0.3), el: <T.Dialog set="old" left={[{who: 'kamu', face: 'kaget'}]} right={[{who: 'pedagang', face: 'netral'}]} talks={[]} lines={[{text: 'Mobil kotak · telepon umum · koran', at: L(10), size: 50}, {text: 'JANUARI 1998', at: L(11), size: 110, color: C.red}]} />, sfx: 'boom'},
  {start: L(12, -0.3), el: <Chapter at={L(12)} label="WHAT IF" sub="Bangun di 1998 dengan ingatan 2026?" color="#ffb26b" />, sfx: 'boom'},
  {start: L(13, -0.3), el: <S.Cards title={{text: 'ATURANNYA', at: L(13), size: 80}} cards={[{e: '🧠', t: 'Ingat semuanya', sub: 'apa yang akan terjadi', at: L(14), color: C.green}, {e: '📵', t: 'Tanpa ponsel', at: L(14, 3), color: C.red}, {e: '💸', t: 'Tanpa uang', sub: 'hanya isi kepala', at: L(14, 5), color: C.red}]} />, sfx: 'whoosh'},
  {start: L(15, -0.3), el: <S.Cards flow="out" title={{text: 'YANG KAMU TAHU', at: L(15), size: 76, color: C.red}} cards={[{e: '📉', t: 'Rupiah jatuh dalam', at: L(16)}, {e: '🍚', t: 'Harga melonjak', at: L(16, 2)}, {e: '🏦', t: 'Banyak bank ditutup', at: L(16, 4)}, {e: '💼', t: 'Jutaan kehilangan kerja', at: L(16, 6)}]} />},
  {start: L(17, -0.3), el: <T.Dialog set="old" left={[{who: 'kamu', pose: 'walk', face: 'serius'}]} right={[{who: 'pedagang', face: 'senang'}]} talks={[{name: 'Pedagang', who: 'pedagang', text: 'Ngapain anak muda nukar dolar? Rupiah aman, tenang saja.', at: L(20), side: 'right'}]} lines={[{text: 'HARI PERTAMA: tak punya apa-apa', at: L(17), size: 54}, {text: 'Kuli angkut → tukar ke dolar', at: L(18, 2), size: 46, color: '#ffd59e'}]} />, sfx: 'whoosh'},
  {start: L(21, -0.3), el: <S.LineChart data={[4850, 5400, 7000, 8500, 10500, 11500]} labels={[[0, 'Des 97'], [5, 'Jan 98']]} from={L(22)} to={L(22, 4)} min={3000} max={13000} marker="Rp" lines={[{text: 'Rupiah merosot tajam', at: L(22), size: 60, color: C.red}, {text: 'Dolarmu berlipat dalam rupiah', at: L(23), size: 48, color: C.green}]} caption="Ilustrasi kasar arah kurs akhir 1997–awal 1998." />},
  {start: L(24, -0.3), el: <T.Dialog set="old" left={[{who: 'kamu', face: 'kaget'}]} right={[{who: 'jokoMuda', face: 'netral'}]} talks={[{name: 'Joko Muda', who: 'jokoMuda', text: 'Mas, boleh pinjam korannya?', at: L(27), side: 'right'}]} lines={[{text: 'AYAHMU. PAK JOKO. 25 TAHUN.', at: L(26), size: 66, color: '#ffd59e'}, {text: 'Kamu bahkan belum lahir', at: L(29), size: 48}]} />, sfx: 'ding'},
  {start: L(30, -0.3), el: <T.Dialog set="old" left={[{who: 'kamu', face: 'senang'}]} right={[{who: 'jokoMuda', face: 'senang'}]} talks={[{name: 'Joko Muda', who: 'jokoMuda', text: 'Aku nabung buat nikah, Mas. Biar Ana nggak malu sama keluarganya.', at: L(31), side: 'right'}]} lines={[{text: 'Pabrik · tabungan · gadis bernama Ana', at: L(30, 2), size: 46}]} />},
  {start: L(32, -0.3), el: <S.Dark lines={[{text: 'Ingatan menghantam seperti petir', at: L(32), size: 56}, {text: 'Bank Mas Joko akan DITUTUP', at: L(34, 1), size: 76, color: C.red}, {text: '3 BULAN LAGI.', at: L(35), size: 120, color: C.red}]} />, sfx: 'boom'},
  {start: L(36, -0.3), el: <Chapter at={L(36)} label="BULAN 1" sub="Peringatan yang ditertawakan" />, sfx: 'boom'},
  {start: L(37, -0.3), el: <T.Dialog set="old" left={[{who: 'kamu', pose: 'point', face: 'serius'}]} right={[{who: 'jokoMuda', pose: 'cheer', face: 'senang'}]} talks={[{name: 'Kamu', who: 'kamu', text: 'Mas Joko, pindahkan tabunganmu. Bank itu tidak aman.', at: L(37), side: 'left'}, {name: 'Joko Muda', who: 'jokoMuda', text: 'Hah? Bank itu besar, Mas. Iklannya di TV tiap malam.', at: L(38), side: 'right'}]} lines={[{text: '(tak bisa bilang: aku anakmu)', at: L(40), size: 44}]} />},
  {start: L(41, -0.3), el: <S.Queue sign="BANK" board="TARIK" value="TABUNGAN" color="#8a5a3c" growAt={L(42, 2)} lines={[{text: 'Kota mulai berubah', at: L(41), size: 60}, {text: 'Beras naik · minyak hilang · antre bank', at: L(42), size: 44, color: C.red}]} />, sfx: 'whoosh'},
  {start: L(44, -0.3), el: <S.Dark lines={[{text: 'Peringatkan semua orang?', at: L(44, 1), size: 64}, {text: 'Kepanikan bisa meruntuhkan', at: L(45), size: 60, color: C.red}, {text: 'bank yang sehat sekalipun', at: L(45, 1.5), size: 60, color: C.red}]} />},
  {start: L(46, -0.3), el: <Chapter at={L(46)} label="BULAN 2" sub="Kaya, tapi tidak nyaman" />, sfx: 'boom'},
  {start: L(47, -0.3), el: <T.Balance label="KEKAYAANMU · 1998" sub="▲ dari dolar & barang murah" steps={[{at: L(47), v: 2000000}, {at: L(47, 2), v: 18000000}]} lines={[{text: 'Untungmu = rugi orang lain', at: L(49), size: 54, color: C.red}]} />},
  {start: L(50, -0.3), el: <T.Dialog set="old" left={[{who: 'kamu', face: 'sedih'}]} right={[{who: 'ana', face: 'sedih'}]} talks={[{name: 'Seorang ibu', who: 'ana', text: 'Anak saya sakit, Mas. Saya butuh uang hari ini juga.', at: L(51), side: 'right'}]} lines={[{text: 'Kalung emas · separuh harga', at: L(50), size: 50}]} />, sfx: 'ding'},
  {start: L(55, -0.3), el: <T.Dialog set="shop" left={[{who: 'kamu', face: 'sedih'}]} right={[{who: 'harso', face: 'sedih'}]} talks={[{name: 'Pak Harso (mimpi)', who: 'harso', text: 'Aku kaya raya di tahun itu. Tapi aku tidak menolong siapa pun. Aku menyesalinya seumur hidup.', at: L(56), side: 'right'}]} />},
  {start: L(57, -0.3), el: <Chapter at={L(57)} label="BULAN 3" sub="Dua hari sebelum bank ditutup" />, sfx: 'boom'},
  {start: L(58, -0.3), el: <S.TwoDoors a={{text: 'DIAM', at: L(59)}} b={{text: 'SELAMATKAN', at: L(60)}} lines={[{text: 'Kalau sejarah berubah... apakah kamu tetap lahir?', at: L(60, 2), size: 46}]} />, sfx: 'riser'},
  {
    start: L(61, -0.3),
    el: (
      <T.Dialog
        set="room"
        left={[{who: 'kamu', pose: 'point', face: 'serius'}]}
        right={[{who: 'jokoMuda', face: 'kaget'}]}
        talks={[
          {name: 'Kamu', who: 'kamu', text: 'Mas, besok pagi ambil tabunganmu. Semuanya. Jangan tanya kenapa.', at: L(63), side: 'left'},
          {name: 'Joko Muda', who: 'jokoMuda', text: 'Mas ini siapa sih sebenarnya?', at: L(64), side: 'right'},
          {name: 'Kamu', who: 'kamu', text: 'Seseorang yang ingin melihat Mas bahagia dengan Mbak Ana.', at: L(65), side: 'left'},
        ]}
        lines={[{text: 'Menjelang subuh...', at: L(61), size: 50}]}
      />
    ),
    sfx: 'thump',
  },
  {start: L(67, -0.3), el: <Y.BankFront closeAt={L(67, 1)} lines={[{text: 'Tabungan Mas Joko: UTUH ✅', at: L(68), size: 56, color: C.green}]} />, sfx: 'boom'},
  {start: L(69, -0.3), el: <T.Dialog set="old" left={[{who: 'kamu', face: 'senang'}]} right={[{who: 'jokoMuda', face: 'senang'}]} talks={[{name: 'Joko Muda', who: 'jokoMuda', text: 'Mas... gimana Mas bisa tahu?', at: L(69), side: 'right'}]} lines={[{text: '(kamu menepuk pundaknya)', at: L(70), size: 44}]} />},
  {start: L(71, -0.3), el: <T.Dialog set="house" left={[{who: 'kamu', face: 'senang'}]} right={[{who: 'jokoMuda', pose: 'cheer', face: 'senang'}, {who: 'ana', face: 'senang'}]} talks={[]} lines={[{text: '💍 PERNIKAHAN JOKO & ANA', at: L(72), size: 64, color: '#ff7aa8'}, {text: 'Ia tersenyum, tanpa tahu siapa kamu', at: L(73), size: 46}]} />, sfx: 'ding'},
  {start: L(74, -0.3), el: <T.TimeWarp from={1998} to={2026} at={L(74, 1)} lines={[{text: 'Jam saku berdetak keras...', at: L(74), size: 56}]} />, sfx: 'riser'},
  {start: L(76, -0.3), el: <S.Cards flow="in" title={{text: 'PELAJARAN NYATA', at: L(76), size: 76, color: C.green}} cards={[{e: '😱', t: 'Panik bisa runtuhkan', sub: 'bank yang sehat', at: L(77)}, {e: '🛡️', t: 'Lahirlah LPS', sub: 'simpanan dijamin', at: L(78)}, {e: '🧺', t: 'Sebar simpanan', sub: 'bank terdaftar', at: L(79)}, {e: '🚫', t: 'Abaikan hoaks', at: L(79, 2)}]} />, sfx: 'whoosh'},
  {start: L(80, -0.3), el: <T.FloorMessage msgAt={L(83, 1)} lines={[{text: '2026. Foto pernikahan di dinding...', at: L(80), size: 50}, {text: 'Barisan belakang: wajahmu', at: L(82), size: 56, color: '#ffd59e'}]} />, sfx: 'ding'},
  {start: L(84, -0.3), el: <S.Dark lines={[{text: '"Kamu memilih seperti aku seharusnya memilih."', at: L(84), size: 50, color: '#ffd59e'}, {text: 'ADA YANG MEMBUTUHKANMU.', at: L(84, 4), size: 80, color: C.yellow}]} />, sfx: 'boom'},
  {start: L(85, -0.3), el: <S.TwoDoors a={{text: 'TABUNGAN', at: L(85, 3)}} b={{text: 'KELUARGA', at: L(85, 4)}} lines={[{text: 'Kembali ke 1998, apa yang kamu selamatkan?', at: L(85), size: 50}]} comment={{text: 'Tulis jawabanmu di komentar', at: L(86)}} />, sfx: 'whoosh'},
  {start: L(87, -0.3), el: <S.Outro shareAt={L(87)} subAt={L(87, 2)} byeAt={L(88, 1)} />},
];
