export const deleteBySKU = async (payloads: {
  productID: string;
  sku: string;
}): Promise<{
  sku: string;
  updatedAt: Date;
}> => {
  const { productID, sku } = payloads;
  const response = await fetch(`/api/products/items/${sku}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productID }),
  });
  const json: {
    sku: string;
    updatedAt: Date;
  } = await response.json();

  json.updatedAt = new Date(json.updatedAt);

  return json;
};
