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
import { getClientCookie, useFetch } from "@/app/hooks/useFetch"
import { ReactNode, SyntheticEvent } from "react"
import { useForm } from "react-hook-form"
import { useState } from 'react';
import { useRouter } from "next/navigation"
import { ToastWrapper } from "@/app/utils/ToastWrapper"
import { AxiosResponse } from 'axios';
import Cookies from "js-cookie"
import { cookieKeyOriginal } from "@/app/hooks/useAuth"
import { CRIAR_EQUIPE } from "@/app/utils/EndpointStorage"

interface CreateTeamModalProps {
  children: ReactNode
}

interface TeamProps {
  nome: string
}

const teamValues: TeamProps = {
  nome: ''
}

export function AddMemberModal({ children }: CreateTeamModalProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: teamValues,
  })

  const { handlePost } = useFetch({
    url: CRIAR_EQUIPE,
    isGet: false,
  })

  const [open, setOpen] = useState(false)

  const router = useRouter()

  const handleRefresh = () => {
    router.refresh()
  }

  const onSubmit = async (teamData: TeamProps) => {
    handleRefresh()
    setOpen(false)
    const response = await handlePost(teamData)
    console.log(response)
    switch((response as any).status) {
      case 201:
        ToastWrapper.success("Equipe criada com sucesso!")
        console.log(response)
        router.push(`/equipes/${(response as any).data.id}?t=${getClientCookie(cookieKeyOriginal)}`)
      default:
        break
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Membro</DialogTitle>
          <DialogDescription>
            Adicione membros a equipe para editar formulários em conjunto.
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
          <Button type="submit">Adicionar Membro</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
