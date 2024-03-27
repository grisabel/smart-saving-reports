import { CategoryType } from "@/pages/Reports/view/pages/CategoriesDetailsReport/context/CategoriesDetailsContext";
import { DateTimeModel } from "@/utils/Datetime/DatetimeInterfaceService";

export interface TransactionListResquestModel {
  categoryType: CategoryType;
  categoryId: string;
  dateStart: DateTimeModel;
  dateEnd: DateTimeModel;
}
