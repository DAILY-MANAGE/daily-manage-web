import { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { RequestType } from '../interfaces/RequestType'

const instance = axios.create({
  baseURL: process.env.API_ENDPOINT,
})

export const usePostRequest = (url: string) => {
  const [data, setData] = useState<unknown | null>(null)
  const [error, setError] = useState<string[]>()
  const [loading, setLoading] = useState(false)

  const post = async (payload: unknown) => {
    setLoading(true)
    try {
      const response = await instance.post(url, payload)
      setData(response.data)
    } catch (error) {
      const axiosError = (error as AxiosError).response as RequestType
      if (axiosError) {
        setError(axiosError.data.errors)
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    data,
    error,
    loading,
    post,
  }
}
