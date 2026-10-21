import {C} from '../theme';
import * as A from './scenes-a';
import * as B from './scenes-b';

// Setiap segmen dimulai pada detik kalimat di SRT; selesai saat segmen berikutnya mulai.
export const TIMELINE: {start: number; el: React.ReactNode}[] = [
  {start: 0, el: <A.PhoneRed />},
  {
    start: 9.2,
    el: (
      <A.ChartScene
        data={[7200, 7150, 7240, 7100, 6900, 6950, 6600, 6300, 6100, 5700, 5300]}
        draw={200}
        title={{text: 'MENUKIK TAJAM', at: 10.7, color: C.red}}
        sub={{text: 'Untung berbulan-bulan, hilang dalam hitungan hari', at: 12.1}}
        label="IHSG (ilustrasi)"
      />
    ),
  },
  {
    start: 18.1,
    el: (
      <A.Chips
        chips={[
          {text: 'PANIK', at: 18.9},
          {text: 'FRUSTRASI', at: 19.8},
          {text: 'SELL ALL?', at: 22.8, color: '#8a1f18'},
          {text: 'HAPUS APLIKASI?', at: 24.3, color: '#555', size: 60},
        ]}
      />
    ),
  },
  {start: 26.7, el: <A.Statement mood="netral" lines={[{text: 'ANDA TIDAK', at: 27.8}, {text: 'SENDIRI.', at: 28.3, color: C.green}]} />},
  {
    start: 29.4,
    el: (
      <A.Statement
        mood={[[29.4, 'sedih'], [34.6, 'serius']]}
        lines={[
          {text: 'RESPONS', at: 29.9, size: 90},
          {text: 'BIOLOGIS 🧠', at: 30.3, size: 90, color: C.yellow},
          {text: 'STOP!', at: 36.6, color: C.red, size: 130},
          {text: 'Jangan putuskan', at: 37.0, size: 60},
          {text: 'pakai emosi', at: 37.3, size: 60},
        ]}
      />
    ),
  },
  {start: 42.6, el: <A.Breath />},
  {start: 43.9, el: <A.TitleCard at={44.0} top="IHSG HIJAU HARI INI" main={['PEMBALIKAN ARAH SEJATI', 'ATAU JEBAKAN FOMO?']} />},
  {
    start: 48.9,
    el: (
      <A.Checklist
        title="RENCANA KITA"
        items={[
          {text: 'Singkirkan emosi', at: 49.6},
          {text: 'Bedah data objektif', at: 51.0},
          {text: 'Baca aliran uang', at: 52.9},
          {text: 'Strategi logis', at: 55.1},
        ]}
      />
    ),
  },
  {start: 59.0, el: <A.MoneyFlow at={61.0} left="TIDAK SABAR" right="SABAR + DATA" title={{text: 'UANG SELALU BERPINDAH', at: 59.3}} />},
  {start: 66.8, el: <A.SectionCard at={66.9} num="BAGIAN 1" title="KENAPA IHSG BISA HANCUR?" sub="Lihat keluar dari layar chart" />},
  {
    start: 77.5,
    el: (
      <A.Pool
        levels={[[77.5, 0.85]]}
        foreignAt={87.4}
        labels={[
          {text: 'KOLAM = PASAR MODAL', at: 78.5, x: 100, y: 60, size: 70},
          {text: 'AIR = LIKUIDITAS 💧', at: 83.6, x: 100, y: 160, size: 70, color: '#3aa0ff'},
          {text: 'MILIK ASING', at: 90.0, x: 1230, y: 860, size: 60, color: '#b9a6ff'},
        ]}
      />
    ),
  },
  {
    start: 91.9,
    el: (
      <A.Magnet
        onAt={105.9}
        pullAt={106.5}
        labels={[
          {text: 'Suku bunga global', at: 92.9},
          {text: '+ Geopolitik', at: 95.2},
          {text: '= MAGNET RAKSASA', at: 97.5, color: C.red},
          {text: 'Imbal hasil lebih aman', at: 109.1, color: C.green, size: 60},
        ]}
      />
    ),
  },
  {
    start: 115.5,
    el: (
      <A.Pool
        levels={[[118, 0.85], [129, 0.25]]}
        foreignAt={0}
        labels={[
          {text: 'UANG ASING PULANG KAMPUNG ✈️', at: 118.5, x: 100, y: 60, size: 72},
          {text: 'JUAL MASIF', at: 121.5, x: 100, y: 170, size: 72, color: C.red},
          {text: 'AIR MENYUSUT', at: 127.3, x: 1230, y: 860, size: 60, color: C.red},
        ]}
      />
    ),
  },
  {
    start: 129.6,
    el: (
      <A.ChartScene
        data={[9800, 9750, 9600, 9650, 9300, 9000, 8700, 8750, 8200]}
        draw={150}
        title={{text: 'BLUE CHIP PUN RONTOK', at: 130.5, color: C.red}}
        sub={{text: 'Fundamental kokoh tetap ikut turun', at: 133.0}}
        label="(ilustrasi)"
      />
    ),
  },
  {
    start: 137.1,
    el: (
      <A.Reasons
        title={{text: 'MENGAPA?', at: 137.2}}
        items={[
          {text: 'Gagal bayar utang', at: 139.5, ok: false},
          {text: 'Bisnis bangkrut', at: 141.8, ok: false},
          {text: 'TEKANAN SUPLAI', at: 144.6, ok: true},
        ]}
      />
    ),
  },
  {start: 146.2, el: <A.SupplyDemand at={146.5} lawAt={154.6} />},
  {
    start: 157.1,
    el: <A.MoneyFlow at={162.0} left="YANG MENJUAL" right="YANG MEMBELI" leftMood="sedih" rightMood="netral" title={{text: 'LIKUIDITAS HANYA PINDAH TANGAN', at: 161.9, size: 76}} />,
  },
  {start: 166.4, el: <A.SectionCard at={166.5} num="BAGIAN 2" title="MEMBACA JEJAK INSTITUSI" sub="Order book flow: senjata analis profesional" />},
  {
    start: 175.5,
    el: (
      <B.Footprints
        lines={[
          {text: 'Institusi tidak', at: 176.7},
          {text: 'beli/jual acak', at: 177.6},
          {text: 'JEJAK DIGITAL', at: 182.3, color: C.yellow, size: 110},
        ]}
      />
    ),
  },
  {
    start: 184.1,
    el: (
      <B.OrderBook
        wallAt={199.9}
        absorbAt={216.3}
        lines={[
          {text: 'Tidak memakan offer', at: 189.3, size: 54},
          {text: 'OFFER TEBAL', at: 197.5, color: C.red, size: 76},
          {text: 'TEMBOK?', at: 200.8, color: C.red, size: 76},
          {text: 'Pancing retail panik', at: 204.0, size: 54},
          {text: 'AKUMULASI SENYAP', at: 214.2, color: C.green, size: 76},
          {text: 'Bid menyerap diam-diam', at: 217.2, size: 54},
        ]}
      />
    ),
  },
  {
    start: 222.3,
    el: <A.MoneyFlow at={225.0} left="RETAIL PANIK" right="INSTITUSI" leftMood="kaget" rightMood="serius" title={{text: 'FASE TRANSISI', at: 222.4, color: C.yellow}} />,
  },
  {
    start: 231.2,
    el: <A.Statement mood="serius" lines={[{text: 'Baca trade flow,', at: 231.9, size: 80}, {text: 'jangan tertipu', at: 234.0, size: 80}, {text: 'TEMBOK OFFER', at: 235.4, color: C.red}]} />,
  },
  {start: 237.5, el: <A.SectionCard at={237.6} num="BAGIAN 3" title="MENGHINDARI BULL TRAP" sub="Disiplin indikator" />},
  {start: 242.9, el: <B.Knife lines={[{text: 'JANGAN TANGKAP', at: 243.5, size: 90}, {text: 'PISAU JATUH!', at: 248.0, color: C.red, size: 110}]} />},
  {
    start: 250.4,
    el: (
      <B.DeadCat
        bounceAt={254.0}
        trapAt={260.7}
        lines={[
          {text: '5 hari turun...', at: 251.0, size: 60},
          {text: 'Retail: "REVERSAL!"', at: 256.5, size: 60, color: C.green},
          {text: 'DEAD CAT BOUNCE', at: 265.3, size: 70, color: C.red},
        ]}
      />
    ),
  },
  {
    start: 274.1,
    el: <A.Statement mood="serius" glow="rgba(62,207,107,0.3)" lines={[{text: 'DISIPLIN', at: 275.0, color: C.green}, {text: 'INDIKATOR 🛡️', at: 275.4}, {text: 'Bukan perasaan', at: 280.5, size: 70, color: C.red}, {text: 'Alat ukur objektif', at: 282.6, size: 70}]} />,
  },
  {
    start: 284.0,
    el: (
      <B.Divergence
        priceAt={291.5}
        macdAt={296.5}
        lines={[
          {text: '① DIVERGENSI', at: 284.4, color: C.yellow},
          {text: 'MACD / RSI', at: 287.5, size: 60},
          {text: 'Harga: lebih rendah', at: 292.0, size: 50, color: C.red},
          {text: 'MACD: lebih tinggi', at: 297.0, size: 50, color: C.green},
          {text: 'Momentum jual habis', at: 302.5, size: 50},
        ]}
      />
    ),
  },
  {
    start: 306.0,
    el: (
      <B.Ichimoku
        breakAt={323.5}
        lines={[
          {text: '② ICHIMOKU', at: 306.4, color: C.yellow},
          {text: 'Di bawah awan = TREN TURUN', at: 313.5, size: 50, color: C.red},
          {text: 'Tunggu jebol ke atas', at: 324.0, size: 50, color: C.green},
        ]}
      />
    ),
  },
  {
    start: 327.5,
    el: (
      <B.Vwap
        lines={[
          {text: '③ VWAP (intraday)', at: 327.9, color: C.yellow},
          {text: 'Harus bertahan di atas', at: 331.8, size: 54},
          {text: 'Gagal tembus = distribusi', at: 339.5, size: 54, color: C.red},
        ]}
      />
    ),
  },
  {start: 345.0, el: <A.SectionCard at={345.1} num="BAGIAN 4" title="OTOMATISASI DATA" sub="Berhenti menyaring manual tiap malam" />},
  {
    start: 355.8,
    el: <B.Code start={355.8} resultAt={370.2} lines={[{text: 'Python + Pandas 🐍', at: 362.0, size: 60, color: C.yellow}]} />,
  },
  {
    start: 375.9,
    el: (
      <B.Screener
        title={{text: 'CUSTOM SCREENER', at: 376.4}}
        items={[
          {text: '✗ Parameter standar', at: 381.6, color: C.red},
          {text: 'Uji area Fibonacci 61,8%', at: 384.5},
        ]}
      />
    ),
  },
  {start: 386.5, el: <B.Fibonacci goldenAt={389.5} lines={[{text: 'GOLDEN RATIO 61,8%', at: 389.6, color: C.yellow}, {text: '+ laba bersih tetap tumbuh', at: 394.2, size: 54, color: C.green}]} />},
  {
    start: 398.8,
    el: (
      <B.CorpAction
        floorAt={411.0}
        lines={[
          {text: 'AKSI KORPORASI', at: 399.3, color: C.yellow},
          {text: 'Tender offer · Rights issue', at: 403.5, size: 54},
          {text: 'Kebal kejatuhan indeks', at: 407.8, size: 54, color: C.green},
        ]}
      />
    ),
  },
  {start: 421.2, el: <A.SectionCard at={421.3} num="BESOK PAGI" title="RENCANA SAAT BEL BURSA BERBUNYI" sub="3 aturan survival" />},
  {
    start: 429.3,
    el: (
      <B.Rules
        rules={[
          {text: 'Tahan diri & lindungi modal', at: 429.4, sub: 'Duduk diam juga posisi trading'},
          {text: 'Watchlist super ketat', at: 447.2, sub: 'Petakan support historis'},
          {text: 'Jaga cash ratio', at: 457.8, sub: 'Uang tunai adalah raja'},
        ]}
      />
    ),
  },
  {
    start: 463.2,
    el: (
      <A.Pool
        levels={[[463.3, 0.25], [470, 0.85]]}
        whale
        labels={[
          {text: 'BADAI REDA, PAUS KEMBALI 🐋', at: 463.6, x: 100, y: 60, size: 70},
          {text: 'SIAPKAN AMUNISI CASH', at: 470.5, x: 100, y: 170, size: 70, color: C.yellow},
        ]}
      />
    ),
  },
  {
    start: 475.6,
    el: <A.Statement mood="serius" lines={[{text: 'KEPANIKAN =', at: 475.8}, {text: 'MUSUH PROFIT', at: 476.6, color: C.red}, {text: 'Tetap dingin.', at: 478.6, size: 70, color: '#3aa0ff'}, {text: 'Biarkan data memutuskan.', at: 480.8, size: 60, color: C.green}]} />,
  },
  {start: 483.7, el: <B.Outro at={483.7} />},
];
