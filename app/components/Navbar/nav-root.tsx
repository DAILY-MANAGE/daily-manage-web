'use client'

import React from 'react'

import { MainNav } from './main-nav'
import { UserNav } from './user-nav'

import Logo from '../Logo'

import { usePathname } from 'next/navigation'

import NavNotification from './notification/nav-notification'

export default function NavRoot() {
  const pathname = usePathname()

  const canShowNavbar = () =>
    pathname.includes('dashboard') ||
    pathname.includes('formularios') ||
    pathname.includes('configuracoes') ||
    pathname.includes('equipes') ||
    pathname.includes('notificacoes')


  return (
    (canShowNavbar() && (
      <div className="border-b max-w-screen overflow-hidden">
        <div className="flex h-16 items-center px-8">
          <Logo width={30} height={30} />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <NavNotification />
            <UserNav />
          </div>
        </div>
      </div>
    )) || <></>
  )
}
