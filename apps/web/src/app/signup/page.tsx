"use client";
import { Input } from "@repo/ui/input";
import { type ChangeEvent, useState } from "react";
import Link from "next/link";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import { Appbar } from "../components/appbar";
import { CheckFeature } from "../components/check-feature";
import { PrimaryButton } from "../components/button/primarybutton";
import { signup } from "../action/signup";

function Page(): JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading,setLoading] = useState(false)
  const handleSignup = async ():Promise<void> => {
    try {
      setLoading(true)
      const token = await signup(name,email, password);
      localStorage.setItem("token", token);
      router.push("/dashboard");
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }finally{
      setLoading(false)
    }


  }
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="flex pt-8 max-w-4xl">
          <div className="flex-1 pt-20 px-4">
            <div className="font-semibold text-3xl pb-4">
              Join millions worldwide who automate their work using Zapier.
            </div>
            <div className="pb-6 pt-4">
              <CheckFeature label="Easy setup, no coding required" />
            </div>
            <div className="pb-6">
              <CheckFeature label="Free forever for core features" />
            </div>
            <CheckFeature label="14-day trial of premium features & apps" />
          </div>
          <div className="flex-1 pt-6 pb-6 mt-12 px-4 flex gap-4 flex-col border rounded">
            <div className="text-2xl font-semibold">Sign up</div>
            <div>
              <div className=" font-light text-sm">Name</div>
              <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
                }}
                placeholder="Your name"
                type="text"
              />
            </div>
            <div>
              <div className=" font-light text-sm">Email</div>
              <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }}
                placeholder="Your Email"
                type="text"
              />
            </div>
            <div>
              <div className=" font-light text-sm">Password</div>
              <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
                type="password"
              />
            </div>

            <div className="pt-4 flex flex-row justify-between items-center gap-3">
              <PrimaryButton 
              disabled={loading}
                onClick={() => void handleSignup()}
                size="big"
              >
                Sign up
              </PrimaryButton>
              <Link href="/login">
                <Button variant="link">Already have an account? </Button>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
