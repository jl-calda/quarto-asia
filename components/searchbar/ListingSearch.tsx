"use client"

import { FormEvent, useState } from "react"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

const ListingSearch = () => {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value)
    setQuery(e.currentTarget.value)
  }

  return (
    <Command className="relative w-3/4">
      <CommandInput
        value={query}
        placeholder="Type a command or search..."
        onChangeCapture={handleChange}
      />
      {!isLoading && (
        <CommandList className="absolute top-12 w-full max-w-md rounded-md shadow-md">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      )}
    </Command>
  )
}

export default ListingSearch
