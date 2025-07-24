import { COLLECTION_NAME, Data } from "@/db";
import { ObjectId } from "mongodb";

export const updateByID = async ({
  _id,
  title,
}: {
  _id: string;
  title: string;
}) => {
  const db = await Data.connectDB();
  const now = new Date();

  const filter = {
    _id: new ObjectId(_id),
  };

  await db.collection(COLLECTION_NAME.Products).updateOne(filter, {
    $set: {
      title,
      updatedAt: now,
    },
  });

  return {
    _id,
    title,
    updatedAt: now,
  };
};
