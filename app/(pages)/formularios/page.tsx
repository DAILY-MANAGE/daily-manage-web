"use client";

import { useState } from "react";

import { Metadata, ResolvingMetadata } from 'next'
import Link from "next/link";

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  return {
    title: 'Formulários | Daily Manage',
  };
}

export default function Formularios() {
  const [ id, setId ] = useState(1);
  return <>
    <input placeholder="1" onChange={(e: any) => {setId(e.target.value)}}></input>
    <Link href={'/formularios/' + id}>Ir para { id }</Link>
  </>
}
