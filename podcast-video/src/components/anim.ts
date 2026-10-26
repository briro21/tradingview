import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const EXIT_FRAMES = 15;

// Masuk dengan spring (mulai di `delay`), keluar dengan interpolate di akhir Sequence.
export const useEnterExit = (delay = 0) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const enter = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 120 } });
  const exit = interpolate(
    frame,
    [durationInFrames - EXIT_FRAMES, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return { enter, exit, opacity: Math.min(enter, exit) };
};
