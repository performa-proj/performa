export const updateProduct = async (payloads: {
  _id: string;
  title: string;
}): Promise<{
  _id: string;
  title: string;
  updatedAt: Date;
}> => {
  const response = await fetch(`/api/products`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payloads),
  });
  const json: {
    _id: string;
    title: string;
    updatedAt: string;
  } = await response.json();

  return {
    _id: json._id,
    title: json.title,
    updatedAt: new Date(json.updatedAt),
  };
};
