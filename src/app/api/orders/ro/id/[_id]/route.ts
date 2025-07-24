import { NextRequest } from "next/server";
import { Orders } from "@/services/Orders";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ _id: string; }> }
) => {
  const { _id } = await params;
  const data = await Orders.findByID({ _id });

  return Response.json(data);
};
