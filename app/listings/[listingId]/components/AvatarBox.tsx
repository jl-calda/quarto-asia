"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { User } from "@prisma/client"
import { formatDistanceToNowStrict } from "date-fns"
import { useSession } from "next-auth/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import getCurrentUser from "@/app/actions/getCurrentUser"

interface AvatarBoxProps {
  user: User
  currentUser: User | null
}

const AvatarBox: React.FC<AvatarBoxProps> = ({ user, currentUser }) => {
  const session = useSession()
  const router = useRouter()
  console.log(session)
  return (
    <Card className="flex flex-col gap-y-2 p-2 w-full h-full">
      <div className="flex flex-row gap-x-2 items-center flex-1 cursor-pointer">
        <Avatar onClick={() => router.push(`user/${user.id}`)}>
          <AvatarImage src={user?.image || undefined} />
          <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div
          onClick={() => router.push(`user/${user.id}`)}
          className="flex flex-col justify-center cursor-pointer"
        >
          <div>
            <span className="font-semibold">{user?.name}</span>
          </div>
          <div>
            <span className="text-muted-foreground text-xs">
              {`Joined ${formatDistanceToNowStrict(
                new Date(user?.createdAt || Date.now())
              )}`}
            </span>
          </div>
        </div>
      </div>
      <Button
        onClick={() => router.push(`user/${currentUser?.id}/chat/${user?.id}`)}
        variant="default"
        className="block justify-self-end"
      >
        Chat
      </Button>
    </Card>
  )
}

export default AvatarBox
