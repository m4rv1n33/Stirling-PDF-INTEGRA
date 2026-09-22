import { Tooltip } from "@app/components/shared/Tooltip";
import { BrandMark } from "@app/components/shared/BrandMark";
import { useAppName } from "@app/hooks/useAppName";

export interface QuickNavBrandProps {
  /** Returns the app you are in to its default state. */
  onReturnHome: () => void;
}

/**
 * The mark at the head of the rail. Going home is its only job: the upstream
 * secret-click flourish is not wired here, because it animates Stirling's own
 * mark geometry out of the rail.
 */
export function QuickNavBrand({ onReturnHome }: QuickNavBrandProps) {
  const label = useAppName();

  return (
    <div className="quick-nav-brand">
      <Tooltip content={label} position="right" arrow>
        <button
          type="button"
          className="quick-nav-brand-button"
          aria-label={label}
          onClick={() => onReturnHome()}
        >
          <BrandMark height="1.6rem" />
        </button>
      </Tooltip>
    </div>
  );
}
