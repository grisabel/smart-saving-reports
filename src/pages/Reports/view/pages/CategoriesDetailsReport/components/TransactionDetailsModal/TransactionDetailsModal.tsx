import SideModal from "@/components/stories/atoms/modals/SideModal/SideModal";
import { DateTimeModel } from "@/utils/Datetime/DatetimeInterfaceService";
import { useEffect, useState } from "react";
import { useCategoriesDetailsCtx } from "../../context/CategoriesDetailsContext";
import { CategoryFactoryRespository } from "@/pages/Reports/data/repository/Category/CategoryFactory";
import { ReportFactoryRepository } from "@/pages/Reports/data/repository/ReportRepository/ReportFactoryRepository";
import { TransactionListResponseModel } from "@/pages/Reports/data/repository/ReportRepository/model/response/TransactionListResponseModel";
import { useAppCtx } from "@/AppProvider";
import { useTranslation } from "react-i18next";
import styles from "./TransactionDetailsModal.module.scss";
import CategoryCard from "@/components/stories/organism/CategoryCard";
import { CategoryCardProps } from "@/components/stories/organism/CategoryCard/CategoryCard";
import { SmartSavingsIconName } from "@/components/stories/atoms/Icon/SmartSavingsIcon";

const categoryRespository = CategoryFactoryRespository.getInstance();
const reportRepository = ReportFactoryRepository.getInstance();

export interface TransactionDataFilter {
  category: string | null;
  dateStart: DateTimeModel;
  dateEnd: DateTimeModel;
}

const TransactionDetailsModal: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<TransactionListResponseModel | null>(null);
  const [dataCategory, setDataCategory] = useState<CategoryCardProps>();
  const { setLoading } = useAppCtx();
  const { t } = useTranslation();

  const { filter, setFilter, categoryType } = useCategoriesDetailsCtx();

  useEffect(() => {
    const { category, dateStart, dateEnd } = filter ?? {};
    if (!category || !dateEnd || !dateStart) {
      return;
    }

    setLoading(true);
    reportRepository
      .transactionList({
        categoryType: categoryType,
        categoryId: category,
        dateEnd: dateEnd,
        dateStart: dateStart,
      })
      .then((resul) => {
        setData(resul);
        console.log(JSON.stringify(resul));
        setOpen(true);
        const totalAmount = resul.reduce(
          (sum, current) => sum + current.amount,
          0
        );
        setDataCategory({
          amount: Number(totalAmount.toFixed(2)),
          category: getCategoryName(filter.category as SmartSavingsIconName),
          categoryName: t(
            getCategoryName(filter.category as SmartSavingsIconName) as string
          ),
          type: categoryType === "EXPENSE" ? "expense" : "income",
        });
      })
      .catch((error) => {
        console.log({ error });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter]);

  const handleClose = () => {
    setOpen(false);
    setFilter((prevFilter) => ({
      ...prevFilter,
      category: null,
    }));
  };

  const getCategoryName = (category: string) => {
    const categoryModel =
      categoryType === "EXPENSE"
        ? categoryRespository.getExpense(category)
        : categoryRespository.getIncome(category);

    return categoryModel?.icon;
  };

  return (
    open &&
    filter?.category && (
      <SideModal title={t("details")} onClose={handleClose} open={open}>
        <CategoryCard {...dataCategory} className={styles.category} />

        <p>{JSON.stringify(filter)}</p>

        <p>{JSON.stringify(data)}</p>
      </SideModal>
    )
  );
};

export default TransactionDetailsModal;
