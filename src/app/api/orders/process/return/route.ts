import { NextRequest } from "next/server";
import { ProcessOrders } from "@/services/Orders/ProcessOrders";
import { IProductItemLine } from "@/services/Products/Items/IProductItemLine";

export const PUT = async (request: NextRequest) => {
  const json: {
    _id: string;
    data: {
      [sku: string]: {
        quantity: number;
        line: IProductItemLine;
      };
    };
    total: number;
  } = await request.json();

  const data = await ProcessOrders.updateReturn(json);

  return Response.json(data);
};
