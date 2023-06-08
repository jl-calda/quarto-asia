"use client"

// import Image from "next/image"
import L from "leaflet"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"

import "leaflet/dist/leaflet.css"
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
  latitude: number
  longitude: number
  location: string
}
const Map: React.FC<MapProps> = ({ latitude, longitude, location }) => {
  const center = [latitude, longitude]
  return (
    <MapContainer
      center={center as L.LatLngExpression}
      zoom={15}
      scrollWheelZoom={false}
      className="h-full rounded-md z-10"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center as L.LatLngExpression}>
        <Popup>{location}</Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map
