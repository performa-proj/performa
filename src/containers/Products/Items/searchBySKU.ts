import { IProductItemLine } from "@/services/Products/Items/IProductItemLine";

export const searchBySKU = async (payloads: {
  sku: string;
}): Promise<IProductItemLine> => {
  const { sku } = payloads;

  const response = await fetch(`/api/products/items/${sku}`);
  const data: IProductItemLine = await response.json();

  return data;
};
