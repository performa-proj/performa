import { COLLECTION_NAME, Data } from "@/db";
import { IPriceStructure } from "./IPriceStructure";

export const createNew = async ({
  title,
  levels,
}: {
  title: string;
  levels: number[];
}): Promise<IPriceStructure> => {
  const db = await Data.connectDB();
  const now = new Date();

  const data = {
    title,
    levels,
    createdAt: now,
    updatedAt: now,
  };

  const result = await db.collection(COLLECTION_NAME.PriceStructures).insertOne(data);

  return {
    _id: result.insertedId.toString(),
    ...data,
  };
};
