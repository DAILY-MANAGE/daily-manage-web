import React, { ReactNode } from 'react'

interface HeaderProps {
  title: string
  children?: ReactNode
}

export default function Header({ title, children }: HeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between flex-col md:flex-row bg-titleHeader bg-cover bg-bottom bg-no-repeat px-4 py-3 rounded overflow-hidden h-fit min-h-[4rem]">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          {title}
        </h2>
        <div className="flex items-center gap-2">{children}</div>
      </div>
    </>
  )
}
