import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          year: "Year",
          month: "Month",

          balance: "Balance",
          expenses: "Expenses",
          income: "Income",
        },
      },
      es: {
        translation: {
          year: "Año",
          month: "Mes",

          balance: "Balance",
          expenses: "Gastos",
          income: "Ingresos",
        },
      },
    },
  });

export default i18n;
