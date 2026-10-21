import {Composition} from 'remotion';
import {DURATION_SEC, PasarHijau} from './pasar-hijau/Video';
import {AsingKabur, TOTAL_FRAMES} from './Video';
import {CinematicDemo} from './cinematic/Demo';
import {ThumbA, ThumbB, ThumbC, ThumbR1, ThumbR2, ThumbR3} from './thumbs/Thumbs';
import {DURATION_SEC as RP_SEC, RupiahVideo} from './rupiah/Video';
import {VIDEOS} from './videos/registry';
import {Thumb} from './videos/Thumb';
import {durationOf, makeL, WhatIf} from './videos/WhatIf';
import {AsingKaburVO, DURATION_SEC as AK_SEC} from './asing-kabur/Video';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="AsingKabur" component={AsingKabur} durationInFrames={TOTAL_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="PasarHijau" component={PasarHijau} defaultProps={{theme: 'dark' as const}} durationInFrames={DURATION_SEC * 30} fps={30} width={1920} height={1080} />
    <Composition id="PasarHijauLight" component={PasarHijau} defaultProps={{theme: 'light' as const}} durationInFrames={DURATION_SEC * 30} fps={30} width={1920} height={1080} />
    <Composition id="CinematicDemo" component={CinematicDemo} durationInFrames={30 * 30} fps={30} width={1920} height={1080} />
    <Composition id="AsingKaburVO" component={AsingKaburVO} durationInFrames={AK_SEC * 30} fps={30} width={1920} height={1080} />
    <Composition id="ThumbA" component={ThumbA} durationInFrames={1} fps={30} width={1280} height={720} />
    <Composition id="ThumbB" component={ThumbB} durationInFrames={1} fps={30} width={1280} height={720} />
    <Composition id="ThumbC" component={ThumbC} durationInFrames={1} fps={30} width={1280} height={720} />
    <Composition id="Rupiah20000" component={RupiahVideo} durationInFrames={RP_SEC * 30} fps={30} width={1920} height={1080} />
    <Composition id="ThumbR1" component={ThumbR1} durationInFrames={1} fps={30} width={1280} height={720} />
    <Composition id="ThumbR2" component={ThumbR2} durationInFrames={1} fps={30} width={1280} height={720} />
    <Composition id="ThumbR3" component={ThumbR3} durationInFrames={1} fps={30} width={1280} height={720} />
    {VIDEOS.map((v) => (
      <Composition
        key={v.slug}
        id={`WhatIf-${v.slug}`}
        component={WhatIf}
        defaultProps={{timeline: v.timeline(makeL(v.lines)), captions: v.captions, audio: `vo_${v.slug}.mp3`, duration: durationOf(v.lines)}}
        durationInFrames={durationOf(v.lines) * 30}
        fps={30}
        width={1920}
        height={1080}
      />
    ))}
    {VIDEOS.flatMap((v) =>
      ([1, 2, 3] as const).map((n) => (
        <Composition key={`${v.slug}-t${n}`} id={`Thumb-${v.slug}-${n}`} component={Thumb} defaultProps={{data: v.thumbs, variant: n}} durationInFrames={1} fps={30} width={1280} height={720} />
      )),
    )}
  </>
);
