import { Products } from "@/services/Products";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ sku: string; }> }
) => {
  const { sku } = await params;
  const data = await Products.Items.findBySKU(sku);

  return Response.json(data);
};

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ sku: string; }> }
) => {
  const { sku } = await params;
  const json = await request.json();
  const data = await Products.Items.updateBySKU({
    ...json,
    sku,
  });

  return Response.json(data);
};

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ sku: string; }> }
) => {
  const { sku } = await params;
  const json = await request.json();
  const data = await Products.Items.deleteBySKU({
    ...json,
    sku,
  });

  return Response.json(data);
};
