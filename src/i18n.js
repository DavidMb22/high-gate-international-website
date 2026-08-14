import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/translation";
import fr from "./locales/fr/translation";

const savedLanguage = localStorage.getItem("highgate-language");

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },

      fr: {
        translation: fr,
      },
    },

    lng: savedLanguage || "en",

    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;