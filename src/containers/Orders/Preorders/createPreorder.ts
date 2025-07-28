import { IProductItemLine } from "@/services/Products/Items/IProductItemLine";
import { IPreorder } from "@/services/Preorders/IPreorder";

export const createPreorder = async (payloads: {
  customer: {
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
}): Promise<IPreorder> => {
  const response = await fetch("/api/orders/po", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payloads),
  });
  const json: IPreorder = await response.json();
  json.createdAt = new Date(json.createdAt);
  json.updatedAt = new Date(json.updatedAt);

  return json;
};
