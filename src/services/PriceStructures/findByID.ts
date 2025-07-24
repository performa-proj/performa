import { ObjectId } from "mongodb";
import { COLLECTION_NAME, Data } from "@/db";
import { IPriceStructure } from "./IPriceStructure";

export const findByID = async ({
  _id,
}: {
  _id: string;
}): Promise<IPriceStructure | null> => {
  const db = await Data.connectDB();

  const filter = {
    _id: new ObjectId(_id),
  };

  const result = await db.collection(COLLECTION_NAME.PriceStructures).findOne<IPriceStructure>(filter);

  if (result) {
    return {
      ...result,
      _id,
    };
  } else {
    return null;
  }
};
