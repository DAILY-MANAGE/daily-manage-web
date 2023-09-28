import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { ToastWrapper } from "../utils/ToastWrapper"
import { useFetch } from "./useFetch"

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

  validateToken: '/auth',
}

export const useAuth = (url: string) => {

  const router = useRouter()
  const [session, setSession] = useState<SessionData | null>()
  const { requestInstance } = useFetch({
    url: url,
    isGet: false,
  })

  const queryKey = ['loginQuery', url]

  const { data, refetch } = useQuery<any>({
    queryKey,
    queryFn: async () => {
      const token = Cookies.get(cookieKey)
      if (token) {
        signInWithToken(token)
      }
    },
  })

  const signInWithToken = async (token: string) => {
    const res = await requestInstance.get(endpoints.validateToken, {
      token
    })
    if (!res) return
    if (!res.data) return
    if (res.data.token == null) return
  }

  const signIn = (signinData: SigninData) => {

  }

  const signOut = () => {
    if (session) {
      setSession(null)
      Cookies.remove(cookieKey)
      router.push('/login')
    } else {
      ToastWrapper.error("Não foi possível realizar o logout.")
    }
  }

  const login = (loginData: LoginData) => {
    handlePost(loginData)
  }

  return {
    session: session,
    login,
    signIn,
    signOut
  }
}
