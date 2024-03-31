import WithApp from "@/WithApp";
import ReactDOM from "react-dom/client";
import TransactionDetailsModal from "./components/TransactionDetailsModal";

import CategoryDetails from "./components/CategoryDetails/CategoryDetails";
import CategoriesDetailsProvider, {
  CategoryType,
} from "./context/CategoriesDetailsContext";
import DateTimeService from "@/utils/Datetime/DatetimeService";
import { DateTimeModel } from "@/utils/Datetime/DatetimeInterfaceService";

interface CategoriesDetailsReportProps {
  categoryType: CategoryType;
  dateEnd: DateTimeModel;
  dateStart: DateTimeModel;
}

const CategoriesDetailsReport: React.FC<CategoriesDetailsReportProps> = ({
  categoryType,
  dateEnd,
  dateStart,
}) => {
  const currentDate = DateTimeService.currentDate();
  const initialRange = DateTimeService.getDateLimits(currentDate, "year");

  return (
    <CategoriesDetailsProvider
      categoryType={categoryType || "EXPENSE"}
      dateEnd={dateEnd || initialRange.dateEnd}
      dateStart={dateStart || initialRange.dateStart}
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
