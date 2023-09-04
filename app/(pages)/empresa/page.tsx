import { useEffect, useState } from 'react'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/Shadcn/tabs'

import { Metadata } from 'next'

import Header from './components/header'

export const metadata: Metadata = {
  title: 'Empresa | Daily Manage',
  description: 'Lista de formulários criados.',
}

export default function Empresa() {
  return <Header />
}
