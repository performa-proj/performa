import { IPriceStructure } from "@/services/PriceStructures/IPriceStructure";

export const listPriceStructures = async () => {
  const response = await fetch("/api/pricestructures");
  const data: IPriceStructure[] = await response.json();

  return data.map((each) => {
    each.createdAt = new Date(each.createdAt);
    each.updatedAt = new Date(each.updatedAt);

    return each;
  });
};
