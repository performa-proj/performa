import { NextRequest } from "next/server";
import { Products } from "@/services/Products";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ _id: string; }> }
) => {
  const { _id } = await params;
  const data = await Products.findByID({ _id });

  return Response.json(data);
};

export const PUT = async (request: NextRequest) => {
  const product = await request.json();
  const result = await Products.replace({ product })

  return Response.json(result);
};
