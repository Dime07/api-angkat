import { WorkoutRepo } from "../infrastructure/database/workout.repo";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../interface/types";
import { TWorkoutPayload } from "../interface/workout";
import { LikeRepo } from "../infrastructure/database/like.repo";

@injectable()
export class WorkoutService {
  private workoutRepo: WorkoutRepo;
  private likeRepo: LikeRepo;

  constructor(
    @inject(TYPES.WorkoutRepo) workoutRepo: WorkoutRepo,
    @inject(TYPES.LikeRepo) likeRepo: LikeRepo
  ) {
    this.workoutRepo = workoutRepo;
    this.likeRepo = likeRepo;
  }

  getAll() {
    return this.workoutRepo.getAll();
  }

  getAllByUserId(userId: number) {
    return this.workoutRepo.getAllByUserId(userId);
  }

  getOneById(id: number) {
    return this.workoutRepo.getOneById(id);
  }

  createOne(workout: TWorkoutPayload, userId: number) {
    return this.workoutRepo.createOne(workout, userId);
  }

  deleteOneById(id: number, userId: number) {
    return this.workoutRepo.deleteOneById(id, userId);
  }

  updateOneById(id: number, workout: TWorkoutPayload) {
    return this.workoutRepo.updateOneById(id, workout);
  }

  likeWorkout(workoutId: number, userId: number) {
    return this.likeRepo.likeWorkout(workoutId, userId);
  }

  unlikeWorkout(workoutId: number, userId: number) {
    return this.likeRepo.unlikeWorkout(workoutId, userId);
  }
}
