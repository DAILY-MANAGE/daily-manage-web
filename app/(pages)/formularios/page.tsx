"use client";

import Link from "next/link";
import { useState } from "react";

export default function Formularios() {
  const [ id, setId ] = useState(1);
  return <>
    <h1>Formulários</h1>
    <input placeholder="1" onChange={(e: any) => {setId(e.target.value)}}></input>
    <Link href={'/formularios/' + id}>Ir para { id }</Link>
  </>
}
