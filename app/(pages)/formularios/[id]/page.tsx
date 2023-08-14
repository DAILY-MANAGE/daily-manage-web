'use client';

export default function IdFuncionario({ params }: { params: { id: number } }) {
  return (
    <>
      <title>{`Formulário ${params.id} | Daily Manage`}</title>
      <p>{params.id}</p>
    </>
  );
}
