import {Chapter} from '../../asing-kabur/scenes';
import * as S from '../../rupiah/scenes';
import {C} from '../../theme';
import * as Y from '../custom2';
import {Seg} from '../WhatIf';

// What If BI Rate Naik ke 7%?
export const timeline = (L: (i: number, d?: number) => number): Seg[] => [
  {start: 0, el: <S.BigPrice e="🏠" label="Cicilan rumah per bulan" from={4182000} to={4825000} at={L(1, 2)} delta="NAIK!" lines={[{text: 'Cicilan sama, bertahun-tahun...', at: L(0, 1), size: 56}, {text: 'Lalu surat dari bank datang', at: L(1), size: 56, color: C.red}]} />},
  {start: L(2, -0.3), el: <S.Dark lines={[{text: 'Satu angka dari Jakarta:', at: L(1, 5), size: 60}, {text: 'BI RATE', at: L(2), size: 180, color: C.yellow}]} />, sfx: 'boom'},
  {
    start: L(3, -0.3),
    el: <S.Cards title={{text: 'RDG BI · 21 OKTOBER 2026', at: L(3), size: 70}} cards={[{e: '⏸️', t: 'BI Rate 5,75%', sub: 'ditahan', at: L(4, 2)}, {e: '⬆️', t: 'Deposit facility 5%', sub: 'dinaikkan', at: L(5)}, {e: '⬇️', t: 'GWM 9% → 7%', sub: 'bertahap Nov–Des', at: L(6)}]} />,
    sfx: 'whoosh',
  },
  {start: L(7, -0.3), el: <S.Scale tiltAt={L(7, 1)} dollars={2} lines={[{text: 'Jaga rupiah', at: L(7, 1), size: 60, color: C.green}, {text: 'tanpa mencekik ekonomi', at: L(7, 2), size: 60, color: C.red}, {text: 'Sempat naik di luar jadwal', at: L(8, 2), size: 48}]} />},
  {start: L(9, -0.3), el: <S.Dark lines={[{text: 'Bagaimana kalau naik sampai', at: L(9), size: 64}, {text: '7%?', at: L(9, 2.5), size: 220, color: C.red}]} />, sfx: 'riser'},
  {start: L(10, -0.3), el: <S.Roadmap items={[{text: 'HARI 1', at: L(10, 1)}, {text: 'MINGGU 1', at: L(10, 1.5)}, {text: 'BULAN 1', at: L(10, 2)}, {text: 'TAHUN 1', at: L(10, 2.5)}]} lines={[]} />, sfx: 'whoosh'},
  {start: L(11, -0.3), el: <S.Mystery lines={[{text: '1 KELOMPOK', at: L(11, 2), size: 90}, {text: 'justru untung saat bunga naik', at: L(11, 3.5), size: 56, color: C.green}]} />, sfx: 'riser'},
  {start: L(12, -0.3), el: <Chapter at={L(12)} label="BAGIAN 1" sub="Apa itu BI Rate?" color={C.yellow} />, sfx: 'boom'},
  {start: L(13, -0.3), el: <Y.Faucet openAt={L(14)} closeAt={L(15)} lines={[{text: 'KERAN UANG', at: L(13, 2), size: 80}, {text: 'Dibuka: uang murah', at: L(14), size: 50, color: C.green}, {text: 'Diputar: uang mahal', at: L(15), size: 50, color: C.red}]} />, sfx: 'whoosh'},
  {start: L(16, -0.3), el: <S.Cards title={{text: 'KENAPA BUAT UANG MAHAL?', at: L(16), size: 70}} cards={[{e: '🔥', t: 'Inflasi', sub: 'rem belanja', at: L(17, 1)}, {e: '💱', t: 'Rupiah', sub: 'tahan uang agar tidak keluar', at: L(17, 2.5)}]} />},
  {start: L(18, -0.3), el: <S.PriceGrid items={[{e: '🍚', n: 'Beras', p: 15000, at: L(18, 1)}, {e: '🥚', n: 'Telur', p: 30000, at: L(18, 1.8)}, {e: '⛽', n: 'BBM', p: 10000, at: L(18, 2.6)}]} lines={[{text: 'Inflasi naik terlalu cepat?', at: L(18), size: 60, color: C.red}]} note="(ilustrasi)" />},
  {start: L(19, -0.3), el: <S.LineChart data={[16200, 16500, 16900, 17300, 17700, 18064]} from={L(19, 0.5)} to={L(20, 2)} min={15800} max={18500} marker="Rp" lines={[{text: 'Bunga tinggi → rupiah lebih menarik', at: L(19), size: 50}, {text: 'Rupiah tembus Rp18.000', at: L(20), size: 56, color: C.red}]} caption="Kurs ±Rp18.064 (16 Okt 2026, JISDOR). Garis sebelumnya ilustrasi." />, sfx: 'whoosh'},
  {start: L(21, -0.3), el: <S.Dark lines={[{text: '7% pernah terjadi?', at: L(21), size: 70}, {text: 'PERNAH. BAHKAN LEBIH.', at: L(22), size: 90, color: C.yellow}]} />, sfx: 'boom'},
  {start: L(23, -0.3), el: <S.Bars bars={[{t: 'Akhir 2005', v: 1, at: L(23, 1), value: '12,75%'}, {t: '2024', v: 0.49, at: L(23, 6), color: C.yellow, value: '6,25%'}, {t: 'Okt 2026', v: 0.45, at: L(23, 8), color: C.blue, value: '5,75%'}]} lines={[{text: 'BI RATE DARI MASA KE MASA', at: L(23), size: 66}, {text: 'Berat bagi generasi bunga rendah', at: L(24, 2), size: 48}]} />},
  {start: L(25, -0.3), el: <Chapter at={L(25)} label="SKENARIO" sub="BI Rate naik ke 7%" color={C.yellow} />, sfx: 'riser'},
  {start: L(26, -0.3), el: <Chapter at={L(26)} label="HARI 1" sub="Pengumuman keluar" />, sfx: 'boom'},
  {start: L(27, -0.3), el: <S.NewsRoom kicker="BANK INDONESIA" title1="BI RATE NAIK KE" title2="7,00%" headlineAt={L(27)} shockAt={L(28)} />},
  {start: L(28, 2), el: <S.Cards flow="out" title={{text: 'SAHAM PALING TERPUKUL', at: L(28, 2), size: 70, color: C.red}} cards={[{e: '🏘️', t: 'Properti', at: L(28, 3)}, {e: '🚗', t: 'Otomotif', at: L(28, 3.6)}, {e: '🧾', t: 'Utang besar', sub: 'biaya bunga naik', at: L(29)}]} />, sfx: 'whoosh'},
  {start: L(30, -0.3), el: <S.Split at={L(30)} left="PERTUMBUHAN" right="RUPIAH" lines={[{text: 'Rupiah justru menguat', at: L(30), size: 60, color: C.green}, {text: 'Obat untuk rupiah, pahit untuk pertumbuhan', at: L(31), size: 46, color: C.yellow}, {text: 'Biaya utang negara ikut naik', at: L(32), size: 46, color: C.red}]} />},
  {start: L(33, -0.3), el: <Chapter at={L(33)} label="MINGGU 1" sub="Surat dari bank" />, sfx: 'boom'},
  {start: L(34, -0.3), el: <S.Bars bars={[{t: 'Bunga deposito', v: 0.5, at: L(34, 2), color: C.green}, {t: 'Bunga kredit', v: 0.8, at: L(34, 3.5)}]} lines={[{text: 'BANK MENYESUAIKAN', at: L(34), size: 76}, {text: 'KPR bunga mengambang: surat datang', at: L(35), size: 46, color: C.red}]} />},
  {start: L(36, -0.3), el: <S.BigPrice e="🏠" label="KPR Rp500 juta · 20 tahun" from={4182000} to={4825000} at={L(39)} delta="+Rp643 RIBU/bln" lines={[{text: 'COBA KITA HITUNG', at: L(36), size: 70}, {text: 'Bunga 8% → 10%', at: L(38), size: 56, color: C.red}, {text: '≈ +Rp7,7 juta setahun', at: L(40, 2), size: 56, color: C.red}]} />, sfx: 'whoosh'},
  {start: L(41, -0.3), el: <Chapter at={L(41)} label="BULAN 1" sub="Menyebar ke kehidupan sehari-hari" />, sfx: 'boom'},
  {start: L(42, -0.3), el: <S.PriceGrid items={[{e: '🚗', n: 'Kredit kendaraan', p: 4000000, at: L(43), pct: 0.08}, {e: '💳', n: 'Kartu kredit', p: 1000000, at: L(43, 1.5), pct: 0.06}, {e: '🏪', n: 'Pinjaman usaha', p: 10000000, at: L(43, 3), pct: 0.09}]} lines={[{text: 'PINJAMAN LEBIH MAHAL', at: L(42), size: 76, color: C.red}]} note="(ilustrasi kenaikan cicilan)" />, sfx: 'whoosh'},
  {start: L(44, -0.3), el: <S.QuietStreet closeAt={L(44, 2)} lines={[{text: 'Ekspansi ditunda', at: L(44), size: 64}, {text: 'Proyek perumahan tertunda', at: L(45), size: 56, color: C.red}, {text: 'Harga impor lebih stabil', at: L(46), size: 50, color: C.green}]} />},
  {start: L(47, -0.3), el: <Chapter at={L(47)} label="TAHUN 1" sub="Rem yang ditekan perlahan" />, sfx: 'boom'},
  {start: L(48, -0.3), el: <S.LineChart data={[6.5, 6.2, 5.6, 4.9, 4.2, 3.7, 3.4, 3.2]} from={L(48, 1)} to={L(50, 2)} min={2} max={7} color={C.green} lines={[{text: 'Butuh berbulan-bulan', at: L(49), size: 54}, {text: 'Inflasi terkendali, rupiah stabil', at: L(50), size: 50, color: C.green}]} caption="Ilustrasi tren inflasi (%)." />},
  {start: L(51, -0.3), el: <S.JobHunt lines={[{text: 'Harga yang dibayar:', at: L(51), size: 60}, {text: 'Ekonomi melambat, rekrutmen hati-hati', at: L(51, 2), size: 48, color: C.red}]} />, sfx: 'whoosh'},
  {start: L(53, -0.3), el: <S.Dark lines={[{text: 'ITULAH SKENARIO BURUKNYA.', at: L(53), size: 90}]} />, sfx: 'boom'},
  {start: L(54, -0.3), el: <S.Mystery openAt={L(55)} lines={[{text: 'Ingat kelompok tadi?', at: L(54), size: 70}]} reveal={{text: 'PARA PENABUNG', at: L(56), size: 110, color: C.green}} />, sfx: 'ding'},
  {start: L(57, -0.3), el: <S.BigPrice e="🏦" label="Deposito Rp100 juta · hasil setahun (setelah pajak)" from={2800000} to={4000000} at={L(58, 4)} delta="+Rp1,2 JUTA" lines={[{text: 'Uang di bank bekerja lebih keras', at: L(57), size: 56, color: C.green}, {text: 'Bunga 3,5% → 5%', at: L(58, 2), size: 56}]} />, sfx: 'whoosh'},
  {start: L(59, -0.3), el: <S.Cards flow="in" title={{text: 'YANG IKUT UNTUNG', at: L(59), size: 76, color: C.green}} cards={[{e: '📜', t: 'ORI & SBR', sub: 'kupon ikut naik', at: L(59, 1)}, {e: '💵', t: 'Pemegang tunai', sub: 'beli aset yang turun', at: L(60)}]} />},
  {start: L(61, -0.3), el: <S.Dark lines={[{text: 'TAPI INGAT:', at: L(61), size: 80, color: C.yellow}, {text: 'Bunga di atas batas LPS = tidak dijamin', at: L(61, 2), size: 54, color: C.red}]} />, sfx: 'boom'},
  {start: L(62, -0.3), el: <S.Split at={L(62)} left="PEMBAYAR BUNGA" right="PENERIMA BUNGA" lines={[{text: 'Yang membayar bunga vs yang menerima bunga', at: L(62, 1), size: 50}, {text: 'Kamu di kelompok mana?', at: L(63), size: 60, color: C.yellow}]} />, sfx: 'whoosh'},
  {start: L(64, -0.3), el: <Chapter at={L(64)} label="PELAJARAN" sub="Cara berpikir, bukan saran investasi" color={C.green} />, sfx: 'boom'},
  {
    start: L(65, -0.3),
    el: (
      <S.Lessons
        items={[
          {e: '🔍', t: 'Kenali bunga pinjaman', sub: 'Tetap atau mengambang?', at: L(65)},
          {e: '🧮', t: 'Sisakan ruang anggaran', sub: 'Cicilan bisa berubah', at: L(66)},
          {e: '💳', t: 'Lunasi utang mahal', sub: 'Kartu kredit & paylater dulu', at: L(67)},
          {e: '🏦', t: 'Manfaatkan sisi baik', sub: 'Deposito & obligasi negara', at: L(68)},
        ]}
      />
    ),
  },
  {start: L(69, -0.3), el: <S.Dark lines={[{text: 'BUKAN SARAN INVESTASI.', at: L(69), size: 80}, {text: 'Siapkah keuanganmu', at: L(71), size: 70, color: C.yellow}, {text: 'menghadapi keduanya?', at: L(71, 1), size: 70, color: C.yellow}]} />, sfx: 'boom'},
  {start: L(72, -0.3), el: <S.TwoDoors a={{text: 'MEMBAYAR BUNGA', at: L(72, 4)}} b={{text: 'MENERIMA BUNGA', at: L(72, 5.5)}} lines={[{text: 'BI Rate 7%:', at: L(72), size: 64}]} comment={{text: 'Tulis jawabanmu di komentar', at: L(73)}} />, sfx: 'whoosh'},
  {start: L(74, -0.3), el: <S.Outro shareAt={L(74)} subAt={L(75)} byeAt={L(77)} />},
];

