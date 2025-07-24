import { COLLECTION_NAME, Data } from "@/db";
import { IPriceStructure } from "./IPriceStructure";

export const list = async (): Promise<IPriceStructure[]> => {
  const db = await Data.connectDB();
  const result = await db.collection<IPriceStructure>(COLLECTION_NAME.PriceStructures).find().toArray();

  return result.map((each) => ({
    ...each,
    _id: each._id.toString(),
  }));
};
