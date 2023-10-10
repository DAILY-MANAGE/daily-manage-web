import axios from 'axios'

import { Metadata } from 'next'

import Header from '../components/header'
import { ENDPOINT } from '@/app/utils/EndpointStorage'
import Cookies from 'js-cookie'
import { cookieKeyOriginal } from '@/app/hooks/useAuth'
import { capitalizeFirstLetter } from '@/app/utils/CapitalizeFirstLetter'

export async function generateMetadata(
  { params, searchParams }: any,
): Promise<Metadata> {
  const id = params.id
  const defaultMetadata = {
    title: `Equipe ${id} | Daily Manage`,
  }

  const token = searchParams.t

  if (!ENDPOINT || !token) {
    return defaultMetadata
  }

  const product = await axios.get(`${ENDPOINT}equipe?equipeid=${id}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    data: {}
  })

  if (!product) {
    return defaultMetadata
  }

  return {
    title: `Equipe ${capitalizeFirstLetter(product.data.nome)} | Daily Manage`,
  }
}

export default function EquipeId() {
  return <Header />
}
