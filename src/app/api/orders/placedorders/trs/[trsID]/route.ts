import { NextRequest } from "next/server";
import { PlacedOrders } from "@/services/PlacedOrders";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ trsID: string; }> }
) => {
  const { trsID } = await params;
  const data = await PlacedOrders.findByTransactionID({ transactionID: Number(trsID) });

  return Response.json(data);
};
