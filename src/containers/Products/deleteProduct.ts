export const deleteProduct = async (payloads: {
  _id: string;
}): Promise<{ _id: string; }> => {
  const response = await fetch("/api/products", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payloads),
  });

  const json = await response.json();

  return json;
};
