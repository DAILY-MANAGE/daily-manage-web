'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Editar() {
  const router = useRouter();

  useEffect(() => {
    router.push('/formularios');
  }, [router]);

  return (
    <>
      <h1>Em desenvolvimento</h1>
    </>
  );
}
