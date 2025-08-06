import { IPlacedOrder } from "@/services/PlacedOrders/IPlacedOrder";
import { IOrderline } from "@/services/PlacedOrders/IOrderline";

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
  pod: boolean;
  weight: number;
  total: number;
}): Promise<IPlacedOrder> => {
  const response = await fetch("/api/orders/placedorders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payloads),
  });
  const json: IPlacedOrder = await response.json();
  json.createdAt = new Date(json.createdAt);
  json.updatedAt = new Date(json.updatedAt);

  return json;
};
