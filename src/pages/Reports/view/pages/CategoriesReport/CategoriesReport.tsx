import WithApp from "@/WithApp";
import ReactDOM from "react-dom/client";
import CategoryList from "./components/CategoryList/CategoryList";
import LinkBack from "@/components/stories/atoms/links/LinkBack";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import BalanceContent from "@/components/stories/atoms/content/BalanceContent";
import CalendarRangePicker from "@/components/stories/atoms/inputs/CalendarRangePicker/CalendarRangePicker";
import DateTimeService from "@/utils/Datetime/DatetimeService";
import { CalendarRangePickerChangeEvent } from "@/components/stories/atoms/inputs/CalendarRangePicker/CalendarRangePicker.types";
import styles from "./CategoriesReport.module.scss";
import CategoriesReportProvider, {
  useCategoriesReportCtx,
} from "./context/CategoriesReportContext";
import { DateTimeModel } from "@/utils/Datetime/DatetimeInterfaceService";

const CategoriesReport: React.FC = () => {
  const { t } = useTranslation();

  const { filter, setFilter } = useCategoriesReportCtx();

  const [incomes, setIncomes] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);

  const currentDate = DateTimeService.currentDate();

  useEffect(() => {
    setAmount(incomes - expenses);
  }, [incomes, expenses]);

  const handleReturn = () => {
    window.dispatchEvent(new CustomEvent("reports:exit"));
  };

  const handleOnChange = (event: CalendarRangePickerChangeEvent) => {
    setFilter({
      dateStart: event.dateStart,
      dateEnd: event.dateEnd,
      format: event.format,
    });
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
            format={filter.format}
            className={styles.date}
            onChange={handleOnChange}
          />
        </div>
        <div className={styles.graphDetails}>
          <p className={styles.title}>{t("incomeExpenses")}</p>
          <div className={styles.graphs}>
            <CategoryList categoryType="INCOME" setAmount={setIncomes} />
            <CategoryList categoryType="EXPENSE" setAmount={setExpenses} />
          </div>
        </div>
      </div>
    </div>
  );
};

interface CategoriesReportWithProvidersProps {
  dateStart?: DateTimeModel;
  dateEnd?: DateTimeModel;
  format?: "year" | "month";
}

const CategoriesReportWithProviders: React.FC<
  CategoriesReportWithProvidersProps
> = ({ dateEnd, dateStart, format }) => {
  const currentDate = DateTimeService.currentDate();
  const initialRange = DateTimeService.getDateLimits(currentDate, "year");

  return (
    <CategoriesReportProvider
      dateStart={dateStart || initialRange.dateStart}
      dateEnd={dateEnd || initialRange.dateEnd}
      format={format || "year"}
    >
      <CategoriesReport />
    </CategoriesReportProvider>
  );
};

export default CategoriesReportWithProviders;

class CategoriesReportMfe extends HTMLElement {
  app: any;

  dateStart?: DateTimeModel;
  dateEnd?: DateTimeModel;
  format?: "year" | "month";

  connectedCallback() {
    const AppMfe = WithApp<CategoriesReportWithProvidersProps>(
      CategoriesReportWithProviders
    );

    this.app = ReactDOM.createRoot(this);

    let props: CategoriesReportWithProvidersProps = {
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

customElements.define("categories-report-mfe", CategoriesReportMfe);
