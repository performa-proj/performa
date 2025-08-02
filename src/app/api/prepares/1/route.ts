import { PriceStructures } from "@/services/PriceStructures";
import { Structures } from "../Structures";

export const GET = async () => {
  await PriceStructures.createNew({
    title: Structures.Rices[0].title,
    cost: Structures.Rices[0].cost,
    levels: Array(6).fill(0),
  });

  await PriceStructures.createNew({
    title: Structures.Rices[1].title,
    cost: Structures.Rices[1].cost,
    levels: Array(6).fill(0),
  });

  await PriceStructures.createNew({
    title: Structures.Rices[2].title,
    cost: Structures.Rices[2].cost,
    levels: Array(6).fill(0),
  });

  await PriceStructures.createNew({
    title: Structures.Rices[3].title,
    cost: Structures.Rices[3].cost,
    levels: Array(6).fill(0),
  });

  await PriceStructures.createNew({
    title: Structures.Rices[4].title,
    cost: Structures.Rices[4].cost,
    levels: Array(6).fill(0),
  });

  return Response.json({
    success: true,
    message: "Prepare Data [1/3]: Price Structures",
  });
};
