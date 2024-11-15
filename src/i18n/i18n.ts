import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import de from "./de.json";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
	en: {
		translation: en,
	},
	de: {
		translation: de,
	},
};

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.use(LanguageDetector)
	.init({
		resources,
		supportedLngs: ["de", "en"],
		fallbackLng: "en",
		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	});

export default i18n;
