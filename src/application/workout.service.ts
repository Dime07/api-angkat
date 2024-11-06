import { WorkoutRepo } from "../infrastructure/database/workout.repo";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../interface/types";

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
}
