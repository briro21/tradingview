import {AbsoluteFill, Series} from 'remotion';
import {Hari1} from './scenes/Hari1';
import {Hook} from './scenes/Hook';
import {Peringkat} from './scenes/Peringkat';

// Urutan scene mengikuti naskah "What If Semua Investor Asing Kabur dari IHSG?".
export const SCENES = [
  {id: 'hook', frames: 300, C: Hook},
  {id: 'peringkat', frames: 300, C: Peringkat},
  {id: 'hari1', frames: 360, C: Hari1},
];

export const TOTAL_FRAMES = SCENES.reduce((n, s) => n + s.frames, 0);

export const AsingKabur: React.FC = () => (
  <AbsoluteFill>
    <Series>
      {SCENES.map(({id, frames, C}) => (
        <Series.Sequence key={id} durationInFrames={frames}>
          <C />
        </Series.Sequence>
      ))}
    </Series>
  </AbsoluteFill>
);
