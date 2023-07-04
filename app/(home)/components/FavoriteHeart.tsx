import React, { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Listing, User } from "@prisma/client"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/Icons"

interface FavoriteHeartProps {
  currentUser: User | null
  listing: Listing & { user: User }
}

const FavoriteHeart: React.FC<FavoriteHeartProps> = ({
  currentUser,
  listing,
}) => {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const isFavorite = useMemo(
    () =>
      currentUser
        ? listing?.user?.favoriteIds?.includes(currentUser?.id)
        : false,
    []
  )

  const handleFavorite = () => {
    setLoading(true)
    axios
      .post(`/api/favorite`, { listingId: listing.id })
      .then(() =>
        isFavorite
          ? toast({
              title: "Success",
              description: "Listing removed from favorites",
            })
          : toast({
              title: "Success",
              description: "Listing added from favorites",
            })
      )
      .then(() => router.refresh())
      .catch((error: any) =>
        toast({
          title: "Something went wrong",
          description: error.message,
          variant: "destructive",
        })
      )
      .finally(() => setLoading(false))
  }
  return (
    <div className="p-0 m-0 flex flex-row gap-x-1 items-center">
      <Button
        variant="ghost"
        className="m-0 p-0 rounded-full w-auto h-auto"
        onClick={handleFavorite}
      >
        <Icons.heart
          className="h-4 w-4 cursor-pointer"
          fill={isFavorite ? "pink" : "none"}
          stroke={isFavorite ? "pink" : "currentColor"}
        />
      </Button>
      <span>{}</span>
    </div>
  )
}

export default FavoriteHeart
