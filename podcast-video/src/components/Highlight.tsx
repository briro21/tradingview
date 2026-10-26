import React from "react";
import { theme } from "../theme";

export const Highlight: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = theme.cyan,
}) => <span style={{ color, textShadow: `0 0 24px ${color}66` }}>{children}</span>;
