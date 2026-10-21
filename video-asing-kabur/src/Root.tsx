import {Composition} from 'remotion';
import {DURATION_SEC, PasarHijau} from './pasar-hijau/Video';
import {AsingKabur, TOTAL_FRAMES} from './Video';
import {CinematicDemo} from './cinematic/Demo';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="AsingKabur" component={AsingKabur} durationInFrames={TOTAL_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="PasarHijau" component={PasarHijau} defaultProps={{theme: 'dark' as const}} durationInFrames={DURATION_SEC * 30} fps={30} width={1920} height={1080} />
    <Composition id="PasarHijauLight" component={PasarHijau} defaultProps={{theme: 'light' as const}} durationInFrames={DURATION_SEC * 30} fps={30} width={1920} height={1080} />
    <Composition id="CinematicDemo" component={CinematicDemo} durationInFrames={30 * 30} fps={30} width={1920} height={1080} />
  </>
);
