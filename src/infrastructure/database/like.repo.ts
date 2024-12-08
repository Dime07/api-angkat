import { injectable } from "inversify";
import { ILike } from "../../interface/entities";
import { prisma } from "../../utils/prisma";

@injectable()
export class LikeRepo implements ILike {
  async likeWorkout(workoutId: number, userId: number) {
    return await prisma.like.create({
      data: {
        workoutId,
        userId,
      },
    });
  }

  async unlikeWorkout(workoutId: number, userId: number): Promise<boolean> {
    const like = await prisma.like.deleteMany({
      where: {
        workoutId,
        userId,
      },
    });

    return !!like.count;
  }
}
