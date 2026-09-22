import { useAppConfig } from "@app/contexts/AppConfigContext";

/** Shown until the server config loads, and whenever `ui.appNameNavbar` is blank. */
export const DEFAULT_APP_NAME = "INTEGRA PDF";

/**
 * The name the UI shows for this instance: `ui.appNameNavbar` from
 * settings.yml (or its `UI_APPNAMENAVBAR` env override) when set, else
 * {@link DEFAULT_APP_NAME}.
 */
export function useAppName(): string {
  const { config } = useAppConfig();
  return config?.appNameNavbar || DEFAULT_APP_NAME;
}
