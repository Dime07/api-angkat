import { TWorkoutPayload } from "./workout";

export interface IWorkout {
  getAll(): Promise<TWorkoutPayload[]>;
  getOneById(id: number): Promise<TWorkoutPayload | null>;
  createOne(workout: TWorkoutPayload): Promise<TWorkoutPayload>;
  deleteOneById(id: number): Promise<boolean>;
  updateOneById(id: number, workout: TWorkoutPayload): Promise<TWorkoutPayload>;
}
