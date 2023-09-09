import { useState, useEffect, useCallback } from 'react'
import axios, { AxiosError } from 'axios'
import { RequestType } from '../interfaces/RequestType'
import { getErrorMessage } from '../utils/ErrorHandler'
import { ToastWrapper } from '../utils/ToastWrapper'

const instance = axios.create({
  baseURL: 'https://localhost:8080',
})

export const useGetRequest = (url: string, defaultData?: unknown) => {
  const [data, setData] = useState<typeof defaultData>(defaultData)
  const [error, setError] = useState<string[]>()
  const [loading, setLoading] = useState(false)

  const get = useCallback(async () => {
    setLoading(true)
    try {
      const response = await instance.get(url)
      if (!response) return
      console.log(response)
      setData(response.data)
    } catch (error) {
      const axiosError = (error as AxiosError).response as RequestType
      ToastWrapper.error(getErrorMessage(error as AxiosError))
      if (axiosError) {
        setError(axiosError.data.errors)
      }
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    get()
  }, [get, url])

  return {
    data,
    error,
    loading,
  }
}
