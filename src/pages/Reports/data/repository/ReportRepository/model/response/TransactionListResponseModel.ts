export type TransactionListResponseModel = TransactionResponseModel[];

export interface TransactionResponseModel {
  transactionId: string;
  amount: number;
  conceptId: string;
  concept: string;
  date: string; // "dd/MM/yyyy";
  note: string;
}
