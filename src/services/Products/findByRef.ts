import { COLLECTION_NAME, Data } from "@/db";
import { IProduct } from "./IProduct";

export const findByRef = async ({
  ref,
}: {
  ref: string;
}): Promise<IProduct | null> => {
  const db = await Data.connectDB();

  const filter = {
    ref,
  };

  const result = await db.collection(COLLECTION_NAME.Products).findOne<IProduct>(filter);

  if (result) {
    return {
      ...result,
      _id: result._id.toString(),
    };
  } else {
    return null;
  }
};
