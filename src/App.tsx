import "./App.css";
import { useTranslation } from "react-i18next";
import AppRouter from "./AppRouter";
import { BrowserRouter } from "react-router-dom";

function App() {
  const { t } = useTranslation();

  return (
    <BrowserRouter>
      <h1>{t("test")}</h1>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
