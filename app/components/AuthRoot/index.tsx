import { twMerge } from 'tailwind-merge'
import Logo from '../Logo'

import { ReactNode } from 'react'

interface AuthRootProps {
  element: ReactNode
  background: 'login' | 'cadastro' | 'recuperarSenha'
}

export function AuthRoot({ element, background = 'login' }: AuthRootProps) {
  return (
    <div className="flex flex-row align-center justify-center w-[100vw] h-[100vh]">
      <div className="h-[100vh] flex flex-col align-center justify-center w-[80vw] md:w-[25vw] px-0 lg:px-12 md:px-10">
        <div className="w-full flex flex-row align-center justify-start h-[5%]">
          <Logo width={40} height={40} />
        </div>
        <div className="flex flex-col align-center justify-center h-[90%] w-[100%]">
          {element}
        </div>
      </div>
      <div
        className={twMerge(
          'w-[75vw] hidden bg-light-100 md:flex lg:flex h-[100vh] bg-cover bg-black bg-no-repeat',
          `bg-${background}`,
        )}
      ></div>
    </div>
  )
}
