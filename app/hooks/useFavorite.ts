import { use, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { User } from "@prisma/client"
import axios from "axios"

import { useToast } from "@/components/ui/use-toast"

interface IUseFavorite {
  listingId: string
  currentUser?: User | null
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter()
  const { toast } = useToast()

  const numberOfFavorites = useMemo(() => {
    return currentUser?.favoriteIds?.length || 0
  }, [currentUser])

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || []
    return list.includes(listingId)
  }, [currentUser, listingId])

  const toggleFavorite = useCallback(
    async (e: any) => {
      e.stopPropagation()
      if (!currentUser) {
      }

      try {
        let request

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorite/${listingId}`)
        } else {
          request = () => axios.post(`/api/favorite/${listingId}`)
        }
        await request()
        router.refresh()
      } catch (error) {
        toast({
          title: "Error",
          description: "Please login to favorite this listing",
        })
      }
    },
    [currentUser, hasFavorited, listingId, router]
  )
  return {
    hasFavorited,
    toggleFavorite,
    numberOfFavorites,
  }
}

export default useFavorite
