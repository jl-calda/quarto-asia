import React from "react"

import { Separator } from "@/components/ui/separator"
import getListingById from "@/app/actions/getListingById"

import EditListingForm from "./components/EditListingForm"

interface ListingPageParams {
  listingId: string
  userId: string
}

const ListingPage = async ({ params }: { params: ListingPageParams }) => {
  const { listingId, userId } = params
  const currentListing = await getListingById(listingId)

  return (
    <div className="pt-8">
      <div className="flex items-center mb-8">
        <h3 className="text-xl font-semibold">Edit your post</h3>
        <Separator className="w-auto flex-1 mx-4" />
      </div>
      <EditListingForm currentListing={currentListing} />
    </div>
  )
}

export default ListingPage
