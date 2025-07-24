import { COLLECTION_NAME, Data } from "@/db";
import { ISession } from "./ISession";

export const commitTransaction = async (sessionID: number) => {
  const db = await Data.connectDB();
  const now = new Date();

  const filter = {
    _id: sessionID,
  };

  const result = await db.collection<ISession>(COLLECTION_NAME.Sessions).updateOne(filter, {
    $inc: {
      transactionCounts: 1,
    },
    $set: {
      updatedAt: now,
    },
  });

  return {
    success: result.acknowledged,
  };
}
