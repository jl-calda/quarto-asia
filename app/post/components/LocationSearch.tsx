"use client"

import { on } from "events"
import * as React from "react"
import { useEffect } from "react"
import { CommandList } from "cmdk"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface LocationSearchProps {
  value: string
  onSetValue: (value: string) => void
  onSetLatitude: (value: number) => void
  onSetLongitude: (value: number) => void
}

export type LocationType = {
  ADDRESS: string
  BLK_NO: string
  BUILDING: string
  LATITUDE: string
  LONGITUDE: string
  LONGTITUDE: string
  POSTAL: string
  ROAD_NAME: string
  SEARCHVAL: string
  X: string
  Y: string
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  value,
  onSetValue,
  onSetLatitude,
  onSetLongitude,
}) => {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")
  const [data, setData] = React.useState<LocationType[]>([])

  // console.log("value", value)
  const transformText = (text: string) => {
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  useEffect(() => {
    setLoading(true)
    const getLocation = async () => {
      if (!inputValue) return
      const data = await fetch(
        `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${inputValue}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
      )
        .then((res) => res.json())
        .then((data) => data.results)
        .catch((err) => console.error(err))
        .finally(() => setLoading(false))
      console.log("data", data)
      setData(data)
    }
    getLocation()
  }, [inputValue])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`justify-between w-full text-left h-auto active:outline-none active:ring-2 active:ring-offset-2 active:ring-ring`}
        >
          <span
            className={`font-normal text-ellipsis ${
              value !== "" ? "" : "text-muted-foreground"
            }`}
          >
            {value ? transformText(value) : "What your location..."}
          </span>

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[81vw] sm:w-[40vw]">
        <Command className="w-full">
          <CommandInput
            className="placeholder:text-muted-foreground"
            placeholder="Search location..."
            onValueChange={setInputValue}
          />
          <CommandList>
            {loading && <CommandEmpty>Loading...</CommandEmpty>}
            {data?.length !== 0 && !loading && (
              <>
                {data?.map((address: any) => (
                  <CommandItem
                    className="cursor-pointer"
                    value={address.ADDRESS}
                    key={crypto.randomUUID()}
                    onSelect={(address) => {
                      onSetValue(address)

                      const latitude = data.find(
                        (item: any) => item.ADDRESS === address.toUpperCase()
                      )?.LATITUDE
                      const longitude = data?.find(
                        (item: any) => item.ADDRESS === address.toUpperCase()
                      )?.LONGITUDE

                      onSetLatitude(Number(latitude))
                      onSetLongitude(Number(longitude))

                      setOpen(false)
                    }}
                  >
                    {/* <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === transformText(address)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    /> */}
                    <span>{transformText(address.ADDRESS)}</span>
                  </CommandItem>
                ))}
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default LocationSearch
