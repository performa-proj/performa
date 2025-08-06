import { NextRequest } from "next/server";
import { Preorders } from "@/services/Preorders";

export const POST = async (request: NextRequest) => {
  const json = await request.json();
  const data = await Preorders.createNew(json);

  return Response.json(data);
};
