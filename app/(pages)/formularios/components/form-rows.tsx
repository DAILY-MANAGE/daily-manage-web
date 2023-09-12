'use client'

import { Fragment } from 'react'

import { Button } from '@/app/components/Shadcn/button'
import { TableCell, TableRow } from '@/app/components/Shadcn/table'

import { FormData } from '@/app/interfaces/FormData'
import {
  RxCheckCircled,
  RxCrossCircled,
  RxDotsHorizontal,
  RxPencil1,
  RxPencil2,
  RxTrash,
} from 'react-icons/rx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/Shadcn/dropdown-menu'
import axios from 'axios'
import { RequestType } from '@/app/interfaces/RequestType'
import Link from 'next/link'

interface FormProps {
  data: FormData[]
  loading: boolean
}

export default function FormRows({ data, loading }: FormProps) {
  const iconMap = new Map()
  iconMap.set(
    'assinado',
    <RxCheckCircled className="w-5 h-5 my-auto text-green-900" />,
  )
  iconMap.set(
    'não visto',
    <RxCrossCircled className="w-5 h-5 my-auto text-red-900" />,
  )

  const timeConverter = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp * 1000)
    return date.toLocaleString('pt-BR')
  }

  const deleteForm = (formData: FormData) => {
    axios
      .delete(`/formularios/${formData.id}`)
      .then((response: RequestType) => {
        if (response) {
          // response.request.status === 200
          console.log(response)
          data.forEach((form) => {
            if (form.id === formData.id) {
              form.estado = 'Deletado'
              console.log(form)
            }
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      {data.map((formData: FormData) => {
        if (loading) return <Fragment key={formData.id}></Fragment>
        return (
          <TableRow
            key={formData.id}
            className="animate-fade animate-once animate-duration-[2000ms] animate-ease-out animate-normal animate-fill-forwards"
          >
            <TableCell className="font-medium border border-r-1">
              Formulário {formData.id}
            </TableCell>
            <TableCell className="border border-r-1">{formData.nome}</TableCell>
            <TableCell className="border border-r-1">
              {timeConverter(formData.dataCriacao)}
            </TableCell>
            <TableCell className="border border-r-1">
              <div className="w-full h-full flex gap-2 flex-row">
                {iconMap.get(formData.estado.toLowerCase())} {formData.estado}
              </div>
            </TableCell>
            <TableCell className="flex gap-2 justify-between align-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-full" variant={'outline'}>
                    <RxDotsHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  alignOffset={-5}
                  className="w-[200px]"
                  forceMount
                >
                  <DropdownMenuLabel>Opções</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href={`/formularios/editar/${formData.id}`}>
                    <DropdownMenuItem className="flex gap-2">
                      <RxPencil2 className="w-4 h-4 text-green-600" /> Editar
                    </DropdownMenuItem>
                  </Link>
                  {formData.estado !== 'Assinado' && (
                    <DropdownMenuItem className="flex gap-2">
                      <RxPencil1 className="w-4 h-4 text-orange-600" /> Assinar
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    className="flex gap-2"
                    onClick={() => deleteForm(formData)}
                  >
                    <RxTrash className="w-4 h-4 text-red-900" /> Deletar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        )
      })}
    </>
  )
}
