import { COLLECTION_NAME, Data } from "@/db";
import { PriceStructures } from "@/services/PriceStructures";
import { IProduct } from "../IProduct";
import { IProductItemLine } from "./IProductItemLine";

export const findBySKU = async (sku: string): Promise<IProductItemLine | null> => {
  const db = await Data.connectDB();
  const product = await db.collection(COLLECTION_NAME.Products).findOne<IProduct>({ "items.sku": sku });

  if (product) {
    const index = product.items.findIndex(each => each.sku === sku);
    const item = product.items[index];
    const structureID = item.structureID;
    const structure = await PriceStructures.findByID({ _id: structureID });

    if (structure) {
      const priceLevels = [item.pricebase, ...structure.levels.map((each) => item.pricebase + each)];

      const data: IProductItemLine = {
        productID: product._id,
        sku: item.sku,
        label: item.label,
        weight: item.weight,
        structureID: item.structureID,
        priceLevels,
      };

      return data;
    }
  }

  return null;
};
