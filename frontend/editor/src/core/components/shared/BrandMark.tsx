import markUrl from "@app/assets/brand/modern-logo/favicon.svg";
import "@app/components/shared/BrandMark.css";

interface BrandMarkProps {
  /** Height of the mark (CSS length). */
  height?: string;
  className?: string;
}

/**
 * The INTEGRA mark. Decorative: every caller sits inside a control or header
 * that carries its own accessible name. `sui-brandmark--working` pulses it
 * while a job runs.
 */
export function BrandMark({ height = "1.6rem", className }: BrandMarkProps) {
  return (
    <img
      className={`sui-brandmark${className ? ` ${className}` : ""}`}
      src={markUrl}
      alt=""
      aria-hidden
      style={{ height }}
    />
  );
}
