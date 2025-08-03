import { decodeJwt } from "jose";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createUserToken } from "@/services/Identities/Users/createUserToken";
import { createRefreshToken } from "@/services/Identities/Users/createRefreshToken";
import { verifyRefreshToken } from "@/services/Identities/Users/verifyRefreshToken";

export const GET = async () => {
  const ck = await cookies();
  const ckUser = ck.get("user_token");

  if (ckUser) {
    const user = decodeJwt(ckUser.value);

    return Response.json({
      id: user.uid,
      name: user.name,
      mobile: user.mobile,
    });
  }

  return Response.json({
    user: null,
  });
};

export const PUT = async (request: NextRequest) => {
  const searchParams = await request.nextUrl.searchParams;
  const rt = searchParams.get("rt");
  const cb = searchParams.get("cb") || "/";

  if (rt) {
    const verified = await verifyRefreshToken(rt);

    if (verified.isVerified) {
      const utkSecrets = process.env.UTK_SECRETS as string;
      const { ext, data } = verified;
      let rToken;

      const ck = await cookies();
      const uToken = await createUserToken({
        uid: data._id,
        name: data.name,
        mobile: data.mobile,
        email: data.email,
      }, utkSecrets);

      ck.set("user_token", uToken, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 24 * 3600 * 1000),
        sameSite: "lax",
        path: "/",
      });

      const extDate = new Date(ext);
      const now = new Date();

      if (now > extDate) {
        rToken = await createRefreshToken({
          uid: data._id,
        }, data.tokenSecrets);

        ck.set("refresh_token", rToken, {
          httpOnly: true,
          secure: true,
          expires: new Date(Date.now() + 720 * 3600 * 1000),
          sameSite: "lax",
          path: "/",
        });
      }

      return Response.json({
        success: true,
        data: {
          cb,
          userToken: uToken,
          refreshToken: rToken,
        },
      });
    } else {
      const ck = await cookies();
      ck.delete("refresh_token");
    }
  }

  return Response.json({
    success: false,
  });
};
