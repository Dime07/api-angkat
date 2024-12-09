import { describe, expect, it } from "bun:test";
import Elysia from "elysia";
import { workoutRouter } from "../workout-router";
import { mockToken } from "./data";

const app = new Elysia().use(workoutRouter);

describe("Workout", () => {
  describe("get all workout data", () => {
    it("should not be able to fetch workout data", async () => {
      const response = await app.handle(
        new Request("http://localhost/workout", {
          method: "GET",
          headers: [
            ["Content-Type", "application/json"],
            ["Authorization", `Bearer ${mockToken}`],
          ],
        })
      );
      const json = await response.json();
      expect(response.status).toBe(200);
      expect(json.success).toBe(true);
    });

    it("should not be able to fetch workout data, without authorization", async () => {
      const response = await app.handle(
        new Request("http://localhost/workout", {
          method: "GET",
          headers: [["Content-Type", "application/json"]],
        })
      );
      const json = await response.json();
      expect(response.status).toBe(401);
      expect(json.message).toBe("Access token is invalid");
    });
  });

  describe("get workout data by user", () => {
    it("should be able to fetch workout data by user", async () => {
      const response = await app.handle(
        new Request("http://localhost/workout/me", {
          method: "GET",
          headers: [
            ["Content-Type", "application/json"],
            ["Authorization", `Bearer ${mockToken}`],
          ],
        })
      );
      const json = await response.json();
      expect(response.status).toBe(200);
      expect(json.success).toBe(true);
    });

    it("should not be able to fetch workout data by user, without authorization", async () => {
      const response = await app.handle(
        new Request("http://localhost/workout/me", {
          method: "GET",
          headers: [["Content-Type", "application/json"]],
        })
      );
      const json = await response.json();
      expect(response.status).toBe(401);
      expect(json.message).toBe("Access token is invalid");
    });
  });
});
