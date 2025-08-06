import { IOrderline } from "./IOrderline";

export interface IPlacedOrder {
  _id: string;
  transactionID: number;
  level: number;
  customer: {
    id: string;
    name: string;
    mobile: string;
  } | undefined;
  orderlines: IOrderline[];
  pod: boolean;
  weight: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}
