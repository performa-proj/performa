import { jwtVerify } from "jose";

export const verifyUserToken = async (userToken: string, tokenSecrets: string): Promise<{
  isVerified: true;
} | {
  isVerified: false;
  reason: "INVALID" | "EXPIRED";
}> => {
  try {
    const secret = new TextEncoder().encode(tokenSecrets);
    await jwtVerify(userToken, secret, {
      algorithms: ["HS256"],
    });

    return {
      isVerified: true,
    };
  } catch (e) {
    const error = e as Error;
    if (error.name === "JWTExpired") {
      return {
        isVerified: false,
        reason: "EXPIRED",
      };
    }

    return {
      isVerified: false,
      reason: "INVALID",
    };
  }
};
