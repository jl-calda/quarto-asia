import React from "react"
import { Avatar } from "@radix-ui/react-avatar"

import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import getListingById from "@/app/actions/getListingById"

import AvatarBox from "./components/AvatarBox"
import ListingView from "./components/ListingView"

interface ListingPageParams {
  listingId: string
}

const ListingPage = async ({
  params: { listingId },
}: {
  params: ListingPageParams
}) => {
  const listing = await getListingById(listingId)
  return (
    <section className="container pt-6 pb-16 px-2 sm:px-8">
      <ListingView listing={listing} />
    </section>
  )
}

export default ListingPage
