import {AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig} from 'remotion';
import {Captions} from '../pasar-hijau/Captions';
import {T0} from '../pasar-hijau/lib';
import {C, DEFAULT_THEME, ThemeCtx, ThemeName} from '../theme';
import captions from './captions.json';
import * as S from './scenes';

export const DURATION_SEC = 260;

// Detik mulai tiap adegan, diambil dari waktu kalimat di transkrip voice-over.
const TIMELINE: {start: number; el: React.ReactNode}[] = [
  {start: 0, el: <S.HookRoom />},
  {start: 9.7, el: <S.Questions />},
  {start: 14.4, el: <S.Facts />},
  {start: 33.8, el: <S.OpenLoop />},
  {start: 44.8, el: <S.Market leaveAt={60.6} />},
  {start: 67.1, el: <S.Chapter at={67.2} label="SKENARIO" sub="Siapkan diri: jatuhnya bertahap" color={C.yellow} />},
  {start: 72.0, el: <S.Chapter at={72.0} label="HARI 1" sub="09:00 · Bursa dibuka" />},
  {start: 75.0, el: <S.SellQueue />},
  {start: 82.5, el: <S.RedBoard haltAt={87.3} />},
  {start: 91.7, el: <S.Suitcase />},
  {start: 98.7, el: <S.Chapter at={98.8} label="MINGGU 1" sub="Rupiah dibawa pulang" />},
  {start: 100.6, el: <S.Exchange />},
  {start: 117.5, el: <S.Wallet />},
  {start: 128.0, el: <S.Chapter at={128.1} label="BULAN 1" sub="Harga mulai naik" />},
  {start: 129.8, el: <S.Warung />},
  {start: 140.7, el: <S.Rates />},
  {start: 149.0, el: <S.NotYet />},
  {start: 153.5, el: <S.Chapter at={153.6} label="TAHUN 1" sub="Lampu mulai padam" />},
  {start: 155.6, el: <S.OfficeLights />},
  {start: 171.3, el: <S.Chapter at={171.4} label="SKENARIO TERBURUK" sub="...tapi tunggu dulu" color={C.yellow} />},
  {start: 175.0, el: <S.Reveal />},
  {start: 183.7, el: <S.Paradox />},
  {start: 194.7, el: <S.Crowd />},
  {start: 210.9, el: <S.WhoWins />},
  {start: 226.0, el: <S.Trap />},
  {start: 238.5, el: <S.Doors />},
  {start: 246.7, el: <S.EndCard />},
];

export const AsingKaburVO: React.FC<{theme?: ThemeName}> = ({theme = DEFAULT_THEME}) => {
  const {fps} = useVideoConfig();
  return (
    <ThemeCtx.Provider value={theme}>
      <AbsoluteFill style={{background: '#000'}}>
        {TIMELINE.map((seg, i) => {
          const from = Math.round(seg.start * fps);
          const end = Math.round((TIMELINE[i + 1]?.start ?? DURATION_SEC) * fps);
          return (
            <Sequence key={seg.start} from={from} durationInFrames={end - from}>
              <T0.Provider value={seg.start}>{seg.el}</T0.Provider>
            </Sequence>
          );
        })}
        <T0.Provider value={0}>
          <Captions data={captions} />
        </T0.Provider>
        <Audio src={staticFile('vo_asing_keluar.mp3')} />
      </AbsoluteFill>
    </ThemeCtx.Provider>
  );
};
