'use client'

import { Metadata } from "next";

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  return {
    title: `Formulário ${params.id} | Daily Manage`,
  };
}

export default function IdFuncionario({ params } : { params: {id: number} }) {
  return <>
    <title>{params.id}</title>
    <p>{params.id}</p>
  </>
}
