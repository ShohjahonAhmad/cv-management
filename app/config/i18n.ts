import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import en from "./locales/en/translation.json";
import uz from "./locales/uz/translation.json";

const savedLanguages = localStorage.getItem("lang") || "en";

i18n.use(initReactI18next)
    .init({
        resources: {
            en: {translation: en},
            uz: {translation: uz}
        },
        lng: savedLanguages,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

i18n.on("languageChanged", (lng)=>{
    localStorage.setItem("lang", lng);
})

export default i18n;