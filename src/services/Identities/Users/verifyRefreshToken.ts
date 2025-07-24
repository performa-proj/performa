import { COLLECTION_NAME, Data } from "@/db";
import { jwtVerify, decodeJwt } from "jose";
import { ObjectId } from "mongodb";
import { IUser } from "./IUser";

export const verifyRefreshToken = async (refreshToken: string): Promise<{
  isVerified: true;
  ext: number;
  data: {
    _id: string;
    mobile: string;
    name: string;
    tokenSecrets: string;
  };
} | {
  isVerified: false;
}> => {
  try {
    const decoded = decodeJwt(refreshToken);
    const uid = decoded.uid as string;

    const db = await Data.connectDB();
    const data = await db.collection(COLLECTION_NAME.Identities).findOne<IUser>({ _id: new ObjectId(uid) });

    if (data) {
      const secret = new TextEncoder().encode(data.tokenSecrets);
      await jwtVerify(refreshToken, secret, {
        algorithms: ["HS256"],
      });

      return {
        isVerified: true,
        ext: decoded.ext as number,
        data: {
          _id: data._id.toString(),
          mobile: data.mobile,
          name: data.name,
          tokenSecrets: data.tokenSecrets,
        },
      };
    }

    return {
      isVerified: false,
    };
  } catch {
    return {
      isVerified: false,
    };
  }
};
