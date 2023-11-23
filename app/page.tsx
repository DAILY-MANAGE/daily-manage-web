'use client'

import { redirect } from 'next/navigation'
import { useAuth } from './hooks/useAuth'

export default function Page() {
  const { session } = useAuth()

  if (!session) {
    redirect('/login')
  } else {
    redirect('/equipes')
  }
}
