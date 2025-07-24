import { COLLECTION_NAME, Data } from "@/db";
import { ObjectId } from "mongodb";
import { IProduct } from "./IProduct";

export const findByID = async ({
  _id,
}: {
  _id: string;
}): Promise<IProduct | null> => {
  const db = await Data.connectDB();

  const filter = {
    _id: new ObjectId(_id),
  };

  const result = await db.collection(COLLECTION_NAME.Products).findOne<IProduct>(filter);

  if (result) {
    return {
      ...result,
      _id,
    };
  } else {
    return null;
  }
};
