import { IOrderData } from "./IOrderData";
import { IOrdering } from "./IOrdering";
import { IOrderline } from "./IOrderline";

export const resolveOrdering = (orderData: IOrderData): IOrdering => ({
  level: orderData.level,
  orderlines: Object.values(orderData.lines).map((each) => {
    const maxIndex = each.line.priceLevels.length - 1;
    const index = orderData.level > maxIndex ? maxIndex : orderData.level;
    const retailPrice = each.line.priceLevels[maxIndex];
    const sellingPrice = each.line.priceLevels[index];
    const sellingAt = each.sellingAt === undefined ? sellingPrice : each.sellingAt < each.line.priceLevels[0] ? each.line.priceLevels[0] : each.sellingAt;

    const orderline: IOrderline = {
      quantity: each.quantity,
      productID: each.line.productID,
      sku: each.line.sku,
      label: each.line.label,
      weight: each.line.weight,
      structureID: each.line.structureID,
      retailPrice,
      sellingAt,
    };

    return orderline;
  }),
});
