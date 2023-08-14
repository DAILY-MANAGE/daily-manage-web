'use client';

import { useState } from 'react';

import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata: Metadata = {
  title: 'Formulários | Daily Manage',
  description: 'Lista de formulários criados.',
};

export default function Formularios() {
  const [id, setId] = useState(1);
  return (
    <>
      <div className="flex-col flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2 flex-col md:flex-row">
            <h2 className="text-3xl font-bold tracking-tight">Formulários</h2>
            <div className="flex items-center space-x-2">
              <input
                placeholder="1"
                onChange={(e: any) => {
                  setId(e.target.value);
                }}
              ></input>
              <Link href={'/formularios/' + id}>Ir para {id}</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
