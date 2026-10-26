import React from "react";
import { staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { useAudioData, visualizeAudio } from "@remotion/media-utils";
import { theme } from "../theme";

export const AudioWaveform: React.FC<{
  src: string;
  bars?: number;
  height?: number;
  barWidth?: number;
  gap?: number;
  color?: string;
}> = ({ src, bars = 64, height = 200, barWidth = 14, gap = 8, color = theme.blue }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const audioData = useAudioData(staticFile(src));

  const values = audioData
    ? visualizeAudio({ fps, frame, audioData, numberOfSamples: 64, smoothing: true })
    : new Array(64).fill(0);

  // Cerminkan agar simetris: frekuensi rendah di tengah.
  const half = values.slice(0, bars / 2);
  const mirrored = [...[...half].reverse(), ...half];

  return (
    <div style={{ display: "flex", alignItems: "center", gap, height }}>
      {mirrored.map((v, i) => (
        <div
          key={i}
          style={{
            width: barWidth,
            height: Math.max(barWidth, Math.min(1, v * 4) * height),
            borderRadius: barWidth / 2,
            backgroundColor: color,
            boxShadow: `0 0 ${barWidth * 1.5}px ${color}`,
          }}
        />
      ))}
    </div>
  );
};
