'use client';

export default function IdFuncionario({ params }: { params: { id: number } }) {
  return (
    <>
      <title>{`Formulário ${params.id} | Daily Manage`}</title>
      <div className="flex-col flex">

        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2 flex-col md:flex-row">
            <h2 className="text-3xl font-bold tracking-tight">{`Formulário ${params.id}`}</h2>
            <div className="flex items-center space-x-2">

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
