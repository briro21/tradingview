import * as S from '../../rupiah/scenes';
import {C} from '../../theme';
import * as N from '../news';
import captions from './captions.json';
import lines from './lines.json';
import meta from './meta.json';
import {Seg} from '../WhatIf';

// What If Badak Jawa Dipindah? 3 Skenario Ekonominya (naskah dari pemilik channel; simulasi, bukan laporan keputusan).
const K = (i: number, k = 0) => {
  const ln = lines[i];
  const cs = captions.filter((c) => c.start >= ln.start - 0.05 && c.start < ln.end - 0.05);
  return cs.length ? cs[Math.min(k, cs.length - 1)].start : ln.start;
};
const w = (t: string, at: number, color?: string, size?: number) => ({t, at, color, size});
const GREEN = '#2e7d32';

export const timeline = (L: (i: number, d?: number) => number): Seg[] => [
  // HOOK (frame 0 = thumbnail)
  {start: 0, el: <N.Cover data={meta.thumbs} />},
  {start: K(1), el: <N.Counter from={0} to={100} at={K(1)} dur={1.6} label="Badak Jawa tersisa di dunia" prefix="80–" suffix=" ekor" color={GREEN} sub={w('Semuanya di SATU tempat', K(1, 3), C.red, 70)} mark="BADAK" />, sfx: 'boom'},
  {start: K(2), el: <N.JavaMap routeAt={K(2, 0) + 0.3} labels={{ujung: K(2), alas: K(2, 1)}} title={w('Gagasan: pindahkan sebagian', K(2))} />, sfx: 'whoosh'},
  {start: K(3), el: <N.Kinetic words={[w('Bukan soal badak', K(3)), w('Siapa yang membayar?', K(3, 2), undefined, 96), w('Siapa yang untung?', K(3, 3), undefined, 96), w('Siapa menanggung kalau gagal?', K(3, 4), C.red, 96)]} mark="RP" />, sfx: 'thump'},
  {start: K(4), el: <N.Headlines items={[{src: '12 NOV 2026 · COP31, TURKI', text: 'Hashim Djojohadikusumo melempar gagasan relokasi badak Jawa', at: K(4, 1)}, {src: 'TUJUAN', text: 'Ujung Kulon → Taman Nasional Alas Purwo, Jawa Timur', at: K(4, 4)}]} mark="COP31" />},
  {start: K(5), el: <N.JavaMap waveAt={K(5, 0) + 0.3} labels={{krakatau: K(5), ujung: K(5, 1)}} title={w('Risiko: tsunami Anak Krakatau', K(5), C.red)} />, sfx: 'riser'},
  {start: K(6), el: <N.Headlines items={[{src: 'KOMISI IV DPR', text: 'Menolak rencana relokasi', at: K(6, 1)}, {src: 'MASYARAKAT BADUY', text: 'Ikut menolak', at: K(6, 3)}, {src: 'MEDIA SOSIAL', text: 'Muncul dugaan: ada hubungannya dengan tambang emas?', at: K(7)}]} dark mark="TOLAK" />, sfx: 'thump'},
  {start: K(8), el: <S.Cards title={{text: '3 SKENARIO · SUDUT UANG', at: K(8), size: 70}} cards={[{e: '✅', t: 'Relokasi berhasil', at: K(9), color: C.green}, {e: '❌', t: 'Relokasi gagal', at: K(9, 2), color: C.red}, {e: '⛏️', t: 'Kalau dugaan tambang benar', at: K(9, 3), color: C.yellow}]} />, sfx: 'whoosh'},
  {start: K(10), el: <N.Kinetic words={[w('Dan di akhir...', K(10)), w('satu hal yang lebih penting', K(10, 1), C.red, 96)]} dark mark="?" />},
  {start: K(11), el: <N.Kinetic words={[w('Supaya adil:', K(11)), w('masih WACANA', K(11, 2), C.red, 130), w('belum diputuskan', K(11, 3)), w('jumlah badak belum ditentukan', K(11, 4))]} mark="WACANA" />},
  {start: K(12), el: <N.Kinetic words={[w('Ini SIMULASI', K(12), C.red, 140), w('bukan laporan keputusan', K(12, 1))]} dark mark="SIMULASI" />},

  // EDUKASI
  {start: K(13), el: <S.Cards title={{text: 'BADAK JAWA 🦏', at: K(13), size: 80}} cards={[{e: '🚫', t: 'Tidak ada di kebun binatang', at: K(13, 1), color: C.red}, {e: '🌍', t: 'Tidak ada di negara lain', at: K(13, 3), color: C.red}]} />},
  {start: K(14), el: <N.Timeline title={w('Rumah satu-satunya: Ujung Kulon', K(14))} items={[{date: 'TERTUA', text: 'Taman nasional tertua di Indonesia', at: K(14, 2), color: GREEN}, {date: '1991', text: 'Situs Warisan Dunia UNESCO', at: K(14, 4), color: '#3b7be0'}]} />},
  {start: K(15), el: <N.Kinetic words={[w('Bukan cuma satwa', K(15)), w('MEREK sebuah kawasan', K(15, 2), C.red, 130)]} mark="BRAND" />, sfx: 'ding'},
  {start: K(16), el: <N.Counter from={0} to={16.5} decimals={1} at={K(16, 3)} dur={1.6} label="Potensi nilai wisata Pulau Peucang" prefix="Rp" suffix=" M/tahun" color={GREEN} sub={w('Satu pulau saja · penelitian akademik', K(16, 5))} mark="PEUCANG" />, sfx: 'ding'},
  {start: K(17), el: <N.Kinetic words={[w('Kecil untuk negara...', K(17)), w('tapi BERULANG', K(17, 2), GREEN, 140), w('selama alam terjaga', K(17, 4))]} />},
  {start: K(18), el: <N.Kinetic words={[w('Ingat ini.', K(18)), w('Nanti kita bandingkan dengan emas 🪙', K(18, 1), C.yellow, 90)]} dark />},

  // KENAPA DIPINDAH
  {start: K(19), el: <N.Kinetic words={[w('Kenapa dipindah?', K(19)), w('DIVERSIFIKASI', K(19, 2), C.red, 140)]} mark="RISIKO" />, sfx: 'whoosh'},
  {start: K(20), el: <S.Cards title={{text: 'SEMUA TELUR DI SATU KERANJANG', at: K(20), size: 64}} cards={[{e: '🧺', t: '1 keranjang', sub: 'Ujung Kulon', at: K(20, 1), color: C.yellow}, {e: '💥', t: 'Keranjang jatuh', sub: 'habis semuanya', at: K(20, 2), color: C.red}]} />},
  {start: K(21), el: <N.Timeline title={w('Habitat kedua: ide lama', K(21))} items={[{date: '1980-an', text: 'Gagasan habitat kedua', at: K(21, 2), color: '#9aa3b8'}, {date: '2026', text: 'Lokasi baru: Alas Purwo', at: K(22, 1)}, {date: '?', text: 'Siapa yang membiayai?', at: K(22, 4), color: C.yellow}]} />},

  // SKENARIO 1
  {start: L(23, -0.2), el: <N.Part n={1} title="Relokasi berhasil" at={L(23)} />, sfx: 'boom'},
  {start: K(23, 2), el: <N.Kinetic words={[w('Uangnya dari mana?', K(23, 2), C.red, 130)]} dark mark="RP" />},
  {start: K(24), el: <N.Flow at={K(24, 1)} left="INVESTOR DI COP31" right="SKEMA PENDANAAN KONSERVASI" label={w('Menurut pemerintah: dana dari investor', K(24, 2), C.green)} />},
  {start: K(25), el: <S.Cards flow="in" title={{text: 'SATGAS · KEPPRES 8/2026', at: K(25), size: 68, color: '#3b7be0'}} cards={[{e: '🏞️', t: '13 taman nasional', sub: 'prioritas', at: K(25, 3)}, {e: '🦏', t: '2 lanskap', sub: 'spesies ikonik', at: K(25, 5)}, {e: '🎯', t: 'Mandiri finansial', sub: 'target 2030', at: K(26)}]} />},
  {start: K(27), el: <S.Cards flow="in" title={{text: 'INSTRUMENNYA', at: K(27), size: 76}} cards={[{e: '🌿', t: 'Kredit keanekaragaman hayati', at: K(27, 2)}, {e: '♾️', t: 'Pendanaan permanen', sub: 'berbasis proyek', at: K(27, 4)}]} />},
  {start: K(28), el: <N.Flow at={K(28, 1)} left="DANA ABADI (DI DEPAN)" right="PENJAGAAN BERTAHUN-TAHUN" label={w('Hasilnya membiayai konservasi', K(28, 3), C.green)} />, sfx: 'ding'},
  {start: K(29), el: <N.Kinetic words={[w('Pendapatan taman nasional', K(29)), w('→ badan layanan umum', K(29, 1), '#3b7be0'), w('→ operasional konservasi', K(29, 3), GREEN)]} />},
  {start: K(30), el: <N.Ranking title={w('Kebutuhan vs yang disiapkan (triliun rupiah)', K(30), undefined, 60)} rows={[{name: 'Kebutuhan/tahun', v: 164, at: K(30, 3), hl: true}, {name: '(batas bawah)', v: 118, at: K(30, 4)}, {name: 'Way Kambas', v: 2, at: K(31, 2)}]} unit=" T" max={170} />, sfx: 'whoosh'},
  {start: K(32), el: <N.Kinetic words={[w('Celah pendanaan BESAR', K(32), C.red, 120), w('→ cari uang dari luar', K(32, 2))]} dark mark="GAP" />},
  {start: K(33), el: <N.Kinetic words={[w('Biaya relokasi badak?', K(33)), w('Tidak ada angka resmi', K(33, 2), C.red, 110), w('Seharusnya dibuka ke publik', K(33, 4))]} mark="?" />, sfx: 'thump'},
  {start: K(34), el: <N.Timeline title={w('Soal waktu', K(34))} items={[{date: '2029', text: 'Target awal populasi kedua', at: K(34, 1), color: '#9aa3b8'}, {date: '10–15 THN', text: 'Persiapan layak menurut pakar', at: K(34, 4), color: C.red}]} />},
  {start: K(35), el: <S.Cards flow="in" title={{text: 'KALAU BERHASIL', at: K(35), size: 76, color: C.green}} cards={[{e: '🛡️', t: 'Risiko punah', sub: 'sekaligus turun', at: K(35, 2)}, {e: '🧳', t: 'Wisata & dana', sub: 'kawasan baru', at: K(35, 4)}, {e: '📣', t: 'Contoh sukses', sub: 'tarik dana berikutnya', at: K(35, 6)}]} />},
  {start: K(36), el: <N.Kinetic words={[w('Analisis, bukan data resmi', K(36), undefined, 90)]} dark />},

  // SKENARIO 2
  {start: L(37, -0.2), el: <N.Part n={2} title="Relokasi gagal" at={L(37)} />, sfx: 'boom'},
  {start: K(38), el: <N.Headlines items={[{src: 'BUKAN KHAYALAN', text: 'Musofa, badak pertama yang ditranslokasi, mati 2 hari kemudian', at: K(38, 1)}, {src: 'LOKASI', text: 'Area JRSCA, masih di dalam Ujung Kulon', at: K(38, 5)}]} dark mark="MUSOFA" />, sfx: 'thump'},
  {start: K(39), el: <N.JavaMap routeAt={K(39, 1)} labels={{ujung: K(39), alas: K(39, 1)}} title={w('Dalam kawasan saja gagal... lintas pulau?', K(39), C.red, 60)} />},
  {start: K(40), el: <S.Split at={K(40, 1)} left="PENOLAK: TERLALU BERISIKO" right="KEMENHUT: BERHENTI = TAK BERTAMBAH" lines={[{text: 'Dua-duanya masuk akal', at: K(41), size: 56}]} />},
  {start: K(42), el: <N.Counter from={0} to={1} at={K(42, 3)} dur={1} label="1 badak hilang =" prefix="± " suffix="% populasi dunia" color={C.red} sub={w('Tidak ada rumus ekonomi yang bisa menggantinya', K(43))} mark="1%" />, sfx: 'boom'},
  {start: K(44), el: <N.Kinetic words={[w('Biaya yang bisa dihitung:', K(44)), w('KEPERCAYAAN', K(44, 1), C.red, 150)]} dark mark="TRUST" />},
  {start: K(45), el: <S.Domino items={[{e: '❌', t: 'Proyek gagal'}, {e: '🌐', t: 'Donor kecewa'}, {e: '📉', t: 'Minat dana turun'}, {e: '🧾', t: 'Skema COP31 tercoreng'}]} startAt={K(45, 1)} lines={[{text: 'Analisis, bukan data', at: K(46), size: 48}]} />},

  // SKENARIO 3
  {start: L(47, -0.2), el: <N.Part n={3} title="Kalau dugaan tambang benar" at={L(47)} />, sfx: 'boom'},
  {start: K(47, 1), el: <S.Split at={K(48)} left="DUGAAN" right="FAKTA" lines={[{text: 'Pisahkan fakta dari dugaan', at: K(47, 1), size: 56}]} />},
  {start: K(48), el: <N.Headlines items={[{src: 'DUGAAN · WALHI', text: 'Menduga ada kaitan dengan eksplorasi tambang emas', at: K(48, 1)}, {src: 'TAPI', text: 'Mengakui belum melakukan kajian atau penelusuran langsung', at: K(48, 4)}]} mark="DUGAAN" />},
  {start: K(49), el: <S.Cards flow="in" title={{text: 'FAKTA: CIBALIUNG (ANTAM)', at: K(49), size: 66, color: '#3b7be0'}} cards={[{e: '📍', t: 'Di luar kawasan', sub: 'taman nasional', at: K(49, 3)}, {e: '⏹️', t: 'Berhenti sejak 2022', at: K(49, 5)}, {e: '🙅', t: 'Antam bantah', sub: 'buka kembali', at: K(49, 7)}]} />},
  {start: K(50), el: <N.Headlines items={[{src: 'KEMENTERIAN ESDM', text: 'TN Ujung Kulon bukan wilayah pertambangan · tidak ada izin tambang', at: K(50, 1)}, {src: 'ESDM', text: 'Sebagian perairan sekitar masuk WUP, tapi tambang tidak bisa langsung beroperasi', at: K(51, 1)}, {src: 'BADAN GEOLOGI', text: 'Potensi emas belum diteliti', at: K(51, 5)}]} dark mark="ESDM" />, sfx: 'thump'},
  {start: K(52), el: <N.Kinetic words={[w('Belum ada dokumen resmi', K(52)), w('yang mengaitkan relokasi & tambang', K(52, 2)), w('Status TN tidak otomatis berubah', K(52, 5), '#3b7be0')]} mark="FAKTA" />},
  {start: K(53), el: <N.Kinetic words={[w('Hanya simulasi:', K(53)), w('bagaimana KALAU...', K(53, 2), C.red, 130)]} dark mark="KALAU" />, sfx: 'riser'},
  {start: K(54), el: <S.Cards title={{text: '1 · STATUS', at: K(54), size: 70}} cards={[{e: '🏞️', t: 'Status TN harus berubah', at: K(54, 1), color: C.red}, {e: '🌐', t: 'Warisan Dunia UNESCO', sub: 'sejak 1991', at: K(54, 4), color: '#3b7be0'}]} />},
  {start: K(55), el: <S.Split at={K(55, 2)} left="DI COP31: JUAL KONSERVASI" right="DI KAWASAN SAMA: TAMBANG?" lines={[{text: '2 · KONTRADIKSI (analisis)', at: K(55), size: 56}]} />},
  {start: K(56), el: <N.Counter from={0} to={5} at={K(56, 4)} dur={1.2} label="Cadangan emas Pongkor" prefix="± " suffix=" ton" color={C.yellow} sub={w('3 · Emas itu HABIS · fase pascatambang', K(56, 1), C.red, 54)} mark="EMAS" />, sfx: 'ding'},
  {start: K(57), el: <S.Split at={K(57, 2)} left="EMAS: HABIS LALU HILANG" right="EKOWISATA: BERULANG" lines={[{text: 'Ingat Peucang tadi?', at: K(57), size: 56}]} />},
  {start: K(58), el: <N.Kinetic words={[w('TIDAK ADA BUKTI', K(58), C.red, 140), w('rencana ini untuk tambang', K(58, 2)), w('hitungannya tidak sesederhana itu', K(58, 5))]} dark mark="BUKTI" />},

  // PAYOFF
  {start: K(59), el: <N.Kinetic words={[w('Yang saya janjikan...', K(59))]} mark="?" />, sfx: 'riser'},
  {start: K(60), el: <N.Kinetic words={[w('Bukan uangnya', K(60)), w('KEPERCAYAAN PADA PROSES', K(60, 2), C.red, 110)]} dark mark="PROSES" />, sfx: 'boom'},
  {start: K(61), el: <N.Headlines items={[{src: 'DPR', text: 'Kajian kelayakan ekologis Alas Purwo belum dibuka secara transparan', at: K(61, 1)}, {src: 'WALHI · SEJAK APRIL', text: 'Sorot potensi konflik kepentingan di Satgas pembiayaan TN', at: K(62, 1)}]} mark="KAJIAN" />},
  {start: K(63), el: <N.Kinetic words={[w('Umumkan dulu', K(63)), w('kajian belakangan', K(63, 2)), w('= ruang curiga terbuka lebar', K(63, 4), C.red, 90)]} dark />},
  {start: K(64), el: <S.Split at={K(65, 1)} left="BADAK JAWA" right="MSCI & IHSG" lines={[{text: 'Pola yang sama: orang tidak percaya prosesnya', at: K(65, 3), size: 48}]} />, sfx: 'whoosh'},
  {start: K(66), el: <N.Kinetic words={[w('Kepercayaan:', K(66)), w('paling MAHAL dibangun', K(66, 2), GREEN, 100), w('paling MURAH dihancurkan', K(66, 4), C.red, 100)]} mark="TRUST" />, sfx: 'boom'},

  // REKAP + CTA
  {start: K(67), el: <S.Lessons items={[{e: '✅', t: 'Berhasil', sub: 'Belasan tahun + dana jangka panjang', at: K(67, 1)}, {e: '❌', t: 'Gagal', sub: 'Hilang satwa + kepercayaan donor', at: K(68)}, {e: '⛏️', t: 'Kalau tambang', sub: 'Hitungan tak mudah · belum ada bukti', at: K(69)}]} />},
  {start: K(70), el: <S.TwoDoors a={{text: 'SIAPA UNTUNG?', at: K(70, 1)}} b={{text: 'SIAPA MENJELASKAN?', at: K(70, 3)}} lines={[{text: 'Menurutmu?', at: K(70), size: 64}]} comment={{text: 'Tulis di komentar', at: K(70, 5)}} />, sfx: 'whoosh'},
  {start: K(71), el: <S.Outro shareAt={K(71)} subAt={K(71, 2)} byeAt={K(71, 4)} />},
  {start: K(72), el: <N.Kinetic words={[w('Analisis & simulasi · per 19 Nov 2026', K(72), undefined, 70), w('Bukan ajakan jual/beli aset · masih wacana', K(72, 3), undefined, 60)]} />},
];
