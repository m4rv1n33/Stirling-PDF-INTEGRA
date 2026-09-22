import type { CSSProperties } from "react";
import markUrl from "@app/assets/brand/modern-logo/favicon.svg";
import { useAppName } from "@app/hooks/useAppName";
import "@app/ui/Logo.css";

/** iconOnly = mark; textOnly = the app name; iconAndText = both. */
export type LogoVariant = "iconOnly" | "iconAndText" | "textOnly";

interface LogoProps {
  variant?: LogoVariant;
  /** Layout for iconAndText: mark left of text, or stacked above it. */
  orientation?: "horizontal" | "vertical";
  /** Height of the mark (CSS length). */
  iconHeight?: string;
  /** Font size of the name (CSS length). */
  textHeight?: string;
  /** Gap between mark and name. */
  gap?: string;
  /** Draws the name in the muted text colour. */
  muted?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Accessible name of the mark when it stands alone; defaults to the app name. */
  alt?: string;
}

/**
 * The INTEGRA lockup: the mark plus the app name set in the UI font, the way
 * the management panel writes its brand. The name follows `ui.appNameNavbar`
 * (see useAppName), so a settings.yml override renames the lockup too.
 */
export function Logo({
  variant = "iconAndText",
  orientation = "horizontal",
  iconHeight = "1.75rem",
  textHeight = "1rem",
  gap = "0.5rem",
  muted = false,
  className,
  style,
  alt,
}: LogoProps) {
  const appName = useAppName();
  const showIcon = variant === "iconOnly" || variant === "iconAndText";
  const showText = variant === "textOnly" || variant === "iconAndText";

  const cls = [
    "sui-logo",
    orientation === "vertical" ? "sui-logo--vertical" : "",
    muted ? "sui-logo--muted" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  // Layout set inline so a consumer's className can't restack the lockup.
  const layoutStyle: CSSProperties = {
    display: orientation === "vertical" ? "flex" : "inline-flex",
    flexDirection: orientation === "vertical" ? "column" : "row",
    alignItems: "center",
    gap,
  };

  return (
    <span className={cls} style={{ ...layoutStyle, ...style }}>
      {showIcon && (
        <img
          className="sui-logo__mark"
          src={markUrl}
          alt={showText ? "" : (alt ?? appName)}
          aria-hidden={showText ? true : undefined}
          style={{ height: iconHeight }}
        />
      )}
      {showText && (
        <span className="sui-logo__name" style={{ fontSize: textHeight }}>
          {appName}
        </span>
      )}
    </span>
  );
}
