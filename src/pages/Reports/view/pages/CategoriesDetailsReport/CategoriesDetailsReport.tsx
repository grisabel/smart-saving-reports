import WithApp from "@/WithApp";
import ReactDOM from "react-dom/client";
import TransactionDetailsModal from "./components/TransactionDetailsModal";
import { TransactionDataFilter } from "./components/TransactionDetailsModal/TransactionDetailsModal";
import { useState } from "react";
import CategoryDetails from "./components/CategoryDetails/CategoryDetails";

const CategoriesDetailsReport: React.FC = () => {
  const [filter, setFilter] = useState<TransactionDataFilter | null>(null);

  const handleCleanFilter = () => {
    setFilter(() => null);
  };

  return (
    <div>
      <h1>CategoriesDetailsReport</h1>
      <CategoryDetails setFilter={setFilter} />
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
