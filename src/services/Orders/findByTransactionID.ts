import { COLLECTION_NAME, Data } from "@/db";
import { IOrder } from "./IOrder";

export const findByTransactionID = async ({
  transactionID,
}: {
  transactionID: number;
}): Promise<IOrder | null> => {
  const db = await Data.connectDB();

  const filter = {
    transactionID,
  };

  const result = await db.collection(COLLECTION_NAME.Orders).findOne<IOrder>(filter);

  if (result) {
    return result;
  } else {
    return null;
  }
};
