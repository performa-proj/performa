import { COLLECTION_NAME, Data } from "@/db";
import { ObjectId } from "mongodb";
import { IProductItem } from "./IProductItem";

export const appendItem = async (payloads: {
  productID: string;
  item: IProductItem;
}): Promise<{
  productID: string;
  item: IProductItem;
  updatedAt: Date;
}> => {
  const {
    productID,
    item,
  } = payloads;

  const now = new Date();

  const db = await Data.connectDB();
  const filtered = {
    _id: new ObjectId(productID),
  };

  const updated = {
    "$push": { items: item },
    "$set": { updatedAt: now },
  };

  await db.collection<{ _id: ObjectId; }>(COLLECTION_NAME.Products).updateOne(filtered, updated);

  return {
    productID,
    item,
    updatedAt: now,
  };
};
