import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES_GLOBAL } from "./routes";

import CategoriesDetailsReport from "./pages/CategoriesDetailsReport";
import CategoriesReport from "./pages/CategoriesReport";

function AppRouter() {
  return (
    <Routes>
      <Route
        path={`${ROUTES_GLOBAL.DETAILS}`}
        element={<CategoriesDetailsReport />}
      />
      <Route path={`${ROUTES_GLOBAL.SUMMARY}`} element={<CategoriesReport />} />

      <Route path="*" element={<Navigate to={ROUTES_GLOBAL.SUMMARY} />} />
    </Routes>
  );
}

export default AppRouter;
