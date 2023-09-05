'use client'

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from '@/app/components/Shadcn/table'
import { useGetRequest } from '@/app/hooks/useGetRequest'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/Shadcn/card'
import { Label } from '@/app/components/Shadcn/label'
import { FormData } from '../../../interfaces/FormData'
import SkeletonRows from './skeleton-rows'
import FormRows from './form-rows'
import {
  RxCrossCircled,
  RxChevronLeft,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
  RxChevronRight,
  RxReload,
} from 'react-icons/rx'
import { Button } from '@/app/components/Shadcn/button'
import { Input } from '@/app/components/Shadcn/input'
import { DataCounter } from './data-counter'
import { Paginator } from './paginator'

export default function FormTable() {
  // Temporário...
  const formulariosDefault: FormData[] = []

  const { data, error, loading } = useGetRequest(
    '/formularios/todos',
    formulariosDefault,
  )

  return (
    <>
      <Input
        type="text"
        placeholder="Pesquisar formulário..."
        className="md:w-1/6 border-black/20"
      />
      {data != null && (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/6 border border-r-1 border-y-0">
                    Identificação
                  </TableHead>
                  <TableHead className="w-1/4 border border-r-1 border-y-0">
                    Nome
                  </TableHead>
                  <TableHead className="w-1/4 border border-r-1 border-y-0">
                    Estado
                  </TableHead>
                  <TableHead className="w-1/4">Controle</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(data) && (
                  <FormRows data={data} loading={loading} />
                )}
                {loading && <SkeletonRows />}
              </TableBody>
            </Table>
            {!loading && Array.isArray(data) && data.length === 0 && (
              <p className="font-regular text-md p-12 py-3 text-center my-auto flex gap-2 align-center justify-center">
                <RxCrossCircled className="w-4 h-4 my-auto leading-none" />{' '}
                Nenhum formulário foi encontrado.
              </p>
            )}
          </div>
          <div className="w-full h-fit mt-0 flex flex-row">
            {Array.isArray(data) && (
              <>
                <DataCounter data={data} loading={loading} />
                <Paginator
                  currentPage={1}
                  amountOfPages={Math.floor(data.length / 15)}
                />
              </>
            )}
          </div>
        </>
      )}
      {error && error.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Não foi possível encontrar os formulários</CardTitle>
            <CardDescription>Encontramos {error.length} erros</CardDescription>
          </CardHeader>
          <CardContent>
            {error.map((errorMessage: string, index: number) => {
              return (
                <Label key={index} className="block w-full h-6 mb-2">
                  {errorMessage}
                </Label>
              )
            })}
          </CardContent>
        </Card>
      )}
    </>
  )
}
