import { useQuery, useMutation, MutationFunction } from '@tanstack/react-query'
import axios, { AxiosResponse, AxiosError } from 'axios'
import { useState } from 'react'
import { RequestType } from '../interfaces/RequestType';
import { ToastWrapper } from '../utils/ToastWrapper';
import { handleAxiosError } from '../utils/AxiosError';
import { cookieKeyOriginal, useAuth } from './useAuth';
import Cookies from 'js-cookie';
import { ENDPOINT } from '../utils/EndpointStorage';

type FetchDataResponse<T> = AxiosResponse<T>
type PostDataResponse = void
type PutDataResponse = void

interface FetchOptions {
  url?: string
  isGet?: boolean
  defaultData?: unknown
  errorList?: string[]
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

export function getClientCookie(key: string) {
  return Cookies.get(key)
}

export function useFetch<T = unknown>(options: FetchOptions) {
  let { url, isGet, defaultData, errorList } = options

  const queryKey = [url]

  const requestInstance = axios.create({
    baseURL: ENDPOINT
  })

  const [error, setError] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const retrieveData = async (url: string, token: string) => {
    setLoading(true)
    const response = await requestInstance.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      data: {}
    }).catch(handleAxiosError)
    console.log(response)
    setLoading(false)
    if (response) {
      handleResponseErrors(response, setError)
      return response
    }
  }

  const { data, refetch } = useQuery<any>({
    queryKey,
    queryFn: async () => {
      if (!isGet || !url) return []
      const token = Cookies.get(cookieKeyOriginal)
      if (token) {
        return retrieveData(url, token)
      }
      return {data: defaultData}
    },
  })

  const postMutation = useMutation<PostDataResponse, unknown, unknown>({
    mutationFn: async (postData: any) => {
      try {
        if (!url) return
        const response = await requestInstance.post(url, postData).catch(handleAxiosError)
        if (!response) return
        handleResponseErrors(response, setError)
      } catch (error) {
        handleResponseErrors((error as any).response, setError)
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
    data: data,
    loading: loading,
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
