'use client';

import * as React from 'react';

import { RxCaretSort, RxCheck } from 'react-icons/rx';
import { PopoverProps } from '@radix-ui/react-popover';

import { cn } from '../../../../../utils/utils';
import { Button } from '@/app/components/Shadcn/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/app/components/Shadcn/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/components/Shadcn/popover';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';

export interface Preset {
  id: number;
  nome: string;
  value: string;
}

interface PresetSelectorProps extends PopoverProps {
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  equipeid: string | null;
  presets?: Preset[];
  defaultValue?: string[];
  callback?: any;
}

export function MultiPermissionSelector({
  setValue,
  getValues,
  equipeid,
  presets,
  defaultValue,
  callback,
  ...props
}: PresetSelectorProps) {
  const getDefaultValueFromPresets = () => {
    if (!presets) {
      return [];
    }
    if (defaultValue) {
      const defaultValueFromPresets: Preset[] = [];
      defaultValue.map((permission: string) => {
        const preset = presets.filter(
          (userPreset: Preset) => userPreset.value === permission,
        );
        if (preset.length > 0) {
          defaultValueFromPresets.push(preset[0]);
        }
      });
      return defaultValueFromPresets;
    }
    return [];
  };

  const [open, setOpen] = React.useState(false);
  const [selectedPreset, setSelectedPreset] = React.useState<Preset[]>(
    getDefaultValueFromPresets(),
  );

  const formatUsers = () => {
    let formattedUsers = '';
    selectedPreset.forEach((userPreset: Preset, index: number) => {
      if (index === selectedPreset.length - 1) {
        formattedUsers += userPreset.nome;
      } else {
        formattedUsers += `${userPreset.nome}, `;
      }
    });
    if (formattedUsers === '') {
      formattedUsers = 'Selecionar permissões';
    }
    return formattedUsers;
  };

  const openChanged = (open: boolean) => {
    if (callback) {
      callback();
    }
    setOpen(open);
  };

  const onCommandSelect = (preset: Preset) => {
    const auxPermitted: any = getValues('permissoes');
    const isValid = selectedPreset.filter(
      (userPreset: Preset) => userPreset.id === preset.id,
    );

    if (isValid.length > 0) {
      const removedUsers = selectedPreset.filter(
        (userPreset: Preset) => userPreset.id !== preset.id,
      );
      const removedUsersWithValues = auxPermitted.filter(
        (permission: string) => permission !== preset.value,
      );
      setSelectedPreset(removedUsers);
      setValue('permissoes', removedUsersWithValues);
    } else {
      const auxSelectedPreset = [...selectedPreset];
      auxSelectedPreset.push(preset);
      setSelectedPreset(auxSelectedPreset);
      auxPermitted.push(preset.value);
      setValue('permissoes', auxPermitted);
    }
  };

  return (
    <>
      <Popover open={open} onOpenChange={openChanged} {...props}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            type="button"
            aria-label="Selecionar permissões"
            aria-expanded={open}
            className="flex-1 justify-between w-full shadow border-black/20"
          >
            {formatUsers()}
            <RxCaretSort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full block p-0 border-black/20">
          <Command>
            <CommandInput placeholder="Pesquisar permissões..." />
            <CommandEmpty>Nenhuma permissão foi encontrada.</CommandEmpty>
            <CommandGroup heading="Permissões">
              {presets &&
                presets.map((preset: Preset) => (
                  <CommandItem
                    value={preset.nome}
                    key={preset.id}
                    onSelect={() => {
                      onCommandSelect(preset);
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
  );
}
