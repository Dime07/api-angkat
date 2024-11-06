import { TWorkoutPayload } from "./types";

export interface IWorkout {
  getAll(): Promise<TWorkoutPayload[]>;
  getOneById(id: number): Promise<TWorkoutPayload | null>;
  createOne(workout: TWorkoutPayload): Promise<TWorkoutPayload>;
}
