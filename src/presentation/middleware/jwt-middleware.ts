import { Context } from "elysia";
import { userService } from "../../infrastructure/ioc/container";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function jwtMiddleware({ headers, set }: Context) {
  const authorization = headers["authorization"];
  const token =
    authorization && authorization.startsWith("Bearer ")
      ? authorization.slice(7)
      : "";

  if (!token) {
    set.status = 401;
    throw new Error("Access token is missing");
  }

  const jwtPayload = (await jwt.verify(
    token,
    `${process.env.JWT_SECRET}`
  )) as JwtPayload;

  if (!jwtPayload) {
    set.status = 401;
    throw new Error("Access token is invalid");
  }

  const user = await userService.getUserByEmail(jwtPayload["email"].toString());

  if (!user) {
    set.status = 401;
    throw new Error("User not found");
  }

  return {
    user,
  };
}
