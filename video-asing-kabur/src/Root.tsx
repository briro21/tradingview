import {Composition} from 'remotion';
import {AsingKabur, TOTAL_FRAMES} from './Video';

export const RemotionRoot: React.FC = () => (
  <Composition id="AsingKabur" component={AsingKabur} durationInFrames={TOTAL_FRAMES} fps={30} width={1920} height={1080} />
);
