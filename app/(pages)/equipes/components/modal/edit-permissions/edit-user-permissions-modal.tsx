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
import { getClientCookie, useFetch } from "@/app/hooks/useFetch"
import { ReactNode } from "react"
import { useForm } from "react-hook-form"
import { useState } from 'react';
import { useRouter } from "next/navigation"
import { ToastWrapper } from "@/app/utils/ToastWrapper"
import { cookieKeyOriginal } from "@/app/hooks/useAuth"
import { ADICONAR_USUARIO_A_EQUIPE, CRIAR_EQUIPE, EDITAR_PERMISSOES_DE_UM_USUARIO_POR_USUARIO } from "@/app/utils/EndpointStorage"
import { Card, CardContent } from "@/app/components/Shadcn/card"
import { AddUsers } from "../add-users"
import { MultiPermissionSelector } from "../add-member/multi-permission-selector"
import PermissionsProvider from "./permissions-provider"

interface CreateTeamModalProps {
  equipeid: string
  usuario: string
  children: ReactNode
}

interface TeamProps {
  permissoes: string[]
}

const teamValues: TeamProps = {
  permissoes: []
}

export function EditUserPermissionsModal({ equipeid, usuario, children }: CreateTeamModalProps) {

  const {
    handleSubmit,
    setValue,
    getValues,
  } = useForm({
    mode: 'onChange',
    defaultValues: teamValues,
  })

  const [open, setOpen] = useState(false)

  const router = useRouter()

  const { handlePost } = useFetch({
    url: EDITAR_PERMISSOES_DE_UM_USUARIO_POR_USUARIO,
    isGet: false,
    header: {
      Equipe: equipeid,
      Usuario: usuario
    }
  })

  const onSubmit = async (teamData: TeamProps) => {
    router.refresh()
    setOpen(false)
    const response = await handlePost(teamData)
    console.log(response)
    switch((response as any).status) {
      case 200:
        ToastWrapper.success("O membro foi convidado com sucesso!")
        console.log(response)
        router.push(`/equipes/${equipeid}?t=${getClientCookie(cookieKeyOriginal)}`)
      default:
        ToastWrapper.error("Não foi possível convidar o membro.")
        break
    }
  }

  const permissions: string[] = []

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
        <Form.Root onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Alterar Permissões</DialogTitle>
            <DialogDescription>
              Altere as permissões de {usuario}.
            </DialogDescription>
          </DialogHeader>
          <PermissionsProvider usuario={usuario} equipeid={equipeid} setValue={setValue} getValues={getValues}/>
          <DialogFooter className="mt-4 mb-0">
            <Button type="submit">Adicionar Membro</Button>
          </DialogFooter>
          </Form.Root>
        </DialogContent>
    </Dialog>
  )
}