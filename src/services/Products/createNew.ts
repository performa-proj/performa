import { COLLECTION_NAME, Data } from "@/db";
import { IProduct } from "./IProduct";
import { IProductItem } from "./Items/IProductItem";

export const createNew = async (payloads: {
  ref: string;
  title: string;
  items?: IProductItem[];
}): Promise<IProduct> => {
  const {
    ref,
    title,
    items = [],
  } = payloads;

  const db = await Data.connectDB();
  const now = new Date();
  const data = {
    ref,
    title,
    items,
    createdAt: now,
    updatedAt: now,
  };

  const result = await db.collection(COLLECTION_NAME.Products).insertOne(data);

  return {
    _id: result.insertedId.toHexString(),
    ...data,
  };
};
