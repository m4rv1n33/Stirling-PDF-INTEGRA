import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  ReactNode,
} from "react";
import { MantineProvider } from "@mantine/core";
import { useIsomorphicEffect } from "@mantine/hooks";
import { usePreferences } from "@app/contexts/PreferencesContext";
import {
  mantineTheme,
  editorCssVariablesResolver,
} from "@app/theme/mantineTheme";
import { ToastProvider } from "@app/components/toast";
import ToastRenderer from "@app/components/toast/ToastRenderer";
import { ToastPortalBinder } from "@app/components/toast";
import { type ColorScheme, type ThemeMode } from "@app/constants/theme";
// SUI shared design-system tokens (used by @app/ui); key on `data-theme`.
import "@app/tokens/tokens.css";
import "@app/theme/index.css";
import "@fontsource-variable/inter/wght.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";

interface ThemeContextType {
  themeMode: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // preferences.theme is still stored and exposed, but no longer applied.
  const { preferences, updatePreference } = usePreferences();
  const themeMode = preferences.theme;
  const setTheme = useCallback(
    (mode: ThemeMode) => updatePreference("theme", mode),
    [updatePreference],
  );

  // INTEGRA renders in one look: dark, whatever the stored preference or the
  // visitor's prefers-color-scheme says. Must match the pre-paint script in
  // index.html.
  const colorScheme: ColorScheme = "dark";

  // Mirror the scheme to <html>. data-accent="default" with the dark scheme is
  // the selector the INTEGRA block in colors.css keys on.
  useIsomorphicEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", colorScheme);
    root.setAttribute("data-app-theme", "custom");
    root.setAttribute("data-accent", "default");
  }, [colorScheme]);

  const value = useMemo<ThemeContextType>(
    () => ({ themeMode, setTheme }),
    [themeMode, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <MantineProvider
        theme={mantineTheme}
        cssVariablesResolver={editorCssVariablesResolver}
        defaultColorScheme={colorScheme}
        forceColorScheme={colorScheme}
      >
        <div style={{ minHeight: "100vh" }}>
          <ToastProvider>
            <ToastPortalBinder />
            {children}
            <ToastRenderer />
          </ToastProvider>
        </div>
      </MantineProvider>
    </ThemeContext.Provider>
  );
}
