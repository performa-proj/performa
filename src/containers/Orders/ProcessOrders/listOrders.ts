import { IProcessOrder } from "@/services/Orders/ProcessOrders/IProcessOrder";

export const listOrders = async (): Promise<IProcessOrder[]> => {
  const response = await fetch("/api/orders/process");
  const list: IProcessOrder[] = await response.json();

  return list.map((order) => {
    order.createdAt = new Date(order.createdAt);
    order.updatedAt = new Date(order.updatedAt);

    return order;
  });
};
