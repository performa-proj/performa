import { IOrder } from "@/services/Orders/IOrder";
import { IOrderline } from "@/services/Orders/IOrderline";

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
  orderlines: IOrderline[];
  process: string;
  pod: boolean;
  weight: number;
  total: number;
}): Promise<IOrder> => {
  const response = await fetch("/api/orders/ro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payloads),
  });
  const json: IOrder = await response.json();
  json.createdAt = new Date(json.createdAt);
  json.updatedAt = new Date(json.updatedAt);

  return json;
};
