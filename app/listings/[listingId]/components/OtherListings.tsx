import React from "react"
import { Listing, User } from "@prisma/client"

import { Separator } from "@/components/ui/separator"
import ListingCard from "@/app/(home)/components/ListingCard"

interface OtherListingProps {
  listings: (Listing & { user: User })[]
  currentUser: User | null
}

const OtherListings: React.FC<OtherListingProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <h3 className="text-xl font-semibold">Other Listings</h3>
        <Separator className="w-auto flex-1 mx-4" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-4">
        {listings.map((listing) => (
          <ListingCard
            noFooter
            key={crypto.randomUUID()}
            listing={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  )
}

export default OtherListings
