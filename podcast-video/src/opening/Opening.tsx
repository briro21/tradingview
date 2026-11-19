import React from "react";
import { AbsoluteFill, Audio, getRemotionEnvironment, Sequence, staticFile, useVideoConfig } from "remotion";
import { BigCaptions } from "./BigCaptions";
import { ColdOpen } from "./ColdOpen";
import { HookVariant, OPENING_CONFIG, OpeningVariantProps } from "./config";
import { OPENINGS } from "./registry";
import { ShortIntro } from "./ShortIntro";
import { Teaser } from "./Teaser";

export type OpeningProps = { episode: keyof typeof OPENINGS; hookVariant: HookVariant };

export const openingProps = (episode: keyof typeof OPENINGS, hookVariant: HookVariant): OpeningVariantProps => OPENINGS[episode][hookVariant];

/** Holds longer than maxStaticSeconds, as [start, length] in seconds. */
export const staticHolds = (p: OpeningVariantProps): [number, number][] => {
  const pts = [...new Set([...p.changes, p.durationInFrames / 30])].sort((a, b) => a - b);
  return pts.slice(1).map((b, i) => [pts[i], b - pts[i]] as [number, number]).filter(([, d]) => d > OPENING_CONFIG.maxStaticSeconds);
};

// Cold open (0-~5 s) -> teaser (~5-13 s) -> one-sentence intro (<= introMaxSeconds). The body
// (unchanged, rendered separately) follows; scripts/assemble_opening.sh joins them.
export const Opening: React.FC<OpeningProps> = ({ episode, hookVariant }) => {
  const { fps } = useVideoConfig();
  const p = openingProps(episode, hookVariant);
  if (getRemotionEnvironment().isStudio) {
    for (const [at, d] of staticHolds(p))
      console.warn(`[opening ${episode} ${hookVariant}] picture holds ${d.toFixed(1)}s from ${at.toFixed(1)}s (maxStaticSeconds ${OPENING_CONFIG.maxStaticSeconds})`);
  }
  const tTeaser = Math.round(p.coldOpen.audioEnd * fps);
  const tIntro = Math.round(p.intro.audioStart * fps);
  return (
    <AbsoluteFill style={{ background: "#0D0D10" }}>
      <Sequence durationInFrames={tTeaser}>
        <ColdOpen {...p.coldOpen} captions={false} />
      </Sequence>
      <Sequence from={tTeaser} durationInFrames={tIntro - tTeaser}>
        <Teaser {...p.teaser} captions={false} />
      </Sequence>
      <Sequence from={tIntro}>
        <ShortIntro {...p.intro} captions={false} />
      </Sequence>
      <Audio src={staticFile(`${episode}/opening/bed.wav`)} volume={0.16} />
      <BigCaptions words={p.words} />
    </AbsoluteFill>
  );
};
