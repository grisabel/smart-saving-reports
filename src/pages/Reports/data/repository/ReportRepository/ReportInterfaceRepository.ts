import { CategoryListResquestModel } from "./model/request/CategoryListRequestModel";
import { TransactionListResquestModel } from "./model/request/TransactionListRequestModel";
import type { CategortListResponseModel } from "./model/response/CategortListResponseModel";
import { TransactionResponseModel } from "./model/response/TransactionListResponseModel";

export interface ReportInterfaceRepository {
  categoryList(
    requestModel: CategoryListResquestModel
  ): Promise<CategortListResponseModel>;

  transactionList(
    requestModel: TransactionListResquestModel
  ): Promise<TransactionResponseModel>;
}
