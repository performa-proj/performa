import { IProductItemLine } from "@/services/Products/Items/IProductItemLine";

export interface IResolvableProcessOrder {
  _id: string;
  transactionID: number;
  level: number;
  customer: {
    id: string;
    name: string;
    mobile: string;
  } | undefined;
  ordering: {
    lines: {
      quantity: number;
      count: number;
      sku: string;
      productID: string;
      label: string;
      weight: number;
      structureID: string;
      retailPrice: number;
      sellingAt: number;
    }[];
    weight: number;
    total: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
