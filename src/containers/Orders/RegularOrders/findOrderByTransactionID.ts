import { IPlacedOrder } from "@/services/PlacedOrders/IPlacedOrder";

export const findOrderByTransactionID = async ({
  transactionID,
}: {
  transactionID: string;
}): Promise<IPlacedOrder> => {
  const response = await fetch(`/api/orders/ro/trs/${transactionID}`);
  const json: IPlacedOrder = await response.json();
  json.createdAt = new Date(json.createdAt);
  json.updatedAt = new Date(json.updatedAt);

  return json;
};
