import Crypto from "crypto";
import { COLLECTION_NAME, Data } from "@/db";

export const initUser = async ({
  name,
  mobile,
  password,
}: {
  name: string;
  mobile: string;
  password: string;
}) => {
  const db = await Data.connectDB();
  const now = new Date();
  const saltedPassword = Crypto.randomBytes(16).toString("hex");
  const hashedPassword = Crypto.pbkdf2Sync(password, saltedPassword, 10000, 64, "sha256").toString("hex");
  const tokenSecrets = Crypto.randomBytes(32).toString("hex");

  const data = {
    mobile,
    name,
    hashedPassword,
    saltedPassword,
    tokenSecrets,
    createdAt: now,
    updatedAt: now,
  };

  const result = await db.collection(COLLECTION_NAME.Identities).insertOne(data);

  if (result.insertedId) {
    return {
      _id: result.insertedId.toString(),
      name,
      mobile,
    };
  }

  return undefined;
};
