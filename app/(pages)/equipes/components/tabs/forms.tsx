import { useFetch } from '@/app/hooks/useFetch'
import { useParams } from 'next/navigation'
import { FormData } from '@/app/interfaces/FormData'
import { RxChevronLeft, RxChevronRight, RxCrossCircled, RxMagnifyingGlass, RxReload } from 'react-icons/rx'
import { Subtitle } from '../subtitle'
import { VER_FORMULARIOS_DA_EQUIPE } from '@/app/utils/EndpointStorage'
import FormModal from './form-modal'
import { Button } from '@/app/components/Shadcn/button'
import { useState } from "react"
import { Input } from '@/app/components/Shadcn/input'

export default function Forms() {
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState("")

  const params = useParams()

  const { data, loading } = useFetch({
    url: `${VER_FORMULARIOS_DA_EQUIPE}?page=${page}&nome=${search}`,
    isGet: true,
    header: {
      Equipe: params.id
    }
  })

  const dataInner = data && data.data
  const content = dataInner && dataInner.content

  return (
    <div className="flex flex-col gap-2">
      <Input
        placeholder="Filtrar formulário..."
        onChange={(event: any) =>
          setSearch(event.target.value)
        }
        className="h-8 w-[23rem] border border-black/20 shadow focus:outline focus:outline-1 outline-offset-2"
      />
      {data &&
        data &&
        !loading &&
        content &&
        content.map((teamData: FormData) => {
          return (
            <FormModal id={params.id} teamData={teamData} />
          )
        })}
      {!loading && Array.isArray(data) && data.length > 0 && (
        <Subtitle>{`${data.length} Formulário${data.length > 1 ? 's' : ''
          } encontrado${data.length > 1 ? 's' : ''}`}</Subtitle>
      )}
      {loading && (
        <Subtitle>
          <RxReload className="w-4 h-4 my-auto leading-none animate-spin" />
          Carregando formulários...
        </Subtitle>
      )}
      {!loading &&
        (!data ||
          !data.data ||
          !data.data.content ||
          data.data.content.length === 0) && (
          <Subtitle>
            <RxCrossCircled className="w-4 h-4 my-auto leading-none" /> Nenhum
            formulário foi encontrado.
          </Subtitle>
        )}
      <div className="w-full min-h-10 flex gap-2 items-center">
        <div className="w-1/2 flex justify-start items-center">
          <p className="font-semibold">Página {dataInner ? (dataInner.totalPages > 0 ? page + 1 : 0) : 0} de {dataInner ? dataInner.totalPages : '0'}</p>
        </div>
        <div className="w-1/2 flex justify-end items-center gap-2">
          <Button variant={'outline'} className="border border-black/20 shadow" disabled={dataInner && dataInner.first} onClick={() => {
            if (dataInner.first) {
              return
            }
            if (page - 1 < 0) {
              return
            }
            setPage((state) => state - 1)
          }}><RxChevronLeft className="w-5 h-5" /></Button>
          <Button variant={'outline'} className="border border-black/20 shadow" disabled={dataInner && dataInner.last} onClick={() => {
            if (dataInner.last) {
              return
            }
            if (page + 1 > dataInner.totalPages) {
              return
            }
            setPage((state) => state + 1)
          }}><RxChevronRight className="w-5 h-5" /></Button>
        </div>
      </div>
    </div>
  )
}
