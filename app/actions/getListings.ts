import { NextResponse } from "next/server"

import prisma from "@/app/libs/prismadb"

export interface IListingParams {
  house: string
  room: string
  minPrice: string
  maxPrice: string
}

export default async function getListings(params: IListingParams) {
  try {
    const { house, room, minPrice, maxPrice } = params
    let query: any = {}

    if (house) {
      query.house = house
    }

    if (room) {
      query.room = room
    }

    if (minPrice) {
      query.price = {
        gte: parseInt(minPrice),
      }
    }

    if (maxPrice) {
      query.price = {
        lte: parseInt(maxPrice),
      }
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    })
    console.log(`%c${listings}`, "color:blue")

    return listings
  } catch (error) {
    console.log(error)
  }
}
