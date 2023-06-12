import React from "react"

import { Separator } from "@/components/ui/separator"
import ListingCard from "@/app/(home)/components/ListingCard"
import getCurrentUser from "@/app/actions/getCurrentUser"
import getFavoriteListingsById from "@/app/actions/getFavoriteListingsById"
import getListingByUserId from "@/app/actions/getListingsByUserId"
import getUserById from "@/app/actions/getUserById"

interface ListingsPageParams {
  userId: string
}

const ListingsPage = async ({ params }: { params: ListingsPageParams }) => {
  const { userId } = params
  const currentUser = await getCurrentUser()
  const user = await getUserById(params.userId)
  const listingsByUser = await getListingByUserId(params.userId)

  return (
    <div className="w-full h-full flex flex-col gap-y-4 mt-8">
      <div className="flex items-center mb-2">
        <h3 className="text-xl font-semibold">Listings</h3>
        <Separator className="w-auto flex-1 mx-4" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4">
        {listingsByUser?.map((listing) => (
          <ListingCard
            key={crypto.randomUUID()}
            listing={listing}
            currentUser={currentUser}
            editable
            noFooter
          />
        ))}
      </div>
    </div>
  )
}

export default ListingsPage
