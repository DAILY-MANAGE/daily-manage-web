import { FormData } from '@/app/interfaces/FormData';
import { RxReload } from 'react-icons/rx';

interface DataCounterProps {
  data: FormData[];
  loading: boolean;
}

export function DataCounter({ data, loading }: DataCounterProps) {
  return (
    <>
      {data && Array.isArray(data) && (
        <div className="w-1/2 h-10 flex align-center">
          {(loading && (
            <div className="text-zinc-500 flex w-fit text-sm font-medium justify-center items-center gap-2 my-auto">
              <RxReload className="w-4 h-4 animate-spin" /> Carregando
              registros...
            </div>
          )) || (
            <p className="text-left text-zinc-500 w-fit my-auto text-sm">
              {data.length} Registros encontrados
            </p>
          )}
        </div>
      )}
    </>
  );
}
