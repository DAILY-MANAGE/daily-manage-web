'use client';

import React from 'react';

import { MainNav } from '../Dashboard/main-nav';
import { Search } from '../Dashboard/search';
import { UserNav } from '../Dashboard/user-nav';

import Logo from '../Logo';

import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const canShowNavbar = () =>
    pathname.includes('login') &&
    pathname.includes('cadastro') &&
    pathname.includes('recuperar-senha');

  return (
    canShowNavbar() && (
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <Logo width={35} height={35} />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
    ) || <></>
  );
}
