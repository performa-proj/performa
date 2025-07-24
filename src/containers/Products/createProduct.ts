import { IProduct } from "@/services/Products/IProduct";

export const createProduct = async (payloads: {
  ref: string;
  title: string;
}): Promise<IProduct> => {
  const response = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payloads),
  });
  const json: IProduct = await response.json();
  json.createdAt = new Date(json.createdAt);
  json.updatedAt = new Date(json.updatedAt);

  return json;
};
