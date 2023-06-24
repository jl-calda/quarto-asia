import { NextResponse } from "next/server"

import prisma from "@/app/libs/prismadb"

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await request.json()
    const { name, contactNo, description } = body
    console.log(body, "body")
    console.log(params.userId)

    const user = await prisma.user.findUnique({
      where: {
        id: params.userId,
      },
    })

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: params.userId,
      },
      data: {
        name: name || user.name,
        contactNo: contactNo || user.contactNo,
        description: description || user.description,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (e) {
    console.log(e)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
