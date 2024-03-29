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
          incomeExpenses: "Income and Expenses",
          mainAccount: "Main Account",

          paylist: "Salary",
          revenues: "Revenues",
          scholarship: "Scholarships / Grants",
          bets: "Betting / Gambling",
          mortgage: "Mortgage / Rent / Community Fees",
          food: "Groceries",
          pets: "Pets",
          fuel: "Fuel",
          electricity: "Electricity",
          heating: "Heating",
          internet: "Telephony / Internet",
          water: "Water",
          studies: "Education",
          beers: "Leisure",
          tax: "Taxes/Fines",
          health: "Health",
          insurance: "Insurance",
          car: "Car",
          restaurant: "Restaurants",

          details: "Details",
        },
      },
      es: {
        translation: {
          year: "Año",
          month: "Mes",

          balance: "Balance",
          expenses: "Gastos",
          income: "Ingresos",
          incomeExpenses: "Ingresos y Gastos",
          mainAccount: "Cuenta Principal",

          paylist: "Nómina",
          revenues: "Rentas",
          scholarship: "Becas / Subvenciones",
          bets: "Apuestas / Juego",
          mortgage: "Hipoteca / Alquiler / Comunidad",
          food: "Alimentación",
          pets: "Mascotas",
          fuel: "Comustible",
          electricity: "Luz",
          heating: "Calefacción",
          internet: "Telefonía / Internet",
          water: "Agua",
          studies: "Estudios",
          beers: "Ocio",
          tax: "Tasas / Impuestos / Multas",
          health: "Salud",
          insurance: "Seguros",
          car: "Coche",
          restaurant: "Restaurantes",

          details: "Detalles",
        },
      },
    },
  });

export default i18n;
