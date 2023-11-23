'use client'

import NotificationView from '@/app/components/Navbar/notification/notification-view'
import Accept from '@/app/components/Navbar/notification/options/accept'
import Deny from '@/app/components/Navbar/notification/options/deny'
import { Button } from '@/app/components/Shadcn/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/app/components/Shadcn/card'
import { DropdownMenuSeparator } from '@/app/components/Shadcn/dropdown-menu'
import { useFetch } from '@/app/hooks/useFetch'
import { Notifications } from '@/app/interfaces/Notifications'
import { VER_NOTIFICACOES } from '@/app/utils/EndpointStorage'

import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { Fragment, useState } from 'react'
import { RxChevronLeft, RxChevronRight } from 'react-icons/rx'

import { format, register } from 'timeago.js'
import ptbrLocale from 'timeago.js/lib/lang/pt_BR'

export default function NotificationProvider() {
  const [page, setPage] = useState(0)

  const { data, refetch } = useFetch({
    url: `${VER_NOTIFICACOES}?page=${page}&size=13`,
    isGet: true,
  })

  const dataInner = data && data.data
  const content = dataInner && dataInner.content

  return (
    <>
      {!content ||
        (content.length === 0 && (
          <p className="w-full text-center text-sm font-semibold py-4">
            Nenhuma notificação encontrada.
          </p>
        ))}
      {content &&
        content.map((notificationData: Notifications, index: number) => {
          return (
            <Fragment key={notificationData.id}>
              <NotificationView
                width="full"
                refetch={refetch}
                notificationId={notificationData.id}
                notificationType={notificationData.tipo}
              >
                <Card className="flex items-center flex-row justify-start gap-2 w-full h-12 px-3 py-7 shadow border border-black/20">
                  <CardHeader className="w-full p-0 flex flex-col">
                    <div className="flex flex-col space-y-1 w-fit">
                      <p className="text-zinc-500 text-left text-xs">
                        {notificationData.horario}
                      </p>
                      <p className="text-sm">{notificationData.mensagem}</p>
                    </div>
                  </CardHeader>
                  <CardFooter className="flex flex-row justify-center gap-2 items-center w-1/3 p-0 w-fit">
                    {notificationData.tipo === 'CONVITE' && (
                      <>
                        <Accept
                          inviteId={notificationData.conviteid}
                          refetch={refetch}
                        />
                        <Deny
                          inviteId={notificationData.conviteid}
                          refetch={refetch}
                        />
                      </>
                    )}
                  </CardFooter>
                </Card>
              </NotificationView>
            </Fragment>
          )
        })}
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
                return
              }
              if (page - 1 < 0) {
                return
              }
              setPage((state) => state - 1)
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
                return
              }
              if (page + 1 > dataInner.totalPages) {
                return
              }
              setPage((state) => state + 1)
            }}
          >
            <RxChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </>
  )
}
