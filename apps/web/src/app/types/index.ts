import {z} from "zod"


export const SignUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
    name: z.string().min(3)
})


export const ZapCreateSchema = z.object({
    availableTriggerId: z.string(),
    triggerMetadata: z.any().optional(),
    actions: z.array(z.object({
        availableActionId: z.string(),
        actionMetadata: z.any().optional()
    }))
});

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3)
})