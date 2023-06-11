import { NextResponse } from "next/server"

import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"

export async function DELETE(
  request: Request,
  { params }: { params: { listingId: string } }
) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const deletedListing = await prisma.listing.deleteMany({
      where: {
        id: params.listingId,
        userId: currentUser.id,
      },
    })

    return NextResponse.json(deletedListing)
  } catch (e) {
    console.log(e)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
