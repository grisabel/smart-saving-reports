import { HttpService } from "@/utils/Http/HttpService";
import type { ReportInterfaceRepository } from "./ReportInterfaceRepository";
import type { HttpInterfaceService } from "@/utils/Http/HttpInterfaceService";
import { CategortListResponseModel } from "./model/response/CategortListResponseModel";
import { CategoryListResquestModel } from "./model/request/CategoryListRequestModel";
import DateTimeService from "@/utils/Datetime/DatetimeService";
import { DATE_FORMATS } from "@/utils/Datetime/constants";

export class ReportHttpRepository implements ReportInterfaceRepository {
  constructor(private http: HttpInterfaceService) {}

  categoryList(
    requestModel: CategoryListResquestModel
  ): Promise<CategortListResponseModel> {
    return new Promise((resolve, reject) => {
      const urlIcome =
        "/financial-control/accounts/:accountNumber/reports/income?dateFrom=:dateStart&dateTo=:dateEnd";
      const urlExpense =
        "/financial-control/accounts/:accountNumber/reports/expense?dateFrom=:dateStart&dateTo=:dateEnd";
      const url =
        requestModel.categoryType === "EXPENSE" ? urlExpense : urlIcome;

      return this.http
        .get<CategortListResponseModel>({
          endpoint:
            import.meta.env.VITE_BASE_URL +
            url
              .replace(":accountNumber", "0")
              .replace(
                ":dateStart",
                encodeURIComponent(
                  DateTimeService.parse(
                    requestModel.dateStart,
                    DATE_FORMATS.Date
                  )
                )
              )
              .replace(
                ":dateEnd",
                encodeURIComponent(
                  DateTimeService.parse(requestModel.dateEnd, DATE_FORMATS.Date)
                )
              ),
        })
        .then((response) => {
          try {
            switch (response.status) {
              case 200:
                resolve(response.json());
                break;

              default:
                reject();
                break;
            }
          } catch (error) {
            console.log("Error in response.json()");
            reject();
          }
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
          reject();
        });
    });
  }
}
