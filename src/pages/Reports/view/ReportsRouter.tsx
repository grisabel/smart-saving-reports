import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import { ROUTES_REPORTS } from "./routes";
import Spinner from "@/components/stories/atoms/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { ABSOLUTE_ROUTES_REPORTS } from "@/pages/Reports/view/routes";

// import CategoriesDetailsReport from "./pages/CategoriesDetailsReport";
// import CategoriesReport from "./pages/CategoriesReport";

const CategoriesDetailsReport = React.lazy(
  () => import("./pages/CategoriesDetailsReport")
);
const CategoriesReport = React.lazy(() => import("./pages/CategoriesReport"));

const CategoriesReportWp = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { filter } = location.state || {};

  console.log({ filter });

  useEffect(() => {
    const callback = (event: any) => {
      const { filter } = event.detail;
      navigate(ABSOLUTE_ROUTES_REPORTS.DETAILS, {
        state: {
          filter: {
            dateStart: filter.dateStart,
            dateEnd: filter.dateEnd,
            categoryType: filter.categoryType,
          },
        },
      });
    };
    window.addEventListener("reports:navigateToDetails", callback);

    return () => {
      window.removeEventListener("reports:navigateToDetails", callback);
    };
  }, []);

  useEffect(() => {
    const callback = () => console.log("exit");
    window.addEventListener("reports:exit", callback);

    return () => {
      window.removeEventListener("reports:exit", callback);
    };
  });

  return (
    <CategoriesReport dateEnd={filter?.dateEnd} dateStart={filter?.dateStart} />
  );
};

const CategoriesDetailsReportWp = () => {
  const location = useLocation();
  const { filter } = location.state || {};

  console.log({ filter });

  const navigate = useNavigate();

  useEffect(() => {
    const callback = (event: any) => {
      const { filter } = event.detail;

      navigate(ABSOLUTE_ROUTES_REPORTS.SUMMARY, {
        state: {
          filter: {
            dateStart: filter.dateStart,
            dateEnd: filter.dateEnd,
          },
        },
      });
    };
    window.addEventListener("reports:navigateToSummary", callback);

    return () => {
      window.removeEventListener("reports:navigateToSummary", callback);
    };
  }, []);

  return (
    <CategoriesDetailsReport
      categoryType={filter?.categoryType}
      dateEnd={filter?.dateEnd}
      dateStart={filter?.dateStart}
    />
  );
};

function ReportsRouter() {
  return (
    <Suspense fallback={<Spinner open />}>
      <Routes>
        <Route
          path={`${ROUTES_REPORTS.DETAILS}`}
          element={<CategoriesDetailsReportWp />}
        />
        <Route
          path={`${ROUTES_REPORTS.SUMMARY}`}
          element={<CategoriesReportWp />}
        />

        <Route path="*" element={<Navigate to={ROUTES_REPORTS.SUMMARY} />} />
      </Routes>
    </Suspense>
  );
}

export default ReportsRouter;
