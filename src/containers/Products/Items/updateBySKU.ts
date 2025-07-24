import { IProductItem } from "@/services/Products/Items/IProductItem";

export const updateBySKU = async (payloads: IProductItem): Promise<{
  item: IProductItem;
  updatedAt: Date;
}> => {
  const { sku } = payloads;
  const response = await fetch(`/api/products/items/${sku}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payloads),
  });
  const json: {
    item: IProductItem;
    updatedAt: Date;
  } = await response.json();

  json.updatedAt = new Date(json.updatedAt);

  return json;
};
