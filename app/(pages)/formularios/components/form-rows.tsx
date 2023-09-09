import { Fragment } from 'react'

import { Button } from '@/app/components/Shadcn/button'
import { TableCell, TableRow } from '@/app/components/Shadcn/table'

import { FormData } from '@/app/interfaces/FormData'
import { RxCheckCircled, RxCrossCircled } from 'react-icons/rx'

interface FormProps {
  data: FormData[]
  loading: boolean
  filter: string | undefined
}

export default function FormRows({ data, loading, filter }: FormProps) {
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
    const a = new Date(unixTimestamp * 1000)
    const months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ]
    const year = a.getFullYear()
    const month = months[a.getMonth()]
    const date = a.getDate()
    const hour = a.getHours()
    const min = a.getMinutes()
    const sec = a.getSeconds()
    const time = `${date} de ${month} de ${year} as ${hour}:${min}:${sec}`
    return time
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
              <Button className="w-1/3">Editar</Button>
              <Button className="w-1/3">Remover</Button>
              <Button className="w-1/3">Duplicar</Button>
            </TableCell>
          </TableRow>
        )
      })}
    </>
  )
}
