'use client'

import { Form } from "@/app/components/Form"
import { Button } from "@/app/components/Shadcn/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/Shadcn/dialog"
import { Input } from "@/app/components/Shadcn/input"
import { Label } from "@/app/components/Shadcn/label"
import { useFetch } from "@/app/hooks/useFetch"
import { ReactNode, SyntheticEvent } from "react"
import { useForm } from "react-hook-form"
import { useState } from 'react';
import { useRouter } from "next/navigation"

interface CreateTeamModalProps {
  children: ReactNode
}

interface TeamProps {
  nome: string
}

const teamValues: TeamProps = {
  nome: ''
}

export function CreateTeamModal({ children }: CreateTeamModalProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: teamValues,
  })

  const { handlePost } = useFetch({
    url: 'equipe/criar',
    isGet: false
  })

  const [open, setOpen] = useState(false)

  const router = useRouter()

  const handleRefresh = () => {
    router.refresh()
  }

  const onSubmit = (teamData: TeamProps) => {
    console.log('OVO')
    handleRefresh()
    handlePost(teamData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Equipe</DialogTitle>
          <DialogDescription>
            Crie uma equipe para agilizar o processo de gerenciamento de formulários
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-1 pt-0">
          <Form.Root onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-start flex-col flex-row">
              <Label htmlFor="name" className="text-left w-full mb-2">
                Nome
              </Label>
              <Input
                id="name"
                placeholder="Entre com o nome da equipe"
                className="col-span-3"
                autoComplete="usuario"
                htmlFor="usuario"
                error={errors.nome}
                aria-invalid={errors.nome ? 'true' : 'false'}
                data-invalid={errors.nome}
                onInvalid={(e: SyntheticEvent) => {
                  e.preventDefault()
                }}
                type="text"
                {...register('nome', {
                  required: 'Nome da Equipe é obrigatório',
                  maxLength: {
                    value: 30,
                    message: 'Número máximo de caractéres é 30',
                  },
                  minLength: {
                    value: 5,
                    message: 'Número mínimo de caractéres é 5',
                  },
                })}
              />
              <Form.Error message={errors.nome?.message} />
            </div>
            </Form.Root>
        </div>
        <DialogFooter>
          <Button type="submit">Criar Equipe</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
