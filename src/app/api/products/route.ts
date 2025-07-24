import { NextRequest } from "next/server";
import { Products } from "@/services/Products";

export const GET = async () => {
  const data = await Products.list();

  return Response.json(data);
};

export const POST = async (request: NextRequest) => {
  const json = await request.json();
  const data = await Products.createNew(json);

  return Response.json(data);
};

export const PUT = async (request: NextRequest) => {
  const json = await request.json();
  const data = await Products.updateByID(json);

  return Response.json(data);
};

export const DELETE = async (request: NextRequest) => {
  const json = await request.json();
  const data = await Products.deleteByID(json);

  return Response.json(data);
};
