/* eslint-disable no-unsafe-finally */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useQuery, useMutation, MutationFunction } from '@tanstack/react-query'
import axios, { AxiosResponse, AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import { useState } from 'react'
import { ToastWrapper } from '../utils/ToastWrapper'
import { handleAxiosError } from '../utils/AxiosError'
import { cookieKeyOriginal } from './useAuth'
import Cookies from 'js-cookie'
import { ENDPOINT } from '../utils/EndpointStorage'

type PatchDataResponse = void
type PostDataResponse = void
type PutDataResponse = void
type DeleteDataResponse = void

interface FetchOptions {
  url?: string
  isGet?: boolean
  defaultData?: unknown
  errorList?: string[]
  header?: Record<string, unknown>
}

export const handleResponseErrors = (
  response: AxiosResponse,
  setError?: any,
) => {
  const errors = response.data.errors
  const error = response.data.error
  if (error) {
    ToastWrapper.error(error)
  }
  if (errors) {
    console.log(errors)
    errors.forEach((error: string) => {
      ToastWrapper.error(error)
    })
    if (setError) {
      setError(errors)
    } else console.log('no errors')
  }
}

export function getClientCookie(key: string) {
  return Cookies.get(key)
}

export function useFetch<T = unknown>(options: FetchOptions) {
  const { url, isGet, defaultData, header } = options

  const queryKey = [url]

  const requestInstance = axios.create({
    baseURL: ENDPOINT,
  })

  const [error, setError] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const getDefaultHeader = (token: string) => {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...header
      },
      data: {},
    }
  }

  const checkIfLoginIsValid = async () => {
    const retrieveData = async (url: string, token: string) => {
      setLoading(true)
      if (!token) return
      const header = getDefaultHeader(token)
      const response = await requestInstance
        .get(url, header)
        .catch(handleAxiosError)
      setLoading(false)
      if (response) {
        handleResponseErrors(response, setError)
        return response
      }
    }

    if (!isGet || !url) return []
    const token = Cookies.get(cookieKeyOriginal)
    if (token) {
      return retrieveData(url, token)
    }
    return { data: defaultData }
  }

  const handleRequest = async (
    callback: <T = any, R = AxiosResponse<T, any>, D = any>(
      url: string,
      data?: D | undefined,
      config?: AxiosRequestConfig<D> | undefined,
    ) => Promise<R>,
    params: any[],
    doesNotRequireToken?: boolean,
  ) => {
    let response: any
    try {
      if (params.length === 0) {
        console.warn('URL ausente, informar no request.')
        return
      }
      const token = Cookies.get(cookieKeyOriginal)
      if (!token && !doesNotRequireToken) {
        console.warn('TOKEN ausente, informar no request.')
        return
      }
      let header
      if (!doesNotRequireToken && token) {
        header = getDefaultHeader(token)
      }
      console.log('ovo')
      // @ts-ignore
      response = await callback(...params, header)
      console.log('teste')
      if (!response) return
      console.log(response)
      handleResponseErrors(response, setError)
    } catch (error) {
      handleResponseErrors((error as any).response, setError)
    } finally {
      return response
    }
  }

  const { data, refetch } = useQuery<any>({
    queryKey,
    queryFn: async () => checkIfLoginIsValid(),
  })

  const postMutation = useMutation<PostDataResponse, unknown, unknown>({
    mutationFn: async (postData: unknown) =>
      handleRequest(requestInstance.post, [url, postData]),
    onSuccess: () => {
      refetch()
    },
  })

  const putMutation = useMutation<
    PutDataResponse,
    unknown,
    { id: number; putData: any }
  >({
    mutationFn: async (params: { id: number; putData: any }) =>
      handleRequest(requestInstance.put, [
        `${url}/${params.id}`,
        params.putData,
      ]),
    onSuccess: () => {
      refetch()
    },
  })

  const patchMutation = useMutation<
    PatchDataResponse,
    unknown,
    { id: number; patchData: any }
  >({
    mutationFn: async (params: { id: number; patchData: any }) =>
      handleRequest(requestInstance.patch, [url, params.patchData]),
    onSuccess: () => {
      refetch()
    },
  })

  const deleteMutation = useMutation<DeleteDataResponse, unknown, number>({
    mutationFn: async () => handleRequest(requestInstance.delete, [url]),
    onSuccess: () => {
      refetch()
    },
  })

  return {
    data,
    loading,
    error,
    requestInstance,
    refetch,
    handleRequest,
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
    handlePatch: patchMutation.mutateAsync as MutationFunction<
      PatchDataResponse,
      { id: number; patchData: any }
    >,
    handleDelete:
      deleteMutation.mutateAsync as MutationFunction<DeleteDataResponse>,
  }
}
