"use client";
import { Button } from "@repo/ui/button";
import { type ReactNode } from "react";

export function LinkButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}): JSX.Element {
  return (
    <Button
    className="flex justify-center px-2 py-2 cursor-pointer hover:bg-slate-100 font-light text-sm rounded"
    onClick={onClick}
    variant="link"
    >
      {children}
    </Button>
  );
}
