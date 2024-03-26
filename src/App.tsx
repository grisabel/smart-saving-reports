import { useEffect } from "react";
import "./App.css";
import "@/styles/globals.scss";
import { useTranslation } from "react-i18next";
import AppRouter from "./AppRouter";
import AppProvider from "./AppProvider";

function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    let lang = window.localStorage.getItem("language") || "es";
    i18n.changeLanguage(lang);
  }, []);

  return (
    <AppProvider>
      <h1>{t("test")}</h1>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
