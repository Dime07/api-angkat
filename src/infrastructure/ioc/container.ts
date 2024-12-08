import { Container } from "inversify";
import { WorkoutRepo } from "../database/workout.repo";
import { TYPES } from "../../interface/types";
import { WorkoutService } from "../../application/workout.service";
import { UserService } from "../../application/user.service";
import { AuthService } from "../../application/auth.service";
import { UserRepo } from "../database/user.repo";
import { LikeRepo } from "../database/like.repo";

const container = new Container();

// binding deps
container.bind<WorkoutRepo>(TYPES.WorkoutRepo).to(WorkoutRepo);
container.bind<UserRepo>(TYPES.UserRepo).to(UserRepo);
container.bind<LikeRepo>(TYPES.LikeRepo).to(LikeRepo);

// binding services
container.bind<WorkoutService>(WorkoutService).toSelf();
container.bind<UserService>(UserService).toSelf();
container.bind<AuthService>(AuthService).toSelf();

// instance
export const workoutService = container.get<WorkoutService>(WorkoutService);
export const userService = container.get<UserService>(UserService);
export const authService = container.get<AuthService>(AuthService);
