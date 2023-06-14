"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { Listing, User } from "@prisma/client"
import { DialogContent } from "@radix-ui/react-dialog"
import axios from "axios"
import { formatDistanceToNowStrict, isPast, set } from "date-fns"
import getDistance from "geolib/es/getDistance"
import { GeolibInputCoordinates } from "geolib/es/types"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
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
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/Icons"
import getLocation from "@/app/actions/getLocation"

interface ListingCardProps {
  listing: Listing & { user: User }
  currentUser: User | null
  noFooter?: boolean
  editable?: boolean
  forFavorite?: boolean
  // userLocation?: GeolibInputCoordinates | null
}

const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  currentUser,
  noFooter,
  editable,
  forFavorite,
  // userLocation,
}) => {
  const isFavorite = currentUser
    ? listing?.user?.favoriteIds?.includes(currentUser?.id)
    : false
  const router = useRouter()
  const params = useParams()
  const { userId } = params
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)
  const [userLocation, setUserLocation] =
    useState<GeolibInputCoordinates | null>(null)

  useEffect(() => {
    const location = () =>
      window.navigator.geolocation.getCurrentPosition((position) =>
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      )
    location()
  }, [])

  const distanceFromUser = useMemo(() => {
    if (!userLocation) return null
    return (
      getDistance(userLocation, {
        latitude: listing.latitude,
        longitude: listing.longitude,
      }) / 1000
    )
  }, [userLocation, listing.latitude, listing.longitude])

  const handleDelete = () => {
    setLoading(true)
    axios
      .delete(`/api/post/delete/${listing.id}`)
      .then(() => {
        toast({
          title: "Success",
          description: "Listing deleted",
        })
      })
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
    <AlertDialog>
      <Card className="relative hover:shadow-md w-full h-auto flex flex-col border-none px-1">
        <CardHeader className="flex flex-row items-center gap-x-2 p-2">
          <Avatar
            onClick={() => router.push(`/user/${listing.user.id}`)}
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
        <CardContent className="h-72 sm:h-82 flex flex-col space-y-1 p-2">
          <div className="relative w-full h-full mb-4">
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

        {!noFooter && (
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
        )}
        {editable && !forFavorite && currentUser?.id === userId && (
          <div className="absolute top-0 right-0 p-2 flex flex-row items-start gap-x-2">
            <TooltipProvider>
              <Tooltip>
                <div className="relative">
                  <TooltipTrigger>
                    <Icons.closeCircle className="absolute top-0 -left-4 h-4 w-4 hover:scale-95 transition duration-150 hover:text-muted-foreground" />
                  </TooltipTrigger>
                  <AlertDialogTrigger className="h-auto">
                    <Icons.closeCircle className="absolute top-0 -left-4 h-4 w-4 hover:scale-95 transition duration-150 hover:text-muted-foreground" />
                  </AlertDialogTrigger>
                </div>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Icons.edit
                      onClick={() =>
                        router.push(
                          `user/${currentUser.id}/listings/${listing.id}`
                        )
                      }
                      className="h-4 w-4 hover:scale-95 transition duration-150 hover:text-muted-foreground"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        )}
      </Card>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm deletion?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={handleDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ListingCard
