import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES_REPORTS } from "./routes";

import CategoriesDetailsReport from "./pages/CategoriesDetailsReport";
import CategoriesReport from "./pages/CategoriesReport";

function ReportsRouter() {
  return (
    <Routes>
      <Route
        path={`${ROUTES_REPORTS.DETAILS}`}
        element={<CategoriesDetailsReport />}
      />
      <Route
        path={`${ROUTES_REPORTS.SUMMARY}`}
        element={<CategoriesReport />}
      />

      <Route path="*" element={<Navigate to={ROUTES_REPORTS.SUMMARY} />} />
    </Routes>
  );
}

export default ReportsRouter;
