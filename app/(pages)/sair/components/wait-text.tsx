'use client'

import { usePostRequest } from '@/app/hooks/usePostRequest'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function WaitText() {
  const router = useRouter()

  const [message, setMessage] = useState(
    'Você será redirecionado em poucos segundos...',
  )
  const [title, setTitle] = useState('Você está saindo...')
  const { data, error, loading, post } = usePostRequest('/sair')

  useEffect(() => {
    const payload = {
      token: 'receber token aqui',
    }
    post(payload)
    const timer = setTimeout(() => {
      setTitle('Tente novamente em breve')
      setMessage('Oops, encontramos um problema. Tente sair novamente.')
    }, 120)
    return () => clearTimeout(timer)
  }, [post])

  if (data && !error && !loading) {
    // alguma função do service de auth para deslogar e remover key de login
    router.push('/login')
  }

  return (
    <>
      <h1 className="font-black text-2xl mb-2">{title}</h1>
      <h1 className="font-medium text-md md:text-lg mb-2 text-gray-900">
        {message}
      </h1>
    </>
  )
}
