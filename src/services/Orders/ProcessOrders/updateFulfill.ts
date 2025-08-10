import { ObjectId } from "mongodb";
import { COLLECTION_NAME, Data } from "@/db";

export const updateFulfill = async ({
  _id,
  data,
}: {
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
  const db = await Data.connectDB();
  const now = new Date();

  const filter = {
    _id: new ObjectId(_id),
  };

  const opt = {
    $set: {
      fulfillment: data,
      updatedAt: now,
    },
  };

  await db.collection(COLLECTION_NAME.ProcessOrders).updateOne(filter, opt);

  return {
    _id,
    fulfillment: data,
  };
};
