import { NextRequest } from "next/server";
import { Orders } from "@/services/Orders";

export const POST = async (request: NextRequest) => {
  const json = await request.json();
  const data = await Orders.createNew(json);

  return Response.json(data);
};
