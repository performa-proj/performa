import { NextRequest } from "next/server";
import { Products } from "@/services/Products";

export const POST = async (request: NextRequest) => {
  const json = await request.json();
  const data = await Products.Items.appendItem(json);

  return Response.json(data);
};
