import { Elysia } from "elysia";
import { workoutService } from "./infrastructure/ioc/container";

const app = new Elysia({ prefix: "/api/v1" })
  // workout service
  .group("/workout", (app) =>
    app.get("/", async () => {
      const workout = await workoutService.getAll();
      return workout;
    })
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
