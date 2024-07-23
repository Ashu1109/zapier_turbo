"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { Appbar } from './components/appbar'
import Hero from './components/hero'
import HeroVideo from './components/herovideo'

function Page():JSX.Element {
  const router = useRouter();
  const token = localStorage.getItem("token") || null
  if(token){
    router.push("/dashboard");
  }
  return (
    <main className="pb-48">
    <Appbar />
    <Hero />
    <div className="pt-8">
      <HeroVideo />
    </div>
</main>
  )
}

export default Page