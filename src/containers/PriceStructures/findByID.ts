import { IPriceStructure } from "@/services/PriceStructures/IPriceStructure";

export const findByID = async ({ _id }: {
  _id: string;
}): Promise<IPriceStructure> => {
  const response = await fetch(`/api/pricestructures/${_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json: IPriceStructure = await response.json();

  json.createdAt = new Date(json.createdAt);
  json.updatedAt = new Date(json.updatedAt);

  return json;
};
