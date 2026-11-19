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
const w = (t: string, at: number, color?: string, size?: number) => ({t, at, color, size});
const BLUE = '#3b7be0';

export const timeline = (L: (i: number, d?: number) => number): Seg[] => [
  // HOOK
  {start: 0, el: <N.Cover data={meta.thumbs} />},
  {start: K(0, 0) + 1.2, el: <N.Counter from={0} to={8475} at={K(0, 0) + 1.2} dur={1.4} label="Eks buruh menunggu pesangon" suffix=" orang" color={C.red} mark="PESANGON" />, sfx: 'boom'},
  {start: K(1), el: <N.Headlines items={[{src: 'PABRIK TEKSTIL RAKSASA', text: 'Dinyatakan PAILIT', at: K(1, 1)}, {src: 'LEBIH DARI SETAHUN KEMUDIAN', text: 'Pesangon belum cair, buruh masih menunggu', at: K(1, 3)}, {src: 'BAGI KELUARGA MEREKA', text: 'Pesangon = modal bertahan cari kerja baru', at: K(1, 6)}]} dark mark="PAILIT" />, sfx: 'thump'},
  {start: K(2), el: <N.Kinetic words={[w('Mulai 2027', K(2), C.red, 140), w('agar tidak terulang', K(2, 1))]} mark="2027" />},
  {start: K(3), el: <N.Flow at={K(3, 1)} left="PESANGONMU" right="LEMBAGA PEMERINTAH" label={w('Disisihkan sejak sekarang, lalu dititipkan', K(3, 2), BLUE)} />, sfx: 'whoosh'},
  {start: K(4), el: <S.TwoDoors a={{text: 'LEBIH AMAN', at: K(4, 1)}} b={{text: 'RISIKO BARU', at: K(4, 3)}} lines={[{text: 'Pertanyaannya:', at: K(4), size: 60}]} />, sfx: 'riser'},
  {start: K(5), el: <S.Cards title={{text: '3 SKENARIO', at: K(5, 2), size: 80}} cards={[{e: '✅', t: 'Berjalan baik', at: K(5, 4), color: C.green}, {e: '⚠️', t: 'Dikelola buruk', at: K(5, 5), color: C.red}, {e: '🏭', t: 'Perusahaan bereaksi', at: K(5, 6), color: C.yellow}]} />},
  {start: K(6), el: <N.Kinetic words={[w('Di akhir:', K(6)), w('1 hal yang harus kamu cek', K(6, 1), C.red, 100)]} dark mark="CEK" />},

  // BAGIAN 1
  {start: L(7, -0.2), el: <N.Part n={1} title="Aturannya sebenarnya apa?" at={L(7)} />, sfx: 'boom'},
  {start: K(8), el: <N.Headlines items={[{src: 'DASAR HUKUM', text: 'UU No. 27/2026 tentang Pelindungan Ketenagakerjaan', at: K(8, 1)}, {src: 'DIUNDANGKAN', text: '28 Oktober 2026', at: K(8, 4)}]} mark="UU 27" />},
  {start: K(9), el: <N.Kinetic words={[w('PASAL 253', K(9), C.red, 150), w('dana cadangan pesangon', K(9, 2)), w('sumber pembayaran saat PHK', K(9, 4), BLUE)]} mark="253" />, sfx: 'thump'},
  {start: K(10), el: <S.Split at={K(10, 2)} left="DULU: KAS PERUSAHAAN" right="NANTI: LEMBAGA PEMERINTAH" lines={[{text: 'Siapa yang memegang uangnya?', at: K(10), size: 54}]} />},
  {start: K(11), el: <S.Cards title={{text: 'SIAPA YANG WAJIB?', at: K(11), size: 76}} cards={[{e: '🏪', t: 'Usaha mikro & kecil', sub: 'DIKECUALIKAN', at: K(11, 1), color: C.green}, {e: '🏭', t: 'Usaha menengah & besar', sub: 'WAJIB', at: K(11, 4), color: C.red}]} />},
  {start: K(12), el: <N.Timeline title={w('Tenggat', K(12))} items={[{date: '28 OKT 2026', text: 'UU diundangkan', at: K(12), color: BLUE}, {date: 'OKT 2027', text: 'Dana wajib dipindahkan', at: K(12, 3), color: C.red}]} />},
  {start: K(13), el: <S.Domino items={[{e: '📝', t: 'Peringatan tertulis'}, {e: '⛔', t: 'Pembatasan usaha'}, {e: '❌', t: 'Izin dicabut'}]} startAt={K(13, 1)} lines={[{text: 'Sanksi bertahap', at: K(13), size: 60}]} />},
  {start: K(14), el: <S.Cards title={{text: 'YANG BELUM ADA', at: K(14), size: 80, color: C.red}} cards={[{e: '💵', t: 'Besaran setoran', sub: 'belum ditetapkan', at: K(15)}, {e: '🏛️', t: 'Lembaga pengelola', sub: 'belum ditunjuk', at: K(15, 2)}, {e: '🔓', t: 'Cara pencairan', sub: 'belum diatur', at: K(15, 4)}]} />},
  {start: K(16), el: <N.Kinetic words={[w('Menunggu', K(16)), w('PERATURAN PEMERINTAH', K(16, 1), C.red, 110), w('kerangka sudah, isi belum', K(16, 3))]} dark mark="PP" />},
  {start: K(17), el: <N.Headlines items={[{src: 'PESAN BERANTAI', text: '"Dana pesangon disetor ke Danantara"', at: K(17, 1)}, {src: 'KEMNAKER', text: 'Membantah · pengelola belum diputuskan', at: K(17, 4)}]} mark="HOAKS" />, sfx: 'thump'},

  // BAGIAN 2
  {start: L(18, -0.2), el: <N.Part n={2} title="Kenapa aturan ini muncul?" at={L(18)} />, sfx: 'boom'},
  {start: K(19), el: <N.Flow at={K(19, 1)} left="KAS PERUSAHAAN" right="PESANGON SAAT PHK" label={w('Cara lama: dibayar saat PHK terjadi', K(19, 2), BLUE)} />},
  {start: K(20), el: <N.Counter from={100} to={0} at={K(20, 1)} dur={1.2} label="Kas perusahaan saat bangkrut" prefix="" suffix="%" color={C.red} sub={w('Justru saat paling dibutuhkan', K(20, 2), C.red)} dark mark="KOSONG" />, sfx: 'boom'},
  {start: K(21), el: <N.Timeline title={w('Proses pailit', K(21))} items={[{date: '1', text: 'Pekerja: kreditur didahulukan', at: K(21, 2), color: C.green}, {date: '2', text: 'Aset dijual kurator', at: K(21, 5)}, {date: '3', text: 'Baru pesangon dibayar', at: K(22, 1), color: C.red}]} />},
  {start: K(22, 2), el: <S.Cards title={{text: 'SAMBIL MENUNGGU...', at: K(22, 2), size: 72, color: C.red}} cards={[{e: '🍚', t: 'Tetap harus makan', at: K(22, 3)}, {e: '🧾', t: 'Cicilan jalan terus', at: K(22, 4)}, {e: '🏦', t: 'Aset dijaminkan ke bank', sub: 'dibagi banyak pihak', at: K(22, 6)}]} />},
  {start: K(23), el: <T.Dialog set="street" left={[{who: 'kamu', face: 'serius'}]} right={[{who: 'raka', pose: 'headInHands', face: 'sedih'}]} talks={[{name: 'Raka', who: 'raka', text: 'Bro, kalau pabrikku tutup, pesangonku diambil dari mana? Kasnya aja katanya lagi seret.', at: K(23), side: 'right'}]} />},
  {start: K(24), el: <N.Kinetic words={[w('Pertanyaan', K(24)), w('JUTAAN PEKERJA', K(24, 1), C.red, 140)]} dark />},
  {start: K(25), el: <S.Split at={K(25, 2)} left="MINJAM SAAT SUDAH SAKIT" right="NABUNG SEBELUM SAKIT" lines={[{text: 'Analogi dana darurat', at: K(25), size: 56}]} />},
  {start: K(26), el: <N.Kinetic words={[w('Disisihkan saat SEHAT', K(26, 2), C.green, 110), w('bukan dicari saat TENGGELAM', K(26, 4), C.red, 100)]} mark="CADANGAN" />, sfx: 'ding'},

  // SKENARIO 1
  {start: L(27, -0.2), el: <N.Part n={3} title="Skenario 1: berjalan baik" at={L(27)} />, sfx: 'boom'},
  {start: K(28), el: <N.Kinetic words={[w('Belajar dari negara lain', K(28)), w('🇦🇹 AUSTRIA', K(29), C.red, 150), w('sejak 2003 · "Abfertigung Neu"', K(29, 2))]} mark="AUSTRIA" />, sfx: 'whoosh'},
  {start: K(30), el: <N.Counter from={0} to={1.53} decimals={2} at={K(30, 2)} dur={1.2} label="Setoran perusahaan per bulan (Austria)" suffix="% gaji" color={C.green} sub={w('mulai bulan ke-2 · ke rekening atas nama pekerja', K(30, 6), undefined, 46)} mark="1,53%" />, sfx: 'ding'},
  {start: K(31), el: <S.Cards flow="in" title={{text: 'CIRI SISTEMNYA', at: K(31), size: 76, color: C.green}} cards={[{e: '📈', t: 'Saldo terus bertambah', at: K(31)}, {e: '🔁', t: 'Pindah kerja', sub: 'saldo ikut', at: K(31, 2)}, {e: '👀', t: 'Tahu haknya', sub: 'tanpa menunggu bangkrut', at: K(31, 4)}]} />},
  {start: K(32), el: <N.Kinetic words={[w('Simulasi Raka', K(32), undefined, 120), w('ILUSTRASI angka Austria', K(32, 2), C.red, 90), w('besaran di Indonesia belum ditetapkan', K(32, 4))]} dark mark="SIMULASI" />},
  {start: K(33), el: <N.Counter from={0} to={76500} at={K(33, 3)} dur={1.4} label="1,53% dari gaji Rp5 juta" prefix="Rp" suffix="/bulan" color={BLUE} mark="RAKA" />},
  {start: K(34), el: <T.Balance label="TABUNGAN PESANGON RAKA (ILUSTRASI)" sub="▲ 7 tahun · belum termasuk hasil pengembangan" steps={[{at: K(34), v: 0}, {at: K(34, 3), v: 6426000}]} lines={[{text: '84 bulan × Rp76.500', at: K(34, 1), size: 50}]} />, sfx: 'ding'},
  {start: K(35), el: <S.Split at={K(35, 3)} left="KAS PERUSAHAAN" right="DANA RAKA (TERPISAH)" lines={[{text: 'Yang penting: uangnya SUDAH ADA', at: K(35, 2), size: 52, color: C.green}]} />},
  {start: K(36), el: <N.Kinetic words={[w('Pabrik tutup besok? 🏭', K(36)), w('Uang Raka TIDAK ikut tenggelam', K(36, 2), C.green, 100)]} mark="AMAN" />, sfx: 'thump'},
  {start: K(37), el: <T.Dialog set="street" left={[{who: 'kamu', face: 'senang'}]} right={[{who: 'raka', pose: 'cheer', face: 'senang'}]} talks={[{name: 'Raka', who: 'raka', text: 'Jadi kalau perusahaannya bangkrut, uangnya tetap aman di tempat lain? Itu baru masuk akal.', at: K(37), side: 'right'}]} />, sfx: 'ding'},
  {start: K(38), el: <S.Split at={K(38, 2)} left="PEKERJA: KEPASTIAN" right="PERUSAHAAN: TIDAK KAGET" lines={[{text: 'Kalau berjalan baik', at: K(38), size: 56, color: C.green}]} />},

  // SKENARIO 2
  {start: L(39, -0.2), el: <N.Part n={4} title="Skenario 2: dikelola buruk" at={L(39)} />, sfx: 'boom'},
  {start: K(41), el: <N.Kinetic words={[w('Bukan uang negara', K(41), undefined, 110), w('UANG PEKERJA', K(41, 2), C.red, 140), w('yang dititipkan', K(41, 3))]} dark mark="TITIPAN" />},
  {start: K(42), el: <N.Kinetic words={[w('Jutaan pekerja', K(42, 3)), w('× setiap bulan', K(42, 4)), w('× bertahun-tahun', K(42, 5), C.red, 110)]} mark="RP" />},
  {start: K(43), el: <N.Headlines items={[{src: 'PELAJARAN MAHAL', text: 'Kasus Jiwasraya', at: K(43, 1)}, {src: 'PELAJARAN MAHAL', text: 'Kasus Asabri', at: K(43, 2)}, {src: 'POLANYA', text: 'Dana besar + pengawasan lemah = rugi triliunan', at: K(43, 4)}]} dark mark="AWASI" />, sfx: 'thump'},
  {start: K(44), el: <N.Kinetic words={[w('Bukan tuduhan', K(44)), w('pengelolanya belum ditunjuk', K(44, 2)), w('→ aturan harus sangat hati-hati', K(44, 4), BLUE, 90)]} />},
  {start: K(45), el: <S.Cards title={{text: '3 PERTANYAAN UNTUK PP', at: K(45), size: 72, color: C.red}} cards={[{e: '🪪', t: 'Rekening atas nama?', sub: 'saldo bisa dicek', at: K(46), color: BLUE}, {e: '📊', t: 'Diinvestasikan di mana?', sub: 'siapa mengawasi', at: K(47), color: C.yellow}, {e: '⚖️', t: 'Kalau rugi?', sub: 'siapa menanggung', at: K(48), color: C.red}]} />},
  {start: K(49), el: <T.Dialog set="house" left={[{who: 'kamu', face: 'serius'}]} right={[{who: 'raka', face: 'serius'}]} talks={[{name: 'Raka', who: 'raka', text: 'Aku nggak masalah uangku dititipkan. Asal aku bisa lihat saldonya, kayak lihat saldo BPJS.', at: K(49), side: 'right'}]} />},
  {start: K(50), el: <N.Kinetic words={[w('Tanpa jawaban jelas', K(50)), w('niat melindungi', K(50, 2)), w('→ sumber curiga baru', K(50, 4), C.red, 110)]} dark mark="?" />},

  // SKENARIO 3
  {start: L(51, -0.2), el: <N.Part n={5} title="Skenario 3: perusahaan bereaksi" at={L(51)} />, sfx: 'boom'},
  {start: K(52), el: <S.Scale tiltAt={K(53, 1)} dollars={5} lines={[{text: 'Setoran baru = biaya baru', at: K(52), size: 58}, {text: 'Perusahaan mencari keseimbangan', at: K(53), size: 48}]} />},
  {start: K(54), el: <S.Cards title={{text: 'KEMUNGKINAN REAKSI', at: K(54), size: 70, color: C.red}} cards={[{e: '⏸️', t: 'Kenaikan gaji ditahan', at: K(54, 1)}, {e: '🧐', t: 'Rekrut lebih hati-hati', at: K(54, 2)}, {e: '📄', t: 'Lebih banyak kontrak', sub: '& alih daya', at: K(54, 3)}, {e: '🧵', t: 'Padat karya', sub: 'paling terasa', at: K(54, 5)}]} />},
  {start: K(55), el: <N.Kinetic words={[w('Analisis kemungkinan', K(55), undefined, 100), w('bukan kepastian', K(55, 1), BLUE)]} dark />},
  {start: K(56), el: <S.Split at={K(56, 3)} left="TAGIHAN BESAR SEKALIGUS" right="SEDIKIT DEMI SEDIKIT" lines={[{text: 'Sisi lainnya', at: K(56), size: 56, color: C.green}]} />},
  {start: K(57), el: <S.TwoDoors a={{text: 'TERLALU KECIL', at: K(57, 3)}} b={{text: 'TERLALU BESAR', at: K(57, 5)}} lines={[{text: 'Besaran setoran di PP = penentu', at: K(57), size: 54}]} />, sfx: 'riser'},

  // CEK
  {start: L(58, -0.2), el: <N.Part n={6} title="Yang perlu kamu cek hari ini" at={L(58)} />, sfx: 'boom'},
  {start: K(59), el: <S.Cards title={{text: 'CEK HARI INI', at: K(59), size: 80, color: C.green}} cards={[{e: '🪪', t: 'Status kerjamu', sub: 'tetap/kontrak · masa kerja', at: K(59, 1)}, {e: '🛟', t: 'BPJS Ketenagakerjaan', sub: 'termasuk JKP', at: K(60)}, {e: '🏛️', t: 'Saat PP terbit', sub: 'pengelola & saldo', at: K(61)}, {e: '🚫', t: 'Pesan berantai', sub: 'tunggu yang resmi', at: K(62)}]} />},
  {start: K(63), el: <S.Split at={K(63, 3)} left="MSCI & BADAK JAWA" right="PESANGON" lines={[{text: 'Benang merah yang sama', at: K(63), size: 56}]} />, sfx: 'whoosh'},
  {start: K(64), el: <N.Kinetic words={[w('Niat baik saja tidak cukup', K(64), undefined, 100), w('PROSES TERBUKA', K(64, 3), C.green, 130), w('+ bisa dipercaya', K(64, 4), BLUE)]} dark mark="TRUST" />, sfx: 'boom'},
  {start: K(65), el: <S.TwoDoors a={{text: 'DISIMPAN PERUSAHAAN', at: K(65, 2)}} b={{text: 'DITITIPKAN NEGARA', at: K(65, 4)}} lines={[{text: 'Kalau kamu boleh memilih?', at: K(65), size: 56}]} comment={{text: 'Tulis alasanmu di komentar', at: K(65, 6)}} />, sfx: 'whoosh'},
  {start: K(66), el: <S.Outro shareAt={K(66)} subAt={K(66, 3)} byeAt={K(66, 5)} />},
  {start: K(67), el: <N.Kinetic words={[w('Berdasarkan pemberitaan per November 2026', K(67), undefined, 64), w('Detail menunggu PP · bisa berubah', K(67, 3), undefined, 64)]} />},
];
