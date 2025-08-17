import { IProductItemLine } from "@/services/Products/Items/IProductItemLine";
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
  ordering: {
    lines: IOrderline[];
    weight: number;
    total: number;
  };
  returning?: {
    data: {
      [sku: string]: {
        quantity: number;
        line: IProductItemLine;
      };
    };
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
