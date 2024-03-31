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
import CircleGraph from "@/components/stories/atoms/graphs/CircleGraph";
import { CircleGraphData } from "@/components/stories/atoms/graphs/CircleGraph/CircleGraph";

const reportsRepository = ReportFactoryRepository.getInstance();

const CategoryDetails: React.FC = () => {
  const { filter, setFilter, categoryType } = useCategoriesDetailsCtx();
  const [data, setData] = useState<ItemProps[]>([]);
  const [dataGraph, setDataGraph] = useState<CircleGraphData[]>();
  const { setLoading } = useAppCtx();
  const categoryRepository = CategoryFactoryRespository.getInstance();
  const { t } = useTranslation();

  const [amount, setAmount] = useState<number>(0);

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
    window.dispatchEvent(
      new CustomEvent("reports:navigateToSummary", {
        detail: {
          filter: {
            dateStart: filter.dateStart,
            dateEnd: filter.dateEnd,
            format: filter.format,
          },
        },
      })
    );
  };

  const generateContrastingColor = (iconName: string) => {
    const iconHash = Array.from(iconName).reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );
    const highValue = Math.floor(iconHash % (256 - 129)) + 129;

    const midValueBase = Math.floor(iconHash % 256);
    const lowValueBase = Math.floor(iconHash % 128);

    const midValue = midValueBase;
    const lowValue = lowValueBase;

    let [r, g, b] = [midValue, midValue, midValue];
    const highComponent = iconName.length % 3;
    switch (highComponent) {
      case 0:
        r = highValue;
        g = iconName.length % 2 === 0 ? lowValue : midValue;
        b = g === midValue ? lowValue : midValue;
        break;
      case 1:
        g = highValue;
        r = iconName.length % 2 === 0 ? lowValue : midValue;
        b = r === midValue ? lowValue : midValue;
        break;
      case 2:
        b = highValue;
        r = iconName.length % 2 === 0 ? lowValue : midValue;
        g = r === midValue ? lowValue : midValue;
        break;
    }

    const toHex = (c: number) => c.toString(16).padStart(2, "0");
    return "#" + toHex(r) + toHex(g) + toHex(b);
  };

  function transformCategoryAmountsToCircleGraphData(
    categoriesAmounts: CategoryResponseModel[]
  ): CircleGraphData[] {
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
        value: categoryAmount.amount,
        name: category as string,
        nameCategory: t(category ?? ""),
        background: generateContrastingColor(category as string),
      };
    });
  }

  const handleOnChange = (event: CalendarRangePickerChangeEvent) => {
    setFilter((prevState) => ({
      ...prevState,
      dateStart: event.dateStart,
      dateEnd: event.dateEnd,
      format: event.format,
    }));
  };

  useEffect(() => {
    setLoading(true);
    reportsRepository
      .categoryList({
        categoryType,
        dateEnd: filter.dateEnd,
        dateStart: filter.dateStart,
      })
      .then((resul) => {
        const totalAmount = resul.reduce(
          (sum, current) => sum + current.amount,
          0
        );
        setAmount(Number(totalAmount.toFixed(2)));
        const dataG = transformCategoryAmountsToCircleGraphData(resul);
        const transformedData = transformCategoryAmountsToCategoriesData(resul);
        setData(transformedData);
        setDataGraph(dataG);
      })
      .catch((error) => {
        console.log({ error });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter]);

  const currentDate = DateTimeService.currentDate();

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
            amount={amount}
            type={categoryType === "EXPENSE" ? "expense" : "income"}
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
        <div className={styles.categoryListWp}>
          <CircleGraph data={dataGraph ?? []} isDots={false} />
          <ItemListCategory items={data} />
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
