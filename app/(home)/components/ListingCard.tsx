"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Listing, User } from "@prisma/client"
import { formatDistanceToNowStrict, isPast } from "date-fns"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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
import { Icons } from "@/components/Icons"

interface ListingCardProps {
  listing: Listing & { user: User }
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const isFavorite = false
  const router = useRouter()
  return (
    <Card className="h-[50vh] sm:h-[42vh] md:h-[40vh] xl:h-[35vh] w-full flex flex-col border-none px-1">
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
            className="cursor-pointer text-md text-foreground/80"
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
        <div className="relative w-full h-full mb-1">
          <Image
            onClick={() => router.push(`/listings/${listing.id}`)}
            className="object-cover object-center rounded-md cursor-pointer"
            src={listing.images[0]}
            alt={listing.title}
            fill
          />
        </div>
        <CardDescription
          onClick={() => router.push(`/listings/${listing.id}`)}
          className="text-md font-base text-foreground cursor-pointer text-ellipsis"
        >
          {listing.title}
        </CardDescription>
        <CardDescription className="text-xl font-bold text-foreground">
          {`$ ${listing.price}`}
          <span className="text-xs font-light">/month</span>
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-row gap-y-1 justify-between items-center p-2">
        <div className="p-0 m-0 flex flex-row gap-x-1 items-center">
          <Icons.heart
            className="h-4 w-4 cursor-pointer"
            fill={isFavorite ? "pink" : "none"}
            stroke={isFavorite ? "pink" : "currentColor"}
          />
          <span>11</span>
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
