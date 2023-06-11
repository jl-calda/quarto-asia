import { get } from "http"
import { use } from "react"

import prisma from "@/app/libs/prismadb"

import getSession from "./getSession"

const getUserById = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      return null
    }

    return user
  } catch (error: any) {
    return null
  }
}

export default getUserById
