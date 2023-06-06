import { NextResponse } from "next/server"

import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    const body = await request.json()

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const newListing = await prisma.listing.create({
      data: {
        ...body,
        userid: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        user: true,
      },
    })

    return new NextResponse(JSON.stringify(newListing))
  } catch (e) {
    console.log(e)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
