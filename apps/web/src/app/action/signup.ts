"use server"
import { prisma } from "@repo/db/src";
import {hash} from "bcryptjs"; 
import { sign } from "jsonwebtoken";
import { SignUpSchema } from "../types";

export const signup = async (name:string, email: string, password: string):Promise<string> => {
    const validfield = SignUpSchema.safeParse({name, email, password});
    if (!validfield.success) {
        throw new Error("Invalid input");
    }
    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password:hashedPassword
        }
    });
    const token = sign({userId:user.id}, "secret");
    return token
}