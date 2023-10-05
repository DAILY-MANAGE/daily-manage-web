'use client'

import { ToastWrapper } from "../utils/ToastWrapper"

import Cookies from "js-cookie"

import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useFetch } from "./useFetch"

import { AuthResponse } from "../interfaces/AuthResponse"
import { RegisterData } from "../interfaces/RegisterData"
import { AxiosRequestConfig } from "axios"

const cookieKey = "auth_token"

interface LoginData {
  usuario: string
  senha: string
}

interface SigninData extends LoginData {
  nome: string
  // local
  confirmarSenha: string
  lembrarSessao: boolean
}

interface SessionData {
  id: number
  usuario: string
  email: string,
}

const endpoints = {
  login: '/auth/login',
  signIn: '/auth/register',
  refreshToken: '/auth/refresh',
}

export const useAuth = () => {

  const router = useRouter()

  const sessionData = localStorage.getItem('sessionData') as string

  const [session, setSession] = useState<SessionData | null>(
    sessionData ? JSON.parse(sessionData) : null
  )
  const { requestInstance, handleResponseErrors, handleAxiosError } = useFetch({
    isGet: false,
  })

  /**
   * const { data, refetch } = useQuery<any>({
    queryKey,
    queryFn: async () => {
      console.log('Tentando login com cookie...')
      const token = Cookies.get(cookieKey)
      if (token) {
        loginWithToken(token)
      }
    },
  })
   */

  const leaveSessionIfActive = () => {
    if (session) {
      signOut()
    }
  }

  const handleLogin = (responseData: AuthResponse) => {
    const loginPayload: SessionData = {
      id: responseData.usuario.id,
      usuario: responseData.usuario.usuario,
      email: responseData.usuario.email
    }
    localStorage.setItem('sessionData', JSON.stringify(loginPayload))
    setSession(loginPayload)
    Cookies.set(cookieKey, responseData.refreshToken)
    router.push('/equipes')
  }

  const signIn = async (signinData: RegisterData) => {
    leaveSessionIfActive()
    try {
      const res = await requestInstance.post(endpoints.signIn, signinData)
      handleResponseErrors(res)
      if (res.status == 201) {
        handleLogin(res.data)
      }
    } catch (error) {
      handleAxiosError(error)
    }
  }

  const signOut = () => {
    setSession(null)
    Cookies.remove(cookieKey)
    router.push('/login')
  }

  const login = (loginData: LoginData) => {
    requestInstance.post(endpoints.login, loginData
    ).then((res) => {
      handleResponseErrors(res)
      if (res.status == 200) {
        handleLogin(res.data)
      } else {
        Cookies.remove(cookieKey)
        ToastWrapper.error("Não foi possível realizar o login.")
      }
    }).catch((error) => handleAxiosError(error))
  }

  const loginWithToken = async (refreshToken: string) => {
    const refreshTokenPayload = {
      refreshToken: refreshToken
    }
    requestInstance.post(endpoints.refreshToken, refreshTokenPayload).then((res) => {
      handleAxiosError(res)
      handleResponseErrors(res)
      if (res.status == 200) {
        handleLogin(res.data)
      } else {
        Cookies.remove(cookieKey)
        ToastWrapper.error("Login expirado, entre novamente.")
      }
    }).catch((error) => {
      signOut()
      handleAxiosError(error)
    })

  }

  useEffect(() => {
    const token = Cookies.get(cookieKey)
    if (!token) return
    console.log(token)
    loginWithToken(token)
  }, [])

  return {
    session,
    login,
    signIn,
    signOut
  }
}
