import { Prisma } from "@prisma/client";

export const TYPES = {
  WorkoutRepo: Symbol.for("WorkoutRepo"),
  WorkoutService: Symbol.for("WorkoutService"),
};

export type TWorkoutPayload = Prisma.WorkoutGetPayload<{
  select: {
    duration: true;
    name: true;
    exercises: {
      select: {
        duration: true;
        name: true;
      };
    };
  };
}>;
