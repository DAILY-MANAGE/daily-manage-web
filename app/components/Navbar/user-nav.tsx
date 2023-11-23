import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/components/Shadcn/avatar';
import { Button } from '@/app/components/Shadcn/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/Shadcn/dropdown-menu';
import { useAuth } from '@/app/hooks/useAuth';
import { getInitialLetter } from '@/app/utils/GetInitialLetter';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function UserNav() {
  const pathname = usePathname();
  const { session, signOut } = useAuth();

  return (
    <>
      {session && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="Foto de Perfil" />
                <AvatarFallback className="border">
                  {getInitialLetter(session.usuario)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {session.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/configuracoes">
                <DropdownMenuItem
                  data-active={pathname.includes('configuracoes')}
                  className="data-[active=true]:bg-zinc-100 data-[active=true]:text-zinc-600"
                >
                  Configurações
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="group focus:bg-red-200"
              onClick={signOut}
            >
              <p className="group-hover:text-red-900 font-semibold">Sair</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
