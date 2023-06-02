"use client"

import React, { use, useState } from "react"
import { useParams, usePathname } from "next/navigation"

import { Houses, Rooms } from "@/config/navbar"

interface ItemProps {
  item: string
  onClick: () => void
  isActive: boolean
}

const Item: React.FC<ItemProps> = ({ item, onClick, isActive }) => (
  <li className="cursor-pointer px-2" onClick={onClick}>
    {item}
  </li>
)

interface CategoriesProps {
  houses: Houses
  rooms: Rooms
}

const Categories: React.FC<CategoriesProps> = ({ houses, rooms }) => {
  const [houseParam, setHouseParam] = useState<string>("")
  const [roomParam, setRoomParam] = useState<string>("")
  const params = useParams()
  console.log(params)
  const pathName = usePathname()
  const handleClick = () => {
    let currentQuery = {}
    const updatedQuery = {}
  }

  return (
    <div className="hidden flex-col space-y-2 sm:flex">
      <ul className="list-none flex flex-row flex-wrap space-x-2 text-sm">
        {houses.map((house) => (
          <Item
            key={crypto.randomUUID()}
            item={house}
            onClick={handleClick}
            isActive={house === houseParam}
          />
        ))}
      </ul>
      <div className="border-b w-full" />
      <ul className="list-none flex flex-row flex-wrap space-x-2 text-sm">
        {rooms.map((room) => (
          <Item
            key={crypto.randomUUID()}
            item={room}
            onClick={handleClick}
            isActive={room === roomParam}
          />
        ))}
      </ul>
    </div>
  )
}

export default Categories
