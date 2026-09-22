import type { CSSProperties } from "react";
import { Logo } from "@app/ui/Logo";

interface WordmarkProps {
  /** Font size of the name (CSS length). */
  size?: string;
  muted?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** The app name on its own, as the lockup in @app/ui/Logo sets it. */
export function Wordmark({
  size,
  muted = false,
  className,
  style,
}: WordmarkProps) {
  return (
    <Logo
      variant="textOnly"
      textHeight={size}
      muted={muted}
      className={className}
      style={style}
    />
  );
}
