import { NextRequest } from "next/server";
import { ProcessOrders } from "@/services/Orders/ProcessOrders";

export const PUT = async (request: NextRequest) => {
  const json = await request.json();
  const data = await ProcessOrders.updateFulfilling(json);

  return Response.json(data);
};
