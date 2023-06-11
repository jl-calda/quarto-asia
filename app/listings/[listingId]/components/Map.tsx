"use client"

// import Image from "next/image"
import L from "leaflet"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"

import "leaflet/dist/leaflet.css"
import { useEffect, useMemo, useState } from "react"
import { getCenter } from "geolib"
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
})

interface MapProps {
  listingLocation: {
    latitude: number
    longitude: number
  }
  location: string
}
const Map: React.FC<MapProps> = ({ listingLocation, location }) => {
  const [loading, setLoading] = useState(true)
  const [userLocation, setUserLocation] = useState<{
    latitude: number
    longitude: number
  } | null>(null)

  useEffect(() => {
    const getLocation = () => setLoading(true)
    window.navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    })
    getLocation()
    setLoading(false)
  }, [listingLocation, location, loading])

  const center = useMemo(() => {
    if (!userLocation)
      return [listingLocation.latitude, listingLocation.longitude]
    const getCenterCoord = () => getCenter([userLocation, listingLocation])
    const centerCoord = getCenterCoord()
    if (centerCoord) {
      return [centerCoord.latitude, centerCoord.longitude]
    }
  }, [
    userLocation?.latitude,
    userLocation?.longitude,
    listingLocation.latitude,
    listingLocation.longitude,
  ])

  return (
    <MapContainer
      center={center as L.LatLngExpression}
      zoom={13}
      scrollWheelZoom={false}
      className="h-full rounded-md z-10"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        title={location}
        riseOnHover
        position={
          [
            listingLocation.latitude,
            listingLocation.longitude,
          ] as L.LatLngExpression
        }
      >
        <Popup>{location}</Popup>
      </Marker>
      {userLocation && (
        <Marker
          title={location}
          riseOnHover
          position={
            [
              userLocation.latitude,
              userLocation.longitude,
            ] as L.LatLngExpression
          }
        >
          <Popup>{location}</Popup>
        </Marker>
      )}
    </MapContainer>
  )
}

export default Map
