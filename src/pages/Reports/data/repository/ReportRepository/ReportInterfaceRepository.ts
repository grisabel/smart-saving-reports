import { CategoryListResquestModel } from "./model/request/CategoryListRequestModel";
import type { CategortListResponseModel } from "./model/response/CategortListResponseModel";

export interface ReportInterfaceRepository {
  categoryList(
    requestModel: CategoryListResquestModel
  ): Promise<CategortListResponseModel>;
}
