export const updateFulfill = async (payloads: {
  _id: string;
  data: {
    completed: boolean;
    vehicle?: {
      plate?: string;
      weight: {
        initial: number;
        loaded: number;
      };
    };
    orderlines: {
      [sku: string]: {
        count: number;
      };
    };
  };
}): Promise<{
  _id: string;
  fulfillment: {
    completed: boolean;
    vehicle?: {
      plate?: string;
      weight: {
        initial: number;
        loaded: number;
      };
    };
    orderlines: {
      [sku: string]: {
        count: number;
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
