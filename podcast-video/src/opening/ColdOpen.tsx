import React from "react";
import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BigCaptions } from "./BigCaptions";
import { ColdOpenProps } from "./config";
import { C, Photo, Slam, Stage } from "./Stage";

// 0-5 s: the thumbnail's claim, huge, on the first frame. No logo, no greeting, no title card.
// quoteText lines are split on "|"; line 1 is red (the claim), the rest ink.
export const ColdOpen: React.FC<ColdOpenProps & { captions?: boolean }> = ({ quoteText, audioSrc, audioStart, audioEnd, photo, words, captions = true }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lines = quoteText.split("|");
  const dur = (audioEnd - audioStart) * fps;
  // the whole claim and the photo are settled on frame 0: the first frame is the thumbnail.
  // Halfway through, a red underline draws itself under the claim (the cold open's visual change).
  const at = lines.map(() => -30);
  const mark = Math.round(dur / 2);
  const ul = interpolate(f, [mark, mark + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const push = interpolate(f, [0, dur], [1, 1.06], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Stage light durationInFrames={Math.round(dur)}>
        <AbsoluteFill style={{ transform: `scale(${push})`, transformOrigin: "35% 50%" }}>
          {photo && <Photo src={photo} height={780} left={20} delay={-40} />}
          <Slam lines={lines} at={at} x={1330} y={250} size={210} color={[C.accent, C.paperInk]} />
          <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0 }}>
            <path d="M1040 690 C1200 702 1460 684 1640 694" fill="none" stroke={C.accent} strokeWidth={14} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ul} />
          </svg>
        </AbsoluteFill>
      </Stage>
      <Audio src={staticFile(audioSrc)} startFrom={Math.round(audioStart * fps)} endAt={Math.round(audioEnd * fps)} />
      {captions && words && <BigCaptions words={words.filter((w) => w[1] < audioEnd)} offset={audioStart} />}
    </AbsoluteFill>
  );
};
