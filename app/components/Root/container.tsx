import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="flex items-center space-y-2 flex-col w-full">
      {children}
    </div>
  )
}
