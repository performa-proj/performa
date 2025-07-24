import { NextRequest } from "next/server";
import { PriceStructures } from "@/services/PriceStructures";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ _id: string; }> }
) => {
  const { _id } = await params;
  const data = await PriceStructures.findByID({ _id });

  return Response.json(data);
};
