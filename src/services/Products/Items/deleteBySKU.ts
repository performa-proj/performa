import { COLLECTION_NAME, Data } from "@/db";
import { ObjectId } from "mongodb";

export const deleteBySKU = async ({
  productID,
  sku,
}: {
  productID: string;
  sku: string;
}) => {
  const db = await Data.connectDB();
  const now = new Date();

  const filter = {
    _id: new ObjectId(productID),
  };

  const opt = {
    $pull: {
      items: { sku },
    },
    $set: {
      updatedAt: now,
    },
  };

  await db.collection<{ _id: ObjectId; }>(COLLECTION_NAME.Products).updateOne(filter, opt);

  return {
    sku,
    updatedAt: now,
  };
};
