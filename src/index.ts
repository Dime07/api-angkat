import { Elysia } from "elysia";
import { workoutService } from "./infrastructure/ioc/container";

const app = new Elysia()
  .get("/", async () => {
  const notes = await workoutService.getAll();
    return notes;
})
.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
