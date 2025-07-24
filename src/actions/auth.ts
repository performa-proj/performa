"use server";

import { cookies } from "next/headers";
import { Identities } from "@/services/Identities";
import { createUserToken } from "@/services/Identities/Users/createUserToken";
import { createRefreshToken } from "@/services/Identities/Users/createRefreshToken";

export async function authenticate(state: {
  success: boolean;
  error?: string;
} | undefined, formData: FormData): Promise<{
  success: boolean;
  error?: string;
}> {
  const utkSecrets = process.env.UTK_SECRETS as string;

  if (!utkSecrets)
    throw new Error("Missing .UTK_SECRETS");

  const data = {
    mobile: formData.get("mobile") as string,
    password: formData.get("password") as string,
    remember: formData.get("remember") === "on",
  };

  if (data.mobile.length > 0 && data.password.length > 0) {
    const result = await Identities.Users.authenticate({
      mobile: data.mobile,
      password: data.password,
    });

    if (result.success) {
      const ck = await cookies();

      const uToken = await createUserToken({
        uid: result.data._id,
        mobile: result.data.mobile,
        name: result.data.name,
      }, utkSecrets);
      ck.set("user_token", uToken, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 24 * 3600 * 1000),
        sameSite: "lax",
        path: "/",
      });

      const rToken = await createRefreshToken({
        uid: result.data._id,
      }, result.data.tokenSecrets);
      ck.set("refresh_token", rToken, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 720 * 3600 * 1000),
        sameSite: "lax",
        path: "/",
      });

      return {
        success: true,
      };
    } else {
      return {
        success: false,
        error: "Unauthenticated",
      };
    }
  }

  return {
    success: false,
    error: "Invalid",
  };
}
