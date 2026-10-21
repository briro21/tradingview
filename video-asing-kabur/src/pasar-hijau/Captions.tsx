import {AbsoluteFill} from 'remotion';
import {C, FONT} from '../theme';
import defaultCaptions from './captions.json';
import {useSec} from './lib';

// Subtitle di bawah layar, diambil dari SRT voice-over.
type Cap = {start: number; end: number; text: string};

export const Captions: React.FC<{data?: Cap[]}> = ({data = defaultCaptions}) => {
  const sec = useSec();
  const cur = data.find((c) => sec >= c.start && sec <= c.end + 0.25);
  if (!cur) return null;
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 46}}>
      <div
        style={{
          maxWidth: 1600,
          padding: '12px 30px',
          borderRadius: 18,
          background: 'rgba(5,5,5,0.72)',
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 50,
          color: C.white,
          textAlign: 'center',
        }}
      >
        {cur.text}
      </div>
    </AbsoluteFill>
  );
};
