import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import EN from "./localization/localization-EN";
import TR from "./localization/localization-TR";

const resources = {
  TR: {
    translation: TR,
  },
  EN: {
    translation: EN,
  },
};

i18n.use(initReactI18next).init({
  lng: "TR",
  resources,
});

export default i18n;
