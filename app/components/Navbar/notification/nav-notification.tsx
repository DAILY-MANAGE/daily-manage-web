'use client'

import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { RxBell, RxCheck, RxCross2 } from 'react-icons/rx'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/Shadcn/dropdown-menu'

import { format, register } from 'timeago.js'
import ptbrLocale from 'timeago.js/lib/lang/pt_BR'

import { Button } from '../../Shadcn/button'
import { Badge } from '../../Shadcn/badge'
import { useFetch } from '@/app/hooks/useFetch'
import { Notifications } from '@/app/interfaces/Notifications'
import { VER_NOTIFICACOES } from '@/app/utils/EndpointStorage'
import NotificationView from './notification-view'
import Accept from './options/accept'
import Deny from './options/deny'
import Link from 'next/link'

const notificationsToLoad = 5

export default function NavNotification() {
  const [unreadMessages, setUnreadMessages] = useState(0)

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const { data, refetch } = useFetch(
    {
      url: `${VER_NOTIFICACOES}?size=5`,
      isGet: true
    }
  )

  const formatNotificationTimestamp = (timeStamp: number) => {
    register('pt_BR', ptbrLocale)
    return format(Date.now() - timeStamp, 'pt_BR')
  }

  const content = data && data.data && data.data.content

  return (
    <DropdownMenu
      onOpenChange={(open: boolean) => {
        if (open) {
          refetch()
        }
        if (!open) return
        setUnreadMessages(0)
      }}
    >
      <DropdownMenuTrigger asChild className="group">
        <button
          data-unreadmessages={data && data.data && data.data.content.length > 0}
          className="hover:bg-zinc-100 p-2 w-8 h-8 outline outline-0 data-[unreadmessages=true]:animate-pulse hover:outline-1 outline-offset-1 outline-black/20 aspect-square rounded flex items-center justify-center"
        >
          <RxBell
            data-unreadmessages={data && data.data && data.data.content.length > 0}
            className="aspect-square w-full h-full data-[unreadmessages=true]:animate-bounce animate-infinite animate-duration-[2000ms] animate-ease-in animate-normal animate-fill-forwards"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[20rem]" align="end" forceMount>
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-row space-x-1 gap-1">
              <p className="text-sm font-medium leading-none">Notificações</p>{' '}
              {data && data.data && data.data.content.length > 0 && (
                <Badge className="h-4 flex items-center justify-center px-2">
                  {data.data.content.length}
                </Badge>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className='mb-0' />
          {!content || content.length === 0 && (
            <p className="w-full text-center text-sm font-semibold py-4">
              Nenhuma notificação encontrada.
            </p>
          )}
          {content && content.map(
            (notificationData: Notifications, index: number) => {
              return (
                <Fragment key={notificationData.id}>
                  <div>
                    <NotificationView refetch={refetch} notificationId={notificationData.id} notificationType={notificationData.tipo}>
                      <DropdownMenuItem onSelect={(event: Event) => {
                        event.preventDefault()
                      }} className="flex items-center justify-start gap-2">
                        <div className="flex flex-col space-y-1">
                          <p className="text-zinc-500 text-xs">
                            {notificationData.data && formatNotificationTimestamp(notificationData.data)}
                          </p>
                          <p className="text-sm">{notificationData.mensagem}</p>
                          {
                            notificationData.tipo === 'CONVITE' && (
                              <div className='grid grid-cols-[.49fr_.49fr] gap-2 items-center w-full mx-auto pt-1'>
                                <Accept inviteId={notificationData.conviteid} refetch={refetch} />
                                <Deny inviteId={notificationData.conviteid} refetch={refetch} />
                              </div>
                            )
                          }
                        </div>
                      </DropdownMenuItem>
                    </NotificationView>
                    {(content.length === notificationsToLoad &&
                      index === content.length - 1 && (
                        <>
                          <DropdownMenuSeparator />
                        </>
                      )) ||
                      (index < content.length - 1 && (
                        <DropdownMenuSeparator />
                      ))}
                  </div>
                </Fragment>
              )
            },
          )}
          {
            (content && content.length > 0) && (
              <div className='px-2 py-2'>
                <Link href="/notificacoes" className='no-underline'>
                  <Button variant={'outline'} className="w-full">Ver Mais</Button>
                </Link>
              </div>
            )
          }
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
