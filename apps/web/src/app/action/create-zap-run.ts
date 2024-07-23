"use server"
import { prisma } from '@repo/db/src';
import { verify } from 'jsonwebtoken';
import { ZapCreateSchema } from '../types';

export const createZapRun = async (zap:{
    token:string,
    zapId:string,
    availableTriggerId:string,
    triggerMetadata:unknown,
    actions:{
        availableActionId:string,
        actionMetadata:unknown
    }[]
}): Promise<{userId:string}> => {
    if(!zap.token){
        throw new Error("User not found");
    }
    const user = verify(zap.token,"secret") as {id:string};
    const validZap = ZapCreateSchema.safeParse({...zap});
    if (!validZap.success) {
        throw new Error("Invalid input");
    }
        await prisma.trigger.create({
              data:{
                zapId:zap.zapId,
                availableTiggerId:zap.availableTriggerId,
              }
         });
         await prisma.action.createMany({
                data:zap.actions.map((action,index)=>{
                    return {
                        zapId:zap.zapId,
                        actionId:action.availableActionId,
                        sortingOrder:index,
                    }
                })
       })
       return {userId:user.id};
    }