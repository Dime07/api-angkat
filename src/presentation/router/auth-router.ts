import Elysia, { t } from "elysia";
import { authService } from "../../infrastructure/ioc/container";

export const authRouter = new Elysia().group("/auth", (app) =>
  app
    .onAfterHandle(({ response }) => {
      return {
        success: true,
        message: "Request has been successfully handled",
        data: response,
      };
    })
    .post(
      "/login",
      async ({ body }) => {
        const { email, password } = body;
        return await authService.login(email, password);
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
