import { NextRequest } from "next/server";
import { Orders } from "@/services/Orders";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ trsID: string; }> }
) => {
  const { trsID } = await params;
  const data = await Orders.findByTransactionID({ transactionID: Number(trsID) });

  return Response.json(data);
};
