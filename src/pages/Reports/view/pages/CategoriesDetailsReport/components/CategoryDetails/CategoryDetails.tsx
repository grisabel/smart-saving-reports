import { CategoryFactoryRespository } from "@/pages/Reports/data/repository/Category/CategoryFactory";
import { useCategoriesDetailsCtx } from "../../context/CategoriesDetailsContext";
import ItemListCategory, {
  ItemProps,
} from "@/components/stories/organism/ItemListCategory/ItemListCategory";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CategoryResponseModel } from "@/pages/Reports/data/repository/ReportRepository/model/response/CategortListResponseModel";
import DateTimeService from "@/utils/Datetime/DatetimeService";
import { useAppCtx } from "@/AppProvider";
import { ReportFactoryRepository } from "@/pages/Reports/data/repository/ReportRepository/ReportFactoryRepository";

import styles from "./CategoryDetails.module.scss";
import LinkBack from "@/components/stories/atoms/links/LinkBack";
import BalanceContent from "@/components/stories/atoms/content/BalanceContent";
import CalendarRangePicker from "@/components/stories/atoms/inputs/CalendarRangePicker/CalendarRangePicker";
import { CalendarRangePickerChangeEvent } from "@/components/stories/atoms/inputs/CalendarRangePicker/CalendarRangePicker.types";

const reportsRepository = ReportFactoryRepository.getInstance();

const CategoryDetails: React.FC = () => {
  const { setFilter, categoryType } = useCategoriesDetailsCtx();
  const [data, setData] = useState<ItemProps[]>([]);
  const { setLoading } = useAppCtx();
  const categoryRepository = CategoryFactoryRespository.getInstance();
  const { t } = useTranslation();
  const [format, setFormat] = useState<"year" | "month">("year");
  const currentDate = DateTimeService.currentDate();
  const initialRange = DateTimeService.getDateLimits(currentDate, "year");
  const [range, setRange] = useState(initialRange);

  function transformCategoryAmountsToCategoriesData(
    categoriesAmounts: CategoryResponseModel[]
  ): ItemProps[] {
    return categoriesAmounts.map((categoryAmount) => {
      let category;
      if (categoryType === "EXPENSE") {
        category = categoryRepository.getExpense(
          categoryAmount.conceptId
        )?.icon;
      } else {
        category = categoryRepository.getIncome(categoryAmount.conceptId)?.icon;
      }

      return {
        amount: categoryAmount.amount,
        category: categoryRepository.getExpense(categoryAmount.conceptId)?.icon,
        categoryName: t(category ?? ""),
        type: categoryType === "EXPENSE" ? "expense" : "income",
        onClick: () => {
          openDetails(categoryAmount.conceptId);
        },
      };
    });
  }
  const openDetails = (category: string) => {
    setFilter((prevFilter) => {
      return {
        ...prevFilter,
        category,
      };
    });
  };
  const handleReturn = () => {
    console.log("RETURN");
  };

  const handleOnChange = (event: CalendarRangePickerChangeEvent) => {
    setRange({
      dateStart: event.dateStart,
      dateEnd: event.dateEnd,
    });
    setFormat(event.format);
  };

  useEffect(() => {
    setLoading(true);
    reportsRepository
      .categoryList({
        categoryType,
        dateEnd: DateTimeService.currentDate(),
        dateStart: DateTimeService.currentDate(),
      })
      .then((resul) => {
        const transformedData = transformCategoryAmountsToCategoriesData(resul);
        setData(transformedData);
      })
      .catch((error) => {
        console.log({ error });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <LinkBack
        label={categoryType === "EXPENSE" ? t("expenses") : t("income")}
        onClick={handleReturn}
      />
      <div className={styles.categoryReportWp}>
        <div className={styles.data}>
          <BalanceContent
            title={categoryType === "EXPENSE" ? t("expenses") : t("income")}
            amount={"200"}
            type={categoryType === "EXPENSE" ? "expense" : "income"}
            className={styles.balance}
          />
          <CalendarRangePicker
            dateMax={currentDate}
            dateStart={range.dateStart}
            dateEnd={range.dateEnd}
            format={format}
            className={styles.date}
            onChange={handleOnChange}
          />
        </div>
        <div className={styles.categoryListWp}>
          <ItemListCategory items={data} />
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
