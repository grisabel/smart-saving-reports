import { Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import { ROUTES_REPORTS } from "./routes";

// import CategoriesDetailsReport from "./pages/CategoriesDetailsReport";
// import CategoriesReport from "./pages/CategoriesReport";

const CategoriesDetailsReport = React.lazy(
  () => import("./pages/CategoriesDetailsReport")
);
const CategoriesReport = React.lazy(() => import("./pages/CategoriesReport"));

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
