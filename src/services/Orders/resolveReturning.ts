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
}): {
  lines: IReturnline[];
  weight: number;
  total: number;
} => Object.values(data.lines).reduce((result, each) => {
  const maxIndex = each.line.priceLevels.length - 1;
  const index = data.level > maxIndex ? maxIndex : data.level;
  const returningAt = each.line.priceLevels[index];

  const line: IReturnline = {
    quantity: each.quantity,
    productID: each.line.productID,
    sku: each.line.sku,
    label: each.line.label,
    weight: each.line.weight,
    structureID: each.line.structureID,
    returningAt,
  };

  result.lines.push(line);
  result.weight += line.quantity * line.weight;
  result.total += line.quantity * line.returningAt;

  return result;
}, {
  lines: [],
  weight: 0,
  total: 0,
} as {
  lines: IReturnline[];
  weight: number;
  total: number;
});
