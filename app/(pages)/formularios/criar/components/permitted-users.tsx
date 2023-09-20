'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { RxCaretSort, RxCheck } from 'react-icons/rx'
import { PopoverProps } from '@radix-ui/react-popover'

import { cn } from '../../../../utils/utils'
import { Button } from '@/app/components/Shadcn/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/app/components/Shadcn/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/components/Shadcn/popover'

export interface Preset {
  id: number
  name: string
}

const presets: Preset[] = [
  {
    id: 1,
    name: 'Usuário',
  },
  {
    id: 2,
    name: 'Usuário2',
  },
]

interface PresetSelectorProps extends PopoverProps {
  presets?: Preset[]
}

export function PermittedUsers({ ...props }: PresetSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedPreset, setSelectedPreset] = React.useState<Preset[]>(presets)

  const formatUsers = () => {
    let formattedUsers = ''
    selectedPreset.forEach((userPreset: Preset, index: number) => {
      if (index == selectedPreset.length-1) {
        formattedUsers += userPreset.name
      } else {
        formattedUsers += `${userPreset.name}, `
      }
    })
    if (formattedUsers == '') {
      formattedUsers = 'Selecionar usuários'
    }
    return formattedUsers
  }

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Selecionar usuários"
          aria-expanded={open}
          className="flex-1 justify-between w-full shadow border-black/20"
        >
          {formatUsers()}
          <RxCaretSort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full block p-0 border-black/20">
        <Command>
          <CommandInput placeholder="Pesquisar usuários..."/>
          <CommandEmpty>Nenhum usuário encontrado.</CommandEmpty>
          <CommandGroup heading="Recomendados">
            {presets.map((preset) => (
              <CommandItem
                key={preset.id}
                onSelect={() => {
                  const isValid = selectedPreset.filter((userPreset: Preset) => userPreset.id == preset.id)
                  console.log(isValid)
                  if (isValid.length == 0) return
                  const auxSelectedPreset = [...selectedPreset]
                  auxSelectedPreset.push(preset)
                  setSelectedPreset(auxSelectedPreset)
                }}
              >
                {preset.name}
                <RxCheck
                  className={cn(
                    'ml-auto h-4 w-4',
                    selectedPreset.filter((userPreset: Preset) => userPreset.id == preset.id)
                      ? 'opacity-100'
                      : 'opacity-0',
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
