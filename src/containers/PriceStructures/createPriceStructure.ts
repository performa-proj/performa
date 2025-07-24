import { IPriceStructure } from "@/services/PriceStructures/IPriceStructure";

export const createPriceStructure = async (payloads: {
  title: string;
  levels: number[];
}): Promise<IPriceStructure> => {
  const response = await fetch("/api/pricestructures", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payloads),
  });
  const json: IPriceStructure = await response.json();

  json.createdAt = new Date(json.createdAt);
  json.updatedAt = new Date(json.updatedAt);

  return json;
};
