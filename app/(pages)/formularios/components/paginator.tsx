import { Button } from '@/app/components/Shadcn/button';
import {
  RxDoubleArrowLeft,
  RxChevronLeft,
  RxChevronRight,
  RxDoubleArrowRight,
} from 'react-icons/rx';

interface PaginatorProps {
  currentPage?: number;
  amountOfPages?: number;
}

export function Paginator({
  currentPage = 1,
  amountOfPages = 1,
}: PaginatorProps) {
  return (
    <div className="w-1/2 h-10 flex justify-end align-center space-x-4">
      <p className="flex w-fit items-center justify-center text-sm font-medium">
        {currentPage} Página de {amountOfPages}
      </p>
      <div className="flex items-center space-x-2">
        <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex">
          <span className="sr-only">Ir para primeira página</span>
          <RxDoubleArrowLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="h-8 w-8 p-0">
          <span className="sr-only">Ir para página anterior</span>
          <RxChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="h-8 w-8 p-0">
          <span className="sr-only">Ir para a próxima página</span>
          <RxChevronRight className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex">
          <span className="sr-only">Ir para a última página</span>
          <RxDoubleArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
