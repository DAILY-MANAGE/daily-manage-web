import { useState, useEffect, useCallback } from 'react'
import axios, { AxiosError } from 'axios'
import { RequestType } from '../interfaces/RequestType'

const instance = axios.create({
  baseURL: process.env.API_ENDPOINT,
})

export const useGetRequest = (url: string, defaultData?: unknown) => {
  const [data, setData] = useState<typeof defaultData>(defaultData)
  const [error, setError] = useState<string[]>()
  const [loading, setLoading] = useState(false)

  const get = useCallback(async () => {
    setLoading(true)
    try {
      const response = await instance.get(url)
      setData(response.data)
    } catch (error) {
      const axiosError = (error as AxiosError).response as RequestType
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
