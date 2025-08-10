import { IProductItemLine } from "../Products/Items/IProductItemLine";
import { IOrderData } from "./IOrderData";
import { IOrdering } from "./IOrdering";
import { IOrderline } from "./IOrderline";
import { IReturnline } from "./IReturnline";

export const resolveReturning = (data: {
  level: number;
  lines: {
    [sku: string]: {
      quantity: number;
      line: IProductItemLine;
    };
  };
}): IReturnline[] => {
  return [];
};
