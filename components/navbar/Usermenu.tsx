"use client"

import { useCallback, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { User } from "@prisma/client"
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
import { Dialog, DialogTrigger } from "../ui/dialog"
import { ToastAction } from "../ui/toast"
import { useToast } from "../ui/use-toast"
import LoginDialog from "./dialogs/LoginContent"
import RegisterDialog from "./dialogs/RegisterContent"

interface UsermenuProps {
  currentUser: User | null
}

const Usermenu: React.FC<UsermenuProps> = ({ currentUser }) => {
  const { toast } = useToast()
  const router = useRouter()

  const [active, setActive] = useState("")

  const handlePost = () => {
    if (currentUser) {
      return router.push("/post")
    } else {
      toast({
        variant: "default",
        title: "Unauthorized",
        description: "Please login or register to post",
      })
    }
  }

  return (
    <Dialog>
      <div className="flex flex-row item sm:gap-x-2">
        {currentUser ? (
          <div className="flex flex-row sm:space-x-2 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex flex-row space-x-2 items-center rounded-md hover:bg-accent hover:text-accent-foreground">
                <Avatar>
                  <AvatarImage src={currentUser.image || undefined} />
                  <AvatarFallback>
                    {currentUser.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <span className="text-sm">{`Hello, ${
                  currentUser?.name?.split(" ")[0]
                }`}</span>
                <Icons.chevron className="h-4 w-4" />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="min-w-[180px]">
                <DropdownMenuLabel>
                  <span>Profile</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => router.push(`/user/${currentUser.id}`)}
                >
                  <Icons.user className="mr-4 h-4 w-4" />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() =>
                    router.push(`/user/${currentUser.id}/favorites`)
                  }
                >
                  <Icons.heart className="mr-4 h-4 w-4" />
                  <span>Favorites</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() =>
                    router.push(`/user/${currentUser.id}/listings`)
                  }
                >
                  <Icons.bed className="mr-4 h-4 w-4" />
                  <span>Listings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DialogTrigger asChild>
                  <DropdownMenuItem className="cursor-pointer">
                    <Button
                      onClick={handlePost}
                      variant="default"
                      className="font-semibold w-full"
                    >
                      Post
                    </Button>
                  </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => signOut()}
                >
                  <Icons.logout className="mr-4 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              onClick={() => router.push(`/user/${currentUser.id}/chat`)}
              variant="ghost"
              className="px-2 py-2 m-0"
            >
              <Icons.chat className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              className="px-2 py-2 m-0"
              onClick={() => router.push(`/user/${currentUser.id}/favorites`)}
            >
              <Icons.heart className="h-5 w-5" />
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
          </div>
        )}
        {active === "Register" && <RegisterDialog />}
        {active === "Login" && <LoginDialog />}
        <Button
          onClick={handlePost}
          variant="default"
          className="font-semibold hidden sm:block"
        >
          Post
        </Button>
      </div>
    </Dialog>
  )
}

export default Usermenu
