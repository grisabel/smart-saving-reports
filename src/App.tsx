import "./App.css";
import { useTranslation } from "react-i18next";
import AppRouter from "./AppRouter";
import AppProvider from "./AppProvider";

function App() {
  const { t } = useTranslation();

  return (
    <AppProvider>
      <h1>{t("test")}</h1>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
