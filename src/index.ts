import { Elysia } from "elysia";
import { workoutRouter } from "./presentation/router/workout-router";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia()
  .use(
    swagger({
      path: "/docs",
      autoDarkMode: true,
      documentation: {
        info: {
          title: "API Angkat - ElysiaJS Demo",
          version: "1.0.0",
        },
      },
    })
  )
  // workout service
  .use(workoutRouter)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
