import { Button } from '@/app/components/Shadcn/button';
import { Card } from '@/app/components/Shadcn/card';
import { Metadata } from 'next';
import Link from 'next/link';
import { RxClipboard } from 'react-icons/rx';

export const metadata: Metadata = {
  title: 'Formulários | Daily Manage',
  description: 'Lista de formulários criados.',
};

export default function Formularios() {
  return (
    <>
      <div className="flex-col flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between flex-col md:flex-row bg-titleHeader bg-cover bg-bottom bg-no-repeat px-4 py-3 rounded overflow-hidden">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Formulários
            </h2>
            <div className="flex items-center gap-2">
              <Link href="/formularios/criar">
                <Button
                  className="border flex items-center justify-center gap-2 border-black/20"
                  variant={'outline'}
                >
                  Criar Formulário <RxClipboard className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <Card></Card>
          </div>
        </div>
      </div>
    </>
  );
}
