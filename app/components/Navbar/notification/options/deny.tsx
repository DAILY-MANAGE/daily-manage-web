import { Button } from "@/app/components/Shadcn/button";
import { useFetch } from "@/app/hooks/useFetch";
import { OPCOES_CONVITE } from "@/app/utils/EndpointStorage";
import { RxCheck, RxCross2 } from "react-icons/rx";

interface DenyProps {
  inviteId: number
  refetch: any
}

export default function Deny({ inviteId, refetch }: DenyProps) {
  const { handlePost } = useFetch({
    url: `${OPCOES_CONVITE}/rejeitar`.replace("{conviteId}", inviteId.toString()),
    isGet: false
  })

  return <Button className='bg-red-500 flex gap-2 pl-2 h-8' onClick={async () => {
    const res = await handlePost([])
    switch ((res as any).status) {
      case 200:
        refetch()
        break
      default:
        break
    }
  }}><RxCross2 className='w-4 h-4' />Rejeitar</Button>
}
