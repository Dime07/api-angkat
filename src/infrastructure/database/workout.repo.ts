import { Workout } from "@prisma/client";
import { IWorkout } from "../../interface/entities";
import { prisma } from "../../utils/prisma";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class WorkoutRepo implements IWorkout {
  async getAll(): Promise<Workout[]> {
    return await prisma.workout.findMany();
  }

  async getOneById(id: number): Promise<Workout | null> {
    return await prisma.workout.findUnique({
      where: { id },
    });
  }
}
