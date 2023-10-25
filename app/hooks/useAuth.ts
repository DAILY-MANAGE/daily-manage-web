'use client'

import { ToastWrapper } from '../utils/ToastWrapper'

import Cookies from 'js-cookie'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFetch } from './useFetch'

import { AuthResponse } from '../interfaces/AuthResponse'
import { RegisterData } from '../interfaces/RegisterData'
import { LOGIN, REGISTRO, RENOVAR_TOKEN } from '../utils/EndpointStorage'

export const cookieKey = 'auth_token_refresh'
export const cookieKeyOriginal = 'auth_token'
export const sessionKey = 'session_data'
export const rememberSessionKey = 'remember_session'

interface LoginData {
  usuario: string
  senha: string
}

export interface SigninData extends LoginData {
  nome?: string
  confirmarSenha?: string
  lembrarSessao: boolean
}

interface SessionData {
  id: number
  usuario: string
  email: string
}

export const useAuth = () => {
  const router = useRouter()

  const sessionData = localStorage.getItem(sessionKey) as string

  const [session, setSession] = useState<SessionData | null>(
    sessionData ? JSON.parse(sessionData) : null,
  )

  const {
    requestInstance,
    handleRequest,
    handleResponseErrors,
    handleAxiosError,
  } = useFetch({
    url: '',
    isGet: false,
  })

  const pathname = usePathname()

  const isInInitialRoutes = () => {
    console.log(pathname)
    return pathname.includes("/login") || pathname.includes("/cadastro")
  }

  const leaveSessionIfActive = () => {
    if (session) {
      signOut()
    }
  }

  const handleLogin = (
    responseData: AuthResponse,
    redirects = true,
    rememberSession = false,
  ) => {
    const loginPayload: SessionData = {
      id: responseData.usuario.id,
      usuario: responseData.usuario.usuario,
      email: responseData.usuario.email,
    }
    setSession(loginPayload)
    localStorage.setItem(sessionKey, JSON.stringify(loginPayload))
    localStorage.setItem(rememberSessionKey, rememberSession.toString())
    Cookies.set(cookieKeyOriginal, responseData.token)
    Cookies.set(cookieKey, responseData.refreshToken)
    if (redirects) {
      router.push('/equipes')
    }
  }

  const signIn = async (signinData: RegisterData) => {
    leaveSessionIfActive()
    const res = await handleRequest(
      requestInstance.post,
      [REGISTRO, signinData],
      true,
    )
    if (!res) {
      ToastWrapper.error('Não foi possível realizar login.')
      return
    }
    switch (res.status) {
      case 201:
        ToastWrapper.success('Login realizado com sucesso!')
        handleLogin(res.data, true, true)
      default:
        break
    }
  }

  const signOut = () => {
    setSession(null)
    Cookies.remove(cookieKey)
    Cookies.remove(cookieKeyOriginal)
    localStorage.removeItem(sessionKey)
    router.push('/login')
  }

  const login = (loginData: SigninData) => {
    requestInstance
      .post(LOGIN, loginData)
      .then((res) => {
        handleResponseErrors(res)
        if (res.status == 200) {
          handleLogin(res.data, true, loginData.lembrarSessao)
        } else {
          Cookies.remove(cookieKey)
          Cookies.remove(cookieKeyOriginal)
          localStorage.removeItem(sessionKey)
          ToastWrapper.error('Não foi possível realizar o login.')
        }
      })
      .catch((error) => handleAxiosError(error))
  }

  const loginWithToken = async (refreshToken: string) => {
    const refreshTokenPayload = {
      refreshToken,
    }
    requestInstance
      .post(RENOVAR_TOKEN, refreshTokenPayload)
      .then((res) => {
        if (res.status == 200) {
          handleLogin(res.data, false, true)
        } else {
          Cookies.remove(cookieKey)
          Cookies.remove(cookieKeyOriginal)
          localStorage.removeItem(sessionKey)
          ToastWrapper.error('Login expirado, entre novamente.')
        }
      })
      .catch((error) => {
        handleAxiosError(error)
      })
  }

  useEffect(() => {
    setTimeout(() => {
      if (!session && !isInInitialRoutes()) {
        router.push('/login')
      }
    }, 500)
    const token = Cookies.get(cookieKey)
    if (!token) return
    loginWithToken(token)
  }, [])

  return {
    session,
    login,
    signIn,
    signOut,
  }
}
