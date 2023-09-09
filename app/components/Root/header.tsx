import React, { ReactNode } from 'react'

interface HeaderProps {
  title: string
  children?: ReactNode
}

export default function Header({ title, children }: HeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between flex-col md:flex-row bg-titleHeader bg-black bg-cover bg-bottom bg-no-repeat px-1 md:px-4 w-full py-3 rounded overflow-hidden h-fit min-h-[4rem]">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white text-center md:text-left h-full leading-none my-auto animate-fade-right animate-once animate-duration-1000 animate-ease-in-out animate-normal animate-fill-forwards">
          {title}
        </h2>
        <div className="flex items-center gap-2">{children}</div>
      </div>
    </>
  )
}
