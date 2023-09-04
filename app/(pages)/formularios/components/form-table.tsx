'use client'

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/app/components/Shadcn/table"
import { Button } from "@/app/components/Shadcn/button"
import { useGetRequest } from "@/app/hooks/useGetRequest";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/Shadcn/card";
import { Label } from "@/app/components/Shadcn/label";
import { FormData } from '../../../interfaces/FormData'

export default function FormTable() {

    // Temporário...
    const formulariosDefault: FormData[] = [
        {
            id: 1,
            nome: 'Turbina Gerador 001',
            estado: 'Assinado',
            dataCriacao: 1251252,
        }
    ]

    const { data, error, loading } = useGetRequest('/formularios/todos', formulariosDefault);

    return (
        <>
            {data != null && (
                <div className='rounded-md border'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1/4 border border-r-1 border-y-0">Id</TableHead>
                                <TableHead className="w-1/4 border border-r-1 border-y-0">Nome</TableHead>
                                <TableHead className="w-1/4 border border-r-1 border-y-0">Estado</TableHead>
                                <TableHead className="w-1/4">Controle</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                Array.isArray(data) && (data as FormData[]).map((formData: FormData) => {
                                    return <TableRow>
                                        <TableCell className="font-medium border border-r-1">Formulário {formData.id}</TableCell>
                                        <TableCell className="border border-r-1">{formData.nome}</TableCell>
                                        <TableCell className="border border-r-1">{formData.estado}</TableCell>
                                        <TableCell>
                                            <Button>Ações</Button>
                                        </TableCell>
                                    </TableRow>
                                })
                            }
                        </TableBody>
                    </Table>
                </div>
            )}
            {
                error && error.length > 0 && (
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
                )
            }
            {loading && <p className="animate-pulse">Carregando formulários...</p>}
        </>
    )
}
