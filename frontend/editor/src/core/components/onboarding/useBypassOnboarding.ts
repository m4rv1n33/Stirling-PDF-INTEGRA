import { useEffect } from "react";
import { markOnboardingCompleted } from "@app/components/onboarding/orchestrator/onboardingStorage";

/**
 * Always true: INTEGRA sits behind its own access gate, so the upstream
 * onboarding (role pick, tours, desktop download) never runs. Marking it
 * completed keeps every UI that waits on onboarding in its post-onboarding
 * state.
 */
export function useBypassOnboarding(): boolean {
  useEffect(() => {
    markOnboardingCompleted();
  }, []);

  return true;
}
