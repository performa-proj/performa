import { ObjectId } from "mongodb";
import { jwtVerify, decodeJwt } from "jose";
import { COLLECTION_NAME, Data } from "@/db";
import { IUser } from "./IUser";

export const verifyRefreshToken = async (refreshToken: string): Promise<{
  isVerified: true;
  ext: number;
  data: {
    _id: string;
    name: string;
    mobile: string;
    email?: string;
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
      const rtkSecrets = new TextEncoder().encode(data.security.tokenSecrets);
      await jwtVerify(refreshToken, rtkSecrets, {
        algorithms: ["HS256"],
      });

      return {
        isVerified: true,
        ext: decoded.ext as number,
        data: {
          _id: data._id.toString(),
          name: data.profile.name,
          mobile: data.profile.mobile,
          email: data.profile.email,
          tokenSecrets: data.security.tokenSecrets,
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
