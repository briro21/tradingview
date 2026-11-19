// Opening (first ~30 s) settings shared by every episode.
export const OPENING_CONFIG = {
  /** The context sentence after the teaser may not run longer than this. */
  introMaxSeconds: 10,
  /** Warn (Studio) / fail (scripts/check_pacing.py) when the picture holds longer than this. */
  maxStaticSeconds: 5,
  /** Gap between the end of the opening audio and the body. */
  tailSeconds: 0.35,
};

export type HookVariant = "A" | "B";
export type Word = [string, number, number];
export type ColdOpenProps = { quoteText: string; audioSrc: string; audioStart: number; audioEnd: number; photo?: string; words?: Word[] };
export type TeaserItem = { text: string; audioStart: number; audioEnd: number; icon?: string };
export type TeaserProps = { items: TeaserItem[]; audioSrc: string; words?: Word[] };
export type IntroBeat = { t: number; text: string; icon?: string };
export type IntroProps = { text: string; audioStart: number; audioEnd: number; beats: IntroBeat[]; photo?: string; audioSrc: string; words?: Word[] };
export type OpeningVariantProps = {
  audioSrc: string;
  durationInFrames: number;
  coldOpen: ColdOpenProps;
  teaser: TeaserProps;
  intro: IntroProps;
  words: Word[];
  changes: number[];
};
