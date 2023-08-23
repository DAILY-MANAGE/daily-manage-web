'use client';

import { cn } from "@/app/utils/utils"
import NavLink from "./nav-link"
import { usePathname } from "next/navigation"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {

  const pathname = usePathname()

  function getIsActiveFor(route: string) {
    return pathname.toLowerCase().includes(route.toLowerCase())
  }

  return (
    <nav
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      <NavLink
        href="/dashboard"
        data-active={getIsActiveFor('dashboard')}
      >
        Dashboard
      </NavLink>
      <NavLink
        href="/formularios"
        data-active={getIsActiveFor('formularios')}
      >
        Formulários
      </NavLink>
    </nav>
  )
}
