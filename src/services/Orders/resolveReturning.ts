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
  const returning = Object.values(data.lines).map((each) => {
    const maxIndex = each.line.priceLevels.length - 1;
    const index = data.level > maxIndex ? maxIndex : data.level;
    const returningAt = each.line.priceLevels[index];

    const returnline: IReturnline = {
      quantity: each.quantity,
      productID: each.line.productID,
      sku: each.line.sku,
      label: each.line.label,
      weight: each.line.weight,
      structureID: each.line.structureID,
      returningAt,
    };

    return returnline;
  });

  return returning;
};
