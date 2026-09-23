import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import TomlBackend from "@app/i18n/tomlBackend";
import {
  supportedLanguages,
  rtlLanguages,
  I18N_STORAGE_KEYS,
  LanguageSource,
  normalizeLanguageCode,
  toUnderscoreFormat,
  toUnderscoreLanguages,
} from "@app/i18n/languages";

// Language metadata and code helpers are shared with the portal via
// @app/i18n. Re-export them so existing `@app/i18n` consumers are unchanged.
export {
  supportedLanguages,
  rtlLanguages,
  I18N_STORAGE_KEYS,
  LanguageSource,
  normalizeLanguageCode,
  toUnderscoreFormat,
  toUnderscoreLanguages,
};

/**
 * The only UI language. Neither the browser, a stored choice nor the server's
 * ui.languages / system.defaultLocale can move the app off it.
 */
export const APP_LANGUAGE = "en-US";

i18n
  .use(TomlBackend)
  .use(initReactI18next)
  .init({
    lng: APP_LANGUAGE,
    fallbackLng: APP_LANGUAGE,
    supportedLngs: [APP_LANGUAGE],
    load: "currentOnly",
    nonExplicitSupportedLngs: false,
    debug: process.env.NODE_ENV === "development",

    // Ensure synchronous loading to prevent timing issues
    initAsync: false,

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    backend: {
      loadPath: (lngs: string[], namespaces: string[]) => {
        const lng = lngs[0];
        const basePath = import.meta.env.BASE_URL || "/";
        const cleanBasePath = basePath.endsWith("/")
          ? basePath.slice(0, -1)
          : basePath;
        return `${cleanBasePath}/locales/${lng}/${namespaces[0]}.toml`;
      },
    },

    react: {
      useSuspense: true, // Enable suspense to prevent premature rendering
      bindI18n: "languageChanged loaded",
      bindI18nStore: "added removed",
      transEmptyNodeValue: "", // Return empty string for missing keys instead of key name
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
    },
  });

// Set document direction based on language
i18n.on("languageChanged", (lng) => {
  const isRTL = rtlLanguages.includes(lng);
  document.documentElement.dir = isRTL ? "rtl" : "ltr";
  document.documentElement.lang = lng;
});

// Non-React modules off the hydration path (diskFileSync's toasts) read the
// translator from globalThis; the ESM build does not register itself.
(globalThis as Record<string, unknown>).i18next = i18n;

export default i18n;
