import {Chapter} from '../../asing-kabur/scenes';
import * as S from '../../rupiah/scenes';
import {C} from '../../theme';
import * as T from '../story';
import {Seg} from '../WhatIf';

// What If Setiap Rupiah yang Kamu Belanjakan Kembali Dua Kali Lipat?
export const timeline = (L: (i: number, d?: number) => number): Seg[] => [
  {start: 0, el: <T.Dialog set="warung" left={[{who: 'kamu', face: 'netral'}]} right={[{who: 'sri', face: 'senang'}]} talks={[]} lines={[{text: '☕ Kopi Rp20.000', at: L(0, 0.5), size: 70}, {text: 'Dompet: Rp0', at: L(1, 2), size: 60, color: C.red}, {text: 'Dompet: Rp40.000?!', at: L(2, 1), size: 80, color: C.green}]} />},
  {start: L(3, -0.3), el: <T.Dialog set="warung" left={[{who: 'kamu', face: 'kaget'}]} right={[{who: 'raka', pose: 'point', face: 'kaget'}]} talks={[{name: 'Raka', who: 'raka', text: 'Lho, tadi dompetmu kosong kan? Kok sekarang ada uangnya?', at: L(3), side: 'right'}]} lines={[{text: 'Roti 10 rb → dompet +20 rb', at: L(5), size: 54, color: C.green}]} />, sfx: 'whoosh'},
  {start: L(6, -0.3), el: <Chapter at={L(6)} label="WHAT IF" sub="Uang yang dibelanjakan kembali 2×?" color={C.green} />, sfx: 'boom'},
  {start: L(7, -0.3), el: <S.Cards title={{text: 'ATURANNYA', at: L(7), size: 80}} cards={[{e: '🛍️', t: 'Belanja', sub: 'kembali 2× lipat', at: L(8), color: C.green}, {e: '🏦', t: 'Tabung', sub: 'tidak bertambah', at: L(9), color: C.red}, {e: '📈', t: 'Makin belanja', sub: 'makin kaya', at: L(10), color: C.yellow}]} />, sfx: 'whoosh'},
  {start: L(11, -0.3), el: <T.Balance label="ISI DOMPETMU" sub="▲ setiap belanja kembali 2×" steps={[{at: L(11), v: 50000}, {at: L(12), v: 1100000}, {at: L(13), v: 5000000}]} lines={[{text: 'HARI PERTAMA', at: L(11), size: 70}, {text: 'Makan · sepatu · kembali 2×', at: L(12), size: 46}]} />, sfx: 'whoosh'},
  {start: L(14, -0.3), el: <T.Dialog set="street" left={[{who: 'kamu', face: 'senang'}]} right={[{who: 'raka', pose: 'cheer', face: 'senang'}]} talks={[{name: 'Raka', who: 'raka', text: 'Bro, ini mah bukan dompet. Ini mesin uang!', at: L(14), side: 'right'}]} />},
  {start: L(15, -0.3), el: <S.PriceGrid items={[{e: '🏍️', n: 'Motor', p: 25000000, at: L(16), pct: 0}, {e: '🚗', n: 'Mobil', p: 300000000, at: L(16, 2), pct: 0}, {e: '🍜', n: 'Bakso sekampung', p: 3000000, at: L(17), pct: 0}, {e: '📺', n: 'Untuk Bu Ana', p: 15000000, at: L(18), pct: 0}]} lines={[{text: 'MINGGU PERTAMA: MEMBORONG', at: L(15), size: 66, color: C.green}]} note="(setiap pembelian kembali 2×)" />, sfx: 'whoosh'},
  {start: L(19, -0.3), el: <T.Balance label="ISI DOMPETMU" sub="▲ setiap belanja kembali 2×" steps={[{at: L(19), v: 700000000}, {at: L(19, 2), v: 2800000000}, {at: L(20), v: 9000000000}]} lines={[{text: 'Rumah → rumah kedua', at: L(19), size: 56}, {text: 'Orang terkaya dalam setahun?', at: L(20), size: 50, color: C.yellow}]} />},
  {start: L(21, -0.3), el: <T.Dialog set="house" left={[{who: 'kamu', face: 'senang'}]} right={[{who: 'ana', face: 'kaget'}]} talks={[{name: 'Bu Ana', who: 'ana', text: 'Nak, Ibu nggak minta semua ini. Kamu dapat uang dari mana?', at: L(21), side: 'right'}, {name: 'Kamu', who: 'kamu', text: 'Rezeki, Bu. Tenang saja.', at: L(22), side: 'left'}]} />, sfx: 'ding'},
  {start: L(23, -0.3), el: <S.Cards flow="out" title={{text: 'PEMBELI TERBESAR DI KOTA', at: L(23), size: 66}} cards={[{e: '📺', t: 'Toko elektronik', sub: 'stok habis', at: L(24)}, {e: '🧱', t: 'Toko bangunan', sub: 'stok habis', at: L(24, 2)}, {e: '🚘', t: 'Dealer mobil', sub: 'inden', at: L(26)}]} />},
  {start: L(27, -0.3), el: <S.Dark lines={[{text: 'Barang langka. Uang melimpah.', at: L(27), size: 60}, {text: 'Pedagang menaikkan harga.', at: L(28), size: 70, color: C.red}, {text: 'INI INFLASI.', at: L(29), size: 130, color: C.yellow}]} />, sfx: 'boom'},
  {start: L(30, -0.3), el: <S.Scale tiltAt={L(31)} dollars={6} lines={[{text: '10 karung beras · Rp10 juta → Rp1 jt/karung', at: L(30, 1), size: 44}, {text: 'Uang jadi Rp20 juta → Rp2 jt/karung', at: L(31, 2), size: 44, color: C.red}, {text: 'Berasnya SAMA', at: L(32), size: 70, color: C.yellow}]} />, sfx: 'whoosh'},
  {start: L(34, -0.3), el: <S.LineChart data={[100, 105, 115, 140, 200, 350, 700, 1500, 4000]} from={L(35)} to={L(36, 3)} min={0} max={4200} color={C.red} lines={[{text: 'Bukan sekadar teori', at: L(34), size: 64}, {text: 'Cetak uang berlebihan → harga meledak', at: L(35, 1), size: 46, color: C.red}, {text: 'Makin banyak uang, makin tak berharga', at: L(37), size: 46}]} caption="Ilustrasi pola hiperinflasi (indeks harga)." />},
  {start: L(38, -0.3), el: <S.PriceGrid items={[{e: '☕', n: 'Kopi', p: 20000, at: L(39), pct: 0.5}, {e: '🍚', n: 'Beras /kg', p: 15000, at: L(39, 1.5), pct: 0.4}, {e: '🛢️', n: 'Minyak', p: 18000, at: L(39, 2.5), pct: 0.45}, {e: '🛵', n: 'Ongkos ojek', p: 12000, at: L(39, 3.5), pct: 0.35}]} lines={[{text: 'BULAN KEDUA: HARGA NAIK', at: L(38), size: 66, color: C.red}]} note="(ilustrasi)" />, sfx: 'whoosh'},
  {start: L(40, -0.3), el: <S.Split at={L(41)} left="MEREKA" right="KAMU" lines={[{text: 'Bagimu tak masalah', at: L(40), size: 56, color: C.green}, {text: 'Tapi tidak untuk orang lain', at: L(41), size: 56, color: C.red}]} />},
  {
    start: L(42, -0.3),
    el: (
      <T.Dialog
        set="house"
        left={[{who: 'raka', face: 'sedih'}]}
        right={[{who: 'joko', face: 'sedih'}]}
        talks={[
          {name: 'Raka', who: 'raka', text: 'Gajiku sama, Bro. Tapi sekarang makan siang aja harus mikir dua kali.', at: L(43), side: 'left'},
          {name: 'Pak Joko', who: 'joko', text: 'Uang pensiun Ayah dulu cukup sebulan. Sekarang tiga minggu sudah habis.', at: L(44), side: 'right'},
        ]}
        lines={[{text: 'Gaji, pensiun, tabungan: TETAP', at: L(42), size: 54}]}
      />
    ),
  },
  {start: L(45, -0.3), el: <S.BigPrice e="💵" label="Daya beli Rp100.000 milik Bu Ana" from={100000} to={60000} at={L(46)} delta="-40% DAYA BELI" lines={[{text: 'Harga naik, uang tetap', at: L(45), size: 56, color: C.red}]} />, sfx: 'whoosh'},
  {start: L(47, -0.3), el: <T.Dialog set="house" left={[{who: 'kamu', face: 'sedih'}]} right={[{who: 'ana', face: 'sedih'}]} talks={[{name: 'Bu Ana', who: 'ana', text: 'Nak, harga di warung naik terus. Beras sekarang mahal sekali.', at: L(47), side: 'right'}]} lines={[{text: '...dan sebagian karena kamu.', at: L(48), size: 54, color: C.red}]} />, sfx: 'boom'},
  {start: L(49, -0.3), el: <Chapter at={L(49)} label="BULAN 3" sub="Warung langganan tutup" />, sfx: 'boom'},
  {
    start: L(50, -0.3),
    el: (
      <T.Dialog
        set="warung"
        left={[{who: 'kamu', face: 'sedih'}]}
        right={[{who: 'sri', face: 'sedih'}]}
        talks={[
          {name: 'Bu Sri', who: 'sri', text: 'Ibu sudah 30 tahun jualan di sini. Baru kali ini nggak sanggup kulakan.', at: L(51), side: 'right'},
          {name: 'Bu Sri', who: 'sri', text: 'Modal cuma cukup setengah stok. Pembeli juga makin sedikit.', at: L(52), side: 'right'},
        ]}
        lines={[{text: '(dulu Bu Sri sering memberimu permen)', at: L(53), size: 44}]}
      />
    ),
  },
  {start: L(54, -0.3), el: <T.Dialog set="street" left={[{who: 'kamu', face: 'sedih'}]} right={[{who: 'raka', face: 'serius'}]} talks={[{name: 'Raka', who: 'raka', text: 'Bro... jujur deh. Ini gara-gara kamu, ya?', at: L(56), side: 'right'}]} lines={[{text: 'Guru honorer menjual barang', at: L(54), size: 48}, {text: 'Ekonom bingung di TV', at: L(55), size: 48}]} />},
  {start: L(58, -0.3), el: <S.TwoDoors a={{text: 'TERUS BELANJA', at: L(60)}} b={{text: 'BERHENTI', at: L(61)}} lines={[{text: 'Malam itu, di depan dompet tebal...', at: L(58), size: 50}]} />, sfx: 'riser'},
  {start: L(62, -0.3), el: <S.Dark lines={[{text: 'Foto keluarga di dinding.', at: L(62), size: 56}, {text: 'KAMU BERHENTI BELANJA.', at: L(64), size: 100, color: C.green}]} />, sfx: 'boom'},
  {start: L(65, -0.3), el: <S.PriceGrid items={[{e: '☕', n: 'Kopi', p: 30000, at: L(68), pct: -0.3}, {e: '🍚', n: 'Beras /kg', p: 21000, at: L(68, 1), pct: -0.28}, {e: '🛢️', n: 'Minyak', p: 26000, at: L(68, 2), pct: -0.3}]} lines={[{text: 'Barang langka dijual harga lama', at: L(66), size: 50, color: C.green}, {text: 'Warung dibuka lagi', at: L(67), size: 50}]} note="(ilustrasi)" />, sfx: 'whoosh'},
  {
    start: L(69, -0.3),
    el: (
      <T.Dialog
        set="warung"
        left={[{who: 'kamu', pose: 'cheer', face: 'senang'}]}
        right={[{who: 'ana', face: 'senang'}, {who: 'sri', face: 'senang'}]}
        talks={[
          {name: 'Bu Ana', who: 'ana', text: 'Nak, harga beras sudah turun lagi. Alhamdulillah.', at: L(69), side: 'right'},
          {name: 'Bu Sri', who: 'sri', text: 'Warung Ibu buka lagi. Ini permen, seperti dulu.', at: L(71), side: 'right'},
        ]}
        lines={[{text: 'Uang lebih sedikit, hati lebih kaya', at: L(70), size: 50, color: C.green}]}
      />
    ),
    sfx: 'ding',
  },
  {start: L(73, -0.3), el: <S.Lessons items={[{e: '📈', t: 'Inflasi', sub: 'Uang tumbuh > barang', at: L(74)}, {e: '🏦', t: 'Peran BI', sub: 'Jaga uang beredar & bunga', at: L(75)}, {e: '🕵️', t: 'Pencuri diam-diam', sub: 'Uang diam menyusut', at: L(76)}, {e: '🧺', t: 'Atur uangmu', sub: 'Darurat + tumbuh sesuai risiko', at: L(77)}]} />},
  {start: L(78, -0.3), el: <T.Dialog set="house" left={[{who: 'kamu', face: 'kaget'}]} right={[{who: 'deputi', face: 'serius'}]} talks={[{name: 'Tamu', who: 'deputi', text: 'Saya dari bagian pengendalian moneter. Kami ingin bicara soal dompet Anda.', at: L(80), side: 'right'}, {name: 'Tamu', who: 'deputi', text: 'Dan bagaimana Anda menurunkan harga lebih cepat dari kami.', at: L(81), side: 'right'}, {name: 'Tamu', who: 'deputi', text: 'Besok jam sembilan, ada rapat yang sangat penting.', at: L(83), side: 'right'}]} lines={[{text: 'Seminggu kemudian...', at: L(78), size: 50}]} />, sfx: 'thump'},
  {start: L(84, -0.3), el: <S.TwoDoors a={{text: 'BELANJA APA?', at: L(84, 3)}} b={{text: 'RAPAT APA?', at: L(86)}} lines={[{text: 'Uangmu kembali 2×, apa yang kamu beli?', at: L(84), size: 50}]} comment={{text: 'Tulis jawabanmu di komentar', at: L(85)}} />, sfx: 'whoosh'},
  {start: L(86, 2), el: <S.Outro shareAt={L(86, 2)} subAt={L(86, 3)} byeAt={L(87, 1)} />},
];
