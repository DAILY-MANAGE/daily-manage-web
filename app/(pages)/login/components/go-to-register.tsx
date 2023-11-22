'use client';

import React from 'react';

import Link from 'next/link';

export default function GoToRegister() {
  return (
    <div
    className="mt-2 w-full flex items-center justify-center gap-1"
  >
    <span>
      Não possui uma conta?
    </span>
    <Link href="/cadastro" className='text-zinc-500 underline underline-offset-2'>Fazer cadastro</Link>
  </div>
  );
}
