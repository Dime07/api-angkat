import { Elysia } from "elysia";
import { workoutRouter } from "./presentation/router/workout-router";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import { authRouter } from "./presentation/router/auth-router";

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      path: "/docs",
      autoDarkMode: true,
      documentation: {
        info: {
          title: "API Angkat",
          version: "1.0.0",
        },
      },
    })
  )
  .onError(({ error, code }) => {
    if (code === "VALIDATION") {
      const mappedErrorMessage = error.all.map((err) => err.summary);
      return {
        success: false,
        message: mappedErrorMessage,
        data: {},
      };
    }

    return {
      success: false,
      message: error.message,
    };
  })
  // workout routes
  .use(workoutRouter)
  // auth routes
  .use(authRouter)
  // like routes
  .listen(3002);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
