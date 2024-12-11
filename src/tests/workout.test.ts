import { beforeAll, describe, expect, it, spyOn } from "bun:test";
import Elysia from "elysia";
import { mockToken, mockUser, mockWorkout, oneMockWorkout } from "./data";
import { workoutRouter } from "../presentation/router/workout-router";
import { userService, workoutService } from "../infrastructure/ioc/container";

const app = new Elysia().use(workoutRouter);

describe("Workout Router", () => {
  beforeAll(() => {
    spyOn(workoutService, "getAll").mockResolvedValue(mockWorkout);
    spyOn(workoutService, "getAllByUserId").mockResolvedValue(mockWorkout);
    spyOn(workoutService, "getOneById").mockResolvedValue(mockWorkout[0]);
    spyOn(workoutService, "createOne").mockResolvedValue(mockWorkout[0]);
    spyOn(workoutService, "deleteOneById").mockResolvedValue(true);
  });

  it("should return status 200, when get all workout succesful", async () => {
    spyOn(userService, "getUserByEmail").mockResolvedValue(mockUser);
    const response = await app.handle(
      new Request("http://localhost/workout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${mockToken}`,
        },
      })
    );

    const json = await response.json();
    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data).toEqual([
      {
        ...oneMockWorkout,
        createdAt: oneMockWorkout.createdAt.toISOString(),
        updatedAt: oneMockWorkout.updatedAt.toISOString(),
        exercises: oneMockWorkout.exercises.map((exercise) => ({
          ...exercise,
          createdAt: exercise.createdAt.toISOString(),
          updatedAt: exercise.updatedAt.toISOString(),
        })),
      },
    ]);
  });

  it("should return status 200, when get all workout by user succesful", async () => {
    spyOn(userService, "getUserByEmail").mockResolvedValue(mockUser);
    const response = await app.handle(
      new Request("http://localhost/workout/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${mockToken}`,
        },
      })
    );

    const json = await response.json();
    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data).toEqual([
      {
        ...oneMockWorkout,
        createdAt: oneMockWorkout.createdAt.toISOString(),
        updatedAt: oneMockWorkout.updatedAt.toISOString(),
        exercises: oneMockWorkout.exercises.map((exercise) => ({
          ...exercise,
          createdAt: exercise.createdAt.toISOString(),
          updatedAt: exercise.updatedAt.toISOString(),
        })),
      },
    ]);
  });

  it("should return status 200, when get one workout succesful", async () => {
    spyOn(userService, "getUserByEmail").mockResolvedValue(mockUser);
    const response = await app.handle(
      new Request("http://localhost/workout/1", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${mockToken}`,
        },
      })
    );

    const json = await response.json();
    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data).toEqual({
      ...oneMockWorkout,
      createdAt: oneMockWorkout.createdAt.toISOString(),
      updatedAt: oneMockWorkout.updatedAt.toISOString(),
      exercises: oneMockWorkout.exercises.map((exercise) => ({
        ...exercise,
        createdAt: exercise.createdAt.toISOString(),
        updatedAt: exercise.updatedAt.toISOString(),
      })),
    });
  });

  it("should return status 200, when create one workout succesful", async () => {
    spyOn(userService, "getUserByEmail").mockResolvedValue(mockUser);
    const response = await app.handle(
      new Request("http://localhost/workout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${mockToken}`,
        },
        body: JSON.stringify({
          name: oneMockWorkout.name,
          duration: oneMockWorkout.duration,
          exercises: [
            {
              name: oneMockWorkout.exercises[0].name,
              reps: oneMockWorkout.exercises[0].reps,
              volume: oneMockWorkout.exercises[0].volume,
            },
          ],
        }),
      })
    );

    const json = await response.json();
    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data).toEqual({
      ...oneMockWorkout,
      createdAt: oneMockWorkout.createdAt.toISOString(),
      updatedAt: oneMockWorkout.updatedAt.toISOString(),
      exercises: oneMockWorkout.exercises.map((exercise) => ({
        ...exercise,
        createdAt: exercise.createdAt.toISOString(),
        updatedAt: exercise.updatedAt.toISOString(),
      })),
    });
  });

  it("should return status 200, when delete one workout succesful", async () => {
    spyOn(userService, "getUserByEmail").mockResolvedValue(mockUser);
    const response = await app.handle(
      new Request("http://localhost/workout/1", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${mockToken}`,
        },
      })
    );

    const json = await response.json();
    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data).toEqual(true);
  });

  it("should return status 401, when token is not provided", async () => {
    const response = await app.handle(
      new Request("http://localhost/workout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    );

    expect(response.status).toBe(401);
  });
});
