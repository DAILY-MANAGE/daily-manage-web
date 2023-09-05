import { useState, useEffect, useCallback } from 'react'
import axios, { AxiosError } from 'axios'
import { RequestType } from '../interfaces/RequestType'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

console.log(process.env.API_ENDPOINT)
const instance = axios.create({
  baseURL: 'http://localhost:8080',
})

export const useGetRequest = (url: string, defaultData?: unknown) => {
  const [data, setData] = useState<typeof defaultData>(defaultData)
  const [error, setError] = useState<string[]>()
  const [loading, setLoading] = useState(false)

  const get = useCallback(async () => {
    setLoading(true)
    try {
      const response = await instance.get(url)
      console.log(response)
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
