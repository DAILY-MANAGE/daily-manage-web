import { cookies } from 'next/headers';

import axios from 'axios';

import B64Encrypt from './useBase64'

const tokenCookieKey = 'login_token';
const requestDomain = '10.68.21.237:8080';

const registerPath = `${requestDomain}/auth/register`
const loginPath = `${requestDomain}/auth/login`

// We create dupes cause they're the same (for now)
interface LoginData {
  usuario: string,
  senha: string,
}

interface RegisterData {
  usuario: string,
  senha: string,
}

const useAuthHandler = () => {

  const login = (loginData: LoginData) => {

    const withCookie = () => {
      const B64EncryptObject = B64Encrypt()

      const tokenCookie = cookies().get(tokenCookieKey);

      console.log(tokenCookie);

      return;
      const decodeCookie = B64EncryptObject.decodeText(tokenCookie)

      const requestParams = {
        params: {
          ...loginData
        },
      }
      const response = axios.get(loginPath, requestParams);
    }

    const withNewLogin = () => {
      const requestParams = {
        params: {
         ...loginData
        },
      }
      console.log(requestParams);
      const response = axios.get(loginPath, requestParams);
      console.log(response);
      //if success
      cookies().set(tokenCookieKey, response)
    }

    const hasAuthTokenInCookies = cookies().has(tokenCookieKey);

    if (hasAuthTokenInCookies) {
      withCookie();
    } else {
      withNewLogin();
    }
  }

  const register = (registerData: RegisterData) => {
    const response = axios.get(registerPath, {
      params: {
        ...registerData
      },
    });
  }

  return {
    login,
    register
  }
}

export default useAuthHandler;
