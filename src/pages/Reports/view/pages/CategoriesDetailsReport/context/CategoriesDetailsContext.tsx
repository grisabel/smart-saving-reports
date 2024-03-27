import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { TransactionDataFilter } from "../components/TransactionDetailsModal/TransactionDetailsModal";

type CategoryType = "INCOME" | "EXPENSE";

interface CategoriesDetailsContextInterface {
  type: CategoryType | null;
  filter: TransactionDataFilter | null;

  setType: (value: CategoryType) => void;
  setFilter: Dispatch<SetStateAction<TransactionDataFilter | null>>;
}

const CategoriesDetailsContext =
  createContext<CategoriesDetailsContextInterface | null>(null);

const CategoriesDetailsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filter, setFilter] = useState<TransactionDataFilter | null>(null);
  const [type, setType] = useState<CategoryType | null>(null);

  const context = {
    filter,
    setFilter,

    type,
    setType,
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
        "useCategoriesDetailsCtx must be used within a OnboardingProvider"
      );
    }
    return context;
  };

export default CategoriesDetailsProvider;
