import Elysia, { t } from "elysia";
import { authService } from "../../infrastructure/ioc/container";
import jwt from "@elysiajs/jwt";

export const authRouter = new Elysia().group("/auth", (app) =>
  app
    .use(
      jwt({
        name: "jwt",
        secret: "angkatsecret",
      })
    )
    .onAfterHandle(({ response }) => {
      return {
        success: true,
        message: "Request has been successfully handled",
        data: response,
      };
    })
    .post(
      "/login",
      async ({ body, jwt }) => {
        const { email, password } = body;
        const user = await authService.login(email, password);

        const token = await jwt.sign({
          sub: user.id.toString(),
          email: user.email,
        });

        return { ...user, token };
      },
      {
        body: t.Object({
          email: t.String(),
          password: t.String(),
        }),
      }
    )
    .post(
      "/register",
      async ({ body }) => {
        const { email, password, name } = body;
        return await authService.register(email, password, name);
      },
      {
        body: t.Object({
          email: t.String(),
          password: t.String(),
          name: t.String(),
        }),
      }
    )
);
