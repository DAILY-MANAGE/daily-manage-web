'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface LogoProps {
  width: number;
  height: number;
  defaultImage?: string;
}

export default function Logo({
  width = 50,
  height = 100,
  defaultImage = '/logos/dark.png',
}: LogoProps) {
  const [specific, setSpecific] = useState(null);

  const router = useRouter();

  const reloadPage = () => {
    router.refresh();
  };

  return (
    <>
      <button onClick={reloadPage} className="flex align-center justify-center">
        {specific === 'dark' ||
          (specific == null && (
            <Image
              width={width}
              height={height}
              src={specific === null ? defaultImage : `/logos/${specific}.png`}
              alt="Logo Daily Manage (Modo Escuro)"
              className={
                specific == null
                  ? 'inline dark:hidden w-auto h-auto'
                  : 'w-auto h-auto'
              }
              style={{ objectFit: 'cover' }}
            />
          ))}
        {specific === 'light' ||
          (specific == null && (
            <Image
              width={width}
              height={height}
              src={specific === null ? defaultImage : `/logos/${specific}.png`}
              alt="Logo Daily Manage (Modo Claro)"
              className={
                specific == null
                  ? 'hidden dark:inline w-auto h-auto'
                  : 'w-auto h-auto'
              }
              style={{ objectFit: 'cover' }}
            />
          ))}
      </button>
    </>
  );
}
