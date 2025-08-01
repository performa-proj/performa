import { IOrder } from "@/services/Orders/IOrder";

export const findOrderByTransactionID = async ({
  transactionID,
}: {
  transactionID: string;
}): Promise<IOrder> => {
  const response = await fetch(`/api/orders/ro/trs/${transactionID}`);
  const json: IOrder = await response.json();
  json.createdAt = new Date(json.createdAt);
  json.updatedAt = new Date(json.updatedAt);

  return json;
};
