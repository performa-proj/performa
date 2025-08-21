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
    data: {
      [sku: string]: {
        quantity: number;
        line: IProductItemLine;
        sellingAt: number | undefined;
      };
    };
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
      plate: string;
      weight: {
        initial: number;
        loaded: number;
      };
    };
    data: {
      [sku: string]: {
        count: number;
        completed: boolean;
      };
    };
    weight: number;
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
