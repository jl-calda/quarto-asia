"use client"

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
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  value,
  onSetValue,
}) => {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")
  const [data, setData] = React.useState([])

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
        `https://developers.onemap.sg/commonapi/search?searchVal=${inputValue}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
      )
        .then((res) => res.json())
        .catch((err) => console.error(err))
        .finally(() => setLoading(false))
      setData(
        data?.results?.map((result: any) => transformText(result.ADDRESS))
      )
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
          className={`justify-between w-full text-left h-auto`}
        >
          <span
            className={`font-normal text-ellipsis ${
              value !== "" ? "text-muted-foreground" : "text-muted-foreground"
            }`}
          >
            {value ? value : "What your location..."}
          </span>

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
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
                {data?.map((address) => (
                  <CommandItem
                    value={address}
                    key={crypto.randomUUID()}
                    onSelect={(address) => {
                      onSetValue(transformText(address))
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
                    {transformText(address)}
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
