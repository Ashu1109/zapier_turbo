"use server"

import { prisma,type AvailableAction,type AvailableTrigger } from "@repo/db/src"

export async function getTriggerAction(): Promise<{ trigger: AvailableTrigger[], action: AvailableAction[] }> {
    const trigger = await prisma.availableTrigger.findMany({})
    const action = await prisma.availableAction.findMany({})
    return { trigger, action }
}