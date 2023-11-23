import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/components/Shadcn/avatar';
import { Button } from '@/app/components/Shadcn/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/app/components/Shadcn/card';
import { Input } from '@/app/components/Shadcn/input';
import { useFetch } from '@/app/hooks/useFetch';
import { usePermission } from '@/app/hooks/usePermission';
import {
  VER_REGISTROS_DA_EQUIPE,
  VER_REGISTROS_DE_USUARIO_POR_EQUIPE,
} from '@/app/utils/EndpointStorage';
import { getInitialLetter } from '@/app/utils/GetInitialLetter';
import { Fragment, useState } from 'react';
import {
  RxChevronLeft,
  RxChevronRight,
  RxCrossCircled,
  RxReader,
  RxReload,
} from 'react-icons/rx';
import { Subtitle } from '../subtitle';

interface LogsProps {
  equipeId: number;
  username?: string;
}

interface UserLogData {
  id: number;
  nome: string;
  usuario: string;
  email: string;
}

interface TeamLogData {
  id: number;
  nome: string;
}

interface Log {
  id: number;
  acao: string;
  horario: string;
  usuario: UserLogData;
  equipe: TeamLogData;
}

export default function Logs({ equipeId, username }: LogsProps) {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');

  const { data, loading, error } = useFetch({
    url: username
      ? `${VER_REGISTROS_DE_USUARIO_POR_EQUIPE}?page=${page}&size=5&acao=${search}`
      : `${VER_REGISTROS_DA_EQUIPE}?page=${page}&size=5&acao=${search}`,
    isGet: true,
    header: {
      Equipe: equipeId,
      Usuario: username,
    },
  });

  const dataInner = data && data.data;
  const content = dataInner && dataInner.content;

  return (
    <div className="w-full gap-2 flex flex-col">
      <Input
        placeholder="Filtrar registros..."
        onChange={(event: any) => setSearch(event.target.value)}
        className="h-8 w-[23rem] border border-black/20 shadow focus:outline focus:outline-1 outline-offset-2"
      />
      {!loading && content && content.length > 0 && (
        <Subtitle>{`${content.length} Registro${
          content.length > 1 ? 's' : ''
        } encontrado${content.length > 1 ? 's' : ''}`}</Subtitle>
      )}
      {loading && (
        <Subtitle>
          <RxReload className="w-4 h-4 my-auto leading-none animate-spin" />
          Carregando registros...
        </Subtitle>
      )}
      {!loading && (!content || (content && content.length === 0)) && (
        <Subtitle>
          <RxCrossCircled className="w-4 h-4 my-auto leading-none" /> Nenhum
          registro foi encontrado.
        </Subtitle>
      )}
      <div className="flex flex-col gap-2">
        {content &&
          content.map((logData: Log) => {
            return (
              <Fragment key={logData.id}>
                <Card className="shadow border border-black/20">
                  <CardHeader className="pb-2">
                    <h1 className="font-bold">{logData.acao}</h1>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="/avatars/01.png" alt="Avatar" />
                        <AvatarFallback className="border">
                          {getInitialLetter(logData.usuario.nome)}
                        </AvatarFallback>
                      </Avatar>
                      <p>{logData.usuario.nome}</p>
                    </div>
                  </CardContent>
                  <CardFooter>{logData.horario}</CardFooter>
                </Card>
              </Fragment>
            );
          })}
      </div>
      <div className="w-full min-h-10 flex gap-2 items-center">
        <div className="w-1/2 flex justify-start items-center">
          <p className="font-semibold">
            Página {dataInner ? (dataInner.totalPages > 0 ? page + 1 : 0) : 0}{' '}
            de {dataInner ? dataInner.totalPages : '0'}
          </p>
        </div>
        <div className="w-1/2 flex justify-end items-center gap-2">
          <Button
            variant={'outline'}
            className="border border-black/20 shadow"
            disabled={dataInner && dataInner.first}
            onClick={() => {
              if (dataInner.first) {
                return;
              }
              if (page - 1 < 0) {
                return;
              }
              setPage((state) => state - 1);
            }}
          >
            <RxChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant={'outline'}
            className="border border-black/20 shadow"
            disabled={dataInner && dataInner.last}
            onClick={() => {
              if (dataInner.last) {
                return;
              }
              if (page + 1 > dataInner.totalPages) {
                return;
              }
              setPage((state) => state + 1);
            }}
          >
            <RxChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
