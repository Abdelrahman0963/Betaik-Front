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
  if (!date) return ""
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

export function DatePickerInput() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [month, setMonth] = React.useState<Date | undefined>(date)
  const [value, setValue] = React.useState(formatDate(date))
  const [view, setView] = React.useState<"options" | "calendar">("options")

  const handleQuickSelect = (days: number, label: string) => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() - days)
    setDate(targetDate)
    setValue(label)
    setOpen(false)
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      setTimeout(() => setView("options"), 200)
    }
  }

  return (
    <div className="relative w-full">
      <Popover open={open} onOpenChange={handleOpenChange}>
        {/* الحل هنا: جعل الـ Container بالكامل هو الـ Trigger */}
        <PopoverTrigger asChild>
          <div
            className="relative w-full h-[40px] flex items-center rounded-lg border border-[#E5E7EB] bg-white transition-colors hover:border-[#D1D5DB] focus-within:border-[#155DFC] focus-within:ring-1 focus-within:ring-[#155DFC] cursor-pointer"
          >
            <input
              id="date-required"
              value={value}
              readOnly
              className="w-full bg-transparent pl-4 pr-10 py-2.5 text-[14px] text-[#4B5563] cursor-pointer focus:outline-none"
              placeholder="Select date..."
            />
            <div className="absolute right-0 px-3 flex items-center justify-center text-[#9CA3AF]">
              <CalendarIcon size={18} />
            </div>
          </div>
        </PopoverTrigger>

        <PopoverContent
          /* العرض الآن سيطابق عرض الـ Container بالكامل */
          className="w-[var(--radix-popover-trigger-width)] p-0 bg-white shadow-lg border border-[#E5E7EB] rounded-md overflow-hidden"
          align="start"
          sideOffset={5}
        >
          {view === "options" ? (
            <div className="flex flex-col p-1 w-full bg-white">
              <button
                onClick={() => handleQuickSelect(7, "Last 7 Days")}
                className="px-4 py-2.5 text-sm text-left hover:bg-slate-50 rounded-md transition-colors text-[#4B5563]"
              >
                Last 7 Days
              </button>
              <button
                onClick={() => handleQuickSelect(30, "Last 30 Days")}
                className="px-4 py-2.5 text-sm text-left hover:bg-slate-50 rounded-md transition-colors text-[#4B5563]"
              >
                Last 30 Days
              </button>
              <button
                onClick={() => setView("calendar")}
                className="px-4 py-2.5 text-sm text-left hover:bg-slate-50 rounded-md transition-colors text-[#4B5563]"
              >
                Custom Range
              </button>
            </div>
          ) : (
            <div className="flex flex-col w-full bg-white">
              <button
                onClick={() => setView("options")}
                className="px-4 py-2 text-[12px] text-[#155DFC] hover:underline text-left font-medium bg-slate-50 border-b border-[#F3F4F6]"
              >
                ← Back to options
              </button>
              <div className="p-2 w-full flex justify-center overflow-auto">
                <Calendar
                  mode="single"
                  selected={date}
                  month={month}
                  onMonthChange={setMonth}
                  onSelect={(d) => {
                    if (d) {
                      setDate(d)
                      setValue(formatDate(d))
                      setOpen(false)
                    }
                  }}
                  initialFocus
                  className="w-full"
                />
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}