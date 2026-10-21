import {Composition} from 'remotion';
import {DURATION_SEC, PasarHijau} from './pasar-hijau/Video';
import {AsingKabur, TOTAL_FRAMES} from './Video';
import {CinematicDemo} from './cinematic/Demo';
import {ThumbA, ThumbB, ThumbC} from './thumbs/Thumbs';
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
  </>
);
