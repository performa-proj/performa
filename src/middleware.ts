import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyUserToken } from "./services/Identities/Users/verifyUserToken";

const publicRoutes = [
  "/.well-known/",
  "/_next/",
  "/favicon.ico",
  "/api/",
  "/auth/signin",
  "/auth/token",
];

const usertokenSecrets = process.env.UTK_SECRETS as string;

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.some((each) => pathname.startsWith(each));

  if (isPublicRoute) {
    return NextResponse.next();
  } else {
    const ck = (await cookies());
    const userToken = ck.get("user_token")?.value;
    const refreshToken = ck.get("refresh_token")?.value;

    if (userToken) {
      const verified = await verifyUserToken(userToken, usertokenSecrets);

      if (verified.isVerified) {
        return NextResponse.next();
      } else {
        ck.delete("user_token");
      }
    }

    if (refreshToken) {
      return NextResponse.redirect(new URL(`/auth/token?rt=${refreshToken}&cb=${pathname}`, request.nextUrl));
    }

    return NextResponse.redirect(new URL(`/auth/signin?cb=${pathname}`, request.nextUrl));
  }
}
