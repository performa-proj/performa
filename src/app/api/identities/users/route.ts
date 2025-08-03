import { Identities } from "@/services/Identities";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const json: {
    name: string;
    mobile: string;
    password: string;
  } = await request.json();

  const data = await Identities.Users.initUser(json);

  if (data) {
    return Response.json({
      success: true,
      data,
    });
  }

  return Response.json({
    success: false,
  });
};
