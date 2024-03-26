import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES_GLOBAL } from "./routes";
import ReportsRouter from "./pages/Reports/view/ReportsRouter";

function AppRouter() {
  return (
    <Routes>
      <Route path={`${ROUTES_GLOBAL.REPORTS}/*`} element={<ReportsRouter />} />

      <Route path="*" element={<Navigate to={`${ROUTES_GLOBAL.REPORTS}`} />} />
    </Routes>
  );
}

export default AppRouter;
