import Elysia, { t } from "elysia";
import { workoutService } from "../../infrastructure/ioc/container";
import { jwtMiddleware } from "../middleware/jwt-middleware";

export const workoutRouter = new Elysia().group("/workout", (app) =>
  app
    .derive(jwtMiddleware)
    .onAfterHandle(({ response }) => {
      return {
        success: true,
        message: "Request has been successfully handled",
        data: response,
      };
    })
    .get("/", async () => {
      const workout = await workoutService.getAll();
      return workout;
    })
    .get("/me", async ({ user }) => {
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
    .post("/:id/like", async ({ params, user }) => {
      const { id } = params;
      const workout = await workoutService.likeWorkout(Number(id), user.id);
      return workout;
    })
    .post("/:id/unlike", async ({ params, user }) => {
      const { id } = params;
      const workout = await workoutService.unlikeWorkout(Number(id), user.id);
      return workout;
    })
);
