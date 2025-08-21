import { IProcessOrder } from "@/services/Orders/ProcessOrders/IProcessOrder";
import { IOrderline } from "@/services/Orders/IOrderline";
import { IProductItemLine } from "@/services/Products/Items/IProductItemLine";

export const createOrder = async (payloads: {
  level: number;
  customer: {
    id: string;
    name: string;
    mobile: string;
    creditDays: number;
    creditLimit: number;
    creditSpent: number;
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
  payment: {
    payable: number;
    pod: boolean;
  };
}): Promise<IProcessOrder> => {
  const response = await fetch("/api/orders/process", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payloads),
  });

  const json: IProcessOrder = await response.json();
  json.createdAt = new Date(json.createdAt);
  json.updatedAt = new Date(json.updatedAt);

  return json;
};
