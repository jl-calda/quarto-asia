"use client"

import { on } from "events"
import clsx from "clsx"
import format from "date-fns/format"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Icons } from "@/components/Icons"

interface DatePickProps {
  selected: Date
  onSelect: () => void
}

const DatePick: React.FC<DatePickProps> = ({ selected, onSelect }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={clsx(
            "w-full pl-3 text-left font-normal",
            !selected && "text-muted-foreground"
          )}
        >
          {selected ? format(selected, "PPP") : <span>Pick a date</span>}
          <Icons.calendarPick className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={onSelect}
          disabled={false}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePick
