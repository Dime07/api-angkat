import { Like, User } from "@prisma/client";
import { TWorkoutPayload } from "./workout";

export interface IWorkout {
  getAll(): Promise<TWorkoutPayload[]>;
  getAllByUserId(userId: number): Promise<TWorkoutPayload[]>;
  getOneById(id: number): Promise<TWorkoutPayload | null>;
  createOne(workout: TWorkoutPayload, userId: number): Promise<TWorkoutPayload>;
  deleteOneById(id: number, userId: number): Promise<boolean>;
  updateOneById(id: number, workout: TWorkoutPayload): Promise<TWorkoutPayload>;
}

export interface IUser {
  createUser(
    email: string,
    password: string,
    name: string
  ): Promise<Omit<User, "password" | "createdAt" | "updatedAt">>;
  getUserByEmail(email: string): Promise<User | null>;
}

export interface ILike {
  likeWorkout(workoutId: number, userId: number): Promise<Like>;
  unlikeWorkout(workoutId: number, userId: number): Promise<boolean>;
  // isLiked(workoutId: number, userId: number): Promise<boolean>;
}
