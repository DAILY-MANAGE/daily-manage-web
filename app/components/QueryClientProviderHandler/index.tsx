"use client"

import { ReactNode } from "react";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

interface QueryClientProviderHandlerProps {
  children: ReactNode
}

const queryClient = new QueryClient()

export default function QueryClientProviderHandler({ children }: QueryClientProviderHandlerProps) {
  return <>
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  </>
}
