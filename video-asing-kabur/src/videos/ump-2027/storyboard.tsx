import {AbsoluteFill, Img, staticFile} from 'remotion';
import * as S from '../../rupiah/scenes';
import {C} from '../../theme';
import * as N from '../news';
import * as T from '../story';
import captions from './captions.json';
import lines from './lines.json';
import {Seg} from '../WhatIf';

// UMP 2027 naik, tapi gajimu belum tentu ikut naik. Berita UMP sebagai pintu masuk; adegan utama gaya OpusCar (public/opuscar/ump-*).
const K = (i: number, k = 0) => {
  const ln = lines[i];
  const cs = captions.filter((c) => c.start >= ln.start - 0.05 && c.start < ln.end - 0.05);
  return cs.length ? cs[Math.min(k, cs.length - 1)].start : ln.start;
};
const w = (t: string, at: number, color?: string, size?: number) => ({t, at, color, size});
const BLUE = '#3b7be0';

export const timeline = (L: (i: number, d?: number) => number): Seg[] => [
  // frame 0 = thumbnail utama
  {start: 0, el: <AbsoluteFill><Img src={staticFile('thumbs/ump-2027-thumb-1.png')} style={{width: 1920, height: 1080}} /></AbsoluteFill>},
  {start: K(0), el: <N.Clip src="opuscar/ump-hook-16x9.mp4" />, sfx: 'boom'},
  {start: K(4), el: <N.Kinetic words={[w('Pertanyaannya:', K(4)), w('GAJIMU IKUT NAIK?', K(4, 1), C.red, 140), w('jawabannya mungkin tidak seperti yang kamu kira', K(5), undefined, 64)]} dark mark="?" />, sfx: 'thump'},
  {start: K(6), el: <S.Cards title={{text: 'DI VIDEO INI', at: K(6), size: 76}} cards={[{e: '📐', t: 'Asal angka UMP', at: K(6, 1), color: BLUE}, {e: '🗺️', t: 'Kenapa beda jauh', at: K(6, 1), color: C.yellow}, {e: '🧾', t: 'Siapa ikut naik', at: K(6, 2), color: C.red}, {e: '✅', t: '4 hal dicek', at: K(6, 3), color: C.green}]} />},

  // BAGIAN 1
  {start: L(7, -0.2), el: <N.Part n={1} title="Angka UMP datang dari mana?" at={L(7)} />, sfx: 'boom'},
  {start: K(8), el: <N.Counter from={0} to={17} at={K(8, 2)} dur={1.2} label="Provinsi sudah menetapkan UMP 2027" suffix=" dari 38" color={BLUE} sub={w('tenggat: 21 November 2026', K(8), undefined, 50)} dark mark="21 NOV" />},
  {start: K(9), el: <N.Clip src="opuscar/ump-alfa-16x9.mp4" />, sfx: 'whoosh'},
  {start: K(15), el: <N.Headlines items={[{src: 'SERIKAT BURUH (KSPI)', text: 'Di bawah KHL · siapkan gugatan ke PTUN', at: K(15)}, {src: 'APINDO DKI', text: 'Terlalu tinggi · cari skema pengecualian', at: K(16)}]} dark mark="DUA PIHAK" />, sfx: 'thump'},

  // BAGIAN 2
  {start: L(17, -0.2), el: <N.Part n={2} title="Kenapa Bali 42%, Jakarta 7%?" at={L(17)} />, sfx: 'boom'},
  {start: K(18), el: <N.Clip src="opuscar/ump-khl-16x9.mp4" />, sfx: 'whoosh'},
  {start: K(23), el: <T.Dialog set="street" left={[{who: 'kamu', face: 'serius'}]} right={[{who: 'sari', face: 'kaget'}]} talks={[{name: 'Sari', who: 'sari', text: 'Lho, jadi aku harus lihat UMP atau UMK?', at: K(23), side: 'right'}]} />},
  {start: K(24), el: <N.Timeline title={w('UMP atau UMK?', K(24))} items={[{date: '21 NOV', text: 'UMP provinsi ditetapkan', at: K(24), color: BLUE}, {date: '26 NOV', text: 'UMK kab/kota diumumkan', at: K(24, 2), color: C.red}]} />},
  {start: K(25), el: <N.Kinetic words={[w('Kerja di luar ibu kota provinsi?', K(25), undefined, 76), w('angkamu keluar MINGGU DEPAN', K(25, 1), C.red, 104)]} dark mark="UMK" />},

  // BAGIAN 3
  {start: L(26, -0.2), el: <N.Part n={3} title="Apakah gajimu ikut naik?" at={L(26)} />, sfx: 'boom'},
  {start: K(27), el: <N.Kinetic words={[w('Masa kerja < 1 tahun', K(27), undefined, 80), w('→ UPAH MINIMUM', K(27, 1), C.green, 110), w('1 tahun atau lebih', K(28), undefined, 80), w('→ STRUKTUR & SKALA UPAH', K(28, 1), BLUE, 100)]} mark="PP 36/2021" />, sfx: 'whoosh'},
  {start: K(29), el: <N.Clip src="opuscar/ump-lantai-16x9.mp4" />, sfx: 'whoosh'},
  {start: K(34), el: <T.Dialog set="street" left={[{who: 'kamu', face: 'serius'}]} right={[{who: 'raka', pose: 'headInHands', face: 'sedih'}]} talks={[{name: 'Raka', who: 'raka', text: 'Jadi yang baru masuk naik empat ratus ribu, yang sudah tiga tahun bisa tidak naik sama sekali?', at: K(34), side: 'right'}]} />},
  {start: K(35), el: <N.Kinetic words={[w('Gaji karyawan baru', K(35), undefined, 90), w('hampir MENYUSUL karyawan lama', K(35, 2), C.red, 104)]} dark mark="ADIL?" />, sfx: 'thump'},
  {start: K(36), el: <N.Kinetic words={[w('STRUKTUR & SKALA UPAH', K(36), BLUE, 120), w('wajib disusun · pekerja berhak tahu', K(36, 2), undefined, 70)]} mark="SKALA" />},

  // BAGIAN 4
  {start: L(37, -0.2), el: <N.Part n={4} title="Kenaikan nyata setelah inflasi" at={L(37)} />, sfx: 'boom'},
  {start: K(38), el: <N.Clip src="opuscar/ump-gaji-16x9.mp4" />, sfx: 'whoosh'},

  // BAGIAN 5
  {start: L(45, -0.2), el: <N.Part n={5} title="Tiga skenario setelah UMP naik" at={L(45)} />, sfx: 'boom'},
  {start: K(46), el: <N.Clip src="opuscar/ump-skenario-16x9.mp4" />, sfx: 'whoosh'},
  {start: K(50), el: <N.Kinetic words={[w('Analisis kemungkinan', K(50), undefined, 100), w('bukan kepastian', K(50, 1), BLUE)]} dark />},

  // BAGIAN 6
  {start: L(51, -0.2), el: <N.Part n={6} title="Empat hal yang perlu kamu cek" at={L(51)} />, sfx: 'boom'},
  {start: K(52), el: <N.Clip src="opuscar/ump-cek-16x9.mp4" />, sfx: 'whoosh'},
  {start: K(56), el: <N.Kinetic words={[w('Upah minimum = LANTAI', K(56), C.yellow, 110), w('naik-tidaknya gajimu ditentukan hal lain', K(56, 2), undefined, 70)]} dark mark="LANTAI" />, sfx: 'boom'},
  {start: K(57), el: <S.TwoDoors a={{text: 'GAJIKU IKUT NAIK', at: K(57, 2)}} b={{text: 'GAJIKU TIDAK NAIK', at: K(57, 3)}} lines={[{text: 'Daerahmu naik berapa?', at: K(57), size: 56}]} comment={{text: 'Tulis di komentar', at: K(57, 1)}} />, sfx: 'whoosh'},
  {start: K(58), el: <S.Outro shareAt={K(58)} subAt={K(58, 2)} byeAt={K(58, 3)} />},
  {start: K(59), el: <N.Kinetic words={[w('Berdasarkan pemberitaan per 21 November 2026', K(59), undefined, 64), w('Angka UMP/UMK bisa berubah', K(59, 2), undefined, 64)]} />},
];
