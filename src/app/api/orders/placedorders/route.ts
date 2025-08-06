import { NextRequest } from "next/server";
import { PlacedOrders } from "@/services/PlacedOrders";

export const POST = async (request: NextRequest) => {
  const json = await request.json();
  const data = await PlacedOrders.createNew(json);

  return Response.json(data);
};
