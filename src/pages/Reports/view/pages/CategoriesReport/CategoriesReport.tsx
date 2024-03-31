import WithApp from "@/WithApp";
import ReactDOM from "react-dom/client";
import CategoryList from "./components/CategoryList/CategoryList";
import LinkBack from "@/components/stories/atoms/links/LinkBack";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import BalanceContent from "@/components/stories/atoms/content/BalanceContent";
import CalendarRangePicker from "@/components/stories/atoms/inputs/CalendarRangePicker/CalendarRangePicker";
import DateTimeService from "@/utils/Datetime/DatetimeService";
import { CalendarRangePickerChangeEvent } from "@/components/stories/atoms/inputs/CalendarRangePicker/CalendarRangePicker.types";
import styles from "./CategoriesReport.module.scss";
import CategoriesReportProvider, {
  useCategoriesReportCtx,
} from "./context/CategoriesReportContext";

const CategoriesReport: React.FC = () => {
  const { t } = useTranslation();
  const [amount] = useState<number>(0);

  const { filter, setFilter } = useCategoriesReportCtx();

  const [format, setFormat] = useState<"year" | "month">("year");

  const currentDate = DateTimeService.currentDate();

  const handleReturn = () => {
    console.log("RETURN");
  };

  const handleOnChange = (event: CalendarRangePickerChangeEvent) => {
    setFilter({
      dateStart: event.dateStart,
      dateEnd: event.dateEnd,
    });
    setFormat(event.format);
  };
  return (
    <div>
      <LinkBack label={t("mainAccount")} onClick={handleReturn} />
      <div className={styles.categoryReportWp}>
        <div className={styles.data}>
          <BalanceContent
            title={t("balance")}
            amount={amount}
            type={amount >= 0 ? "income" : "expense"}
            className={styles.balance}
          />
          <CalendarRangePicker
            dateMax={currentDate}
            dateStart={filter.dateStart}
            dateEnd={filter.dateEnd}
            format={format}
            className={styles.date}
            onChange={handleOnChange}
          />
        </div>
        <div className={styles.graphDetails}>
          <p className={styles.title}>{t("incomeExpenses")}</p>
          <div className={styles.graphs}>
            <CategoryList categoryType="INCOME" />
            <CategoryList categoryType="EXPENSE" />
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoriesReportWithProviders = () => {
  const currentDate = DateTimeService.currentDate();
  const initialRange = DateTimeService.getDateLimits(currentDate, "year");

  return (
    <CategoriesReportProvider
      dateStart={initialRange.dateStart}
      dateEnd={initialRange.dateEnd}
    >
      <CategoriesReport />
    </CategoriesReportProvider>
  );
};

export default CategoriesReportWithProviders;

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
