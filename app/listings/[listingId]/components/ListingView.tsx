import React from "react"
import { Listing, User } from "@prisma/client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import AvatarBox from "./AvatarBox"
import ImageCarousel from "./ImageCarousel"
import Map from "./Map"

interface ListingViewProps {
  listing:
    | (Listing & {
        user: User
      })
    | null
    | undefined
}

const ListingView: React.FC<ListingViewProps> = ({ listing }) => {
  return (
    <Card>
      <CardContent className="h-[50vh] pt-6">
        <ImageCarousel images={listing?.images} />
      </CardContent>
      <CardHeader>
        <div className="grid grid-cols-1 sm:grid-cols-4 items-center">
          <div className="col-span-3 flex flex-col gap-y-1">
            <CardTitle className="text-xl text-card-foreground/90">
              {listing?.title}
            </CardTitle>
            <CardDescription className="text-xl font-bold text-card-foreground">
              {`$ ${listing?.price}`}
              <span className="text-sm">/month</span>
            </CardDescription>
            <CardDescription className="">{listing?.location}</CardDescription>
          </div>
          <div className="hidden sm:block w-full">
            <AvatarBox user={listing?.user} />
          </div>
        </div>
      </CardHeader>
      {listing && <Map location={listing?.location} />}
    </Card>
  )
}

export default ListingView
