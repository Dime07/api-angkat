import { WorkoutRepo } from "../infrastructure/database/workout.repo";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TWorkoutPayload, TYPES } from "../interface/types";

@injectable()
export class WorkoutService {
  private workoutRepo: WorkoutRepo;

  constructor(@inject(TYPES.WorkoutRepo) workoutRepo: WorkoutRepo) {
    this.workoutRepo = workoutRepo;
  }

  getAll() {
    return this.workoutRepo.getAll();
  }

  getOneById(id: number) {
    return this.workoutRepo.getOneById(id);
  }

  createOne(workout: TWorkoutPayload) {
    return this.workoutRepo.createOne(workout);
  }

  deleteOneById(id: number) {
    return this.workoutRepo.deleteOneById(id);
  }

  updateOneById(id: number, workout: TWorkoutPayload) {
    return this.workoutRepo.updateOneById(id, workout);
  }
}
