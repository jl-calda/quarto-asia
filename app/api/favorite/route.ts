import { NextResponse } from "next/server"

import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    const body = await request.json()
    const { listingId } = body

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    const isFavorite = currentUser.favoriteIds.includes(listingId)

    const newFavoriteIds = isFavorite
      ? currentUser.favoriteIds.filter((id) => id !== listingId)
      : [...currentUser.favoriteIds, listingId]

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds: newFavoriteIds,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (e) {
    console.log(e)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
