import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

import prisma from "@/app/libs/prismadb"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, password } = body

    if (!email || !name || !password) {
      return new NextResponse("Missing information", { status: 400 })
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    })

    if (userExists) {
      return new NextResponse("User already exists", { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    })
    return NextResponse.json(user)
  } catch (e) {
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
