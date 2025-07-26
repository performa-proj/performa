import { IOrderline } from "./IOrderline";

/***************
** 1 - placed
** 2 -
****************/

export interface IOrder {
  _id: string;
  sessionID: number;
  transactionID: number;
  state: number;
  level: number;
  customer?: {
    id: string;
    name: string;
    mobile: string;
  } | undefined;
  orderlines: IOrderline[];
  weight: number;
  total: number;
  delivery: {
  } | undefined;
  payment: {
    dueDate: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
