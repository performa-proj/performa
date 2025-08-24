import { IProcessOrder } from "./IProcessOrder";
import { IResolvableProcessOrder } from "./IResolvableProcessOrder";

const resolveOrdering = (order: IProcessOrder) => {
  const lines = Object.values(order.ordering.data).map((each) => {
    const sku = each.line.sku;
    const count = order.fulfilling?.data[sku].count || each.quantity;
    const maxIndex = each.line.priceLevels.length - 1;
    const levelIndex = order.level > maxIndex ? maxIndex : order.level;
    const retailPrice = each.line.priceLevels[maxIndex];
    const levelPrice = each.line.priceLevels[levelIndex];
    const sellingAt = each.sellingAt === undefined ? levelPrice : each.sellingAt;

    return {
      quantity: each.quantity,
      count,
      sku,
      productID: each.line.productID,
      label: each.line.label,
      weight: each.line.weight,
      structureID: each.line.structureID,
      retailPrice,
      sellingAt,
    };
  });

  const { weight, total } = lines.reduce((result, each) => {
    result.weight += each.count * each.weight;
    result.total += each.count * each.sellingAt;

    return result;
  }, { weight: 0, total: 0 });

  return {
    lines,
    weight,
    total,
  };
};

export const resolveProcessOrder = (order: IProcessOrder): IResolvableProcessOrder => {
  const resolvable: IResolvableProcessOrder = {
    _id: order._id,
    transactionID: order.transactionID,
    level: order.level,
    customer: order.customer,
    ordering: resolveOrdering(order),
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };

  return resolvable;
};
