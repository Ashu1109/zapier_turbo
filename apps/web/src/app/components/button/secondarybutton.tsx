import { Button } from "@repo/ui/button"
import { type ReactNode } from "react"

function SecondaryButton({ children, onClick, size = "small" }: {
    children: ReactNode,
    onClick: () => void,
    size?: "big" | "small"
}):JSX.Element {
    return <Button className={`${size === "small" ? "text-sm" : "text-xl"} ${size === "small" ? "px-8 pt-2" : "px-10 py-4"} cursor-pointer hover:shadow-md border text-black border-black rounded-full`}  onClick={onClick} variant={"secondary"}>
        {children}
    </Button>
}

export  default SecondaryButton