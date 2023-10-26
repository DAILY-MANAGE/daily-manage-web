import { Button } from "@/app/components/Shadcn/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/app/components/Shadcn/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/Shadcn/dialog";
import { cookieKeyOriginal } from "@/app/hooks/useAuth";
import { FormData } from "@/app/interfaces/FormData";
import { capitalizeFirstLetter } from "@/app/utils/CapitalizeFirstLetter";
import Cookies from "js-cookie";
import Link from "next/link";
import { useState } from "react";
import { RxChevronRight } from "react-icons/rx";

interface FormModalProps {
  id: string | string[]
  teamData: FormData
}

export default function FormModal({ id, teamData }: FormModalProps) {
  const [open, setOpen] = useState(false)

  return <>
  <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card
          key={teamData.id}
          className="shadow w-full h-fit hover:bg-zinc-50 transition-colors cursor-pointer group animate-fade animate-once animate-duration-[2000ms] animate-ease-out animate-normal animate-fill-forwards"
        >
          <CardHeader className="space-y-0 flex flex-row p-6 py-4">
            <div className="w-1/2 flex justify-start align-center flex-col gap-1">
              <CardTitle>
                {`${capitalizeFirstLetter(teamData.nome)}` ||
                  'Carregando...'}
              </CardTitle>
              <CardDescription className="leading-none">
                {`Identificação: ${teamData.id}` || 'Carregando...'}
              </CardDescription>
            </div>
            <div className="w-1/2 flex align-center items-center justify-end m-0 p-0">
              <RxChevronRight className="w-6 h-full my-auto group-hover:animate-fade-right" />
            </div>
          </CardHeader>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Opções de Formulário</DialogTitle>
          <DialogDescription>
            Ao ver as respostas, você terá acesso aos dados salvos e insights. Caso deseje preencher, será redirecionado para a página de preenchimento de formulário.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
        <Link
            href={`/formularios/respostas/${teamData.id}?t=${Cookies.get(
              cookieKeyOriginal,
            )}&equipeId=${id}`}
            key={teamData.id}
            className="w-full"
          >
              <Button type="button" className="w-full">Ver Respostas</Button>
          </Link>
          <Link
            href={`/formularios/${teamData.id}?t=${Cookies.get(
              cookieKeyOriginal,
            )}&equipeId=${id}`}
            key={teamData.id}
            className="w-full"
          >
              <Button type="button" className="w-full bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-900">Responder Formulário</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}
