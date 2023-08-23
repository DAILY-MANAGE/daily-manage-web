import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/Shadcn/avatar"
import { Button } from "@/app/components/Shadcn/button"

export function RecentFills() {
  return (
    <div className="space-y-8">
      <div className="flex items-center border p-2 rounded px-4">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback className="border">OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Antônio</p>
          <p className="text-sm text-zinc-500">
            Gerador Turbinas 2
          </p>
        </div>
        <div className="ml-auto font-medium">
          <Button>
          Acessar
          </Button>
        </div>
      </div>
    </div>
  )
}
