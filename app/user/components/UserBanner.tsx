"use client"

import path from "path"
import React, { use, useEffect, useMemo, useState } from "react"
import { useParams, usePathname, useRouter } from "next/navigation"
import { User } from "@prisma/client"
import axios from "axios"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import getUserById from "@/app/actions/getUserById"

interface UserBannerProps {
  currentUser: User | null
}

const UserBanner: React.FC<UserBannerProps> = ({ currentUser }) => {
  const params = useParams()
  const pathName = usePathname()
  const { userId } = params
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    axios.get(`/api/user/${userId}`).then((res) => setUser(res.data))
  }, [userId])

  const activePath = useMemo(() => {
    let active = ""
    const splitPath = pathName.split("/")
    if (splitPath.includes("listings")) return "Listings"
    if (splitPath.includes("favorites")) return "Favorites"
    if (splitPath.includes("edit")) return "Edit Profile"
    return "All"
  }, [pathName])

  console.log(activePath)
  const [active, setActive] = useState("All")

  const router = useRouter()

  const routes = ["All", "Favorites", "Listings", "Edit Profile"]

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <div className="w-full relative sm:h-36 h-24 bg-green-800 rounded-md grid grid-cols-4 sm:grid-cols-5 place-content-end px-4">
      <div className="hidden sm:block absolute sm:top-[77px] left-10 p-1 bg-white rounded-full">
        <Avatar className="w-24 h-24 sm:h-36 sm:w-36 rounded-full">
          <AvatarImage src={user?.image || undefined} />
          <AvatarFallback className="text-6xl">
            {initials?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="col-span-4 sm:col-start-3 sm:col-span-3 place-content-end pb-4">
        <div className="grid grid-cols-4 place-items-center">
          {routes.map((route) => (
            <div key={crypto.randomUUID()} className="text-white">
              {route}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserBanner
