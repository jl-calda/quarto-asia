import prisma from "@/app/libs/prismadb"

export default async function getListingByUserId(userId: string) {
  try {
    const listing = await prisma.listing.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
      },
    })

    // const listing = await prisma.user.findUnique({
    //   where: {
    //     id: userId,
    //   },
    //   include: {
    //     listings: true,
    //   },
    // })

    return listing
  } catch (error) {
    console.log(error)
  }
}
