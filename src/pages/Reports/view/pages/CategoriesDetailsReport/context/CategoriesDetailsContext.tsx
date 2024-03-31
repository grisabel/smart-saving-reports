import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { TransactionDataFilter } from "../components/TransactionDetailsModal/TransactionDetailsModal";
import { DateTimeModel } from "@/utils/Datetime/DatetimeInterfaceService";

export type CategoryType = "INCOME" | "EXPENSE";

interface CategoriesDetailsContextInterface {
  categoryType: CategoryType;
  filter: TransactionDataFilter;

  setFilter: Dispatch<SetStateAction<TransactionDataFilter>>;
}

const CategoriesDetailsContext =
  createContext<CategoriesDetailsContextInterface | null>(null);

const CategoriesDetailsProvider: React.FC<{
  children: React.ReactNode;
  categoryType: CategoryType;
  dateStart: DateTimeModel;
  dateEnd: DateTimeModel;
  format: "year" | "month";
}> = ({ children, categoryType, dateEnd, dateStart, format }) => {
  const [filter, setFilter] = useState<TransactionDataFilter>({
    format: format || "year",
    category: null,
    dateStart,
    dateEnd,
  });

  const context = {
    filter,
    setFilter,

    categoryType,
  };

  return (
    <CategoriesDetailsContext.Provider value={context}>
      {children}
    </CategoriesDetailsContext.Provider>
  );
};

export const useCategoriesDetailsCtx =
  (): CategoriesDetailsContextInterface => {
    const context = useContext(CategoriesDetailsContext);
    if (!context) {
      throw new Error(
        "useCategoriesDetailsCtx must be used within a CategoriesDetailsProvider"
      );
    }
    return context;
  };

export default CategoriesDetailsProvider;
