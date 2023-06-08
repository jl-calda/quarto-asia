import prisma from "@/app/libs/prismadb"

export default async function getOtherListings(listingId: string) {
  try {
    const listings = await prisma.listing.findMany({
      where: {
        id: {
          not: listingId,
        },
      },
      include: {
        user: true,
      },
    })

    return listings
  } catch (error) {
    console.log(error)
  }
}
