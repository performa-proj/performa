import { COLLECTION_NAME, Data } from "@/db";
import { IProcessOrder } from "./IProcessOrder";

export const list = async (): Promise<IProcessOrder[]> => {
  const db = await Data.connectDB();

  const result = await db.collection<IProcessOrder>(COLLECTION_NAME.ProcessOrders).find().toArray();

  return result.map((each) => ({
    ...each,
    _id: each._id.toString(),
  }));
};
