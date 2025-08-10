import { ObjectId } from "mongodb";
import { COLLECTION_NAME, Data } from "@/db";

export const updateByID = async ({
  _id,
  title,
  cost,
  levels,
}: {
  _id: string;
  title: string;
  cost: number;
  levels: number[];
}) => {
  const db = await Data.connectDB();
  const now = new Date();

  const filter = {
    _id: new ObjectId(_id),
  };

  const opt = {
    $set: {
      title,
      cost,
      levels,
      updatedAt: now,
    },
  };

  await db.collection(COLLECTION_NAME.PriceStructures).updateOne(filter, opt);

  return {
    _id,
    title,
    cost,
    levels,
    updatedAt: now,
  };
};
