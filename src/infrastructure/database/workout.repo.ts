import { IWorkout } from "../../interface/entities";
import { prisma } from "../../utils/prisma";
import { injectable } from "inversify";
import "reflect-metadata";
import { TWorkoutPayload } from "../../interface/types";

@injectable()
export class WorkoutRepo implements IWorkout {
  async getAll(): Promise<TWorkoutPayload[]> {
    return await prisma.workout.findMany({
      include: { exercises: true },
    });
  }

  async getOneById(id: number): Promise<TWorkoutPayload | null> {
    return await prisma.workout.findUnique({
      where: { id },
      include: { exercises: true },
    });
  }

  async createOne(workout: TWorkoutPayload): Promise<TWorkoutPayload> {
    return await prisma.workout.create({
      data: {
        ...workout,
        exercises: {
          create: workout.exercises,
        },
      },
      include: { exercises: true },
    });
  }
}
