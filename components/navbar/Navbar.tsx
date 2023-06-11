import React from "react"
import { User } from "@prisma/client"

import { navbarConfig } from "@/config/navbar"

import Categories from "./Categories"
import Logo from "./Logo"
import Usermenu from "./Usermenu"

interface NavbarProps {
  currentUser: User | null
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 px-2 sm:px-8">
        <div className="flex flex-row space-x-16">
          <Logo name={navbarConfig.name} />
          <Categories houses={navbarConfig.houses} rooms={navbarConfig.rooms} />
        </div>
        <div className="flex-1 flex justify-end items-center">
          <Usermenu currentUser={currentUser} />
        </div>
      </div>
    </header>
  )
}

export default Navbar
