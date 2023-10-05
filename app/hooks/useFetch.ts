import { useQuery, useMutation, MutationFunction } from '@tanstack/react-query'
import axios, { AxiosResponse, AxiosError } from 'axios'
import { useState } from 'react'
import { RequestType } from '../interfaces/RequestType';
import { ToastWrapper } from '../utils/ToastWrapper';
import { handleAxiosError } from '../utils/AxiosError';

type FetchDataResponse<T> = AxiosResponse<T>
type PostDataResponse = void
type PutDataResponse = void

interface FetchOptions {
  url?: string
  isGet?: boolean
  defaultData?: unknown
}

export const handleResponseErrors = (response: RequestType, setError?: any) => {
  const errors = response.data.errors
  switch (response.status) {
    case 201:
      ToastWrapper.success("Usuário criado com sucesso!")
      break
    case 200:
      ToastWrapper.success("Login realizado com sucesso!")
      break
    default:
      break
  }
  if (errors) {
    errors.forEach((error: string) => {
      ToastWrapper.error(error)
    });
    if (setError) {
      setError(errors)
    }
  }
}

export function useFetch<T = unknown>(options: FetchOptions) {
  let { url, isGet, defaultData } = options

  const queryKey = ['fetchKey']

  const requestInstance = axios.create({
    baseURL: url || process.env.NEXT_PUBLIC_API_ENDPOINT
  })

  const [error, setError] = useState<string[]>([])

  const { data, refetch } = useQuery<any>({
    queryKey,
    queryFn: async () => {
      if (!isGet) return ''
      if (!url) return ''
      const response = await requestInstance.get<T>(url).catch(handleAxiosError)
      if (!response) return {data: defaultData};
      (response.data as any) = [...(response.data as any), defaultData]
      console.log(response.data)
      handleResponseErrors(response)
      return response
    },
  })

  const postMutation = useMutation<PostDataResponse, unknown, unknown>({
    mutationFn: async (postData: any) => {
      try {
        if (!url) return
        const response = await requestInstance.post(url, postData).catch(handleAxiosError)
        if (!response) return
        handleResponseErrors(response)
      } catch (error) {
        handleResponseErrors((error as any).response)
      }
    }
  })

  const putMutation = useMutation<
    PutDataResponse,
    unknown,
    { id: number; putData: any }
  >({
    mutationFn: (params: { id: number; putData: any }) =>
      requestInstance.put(`${url}/${params.id}`, params.putData),
    onSuccess: () => {
      refetch()
    },
  })

  const deleteMutation = useMutation<PostDataResponse, unknown, number>({
    mutationFn: (id: number) => requestInstance.delete(`${url}/${id}`),
    onSuccess: () => {
      refetch()
    },
  })

  return {
    data: data?.data || null,
    loading: !data,
    error: error,
    requestInstance,
    handleAxiosError,
    handleResponseErrors,
    handlePost: postMutation.mutateAsync as MutationFunction<
      PostDataResponse,
      unknown
    >,
    handlePut: putMutation.mutateAsync as MutationFunction<
      PutDataResponse,
      { id: number; putData: any }
    >,
    handleDelete: deleteMutation.mutateAsync as MutationFunction<
      PostDataResponse,
      number
    >,
  }
}
