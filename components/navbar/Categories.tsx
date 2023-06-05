"use client"

import { on } from "events"
import React, { use, useCallback, useState } from "react"
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation"
import qs from "query-string"

import { Houses, Rooms } from "@/config/navbar"

import { Button } from "../ui/button"

interface ItemProps {
  item: string
  isActive: boolean
  type: "house" | "room"
}

const Item: React.FC<ItemProps> = ({ item, isActive, type }) => {
  const router = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()

  const handleClick = useCallback(() => {
    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any =
      type === "house"
        ? {
            ...currentQuery,
            house: item,
          }
        : {
            ...currentQuery,
            room: item,
          }

    if (params?.get(type) === item) {
      delete updatedQuery[type]
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    )

    router.push(url)
  }, [router, params, item, type])
  return (
    <Button
      variant="ghost"
      className="p-0 m-0 h-auto font-light text-sm hover:font-normal py-1 px-2"
    >
      <li className="cursor-pointer px-2" onClick={handleClick}>
        {item}
      </li>
    </Button>
  )
}
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

  return (
    <div className="hidden flex-col lg:flex">
      <ul className="list-none flex flex-row flex-wrap text-sm space-x-2">
        {houses.map((house) => (
          <Item
            type="house"
            key={crypto.randomUUID()}
            item={house}
            isActive={house === houseParam}
          />
        ))}
      </ul>
      {/* <div className="border-b w-full" /> */}
      <ul className="list-none flex flex-row flex-wrap text-sm space-x-2">
        {rooms.map((room) => (
          <Item
            type="room"
            key={crypto.randomUUID()}
            item={room}
            isActive={room === roomParam}
          />
        ))}
      </ul>
    </div>
  )
}

export default Categories
