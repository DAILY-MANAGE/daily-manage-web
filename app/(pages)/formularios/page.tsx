import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Formulários | Daily Manage',
  description: 'Lista de formulários criados.',
};

export default function Formularios() {
  return (
    <>
      <div className="flex-col flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2 flex-col md:flex-row">
            <h2 className="text-3xl font-bold tracking-tight">Formulários</h2>
          </div>
        </div>
      </div>
    </>
  );
}
