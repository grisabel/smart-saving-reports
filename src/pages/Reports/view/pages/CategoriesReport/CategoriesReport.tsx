import WithApp from "@/WithApp";
import ReactDOM from "react-dom/client";
import CategoryList from "./components/CategoryList/CategoryList";
import LinkBack from "@/components/stories/atoms/links/LinkBack";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import BalanceContent from "@/components/stories/atoms/content/BalanceContent";

const CategoriesReport: React.FC = () => {
  const { t } = useTranslation();
  const [isExpense] = useState<boolean>(true);

  const handleReturn = () => {
    console.log("RETURN");
  };

  return (
    <div>
      <LinkBack
        label={isExpense ? t("expenses") : t("income")}
        onClick={handleReturn}
      />
      <div>
        <BalanceContent
          title={isExpense ? t("expenses") : t("income")}
          amount={"200"}
          type={isExpense ? "expense" : "income"}
        />
      </div>
      <CategoryList categoryType="EXPENSE" />
      <CategoryList categoryType="INCOME" />
    </div>
  );
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
