/*import { COLLECTION_NAME, Data } from "@/db";
import { IIdentity } from "./IIdentity";

export const initUser = async ({
  name,
  mobile,
  password,
}: {
  name: string;
  mobile: string;
  password: string;
}): Promise<IIdentity> => {
  const db = await Data.connectDB();
  const now = new Date();
  const data = {
    name,
    mobile,
    // level: level || 4,
    // creditDays: creditDays || 0,
    // creditLimit: creditLimit || 0,
    // creditSpent: creditSpent || 0,
    createdAt: now,
    updatedAt: now,
  };

  const result = await db.collection(COLLECTION_NAME.Identities).insertOne(data);

  return {
    _id: result.insertedId.toString(),
    ...data,
  };
};
*/
