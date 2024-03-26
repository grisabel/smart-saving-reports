import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import WithApp from "./WithApp.tsx";

const AppCore = WithApp(App);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppCore />
  </React.StrictMode>
);
