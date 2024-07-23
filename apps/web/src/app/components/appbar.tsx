"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@repo/ui/button";
import { PrimaryButton } from "./button/primarybutton";

export function Appbar ():JSX.Element{
    const path = usePathname();
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    useEffect(()=>{
    const res = localStorage.getItem("token");
    setToken(res);
    },[])
    return <div className="flex border-b justify-between p-4">
        <Link className="flex flex-col justify-center text-2xl font-extrabold" href="/">
            Zapier
        </Link>
        {
            path === "/dashboard" ? (
                <div>
                    <PrimaryButton onClick={()=>{
                        // router.push("/create")
                    }}>
                        Create Zap
                    </PrimaryButton>
                    </div>
            ):(
                <div className="">
                   {
                    token?(
                        <PrimaryButton
                        onClick={()=>{
                            localStorage.removeItem("token");
                            router.push("/");
                        }}>
                            Logout
                        </PrimaryButton>
                    ):(
                        <div className=" flex flex-row gap-3">
                            <Link href="/login">
                        <Button className=" font-semibold text-md" size="lg" variant="secondary">
                            Login
                        </Button>
                        </Link>
                        <PrimaryButton onClick={()=>{
                            router.push("/signup")
                        }}>
                            Signup
                        </PrimaryButton>
                        </div>
                    )
                   }
                </div>
            )
        }
    </div>
}