import React from "react"

import { navbarConfig } from "@/config/navbar"

import Categories from "./Categories"
import Logo from "./Logo"
import Usermenu from "./Usermenu"

type Props = {}

const Navbar = (props: Props) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 px-2 sm:px-8">
        <div className="flex flex-row space-x-16">
          <Logo name={navbarConfig.name} />
          <Categories houses={navbarConfig.houses} rooms={navbarConfig.rooms} />
        </div>
        <div className="flex-1 flex justify-end items-center">
          <Usermenu />
        </div>
      </div>
    </header>
  )
}

export default Navbar
