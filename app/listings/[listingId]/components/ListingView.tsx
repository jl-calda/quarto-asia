"use client"

import { get } from "http"
import React, { useEffect, useMemo, useState } from "react"
import { Listing, User } from "@prisma/client"
import { formatDistance } from "date-fns"
import { getCenter, getDistance } from "geolib"
import { GeolibInputCoordinates, UserInputCoordinates } from "geolib/es/types"

import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/Icons"

import AvatarBox from "./AvatarBox"
import ImageCarousel from "./ImageCarousel"
import Map from "./Map"

interface ListingViewProps {
  currentUser: User | null
  listing: Listing & {
    user: User
  }
}
export type LocationType = {
  latitude: number
  longitude: number
}

const ListingView: React.FC<ListingViewProps> = ({ listing, currentUser }) => {
  const listingLocation: LocationType = {
    latitude: listing.latitude,
    longitude: listing.longitude,
  }

  const [userLocation, setUserLocation] = useState<LocationType | null>(null)

  useEffect(() => {
    const getLocation = () =>
      window.navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      })
    getLocation()
  }, [])

  const distance = useMemo(() => {
    if (!userLocation) return null
    return getDistance(userLocation, listingLocation) / 1000
  }, [userLocation, listingLocation])

  const transformedLocation = listing.location
    ?.split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="border-none mb-6">
      <div className="h-[52vh] w-full mb-6">
        <ImageCarousel
          images={listing.images}
          listingId={listing.id}
          currentUser={currentUser}
        />
      </div>
      <div className="flex flex-col sm:grid sm:grid-rows-1 gap-y-4 sm:grid-cols-4 mb-6">
        <div className="sm:col-span-2  flex flex-col gap-y-1 place-content-start mb-2">
          <div className="text-xl text-card-foreground/90">{listing.title}</div>
          <div className="text-xl font-bold text-card-foreground">
            {`S$ ${listing.price}`}
            <span className="text-sm font-light text-muted-foreground">
              /month
            </span>
          </div>
          <div>
            <span className="text-sm text-muted-foreground font-light">
              posted {formatDistance(new Date(), new Date(listing.createdAt))}{" "}
              ago
            </span>
          </div>
        </div>
        <div className="h-full w-full sm:col-start-4">
          <div className="sm:hidden flex items-center mb-4">
            <h3 className="text-xl font-semibold">Posted by</h3>
            <Separator className="w-auto flex-1 mx-4" />
          </div>
          <AvatarBox user={listing.user} currentUser={currentUser} />
        </div>
      </div>
      <div className="flex flex-col sm:grid gap-y-4 sm:grid-rows-1 sm:grid-cols-2 gap-x-10 sm:min-h-[35vh]">
        <div className="flex flex-col gap-y-2 mb-2 sm:mb-0 h-[30vh] sm:h-auto">
          <div className="flex items-center mb-4">
            <h3 className="text-xl font-semibold">Location</h3>
            <Separator className="w-auto flex-1 mx-4" />
          </div>
          <div className="flex flex-row items-center">
            <Icons.mapPin className="w-4 h-4 mr-2" />
            <span>{transformedLocation}</span>
          </div>
          <div className="flex flex-row items-center">
            <Icons.ruler className="w-4 h-4 mr-2" />
            <span>{distance} km away</span>
          </div>
          <div></div>
          <div className="pr-8 flex-1">
            <Map
              listingLocation={listingLocation}
              location={transformedLocation}
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center mb-4">
            <h3 className="text-xl font-semibold">Description</h3>
            <Separator className="w-auto flex-1 mx-4" />
          </div>
          <div className="mb-4">
            <p className="text-card-foreground/90">{listing.description}</p>
          </div>
          <div className="flex flex-row items-center">
            <Icons.houseTenants className="w-4 h-4 mr-2" />
            <p className="text-card-foreground/90">{listing.house}</p>
          </div>
          <div className="flex flex-row items-center">
            <Icons.bed className="w-4 h-4 mr-2" />
            <p className="text-card-foreground/90">{listing.room}</p>
          </div>
          <div className="flex flex-row items-center">
            <Icons.people className="w-4 h-4 mr-2" />
            <p className="text-card-foreground/90">
              {`
              ${listing.tenants} ${
                listing.tenants || 0 > 1 ? "tenants" : "tenant"
              }`}
            </p>
          </div>
          <div className="flex flex-row items-center">
            {listing.roommates || 0 > 1 ? (
              <Icons.bedDouble className="w-4 h-4 mr-2" />
            ) : (
              <Icons.bedSingle className="w-4 h-4 mr-2" />
            )}
            {listing.roommates || 0 > 1 ? (
              <p>Sharing room</p>
            ) : (
              <p>Solo room</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingView
