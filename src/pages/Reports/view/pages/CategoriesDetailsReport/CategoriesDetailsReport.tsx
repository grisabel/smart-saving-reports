import WithApp from "@/WithApp";
import ReactDOM from "react-dom/client";
import TransactionDetailsModal from "./components/TransactionDetailsModal";

import CategoryDetails from "./components/CategoryDetails/CategoryDetails";
import CategoriesDetailsProvider, {
  CategoryType,
} from "./context/CategoriesDetailsContext";
import DateTimeService from "@/utils/Datetime/DatetimeService";

const CategoriesDetailsReport: React.FC = () => {
  const categoryType: CategoryType = "EXPENSE";
  const dateStart = DateTimeService.currentDate();
  const dateEnd = DateTimeService.currentDate();
  return (
    <CategoriesDetailsProvider
      categoryType={categoryType}
      dateEnd={dateEnd}
      dateStart={dateStart}
    >
      <div>
        {/* <h1>CategoriesDetailsReport {categoryType}</h1> */}
        <CategoryDetails />
        <TransactionDetailsModal />
      </div>
    </CategoriesDetailsProvider>
  );
};

export default CategoriesDetailsReport;

class CategoriesDetailsReportMfe extends HTMLElement {
  app: any;

  connectedCallback() {
    const AppMfe = WithApp(CategoriesDetailsReport);
    this.app = ReactDOM.createRoot(this);
    this.app.render(<AppMfe />);
  }

  disconnectedCallback() {
    if (this.app) {
      this.app.unmount();
    }
  }
}

customElements.define(
  "categories-details-report-mfe",
  CategoriesDetailsReportMfe
);
