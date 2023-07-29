import Link from "next/link"

import { cn } from "@/lib/utils"
import NavLink from "./nav-link"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <NavLink
        href="/dashboard"
      >
        Dashboard
      </NavLink>
      <NavLink
        href="/formularios"
      >
        Formulários
      </NavLink>
    </nav>
  )
}
