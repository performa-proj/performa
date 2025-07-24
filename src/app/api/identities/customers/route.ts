import { NextRequest } from "next/server";
import { Identities } from "@/services/Identities";

export const POST = async (request: NextRequest) => {
  const json = await request.json();
  const data = await Identities.Customers.createNew(json);

  return Response.json({
    data,
  });
};
