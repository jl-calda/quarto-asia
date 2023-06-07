"use client"

import L from "leaflet"
import { MapContainer, Marker, TileLayer } from "react-leaflet"

import "leaflet/dist/leaflet.css"
import { use, useEffect, useState } from "react"
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
  location: string
}
const Map: React.FC<MapProps> = ({ location }) => {
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching")
      console.log(location)
      setIsLoading(true)
      const res = await fetch(
        `https://developers.onemap.sg/commonapi/search?searchVal=${
          location.split(" ")[-1]
        }&returnGeom=Y&getAddrDetails=Y&pageNum=1`
      )
        .then((res) => res.json())
        .then((address) => {
          setLng(parseFloat(address.results[0].LONGITUDE))
          setLat(parseFloat(address.results[0].LATITUDE))
        })
        .finally(() => setIsLoading(false))
      console.log("res", res)
    }
    fetchData()
  }, [location])

  return (
    <>
      {!isLoading && (
        // <MapContainer
        //   center={coord || [51, -0.09]}
        //   zoom={coord ? 4 : 2}
        //   scrollWheelZoom={false}
        //   className="h-[35vh] rounded-lg"
        // >
        //   <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        //   {coord && <Marker position={coord as L.LatLngExpression} />}
        // </MapContainer>
        <img
          src={`https://developers.onemap.sg/commonapi/staticmap/getStaticImage?layerchosen=default&lat=${lat}&lng=${lng}&zoom=17&height=512&width=512`}
        />
      )}
    </>
  )
}

export default Map
