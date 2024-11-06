import { Elysia } from "elysia";
import { workoutRouter } from "./presentation/router/workout-router";

const app = new Elysia({ prefix: "/api/v1" })
  // workout service
  .use(workoutRouter)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
