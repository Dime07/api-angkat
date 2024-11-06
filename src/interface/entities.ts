import { Workout } from "@prisma/client";

export interface IWorkout {
    getAll(): Promise<Workout[]>
}