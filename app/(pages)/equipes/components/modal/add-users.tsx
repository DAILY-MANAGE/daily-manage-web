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
import { Dispatch, SetStateAction } from 'react'
import { useFetch } from '@/app/hooks/useFetch'
import { FILTRAR_USUARIOS } from '@/app/utils/EndpointStorage'

export interface Preset {
  id: number
  usuario: string
  nome: string
}

interface PresetSelectorProps extends PopoverProps {
  userId: number | undefined
  setUserId: Dispatch<SetStateAction<number | undefined>>
  equipeid: string | null
  presets?: Preset[]
}

export function AddUsers({
  userId,
  setUserId,
  equipeid,
  ...props
}: PresetSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedPreset, setSelectedPreset] = React.useState<Preset>()

  const [search, setSearch] = React.useState<string | null>()

  const auxPermitted1: any = []

  const { data, refetch } = useFetch({
    url: `${FILTRAR_USUARIOS}${search ? '?nome=' + search : ''}`,
    isGet: true,
    header: {
      Equipe: equipeid,
    },
    defaultData: {
      data: {
        content: auxPermitted1,
      },
    },
  })

  const openChanged = (open: boolean) => {
    setOpen(open)
    if (open) {
      refetch()
    }
  }

  return (
    <>
      <Popover open={open} onOpenChange={openChanged} {...props}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            type="button"
            aria-label="Selecionar usuários"
            aria-expanded={open}
            className="flex-1 justify-between w-full shadow border-black/20"
          >
            {selectedPreset ? selectedPreset.nome : 'Selecionar usuário'}
            <RxCaretSort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full block p-0 border-black/20">
          <Command>
            <CommandInput
              placeholder="Pesquisar usuários..."
              onInput={(e: any) => {
                let value = e.target.value
                if (value === '') {
                  value = null
                }
                setSearch(value)
                refetch()
              }}
            />
            <CommandEmpty>Nenhum usuário encontrado.</CommandEmpty>
            <CommandGroup heading="Usuários">
              {data &&
                data.data &&
                data.data.content &&
                data.data.content.map((preset: Preset) => (
                  <CommandItem
                    value={preset.nome}
                    key={preset.id}
                    onSelect={() => {
                      if (selectedPreset && selectedPreset.id === preset.id) {
                        setSelectedPreset(undefined)
                        setUserId(undefined)
                      } else {
                        setSelectedPreset(preset)
                        setUserId(preset.id)
                      }
                    }}
                  >
                    {preset.nome}
                    <RxCheck
                      className={cn(
                        'ml-auto h-4 w-4',
                        userId != preset.id ? 'opacity-0' : 'opacity-100',
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
