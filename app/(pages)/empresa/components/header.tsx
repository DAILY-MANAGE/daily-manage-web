'use client'

import { ReactNode, useEffect, useState } from 'react';

interface HeaderProps {
  children: ReactNode
}

export default function Header({ children }: HeaderProps) {
  const [businessName, setBusinessName] = useState<string | undefined>();

  useEffect(() => {
    const getBusinessName = () => {
      // Logica de request para pegar nome da empresa
      return 'Bracell Lençóis-Paulista'
    }
    setBusinessName(getBusinessName())
  }, [])

  return (
    <>
      <div className="flex-col flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between flex-col md:flex-row bg-titleHeader bg-cover bg-bottom bg-no-repeat px-4 py-3 rounded overflow-hidden">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              { businessName || 'Carregando...' }
            </h2>
          </div>
          { children }
        </div>
      </div>
    </>
  );
}
