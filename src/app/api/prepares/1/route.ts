import { PriceStructures } from "@/services/PriceStructures";
import { Structures } from "../Structures";

export const GET = async () => {
  await PriceStructures.createNew({
    title: Structures.Rices[0].title,
    cost: Structures.Rices[0].cost,
    levels: Structures.Rices[0].levels,
  });

  await PriceStructures.createNew({
    title: Structures.Rices[1].title,
    cost: Structures.Rices[1].cost,
    levels: Structures.Rices[1].levels,
  });

  await PriceStructures.createNew({
    title: Structures.Rices[2].title,
    cost: Structures.Rices[2].cost,
    levels: Structures.Rices[2].levels,
  });

  await PriceStructures.createNew({
    title: Structures.Rices[3].title,
    cost: Structures.Rices[3].cost,
    levels: Structures.Rices[3].levels,
  });

  await PriceStructures.createNew({
    title: Structures.Rices[4].title,
    cost: Structures.Rices[4].cost,
    levels: Structures.Rices[4].levels,
  });

  return Response.json({
    success: true,
    message: "Prepare Data [1/3]: Price Structures",
  });
};
