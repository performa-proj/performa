import { SignJWT } from "jose";

export const createRefreshToken = async (
  payloads: {
    uid: string;
  },
  tokenSecrets: string,
  lifehours: number = 720,
) => {
  const secs = lifehours * 3600;
  const ext = Date.now() + (secs * 1000 * 0.6);
  const secret = new TextEncoder().encode(tokenSecrets);
  const jwt = new SignJWT({
    ...payloads,
    ext,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${secs} s`)
    .sign(secret);

  return jwt;
};
