import { useRouter } from "next/navigation";
import { RxArrowLeft } from "react-icons/rx";
import { Button } from "../Shadcn/button";

export default function BackButton() {
  const router = useRouter()

  return <Button
    className="border flex items-center justify-center gap-2 border-black/20 mt-2 md:mt-0 font-semibold"
    variant={'outline'}
    onClick={() => router.back()}
  >
    <RxArrowLeft className="w-4 h-4" /> Voltar
  </Button>
}
