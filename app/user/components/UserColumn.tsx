"use client"

import React, { useEffect, useState } from "react"
import { useParams, usePathname, useRouter } from "next/navigation"
import { User } from "@prisma/client"
import { AvatarFallback } from "@radix-ui/react-avatar"
import axios from "axios"
import { formatDistanceToNowStrict } from "date-fns"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/Icons"

interface UserColumnProps {
  currentUser: User | null
}

const UserColumn: React.FC<UserColumnProps> = ({ currentUser }) => {
  const params = useParams()
  const pathName = usePathname()
  const { userId } = params
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    axios.get(`/api/user/${userId}`).then((res) => setUser(res.data))
  }, [userId])

  if (!user) return null

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <Card className="mt-4 sm:mt-24 w-full sm:w-64">
      <CardHeader className="flex flex-row gap-x-6 items-center">
        <div className="sm:hidden">
          <Avatar className="w-16 h-16 sm:h-36 sm:w-36 rounded-full">
            <AvatarImage src={user?.image || undefined} />
            <AvatarFallback className="text-6xl">
              {initials?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col gap-y-2">
          <CardTitle className="text-xl sm:text-3xl">{user.name}</CardTitle>
          <CardDescription className="flex flex-row items-center">
            <Icons.calendar className="mr-2 text-xs" />
            {`Joined ${formatDistanceToNowStrict(new Date(user?.createdAt))}`}
          </CardDescription>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="">
        <div className="flex flex-col"></div>
      </CardContent>

      {currentUser?.id !== user.id && (
        <>
          <Separator />
          <CardFooter className="pt-6">
            <Button
              onClick={() =>
                router.push(`/user/${currentUser?.id}/chats/${userId}`)
              }
              className="w-full"
              variant="default"
            >
              Chat
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  )
}

export default UserColumn
