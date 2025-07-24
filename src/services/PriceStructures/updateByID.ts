import { COLLECTION_NAME, Data } from "@/db";
import { ObjectId } from "mongodb";

export const updateByID = async ({
  _id,
  title,
  levels,
}: {
  _id: string;
  title: string;
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
      levels,
      updatedAt: now,
    },
  };

  await db.collection(COLLECTION_NAME.PriceStructures).updateOne(filter, opt);

  return {
    _id,
    title,
    levels,
    updatedAt: now,
  };
};
