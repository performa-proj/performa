import { COLLECTION_NAME, Data } from "@/db";
import { ICustomer } from "./ICustomer";
import { initialCustac } from "./core/initialCustac";
import { ObjectId } from "mongodb";

export const findByMobile = async (mobile: string): Promise<ICustomer | null> => {
  const db = await Data.connectDB();
  const result = await db.collection(COLLECTION_NAME.Identities).findOne<ICustomer>({ mobile });

  if (result) {
    if (!result.custac) {
      const now = new Date();

      const opt = {
        $set: {
          custac: initialCustac(),
          updatedAt: now,
        },
      };

      await db.collection(COLLECTION_NAME.Identities).updateOne({ _id: new ObjectId(result._id) }, opt);
      result.custac = initialCustac();
    }

    return {
      _id: result._id.toString(),
      mobile: result.mobile,
      name: result.name,
      custac: result.custac,
      createdAt: new Date(result.createdAt),
      updatedAt: new Date(result.updatedAt),
    };
  } else {
    return null;
  }
};
