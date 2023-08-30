'use client'

import React from 'react'

import Button from '@/app/components/Custom/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function GoToRegister() {
    const router = useRouter();

    const goToCadastro = () => {
      router.push('/cadastro');
    };

    return (
      <Link href="/cadastro" className='mt-2 w-full flex items-center justify-center'>
        <p className='text-zinc-500 underline underline-offset-2'>Deseja cadastrar sua empresa?</p>
      </Link>
    )
}
