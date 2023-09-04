'use client';

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/app/components/Shadcn/table';
import { Button } from '@/app/components/Shadcn/button';
import { useGetRequest } from '@/app/hooks/useGetRequest';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/Shadcn/card';
import { Label } from '@/app/components/Shadcn/label';
import { FormData } from '../../../interfaces/FormData';

export default function FormTable() {
  // Temporário...
  const formulariosDefault: FormData[] = [];

  const { data, error, loading } = useGetRequest(
    '/formularios/todos',
    formulariosDefault
  );

  const getRandomSize = () => {
    const options = [
      'w-1/2',
      'w-1/6',
      'w-full'
    ]
    return `h-2 bg-slate-200 rounded col-span-2 ${options[Math.floor(Math.random() * options.length)]}`
  }

  const loadingTemp = [1, 2, 3, 4, 5];

  return (
    <>
      {data != null && (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/6 border border-r-1 border-y-0">
                  Id
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
              {Array.isArray(data) &&
                (data as FormData[]).map((formData: FormData) => {
                  return (
                    <TableRow>
                      <TableCell className="font-medium border border-r-1">
                        Formulário {formData.id}
                      </TableCell>
                      <TableCell className="border border-r-1">
                        {formData.nome}
                      </TableCell>
                      <TableCell className="border border-r-1">
                        {formData.estado}
                      </TableCell>
                      <TableCell>
                        <Button>Ações</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {loading && (
                <>
                  {loadingTemp.map((index: number) => {
                    return <TableRow className="animate-pulse" key={index}>
                      <TableCell className="font-medium border border-r-1">
                        <div className={getRandomSize()}></div>
                      </TableCell>
                      <TableCell className="font-medium border border-r-1">
                        <div className={getRandomSize()}></div>
                      </TableCell>
                      <TableCell className="font-medium border border-r-1">
                        <div className={getRandomSize()}></div>
                      </TableCell>
                      <TableCell className="font-medium border">
                        <div className={getRandomSize()}></div>
                      </TableCell>
                    </TableRow>;
                  })}
                </>
              )}
            </TableBody>
          </Table>
        </div>
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
