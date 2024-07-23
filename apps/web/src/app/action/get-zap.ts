"use server";

import { prisma, type Zap } from "@repo/db/src";
import { verify } from "jsonwebtoken";

export async function getZap(token: string): Promise<Zap[]> {
  try {
    const user = verify(token, "secret") as { userId: string };
    const res = await prisma.zap.findMany({
      where: {
        userId: user.userId,
      },
      include: {
        action: {
          include: {
            type: true,
          },
        },
        trigger: {
          include: {
            type: true,
          },
        },
      },
    });
    return res;
  } catch (error) {
    return [];
  }
}
