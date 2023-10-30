"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { RxCaretSort, RxCheck } from "react-icons/rx"
import { PopoverProps } from "@radix-ui/react-popover"

import { Button } from "@/app/components/Shadcn/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/app/components/Shadcn/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/Shadcn/popover"
import { cn } from "@/app/utils/utils"

type Preset = {
  id: number
  nome: string
  value: string
}

interface PresetSelectorProps extends PopoverProps {
  presets: Preset[]
  defaultValue?: any
}

export function MemberPermissionSelector({ presets, defaultValue, ...props }: PresetSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedPreset, setSelectedPreset] = React.useState<Preset>()

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Load a preset..."
          aria-expanded={open}
          className="flex-1 justify-between w-full shadow border-black/20"
        >
          {selectedPreset ? selectedPreset.nome : "Selecionar nível..."}
          <RxCaretSort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full block p-0 border-black/20">
        <Command defaultValue={defaultValue}>
          <CommandInput placeholder="Pesquisar níveis..." />
          <CommandEmpty>Nenhum nível found.</CommandEmpty>
          <CommandGroup heading="Níveis">
            {presets.map((preset) => (
              <CommandItem
                key={preset.id}
                onSelect={() => {
                  setSelectedPreset(preset)
                  setOpen(false)
                }}
              >
                {preset.nome}
                <RxCheck
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedPreset?.id === preset.id
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
