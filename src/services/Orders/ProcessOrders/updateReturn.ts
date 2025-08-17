import { ObjectId } from "mongodb";
import { COLLECTION_NAME, Data } from "@/db";
import { IProductItemLine } from "@/services/Products/Items/IProductItemLine";

export const updateReturn = async ({
  _id,
  data,
  total,
}: {
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
}> => {
  const db = await Data.connectDB();
  const now = new Date();

  const filter = {
    _id: new ObjectId(_id),
  };

  const opt = {
    $set: {
      "returning.data": data,
      "returning.total": total,
      updatedAt: now,
    },
  };

  await db.collection(COLLECTION_NAME.ProcessOrders).updateOne(filter, opt);

  return {
    _id,
    returning: {
      data,
      total,
    },
  };
};
