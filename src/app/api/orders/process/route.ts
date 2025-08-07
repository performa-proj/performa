import { NextRequest } from "next/server";
import { ProcessOrders } from "@/services/Orders/ProcessOrders";

export const GET = async () => {
  const data = await ProcessOrders.list();

  return Response.json(data);
};

export const POST = async (request: NextRequest) => {
  const json = await request.json();
  const data = await ProcessOrders.createNew(json);

  return Response.json(data);
};
