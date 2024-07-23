"use client"
import { useRouter } from "next/navigation"
import { PrimaryButton } from "./button/primarybutton";
import SecondaryButton from "./button/secondarybutton";
import Feature from "./feature";

function Hero ():JSX.Element{
    const router = useRouter();
    return <div>
        <div className="flex justify-center">
            <div className="text-5xl font-bold  text-center pt-8 max-w-xl">
                Automate as fast as you can type    
            </div>
        </div>
        <div className="flex justify-center pt-2">
            <div className="text-xl font-normal  text-center pt-8 max-w-2xl">
                AI gives you automation superpowers, and Zapier puts them to work. Pairing AI and Zapier helps you turn ideas into workflows and bots that work for you.
            </div>
        </div>

        <div className="flex justify-center pt-4">
            <div className="flex">
                <PrimaryButton onClick={() => {
                    router.push("/signup")
                }} size="big">Get Started free</PrimaryButton>
                <div className="pl-4">
                    <SecondaryButton  onClick={() => {
                        // router.push("/contact")
                    }} size="big">Contact Sales</SecondaryButton>
                </div>
            </div>
        </div>

        <div className="flex justify-center pt-4">
            <Feature subtitle="for core features" title="Free Forever" />
            <Feature subtitle="than any other platforms" title="More apps" />
            <Feature subtitle="AI Features" title="Cutting Edge" />
        </div>
    </div>
}

export default Hero;