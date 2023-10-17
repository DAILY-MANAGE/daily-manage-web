import { Button } from "@/app/components/Shadcn/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/Shadcn/dialog"
import { RxGear, RxReload } from "react-icons/rx";

import { Fragment, useState } from 'react';

import { Subtitle } from "../subtitle";
import ChangeName from "./change-name";

export interface ConfigProps {
  nomeEquipe: string
  idEquipe: number
}

function Loading() {
  return <Subtitle>
    <RxReload className="w-4 h-4 my-auto leading-none animate-spin" />
    Carregando configurações...
  </Subtitle>
}

export default function Config({ nomeEquipe, idEquipe }: ConfigProps) {
  const [open, setOpen] = useState(false)

  return <>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-2 bg-white text-black border flex items-center justify-center gap-2 border-black/20 mt-2 md:mt-0 font-semibold" variant={'outline'}
        >
          Configurações <RxGear className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <DialogHeader>
          <DialogTitle>Criar Equipe</DialogTitle>
          <DialogDescription>
            Crie uma equipe para agilizar o processo de gerenciamento de formulários
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-1 pt-0">
          {
            (nomeEquipe && idEquipe) ? <Fragment>
              <ChangeName nomeEquipe={nomeEquipe} idEquipe={idEquipe} />
            </Fragment> : <Loading />
          }
        </div>
        <DialogFooter>
          <Button type="submit">Criar Equipe</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  </>
}
