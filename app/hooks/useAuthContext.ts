import Cookies from 'js-cookie';

import axios, { AxiosResponse } from 'axios';

import B64Encrypt from './useBase64';
import { ToastWrapper } from '../utils/ToastWrapper';
import { useRouter } from 'next/navigation';

const tokenCookieKey = 'api_auth_token';
const loginCookieKey = 'login_token'

const registerPath = `/auth/register`;
const loginPath = `/auth/login`;

const instance = axios.create({
  baseURL: `http://10.68.20.127:8080`,
});

export interface CustomResponse extends AxiosResponse {
  errors?: string[];
}

// We create dupes cause they're the same (for now)
export interface LoginData {
  usuario: string;
  senha: string;
}

export interface RegisterData {
  usuario: string;
  senha: string;
  confirmarSenha?: string;
}

const B64EncryptObject = B64Encrypt();

const useAuthHandler = () => {
  const router = useRouter();

  const login = (loginData?: LoginData) => {
    const succesfullyAuthenticated = () => {
      ToastWrapper.success('Login realizado com sucesso!');
      router.push('/dashboard');
    };

    const unsuccesfullyAuthenticated = (
      message: string = 'Não foi possível realizar o login.'
    ) => {
      ToastWrapper.error(message);
    };

    const getDecodedJSON = () => {
      const tokenCookie = Cookies.get(tokenCookieKey);
      if (!tokenCookie) {
        return
      }

      console.log(tokenCookie);
      const decodedCookie = B64EncryptObject.decodeText(tokenCookie);
      if (!decodedCookie) {
        return;
      }

      console.log(decodedCookie);

      const decodedJSON = JSON.parse(decodedCookie);
      return decodedJSON;
    };

    const withCookie = () => {
      const decodedJSON = getDecodedJSON();
      if (!decodedJSON) return;

      const requestParams = {
        params: decodedJSON,
      };

      instance
        .get(loginPath, requestParams)
        .then((response: CustomResponse) => {
          console.log(response);
          if (response.status == 200) {
            succesfullyAuthenticated();
          } else {
            // checar mensagem de erro
            if (!response.errors) {
              return unsuccesfullyAuthenticated();
            }
            unsuccesfullyAuthenticated();
          }
        })
        .catch((error) => {
          if (!error.message) return;
          unsuccesfullyAuthenticated(error.message);
        });
    };

    const withNewLogin = () => {
      if (!loginData) return;

      instance
        .post(loginPath, loginData)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            Cookies.set(tokenCookieKey, response.data.token, {
              expires: 30,
            });
            Cookies.set(loginCookieKey, response.data.token, {
              expires: 30,
            });
          }
        })
        .catch((error) => {
          if (!error.message) return;
          unsuccesfullyAuthenticated(error.message);
        });
    };

    const loginWhenLoad = () => {
      const hasAuthTokenInCookies = Cookies.get(tokenCookieKey);
      if (hasAuthTokenInCookies) {
        withCookie();
      }
    }

    const loginWhenInput = () => {
      withNewLogin();
    }

    return {
      loginWhenLoad,
      loginWhenInput,
    }
  };

  const register = (registerData: RegisterData) => {
    const registerParams = {
      params: registerData,
    };
    instance
      .post(registerPath, registerParams)
      .then((response) => {
        if (response.status == 200) {
          // previously response.headers.login_token
          saveCookie(response.data.token);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    login,
    register,
  };
};

export default useAuthHandler;
