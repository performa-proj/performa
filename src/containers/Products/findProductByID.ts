import { IProduct } from "@/services/Products/IProduct";

export const findProductByID = async (productID: string): Promise<IProduct> => {
  const response = await fetch(`/api/products/${productID}`);
  const json: IProduct = await response.json();

  json.createdAt = new Date(json.createdAt);
  json.updatedAt = new Date(json.updatedAt);

  return json;
};
