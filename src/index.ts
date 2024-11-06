import { Elysia, t } from "elysia";
import { workoutService } from "./infrastructure/ioc/container";

const app = new Elysia({ prefix: "/api/v1" })
  // workout service
  .group("/workout", (app) =>
    app
      .get("/", async () => {
        const workout = await workoutService.getAll();
        return workout;
      })
      .get("/:id", async (req) => {
        const { id } = req.params;
        const workout = await workoutService.getOneById(Number(id));
        return workout;
      })
      .post(
        "/",
        async (req) => {
          const workout = await workoutService.createOne(req.body);
          return workout;
        },
        {
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
      .delete("/:id", async (req) => {
        const { id } = req.params;
        const workout = await workoutService.deleteOneById(Number(id));
        return workout;
      })
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
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
