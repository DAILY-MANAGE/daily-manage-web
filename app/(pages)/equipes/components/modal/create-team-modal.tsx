import { Button } from "@/app/components/Shadcn/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/Shadcn/dialog"
import { Input } from "@/app/components/Shadcn/input"
import { Label } from "@/app/components/Shadcn/label"
import { ReactNode } from "react"

interface CreateTeamModalProps {
  children: ReactNode
}

export function CreateTeamModal({ children }: CreateTeamModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Equipe</DialogTitle>
          <DialogDescription>
            Crie uma equipe para agilizar o processo de gerenciamento de formulários
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4 flex-row">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              defaultValue="Nome da Equipe"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Criar Equipe</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
