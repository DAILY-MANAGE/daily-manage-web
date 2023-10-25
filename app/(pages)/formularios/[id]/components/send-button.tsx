import { Button } from '@/app/components/Shadcn/button'
import { RxUpload } from 'react-icons/rx'

export default function SendButton() {
  return (
    <Button
      className="fixed right-0 bottom-0 w-40 bg-emerald-600 hover:bg-emerald-800 h-16 text-md rounded-lg mr-8 mb-6 flex items-center justify-center gap-2 z-[100] outline outline-1 outline-offset-2 outline-black/0 hover:outline-black/80 outline-dashed transition-all"
      type="submit"
    >
      <RxUpload className="w-5 h-5" /> <span className="pr-2">Enviar</span>
    </Button>
  )
}
