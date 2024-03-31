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
  categoryType?: CategoryType;
  dateEnd?: DateTimeModel;
  dateStart?: DateTimeModel;
  format?: "year" | "month";
}

const CategoriesDetailsReport: React.FC<CategoriesDetailsReportProps> = ({
  categoryType,
  dateEnd,
  dateStart,
  format,
}) => {
  const currentDate = DateTimeService.currentDate();
  const initialRange = DateTimeService.getDateLimits(currentDate, "year");

  return (
    <CategoriesDetailsProvider
      categoryType={categoryType || "EXPENSE"}
      dateEnd={dateEnd || initialRange.dateEnd}
      dateStart={dateStart || initialRange.dateStart}
      format={format || "year"}
    >
      <div>
        <CategoryDetails />
        <TransactionDetailsModal />
      </div>
    </CategoriesDetailsProvider>
  );
};

export default CategoriesDetailsReport;

class CategoriesDetailsReportMfe extends HTMLElement {
  app: any;

  categoryType?: CategoryType;
  dateStart?: DateTimeModel;
  dateEnd?: DateTimeModel;
  format?: "year" | "month";

  connectedCallback() {
    const AppMfe = WithApp<CategoriesDetailsReportProps>(
      CategoriesDetailsReport
    );
    this.app = ReactDOM.createRoot(this);

    let props: CategoriesDetailsReportProps = {
      categoryType: this["categoryType"] ?? undefined,
      dateStart: this["dateStart"] ?? undefined,
      dateEnd: this["dateEnd"] ?? undefined,
      format: this["format"] ?? undefined,
    };

    this.app.render(<AppMfe {...props} />);
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
