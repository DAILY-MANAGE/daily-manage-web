'use client';

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from '@/app/components/Shadcn/table';
import { useFetch } from '@/app/hooks/useFetch';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/Shadcn/card';
import { Label } from '@/app/components/Shadcn/label';
import { FormData } from '../../../interfaces/FormData';
import SkeletonRows from './skeleton-rows';
import FormRows from './form-rows';
import { RxCrossCircled } from 'react-icons/rx';
import { Input } from '@/app/components/Shadcn/input';
import { DataCounter } from './data-counter';
import { Paginator } from './paginator';
import { ChangeEvent, useEffect, useState } from 'react';

export default function FormTable() {
  const formulariosDefault: FormData[] = [
    {
      id: 1,
      nome: 'Turbina Gerador 001',
      estado: 'Assinado',
      dataCriacao: 1694468062,
    },
    {
      id: 2,
      nome: 'Turbina Gerador 002',
      estado: 'Assinado',
      dataCriacao: 1694468062,
    },
    {
      id: 3,
      nome: 'Ventilador 003',
      estado: 'Assinado',
      dataCriacao: 1694468062,
    },
    {
      id: 4,
      nome: 'Turbina 004',
      estado: 'Assinado',
      dataCriacao: 1694468062,
    },
    {
      id: 5,
      nome: 'Turbina 005',
      estado: 'Não Visto',
      dataCriacao: 1694468062,
    },
  ];

  const filterForms = (event: ChangeEvent<HTMLInputElement>) =>
    setFilter(event.target.value.toLowerCase());

  const [filter, setFilter] = useState<string>('');
  const [filteredData, setFilteredData] = useState<FormData[] | undefined>();
  const { data, error, loading } = useFetch({ url: '/equipes/todas' });

  useEffect(() => {
    if (!Array.isArray(data)) return;
    setFilteredData(data);
  }, [data, setFilteredData]);

  return (
    <>
      <Input
        type="text"
        placeholder="Pesquisar formulário..."
        className="md:w-1/6 border-black/20"
        onChange={filterForms}
      />
      {filteredData != null && (
        <>
          <div className="rounded-md border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[6%] border border-r-1 border-y-0">
                    Identificação
                  </TableHead>
                  <TableHead className="w-[10%] border border-r-1 border-y-0">
                    Nome
                  </TableHead>
                  <TableHead className="w-[6%] border border-r-1 border-y-0">
                    Data de Criação
                  </TableHead>
                  <TableHead className="w-[6%] border border-r-1 border-y-0">
                    Estado
                  </TableHead>
                  <TableHead className="w-[.3%]">Controle</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(filteredData) && (
                  <FormRows
                    data={filteredData.filter(
                      (formData: FormData) =>
                        formData.nome.toLowerCase().includes(filter) ||
                        `formulário ${formData.id}`.includes(filter) ||
                        formData.estado.toLowerCase().includes(filter),
                    )}
                    loading={loading}
                  />
                )}
                {loading && <SkeletonRows />}
              </TableBody>
            </Table>
            {!loading &&
              Array.isArray(filteredData) &&
              filteredData.length === 0 && (
                <p className="font-regular text-md p-12 py-3 text-center my-auto flex gap-2 align-center justify-center">
                  <RxCrossCircled className="w-4 h-4 my-auto leading-none" />{' '}
                  Nenhum formulário foi encontrado.
                </p>
              )}
          </div>
          <div className="w-full h-fit mt-0 flex flex-row">
            {Array.isArray(filteredData) && (
              <>
                <DataCounter
                  data={filteredData.filter(
                    (formData: FormData) =>
                      formData.nome.toLowerCase().includes(filter) ||
                      `formulário ${formData.id}`.includes(filter) ||
                      formData.estado.toLowerCase().includes(filter),
                  )}
                  loading={loading}
                />
                <Paginator
                  currentPage={1}
                  amountOfPages={Math.floor(filteredData.length / 15)}
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
              );
            })}
          </CardContent>
        </Card>
      )}
    </>
  );
}
