import Logo from '@/app/components/Logo'
import { Metadata } from 'next'
import WaitText from './components/wait-text'

export const metadata: Metadata = {
  title: 'Sair | Daily Manage',
  description: 'Realizar logout da conta',
}

export default function Sair() {
  return (
    <>
      <div className="flex align-center justify-center flex-col text-center w-fit lg:max-w-[25vw] m-auto py-auto h-screen px-10 md:px-4">
        <div className="w-fit h-fit mb-6 mx-auto opacity-10 animate-pulse">
          <Logo width={50} height={50} />
        </div>
        <WaitText />
      </div>
    </>
  )
}
