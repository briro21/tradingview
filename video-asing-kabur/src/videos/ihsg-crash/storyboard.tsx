import * as S from '../../rupiah/scenes';
import {C} from '../../theme';
import * as N from '../news';
import captions from './captions.json';
import lines from './lines.json';
import meta from './meta.json';
import {Seg} from '../WhatIf';

// IHSG Anjlok 11,57% dalam Sehari (explainer berita). Ritme: potongan baru tiap 2–4 dtk, dikunci ke potongan caption.
// K(i, k) = detik mulai potongan caption ke-k di dalam baris naskah i (dibatasi ke akhir baris).
const K = (i: number, k = 0) => {
  const ln = lines[i];
  const cs = captions.filter((c) => c.start >= ln.start - 0.05 && c.start < ln.end - 0.05);
  return cs.length ? cs[Math.min(k, cs.length - 1)].start : ln.start;
};
const w = (t: string, at: number, color?: string, size?: number) => ({t, at, color, size});

export const timeline = (L: (i: number, d?: number) => number): Seg[] => [
  // HOOK: frame 0 = thumbnail
  {start: 0, el: <N.Cover data={meta.thumbs} />},
  {start: K(1), el: <N.Kinetic words={[w('Jumat', K(1)), w('16 Oktober 2026', K(1, 1)), w('08.58', K(1, 2), C.red, 150)]} mark="IHSG" />, sfx: 'whoosh'},
  {start: K(1, 3), el: <N.Halt at={K(2, 0) + 0.6} />, sfx: 'thump'},
  {start: K(2, 2), el: <N.Counter from={0} to={-8} at={K(2, 2)} dur={1.4} label="IHSG dalam hitungan menit" suffix="%" color={C.red} dark mark="HALT" />, sfx: 'boom'},
  {start: K(3), el: <N.Kinetic words={[w('Dibuka lagi...', K(3)), w('tidak berhenti', K(3, 1), C.red)]} dark mark="IHSG" />},
  {start: K(3, 2), el: <N.Counter from={5863} to={5185} at={K(3, 2)} dur={2.2} label="IHSG ditutup · 16 Okt 2026" color={C.red} sub={w('−11,57% dalam sehari', K(3, 4), C.red, 70)} mark="IHSG" />, sfx: 'boom'},
  {start: K(4), el: <N.Kinetic words={[w('812 saham melemah', K(4)), w('Semua sektor merah', K(4, 1)), w('Tidak ada tempat bersembunyi', K(4, 2), C.red, 90)]} />, sfx: 'whoosh'},
  {start: K(5), el: <N.Kinetic words={[w('Bukan perang ✕', K(5)), w('Bukan bencana ✕', K(5, 1)), w('Bukan bank bangkrut ✕', K(5, 2))]} dark />},
  {start: K(6), el: <N.Kinetic words={[w('Satu pengumuman', K(6), undefined, 130), w('dari New York 🇺🇸', K(6, 1), C.red, 120)]} mark="NEW YORK" />, sfx: 'boom'},
  {start: K(7), el: <S.Cards title={{text: 'DI VIDEO INI', at: K(7), size: 76}} cards={[{e: '🔍', t: 'Apa yang terjadi', at: K(7, 1), color: C.red}, {e: '🌍', t: 'Kenapa terburuk', sub: 'di dunia', at: K(7, 2), color: C.yellow}, {e: '👛', t: 'Artinya', sub: 'untuk uangmu', at: K(7, 3), color: C.green}]} />, sfx: 'whoosh'},

  // BAGIAN 1
  {start: L(8, -0.2), el: <N.Part n={1} title="Siapa sebenarnya MSCI?" at={L(8)} />, sfx: 'boom'},
  {start: K(9), el: <N.Kinetic words={[w('MSCI', K(9), C.red, 200), w('pembuat indeks saham global', K(9, 1)), w('daftar patokan investor dunia', K(9, 3))]} mark="MSCI" />},
  {start: K(10), el: <N.Kinetic words={[w('Triliunan dolar', K(10), C.red, 130), w('tidak dipilih manusia', K(10, 2)), w('satu per satu', K(10, 3))]} dark mark="$$$" />, sfx: 'whoosh'},
  {start: K(11), el: <N.Flow at={K(11, 1)} left="DAFTAR MSCI" right="DANA INDEKS & PENSIUN" label={w('Mengikuti daftar secara otomatis', K(11, 2), C.green)} />},
  {start: K(12), el: <N.Flow at={K(12)} left="NEGARA MASUK" right="UANG DUNIA" label={w('Masuk daftar → uang datang', K(12, 0), C.green)} />, sfx: 'ding'},
  {start: K(12, 2), el: <N.Flow at={K(12, 2)} out left="NEGARA KELUAR" right="UANG DUNIA" label={w('Keluar daftar → uang pergi. Otomatis.', K(12, 3), C.red)} />, sfx: 'thump'},
  {start: K(13), el: <S.Cards title={{text: 'EMERGING MARKET', at: K(13), size: 80}} cards={[{e: '🇮🇳', t: 'India', at: K(13, 2)}, {e: '🇨🇳', t: 'Tiongkok', at: K(13, 3)}, {e: '🇧🇷', t: 'Brasil', at: K(13, 4)}, {e: '🇮🇩', t: 'Indonesia', at: K(13, 2), color: C.red}]} />},
  {start: K(14), el: <N.Counter from={0} to={1} at={K(14, 1)} dur={1} label="Bobot Indonesia di indeks" prefix="± " suffix="%" color={C.yellow} sub={w('kecil, tapi uangnya sangat besar', K(14, 3))} />},
  {start: K(15), el: <N.Kinetic words={[w('15 Oktober', K(15), C.red, 140), w('waktu New York', K(15, 1)), w('langkah yang sangat jarang', K(15, 3), C.red)]} dark mark="MSCI" />, sfx: 'riser'},
  {start: K(16), el: <S.Roadmap items={[{text: 'EMERGING', at: K(16, 1), color: C.green}, {text: 'FRONTIER (dilewati)', at: K(16, 3), color: '#9aa3b8'}, {text: 'STANDALONE', at: K(16, 5), color: C.red}]} lines={[{text: 'Usulan: turun langsung ke standalone', at: K(16), size: 54}]} />},
  {start: K(17), el: <N.Kinetic words={[w('Keesokan paginya...', K(17)), w('pasar kita runtuh', K(17, 1), C.red, 140)]} dark mark="CRASH" />, sfx: 'boom'},

  // BAGIAN 2
  {start: L(18, -0.2), el: <N.Part n={2} title="Ini bukan pertama kalinya" at={L(18)} />, sfx: 'boom'},
  {start: K(19), el: <N.Timeline title={w('Mundur ke awal tahun', K(19))} items={[{date: '2 JAN', text: 'IHSG ± 8.700', at: K(20), color: C.green}, {date: '27 JAN', text: 'MSCI bekukan bobot', at: K(21)}, {date: '28–29 JAN', text: 'Trading halt 2 hari', at: K(23, 1)}, {date: '30 JAN', text: 'Dirut BEI & Ketua OJK mundur', at: K(24)}]} />},
  {start: K(20, 2), el: <N.Kinetic words={[w('Banyak orang optimis', K(20, 2)), w('"9.000 tinggal menunggu waktu"', K(20, 3), C.green, 90)]} />},
  {start: K(21), el: <N.Headlines items={[{src: '27 JANUARI 2026', text: 'MSCI bekukan penyesuaian bobot saham Indonesia', at: K(21)}, {src: 'ALASAN', text: 'Data free float dinilai kurang transparan', at: K(21, 3)}]} mark="MSCI" />, sfx: 'thump'},
  {start: K(22), el: <S.Split at={K(22, 1)} left="DIPEGANG PEMILIK" right="FREE FLOAT (PUBLIK)" lines={[{text: 'Free float = saham yang benar-benar bisa dibeli publik', at: K(22), size: 48}]} />},
  {start: K(22, 4), el: <N.Kinetic words={[w('Angkanya tidak jelas?', K(22, 4)), w('Investor global tak tahu', K(22, 6)), w('berapa yang bisa diperdagangkan', K(22, 7), C.red, 80)]} dark />},
  {start: K(23), el: <N.Counter from={0} to={-7.35} decimals={2} at={K(23)} dur={1.2} label="IHSG · 28 Januari 2026" suffix="%" color={C.red} sub={w('Trading halt dua hari berturut-turut', K(23, 2), C.red)} mark="HALT" />, sfx: 'boom'},
  {start: K(24), el: <N.Headlines items={[{src: '30 JANUARI 2026', text: 'Direktur Utama BEI mengundurkan diri', at: K(24)}, {src: 'HARI YANG SAMA', text: 'Ketua Dewan Komisioner OJK juga mundur', at: K(24, 2)}]} dark mark="MUNDUR" />, sfx: 'thump'},
  {start: K(25), el: <S.Cards flow="in" title={{text: 'REAKSI PEMERINTAH', at: K(25), size: 72, color: '#3b7be0'}} cards={[{e: '📈', t: 'Free float', sub: 'minimal 15%', at: K(25, 1)}, {e: '🛠️', t: 'Reformasi bursa', at: K(25, 3)}, {e: '🏛️', t: 'Kepemilikan bursa', sub: 'diubah dipercepat', at: K(25, 4)}]} />, sfx: 'whoosh'},
  {start: K(26), el: <N.Ranking title={w('Kuartal I 2026: tekanan tidak berhenti', K(26))} rows={[{name: 'IHSG', v: -18.5, at: K(26, 2), hl: true}]} max={20} />},

  // BAGIAN 3
  {start: L(27, -0.2), el: <N.Part n={3} title="Kenapa MSCI begitu keras?" at={L(27)} />, sfx: 'boom'},
  {start: K(28), el: <N.Headlines items={[{src: 'MSCI · ALASAN 1', text: 'Dugaan perilaku perdagangan terkoordinasi yang terus terjadi', at: K(28, 1)}, {src: 'MSCI · ALASAN 2', text: 'Akses pasar bagi investor asing belum konsisten', at: K(28, 4)}]} mark="MSCI" />},
  {start: K(29), el: <N.Kinetic words={[w('Bahasa sederhananya:', K(29)), w('harga sebagian saham', K(29, 2)), w('tidak terbentuk secara wajar', K(29, 3), C.red, 90)]} dark />},
  {start: K(30), el: <N.Kinetic words={[w('SAHAM GORENGAN 🍳', K(30), C.red, 140), w('pemilik terkonsentrasi', K(30, 2)), w('porsi publik kecil', K(30, 3)), w('naik ratusan persen tanpa alasan', K(30, 5), C.red, 80)]} mark="GORENG" />, sfx: 'boom'},
  {start: K(31), el: <S.Split at={K(31, 1)} left="INVESTOR LOKAL: PELUANG?" right="DANA PENSIUN ASING: BAHAYA" lines={[{text: 'Dua cara memandang saham yang sama', at: K(31), size: 50}]} />},
  {start: K(32), el: <N.Kinetic words={[w('Harga bisa diatur?', K(32)), w('→ indeks menyesatkan', K(32, 2)), w('→ uang bisa terjebak', K(32, 4), C.red)]} dark mark="INDEKS" />},
  {start: K(33), el: <S.Roadmap items={[{text: 'Reformasi dijanjikan', at: K(33), color: '#3b7be0'}, {text: 'Belum terbukti nyata', at: K(33, 2), color: C.yellow}, {text: 'Lompat ke STANDALONE', at: K(33, 4), color: C.red}]} lines={[{text: 'Penilaian MSCI', at: K(33), size: 54}]} />, sfx: 'thump'},

  // BAGIAN 4
  {start: L(34, -0.2), el: <N.Part n={4} title="Paradoks yang membingungkan" at={L(34)} />, sfx: 'boom'},
  {start: K(36), el: <S.Split at={K(37)} left="LABA PERUSAHAAN 📈" right="HARGA SAHAM 📉" lines={[{text: 'Sebagian besar emiten tetap untung · ekonomi tumbuh > 5%', at: K(36), size: 46}]} />},
  {start: K(38), el: <S.Scale tiltAt={K(38, 3)} dollars={6} lines={[{text: 'Harga saham ≠ hanya laba', at: K(38), size: 58}, {text: 'Siapa yang mau membeli vs siapa yang terpaksa menjual', at: K(38, 3), size: 44, color: C.red}]} />},
  {start: K(39), el: <N.Counter from={0} to={92} at={K(39, 1)} dur={2} label="Jual bersih asing 2026 (s.d. Oktober)" prefix="Rp" suffix=" T" color={C.red} sub={w('Arus keluar terbesar sejak 1998 (Bloomberg Technoz)', K(39, 4), C.red, 48)} dark mark="ASING" />, sfx: 'boom'},
  {start: K(40), el: <N.Flow at={K(40)} out left="IHSG" right="LUAR NEGERI" label={w('Perusahaan sehat pun ikut turun', K(40, 2), C.red)} />},
  {start: K(41), el: <N.Ranking title={w('Kinerja sejak awal tahun (pertengahan Okt 2026)', K(41), undefined, 60)} rows={[{name: 'IHSG', v: -40, at: K(41, 1), hl: true}, {name: 'Terburuk ke-2', v: -18, at: K(41, 4)}]} max={42} />, sfx: 'whoosh'},
  {start: K(42), el: <N.Counter from={16000} to={18259} at={K(42, 2)} dur={2} label="Rupiah per US$ · rekor terlemah" prefix="Rp" color={C.red} sub={w('Uang keluar dari saham, juga keluar dari rupiah', K(42, 4))} mark="RUPIAH" />, sfx: 'thump'},

  // BAGIAN 5
  {start: L(43, -0.2), el: <N.Part n={5} title="Apa artinya untuk kamu?" at={L(43)} />, sfx: 'boom'},
  {start: K(44), el: <N.Kinetic words={[w('"Aku tidak punya saham..."', K(44)), w('"bukan urusanku"', K(44, 2)), w('Tidak sesederhana itu', K(44, 3), C.red)]} />},
  {start: K(45), el: <S.BigPrice e="🧺" label="Reksa dana saham / campuran di aplikasimu" from={1000000} to={650000} at={K(45, 2)} delta="ikut turun" lines={[{text: '1 · REKSA DANA', at: K(45), size: 60}]} />},
  {start: K(46), el: <S.PriceGrid items={[{e: '📱', n: 'Gawai impor', p: 4000000, at: K(46, 1), pct: 0.08}, {e: '🌾', n: 'Bahan baku', p: 100000, at: K(46, 2), pct: 0.06}, {e: '💊', n: 'Obat impor', p: 50000, at: K(46, 3), pct: 0.05}]} lines={[{text: '2 · HARGA BARANG', at: K(46), size: 60}]} note="(ilustrasi arah, bukan angka pasti)" />},
  {start: K(47), el: <S.Domino items={[{e: '📉', t: 'Pasar lesu'}, {e: '🏦', t: 'Modal sulit'}, {e: '⏸️', t: 'Ekspansi tertunda'}, {e: '💼', t: 'Lowongan tertunda'}]} startAt={K(47, 2)} lines={[{text: '3 · LAPANGAN KERJA', at: K(47), size: 60}]} />},
  {start: K(48), el: <N.Headlines items={[{src: 'REVIEW MSCI NOVEMBER 2026', text: '8 saham Indonesia dikeluarkan', at: K(48, 1)}, {src: 'INDEKS UTAMA', text: 'Barito Pacific (BRPT) keluar', at: K(48, 3)}, {src: 'SMALL CAP', text: 'CTRA · JSMR · EMTK · AVIA · MTEL · RAJA · WIFI', at: K(48, 5)}]} mark="MSCI" />, sfx: 'thump'},
  {start: K(49), el: <N.Kinetic words={[w('Berlaku setelah 30 November', K(49), C.red, 100), w('dana indeks harus menjual', K(49, 2))]} dark />},

  // BAGIAN 6
  {start: L(50, -0.2), el: <N.Part n={6} title="Apa yang terjadi selanjutnya?" at={L(50)} />, sfx: 'boom'},
  {start: K(51), el: <N.Timeline items={[{date: '30 APR 2027', text: 'Batas masukan', at: K(51, 3), color: C.yellow}, {date: '30 JUN 2027', text: 'Keputusan akhir MSCI', at: K(51, 0)}]} title={w('Hitung mundur', K(51))} dark />},
  {start: K(52), el: <S.TwoDoors a={{text: 'REFORMASI CEPAT', at: K(53)}} b={{text: 'STANDALONE', at: K(54)}} lines={[{text: 'Dua skenario', at: K(52), size: 64}]} />, sfx: 'riser'},
  {start: K(53, 1), el: <S.Cards flow="in" title={{text: 'SKENARIO 1', at: K(53, 1), size: 72, color: C.green}} cards={[{e: '🔎', t: 'Pemilik saham transparan', at: K(53, 2)}, {e: '📈', t: 'Free float naik', at: K(53, 3)}, {e: '🚨', t: 'Pengawasan nyata', at: K(53, 4)}, {e: '✅', t: 'Status bisa diselamatkan', at: K(53, 6)}]} />},
  {start: K(54, 1), el: <N.Flow at={K(54, 2)} out left="PASAR INDONESIA" right="DANA INDEKS GLOBAL" label={w('Skenario 2: sebagian dana indeks harus keluar', K(54, 2), C.red)} />, sfx: 'thump'},
  {start: K(55), el: <N.Kinetic words={[w('"Kami tidak gentar"', K(55)), w('Pasar tidak bergerak karena kata-kata', K(55, 2)), w('tapi karena BUKTI', K(55, 4), C.red, 130)]} dark mark="BUKTI" />, sfx: 'boom'},
  {start: K(56), el: <S.Lessons items={[{e: '🧘', t: 'Jangan panik', sub: 'tapi jangan asal serok', at: K(57)}, {e: '🔍', t: 'Periksa isinya', sub: 'bisnis nyata vs cerita', at: K(58)}, {e: '🧺', t: 'Sebar risiko', sub: 'saham · sektor · negara', at: K(59)}, {e: '🛟', t: 'Dana darurat', sub: 'di luar bursa', at: K(60)}]} />},
  {start: K(61), el: <N.Kinetic words={[w('Menyakitkan', K(61), C.red, 140), w('tapi memaksa bursa bercermin', K(61, 2))]} />},
  {start: K(62), el: <N.Kinetic words={[w('Yang dipertaruhkan:', K(62)), w('Apakah dunia masih percaya', K(62, 3), undefined, 96), w('pada pasar modal Indonesia?', K(62, 5), C.red, 96)]} dark mark="PERCAYA" />, sfx: 'riser'},
  {start: K(63), el: <S.TwoDoors a={{text: 'LOLOS', at: K(63, 2)}} b={{text: 'STANDALONE', at: K(63, 3)}} lines={[{text: 'Sebelum Juni 2027, menurutmu?', at: K(63), size: 56}]} comment={{text: 'Tulis pendapatmu di komentar', at: K(63, 4)}} />, sfx: 'whoosh'},
  {start: K(64), el: <N.Kinetic words={[w('Bukan ajakan jual/beli saham', K(64), undefined, 80), w('Sumber: media keuangan & MSCI · cek deskripsi', K(64, 3), undefined, 60)]} />},
  {start: K(65), el: <S.Outro shareAt={K(65)} subAt={K(65, 3)} byeAt={K(65, 5)} />},
];
