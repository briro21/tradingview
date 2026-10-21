import {Composition} from 'remotion';
import {DURATION_SEC, PasarHijau} from './pasar-hijau/Video';
import {AsingKabur, TOTAL_FRAMES} from './Video';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="AsingKabur" component={AsingKabur} durationInFrames={TOTAL_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="PasarHijau" component={PasarHijau} durationInFrames={DURATION_SEC * 30} fps={30} width={1920} height={1080} />
  </>
);
