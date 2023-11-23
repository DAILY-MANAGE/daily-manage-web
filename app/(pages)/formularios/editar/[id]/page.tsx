import type { Metadata } from 'next';

type Props = {
  params: { id: number };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id;

  return {
    title: `Editar Formulário ${id} | Daily Manage`,
  };
}

export default function IdFuncionario({ params }: Props) {
  return (
    <>
      <div className="flex-col flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between flex-col md:flex-row bg-titleHeader bg-cover bg-bottom bg-no-repeat px-4 py-3 rounded overflow-hidden">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              {`Editar Formulário ${params.id}`}
            </h2>
            <div className="flex items-center gap-2"></div>
          </div>
        </div>
      </div>
    </>
  );
}
