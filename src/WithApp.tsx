import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import AppProvider from "./AppProvider";

import "./i18n";
import "./index.scss";

function WithApp(Component: React.ComponentType) {
  return () => {
    const { i18n } = useTranslation();

    useEffect(() => {
      let lang = window.localStorage.getItem("language") || "es";
      i18n.changeLanguage(lang);
    }, []);

    return (
      <AppProvider>
        <Component />
      </AppProvider>
    );
  };
}
export default WithApp;
