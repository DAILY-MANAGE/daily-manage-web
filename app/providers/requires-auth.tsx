'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function RequiresAuth({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const { session } = useAuth();
  const router = useRouter();

  if (!session) {
    router.push('/login');
    return (
      <>
        <h1>Redirecionando...</h1>
      </>
    );
  } else {
    return <>{children}</>;
  }
}
