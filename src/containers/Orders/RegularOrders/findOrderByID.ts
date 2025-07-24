import { IOrder } from "@/services/Orders/IOrder";

export const findOrderByID = async ({
  _id,
}: {
  _id: string;
}): Promise<IOrder> => {
  const response = await fetch(`/api/orders/ro/id/${_id}`);
  const json: IOrder = await response.json();
  json.createdAt = new Date(json.createdAt);
  json.updatedAt = new Date(json.updatedAt);

  return json;
};
