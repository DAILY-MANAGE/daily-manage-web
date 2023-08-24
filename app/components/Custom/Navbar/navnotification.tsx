'use client';

import React, { useEffect, useState } from 'react';
import { RxBell, RxEyeOpen } from 'react-icons/rx';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/Shadcn/dropdown-menu';

import { format, register } from 'timeago.js';
import ptbrLocale from 'timeago.js/lib/lang/pt_BR';

import { Button } from '../../Shadcn/button';

const notificationsToLoad = 5;

interface NotificationData {
  id: number;
  sender: string;
  sentTimestamp: number;
  message: string;
  callback?: () => unknown;
}

export default function NavNotification() {
  const [notificationChunkIndex, setNotificationChunkIndex] = useState(0);
  const [notificationChunk, setNotificationChunk] = useState<
    NotificationData[]
  >([]);

  const notifications: NotificationData[] = [
    {
      id: 1,
      sender: 'Sistema',
      sentTimestamp: 21512521,
      message: 'Seu formulário foi revisado.',
    },
    {
      id: 2,
      sender: 'Alguem',
      sentTimestamp: 22352521,
      message: 'Seu formulário foi excluido.',
    },
    {
      id: 3,
      sender: 'Zé',
      sentTimestamp: 32352521,
      message: 'Seu formulário foi excluido.',
    },
    {
      id: 4,
      sender: 'Asadhdha',
      sentTimestamp: 21512521,
      message: 'Seu formulário foi revisado.',
    },
    {
      id: 5,
      sender: 'BAGADGA',
      sentTimestamp: 32352521,
      message: 'Seu formulário foi excluido.',
    },
    {
      id: 6,
      sender: 'asashadhad',
      sentTimestamp: 12352521,
      message: 'Seu formulário foi excluido.',
    },
  ];

  const registerLocale = () => {
    register('pt_BR', ptbrLocale);
  };

  const formatNotificationTimestamp = (timeStamp: number) => {
    return format(Date.now() - timeStamp, 'pt_BR');
  };

  const getChunkOfNotifications = (): NotificationData[] => {
    const chunkOfNotifications = notifications.splice(
      notificationChunkIndex,
      notificationChunkIndex + notificationsToLoad
    );
    // Caso não tenha mais notificações para carregar, retornaremos o chunk anterior.
    if (chunkOfNotifications.length == 0) {
      return notificationChunk;
    }
    return [...chunkOfNotifications];
  };

  useEffect(() => {
    registerLocale();
    setNotificationChunk(getChunkOfNotifications());
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="group">
        <button className="hover:bg-zinc-100 p-2 w-8 h-8 outline outline-0 hover:outline-1 outline-offset-1 outline-black/20 aspect-square rounded flex items-center justify-center">
          <RxBell className="aspect-square w-full h-full" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[20rem] bg-white"
        align="end"
        forceMount
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-row space-x-1">
              <p className="text-sm font-medium leading-none">Notificações</p>{' '}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {notificationChunk.map(
            (notificationData: NotificationData, index: number) => {
              return (
                <>
                  <div key={notificationData.id}>
                    <DropdownMenuItem
                      className="flex items-center justify-start gap-2"
                      onSelect={(event: Event) => {
                        if (notificationData.callback) {
                            notificationData.callback();
                        } else {
                            event.preventDefault();
                        }
                      }}
                    >
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-semibold leading-none">
                          {notificationData.sender}
                        </p>
                        <p className="text-zinc-500 text-xs">
                          {formatNotificationTimestamp(
                            notificationData.sentTimestamp
                          )}
                        </p>
                        <p className="text-sm">{notificationData.message}</p>
                      </div>
                    </DropdownMenuItem>
                    {(notificationChunk.length == notificationsToLoad &&
                      index == notificationChunk.length - 1 && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setNotificationChunkIndex(
                                (state) => state + notificationsToLoad
                              );
                              setNotificationChunk(getChunkOfNotifications());
                            }}
                            onSelect={(event: Event) => {
                              event.preventDefault();
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
                      ))}
                  </div>
                </>
              );
            }
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
