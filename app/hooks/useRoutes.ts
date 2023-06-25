import path from "path"
import { use, useMemo } from "react"
import { useParams, usePathname, useRouter } from "next/navigation"
import { User } from "@prisma/client"

import getCurrentUser from "../actions/getCurrentUser"
import getUserById from "../actions/getUserById"

const useRoutes = (currentUser: User | null) => {
  const params = useParams()
  const { userId } = params
  const router = useRouter()
  // const user = getUserById(userId)
  const pathName = usePathname()
  // const currentUser = getCurrentUser()
  const isActive = useMemo(() => {
    const pathArr = pathName.split("/")
    if (pathArr.includes("favorites")) return "Favorites"
    if (pathArr.includes("chats")) return "Chat"
    if (pathArr.includes("edit")) return "Profile"
    if (pathArr.includes("listings")) return "Listings"
    return "Home"
  }, [pathName])

  const routes = useMemo(
    () => [
      {
        label: "Home",
        isActive: isActive === "Home",
        onClick: () => {
          if (currentUser) {
            router.push(`/user/${currentUser.id}`)
          }
          return
        },
        isProtected: true,
      },
      {
        label: "Favorites",
        isActive: isActive === "Favorites",
        onClick: () => {
          if (currentUser) {
            router.push(`/user/${currentUser.id}/favorites`)
          }
          return
        },
        isProtected: true,
      },
      {
        label: "Listings",
        isActive: isActive === "Listings",
        onClick: () => {
          if (currentUser && currentUser.id === userId) {
            router.push(`/user/${currentUser.id}/listings`)
          }
          return
        },
        isProtected: false,
      },
      {
        label: "Chats",
        isActive: isActive === "Chat",
        onClick: () => {
          if (currentUser) {
            router.push(`/user/${currentUser.id}/chats`)
          }
          return
        },
        isProtected: true,
      },
      {
        label: "Profile",
        isActive: isActive === "Profile",
        onClick: () => {
          if (currentUser) {
            router.push(`/user/${currentUser.id}/edit`)
          }
          return
        },
        isProtected: true,
      },
    ],
    [pathName, currentUser, userId, isActive, router]
  )
  return routes
}

export default useRoutes
