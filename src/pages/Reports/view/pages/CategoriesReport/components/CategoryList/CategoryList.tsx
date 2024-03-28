import { ReportFactoryRepository } from "@/pages/Reports/data/repository/ReportRepository/ReportFactoryRepository";
import { CategoryType } from "../../../CategoriesDetailsReport/context/CategoriesDetailsContext";
import { useEffect, useState } from "react";
import DateTimeService from "@/utils/Datetime/DatetimeService";
import { useAppCtx } from "@/AppProvider";
import styles from "./CategoryList.module.scss";
import { useTranslation } from "react-i18next";
import GraphicCard from "@/components/stories/atoms/card/GraphicCard";
import { GraphicCardProps } from "@/components/stories/atoms/card/GraphicCard/GraphicCard";

const reportsRepository = ReportFactoryRepository.getInstance();

interface CategoryListProps {
  categoryType: CategoryType;
}

const CategoryList: React.FC<CategoryListProps> = ({ categoryType }) => {
  const [dataGraph, setDataGraph] = useState<GraphicCardProps>();
  const { setLoading } = useAppCtx();
  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true);
    reportsRepository
      .categoryList({
        categoryType,
        dateEnd: DateTimeService.currentDate(),
        dateStart: DateTimeService.currentDate(),
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
          onClick: () => console.log("Graphic card clicked"),
        });
      })
      .catch((error) => {
        console.log({ error });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.categoryListWp}>
      {<GraphicCard {...dataGraph} />}
    </div>
  );
};

export default CategoryList;
