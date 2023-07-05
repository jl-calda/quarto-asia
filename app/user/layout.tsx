import React from "react"
import { User } from "lucide-react"

import getCurrentUser from "../actions/getCurrentUser"
import getListingByUserId from "../actions/getListingsByUserId"
import getUserById from "../actions/getUserById"
import UserBanner from "./components/UserBanner"
import UserColumn from "./components/UserColumn"

interface UserLayoutProps {
  children: React.ReactNode
  params: {
    userId: string
  }
}

const UserLayout = async ({ params, children }: UserLayoutProps) => {
  const currentUser = await getCurrentUser()
  const userId = params.userId
  const user = await getUserById(userId)
  const userListings = await getListingByUserId(userId)
  console.log(userId)
  console.log("user", user)
  return (
    <section className="container max-w-6xl pt-8 h-full">
      <UserBanner currentUser={currentUser} />

      <div className="flex flex-col sm:flex-row gap-x-6 gap-y-2">
        <div className="w-full sm:w-64">
          <UserColumn currentUser={currentUser} listings={userListings} />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </section>
  )
}

export default UserLayout
