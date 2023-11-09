import { Button } from "@/app/components/Shadcn/button";
import { useFetch } from "@/app/hooks/useFetch";
import { OPCOES_CONVITE } from "@/app/utils/EndpointStorage";
import { RxCheck } from "react-icons/rx";

interface AcceptProps {
  inviteId: number
  refetch: any
}

export default function Accept({ inviteId, refetch }: AcceptProps) {
  const { handlePost } = useFetch({
    url: `${OPCOES_CONVITE}/aceitar`.replace("{conviteId}", inviteId.toString()),
    isGet: false
  })

  return <Button className='bg-emerald-500 flex gap-2 pl-2 h-8' onClick={async () => {
    const res = await handlePost([])
    switch ((res as any).status) {
      case 200:
        refetch()
        break
      default:
        break
    }
  }}><RxCheck className='w-4 h-4' />Aceitar</Button>
}
