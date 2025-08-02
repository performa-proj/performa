import { NextRequest } from "next/server";
import { PriceStructures } from "@/services/PriceStructures";

export const GET = async () => {
  const data = await PriceStructures.list();

  return Response.json(data);
};

export const POST = async (request: NextRequest) => {
  const json = await request.json();
  const data = await PriceStructures.createNew(json);

  return Response.json(data);
};

export const PUT = async (request: NextRequest) => {
  const json: {
    _id: string;
    title: string;
    cost: number;
    levels: number[];
  } = await request.json();
  const data = await PriceStructures.updateByID(json);

  return Response.json(data);
};

export const DELETE = async (request: NextRequest) => {
  const json: { _id: string; } = await request.json();
  const data = await PriceStructures.deleteByID(json);

  return Response.json(data);
};
