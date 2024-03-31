import { DateTimeModel } from "@/utils/Datetime/DatetimeInterfaceService";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export interface CategoriesReportFilter {
  dateStart: DateTimeModel;
  dateEnd: DateTimeModel;
}

interface CategoriesDetailsContextInterface {
  filter: CategoriesReportFilter;

  setFilter: Dispatch<SetStateAction<CategoriesReportFilter>>;
}

const CategoriesReportContext =
  createContext<CategoriesDetailsContextInterface | null>(null);

const CategoriesReportProvider: React.FC<{
  children: React.ReactNode;
  dateStart: DateTimeModel;
  dateEnd: DateTimeModel;
}> = ({ children, dateEnd, dateStart }) => {
  const [filter, setFilter] = useState<CategoriesReportFilter>({
    dateStart,
    dateEnd,
  });

  const context = {
    filter,
    setFilter,
  };

  return (
    <CategoriesReportContext.Provider value={context}>
      {children}
    </CategoriesReportContext.Provider>
  );
};

export const useCategoriesReportCtx = (): CategoriesDetailsContextInterface => {
  const context = useContext(CategoriesReportContext);
  if (!context) {
    throw new Error(
      "useCategoriesReportCtx must be used within a CategoriesReportProvider"
    );
  }
  return context;
};

export default CategoriesReportProvider;
