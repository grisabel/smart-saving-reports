import WithApp from "@/WithApp";
import ReactDOM from "react-dom/client";
import TransactionDetailsModal from "./components/TransactionDetailsModal";

import CategoryDetails from "./components/CategoryDetails/CategoryDetails";
import CategoriesDetailsProvider, {
  CategoryType,
} from "./context/CategoriesDetailsContext";
import DateTimeService from "@/utils/Datetime/DatetimeService";

interface CategoriesDetailsReportProps {
  categoryType: CategoryType;
}

const CategoriesDetailsReport: React.FC<CategoriesDetailsReportProps> = ({
  categoryType,
}) => {
  const currentDate = DateTimeService.currentDate();
  const initialRange = DateTimeService.getDateLimits(currentDate, "year");

  return (
    <CategoriesDetailsProvider
      categoryType={categoryType}
      dateEnd={initialRange.dateEnd}
      dateStart={initialRange.dateStart}
    >
      <div>
        <CategoryDetails />
        <TransactionDetailsModal />
      </div>
    </CategoriesDetailsProvider>
  );
};

export default CategoriesDetailsReport;

// class CategoriesDetailsReportMfe extends HTMLElement {
//   app: any;

//   connectedCallback() {
//     const AppMfe = WithApp(CategoriesDetailsReport);
//     this.app = ReactDOM.createRoot(this);
//     this.app.render(<AppMfe />);
//   }

//   disconnectedCallback() {
//     if (this.app) {
//       this.app.unmount();
//     }
//   }
// }

// customElements.define(
//   "categories-details-report-mfe",
//   CategoriesDetailsReportMfe
// );
