'use client';

import React from 'react';

import { MainNav } from '../../(pages)/dashboard/components/main-nav';
import { Search } from '../../(pages)/dashboard/components/search';
import { UserNav } from '../../(pages)/dashboard/components/user-nav';

import Logo from './logo';

import { usePathname } from 'next/navigation';

export default function NavRoot() {
  const pathname = usePathname();

  const canShowNavbar = () =>
    pathname.includes('dashboard') ||
    pathname.includes('formularios');

  return (
    canShowNavbar() && (
      <div className="border-b max-w-screen">
        <div className="flex h-16 items-center px-8">
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
