import { useFetch } from '@/app/hooks/useFetch'
import { useParams } from 'next/navigation'
import { FormData } from '@/app/interfaces/FormData'
import Link from 'next/link'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/Shadcn/card'
import { capitalizeFirstLetter } from '@/app/utils/CapitalizeFirstLetter'
import { RxChevronRight, RxCrossCircled, RxReload } from 'react-icons/rx'
import { Subtitle } from '../subtitle'
import { VER_FORMULARIOS_DA_EQUIPE } from '@/app/utils/EndpointStorage'
import Cookies from 'js-cookie'
import { cookieKeyOriginal } from '@/app/hooks/useAuth'
import FormModal from './form-modal'

export default function Forms() {
  const params = useParams()
  const { data, loading } = useFetch({
    url: VER_FORMULARIOS_DA_EQUIPE,
    isGet: true,
    header: {
      Equipe: params.id
    }
  })

  return (
    <div className="flex flex-col gap-2">
      {data &&
        (data as any).data &&
        !loading &&
        (data as any).data.content &&
        (data as any).data.content.map((teamData: FormData) => {
          return (
            <FormModal id={params.id} teamData={teamData}/>
          )
        })}
      {!loading && Array.isArray(data) && data.length > 0 && (
        <Subtitle>{`${data.length} Formulário${
          data.length > 1 ? 's' : ''
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
    </div>
  )
}
