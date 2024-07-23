"use server"

import { prisma } from "@repo/db/src";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { LoginSchema } from "../types";


export const Login = async (email: string, password: string):Promise<string> => {
    const validfield = LoginSchema.safeParse({email, password});
    if (!validfield.success) {
        return "Invalid input"
    }
    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if(!existingUser){
        return "User does not exist"
    }
    if(!existingUser.password){
        return "User does not have a password"
    }

    const passwordMatch = await compare(password, existingUser.password);
    if(!passwordMatch){
        return "Invalid password"
    }
    const token = sign({userId:existingUser.id},"secret")
    return token
}