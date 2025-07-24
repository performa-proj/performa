import { COLLECTION_NAME, Data } from "@/db";
import { IProduct } from "./IProduct";

export const createNew = async (payloads: {
  ref: string;
  title: string;
}): Promise<IProduct> => {
  const {
    ref,
    title,
  } = payloads;

  const db = await Data.connectDB();
  const now = new Date();
  const data = {
    ref,
    title,
    items: [],
    createdAt: now,
    updatedAt: now,
  };

  const result = await db.collection(COLLECTION_NAME.Products).insertOne(data);

  return {
    _id: result.insertedId.toString(),
    ...data,
  };
};
