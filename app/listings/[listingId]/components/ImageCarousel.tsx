"use client"

import React, { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { User } from "@prisma/client"
import axios from "axios"
import { set } from "date-fns"
import { is } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/Icons"

interface ImageCarouselProps {
  images: string[]
  listingId: string
  currentUser: User | null
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  listingId,
  currentUser,
}) => {
  const isFavorite = currentUser?.favoriteIds?.includes(listingId)
  console.log(isFavorite)
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [activeIndex, setActiveIndex] = React.useState(0)

  const handleFavorite = () => {
    setLoading(true)

    if (!currentUser) {
      return toast({
        title: "Unauthorized",
        description: "You must be logged in to favorite a listing",
      })
    }

    axios
      .post(`/api/favorite`, { listingId })
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

  if (!images) {
    return null
  }

  const onNext = () => {
    if (activeIndex === images.length - 1) {
      setActiveIndex(0)
      return
    } else {
      setActiveIndex(activeIndex + 1)
    }
  }
  const onPrevious = () => {
    if (activeIndex === 0) {
      setActiveIndex(images.length - 1)
      return
    } else {
      setActiveIndex(activeIndex - 1)
    }
  }

  return (
    <Dialog>
      <div className="w-full h-full flex flex-col gap-y-2">
        <div className="relative w-full h-full">
          <DialogTrigger>
            <Image
              src={images[activeIndex]}
              fill
              className="object-cover object-center rounded-md ease-linear transition-all duration-150"
              alt="Listing image"
            />
          </DialogTrigger>
          <Button
            onClick={handleFavorite}
            variant="ghost"
            className="p-0 m-0 bg-clip-content"
          >
            <Icons.heart
              color={isFavorite ? "pink" : "white"}
              className="absolute top-3 right-3 w-6 h-6 stroke-2 hover:opacity-110"
              fill={isFavorite ? "pink" : "white"}
              stroke={isFavorite ? "pink" : "white"}
            />
          </Button>
          {images.length > 1 && (
            <div className="absolute inset-y-1/2 w-full flex flex-row justify-between px-2">
              <Button
                className="rounded-full h-12 w-12 opacity-70 p-0 m-0"
                variant="secondary"
                onClick={onPrevious}
              >
                <Icons.chevronLeft className="w-6 h-6" />
              </Button>

              <Button
                className="rounded-full h-12 w-12 opacity-70 p-0 m-0"
                variant="secondary"
                onClick={onNext}
              >
                <Icons.chevronRight className="w-6 h-6" />
              </Button>
            </div>
          )}
        </div>
        {images.length > 1 && (
          <div className="flex flex-row space-x-2 items-center justify-center">
            {images.map((image, i) => (
              <Image
                key={crypto.randomUUID()}
                src={image}
                onClick={() => setActiveIndex(i)}
                width={40}
                height={40}
                className={`cursor-pointer object-cover object-center ease-linear transition-all duration-150 ${
                  i === activeIndex ? "opacity-100" : "opacity-50"
                }`}
                alt="Listing image"
              />
            ))}
          </div>
        )}
      </div>
      <DialogContent className="max-w-6xl h-[80%] p-8">
        <div className="relative w-full h-full">
          <Image
            fill
            src={images[activeIndex]}
            className="object-cover object-center rounded-md ease-linear transition-all duration-150"
            alt="Listing image"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ImageCarousel
