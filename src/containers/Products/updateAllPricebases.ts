import { IProduct } from "@/services/Products/IProduct";
import { findProductByID } from "./findProductByID";

export const updateAllPricebases = async (payloads: {
  productID: string;
  items: {
    sku: string;
    pricebase: number;
  }[];
}): Promise<IProduct> => {
  const { productID, items } = payloads;
  const itemsMap = items.reduce((result, each) => {
    result[each.sku] = each.pricebase;

    return result;
  }, {} as { [sku: string]: number; });

  const product = await findProductByID(productID);
  product.items = product.items.map((each) => {
    each.pricebase = itemsMap[each.sku];

    return each;
  });

  const response = await fetch(`/api/products/${productID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  const json: IProduct = await response.json();

  json.createdAt = new Date(json.createdAt);
  json.updatedAt = new Date(json.updatedAt);

  return json;
};
