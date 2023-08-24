'use client';

import { cn } from '@/app/utils/utils';
import NavLink from './nav-link';
import { usePathname } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/Shadcn/dropdown-menu';
import { Button } from '@/app/components/Shadcn/button';
import { RxClipboard, RxListBullet } from 'react-icons/rx';
import Link from 'next/link';

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  function getIsActiveFor(route: string) {
    return pathname.toLowerCase().includes(route.toLowerCase());
  }

  return (
    <nav className={cn('flex items-center gap-2', className)} {...props}>
      <NavLink href="/dashboard" data-active={getIsActiveFor('dashboard')}>
        Dashboard
      </NavLink>

      <DropdownMenu>
        <DropdownMenuTrigger asChild className="group">
          <Button
            variant="outline"
            data-active={getIsActiveFor('formularios')}
            className="text-sm font-medium transition-colors group-hover:text-primary rounded p-2 px-4 data-[active=true]:bg-zinc-50 border-0 outline outline-0 data-[active=true]:outline-1 outline-offset-1 data-[active=true]:outline-black/10"
          >
            Formulários
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white" align="start" forceMount>
          <DropdownMenuGroup>
            <Link href='/formularios'>
              <DropdownMenuItem className="flex items-center justify-start gap-2">
                <RxListBullet className="w-4 h-4" /> Lista de Formulários
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link href='/formularios/criar'>
              <DropdownMenuItem className="flex items-center justify-start gap-2">
                <RxClipboard className="w-4 h-4" /> Criar Formulário
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
