"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import Link from "next/link";
import { Appbar } from "../components/appbar";
import { CheckFeature } from "../components/check-feature";
import { PrimaryButton } from "../components/button/primarybutton";
import { Login } from "../action/login";

function Page(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token")
  if(token){
    router.push("/dashboard");
  }
  const handleLogin = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await Login(email, password);
      localStorage.setItem("token", response);
      router.push("/dashboard");
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
    finally {
      setLoading(false);
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
          <div className="flex-1 pt-6 pb-6 mt-12 flex flex-col gap-4 px-4 border rounded">
            <div>
              <div className="text-2xl font-semibold">Login</div>
            </div>
            <div>
              <div className=" font-light text-sm">Name</div>
              <Input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Your Email"
                type="text"
              />
            </div>
            <div>
              <div className=" font-light text-sm">Password</div>
              <Input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
                type="password"
              />
            </div>
            <div className="pt-4 flex flex-row justify-around items-center">
              <PrimaryButton
              disabled={loading}
                onClick={() => void handleLogin()}
                size="big"
              >
                Login
              </PrimaryButton>
              <Link href="/signup">
                <Button variant="link">Don&apos;t have an account?</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
