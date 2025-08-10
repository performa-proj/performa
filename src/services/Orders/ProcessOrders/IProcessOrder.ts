import { IOrderline } from "../IOrderline";

export interface IProcessOrder {
  _id: string;
  transactionID: number;
  level: number;
  customer: {
    id: string;
    name: string;
    mobile: string;
  } | undefined;
  orderlines: IOrderline[];
  fulfillment?: {
    completed: boolean;
    vehicle?: {
      plate?: string;
      weight: {
        initial: number;
        loaded: number;
      };
    };
    orderlines: {
      [sku: string]: {
        count: number;
      };
    };
  };
  payment: {
    pod: boolean;
    cash?: number;
    transfer?: {
      amount: number;
    };
  };
  weight: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}
