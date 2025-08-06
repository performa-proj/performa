import { COLLECTION_NAME, Data } from "@/db";
import { IPlacedOrder } from "./IPlacedOrder";

export const findByTransactionID = async ({
  transactionID,
}: {
  transactionID: number;
}): Promise<IPlacedOrder | null> => {
  const db = await Data.connectDB();

  const filter = {
    transactionID,
  };

  const result = await db.collection(COLLECTION_NAME.PlacedOrders).findOne<IPlacedOrder>(filter);

  if (result) {
    return result;
  } else {
    return null;
  }
};
