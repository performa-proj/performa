import { COLLECTION_NAME, Data } from "@/db";

export const updateBySKU = async ({
  sku,
  label,
  weight,
  pricebase,
  structureID,
}: {
  sku: string;
  label: string;
  weight: number;
  pricebase: number;
  structureID: string;
}) => {
  const db = await Data.connectDB();
  const now = new Date();

  const filter = {
    "items.sku": sku,
  };

  const item = {
    sku,
    label,
    weight,
    pricebase,
    structureID,
  };

  const opt = {
    $set: {
      "items.$": item,
      updatedAt: now,
    },
  };

  await db.collection(COLLECTION_NAME.Products).updateOne(filter, opt);

  return {
    item,
    updatedAt: now,
  };
};
