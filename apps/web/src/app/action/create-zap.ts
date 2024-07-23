"use server";
import { prisma } from "@repo/db/src";
import { verify } from "jsonwebtoken";

export async function CreateZap(
  token: string,
  selectedTrigger: {
    id: string;
    name: string;
  },
  selectedActions: {
    index: number;
    availableActionId: string;
    availableActionName: string;
    metadata: unknown;
  }[]
): Promise<string> {
  const decoded = verify(token, "secret") as { userId: string };
  const userId = decoded.userId;
  const id = await prisma.$transaction(async tx=>{
    const zap = await tx.zap.create({
        data:{
            userId,
            trigger:{
              create:{
                availableTiggerId:selectedTrigger.id
              }
            },
        },
    })
    await tx.action.createMany({
      data:selectedActions.map((a,idx)=>{
        return{
          zapId:zap.id,
          actionId: a.availableActionId,
          sortingOrder:idx,
          metadata:a.metadata || {}
        }
      })
    })
    return zap.id
 })
 return id
}
