"use client"
import { Button } from "@repo/ui/button"
import { type ReactNode } from "react"

export function PrimaryButton({ children, onClick, size = "small",disabled=false }: {
    children: ReactNode,
    onClick: () => Promise<void> | void,
    size?: "big" | "small"
    disabled?: boolean
}):JSX.Element {
    return <Button  className={`${size === "small" ? "text-sm" : "text-xl"} ${size === "small" ? "px-8 py-2" : "px-10 py-4"} cursor-pointer hover:shadow-md bg-amber-700 text-white rounded-full text-center flex justify-center flex-col`} disabled={disabled} onClick={()=>void onClick()}>
        {children}
    </Button>
}