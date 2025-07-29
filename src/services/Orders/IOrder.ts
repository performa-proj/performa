import { IOrderline } from "./IOrderline";

/***************
** -- States --
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
  pod: boolean;
  weight: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}
