"use client"

import { useEffect, useState } from "react"

import ListingSearch from "./ListingSearch"
import LocationSearch from "./LocationSearch"

type Props = {}

const Searchbar = () => {
  const [coord, setCoord] = useState([0, 0])

  useEffect(() => {
    const location = () =>
      window.navigator.geolocation.getCurrentPosition((position) =>
        setCoord([position.coords.latitude, position.coords.longitude])
      )
    location()
  }, [])

  console.log(coord, "location")
  return (
    <div className="sticky top-[65px] z-40 w-full border-b bg-background">
      <div className="container flex items-center space-x-4 sm:justify-between sm:space-x-0 px-2 sm:px-8">
        <ListingSearch />
        {/* <LocationSearch /> */}
      </div>
    </div>
  )
}

export default Searchbar
