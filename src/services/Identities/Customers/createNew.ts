import { COLLECTION_NAME, Data } from "@/db";
import { ICustomer } from "./ICustomer";
import { initialCAC } from "./core/initialCAC";

export const createNew = async ({
  name,
  mobile,
}: {
  name: string;
  mobile: string;
}): Promise<ICustomer> => {
  const db = await Data.connectDB();
  const now = new Date();

  const data = {
    profile: {
      mobile,
      name,
    },
    cac: initialCAC(),
    createdAt: now,
    updatedAt: now,
  };
  const result = await db.collection(COLLECTION_NAME.Identities).insertOne(data);

  return {
    _id: result.insertedId.toString(),
    ...data,
  };
};
