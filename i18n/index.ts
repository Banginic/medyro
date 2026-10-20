"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Auth=================================================================================
import authEn from "@/features/auth/locales/en.json";
import authFr from "@/features/auth/locales/fr.json";


i18n.use(initReactI18next).init({
  resources: {
    en: {
      auth: authEn,
     
    },
    fr: {
  
      auth: authFr,
    },
  },

  lng: "fr",
  fallbackLng: "fr",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
