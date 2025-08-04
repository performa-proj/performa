import { COLLECTION_NAME, Data } from "@/db";
import { ObjectId } from "mongodb";
import { IProduct } from "./IProduct";

export const replace = async ({
  product,
}: {
  product: IProduct;
}) => {
  const db = await Data.connectDB();
  const now = new Date();

  product.createdAt = new Date(product.createdAt);
  product.updatedAt = now;

  const { _id, ...payloads } = product;

  await db.collection(COLLECTION_NAME.Products).replaceOne({ _id: new ObjectId(_id) }, payloads);

  return product;
};
