import { IProduct } from "@/services/Products/IProduct";

export const listProducts = async (): Promise<IProduct[]> => {
  const response = await fetch("/api/products");
  const json: IProduct[] = await response.json();

  return json.map((each) => {
    each.createdAt = new Date(each.createdAt);
    each.updatedAt = new Date(each.updatedAt);

    return each;
  });
};
