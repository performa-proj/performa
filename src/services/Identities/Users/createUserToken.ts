import { SignJWT } from "jose";

export const createUserToken = async (
  payloads: {
    uid: string;
    name: string;
    mobile: string;
    email?:string;
  },
  tokenSecrets: string,
  lifehours: number = 22,
) => {
  const secs = lifehours * 3600;
  const secret = new TextEncoder().encode(tokenSecrets);
  const jwt = new SignJWT(payloads)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${secs} s`)
    .sign(secret);

  return jwt;
};
