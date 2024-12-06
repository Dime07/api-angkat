import { inject, injectable } from "inversify";
import { UserRepo } from "../infrastructure/database/user.repo";
import { TYPES } from "../interface/types";

@injectable()
export class AuthService {
  private userRepo: UserRepo;

  constructor(@inject(TYPES.UserRepo) userRepo: UserRepo) {
    this.userRepo = userRepo;
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.getUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await Bun.password.verify(
      password,
      user.password,
      "bcrypt"
    );

    if (!passwordMatch) {
      throw new Error("Password is incorrect");
    }

    return user;
  }

  async register(email: string, password: string, name: string) {
    const user = await this.userRepo.getUserByEmail(email);

    if (user) {
      throw new Error("User already exists");
    }

    const hashedPassword = await Bun.password.hash(password, "bcrypt");

    return await this.userRepo.createUser(email, hashedPassword, name);
  }
}
