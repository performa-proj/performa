import { ObjectId } from "mongodb";
import { COLLECTION_NAME, Data } from "@/db";

export const updateFulfilling = async ({
  _id,
  fulfilling,
}: {
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
  fulfilling: {
    data: {
      [sku: string]: {
        count: number;
        completed: boolean;
      };
    };
  };
  updatedAt: Date;
}> => {
  const db = await Data.connectDB();
  const now = new Date();

  const filter = {
    _id: new ObjectId(_id),
  };

  const opt = {
    $set: {
      fulfilling,
      updatedAt: now,
    },
  };

  await db.collection(COLLECTION_NAME.ProcessOrders).updateOne(filter, opt);

  return {
    _id,
    fulfilling,
    updatedAt: now,
  };
};
