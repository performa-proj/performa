export const updateFulfilling = async (payloads: {
  _id: string;
  fulfilling: {
    completed: boolean;
    vehicle?: {
      plate: string;
      weight: {
        initial: number;
        loaded: number;
      };
    };
    data: {
      [sku: string]: {
        count: number;
        completed: boolean;
      };
    };
    weight: number;
  };
}): Promise<{
  _id: string;
  fulfilling: {
    completed: boolean;
    vehicle?: {
      plate: string;
      weight: {
        initial: number;
        loaded: number;
      };
    };
    data: {
      [sku: string]: {
        count: number;
        completed: boolean;
      };
    };
    weight: number;
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
