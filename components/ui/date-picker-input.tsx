"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"

function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false
  }
  return !isNaN(date.getTime())
}

export function DatePickerInput() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(
    new Date("2025-06-01")
  )
  const [month, setMonth] = React.useState<Date | undefined>(date)
  const [value, setValue] = React.useState(formatDate(date))

  return (
    <div className="relative w-full flex items-center h-full">
      <div className="relative w-full h-[40px] flex rounded-lg border border-[#E5E7EB] bg-white transition-colors hover:border-[#D1D5DB] focus-within:border-[#155DFC] focus-within:ring-1 focus-within:ring-[#155DFC]">
        <input
          id="date-required"
          value={value}
          readOnly
          placeholder="June 01, 2025"
          className="w-full bg-transparent pl-4 pr-10 py-2.5 text-[14px] text-[#4B5563] focus:outline-none"
          onChange={(e) => {
            const date = new Date(e.target.value)
            setValue(e.target.value)
            if (isValidDate(date)) {
              setDate(date)
              setMonth(date)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              id="date-picker"
              aria-label="Select date"
              className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center text-[#9CA3AF] hover:text-[#4B5563] transition-colors"
            >
              <CalendarIcon size={18} />
              <span className="sr-only">Select date</span>
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={0}
            sideOffset={4}
          >
            <Calendar
              mode="single"
              selected={date}
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                setDate(date)
                setValue(formatDate(date))
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
