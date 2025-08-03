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
    uid: string;
    mobile: string;
    name: string;
    email?: string;
    tokenSecrets: string;
  };
} | {
  success: false;
}> => {
  const db = await Data.connectDB();
  const data = await db.collection<IUser>(COLLECTION_NAME.Identities).findOne({ "profile.mobile": mobile });

  if (data && data.security.saltedPassword) {
    const hashed = Crypto.pbkdf2Sync(password, data.security.saltedPassword, 10000, 64, "sha256").toString("hex");

    if (hashed === data.security.hashedPassword) {
      return {
        success: true,
        data: {
          uid: data._id.toString(),
          mobile: data.profile.mobile,
          name: data.profile.name,
          email: data.profile.email,
          tokenSecrets: data.security.tokenSecrets,
        },
      };
    }
  }

  return {
    success: false,
  };
}
