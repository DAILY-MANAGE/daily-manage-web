"use client"

import * as React from "react"
import { RxCalendar } from "react-icons/rx"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/app/utils/utils"
import { Button } from "@/app/components/Shadcn/button"
import { Calendar } from "@/app/components/Shadcn/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/Shadcn/popover"
import ptBR from "date-fns/locale/pt-BR"

export function CalendarDateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2023, 0, 20),
    to: addDays(new Date(2023, 0, 20), 20),
  })

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-max justify-start text-left font-normal border-black/20",
              !date && "text-muted-foreground"
            )}
          >
            <RxCalendar className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd 'de' LLL 'de' y", { locale: ptBR })} -{" "}
                  {format(date.to, "dd 'de' LLL 'de' y", { locale: ptBR })}
                </>
              ) : (
                format(date.from, "dd 'de' LLL 'de' y", { locale: ptBR })
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            className="bg-white"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
