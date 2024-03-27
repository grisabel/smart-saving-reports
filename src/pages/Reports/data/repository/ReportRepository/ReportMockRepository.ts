import { HttpMockAdapterFactory } from "@/utils/Http/HttpMockAdapterFactory";
import { ReportHttpRepository } from "./ReportHttpRepository";

const httpMock = HttpMockAdapterFactory.getInstance();

httpMock.onGet(
  "/financial-control/accounts/:accountNumber/reports/income?dateFrom=:dateStart&dateTo=:dateEnd",
  () => {
    return Promise.resolve({
      status: 200,
      response: [
        {
          conceptId: "INCOME-2",
          amount: 1204.05,
        },
        {
          conceptId: "INCOME-1",
          amount: 1307.09,
        },
        {
          conceptId: "INCOME-3",
          amount: 1320.93,
        },
        {
          conceptId: "INCOME-4",
          amount: 1441.9,
        },
      ],
    });
  }
);

httpMock.onGet(
  "/financial-control/accounts/:accountNumber/reports/expense?dateFrom=:dateStart&dateTo=:dateEnd",
  () => {
    return Promise.resolve({
      status: 200,
      response: [
        {
          conceptId: "EXPENSE-11",
          amount: 783.92,
        },
        {
          conceptId: "EXPENSE-12",
          amount: 900.83,
        },
        {
          conceptId: "EXPENSE-14",
          amount: 971.27,
        },
        {
          conceptId: "EXPENSE-6",
          amount: 1084.08,
        },
        {
          conceptId: "EXPENSE-8",
          amount: 1096.17,
        },
        {
          conceptId: "EXPENSE-13",
          amount: 1124.96,
        },
        {
          conceptId: "EXPENSE-2",
          amount: 1127.49,
        },
        {
          conceptId: "EXPENSE-5",
          amount: 1128.13,
        },
        {
          conceptId: "EXPENSE-16",
          amount: 1152.18,
        },
        {
          conceptId: "EXPENSE-9",
          amount: 1177.27,
        },
        {
          conceptId: "EXPENSE-7",
          amount: 1181.69,
        },
        {
          conceptId: "EXPENSE-15",
          amount: 1213.01,
        },
        {
          conceptId: "EXPENSE-10",
          amount: 1276.7,
        },
        {
          conceptId: "EXPENSE-1",
          amount: 1299.95,
        },
        {
          conceptId: "EXPENSE-3",
          amount: 1393.09,
        },
        {
          conceptId: "EXPENSE-4",
          amount: 1435.72,
        },
      ],
    });
  }
);

export class UserMockRepository extends ReportHttpRepository {}
