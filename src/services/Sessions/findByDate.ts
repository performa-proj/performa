import { COLLECTION_NAME, Data } from "@/db";
import { ISession } from "./ISession";
import { resolveID } from "./resolveID";

export const findByDate = async ({
  date,
}: {
  date: Date;
}): Promise<ISession | null> => {
  const db = await Data.connectDB();

  const filter = {
    _id: resolveID(date),
  };

  const result = await db.collection<ISession>(COLLECTION_NAME.Sessions).findOne(filter);
  
  return result;
};
