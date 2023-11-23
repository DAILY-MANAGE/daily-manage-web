import { Button } from '@/app/components/Shadcn/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/Shadcn/dialog';
import { RxGear, RxReload } from 'react-icons/rx';

import { Fragment, useState } from 'react';

import { Subtitle } from '../subtitle';
import ChangeName from './change-name';
import DeleteTeam from './delete-team';

export interface ConfigProps {
  nomeEquipe: string;
  idEquipe: number | undefined;
}

function Loading() {
  return (
    <Subtitle>
      <RxReload className="w-4 h-4 my-auto leading-none animate-spin" />
      Carregando configurações...
    </Subtitle>
  );
}

export default function Config({ nomeEquipe, idEquipe }: ConfigProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="flex gap-2 bg-white text-black border flex items-center justify-center gap-2 border-black/20 mt-2 md:mt-0 font-semibold"
            variant={'outline'}
          >
            Configurações <RxGear className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Configurações de Equipe</DialogTitle>
            <DialogDescription>
              Altere informações ou mude permissões de usuários da equipe
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 py-1 pt-0">
            {nomeEquipe && idEquipe ? (
              <Fragment>
                <ChangeName nomeEquipe={nomeEquipe} idEquipe={idEquipe} />
                <hr className="my-2" />
                <DeleteTeam nomeEquipe={nomeEquipe} idEquipe={idEquipe} />
              </Fragment>
            ) : (
              <Loading />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
