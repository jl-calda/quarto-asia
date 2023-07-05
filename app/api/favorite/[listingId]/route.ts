import { NextResponse } from "next/server"

import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"

interface IParams {
  listingId?: string
}

export async function POST(request: Request, { params }: { params: IParams }) {
  console.log("POST", params)
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { listingId } = params

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid listing id")
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])]
  favoriteIds.push(listingId)
  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  })

  const currentListing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
  })

  if (!currentListing) {
    throw new Error("Invalid listing id")
  }
  let favoriteUserIds = [...(currentListing.favoriteUserIds || [])]

  const updatedListing = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      favoriteUserIds: [...favoriteUserIds, currentUser.id],
    },
  })

  return NextResponse.json({ user: user, listing: updatedListing })
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { listingId } = params

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid listing id")
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])]

  favoriteIds = favoriteIds.filter((id) => id !== listingId)

  const currentListing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
  })

  if (!currentListing) {
    throw new Error("Invalid listing id")
  }
  let favoriteUserIds = [...(currentListing.favoriteUserIds || [])]

  favoriteUserIds = favoriteUserIds.filter((id) => id !== currentUser.id)

  const updatedListing = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      favoriteUserIds,
    },
  })

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  })

  return NextResponse.json({ user: user, listing: updatedListing })
}

export async function GET(request: Request, { params }: { params: IParams }) {
  const { listingId } = params

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid listing id")
  }

  const listing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
  })

  return NextResponse.json(listing)
}
