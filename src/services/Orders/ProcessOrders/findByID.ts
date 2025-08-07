import { ObjectId } from "mongodb";
import { COLLECTION_NAME, Data } from "@/db";
import { IProcessOrder } from "./IProcessOrder";

export const findByID = async ({
  _id,
}: {
  _id: string;
}): Promise<IProcessOrder | null> => {
  const db = await Data.connectDB();

  const filter = {
    _id: new ObjectId(_id),
  };

  const result = await db.collection(COLLECTION_NAME.ProcessOrders).findOne<IProcessOrder>(filter);

  if (result) {
    return {
      ...result,
      _id,
    };
  } else {
    return null;
  }
};
