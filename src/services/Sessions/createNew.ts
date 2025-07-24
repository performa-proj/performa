import { COLLECTION_NAME, Data } from "@/db";
import { resolveID } from "./resolveID";
import { ISession } from "./ISession";

export const createNew = async (): Promise<ISession> => {
  const db = await Data.connectDB();
  const now = new Date();

  const data = {
    _id: resolveID(now),
    transactionCounts: 0,
    createdAt: now,
    updatedAt: now,
  };

  await db.collection<ISession>(COLLECTION_NAME.Sessions).insertOne(data);

  return {
    ...data,
  };
};
