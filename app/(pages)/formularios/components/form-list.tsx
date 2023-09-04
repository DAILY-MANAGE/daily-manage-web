'use client';

import { useGetRequest } from '@/app/hooks/useGetRequest';
import { columns } from '../components/columns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/Shadcn/card';
import { Label } from '@/app/components/Shadcn/label';
import { DataTable } from './data-table';

export default function FormList() {

  const formulariosDefault = [{
    id: 'Formulário 8782',
    title: 'Nome do Formulário',
    status: 'in progress',
    label: 'documentation',
    priority: 'medium',
  }]

  const { data, error, loading } = useGetRequest('/formularios', formulariosDefault);

  return (
    <div className="h-full flex-1 flex-col space-y-8 flex">
      {data != null &&
        <DataTable
          data={data as typeof formulariosDefault}
          columns={columns}
        />
      }
      {error && error.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Não foi possível encontrar os formulários</CardTitle>
            <CardDescription>Encontramos {error.length} erros</CardDescription>
          </CardHeader>
          <CardContent>
            {error.map((errorMessage: string, index: number) => {
              return <Label key={index} className='block w-full h-6 mb-2'>{errorMessage}</Label>;
            })}
          </CardContent>
        </Card>
      )}
      {loading && <p className="animate-pulse">Carregando formulários...</p>}
    </div>
  );
}
