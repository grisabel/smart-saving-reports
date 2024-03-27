import { CategoryFactoryRespository } from "@/pages/Reports/data/repository/Category/CategoryFactory";
import { useCategoriesDetailsCtx } from "../../context/CategoriesDetailsContext";

import styles from "./CategoryDetails.scss";

const categoryRespository = CategoryFactoryRespository.getInstance();

const CategoryDetails: React.FC = () => {
  const { setFilter, categoryType } = useCategoriesDetailsCtx();

  const openDetails = (category: string) => {
    setFilter((prevFilter) => {
      return {
        ...prevFilter,
        category,
      };
    });
  };

  const categoryList =
    categoryType === "EXPENSE"
      ? categoryRespository.getExpenseList
      : categoryRespository.getIcomeList;

  return (
    <ul>
      {categoryList().map((expense) => {
        return (
          <li onClick={() => openDetails(expense.id)}>{expense.concept}</li>
        );
      })}
    </ul>
  );
};

export default CategoryDetails;
