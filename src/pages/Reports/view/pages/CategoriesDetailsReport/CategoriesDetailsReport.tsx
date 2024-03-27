import WithApp from "@/WithApp";
import ReactDOM from "react-dom/client";
import TransactionDetailsModal from "./components/TransactionDetailsModal";
import { TransactionDataFilter } from "./components/TransactionDetailsModal/TransactionDetailsModal";
import { useState } from "react";
import DateTimeService from "@/utils/Datetime/DatetimeService";

const CategoriesDetailsReport: React.FC = () => {
  const [filter, setFilter] = useState<TransactionDataFilter | null>(null);

  const openDetails = () => {
    setFilter(() => {
      return {
        category: "EXPENSE-1",
        dateStart: DateTimeService.currentDate(),
        dateEnd: DateTimeService.currentDate(),
      };
    });
  };

  const handleCleanFilter = () => {
    setFilter(() => null);
  };

  return (
    <div>
      <h1>CategoriesDetailsReport</h1>
      <button onClick={openDetails}>Open Details</button>
      <TransactionDetailsModal
        filter={filter}
        cleanFilter={handleCleanFilter}
      />
    </div>
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
