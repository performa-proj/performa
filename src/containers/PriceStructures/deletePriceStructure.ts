export const deletePriceStructure = async (payloads: {
  _id: string;
}): Promise<{ _id: string; }> => {
  const response = await fetch("/api/pricestructures", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payloads),
  });

  const json = await response.json();

  return json;
};
