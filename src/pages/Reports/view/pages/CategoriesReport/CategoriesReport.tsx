import WithApp from "@/WithApp";
import ReactDOM from "react-dom/client";

const CategoriesReport: React.FC = () => {
  console.log("CategoriesReport");
  return <h1>CategoriesReport</h1>;
};

export default CategoriesReport;

class CategoriesReportMfe extends HTMLElement {
  app: any;

  connectedCallback() {
    const AppMfe = WithApp(CategoriesReport);
    this.app = ReactDOM.createRoot(this);
    this.app.render(<AppMfe />);
  }

  disconnectedCallback() {
    if (this.app) {
      this.app.unmount();
    }
  }
}

customElements.define("categories-report-mfe", CategoriesReportMfe);
