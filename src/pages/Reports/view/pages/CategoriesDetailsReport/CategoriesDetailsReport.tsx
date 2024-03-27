import WithApp from "@/WithApp";
import ReactDOM from "react-dom/client";
import TransactionDetailsModal from "./components/TransactionDetailsModal";

import CategoryDetails from "./components/CategoryDetails/CategoryDetails";
import CategoriesDetailsProvider from "./context/CategoriesDetailsContext";

const CategoriesDetailsReport: React.FC = () => {
  return (
    <CategoriesDetailsProvider>
      <div>
        <h1>CategoriesDetailsReport</h1>
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
