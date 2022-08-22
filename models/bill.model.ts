export interface Bill {
  id: number;
  createdAt: string;
  price: number;
  accountsAmount: number;
  currency: string;
  paymentMethod: string;
  transactionId: string;
}
