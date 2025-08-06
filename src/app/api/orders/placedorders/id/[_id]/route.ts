import { NextRequest } from "next/server";
import { PlacedOrders } from "@/services/PlacedOrders";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ _id: string; }> }
) => {
  const { _id } = await params;
  const data = await PlacedOrders.findByID({ _id });

  return Response.json(data);
};
