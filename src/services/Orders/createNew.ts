import { COLLECTION_NAME, Data } from "@/db";
import { IOrder } from "./IOrder";
import { IOrderline } from "./IOrderline";
import { Sessions } from "../Sessions";

export const createNew = async (props: {
  level: number;
  customer: {
    id: string;
    name: string;
    mobile: string;
  } | undefined;
  orderlines: IOrderline[];
  weight: number;
  total: number;
}): Promise<IOrder> => {
  const db = await Data.connectDB();
  const now = new Date();
  const {
    sessionID,
    transactionID,
  } = await Sessions.resolveTransactionID(now);

  
  const data = {
    ...props,
    transactionID,
    createdAt: now,
    updatedAt: now,
  };
  
  const result = await db.collection(COLLECTION_NAME.Orders).insertOne(data);
  await Sessions.commitTransaction(sessionID);

  return {
    _id: result.insertedId.toString(),
    ...data,
  };
};
