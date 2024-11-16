import Elysia, { t } from "elysia";
import { workoutService } from "../../infrastructure/ioc/container";

export const workoutRouter = new Elysia().group("/workout", (app) =>
  app
    .get(
      "/",
      async () => {
        const workout = await workoutService.getAll();
        return workout;
      },
      {
        tags: ["workout"],
      }
    )
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
      async (req) => {
        const workout = await workoutService.createOne(req.body);
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
            })
          ),
        }),
      }
    )
    .delete(
      "/:id",
      async (req) => {
        const { id } = req.params;
        const workout = await workoutService.deleteOneById(Number(id));
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
              name: t.String(),
              reps: t.Number(),
            })
          ),
        }),
      }
    )
);
