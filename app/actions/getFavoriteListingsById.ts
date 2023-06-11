import prisma from "@/app/libs/prismadb"

export default async function getFavoriteListingsById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    const listing = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(user?.favoriteIds || [])],
        },
      },
      include: {
        user: true,
      },
    })

    console.log(listing, "listing")
    return listing
  } catch (error) {
    console.log(error)
  }
}
