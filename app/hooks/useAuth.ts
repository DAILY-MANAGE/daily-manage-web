'use client'

import { ToastWrapper } from "../utils/ToastWrapper"

import Cookies from "js-cookie"

import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useFetch } from "./useFetch"

import { AuthResponse } from "../interfaces/AuthResponse"
import { RegisterData } from "../interfaces/RegisterData"

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

  validateToken: '/token/istokenexpired',
}

export const useAuth = () => {

  const router = useRouter()
  const [session, setSession] = useState<SessionData | null>()
  const { requestInstance, handleResponseErrors } = useFetch({
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

  const handleLogin = (responseData: AuthResponse) => {
    Cookies.set(cookieKey, responseData.token)
    router.push('/equipes')
  }

  const signIn = async (signinData: RegisterData) => {
    console.log(signinData)
    if (session) {
      logout()
    }
    const res = await requestInstance.post(endpoints.signIn, {
      params: signinData
    })
    if (res.status == 201) {
      handleLogin(res.data)
    } else {
      handleResponseErrors(res)
    }
  }

  const logout = () => {
    if (session) {
      setSession(null)
      Cookies.remove(cookieKey)
      router.push('/login')
    } else {
      ToastWrapper.error("Não foi possível realizar o logout.")
    }
  }

  const login = async (loginData: LoginData) => {
    const res = await requestInstance.post(endpoints.login, {
      params: loginData
    })
    if (!res) return
    if (res.status == 200) {
      handleLogin(res.data)
    } else {
      Cookies.remove(cookieKey)
      ToastWrapper.error("Não foi possível realizar o login.")
    }
  }

  const loginWithToken = async (token: string) => {
    const res = await requestInstance.get(endpoints.validateToken, {
      params: {
        token: token
      }
    })
    if (!res) return
    if (res.status == 200) {
      handleLogin(res.data)
    } else {
      Cookies.remove(cookieKey)
      ToastWrapper.error("Não foi possível realizar o login automaticamente.")
    }
  }

  return {
    session,
    login,
    signIn,
    logout
  }
}
