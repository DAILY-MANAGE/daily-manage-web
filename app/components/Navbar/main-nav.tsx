'use client'

import { cn } from '@/app/utils/utils'
import NavLink from './nav-link'
import { usePathname, useRouter } from 'next/navigation'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/Shadcn/dropdown-menu'
import { Button } from '@/app/components/Shadcn/button'
import { RxClipboard, RxListBullet } from 'react-icons/rx'
import Link from 'next/link'
import { SyntheticEvent, useState } from 'react'

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const router = useRouter()
  const pathname = usePathname()

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const isCurrentlyInRoute = (route: string, exact?: boolean) => {
    if (exact) {
      return pathname.toLowerCase() === route.toLowerCase()
    }
    return pathname.toLowerCase().includes(route.toLowerCase())
  }

  return (
    <nav className={cn('flex items-center gap-2', className)} {...props}>
      <DropdownMenu open={dropdownOpen}>
        <DropdownMenuTrigger
          asChild
          className="group"
          onClick={() => {
            router.push('/equipes')
          }}
          onContextMenu={(event: SyntheticEvent) => {
            event.preventDefault()
            setDropdownOpen(!dropdownOpen)
          }}
        >
          <Button
            variant="outline"
            data-active={isCurrentlyInRoute('equipes')}
            className="text-sm font-medium transition-colors group-hover:text-primary rounded p-2 px-4 data-[active=true]:bg-zinc-50 border-0 outline outline-0 data-[active=true]:outline-1 outline-offset-1 data-[active=true]:outline-black/10"
          >
            Equipes
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          onPointerDownOutside={() => {
            setDropdownOpen(false)
          }}
          className="w-56"
          align="start"
          forceMount
        >
          <DropdownMenuGroup>
            <Link href="/formularios">
              <DropdownMenuItem
                className="flex items-center justify-start gap-2"
                disabled={isCurrentlyInRoute('/formularios', true)}
              >
                <RxListBullet className="w-4 h-4" /> Lista de Formulários
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link href="/formularios/criar">
              <DropdownMenuItem
                className="flex items-center justify-start gap-2"
                disabled={isCurrentlyInRoute('formularios/criar')}
              >
                <RxClipboard className="w-4 h-4" /> Criar Formulário
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}
