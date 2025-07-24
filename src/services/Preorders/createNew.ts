import { COLLECTION_NAME, Data } from "@/db";
import { IProductItemLine } from "../Products/Items/IProductItemLine";
import { IPreorder } from "./IPreorder";

export const createNew = async (props: {
  customer: {
    id: string;
    name: string;
    mobile: string;
    points: number;
    creditDays: number;
    creditLimit: number;
    creditSpent: number;
  };
  level: number;
  lines: {
    [sku: string]: {
      quantity: number;
      line: IProductItemLine;
      sellingAt: number | undefined;
    };
  };
}): Promise<IPreorder> => {
  const db = await Data.connectDB();
  const now = new Date();

  const data = {
    ...props,
    createdAt: now,
    updatedAt: now,
  };

  const result = await db.collection(COLLECTION_NAME.Preorders).insertOne(data);

  return {
    _id: result.insertedId.toString(),
    ...data,
  };
};
