import { Button } from "@repo/ui/button"
import { type ReactNode } from "react"

export function DarkButton({ children, onClick, size = "lg" }: {
    children: ReactNode,
    onClick: () => void,
    size?: "lg" | "sm"
}): JSX.Element{
    return <Button className="flex flex-col justify-center px-8 py-2 cursor-pointer hover:shadow-md bg-purple-800 text-white rounded text-center" onClick={onClick} size={size}>
        {children}
    </Button>
}