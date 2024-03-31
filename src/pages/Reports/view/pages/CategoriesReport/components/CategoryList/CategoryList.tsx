import { ReportFactoryRepository } from "@/pages/Reports/data/repository/ReportRepository/ReportFactoryRepository";
import { CategoryType } from "../../../CategoriesDetailsReport/context/CategoriesDetailsContext";
import { useEffect, useState } from "react";
import DateTimeService from "@/utils/Datetime/DatetimeService";
import { useAppCtx } from "@/AppProvider";
import styles from "./CategoryList.module.scss";
import { useTranslation } from "react-i18next";
import GraphicCard from "@/components/stories/atoms/card/GraphicCard";
import { GraphicCardProps } from "@/components/stories/atoms/card/GraphicCard/GraphicCard";
import CircleGraph, {
  CircleGraphData,
} from "@/components/stories/atoms/graphs/CircleGraph/CircleGraph";
import { CategoryResponseModel } from "@/pages/Reports/data/repository/ReportRepository/model/response/CategortListResponseModel";
import { CategoryFactoryRespository } from "@/pages/Reports/data/repository/Category/CategoryFactory";
import { useCategoriesReportCtx } from "../../context/CategoriesReportContext";

const reportsRepository = ReportFactoryRepository.getInstance();

interface CategoryListProps {
  categoryType: CategoryType;
  setAmount: (value: number) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categoryType,
  setAmount,
}) => {
  const [dataGraph, setDataGraph] = useState<GraphicCardProps>();
  const { setLoading } = useAppCtx();
  const categoryRepository = CategoryFactoryRespository.getInstance();
  const { t } = useTranslation();

  const { filter } = useCategoriesReportCtx();

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

  const handleOnClick = () => {
    window.dispatchEvent(
      new CustomEvent("reports:navigateToDetails", {
        detail: {
          filter: {
            categoryType: categoryType,
            dateStart: filter.dateStart,
            dateEnd: filter.dateEnd,
          },
        },
      })
    );
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

        setDataGraph({
          amount: Number(totalAmount.toFixed(2)),
          description: categoryType === "EXPENSE" ? t("expenses") : t("income"),
          type: categoryType === "EXPENSE" ? "expense" : "income",
          onClick: handleOnClick,
          children: (
            <CircleGraph
              data={transformCategoryAmountsToCircleGraphData(resul) ?? []}
              isDots={true}
            />
          ),
        });

        setAmount(totalAmount);
      })
      .catch((error) => {
        console.log({ error });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter]);

  return (
    <div className={styles.categoryListWp}>
      {<GraphicCard {...dataGraph} />}
    </div>
  );
};

export default CategoryList;
