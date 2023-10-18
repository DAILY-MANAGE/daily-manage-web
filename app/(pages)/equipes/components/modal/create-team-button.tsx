import { Button } from '@/app/components/Shadcn/button'
import { RxPlus } from 'react-icons/rx'

export default function CreateTeamButton() {
  return (
    <Button
      className="border flex items-center justify-center gap-2 border-black/20 mt-2 md:mt-0 font-semibold"
      variant={'outline'}
    >
      Criar Equipe <RxPlus className="w-4 h-4" />
    </Button>
  )
}
