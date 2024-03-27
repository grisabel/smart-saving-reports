import { Dispatch, SetStateAction } from "react";
import styles from "./CategoryDetails.scss";

import { CategoryFactoryRespository } from "@/pages/Reports/data/repository/Category/CategoryFactory";
import { TransactionDataFilter } from "../TransactionDetailsModal/TransactionDetailsModal";
import DateTimeService from "@/utils/Datetime/DatetimeService";

const categoryRespository = CategoryFactoryRespository.getInstance();

interface CategoryDetailsProps {
  setFilter: Dispatch<SetStateAction<TransactionDataFilter | null>>;
}

const CategoryDetails: React.FC<CategoryDetailsProps> = ({ setFilter }) => {
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
