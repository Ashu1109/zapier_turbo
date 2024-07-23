"use server"
import { verify } from "jsonwebtoken";
import axios from "axios";

export const getHook = async (token:string, zapId:string):Promise<string> => {
    const {userId} = verify(token, "secret") as {userId:string};
    const url = `http://localhost:3002/hooks/catch/${userId}/${zapId}`;
    await axios.get(url);
    return url;
}