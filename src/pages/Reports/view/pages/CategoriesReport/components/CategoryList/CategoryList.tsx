import { ReportFactoryRepository } from "@/pages/Reports/data/repository/ReportRepository/ReportFactoryRepository";
import { CategoryType } from "../../../CategoriesDetailsReport/context/CategoriesDetailsContext";
import { useEffect, useState } from "react";
import DateTimeService from "@/utils/Datetime/DatetimeService";
import { CategortListResponseModel } from "@/pages/Reports/data/repository/ReportRepository/model/response/CategortListResponseModel";
import { useAppCtx } from "@/AppProvider";

const reportsRepository = ReportFactoryRepository.getInstance();

interface CategoryListProps {
  categoryType: CategoryType;
}

const CategoryList: React.FC<CategoryListProps> = ({ categoryType }) => {
  const [data, setData] = useState<CategortListResponseModel | null>(null);
  const { setLoading } = useAppCtx();

  // todoUseCategory.getCategory

  useEffect(() => {
    setLoading(true);
    reportsRepository
      .categoryList({
        categoryType,
        dateEnd: DateTimeService.currentDate(),
        dateStart: DateTimeService.currentDate(),
      })
      .then((resul) => {
        console.log({ resul });
        setData(resul);
      })
      .catch((error) => {
        console.log({ error });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>CategoryList</h1>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default CategoryList;
