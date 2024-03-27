import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import AppProvider from "./AppProvider";

import "./i18n";
import "./index.scss";
import { LOCAL_STORAGE_KEYS } from "./utils/Http/HttpService";
import { HttpFactory } from "./utils/Http/HttpFactory";

const httpService = HttpFactory.getInstance();

function WithApp(Component: React.ComponentType) {
  return () => {
    const { i18n } = useTranslation();

    useEffect(() => {
      // Language Logic
      let lang = window.localStorage.getItem("language") || "es";
      i18n.changeLanguage(lang);

      //Session Logic
      const queryParams = new URLSearchParams(window.location.search);
      const accessToken = queryParams.get("accessToken");
      const refreshToken = queryParams.get("refreshToken");

      if (accessToken && refreshToken) {
        window.localStorage.setItem(
          LOCAL_STORAGE_KEYS.refreshToken,
          refreshToken
        );
        window.localStorage.setItem(
          LOCAL_STORAGE_KEYS.accessToken,
          accessToken
        );
      }

      httpService.setAccessToken(accessToken);
    }, []);

    return (
      <AppProvider>
        <Component />
      </AppProvider>
    );
  };
}
export default WithApp;
