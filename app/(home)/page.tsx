import { useRef } from "react"
import Link from "next/link"
import { List } from "lucide-react"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import DemoCreateAccount from "@/components/navbar/dialogs/RegisterContent"

import getCurrentUser from "../actions/getCurrentUser"
import getListings, { IListingParams } from "../actions/getListings"
import ListingCard from "./components/ListingCard"

const HomePage = async ({ searchParams }: { searchParams: IListingParams }) => {
  const listings = await getListings(searchParams)
  const currentUser = await getCurrentUser()
  return (
    <section className="container pt-6 pb-16 px-2 sm:px-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Latest listings</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-6">
        {listings?.map((listing) => (
          <ListingCard
            key={crypto.randomUUID()}
            listing={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </section>
    // <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
    //   <div className="flex max-w-[980px] flex-col items-start gap-2">
    //     {/* <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
    //       Beautifully designed components <br className="hidden sm:inline" />
    //       built with Radix UI and Tailwind CSS.
    //     </h1>
    //     <p className="max-w-[700px] text-lg text-muted-foreground">
    //       Accessible and customizable components that you can copy and paste
    //       into your apps. Free. Open Source. And Next.js 13 Ready.
    //     </p>
    //   </div>
    //   <div className="flex gap-4">
    //     <Link
    //       href={siteConfig.links.docs}
    //       target="_blank"
    //       rel="noreferrer"
    //       className={buttonVariants()}
    //     >
    //       Documentation
    //     </Link>
    //     <Link
    //       target="_blank"
    //       rel="noreferrer"
    //       href={siteConfig.links.github}
    //       className={buttonVariants({ variant: "outline" })}
    //     >
    //       GitHub
    //     </Link> */}
    //   </div>
    // </section>
  )
}

export default HomePage
