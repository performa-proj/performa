import { COLLECTION_NAME, Data } from "@/db";
import { ICustomer } from "./ICustomer";
import { initialCAC } from "./core/initialCAC";
import { ObjectId } from "mongodb";

export const findByMobile = async (mobile: string): Promise<ICustomer | null> => {
  const db = await Data.connectDB();
  const result = await db.collection(COLLECTION_NAME.Identities).findOne<ICustomer>({ mobile });

  if (result) {
    if (!result.cac) {
      const now = new Date();

      const opt = {
        $set: {
          cac: initialCAC(),
          updatedAt: now,
        },
      };

      await db.collection(COLLECTION_NAME.Identities).updateOne({ _id: new ObjectId(result._id) }, opt);
      result.cac = initialCAC();
    }

    return {
      _id: result._id.toString(),
      mobile: result.mobile,
      name: result.name,
      cac: result.cac,
      createdAt: new Date(result.createdAt),
      updatedAt: new Date(result.updatedAt),
    };
  } else {
    return null;
  }
};
