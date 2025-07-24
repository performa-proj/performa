import { IOrderline } from "./IOrderline";

export interface IOrder {
  _id: string;
  transactionID: number;
  level: number;
  customer?: {
    id: string;
    name: string;
    mobile: string;
  } | undefined;
  orderlines: IOrderline[];
  weight: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}
