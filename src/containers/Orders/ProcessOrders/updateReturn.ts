import { IProductItemLine } from "@/services/Products/Items/IProductItemLine";

export const updateReturn = async (payloads: {
  _id: string;
  data: {
    [sku: string]: {
      quantity: number;
      line: IProductItemLine;
    };
  };
  total: number;
}): Promise<{
  _id: string;
  returning: {
    data: {
      [sku: string]: {
        quantity: number;
        line: IProductItemLine;
      };
    };
    total: number;
  };
  payment: {
    payable: number;
  };
}> => {
  const response = await fetch("/api/orders/process/return", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payloads),
  });

  const result = await response.json();

  return result;
};
