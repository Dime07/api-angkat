import { Container } from "inversify";
import { WorkoutRepo } from "../database/workout.repo";
import { TYPES } from "../../interface/types";
import { WorkoutService } from "../../application/workout.service";

const container = new Container();

// binding deps
container.bind<WorkoutRepo>(TYPES.WorkoutRepo).to(WorkoutRepo);

// binding services
container.bind<WorkoutService>(WorkoutService).toSelf();

// instance
export const workoutService = container.get<WorkoutService>(WorkoutService);
