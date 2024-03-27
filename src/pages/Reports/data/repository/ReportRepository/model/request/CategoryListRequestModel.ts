import { CategoryType } from "@/pages/Reports/view/pages/CategoriesDetailsReport/context/CategoriesDetailsContext";
import { DateTimeModel } from "@/utils/Datetime/DatetimeInterfaceService";

export interface CategoryListResquestModel {
  categoryType: CategoryType;
  dateStart: DateTimeModel;
  dateEnd: DateTimeModel;
}
