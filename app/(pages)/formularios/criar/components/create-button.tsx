import { Button } from '@/app/components/Shadcn/button'
import { RxPlus } from 'react-icons/rx'

export default function CreateButton() {
  return (
    <Button
      className="fixed right-0 bottom-0 w-40 h-16 text-md rounded-lg mr-8 mb-6 flex items-center justify-center gap-2 z-[100] outline outline-1 outline-offset-2 outline-black/0 hover:outline-black/80 outline-dashed transition-all"
      type="submit"
    >
      <RxPlus className="w-5 h-5" /> <span className="pr-2">Criar</span>
    </Button>
  )
}
