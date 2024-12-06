import { injectable } from "inversify";
import { IUser } from "../../interface/entities";
import { prisma } from "../../utils/prisma";

@injectable()
export class UserRepo implements IUser {
  async createUser(email: string, password: string, name: string) {
    return await prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });
  }

  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
}
