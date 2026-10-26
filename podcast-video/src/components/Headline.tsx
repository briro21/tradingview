import React from "react";
import { interpolate } from "remotion";
import { theme } from "../theme";
import { useEnterExit } from "./anim";

export const Headline: React.FC<{
  children: React.ReactNode;
  delay?: number;
  size?: number;
  color?: string;
}> = ({ children, delay = 0, size = 96, color = theme.white }) => {
  const { enter, exit } = useEnterExit(delay);
  return (
    <div
      style={{
        fontSize: size,
        fontWeight: 800,
        lineHeight: 1.1,
        textAlign: "center",
        color,
        opacity: Math.min(enter, exit),
        transform: `translateY(${interpolate(enter, [0, 1], [60, 0])}px) scale(${interpolate(exit, [0, 1], [0.92, 1])})`,
      }}
    >
      {children}
    </div>
  );
};
