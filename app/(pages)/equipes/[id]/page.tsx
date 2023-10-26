import axios from 'axios'

import { Metadata } from 'next'

import Header from '../components/header'
import { ENDPOINT, VER_EQUIPE_POR_ID } from '@/app/utils/EndpointStorage'
import { capitalizeFirstLetter } from '@/app/utils/CapitalizeFirstLetter'

export async function generateMetadata({
  params,
  searchParams,
}: any): Promise<Metadata> {
  const id = params.id
  const defaultMetadata = {
    title: `${id} | Daily Manage`,
  }

  const token = searchParams.t

  if (!ENDPOINT || !token) {
    return defaultMetadata
  }

  const product = await axios.get(`${ENDPOINT}${VER_EQUIPE_POR_ID.replace("{equipeId}", id)}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      Equipe: id
    },
    data: {},
  })

  if (!product) {
    return defaultMetadata
  }

  return {
    title: `${capitalizeFirstLetter(product.data.nome)} | Daily Manage`,
  }
}

export default function EquipeId() {
  return <Header />
}
