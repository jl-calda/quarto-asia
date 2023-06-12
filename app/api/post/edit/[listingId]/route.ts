import { NextResponse } from "next/server"

import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"

export async function POST(
  request: Request,
  { params }: { params: { listingId: string } }
) {
  try {
    const currentUser = await getCurrentUser()
    const body = await request.json()

    console.log(body)
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    console.log("running")
    const updateListing = await prisma.listing.updateMany({
      where: {
        id: params.listingId,
        userId: currentUser.id,
      },
      data: {
        ...body,
        userId: currentUser.id,
      },
    })

    const updatedListing = await prisma.listing.findUnique({
      where: {
        id: params.listingId,
      },
      include: {
        user: true,
      },
    })

    return NextResponse.json(updatedListing)
  } catch (e) {
    console.log(e)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
