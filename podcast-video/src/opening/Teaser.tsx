import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BigCaptions } from "./BigCaptions";
import { TeaserItem, TeaserProps } from "./config";
import { C, Icon, Slam, Stage } from "./Stage";

// 5-15 s: fast montage of the episode's 2-3 most surprising moments, one hard cut each.
const Card: React.FC<{ item: TeaserItem; index: number; frames: number }> = ({ item, index, frames }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lines = item.text.split("|");
  // punch-in on the cut, then a slow drift so the card never sits still
  const punch = spring({ frame: f, fps, config: { damping: 14, stiffness: 200 } });
  const scale = interpolate(punch, [0, 1], [1.14, 1]) * interpolate(f, [0, frames], [1, 1.05]);
  // red slab sweeps across the cut
  const sweep = interpolate(f, [0, 7], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Stage keyword={lines[0].split(" ").sort((a, b) => b.length - a.length)[0]} seed={index + 3} durationInFrames={frames}>
        <AbsoluteFill style={{ transform: `scale(${scale})` }}>
          {item.icon && <Icon name={item.icon} size={430} x={500} y={470} />}
          <Slam lines={lines} at={[2, 8]} x={1320} y={300} size={150} color={[C.ink, C.accent]} />
        </AbsoluteFill>
      </Stage>
      {sweep < 1 && <div style={{ position: "absolute", top: 0, bottom: 0, width: 46, left: interpolate(sweep, [0, 1], [-60, 1960]), background: C.accent }} />}
    </AbsoluteFill>
  );
};

export const Teaser: React.FC<TeaserProps & { captions?: boolean }> = ({ items, audioSrc, words, captions = true }) => {
  const { fps } = useVideoConfig();
  const t0 = items[0].audioStart;
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      {items.map((it, i) => {
        const from = Math.round((it.audioStart - t0) * fps);
        const end = i + 1 < items.length ? Math.round((items[i + 1].audioStart - t0) * fps) : Math.round((it.audioEnd - t0) * fps);
        return (
          <Sequence key={i} from={from} durationInFrames={end - from}>
            <Card item={it} index={i} frames={end - from} />
            <Audio src={staticFile(audioSrc)} startFrom={Math.round(it.audioStart * fps)} endAt={Math.round(it.audioEnd * fps)} />
          </Sequence>
        );
      })}
      {captions && words && <BigCaptions words={words.filter((w) => w[1] >= t0 - 0.05 && w[1] < items[items.length - 1].audioEnd)} offset={t0} />}
    </AbsoluteFill>
  );
};
