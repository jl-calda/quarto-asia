import React from "react"
import { AvatarImage } from "@radix-ui/react-avatar"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import getCurrentUser from "@/app/actions/getCurrentUser"

import EditProfileForm from "./components/EditProfileForm"

type Props = {}

const EditProfilePage = async (props: Props) => {
  const currentUser = await getCurrentUser()
  return (
    <div className="w-full h-full flex flex-col gap-y-4 mt-8">
      <EditProfileForm currentUser={currentUser} />
    </div>
  )
}

export default EditProfilePage
