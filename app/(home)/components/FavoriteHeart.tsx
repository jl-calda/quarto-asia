import React, { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Listing, User } from "@prisma/client"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/Icons"
import useFavorite from "@/app/hooks/useFavorite"

interface FavoriteHeartProps {
  currentUser: User | null
  listing: Listing & { user: User }
}

const FavoriteHeart: React.FC<FavoriteHeartProps> = ({
  currentUser,
  listing,
}) => {
  const { hasFavorited, toggleFavorite, numberOfFavorites } = useFavorite({
    listingId: listing.id,
    currentUser: currentUser,
  })

  const { toast } = useToast()
  const router = useRouter()

  return (
    <div className="p-0 m-0 flex flex-row gap-x-1 items-center">
      <Button
        variant="ghost"
        className="m-0 p-0 rounded-full w-auto h-auto"
        onClick={toggleFavorite}
      >
        <Icons.heart
          className="h-4 w-4 cursor-pointer"
          fill={hasFavorited ? "pink" : "none"}
          stroke={hasFavorited ? "pink" : "currentColor"}
        />
      </Button>
      <span className="text-xs">
        {numberOfFavorites === 0 ? "" : numberOfFavorites}
      </span>
    </div>
  )
}

export default FavoriteHeart
