import React from "react"
import { List } from "lucide-react"

import ImageUpload from "./components/ImageUpload"
import ListingForm from "./components/ListingForm"

type Props = {}

const PostPage = (props: Props) => {
  return (
    <div className="container space-y-6 pt-6 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">List a room</h2>
        <p className="text-muted-foreground">
          Fill out the form below to list your room
        </p>
      </div>

      <div className="w-full">
        {/* <ImageUpload /> */}
        <ListingForm />
      </div>
    </div>
  )
}

export default PostPage
