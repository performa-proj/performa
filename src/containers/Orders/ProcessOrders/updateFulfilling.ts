export const updateFulfilling = async (payloads: {
  _id: string;
  fulfilling: {
    data: {
      [sku: string]: {
        count: number;
        completed: boolean;
      };
    };
  };
}): Promise<{
  _id: string;
  fulfillment: {
    data: {
      [sku: string]: {
        count: number;
        completed: boolean;
      };
    };
  };
}> => {
  const response = await fetch("/api/orders/process/fulfill", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payloads),
  });

  const result = await response.json();

  return result;
};
