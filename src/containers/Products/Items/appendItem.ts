import { IProductItem } from "@/services/Products/Items/IProductItem";

export const appendItem = async (payloads: {
  productID: string;
  item: IProductItem;
}): Promise<{
  productID: string;
  item: IProductItem;
  updatedAt: Date;
}> => {
  const response = await fetch("/api/products/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payloads),
  });
  const json: {
    productID: string;
    item: IProductItem;
    updatedAt: Date;
  } = await response.json();
  json.updatedAt = new Date(json.updatedAt);

  return json;
};
