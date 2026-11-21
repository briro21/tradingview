import {AbsoluteFill, Img, staticFile} from 'remotion';
import * as S from '../../rupiah/scenes';
import {C} from '../../theme';
import * as N from '../news';
import * as T from '../story';
import captions from './captions.json';
import lines from './lines.json';
import meta from './meta.json';
import {Seg} from '../WhatIf';

// Pesangon Wajib Dititipkan ke Negara Mulai 2027 (explainer + tokoh Raka). Detail teknis menunggu PP.
const K = (i: number, k = 0) => {
  const ln = lines[i];
  const cs = captions.filter((c) => c.start >= ln.start - 0.05 && c.start < ln.end - 0.05);
  return cs.length ? cs[Math.min(k, cs.length - 1)].start : ln.start;
};
const KW = (i: number, word: string) => {
  const ln = lines[i];
  const c = captions.find((x) => x.start >= ln.start - 0.05 && x.start < ln.end - 0.05 && x.text.toLowerCase().includes(word.toLowerCase()));
  return c ? c.start : ln.start;
};
const w = (t: string, at: number, color?: string, size?: number) => ({t, at, color, size});
const BLUE = '#3b7be0';

export const timeline = (L: (i: number, d?: number) => number): Seg[] => [
  // HOOK v2 (skill podcast-summary-video): cold open = klaim thumbnail, teaser 3 angka, intro singkat
  // frame 0 = thumbnail utama (gaya OpusCar, dibuat oleh opuscar/thumbs)
  {start: 0, el: <AbsoluteFill><Img src={staticFile('thumbs/pesangon-thumb-1.png')} style={{width: 1920, height: 1080}} /></AbsoluteFill>},
  {start: K(0, 1), el: <N.Kinetic words={[w('MULAI 2027', K(0, 1), C.red, 150), w('dititipkan ke negara', K(0, 2), undefined, 100)]} mark="2027" />, sfx: 'boom'},
  {start: K(1), el: <N.Counter from={0} to={8475} at={K(1)} dur={1.3} label="Buruh masih menunggu pesangon" suffix=" orang" color={C.red} sub={w('lebih dari setahun setelah pabrik pailit', K(1, 3), C.red, 50)} dark mark="PAILIT" />, sfx: 'thump'},
  {start: K(2), el: <N.Clip src="opuscar/psg-austria-16x9.mp4" startSec={4.3} />, sfx: 'whoosh'},
  {start: K(3), el: <N.Headlines items={[{src: 'PESAN BERANTAI', text: '"Disetor ke Danantara"', at: K(3)}, {src: 'KEMNAKER', text: 'Sudah dibantah ✕', at: K(3, 2)}]} dark mark="HOAKS" />, sfx: 'thump'},
  {start: K(4), el: <S.TwoDoors a={{text: 'RISIKO BARU', at: K(4, 3)}} b={{text: 'LEBIH AMAN', at: K(4, 1)}} lines={[{text: 'Pertanyaannya:', at: K(4), size: 60}]} />, sfx: 'riser'},
  {start: K(5), el: <S.Cards title={{text: 'DI VIDEO INI', at: K(5), size: 76}} cards={[{e: '📜', t: 'Aturannya', at: K(5, 1), color: '#3b7be0'}, {e: '🎲', t: '3 skenario', at: K(5, 2), color: C.yellow}, {e: '✅', t: '4 hal dicek', at: K(5, 3), color: C.green}]} />},
  {start: K(6), el: <N.Kinetic words={[w('Ingat:', K(6)), w('banyak detail BELUM ditetapkan', K(6, 1), C.red, 96)]} dark mark="PP" />},

  // BAGIAN 1
  {start: L(7, -0.2), el: <N.Part n={1} title="Aturannya sebenarnya apa?" at={L(7)} />, sfx: 'boom'},
  {start: K(8), el: <N.Clip src="opuscar/psg-uang-pindah-16x9.mp4" />, sfx: 'whoosh'},
  {start: K(11), el: <S.Cards title={{text: 'SIAPA YANG WAJIB?', at: K(11), size: 76}} cards={[{e: '🏪', t: 'Usaha mikro & kecil', sub: 'DIKECUALIKAN', at: K(11, 1), color: C.green}, {e: '🏭', t: 'Usaha menengah & besar', sub: 'WAJIB', at: K(11, 4), color: C.red}]} />},
  {start: K(12), el: <N.Timeline title={w('Tenggat', K(12))} items={[{date: '28 OKT 2026', text: 'UU diundangkan', at: K(12), color: BLUE}, {date: 'OKT 2027', text: 'Dana wajib dipindahkan', at: K(12, 3), color: C.red}]} />},
  {start: K(13), el: <S.Domino items={[{e: '📝', t: 'Peringatan tertulis'}, {e: '⛔', t: 'Pembatasan usaha'}, {e: '❌', t: 'Izin dicabut'}]} startAt={K(13, 1)} lines={[{text: 'Sanksi bertahap', at: K(13), size: 60}]} />},
  {start: K(14), el: <S.Cards title={{text: 'YANG BELUM ADA', at: K(14), size: 80, color: C.red}} cards={[{e: '💵', t: 'Besaran setoran', sub: 'belum ditetapkan', at: K(15)}, {e: '🏛️', t: 'Lembaga pengelola', sub: 'belum ditunjuk', at: K(15, 2)}, {e: '🔓', t: 'Cara pencairan', sub: 'belum diatur', at: K(15, 4)}]} />},
  {start: K(16), el: <N.Kinetic words={[w('Menunggu', K(16)), w('PERATURAN PEMERINTAH', K(16, 1), C.red, 110), w('kerangka sudah, isi belum', K(16, 3))]} dark mark="PP" />},
  {start: K(17), el: <N.Headlines items={[{src: 'PESAN BERANTAI', text: '"Dana pesangon disetor ke Danantara"', at: K(17, 1)}, {src: 'KEMNAKER', text: 'Membantah · pengelola belum diputuskan', at: K(17, 4)}]} mark="HOAKS" />, sfx: 'thump'},

  // BAGIAN 2
  {start: L(18, -0.2), el: <N.Part n={2} title="Kenapa aturan ini muncul?" at={L(18)} />, sfx: 'boom'},
  {start: K(19), el: <N.Clip src="opuscar/psg-pabrik-16x9.mp4" />, sfx: 'whoosh'},
  {start: K(23), el: <T.Dialog set="street" left={[{who: 'kamu', face: 'serius'}]} right={[{who: 'raka', pose: 'headInHands', face: 'sedih'}]} talks={[{name: 'Raka', who: 'raka', text: 'Bro, kalau pabrikku tutup, pesangonku diambil dari mana? Kasnya aja katanya lagi seret.', at: K(23), side: 'right'}]} />},
  {start: K(24), el: <N.Kinetic words={[w('Pertanyaan', K(24)), w('JUTAAN PEKERJA', K(24, 1), C.red, 140)]} dark />},
  {start: K(25), el: <N.Clip src="opuscar/psg-dana-darurat-16x9.mp4" />, sfx: 'whoosh'},

  // SKENARIO 1
  {start: L(27, -0.2), el: <N.Part n={3} title="Skenario 1: berjalan baik" at={L(27)} />, sfx: 'boom'},
  {start: K(28), el: <N.Kinetic words={[w('Belajar dari', K(28)), w('NEGARA LAIN', K(28, 1), C.red, 140)]} mark="AUSTRIA" />, sfx: 'whoosh'},
  {start: K(29), el: <N.Clip src="opuscar/psg-austria-16x9.mp4" />, sfx: 'whoosh'},
  {start: K(32), el: <N.Clip src="opuscar/psg-raka-sheet-16x9.mp4" />, sfx: 'whoosh'},
  {start: K(35), el: <S.Split at={K(35, 3)} left="KAS PERUSAHAAN" right="DANA RAKA (TERPISAH)" lines={[{text: 'Yang penting: uangnya SUDAH ADA', at: K(35, 2), size: 52, color: C.green}]} />},
  {start: KW(35, 'Indonesia'), el: <N.Kinetic words={[w('Di Indonesia:', KW(35, 'Indonesia')), w('besaran pesangon tetap ikut aturan', KW(35, 'Indonesia') + 1.5, undefined, 80), w('dana cadangan = SUMBER pembayarannya', KW(35, 'sumber'), '#3b7be0', 84)]} mark="SUMBER" />},
  {start: K(36), el: <N.Kinetic words={[w('Pabrik tutup besok? 🏭', K(36)), w('Uang Raka TIDAK ikut tenggelam', K(36, 2), C.green, 100)]} mark="AMAN" />, sfx: 'thump'},
  {start: K(37), el: <T.Dialog set="street" left={[{who: 'kamu', face: 'senang'}]} right={[{who: 'raka', pose: 'cheer', face: 'senang'}]} talks={[{name: 'Raka', who: 'raka', text: 'Jadi kalau perusahaannya bangkrut, uangnya tetap aman di tempat lain? Itu baru masuk akal.', at: K(37), side: 'right'}]} />, sfx: 'ding'},
  {start: K(38), el: <S.Split at={K(38, 2)} left="PEKERJA: KEPASTIAN" right="PERUSAHAAN: TIDAK KAGET" lines={[{text: 'Kalau berjalan baik', at: K(38), size: 56, color: C.green}]} />},
  {start: KW(38, 'sampai sini'), el: <N.Kinetic words={[w('Berguna sampai sini?', KW(38, 'sampai sini')), w('🔔 SUBSCRIBE', KW(38, 'subscribe'), C.red, 150), w('lanjut: skenario paling dikhawatirkan', KW(38, 'setelah'), undefined, 70)]} dark mark="SUBSCRIBE" />, sfx: 'ding'},

  // SKENARIO 2
  {start: L(39, -0.2), el: <N.Part n={4} title="Skenario 2: dikelola buruk" at={L(39)} />, sfx: 'boom'},
  {start: K(41), el: <N.Kinetic words={[w('Bukan uang negara', K(41), undefined, 110), w('UANG PEKERJA', K(41, 2), C.red, 140), w('yang dititipkan', K(41, 3))]} dark mark="TITIPAN" />},
  {start: K(42), el: <S.Domino items={[{e: '👷', t: 'Jutaan pekerja'}, {e: '📅', t: 'Setiap bulan'}, {e: '⏳', t: 'Bertahun-tahun'}, {e: '🏦', t: 'Dana raksasa'}]} startAt={K(42, 2)} lines={[{text: 'Pengelolaan jadi sangat penting', at: K(42), size: 56}]} />},
  {start: K(43), el: <N.Headlines items={[{src: 'PELAJARAN MAHAL', text: 'Kasus Jiwasraya', at: K(43, 1)}, {src: 'PELAJARAN MAHAL', text: 'Kasus Asabri', at: K(43, 2)}, {src: 'POLANYA', text: 'Dana besar + pengawasan lemah = rugi triliunan', at: K(43, 4)}]} dark mark="AWASI" />, sfx: 'thump'},
  {start: K(44), el: <N.Kinetic words={[w('Bukan tuduhan', K(44)), w('pengelolanya belum ditunjuk', K(44, 2)), w('→ aturan harus sangat hati-hati', K(44, 4), BLUE, 90)]} />},
  {start: K(45), el: <N.Clip src="opuscar/psg-tiga-tanya-16x9.mp4" />, sfx: 'whoosh'},
  {start: K(49), el: <T.Dialog set="house" left={[{who: 'kamu', face: 'serius'}]} right={[{who: 'raka', face: 'serius'}]} talks={[{name: 'Raka', who: 'raka', text: 'Aku nggak masalah uangku dititipkan. Asal aku bisa lihat saldonya, kayak lihat saldo BPJS.', at: K(49), side: 'right'}]} />},
  {start: K(50), el: <N.Kinetic words={[w('Tanpa jawaban jelas', K(50)), w('niat melindungi', K(50, 2)), w('→ sumber curiga baru', K(50, 4), C.red, 110)]} dark mark="?" />},

  // SKENARIO 3
  {start: L(51, -0.2), el: <N.Part n={5} title="Skenario 3: perusahaan bereaksi" at={L(51)} />, sfx: 'boom'},
  {start: K(52), el: <N.Clip src="opuscar/psg-reaksi-16x9.mp4" />, sfx: 'whoosh'},
  {start: K(55), el: <N.Kinetic words={[w('Analisis kemungkinan', K(55), undefined, 100), w('bukan kepastian', K(55, 1), BLUE)]} dark />},
  {start: K(56), el: <S.Split at={K(56, 3)} left="TAGIHAN BESAR SEKALIGUS" right="SEDIKIT DEMI SEDIKIT" lines={[{text: 'Sisi lainnya', at: K(56), size: 56, color: C.green}]} />},
  {start: K(57), el: <S.TwoDoors a={{text: 'TERLALU KECIL', at: K(57, 3)}} b={{text: 'TERLALU BESAR', at: K(57, 5)}} lines={[{text: 'Besaran setoran di PP = penentu', at: K(57), size: 54}]} />, sfx: 'riser'},

  // CEK
  {start: L(58, -0.2), el: <N.Part n={6} title="Yang perlu kamu cek hari ini" at={L(58)} />, sfx: 'boom'},
  {start: K(59), el: <N.Clip src="opuscar/psg-cek-sketch-16x9.mp4" />, sfx: 'whoosh'},
  {start: K(63), el: <S.Split at={K(63, 3)} left="MSCI & BADAK JAWA" right="PESANGON" lines={[{text: 'Benang merah yang sama', at: K(63), size: 56}]} />, sfx: 'whoosh'},
  {start: K(64), el: <N.Kinetic words={[w('Niat baik saja tidak cukup', K(64), undefined, 100), w('PROSES TERBUKA', K(64, 3), C.green, 130), w('+ bisa dipercaya', K(64, 4), BLUE)]} dark mark="TRUST" />, sfx: 'boom'},
  {start: K(65), el: <S.TwoDoors a={{text: 'DISIMPAN PERUSAHAAN', at: K(65, 2)}} b={{text: 'DITITIPKAN NEGARA', at: K(65, 4)}} lines={[{text: 'Kalau kamu boleh memilih?', at: K(65), size: 56}]} comment={{text: 'Tulis alasanmu di komentar', at: K(65, 6)}} />, sfx: 'whoosh'},
  {start: K(66), el: <S.Outro shareAt={K(66)} subAt={K(66, 3)} byeAt={K(66, 5)} />},
  {start: K(67), el: <N.Kinetic words={[w('Berdasarkan pemberitaan per November 2026', K(67), undefined, 64), w('Detail menunggu PP · bisa berubah', K(67, 3), undefined, 64)]} />},
];
