import { Button } from '@/app/components/Shadcn/button'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/Shadcn/dialog'
import { RxClipboard, RxGear, RxReload } from 'react-icons/rx'

import { Fragment, useState } from 'react'

import { Subtitle } from '../subtitle'
import FormName from './form-name'

export interface ConfigProps {
  nomeEquipe: string
  idEquipe: number
}

function Loading() {
  return (
    <Subtitle>
      <RxReload className="w-4 h-4 my-auto leading-none animate-spin" />
      Carregando informações...
    </Subtitle>
  )
}

export default function CreateForm({ nomeEquipe, idEquipe }: ConfigProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="flex gap-2 bg-white text-black border flex items-center justify-center gap-2 border-black/20 mt-2 md:mt-0 font-semibold"
            variant={'outline'}
          >
            Criar Formulário <RxClipboard className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar Formulário</DialogTitle>
            <DialogDescription>
              Aqui você pode criar um novo formulário para a equipe{' '}
              <strong>{nomeEquipe}</strong>.
            </DialogDescription>
          </DialogHeader>
          <div className="py-1 pt-0">
            {nomeEquipe && idEquipe ? (
              <Fragment>
                <FormName nomeEquipe={nomeEquipe} idEquipe={idEquipe} />
              </Fragment>
            ) : (
              <Loading />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
