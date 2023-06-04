"use client"

import { useRouter } from "next/navigation"

import { Icons } from "@/components/Icons"

interface LogoProps {
  name: string
}

const Logo: React.FC<LogoProps> = ({ name }) => {
  const router = useRouter()
  return (
    <div
      onClick={() => router.push("/")}
      className="flex flex-row space-x-1 items-center cursor-pointer"
    >
      <Icons.logo className="h-10 w-10" color="black" fill="green" />
      <span className="font-bold">{name}</span>
    </div>
  )
}

export default Logo
