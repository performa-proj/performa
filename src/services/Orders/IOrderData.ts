import { IProductItemLine } from "../Products/Items/IProductItemLine";

export interface IOrderData {
  customer?: {
    id: string;
    name: string;
    mobile: string;
    creditDays: number;
    creditLimit: number;
    creditSpent: number;
  };
  level: number;
  lines: {
    [sku: string]: {
      quantity: number;
      line: IProductItemLine;
      sellingAt: number | undefined;
    };
  };
}
