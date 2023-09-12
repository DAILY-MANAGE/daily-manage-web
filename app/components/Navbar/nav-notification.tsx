'use client'

import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { RxBell } from 'react-icons/rx'

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

import { Button } from '../Shadcn/button'
import { Badge } from '../Shadcn/badge'
import { useGetRequest } from '@/app/hooks/useGetRequest'
import { Notifications } from '@/app/interfaces/Notifications'

const notificationsToLoad = 5

export default function NavNotification() {
  const [notificationChunkIndex, setNotificationChunkIndex] = useState(0)
  const [unreadMessages, setUnreadMessages] = useState(0)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const notificationsDefault: Notifications[] = [
    {
      idNotificacao: 1,
      fonte: 'Sistema',
      data: 1251251251,
      mensagem: 'Seu formulário foi revisado.',
    },
  ]

  const { data, error, loading } = useGetRequest(
    '/notificacoes/todos',
    notificationsDefault,
  )

  const getChunkOfNotifications = useCallback(() => {
    if (!Array.isArray(data)) return [...notificationsDefault]
    const filtered = data.filter(
      (notificationData: Notifications, index: number) =>
        index >= notificationChunkIndex &&
        index < notificationChunkIndex + notificationsToLoad,
    )
    return filtered
  }, [notificationChunkIndex, data, notificationsDefault])

  const [notificationChunk, setNotificationChunk] = useState<Notifications[]>(
    getChunkOfNotifications(),
  )

  const formatNotificationTimestamp = (timeStamp: number) => {
    return format(Date.now() - timeStamp, 'pt_BR')
  }

  useEffect(() => {
    register('pt_BR', ptbrLocale)
  }, [])

  return (
    <DropdownMenu
      onOpenChange={(open: boolean) => {
        if (!open) return
        setUnreadMessages(0)
      }}
    >
      <DropdownMenuTrigger asChild className="group">
        <button
          data-unreadmessages={unreadMessages > 0}
          className="hover:bg-zinc-100 p-2 w-8 h-8 outline outline-0 data-[unreadmessages=true]:animate-pulse hover:outline-1 outline-offset-1 outline-black/20 aspect-square rounded flex items-center justify-center"
        >
          <RxBell
            data-unreadmessages={unreadMessages > 0}
            className="aspect-square w-full h-full data-[unreadmessages=true]:animate-wiggle animate-infinite animate-duration-[2000ms] animate-ease-in animate-normal animate-fill-forwards"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[20rem]" align="end" forceMount>
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-row space-x-1 gap-1">
              <p className="text-sm font-medium leading-none">Notificações</p>{' '}
              {unreadMessages > 0 && (
                <Badge className="h-4 flex items-center justify-center px-2">
                  {unreadMessages}
                </Badge>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {notificationChunk.length === 0 && (
            <p className="w-full text-center text-sm font-semibold py-4">
              Nenhuma notificação encontrada.
            </p>
          )}
          {notificationChunk.map(
            (notificationData: Notifications, index: number) => {
              return (
                <Fragment key={notificationData.idNotificacao}>
                  <div>
                    <DropdownMenuItem className="flex items-center justify-start gap-2">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-semibold leading-none">
                          {notificationData.fonte}
                        </p>
                        <p className="text-zinc-500 text-xs">
                          {formatNotificationTimestamp(notificationData.data)}
                        </p>
                        <p className="text-sm">{notificationData.mensagem}</p>
                      </div>
                    </DropdownMenuItem>
                    {(notificationChunk.length === notificationsToLoad &&
                      index === notificationChunk.length - 1 && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setNotificationChunkIndex(
                                (state) => state + notificationsToLoad,
                              )
                              setNotificationChunk(getChunkOfNotifications())
                            }}
                            onSelect={(event: Event) => {
                              event.preventDefault()
                            }}
                          >
                            <Button
                              variant={'ghost'}
                              className="h-4 p-0 text-zinc-500 flex items-center justify-start gap-2"
                            >
                              <p>Ver Mais</p>
                            </Button>
                          </DropdownMenuItem>
                        </>
                      )) ||
                      (index < notificationChunk.length - 1 && (
                        <DropdownMenuSeparator />
                      )) ||
                      (notificationChunk.length - 1 < notificationsToLoad && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setNotificationChunkIndex((state) => {
                                let toSet = state - notificationsToLoad
                                if (toSet < 0) {
                                  toSet = 0
                                }
                                return toSet
                              })
                              setNotificationChunk(getChunkOfNotifications())
                            }}
                            onSelect={(event: Event) => {
                              event.preventDefault()
                            }}
                          >
                            <Button
                              variant={'ghost'}
                              className="h-4 p-0 text-zinc-500 flex items-center justify-start gap-2"
                            >
                              <p>Voltar</p>
                            </Button>
                          </DropdownMenuItem>
                        </>
                      ))}
                  </div>
                </Fragment>
              )
            },
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
