import Elysia, { t } from "elysia";
import {
  userService,
  workoutService,
} from "../../infrastructure/ioc/container";
import jwt from "@elysiajs/jwt";

export const workoutRouter = new Elysia().group("/workout", (app) =>
  app
    .use(
      jwt({
        name: "jwt",
        secret: "angkatsecret",
      })
    )
    .derive(async ({ headers, jwt, set }) => {
      const authorization = headers["authorization"];
      const token =
        authorization && authorization.startsWith("Bearer ")
          ? authorization.slice(7)
          : "";

      const jwtPayload = await jwt.verify(token);

      if (!jwtPayload) {
        set.status = 401;
        throw new Error("Access token is invalid");
      }

      const user = await userService.getUserByEmail(
        jwtPayload.email.toString()
      );

      if (!user) {
        set.status = 401;
        throw new Error("User not found");
      }

      return {
        user,
      };
    })
    .onAfterHandle(({ response }) => {
      return {
        success: true,
        message: "Request has been successfully handled",
        data: response,
      };
    })
    .get("/", async ({ user }) => {
      const workout = await workoutService.getAllByUserId(user.id);
      return workout;
    })
    .get(
      "/:id",
      async (req) => {
        const { id } = req.params;
        const workout = await workoutService.getOneById(Number(id));
        return workout;
      },
      {
        tags: ["workout"],
      }
    )
    .post(
      "/",
      async ({ body, user }) => {
        const workout = await workoutService.createOne(body, user.id);
        return workout;
      },
      {
        tags: ["workout"],
        body: t.Object({
          name: t.String(),
          duration: t.Number(),
          exercises: t.Array(
            t.Object({
              name: t.String(),
              reps: t.Number(),
              volume: t.Number(),
            })
          ),
        }),
      }
    )
    .delete(
      "/:id",
      async ({ params, user }) => {
        const { id } = params;
        const workout = await workoutService.deleteOneById(Number(id), user.id);
        return workout;
      },
      {
        tags: ["workout"],
      }
    )
    .put(
      "/:id",
      async (req) => {
        const { id } = req.params;
        const workout = await workoutService.updateOneById(
          Number(id),
          req.body
        );
        return workout;
      },
      {
        tags: ["workout"],
        body: t.Object({
          name: t.String(),
          duration: t.Number(),
          exercises: t.Array(
            t.Object({
              id: t.Number(),
              name: t.String(),
              reps: t.Number(),
              volume: t.Number(),
            })
          ),
        }),
      }
    )
);
