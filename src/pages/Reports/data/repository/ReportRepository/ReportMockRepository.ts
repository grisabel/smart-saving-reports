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

httpMock.onGet(
  "/financial-control/accounts/:accountNumber/reports/income/:conceptId?dateFrom=:dateStart&dateTo=:dateEnd",
  ({ params }) => {
    return Promise.resolve({
      status: 200,
      response: [
        {
          transactionId: "0376a09d-19da-4de3-b872-9bcc1d7b3d4b",
          amount: 12.39,
          conceptId: params?.conceptId ?? "",
          date: "01/01/2024",
          note: "nota 0",
        },
        {
          transactionId: "6a22fc67-ffb2-4754-958f-2a3045de5eb1",
          amount: 63.18,
          conceptId: params?.conceptId ?? "",
          date: "01/01/2024",
          note: "nota 1",
        },
      ],
    });
  }
);

httpMock.onGet(
  "/financial-control/accounts/:accountNumber/reports/expense/:conceptId?dateFrom=:dateStart&dateTo=:dateEnd",
  ({ params }) => {
    return Promise.resolve({
      status: 200,
      response: [
        {
          transactionId: "05a5aa03-7fb5-4fc4-bad6-f03d5bbfe64a",
          amount: 84.77,
          conceptId: params?.conceptId ?? "",
          date: "01/01/2024",
          note: "nota 1",
        },
        {
          transactionId: "b1ae8ad1-fe58-438e-91f4-ff91b4de0279",
          amount: 84.26,
          conceptId: params?.conceptId ?? "",
          date: "01/01/2024",
          note: "nota 0",
        },
      ],
    });
  }
);

export class UserMockRepository extends ReportHttpRepository {}
