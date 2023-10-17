import { Button } from "@/app/components/Shadcn/button";
import { RxTrash } from "react-icons/rx";

export default function DeleteTeam() {
  return <Button variant={'outline'} className="bg-red-300 flex gap-2"><RxTrash className="w-4 h-4"/> Deletar Equipe</Button>
}
