'use client'

import React from 'react'

import Button from '@/app/components/Custom/button';
import { useRouter } from 'next/navigation';

export default function GoToRegister() {
    const router = useRouter();

    const goToCadastro = () => {
      router.push('/cadastro');
    };
  
    return (
        <Button
            size="sm"
            onClick={goToCadastro}
            className="flex items-center justify-center gap-2 data-[cadastroloadingdelay=true]:opacity-50 bg-zinc-950 text-white"
        >
            <span>Cadastrar</span>
        </Button>
    )
}
