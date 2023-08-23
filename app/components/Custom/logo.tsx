'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface LogoProps {
  width: number;
  height: number;
  specific?: string | null;
}

export default function Logo({
  width = 50,
  height = 100,
  specific = null,
}: LogoProps) {
  
  const router = useRouter();

  const reloadPage = () => {
    router.refresh();
  }

  return (
    <>
      <button onClick={reloadPage} className="flex align-center justify-center">
        {specific == 'dark' || specific == null ? (
          <Image
            width={width}
            height={height}
            src="/logos/dark.png"
            alt="Logo Daily Manage (Modo Escuro)"
            className={specific == null ? 'inline dark:hidden' : ''}
            style={{ objectFit: 'contain' }}
          />
        ) : (
          ''
        )}
        {specific == 'light' || specific == null ? (
          <Image
            width={width}
            height={height}
            src="/logos/light.png"
            alt="Logo Daily Manage (Modo Claro)"
            className={specific == null ? 'hidden dark:inline' : ''}
            style={{ objectFit: 'contain' }}
          />
        ) : (
          ''
        )}
      </button>
    </>
  );
}
