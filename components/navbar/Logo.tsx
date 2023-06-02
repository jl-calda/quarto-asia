import React from "react"

import { Icons } from "@/components/Icons"

interface LogoProps {
  name: string
}

const Logo: React.FC<LogoProps> = ({ name }) => {
  return (
    <div className="flex flex-row space-x-1 items-center">
      <Icons.logo className="h-10 w-10" color="black" fill="green" />
      <span className="font-bold">{name}</span>
    </div>
  )
}

export default Logo
