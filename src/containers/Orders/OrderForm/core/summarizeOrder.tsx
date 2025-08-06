import { IOrderline } from "@/services/PlacedOrders/IOrderline";

export const summarizeOrder = (orderlines: IOrderline[]) => {
  const { weight, discount, retail, total } = orderlines.reduce((result, each) => {
    result.weight += each.quantity * each.weight;
    result.discount += each.quantity * (each.retailPrice - each.sellingAt);
    result.retail += each.quantity * each.retailPrice;
    result.total += each.quantity * each.sellingAt;

    return result;
  }, { weight: 0, discount: 0, retail: 0, total: 0 });

  return {
    weight,
    discount,
    retail,
    total,
  };
};
