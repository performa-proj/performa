import { ObjectId } from "mongodb";
import { COLLECTION_NAME, Data } from "@/db";
import { IOrder } from "./IOrder";

export const findByID = async ({
  _id,
}: {
  _id: string;
}): Promise<IOrder | null> => {
  const db = await Data.connectDB();

  const filter = {
    _id: new ObjectId(_id),
  };

  const result = await db.collection(COLLECTION_NAME.Orders).findOne<IOrder>(filter);

  if (result) {
    return {
      ...result,
      _id,
    };
  } else {
    return null;
  }
};
