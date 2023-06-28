'use client'

export default function IdFuncionario({ params } : { params: {id: number} }) {
  return <>
    <title>{params.id}</title>
    <p>{params.id}</p>
  </>
}
