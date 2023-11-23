'use client';

import Logs from '@/app/(pages)/equipes/components/tabs/logs';
import { useParams } from 'next/navigation';

export default function UserLogsProvider() {
  const params = useParams();
  return <Logs equipeId={params.id as any} username={params.user as string} />;
}
