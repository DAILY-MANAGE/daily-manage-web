import { Button } from '@/app/components/Shadcn/button';
import { TableCell, TableRow } from '@/app/components/Shadcn/table';

import { FormData } from '@/app/interfaces/FormData';
import { RxCheckCircled, RxCrossCircled } from 'react-icons/rx';

interface FormProps {
  data: FormData[]
  loading: boolean
  filter: string | undefined
}

export default function FormRows({ data, loading, filter }: FormProps) {

  const iconMap = new Map()
  iconMap.set('assinado', RxCheckCircled)
  iconMap.set('não visto', RxCrossCircled)

  return (
    <>
      {data.map((formData: FormData) => {
        if (loading) return
        return (
          <TableRow key={formData.id}>
            <TableCell className="font-medium border border-r-1">
              Formulário {formData.id}
            </TableCell>
            <TableCell className="border border-r-1">{formData.nome}</TableCell>
            <TableCell className="border border-r-1">
               {formData.estado}
            </TableCell>
            <TableCell className='flex gap-2 justify-between align-center'>
              <Button className='w-1/3'>Editar</Button>
              <Button className='w-1/3'>Remover</Button>
              <Button className='w-1/3'>Duplicar</Button>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
}
