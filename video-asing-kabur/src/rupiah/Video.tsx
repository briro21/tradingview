import {AbsoluteFill, Audio, Loop, Sequence, staticFile, useVideoConfig} from 'remotion';
import {Chapter} from '../asing-kabur/scenes';
import {Captions} from '../pasar-hijau/Captions';
import {T0} from '../pasar-hijau/lib';
import {Magnet} from '../pasar-hijau/scenes-a';
import {C, DEFAULT_THEME, ThemeCtx, ThemeName} from '../theme';
import captions from './captions.json';
import lines from './lines.json';
import * as S from './scenes';

// Detik mulai kalimat ke-i di naskah (dari SRT), agar adegan selalu sinkron dengan suara.
const L = (i: number, d = 0) => lines[i].start + d;
export const DURATION_SEC = Math.ceil(lines[lines.length - 1].end + 2);

// Kurs USD/IDR (ilustrasi tren menuju ±18.064 pada pertengahan Oktober 2026).
const FX = [16200, 16350, 16300, 16550, 16700, 16650, 16900, 17200, 17150, 17500, 17700, 17900, 18064];
// Krismon 1998 (perkiraan kasar; puncak hampir 17.000 per dolar).
const KRISMON = [2400, 2450, 2600, 3200, 4600, 6000, 10000, 14000, 12000, 16500, 14500, 11000, 8000];

type Seg = {start: number; el: React.ReactNode; sfx?: string};

const TIMELINE: Seg[] = [
  {start: 0, el: <S.NewsRoom headlineAt={L(0, 3.5)} shockAt={L(0, 5.5)} />},
  {start: L(1, -0.3), el: <S.Banknote shrinkAt={L(2)} lines={[{text: 'Uangnya sama.', at: L(1, 0.8), size: 70}, {text: 'NILAINYA MENYUSUT.', at: L(2, 1), size: 80, color: C.red}]} />, sfx: 'whoosh'},
  {
    start: L(4, -0.3),
    el: (
      <S.LineChart
        data={FX}
        labels={[[0, 'Jan'], [6, 'Jul'], [12, 'Okt']]}
        from={L(4)}
        to={L(5, 3)}
        min={15800}
        max={20600}
        marker="Rp"
        target={{v: 20000, label: 'Rp20.000', at: L(6)}}
        gap={{at: L(6, 2), text: '±11%'}}
        lines={[{text: 'USD/IDR', at: L(4, 0.2), size: 70}, {text: 'Level psikologis 18.000 ditembus', at: L(5, 1), size: 46, color: C.red}]}
        caption="Kurs ±Rp18.064 per 16 Okt 2026 (sumber: romisaputra.com, JISDOR BI). Garis tren sebelumnya ilustrasi."
      />
    ),
    sfx: 'whoosh',
  },
  {
    start: L(8, -0.3),
    el: (
      <S.Roadmap
        items={[
          {text: 'HARI 1', at: L(8, 1.6)},
          {text: 'MINGGU 1', at: L(8, 2.2)},
          {text: 'BULAN 1', at: L(8, 2.8)},
          {text: 'TAHUN 1', at: L(8, 3.4)},
        ]}
        lines={[{text: 'Siapa terpukul? Apa yang naik? Kenapa?', at: L(9), size: 54}]}
      />
    ),
    sfx: 'whoosh',
  },
  {
    start: L(10, -0.3),
    el: <S.Mystery lines={[{text: '1 KELOMPOK', at: L(10, 2), size: 90}, {text: 'diam-diam menunggu momen ini', at: L(10, 3), size: 56, color: C.yellow}]} reveal={{text: '...mungkin termasuk kamu?', at: L(11, 0.5), size: 60, color: C.green}} />,
    sfx: 'riser',
  },
  {start: L(12, -0.3), el: <Chapter at={L(12)} label="BAGIAN 1" sub="Kenapa rupiah bisa melemah?" color={C.yellow} />, sfx: 'boom'},
  {
    start: L(14, -0.3),
    el: <S.Scale tiltAt={L(16)} lines={[{text: 'RUPIAH vs DOLAR', at: L(14, 0.3), size: 80}, {text: 'Lebih banyak yang mau $ → $ lebih mahal', at: L(16, 1), size: 50, color: C.red}]} />,
  },
  {
    start: L(18, -0.3),
    el: (
      <S.Cards
        flow="out"
        title={{text: 'SIAPA BUTUH DOLAR?', at: L(18), size: 80}}
        cards={[
          {e: '🏦', t: 'Investor asing', sub: 'jual saham & obligasi', at: L(19)},
          {e: '🧾', t: 'Utang luar negeri', sub: 'cicilan dalam $', at: L(20)},
          {e: '🛢️', t: 'Importir', sub: 'minyak, gandum, chip', at: L(21)},
          {e: '📱', t: 'Kamu juga', sub: 'belanja & langganan luar', at: L(22)},
        ]}
      />
    ),
    sfx: 'whoosh',
  },
  {
    start: L(23, -0.3),
    el: <S.Tank drainAt={L(25)} lines={[{text: 'DOLAR MASUK vs KELUAR', at: L(23), size: 76}, {text: 'Keluar > masuk = rupiah melemah', at: L(25, 2), size: 52, color: C.red}]} />,
    sfx: 'whoosh',
  },
  {
    start: L(26, -0.3),
    el: (
      <Magnet
        onAt={L(27, 1)}
        pullAt={L(28)}
        labels={[
          {text: 'Faktor luar', at: L(26, 0.3)},
          {text: 'Bunga AS tinggi', at: L(27, 0.5), color: C.red},
          {text: 'Geopolitik + minyak', at: L(29), size: 60},
          {text: '$ = aset "aman"', at: L(29, 6), color: C.green},
        ]}
      />
    ),
    sfx: 'whoosh',
  },
  {start: L(30, -0.3), el: <S.Dark lines={[{text: 'Pernah terjadi sebelumnya?', at: L(30, 0.2), size: 70}, {text: 'PERNAH.', at: L(31), size: 160, color: C.red}]} />, sfx: 'boom'},
  {
    start: L(32, -0.3),
    el: (
      <S.LineChart
        data={KRISMON}
        labels={[[0, 'Jul 1997'], [6, 'Jan 1998'], [12, 'Jul 1998']]}
        from={L(32, 1)}
        to={L(32, 7)}
        min={0}
        max={18000}
        marker="Rp"
        lines={[{text: 'KRISMON 1998', at: L(32), size: 90, color: C.red}, {text: 'Harga melonjak · PHK massal', at: L(33), size: 52}]}
        caption="Angka krismon adalah perkiraan; puncaknya hampir Rp17.000 per dolar."
      />
    ),
  },
  {
    start: L(34, -0.3),
    el: (
      <S.Bars
        bars={[
          {t: '1998', v: 1, at: L(35), value: '±6x lipat'},
          {t: 'Skenario', v: 0.11, at: L(35, 4.5), color: C.yellow, value: '±11%'},
        ]}
        lines={[{text: 'DULU vs SEKARANG', at: L(34, 0.3), size: 80}]}
        stamp={{text: 'BUKAN KRISMON JILID 2', at: L(36), size: 70, color: C.green}}
      />
    ),
    sfx: 'whoosh',
  },
  {start: L(37, -0.3), el: <Chapter at={L(37)} label="SKENARIO" sub="Hari demi hari" color={C.yellow} />, sfx: 'riser'},
  {start: L(38, -0.3), el: <Chapter at={L(38)} label="HARI 1" sub="Rp20.000 muncul di layar" />, sfx: 'boom'},
  {start: L(39, -0.3), el: <S.NewsRoom headlineAt={L(39)} shockAt={L(40)} />},
  {start: L(41, -0.3), el: <S.Queue growAt={L(41)} lines={[{text: 'ANTREAN DOLAR', at: L(41, 0.5), size: 80}, {text: 'Panik → $ makin dicari', at: L(42, 1), size: 54, color: C.red}]} />, sfx: 'whoosh'},
  {start: L(43, -0.3), el: <S.FireHose sprayAt={L(43, 1.5)} lines={[{text: 'BANK INDONESIA TURUN TANGAN', at: L(43, 0.3), size: 62}, {text: 'Tapi airnya terbatas', at: L(44, 3), size: 54, color: C.red}]} />, sfx: 'whoosh'},
  {start: L(45, -0.3), el: <S.Shrink at={L(45, 2)} lines={[{text: 'Investor asing gelisah', at: L(45, 0.3), size: 64}]} />},
  {start: L(46, -0.3), el: <Chapter at={L(46)} label="MINGGU 1" sub="Utang dolar membengkak" />, sfx: 'boom'},
  {start: L(47, -0.3), el: <S.DebtCalc rate1At={L(49)} rate2At={L(50)} extraAt={L(51)} lines={[{text: 'Hitung ulang utang', at: L(47, 0.3), size: 70}]} />},
  {start: L(52, -0.3), el: <S.ProfitSqueeze at={L(52, 1)} lines={[{text: 'LABA TERGERUS', at: L(52, 2), size: 80, color: C.red}]} />, sfx: 'whoosh'},
  {start: L(53, -0.3), el: <S.Layoff lines={[{text: 'Proyek ditunda', at: L(53, 1.5), size: 60}, {text: 'Penghematan: karyawan', at: L(53, 6), size: 60, color: C.red}]} />},
  {start: L(54, -0.3), el: <Chapter at={L(54)} label="BULAN 1" sub="Terasa di kehidupan sehari-hari" />, sfx: 'boom'},
  {
    start: L(55, -0.3),
    el: (
      <S.PriceGrid
        items={[
          {e: '📱', n: 'Gadget', p: 4000000, at: L(56, 1.5)},
          {e: '💻', n: 'Laptop', p: 9000000, at: L(56, 2.2)},
          {e: '💊', n: 'Obat', p: 50000, at: L(56, 3.2)},
          {e: '🏭', n: 'Bahan baku', p: 1000000, at: L(56, 4.2)},
        ]}
        lines={[{text: 'BARANG IMPOR NAIK', at: L(55, 0.5), size: 76, color: C.red}]}
        note="(ilustrasi: kenaikan ±11% mengikuti kurs)"
      />
    ),
    sfx: 'whoosh',
  },
  {start: L(57, -0.3), el: <S.BigPrice e="📱" label="Ponsel $1.000" from={18000000} to={20000000} at={L(58)} delta="+Rp2 JUTA" lines={[{text: 'Barang sama persis', at: L(58, 4), size: 60}]} />, sfx: 'whoosh'},
  {start: L(59, -0.3), el: <S.BigPrice e="✈️" label="Tiket & liburan luar negeri" from={10000000} to={11100000} at={L(59, 1)} delta="LEBIH MAHAL" lines={[{text: 'Avtur dibeli dengan dolar', at: L(59, 1), size: 56}]} />},
  {start: L(61, -0.3), el: <S.BigPrice e="🎓" label="Kuliah $20.000/tahun" from={360000000} to={400000000} at={L(61, 5)} delta="+Rp40 JUTA" lines={[{text: 'Orang tua paling terpukul', at: L(61, 0.5), size: 60}]} />},
  {
    start: L(62, -0.3),
    el: (
      <S.Domino
        startAt={L(64, 2)}
        items={[
          {e: '⛽', t: 'BBM'},
          {e: '🚚', t: 'Ongkos kirim'},
          {e: '🥬', t: 'Sayur'},
          {e: '🍚', t: 'Beras'},
        ]}
        lines={[{text: 'LALU BENSIN...', at: L(62), size: 80, color: C.red}, {text: 'Efek domino ke kebutuhan pokok', at: L(64, 2), size: 50}]}
      />
    ),
    sfx: 'boom',
  },
  {start: L(65, -0.3), el: <Chapter at={L(65)} label="TAHUN 1" sub="Obat yang ada efek sampingnya" />, sfx: 'boom'},
  {
    start: L(66, -0.3),
    el: (
      <S.Bars
        bars={[
          {t: 'Suku bunga BI', v: 0.55, at: L(66, 1)},
          {t: 'Cicilan KPR/KKB', v: 0.75, at: L(68, 0.5)},
          {t: 'Kredit usaha', v: 0.65, at: L(68, 3.5)},
        ]}
        lines={[{text: 'BUNGA NAIK', at: L(66, 0.5), size: 80, color: C.red}, {text: 'UMKM menahan diri', at: L(69, 0.5), size: 52}]}
      />
    ),
  },
  {start: L(70, -0.3), el: <S.QuietStreet closeAt={L(70, 1)} lines={[{text: 'Daya beli turun', at: L(70), size: 64}, {text: 'Ekonomi melambat', at: L(70, 4), size: 64, color: C.red}]} />, sfx: 'whoosh'},
  {start: L(72, -0.3), el: <S.JobHunt lines={[{text: 'Persaingan kerja ketat', at: L(72, 0.3), size: 64}, {text: 'Kenaikan gaji tertunda', at: L(72, 4), size: 56, color: C.red}]} />},
  {start: L(73, -0.3), el: <S.Dark lines={[{text: 'ITULAH SKENARIO BURUKNYA.', at: L(73), size: 90}]} />, sfx: 'boom'},
  {start: L(74, -0.3), el: <S.Mystery openAt={L(75)} lines={[{text: 'Ingat kelompok tadi?', at: L(74, 0.3), size: 70}]} reveal={{text: 'PARA EKSPORTIR', at: L(76), size: 110, color: C.green}} />, sfx: 'ding'},
  {start: L(77, -0.3), el: <S.Ship lines={[{text: 'Dibayar dalam DOLAR', at: L(78), size: 70, color: C.green}, {text: 'Biaya dalam rupiah', at: L(78, 4), size: 56}]} />, sfx: 'whoosh'},
  {start: L(79, -0.3), el: <S.Revenue at={L(80, 2)} lines={[{text: '$1 = lebih banyak rupiah', at: L(79, 0.3), size: 70, color: C.green}]} />},
  {start: L(81, -0.3), el: <S.RemoteWorker paidAt={L(82, 2)} lines={[{text: 'PEKERJA REMOTE', at: L(81, 0.5), size: 80, color: C.green}, {text: 'Digaji dalam dolar', at: L(82), size: 56}]} />, sfx: 'whoosh'},
  {start: L(83, -0.3), el: <S.Beach lines={[{text: 'PARIWISATA', at: L(83, 0.3), size: 90}, {text: 'Bali terasa "murah" bagi turis', at: L(83, 3), size: 54}]} />, sfx: 'whoosh'},
  {
    start: L(84, -0.3),
    el: (
      <S.Cards
        flow="in"
        title={{text: 'PRODUK LOKAL IKUT UNTUNG', at: L(84), size: 70}}
        cards={[
          {e: '📦', t: 'Impor mahal', sub: 'orang beralih', at: L(84, 2), color: C.red},
          {e: '🇮🇩', t: 'Produk lokal', sub: 'lebih dipilih', at: L(84, 4)},
        ]}
      />
    ),
  },
  {start: L(85, -0.3), el: <S.Split at={L(86)} lines={[{text: 'Selalu ada', at: L(86), size: 64}, {text: 'pemenang & pecundang', at: L(86, 0.6), size: 64, color: C.yellow}, {text: 'Kamu di sisi mana?', at: L(87, 2), size: 56}]} />, sfx: 'whoosh'},
  {start: L(88, -0.3), el: <Chapter at={L(88)} label="PELAJARAN" sub="Cara berpikir, bukan saran investasi" color={C.green} />, sfx: 'boom'},
  {
    start: L(89, -0.3),
    el: (
      <S.Lessons
        items={[
          {e: '🧭', t: 'Pahami posisimu', sub: 'Gaji Rp, pengeluaran terkait $?', at: L(89)},
          {e: '⚠️', t: 'Hati-hati utang valas', sub: 'Kurs bisa membesarkan utang', at: L(90)},
          {e: '🛟', t: 'Dana darurat', sub: 'Tunai untuk beberapa bulan', at: L(91)},
          {e: '🚀', t: 'Tingkatkan keahlian', sub: 'Skill yang dihargai global', at: L(92)},
        ]}
      />
    ),
  },
  {start: L(93, -0.3), el: <S.Dark lines={[{text: 'BUKAN SARAN INVESTASI.', at: L(93, 0.2), size: 80}, {text: 'INI CARA BERPIKIR.', at: L(93, 2.4), size: 100, color: C.yellow}, {text: 'Tidak ada yang bisa memastikan arah rupiah.', at: L(94, 3), size: 46}]} />, sfx: 'boom'},
  {start: L(95, -0.3), el: <S.Scale tiltAt={L(95, 1)} dollars={3} lines={[{text: 'KAMU BERDIRI DI SISI MANA?', at: L(95, 0.3), size: 80, color: C.yellow}]} />},
  {start: L(96, -0.3), el: <S.TwoDoors a={{text: 'RUGI', at: L(96, 4)}} b={{text: 'UNTUNG', at: L(96, 5)}} lines={[{text: 'Rupiah tembus Rp20.000...', at: L(96, 0.3), size: 64}]} comment={{text: 'Tulis jawabanmu di komentar', at: L(97)}} />, sfx: 'whoosh'},
  {start: L(98, -0.3), el: <S.Outro shareAt={L(98)} subAt={L(99)} byeAt={L(101)} />},
];

// Efek suara di awal adegan tertentu.
const Sfx: React.FC = () => {
  const {fps} = useVideoConfig();
  return (
    <>
      {TIMELINE.filter((s) => s.sfx).map((s) => (
        <Sequence key={`sfx${s.start}`} from={Math.max(0, Math.round(s.start * fps))} durationInFrames={Math.round(1.5 * fps)}>
          <Audio src={staticFile(`sfx/${s.sfx}.wav`)} volume={s.sfx === 'boom' ? 0.55 : 0.3} />
        </Sequence>
      ))}
    </>
  );
};

export const RupiahVideo: React.FC<{theme?: ThemeName}> = ({theme = DEFAULT_THEME}) => {
  const {fps} = useVideoConfig();
  return (
    <ThemeCtx.Provider value={theme}>
      <AbsoluteFill style={{background: '#000'}}>
        {TIMELINE.map((seg, i) => {
          const from = Math.round(seg.start * fps);
          const end = Math.round((TIMELINE[i + 1]?.start ?? DURATION_SEC) * fps);
          return (
            <Sequence key={seg.start} from={from} durationInFrames={end - from}>
              <T0.Provider value={seg.start}>{seg.el}</T0.Provider>
            </Sequence>
          );
        })}
        <T0.Provider value={0}>
          <Captions data={captions} />
        </T0.Provider>
        <Audio src={staticFile('vo_rupiah_20000.mp3')} />
        <Sfx />
        <Loop durationInFrames={60 * fps}>
          <Audio src={staticFile('sfx/pad.wav')} volume={0.07} />
        </Loop>
      </AbsoluteFill>
    </ThemeCtx.Provider>
  );
};
