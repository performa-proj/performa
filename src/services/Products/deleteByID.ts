import { COLLECTION_NAME, Data } from "@/db";
import { ObjectId } from "mongodb";

export const deleteByID = async ({
  _id,
}: {
  _id: string;
}) => {
  const db = await Data.connectDB();

  const filter = {
    _id: new ObjectId(_id),
  };

  await db.collection(COLLECTION_NAME.Products).deleteOne(filter);

  return {
    _id,
  };
};
