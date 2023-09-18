'use client';

import React from 'react';

import Link from 'next/link';

export default function GoToRegister() {
  return (
    <Link
      href="/cadastro"
      className="mt-2 w-full flex items-center justify-center"
    >
      <p className="text-zinc-500 underline underline-offset-2">
        Ainda não possui uma conta?
      </p>
    </Link>
  );
}
