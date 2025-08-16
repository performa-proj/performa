import { IOrderline } from "../IOrderline";
import { IReturnline } from "../IReturnline";

export interface IProcessOrder {
  _id: string;
  transactionID: number;
  level: number;
  customer: {
    id: string;
    name: string;
    mobile: string;
  } | undefined;
  ordering: {
    lines: IOrderline[];
    weight: number;
    total: number;
  };
  returning?: {
    lines: IReturnline[];
    weight: number;
    total: number;
  };
  fulfilling?: {
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
    payable: number;
    pod: boolean;
    cash?: number;
    transfer?: {
      amount: number;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}
