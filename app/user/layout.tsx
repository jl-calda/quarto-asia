import React from "react"
import { User } from "lucide-react"

import getCurrentUser from "../actions/getCurrentUser"
import UserBanner from "./components/UserBanner"
import UserColumn from "./components/UserColumn"

interface UserLayoutProps {
  children: React.ReactNode
}

const UserLayout = async ({ children }: UserLayoutProps) => {
  const currentUser = await getCurrentUser()
  return (
    <section className="container max-w-6xl pt-8 h-full">
      <UserBanner currentUser={currentUser} />
      <div className="flex flex-col sm:flex-row gap-x-6 gap-y-2">
        <div>
          <UserColumn currentUser={currentUser} />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </section>
  )
}

export default UserLayout
