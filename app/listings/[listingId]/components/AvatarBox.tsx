import React from "react"
import { User } from "@prisma/client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface AvatarBoxProps {
  user: User | undefined
}

const AvatarBox: React.FC<AvatarBoxProps> = ({ user }) => {
  return (
    <Card className="flex flex-col gap-y-2 p-2 w-full">
      <div className="flex flex-row gap-x-2 items-center">
        <Avatar>
          <AvatarImage src={user?.image || undefined} />
          <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <span className="font-semibold">{user?.name}</span>
        </div>
      </div>
      <Button variant="default">Chat</Button>
    </Card>
  )
}

export default AvatarBox
