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
import { UseFormSetValue } from 'react-hook-form'
import { FormCreationData } from '../page'

export interface Preset {
  id: number
  name: string
  value: string
}

const presets: Preset[] = [
  {
    id: 1,
    name: 'Texto',
    value: 'STRING',
  },
  {
    id: 2,
    name: 'Sim ou Não',
    value: 'BOOLEAN',
  },
  {
    id: 3,
    name: 'Número Inteiro',
    value: 'INTEGER',
  },
  {
    id: 4,
    name: 'Número Decimal',
    value: 'DECIMAL',
  },
  {
    id: 5,
    name: 'Litro',
    value: 'LITER',
  },
  {
    id: 6,
    name: 'Celsius',
    value: 'CELSIUS',
  },
  {
    id: 7,
    name: 'Kilograma',
    value: 'KILOGRAM',
  },
  {
    id: 8,
    name: 'Porcentagem',
    value: 'PERCENT',
  },
]

interface PresetSelectorProps extends PopoverProps {
  presets?: Preset[]
  getValues: any
  setValue: UseFormSetValue<FormCreationData>
}

export function ResponseType({
  setValue,
  getValues,
  ...props
}: PresetSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedPreset, setSelectedPreset] = React.useState<Preset>(presets[0])

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Selecionar tipos"
          aria-expanded={open}
          className="flex-1 justify-between w-full shadow border-black/20"
        >
          <>
            {selectedPreset.name}
            <RxCaretSort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full block p-0 border-black/20">
        <Command>
          <CommandInput placeholder="Pesquisar tipos..." />
          <CommandEmpty>Nenhum tipo encontrado.</CommandEmpty>
          <CommandGroup heading="Tipos">
            {presets.map((preset) => (
              <CommandItem
                key={preset.id}
                onSelect={() => {
                  setSelectedPreset(preset)
                  const campos = getValues('campos')
                  setValue('campos', campos)
                }}
              >
                {preset.name}
                <RxCheck
                  className={cn(
                    'ml-auto h-4 w-4',
                    selectedPreset.id === preset.id
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
