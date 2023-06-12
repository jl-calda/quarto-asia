"use client"

import path from "path"
import React, { use, useEffect, useMemo, useState } from "react"
import { useParams, usePathname, useRouter } from "next/navigation"
import { User } from "@prisma/client"
import axios from "axios"
import clsx from "clsx"
import { ca } from "date-fns/locale"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import getUserById from "@/app/actions/getUserById"
import useRoutes from "@/app/hooks/useRoutes"

interface UserBannerProps {
  currentUser: User | null
}

const UserBanner: React.FC<UserBannerProps> = ({ currentUser }) => {
  const routes = useRoutes(currentUser || null)
  const params = useParams()
  const { userId } = params
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    try {
      axios.get(`/api/user/${userId}`).then((res) => setUser(res.data))
    } catch (err) {
      return
    }
  }, [userId])

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <div className="w-full relative sm:h-36 h-24 bg-green-800">
      <div className="hidden sm:block absolute sm:top-[77px] left-10 p-1 bg-white rounded-full">
        <Avatar className="w-24 h-24 sm:h-36 sm:w-36 rounded-full">
          <AvatarImage src={user?.image || undefined} />
          <AvatarFallback className="text-6xl">
            {initials?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-row gap-x-6 absolute bottom-0 w-full">
        <div className="hidden sm:block sm:w-64" />
        <div className="flex-1 col-span-4 sm:col-start-2 sm:col-span-4 place-content-end">
          <nav className="grid grid-cols-5 place-items-center">
            {routes?.map((route) => {
              if (
                !route.isProtected ||
                (route.isProtected && currentUser && currentUser?.id === userId)
              )
                return (
                  <div
                    onClick={route.onClick}
                    key={crypto.randomUUID()}
                    className={clsx(
                      "w-full py-2 rounded-tr-md rounded-tl-md",
                      route.isActive ? "bg-white" : "text-foreground",
                      route.isActive ? "font-semibold" : "font-medium",
                      route.isActive ? "text-foreground" : "text-white",
                      "text-center text-sm cursor-pointer hover:opacity-95"
                    )}
                  >
                    {route.label}
                  </div>
                )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default UserBanner
