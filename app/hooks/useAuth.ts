'use client'

import { ToastWrapper } from "../utils/ToastWrapper"

import Cookies from "js-cookie"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useFetch } from "./useFetch"

import { AuthResponse } from "../interfaces/AuthResponse"
import { RegisterData } from "../interfaces/RegisterData"

export const cookieKey = "auth_token_refresh"
export const cookieKeyOriginal = "auth_token"
export const sessionKey = "session_data"

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

  const sessionData = localStorage.getItem(sessionKey) as string

  const [session, setSession] = useState<SessionData | null>(
    sessionData ? JSON.parse(sessionData) : null
  )

  const { requestInstance, handleResponseErrors, handleAxiosError } = useFetch({
    isGet: false,
  })

  const leaveSessionIfActive = () => {
    if (session) {
      signOut()
    }
  }

  const handleLogin = (responseData: AuthResponse, redirects: boolean = true, rememberSession: boolean = false) => {
    const loginPayload: SessionData = {
      id: responseData.usuario.id,
      usuario: responseData.usuario.usuario,
      email: responseData.usuario.email
    }
    setSession(loginPayload)
    if (rememberSession) {
      localStorage.setItem(sessionKey, JSON.stringify(loginPayload))
      Cookies.set(cookieKeyOriginal, responseData.token)
      Cookies.set(cookieKey, responseData.refreshToken)
    }
    if (redirects) {
      router.push('/equipes')
    }
  }

  const signIn = async (signinData: RegisterData) => {
    leaveSessionIfActive()
    try {
      const res = await requestInstance.post(endpoints.signIn, signinData)
      handleResponseErrors(res)
      if (res.status == 201) {
        handleLogin(res.data, true, true)
      }
    } catch (error) {
      handleAxiosError(error)
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
    requestInstance.post(endpoints.login, loginData
    ).then((res) => {
      handleResponseErrors(res)
      if (res.status == 200) {
        handleLogin(res.data, true, loginData.lembrarSessao)
      } else {
        Cookies.remove(cookieKey)
        Cookies.remove(cookieKeyOriginal)
        localStorage.removeItem(sessionKey)
        ToastWrapper.error("Não foi possível realizar o login.")
      }
    }).catch((error) => handleAxiosError(error))
  }

  const loginWithToken = async (refreshToken: string) => {
    const refreshTokenPayload = {
      refreshToken: refreshToken
    }
    requestInstance.post(endpoints.refreshToken, refreshTokenPayload).then((res) => {
      //handleAxiosError(res)
      //handleResponseErrors(res)
      if (res.status == 200) {
        handleLogin(res.data, false, true)
      } else {
        Cookies.remove(cookieKey)
        Cookies.remove(cookieKeyOriginal)
        localStorage.removeItem(sessionKey)
        ToastWrapper.error("Login expirado, entre novamente.")
      }
    }).catch((error) => {
      //signOut()
      handleAxiosError(error)
    })

  }

  useEffect(() => {
    const token = Cookies.get(cookieKey)
    if (!token) return
    loginWithToken(token)
  }, [])

  return {
    session,
    login,
    signIn,
    signOut
  }
}
