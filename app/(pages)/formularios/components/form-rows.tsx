import { TableCell, TableRow } from '@/app/components/Shadcn/table'
import { FormData } from '@/app/interfaces/FormData'
import { Button } from 'react-day-picker'

interface FormProps {
  data: FormData[]
  loading: boolean
}

export default function FormRows({ data, loading }: FormProps) {
  return (
    <>
      {data.map((formData: FormData) => {
        return (
          <TableRow key={formData.id}>
            <TableCell className="font-medium border border-r-1">
              Formulário {formData.id}
            </TableCell>
            <TableCell className="border border-r-1">{formData.nome}</TableCell>
            <TableCell className="border border-r-1">
              {formData.estado}
            </TableCell>
            <TableCell>
              <Button>Ações</Button>
            </TableCell>
          </TableRow>
        )
      })}
    </>
  )
}
