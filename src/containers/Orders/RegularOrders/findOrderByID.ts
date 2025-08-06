import { IPlacedOrder } from "@/services/PlacedOrders/IPlacedOrder";

export const findOrderByID = async ({
  _id,
}: {
  _id: string;
}): Promise<IPlacedOrder> => {
  const response = await fetch(`/api/orders/ro/id/${_id}`);
  const json: IPlacedOrder = await response.json();
  json.createdAt = new Date(json.createdAt);
  json.updatedAt = new Date(json.updatedAt);

  return json;
};
