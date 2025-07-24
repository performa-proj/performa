import Crypto from "crypto";
import { COLLECTION_NAME, Data } from "@/db";
import { IUser } from "./IUser";

export const authenticate = async ({
  mobile,
  password,
}: {
  mobile: string;
  password: string;
}): Promise<{
  success: true;
  data: {
    _id: string;
    mobile: string;
    name: string;
    tokenSecrets: string;
  };
} | {
  success: false;
}> => {
  const db = await Data.connectDB();
  const data = await db.collection<IUser>(COLLECTION_NAME.Identities).findOne({ mobile });

  if (data && data.saltedPassword) {
    const hashed = Crypto.pbkdf2Sync(password, data.saltedPassword, 10000, 64, "sha256").toString("hex");

    if (hashed === data.hashedPassword) {
      return {
        success: true,
        data: {
          _id: data._id.toString(),
          mobile: data.mobile,
          name: data.name,
          tokenSecrets: data.tokenSecrets,
        },
      };
    }
  }

  return {
    success: false,
  };
}
