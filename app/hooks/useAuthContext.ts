import { cookies } from 'next/headers';

import axios from 'axios';

import B64Encrypt from './useBase64'
import { ToastWrapper } from '../utils/ToastWrapper';
import { useRouter } from 'next/router';

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

  const router = useRouter();

  const login = (loginData?: LoginData) => {

    const succesfullyAuthenticated = () => {
      ToastWrapper.success('Login realizado com sucesso!');
      return router.push('/dashboard');
    }

    const withCookie = () => {
      const B64EncryptObject = B64Encrypt()

      const tokenCookie = cookies().get(tokenCookieKey);
      const decodedCookie = B64EncryptObject.decodeText(tokenCookie?.value)
      if (!decodedCookie) {
        return;
      }

      const decodedJSON = JSON.parse(decodedCookie);
      if (!decodedJSON) {
        return;
      }

      const requestParams = {
        params: {
          ...decodedJSON
        },
      }

      axios.get(loginPath, requestParams)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            succesfullyAuthenticated();
          } else {
            // checar mensagem de erro
            ToastWrapper.error('Senha ou e-mail incorreto!');
          }
        })
        .catch((error) => {
          console.log(error);
          ToastWrapper.error('Senha ou e-mail incorreto!');
        });
    }

    const withNewLogin = () => {
      const requestParams = {
        params: {
          ...loginData
        },
      }
      console.log(requestParams);
      axios.get(loginPath, requestParams)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            cookies().set(tokenCookieKey, response.headers.login_token)
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }

    const hasAuthTokenInCookies = cookies().has(tokenCookieKey);

    if (hasAuthTokenInCookies) {
      withCookie();
    } else {
      withNewLogin();
    }
  }

  const register = (registerData: RegisterData) => {
    const registerParams = {
      params: {
        ...registerData
      },
    }
    axios.get(registerPath, registerParams)
      .then((response) => {
        if (response.status == 200) {
          cookies().set(tokenCookieKey, response.headers.login_token, { secure: true })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return {
    login,
    register
  }
}

export default useAuthHandler;
