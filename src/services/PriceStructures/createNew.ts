import { COLLECTION_NAME, Data } from "@/db";
import { IPriceStructure } from "./IPriceStructure";

export const createNew = async ({
  title,
  cost,
  levels,
}: {
  title: string;
  cost: number;
  levels: number[];
}): Promise<IPriceStructure> => {
  const db = await Data.connectDB();
  const now = new Date();

  const data = {
    title,
    cost,
    levels,
    createdAt: now,
    updatedAt: now,
  };

  const result = await db.collection(COLLECTION_NAME.PriceStructures).insertOne(data);

  return {
    _id: result.insertedId.toHexString(),
    ...data,
  };
};
