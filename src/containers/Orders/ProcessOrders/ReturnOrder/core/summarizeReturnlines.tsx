import { IReturnline } from "@/services/Orders/IReturnline";

export const summarizeReturnlines = (returnlines: IReturnline[]) => {
  const { weight, discount, retail, total } = returnlines.reduce((result, each) => {
    result.weight += each.quantity * each.weight;

    return result;
  }, { weight: 0, discount: 0, retail: 0, total: 0 });

  return {
    weight,
    discount,
    retail,
    total,
  };
};
