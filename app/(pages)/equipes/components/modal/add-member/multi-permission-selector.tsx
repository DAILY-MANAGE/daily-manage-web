'use client'

import * as React from 'react'

import { RxCaretSort, RxCheck } from 'react-icons/rx'
import { PopoverProps } from '@radix-ui/react-popover'

import { cn } from '../../../../../utils/utils'
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
import { useEffect } from 'react';
import { useFetch } from '@/app/hooks/useFetch'
import { FILTRAR_USUARIOS_DA_EQUIPE } from '@/app/utils/EndpointStorage'

export interface Preset {
  id: number
  nome: string
  value: string
}

interface PresetSelectorProps extends PopoverProps {
  setValue: UseFormSetValue<any>
  equipeid: string | null
  presets?: Preset[]
}

export function MultiPermissionSelector({ setValue, equipeid, presets, ...props }: PresetSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedPreset, setSelectedPreset] = React.useState<Preset[]>([])

  const formatUsers = () => {
    let formattedUsers = ''
    selectedPreset.forEach((userPreset: Preset, index: number) => {
      if (index === selectedPreset.length - 1) {
        formattedUsers += userPreset.nome
      } else {
        formattedUsers += `${userPreset.nome}, `
      }
    })
    if (formattedUsers === '') {
      formattedUsers = 'Selecionar usuários'
    }
    return formattedUsers
  }

  const openChanged = (open: boolean) => {
    setOpen(open)
  }

  return (
    <>
      <Popover open={open} onOpenChange={openChanged} {...props}>
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
            <CommandInput placeholder="Pesquisar usuários..." />
            <CommandEmpty>Nenhum usuário encontrado.</CommandEmpty>
            <CommandGroup heading="Usuários">
              {presets && presets.map((preset: Preset) => (
                <CommandItem
                  value={preset.nome}
                  key={preset.id}
                  onSelect={() => {
                    const isValid = selectedPreset.filter(
                      (userPreset: Preset) => userPreset.id === preset.id,
                    )
                    const auxPermitted: any = []
                    if (isValid.length > 0) {
                      const removedUsers = selectedPreset.filter(
                        (userPreset: Preset) => userPreset.id !== preset.id,
                      )
                      setSelectedPreset(removedUsers)
                    } else {
                      const auxSelectedPreset = [...selectedPreset]
                      auxSelectedPreset.push(preset)
                      setSelectedPreset(auxSelectedPreset)
                      auxPermitted.push(preset.id)
                    }
                    selectedPreset.map((userPreset: Preset) => {
                      auxPermitted.push(userPreset.id)
                      return userPreset
                    })
                    console.log(auxPermitted)
                    setValue('idusuariospermitidos', auxPermitted)
                  }}
                >
                  {preset.nome}
                  <RxCheck
                    className={cn(
                      'ml-auto h-4 w-4',
                      selectedPreset.filter(
                        (userPreset: Preset) => userPreset.id === preset.id,
                      ).length === 0
                        ? 'opacity-0'
                        : 'opacity-100',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}
