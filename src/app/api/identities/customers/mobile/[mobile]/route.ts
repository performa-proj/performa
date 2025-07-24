import { NextRequest } from "next/server";
import { Identities } from "@/services/Identities";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ mobile: string; }> }
) => {
  const { mobile } = await params;
  const data = await Identities.Customers.findByMobile(mobile);

  return Response.json(data);
};
