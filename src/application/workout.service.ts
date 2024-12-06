import { WorkoutRepo } from "../infrastructure/database/workout.repo";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../interface/types";
import { TWorkoutPayload } from "../interface/workout";

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

  createOne(workout: TWorkoutPayload, userId: number) {
    return this.workoutRepo.createOne(workout, userId);
  }

  deleteOneById(id: number) {
    return this.workoutRepo.deleteOneById(id);
  }

  updateOneById(id: number, workout: TWorkoutPayload) {
    return this.workoutRepo.updateOneById(id, workout);
  }
}
