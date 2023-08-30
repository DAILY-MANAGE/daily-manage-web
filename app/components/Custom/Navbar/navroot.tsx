'use client';

import React from 'react';

import { MainNav } from './main-nav';
import { Search } from './search';
import { UserNav } from './user-nav';

import Logo from '../logo';

import { usePathname } from 'next/navigation';

import NavNotification from './navnotification';

export default function NavRoot() {
  const pathname = usePathname();

  const canShowNavbar = () =>
    pathname.includes('dashboard') || pathname.includes('formularios') || pathname.includes('configuracoes') || pathname.includes('empresa');

  return (
    (canShowNavbar() && (
      <div className="border-b max-w-screen">
        <div className="flex h-16 items-center px-8">
          <Logo width={35} height={35} />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            { false && (
              <Search />
            )}
            <NavNotification />
            <UserNav />
          </div>
        </div>
      </div>
    )) || <></>
  );
}
