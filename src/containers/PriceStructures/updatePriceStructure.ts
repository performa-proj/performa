export const updatePriceStructure = async (payloads: {
  _id: string;
  title: string;
  levels: number[];
}): Promise<{
  _id: string;
  title: string;
  levels: number[];
  updatedAt: Date;
}> => {
  const response = await fetch(`/api/pricestructures`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payloads),
  });
  const json: {
    _id: string;
    title: string;
    levels: number[];
    updatedAt: string;
  } = await response.json();

  return {
    _id: json._id,
    title: json.title,
    levels: json.levels,
    updatedAt: new Date(json.updatedAt),
  };
};
