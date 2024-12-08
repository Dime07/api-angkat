import { IWorkout } from "../../interface/entities";
import { TWorkoutPayload } from "../../interface/workout";
import { prisma } from "../../utils/prisma";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class WorkoutRepo implements IWorkout {
  async getAll(): Promise<TWorkoutPayload[]> {
    return await prisma.workout.findMany({
      include: {
        exercises: true,
        likes: true,
        user: { select: { name: true } },
      },
    });
  }

  async getAllByUserId(userId: number): Promise<TWorkoutPayload[]> {
    return await prisma.workout.findMany({
      where: { userId },
      include: {
        exercises: true,
        likes: true,
        user: { select: { name: true } },
      },
    });
  }

  async getOneById(id: number) {
    return await prisma.workout.findUnique({
      where: { id },
      include: { exercises: true },
    });
  }

  async createOne(workout: TWorkoutPayload, userId: number) {
    return await prisma.workout.create({
      data: {
        ...workout,
        userId,
        exercises: {
          create: workout.exercises,
        },
      },
      include: { exercises: true },
    });
  }

  async deleteOneById(id: number, userId: number) {
    const workout = await prisma.workout.delete({
      where: { id, userId },
    });

    return !!workout;
  }

  async updateOneById(id: number, workout: TWorkoutPayload) {
    return await prisma.workout.update({
      where: { id },
      data: {
        ...workout,
        exercises: {
          deleteMany: {},
          create: workout.exercises,
        },
      },
      include: { exercises: true },
    });
  }
}
