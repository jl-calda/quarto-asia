"use client"

import { useRouter } from "next/navigation"

import { Icons } from "@/components/Icons"

import { Button } from "../ui/button"

interface LogoProps {
  name: string
}

const Logo: React.FC<LogoProps> = ({ name }) => {
  const router = useRouter()
  return (
    <Button
      variant="ghost"
      onClick={() => router.push("/")}
      className="flex flex-row space-x-1 items-center cursor-pointer p-0 m-0 h-auto"
    >
      <Icons.logo className="h-10 w-10" color="black" fill="green" />
      <span className="font-bold">{name}</span>
    </Button>
  )
}

export default Logo
