import { PriceStructures } from "@/services/PriceStructures";
import { IPriceStructure } from "@/services/PriceStructures/IPriceStructure";
import { Products } from "@/services/Products";
import { Structures as S } from "../Structures";
import { Products as P } from "../Products";

const buildProducts = async (structure: IPriceStructure[]) => {
  const SWID = S.Rices.reduce((result, each) => {
    result[each.title] = each.weight;

    return result;
  }, {} as { [key: string]: number; });

  for (let i = 0; i < P.Rices.length; i++) {
    const { ref, title } = P.Rices[i];

    const items = structure.map((each) => {
      const weight = SWID[each.title];

      return {
        sku: `${ref}${weight.toString().padStart(2, "0")}`,
        label: `${title} ${weight} กก.`,
        weight,
        pricebase: 0,
        structureID: each._id,
      };
    });

    const payloads = {
      ref,
      title,
      items,
    };

    await Products.createNew(payloads);
  }
};

export const GET = async () => {
  const structures = await PriceStructures.list();

  const result = await buildProducts(structures);

  return Response.json({
    success: true,
    message: "Prepare Data [2/3]: Price Structures",
    data: result,
  });
};
