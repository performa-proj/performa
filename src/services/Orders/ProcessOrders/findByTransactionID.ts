import { COLLECTION_NAME, Data } from "@/db";
import { IProcessOrder } from "./IProcessOrder";

export const findByTransactionID = async ({
  transactionID,
}: {
  transactionID: number;
}): Promise<IProcessOrder | null> => {
  const db = await Data.connectDB();

  const filter = {
    transactionID,
  };

  const result = await db.collection(COLLECTION_NAME.ProcessOrders).findOne<IProcessOrder>(filter);

  if (result) {
    return result;
  } else {
    return null;
  }
};
