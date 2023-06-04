"use client"

import { useRef, useState } from "react"
import { MenubarMenu } from "@radix-ui/react-menubar"
import clsx from "clsx"
import { signOut, useSession } from "next-auth/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Icons } from "../Icons"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Menubar, MenubarItem } from "../ui/menubar"
import LoginDialog from "./dialogs/LoginContent"
import RegisterDialog from "./dialogs/RegisterContent"

type Props = {}

const Usermenu = (props: Props) => {
  const session = useSession()
  console.log(session)
  const [active, setActive] = useState("")

  return (
    <>
      <Dialog>
        {session.status === "authenticated" ? (
          <div className="flex flex-row space-x-2 items-center">
            <Button variant="ghost" className="p-2 py-1 rounded-md  ">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex flex-row space-x-2 items-center">
                  <Avatar>
                    <AvatarImage
                      src={session?.data?.user?.image || undefined}
                    />
                    <AvatarFallback>{"A"}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{`Hello, ${
                    session?.data?.user?.name?.split(" ")[0]
                  }`}</span>
                  <Icons.chevron className="h-4 w-4" />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="min-w-[180px]">
                  <DropdownMenuLabel>
                    <span>Profile</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DialogTrigger asChild>
                    <DropdownMenuItem>
                      <Icons.user className="mr-4 h-4 w-4" />
                      <span>Account</span>
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Icons.heart className="mr-4 h-4 w-4" />
                    <span>Favorites</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icons.calendar className="mr-4 h-4 w-4" />
                    <span>Viewings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icons.bed className="mr-4 h-4 w-4" />
                    <span>Listings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <Icons.logout className="mr-4 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Button>
            <Button variant="ghost" className="px-2 py-2 m-0">
              <Icons.chat className="h-6 w-6" />
            </Button>
            <Button variant="ghost" className="px-2 py-2 m-0">
              <Icons.heart className="h-6 w-6" />
            </Button>
            <Button variant="default" className="font-semibold">
              POST
            </Button>
          </div>
        ) : (
          <div className="flex flex-row space-x-2 ">
            <DialogTrigger asChild>
              <Button onClick={() => setActive("Login")} variant="ghost">
                Login
              </Button>
            </DialogTrigger>
            <DialogTrigger asChild>
              <Button onClick={() => setActive("Register")} variant="ghost">
                Register
              </Button>
            </DialogTrigger>
            <Button variant="default" className="font-semibold">
              POST
            </Button>
          </div>
        )}
        {active === "Register" && <RegisterDialog />}
        {active === "Login" && <LoginDialog />}
      </Dialog>
    </>
  )
}

export default Usermenu
