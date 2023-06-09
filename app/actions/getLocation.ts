"use client"

import { GeolibInputCoordinates } from "geolib/es/types"

export default function getLocation() {
  try {
    let coord: GeolibInputCoordinates = { latitude: 0, longitude: 0 }

    const location = () =>
      window.navigator.geolocation.getCurrentPosition(
        (position) =>
          (coord = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
      )
    location()

    return coord
  } catch (error) {
    console.log(error)
    return null
  }
}
