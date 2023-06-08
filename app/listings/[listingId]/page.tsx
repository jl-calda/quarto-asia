import React from "react"
import { Avatar } from "@radix-ui/react-avatar"

import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import getCurrentUser from "@/app/actions/getCurrentUser"
import getListingById from "@/app/actions/getListingById"
import getOtherListings from "@/app/actions/getOtherListings"

import AvatarBox from "./components/AvatarBox"
import ListingView from "./components/ListingView"
import OtherListings from "./components/OtherListings"

interface ListingPageParams {
  listingId: string
}

const ListingPage = async ({
  params: { listingId },
}: {
  params: ListingPageParams
}) => {
  const currentUser = await getCurrentUser()
  const listing = await getListingById(listingId)
  const otherListngs = await getOtherListings(listingId)
  if (!listing) {
    return <div>Listing not found</div>
  }

  return (
    <section className="container pt-6 sm:pt-12 pb-16 px-2 sm:px-8 max-w-4xl">
      <ListingView currentUser={currentUser || null} listing={listing} />
      {otherListngs && (
        <OtherListings listings={otherListngs} currentUser={currentUser} />
      )}
    </section>
  )
}

export default ListingPage
