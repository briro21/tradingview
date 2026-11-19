import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BigCaptions } from "./BigCaptions";
import { IntroProps, OPENING_CONFIG } from "./config";
import { C, Icon, Photo, Slam, Stage } from "./Stage";

// 15-30 s: one sentence of context (who is speaking, what the video covers). No greeting, no
// subscribe ask. Capped at OPENING_CONFIG.introMaxSeconds; beats change the picture mid-sentence.
export const ShortIntro: React.FC<IntroProps & { captions?: boolean }> = ({ text, audioStart, audioEnd, beats, photo, audioSrc, words, captions = true }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const end = Math.min(audioEnd, audioStart + OPENING_CONFIG.introMaxSeconds);
  const frames = Math.round((end - audioStart) * fps) + Math.round(OPENING_CONFIG.tailSeconds * fps);
  const cuts = [0, ...beats.map((b) => Math.round((b.t - audioStart) * fps)), frames];
  const panels = [{ text, icon: undefined as string | undefined }, ...beats];
  const push = interpolate(f, [0, frames], [1, 1.05]);
  return (
    <AbsoluteFill>
      <Stage keyword={text.split("|")[0].split(" ").pop()} seed={11} durationInFrames={frames}>
        <AbsoluteFill style={{ transform: `scale(${push})`, transformOrigin: "30% 60%" }}>
          {photo && <Photo src={photo} height={760} left={30} />}
          {panels.map((p, i) => (
            <Sequence key={i} from={cuts[i]} durationInFrames={i === panels.length - 1 ? Infinity : cuts[i + 1] - cuts[i]}>
              {p.icon && <Icon name={p.icon} size={200} x={1320} y={170} />}
              <Slam
                lines={p.text.split("|")}
                at={[0, 6]}
                x={1320}
                y={i ? 330 : 280}
                size={i ? 170 : 150}
                color={i ? [C.accent, C.ink] : [C.ink, C.dim]}
              />
            </Sequence>
          ))}
        </AbsoluteFill>
      </Stage>
      <Audio src={staticFile(audioSrc)} startFrom={Math.round(audioStart * fps)} endAt={Math.round(end * fps)} />
      {captions && words && <BigCaptions words={words.filter((w) => w[1] >= audioStart - 0.05 && w[1] < end)} offset={audioStart} />}
    </AbsoluteFill>
  );
};
