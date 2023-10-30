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
import { CRIAR_EQUIPE } from "@/app/utils/EndpointStorage"
import { AddUsers } from "../add-users"
import { Card, CardContent } from "@/app/components/Shadcn/card"
import { MemberPermissionSelector } from "./member-permission-selector"
import { MultiPermissionSelector } from "./multi-permission-selector"

interface CreateTeamModalProps {
  equipeid: string
  children: ReactNode
}

interface TeamProps {
  nome: string
}

const teamValues: TeamProps = {
  nome: ''
}

export function AddMemberModal({ equipeid, children }: CreateTeamModalProps) {

  const {
    register,
    handleSubmit,
    setValue,
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
        ToastWrapper.success("O membro foi convidado com sucesso!")
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
              <Form.Label label="Usuário" className="mt-0"/>
              <AddUsers setValue={setValue} equipeid={equipeid}/>
              <Form.Error message={errors.nome?.message} />
            </div>
            <hr />
            <div className="flex flex-start flex-col flex-row">
              <Form.Label label="Permissões" className="mt-0"/>
              <Card>
                <CardContent className="pt-4 pb-5">
                  <Form.Label label="Nível" className="mt-0 block"/>
                  <MemberPermissionSelector presets={[{id: 1, nome: 'Administrador', value: "ADMINISTRADOR"}, {id: 2, nome: 'Comum', value: ""}]} defaultValue="Comum"/>
                  <hr className="mt-4 mb-2"/>
                  <Form.Label label="Formulário" className="mt-0"/>
                  <MultiPermissionSelector setValue={setValue} equipeid={equipeid} presets={[{id: 1, nome: 'Visualizar', value: "VISUALIZAR_FORMULARIO"}, {id: 2, nome: 'Criar', value: "CRIAR_FORMULARIO"}, {id: 3, nome: 'Excluir', value: "EXCLUIR_FORMULARIO"}, {id: 4, nome: 'Editar', value: "EDITAR_FORMULARIO"}, {id: 5, nome: 'RESPONDER', value: "RESPONDER_FORMULARIO"} ]} />
                  <hr className="mt-4 mb-2"/>
                  <Form.Label label="Usuários" className="mt-0"/>
                  <MultiPermissionSelector setValue={setValue} equipeid={equipeid} presets={[{id: 1, nome: 'Administrador', value: ""}]} />
                  <hr className="mt-4 mb-2"/>
                  <Form.Label label="Equipe" className="mt-0"/>
                  <MultiPermissionSelector setValue={setValue} equipeid={equipeid} presets={[{id: 1, nome: 'Administrador', value: ""},]} />
                  <hr />
                </CardContent>
              </Card>
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
