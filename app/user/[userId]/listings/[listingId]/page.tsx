import React from "react"

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
      <EditListingForm currentListing={currentListing} />
    </div>
  )
}

export default ListingPage
