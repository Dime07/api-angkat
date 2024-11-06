import { Workout } from "@prisma/client";

export interface IWorkout {
  getAll(): Promise<Workout[]>;
  getOneById(id: number): Promise<Workout | null>;
}
