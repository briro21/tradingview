import {timeline as arb} from './arb-7/storyboard';
import arbCaptions from './arb-7/captions.json';
import arbLines from './arb-7/lines.json';
import arbMeta from './arb-7/meta.json';
import {timeline as emas} from './emas-3-juta/storyboard';
import emasCaptions from './emas-3-juta/captions.json';
import emasLines from './emas-3-juta/lines.json';
import emasMeta from './emas-3-juta/meta.json';
import {timeline as msci} from './msci-standalone/storyboard';
import msciCaptions from './msci-standalone/captions.json';
import msciLines from './msci-standalone/lines.json';
import msciMeta from './msci-standalone/meta.json';
import {timeline as dana} from './danantara/storyboard';
import danaCaptions from './danantara/captions.json';
import danaLines from './danantara/lines.json';
import danaMeta from './danantara/meta.json';
import {timeline as birate} from './bi-rate-7/storyboard';
import birateCaptions from './bi-rate-7/captions.json';
import birateLines from './bi-rate-7/lines.json';
import birateMeta from './bi-rate-7/meta.json';
import {timeline as bank} from './bank-bangkrut/storyboard';
import bankCaptions from './bank-bangkrut/captions.json';
import bankLines from './bank-bangkrut/lines.json';
import bankMeta from './bank-bangkrut/meta.json';
import {timeline as lihat} from './lihat-10-detik/storyboard';
import lihatCaptions from './lihat-10-detik/captions.json';
import lihatLines from './lihat-10-detik/lines.json';
import lihatMeta from './lihat-10-detik/meta.json';
import {timeline as k98} from './kembali-1998/storyboard';
import k98Captions from './kembali-1998/captions.json';
import k98Lines from './kembali-1998/lines.json';
import k98Meta from './kembali-1998/meta.json';
import {timeline as udk} from './uang-dua-kali/storyboard';
import udkCaptions from './uang-dua-kali/captions.json';
import udkLines from './uang-dua-kali/lines.json';
import udkMeta from './uang-dua-kali/meta.json';
import {timeline as gub} from './gubernur-24-jam/storyboard';
import gubCaptions from './gubernur-24-jam/captions.json';
import gubLines from './gubernur-24-jam/lines.json';
import gubMeta from './gubernur-24-jam/meta.json';
import {timeline as tab} from './tabung-saham-2000/storyboard';
import tabCaptions from './tabung-saham-2000/captions.json';
import tabLines from './tabung-saham-2000/lines.json';
import tabMeta from './tabung-saham-2000/meta.json';
import {timeline as war} from './warisan-10-miliar/storyboard';
import warCaptions from './warisan-10-miliar/captions.json';
import warLines from './warisan-10-miliar/lines.json';
import warMeta from './warisan-10-miliar/meta.json';
import {timeline as dir} from './dirimu-10-tahun/storyboard';
import dirCaptions from './dirimu-10-tahun/captions.json';
import dirLines from './dirimu-10-tahun/lines.json';
import dirMeta from './dirimu-10-tahun/meta.json';
import {timeline as pkb} from './pikiran-bandar/storyboard';
import pkbCaptions from './pikiran-bandar/captions.json';
import pkbLines from './pikiran-bandar/lines.json';
import pkbMeta from './pikiran-bandar/meta.json';
import {timeline as trk} from './terkaya-7-hari/storyboard';
import trkCaptions from './terkaya-7-hari/captions.json';
import trkLines from './terkaya-7-hari/lines.json';
import trkMeta from './terkaya-7-hari/meta.json';
import {timeline as tbl} from './tanpa-belanja-30-hari/storyboard';
import tblCaptions from './tanpa-belanja-30-hari/captions.json';
import tblLines from './tanpa-belanja-30-hari/lines.json';
import tblMeta from './tanpa-belanja-30-hari/meta.json';
import {ThumbData} from './Thumb';
import {Cue, durationOf, LineT, makeL, Seg, WhatIf} from './WhatIf';

// Daftar video batch. Tambah video baru: buat folder <slug>/ (naskah → storyboard + meta) lalu daftarkan di sini.
export type Video = {slug: string; lines: LineT[]; captions: Cue[]; timeline: (L: (i: number, d?: number) => number) => Seg[]; thumbs: ThumbData};

export const VIDEOS: Video[] = [
  {slug: 'arb-7', lines: arbLines, captions: arbCaptions, timeline: arb, thumbs: arbMeta.thumbs},
  {slug: 'emas-3-juta', lines: emasLines, captions: emasCaptions, timeline: emas, thumbs: emasMeta.thumbs},
  {slug: 'msci-standalone', lines: msciLines, captions: msciCaptions, timeline: msci, thumbs: msciMeta.thumbs},
  {slug: 'danantara', lines: danaLines, captions: danaCaptions, timeline: dana, thumbs: danaMeta.thumbs},
  {slug: 'bi-rate-7', lines: birateLines, captions: birateCaptions, timeline: birate, thumbs: birateMeta.thumbs},
  {slug: 'bank-bangkrut', lines: bankLines, captions: bankCaptions, timeline: bank, thumbs: bankMeta.thumbs},
  {slug: 'lihat-10-detik', lines: lihatLines, captions: lihatCaptions, timeline: lihat, thumbs: lihatMeta.thumbs},
  {slug: 'kembali-1998', lines: k98Lines, captions: k98Captions, timeline: k98, thumbs: k98Meta.thumbs},
  {slug: 'uang-dua-kali', lines: udkLines, captions: udkCaptions, timeline: udk, thumbs: udkMeta.thumbs},
  {slug: 'gubernur-24-jam', lines: gubLines, captions: gubCaptions, timeline: gub, thumbs: gubMeta.thumbs},
  {slug: 'tabung-saham-2000', lines: tabLines, captions: tabCaptions, timeline: tab, thumbs: tabMeta.thumbs},
  {slug: 'warisan-10-miliar', lines: warLines, captions: warCaptions, timeline: war, thumbs: warMeta.thumbs},
  {slug: 'dirimu-10-tahun', lines: dirLines, captions: dirCaptions, timeline: dir, thumbs: dirMeta.thumbs},
  {slug: 'pikiran-bandar', lines: pkbLines, captions: pkbCaptions, timeline: pkb, thumbs: pkbMeta.thumbs},
  {slug: 'terkaya-7-hari', lines: trkLines, captions: trkCaptions, timeline: trk, thumbs: trkMeta.thumbs},
  {slug: 'tanpa-belanja-30-hari', lines: tblLines, captions: tblCaptions, timeline: tbl, thumbs: tblMeta.thumbs},
];

// Komposisi hanya menerima slug (props Remotion harus bisa di-JSON-kan); storyboard dicari di sini.
export const WhatIfBySlug: React.FC<{slug: string; hideCaptions?: boolean}> = ({slug, hideCaptions}) => {
  const v = VIDEOS.find((x) => x.slug === slug)!;
  return <WhatIf timeline={v.timeline(makeL(v.lines))} captions={v.captions} audio={`vo_${v.slug}.mp3`} duration={durationOf(v.lines)} hideCaptions={hideCaptions} />;
};
