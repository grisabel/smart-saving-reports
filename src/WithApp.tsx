import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AppProvider from "./AppProvider";

import "./i18n";
import "./index.scss";
import { LOCAL_STORAGE_KEYS } from "./utils/Http/HttpService";
import { HttpFactory } from "./utils/Http/HttpFactory";

const httpService = HttpFactory.getInstance();

function WithApp<T extends object>(Component: React.FC<T>) {
  return (props: T) => {
    const { i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
      // Language Logic
      let lang = window.localStorage.getItem("language") || "es";
      i18n.changeLanguage(lang);

      //Session Logic
      const queryParams = new URLSearchParams(window.location.search);
      const accessToken = queryParams.get("accessToken") ||  window.localStorage.getItem(
        LOCAL_STORAGE_KEYS.accessToken,
      );
      const refreshToken = queryParams.get("refreshToken") ||  window.localStorage.getItem(
        LOCAL_STORAGE_KEYS.refreshToken,
      );

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
      setIsLoading(false)
    }, []);

    if(isLoading){
      return null;
    }

    return (
      <AppProvider>
        <Component {...props} />
      </AppProvider>
    );
  };
}
export default WithApp;
