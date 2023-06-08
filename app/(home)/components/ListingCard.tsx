"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Listing, User } from "@prisma/client"
import axios from "axios"
import { formatDistanceToNowStrict, isPast } from "date-fns"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/Icons"

interface ListingCardProps {
  listing: Listing & { user: User }
  currentUser: User | null
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, currentUser }) => {
  const isFavorite = currentUser
    ? listing?.user?.favoriteIds?.includes(currentUser?.id)
    : false
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

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
    <Card className="h-[50vh] sm:h-[42vh] md:h-[40vh] xl:h-[40vh] w-full flex flex-col border-none px-1">
      <CardHeader className="flex flex-row items-center gap-x-2 p-2">
        <Avatar
          onClick={() => router.push(`/users/${listing.user.id}`)}
          className="cursor-pointer"
        >
          <AvatarImage src={listing?.user?.image || undefined} />
          <AvatarFallback>
            {listing?.user?.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-y-0.5">
          <CardTitle
            className="cursor-pointer text-base text-foreground/80"
            onClick={() => router.push(`/users/${listing.user.id}`)}
          >
            {listing.user.name}
          </CardTitle>
          <CardDescription className="text-xs">
            {`${formatDistanceToNowStrict(new Date(listing.createdAt))} ago`}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1 h-full flex flex-col space-y-1 p-2">
        <div className="relative w-full min-h-[55%] mb-4">
          <Image
            onClick={() => router.push(`/listings/${listing.id}`)}
            className="object-cover object-center rounded-md cursor-pointer"
            src={listing.images[0]}
            alt={listing.title}
            fill
          />
        </div>
        <div className="grid grid-rows-3">
          <CardDescription
            onClick={() => router.push(`/listings/${listing.id}`)}
            className="text-md font-base text-foreground cursor-pointer text-ellipsis row-span-2"
          >
            {listing.title}
          </CardDescription>
          <CardDescription className="text-base font-bold text-foreground">
            {`$ ${listing.price}`}
            <span className="text-xs font-light">/month</span>
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row gap-y-1 justify-between items-center p-2">
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
          <span>{11}</span>
        </div>
        <div className="flex flex-row items-center gap-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant="secondary"
                  className="flex flex-row gap-x-1 items-center h-6"
                >
                  {!isPast(new Date(listing.availability)) && (
                    <span className="font-light">{`${
                      formatDistanceToNowStrict(
                        new Date(listing.availability)
                      ).split(" ")[0]
                    }`}</span>
                  )}

                  {isPast(new Date(listing.availability)) ? (
                    <Icons.calendarCheck className="h-3 w-3" />
                  ) : (
                    <Icons.calendar className="h-3 w-3" />
                  )}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                {isPast(new Date(listing.availability)) ? (
                  <p>Available now</p>
                ) : (
                  <p>{`Available in ${formatDistanceToNowStrict(
                    new Date(listing.availability)
                  )}`}</p>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant="secondary"
                  className="flex flex-row gap-x-1 items-center h-6"
                >
                  <span className="font-light">{listing.tenants}</span>
                  <Icons.people className="h-3 w-3" />
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{`${listing.tenants} ${
                  listing.tenants > 1 ? "tenants" : "tenant"
                } in the unit.`}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant="secondary"
                  className="flex flex-row gap-x-2 items-center h-6"
                >
                  {/* <span>{listing.roommates}</span> */}
                  {listing.roommates > 1 ? (
                    <Icons.bedDouble className="h-3 w-3" />
                  ) : (
                    <Icons.bedSingle className="h-3 w-3" />
                  )}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{`${
                  listing.roommates > 1 ? "Sharing room" : "Solo room"
                }`}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ListingCard
