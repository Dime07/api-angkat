import { Prisma } from "@prisma/client";

export type TWorkoutPayload = Prisma.WorkoutGetPayload<{
  select: {
    duration: true;
    name: true;
    exercises: {
      select: {
        reps: true;
        name: true;
        volume: true;
      };
    };
  };
}>;
