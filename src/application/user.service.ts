import { inject, injectable } from "inversify";
import { TYPES } from "../interface/types";
import { UserRepo } from "../infrastructure/database/user.repo";

@injectable()
export class UserService {
  private userRepo: UserRepo;

  constructor(@inject(TYPES.UserRepo) userRepo: UserRepo) {
    this.userRepo = userRepo;
  }

  createUser(email: string, password: string, name: string) {
    return this.userRepo.createUser(email, password, name);
  }

  getUserByEmail(email: string) {
    return this.userRepo.getUserByEmail(email);
  }
}
