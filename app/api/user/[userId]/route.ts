import { NextResponse } from "next/server"

import prisma from "@/app/libs/prismadb"

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  console.log(params, "checking")

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: params.userId,
      },
    })

    return NextResponse.json(user)
  } catch (e) {
    console.log(e)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
