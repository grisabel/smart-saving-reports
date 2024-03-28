import { ReportFactoryRepository } from "@/pages/Reports/data/repository/ReportRepository/ReportFactoryRepository";
import { CategoryType } from "../../../CategoriesDetailsReport/context/CategoriesDetailsContext";
import { useEffect } from "react";
import DateTimeService from "@/utils/Datetime/DatetimeService";
import { useAppCtx } from "@/AppProvider";
import styles from "./CategoryList.module.scss";

const reportsRepository = ReportFactoryRepository.getInstance();

interface CategoryListProps {
  categoryType: CategoryType;
}

const CategoryList: React.FC<CategoryListProps> = ({ categoryType }) => {
  // const [data, setData] = useState<ItemProps[]>([]);
  const { setLoading } = useAppCtx();
  // const categoryRepository = CategoryFactoryRespository.getInstance();
  // const { t } = useTranslation();

  // function transformCategoryAmountsToCategoriesData(
  //   categoriesAmounts: CategoryResponseModel[]
  // ): ItemProps[] {
  //   return categoriesAmounts.map((categoryAmount) => {
  //     let category;
  //     if (categoryType === "EXPENSE") {
  //       category = categoryRepository.getExpense(
  //         categoryAmount.conceptId
  //       )?.icon;
  //     } else {
  //       category = categoryRepository.getIncome(categoryAmount.conceptId)?.icon;
  //     }

  //     return {
  //       amount: categoryAmount.amount,
  //       category: categoryRepository.getExpense(categoryAmount.conceptId)?.icon,
  //       categoryName: t(category ?? ""),
  //       type: categoryType === "EXPENSE" ? "expense" : "income",
  //       onClick: () => {
  //         console.log(`${categoryAmount.conceptId} clicked`);
  //       },
  //     };
  //   });
  // }
  useEffect(() => {
    setLoading(true);
    reportsRepository
      .categoryList({
        categoryType,
        dateEnd: DateTimeService.currentDate(),
        dateStart: DateTimeService.currentDate(),
      })
      .then((resul) => {
        // const transformedData = transformCategoryAmountsToCategoriesData(resul);
        // setData(transformedData);
        // console.log(data);
        console.log(resul);
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
      {/* <ItemListCategory items={data} /> */}
    </div>
  );
};

export default CategoryList;
