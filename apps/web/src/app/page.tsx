"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Appbar } from "./components/appbar";
import Hero from "./components/hero";
import HeroVideo from "./components/herovideo";

function Page(): JSX.Element {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token") || null;
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);
  return (
    <main className="pb-48">
      <Appbar />
      <Hero />
      <div className="pt-8">
        <HeroVideo />
      </div>
    </main>
  );
}

export default Page;
