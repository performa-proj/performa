import { ObjectId } from "mongodb";
import { COLLECTION_NAME, Data } from "@/db";
import { IPlacedOrder } from "./IPlacedOrder";

export const findByID = async ({
  _id,
}: {
  _id: string;
}): Promise<IPlacedOrder | null> => {
  const db = await Data.connectDB();

  const filter = {
    _id: new ObjectId(_id),
  };

  const result = await db.collection(COLLECTION_NAME.PlacedOrders).findOne<IPlacedOrder>(filter);

  if (result) {
    return {
      ...result,
      _id,
    };
  } else {
    return null;
  }
};
