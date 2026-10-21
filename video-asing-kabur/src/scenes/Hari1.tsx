import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {Background} from '../components/Background';
import {BigText} from '../components/BigText';
import {Caption, SceneLabel} from '../components/Caption';
import {Gauge} from '../components/Gauge';
import {IhsgChart} from '../components/IhsgChart';
import {Stickman} from '../components/Stickman';
import {C} from '../theme';

// 0:20–0:32 — HARI 1: semua asing menekan SELL, auto reject, trading halt.
const CRASH = [5280, 5240, 5190, 5050, 4980, 4760, 4700, 4520, 4300, 4180, 3990];

export const Hari1: React.FC = () => {
  const frame = useCurrentFrame();
  const halted = frame > 250;
  return (
    <AbsoluteFill style={{transform: frame > 120 && frame < 140 ? `translate(${Math.sin(frame * 4) * 14}px, 0)` : undefined}}>
      <Background glow="rgba(255,75,62,0.35)" glowX="70%" glowY="70%" />
      <SceneLabel text="HARI 1" />
      <div style={{position: 'absolute', left: 80, top: 160}}>
        <IhsgChart data={CRASH} width={900} height={420} drawFrames={200} />
      </div>
      <div style={{position: 'absolute', left: 60, bottom: -260}}>
        <Stickman mood={frame > 90 ? 'kaget' : 'serius'} size={400} shake={frame > 120} />
      </div>
      <Sequence from={60} layout="none">
        <div style={{position: 'absolute', right: 170, bottom: 170}}>
          <Gauge breakAt={60} label="JUAL" />
        </div>
      </Sequence>
      <Sequence from={130} layout="none">
        <BigText text="AUTO REJECT!" color={C.red} size={110} style={{position: 'absolute', right: 90, top: 150}} />
      </Sequence>
      {halted && (
        <AbsoluteFill style={{background: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center'}}>
          <BigText text="TRADING HALT" size={180} color={C.yellow} />
        </AbsoluteFill>
      )}
      <div style={{position: 'absolute', left: 0, top: 0}}>
        <Caption text="Ilustrasi — bukan data aktual" side="left" />
      </div>
    </AbsoluteFill>
  );
};
