import { CategoryFactoryRespository } from "@/pages/Reports/data/repository/Category/CategoryFactory";
import DateTimeService from "@/utils/Datetime/DatetimeService";
import { useCategoriesDetailsCtx } from "../../context/CategoriesDetailsContext";

import styles from "./CategoryDetails.scss";

const categoryRespository = CategoryFactoryRespository.getInstance();

const CategoryDetails: React.FC = () => {
  const { setFilter } = useCategoriesDetailsCtx();

  const openDetails = (category: string) => {
    setFilter(() => {
      return {
        category,
        dateStart: DateTimeService.currentDate(),
        dateEnd: DateTimeService.currentDate(),
      };
    });
  };

  return (
    <ul>
      {categoryRespository.getExpenseList().map((expense) => {
        return (
          <li onClick={() => openDetails(expense.id)}>{expense.concept}</li>
        );
      })}
    </ul>
  );
};

export default CategoryDetails;
