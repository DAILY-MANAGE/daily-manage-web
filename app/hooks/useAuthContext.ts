import Cookies from 'js-cookie';

import axios, { AxiosResponse } from 'axios';

import B64Encrypt from './useBase64';
import { ToastWrapper } from '../utils/ToastWrapper';
import { useRouter } from 'next/navigation';

const loginCookieKey = 'login_token'

const registerPath = `/auth/register`;
const loginPath = `/auth/login`;

const B64EncryptObject = B64Encrypt();
let authenticatedToken = null;

const instance = axios.create({
  baseURL: `http://10.68.20.106:8080`,
});

export interface CustomResponse extends AxiosResponse {
  errors?: string[];
}

export interface LoginData {
  usuario: string;
  senha: string;
  lembrarSenha?: boolean;
}

export interface RegisterData {
  usuario: string;
  senha: string;
  confirmarSenha?: string;
}

const useAuthHandler = () => {
  const router = useRouter();

  const succesfullyAuthenticated = () => {
    ToastWrapper.success('Login realizado com sucesso!');
    router.push('/dashboard');
  };

  const unsuccesfullyAuthenticated = (
    message: string = 'Não foi possível realizar o login.'
  ) => {
    ToastWrapper.error(message);
  };

  const encodeArray = (arr: LoginData | RegisterData) => {
    const stringfiedArray = JSON.stringify(arr);
    const encodedJSON = B64EncryptObject.encodeText(stringfiedArray);
    return encodedJSON;
  }

  const rememberPassword = (data: LoginData | RegisterData) => {
    const encodedArray = encodeArray(data);
    if (!encodedArray) {
      return
    }
    Cookies.set(loginCookieKey, encodedArray, {
      expires: 30,
    });
  }

  const login = (loginData?: LoginData) => {
    if (!loginData) return;

    instance
      .post(loginPath, loginData)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          authenticatedToken = response.data.token;
          if (loginData.lembrarSenha) {
            rememberPassword(loginData);
          }
        }
      })
      .catch((error) => {
        if (!error.message) return;
        unsuccesfullyAuthenticated(error.message);
      });
  };

  const isLoggedIn = async () => {

    const withCookie = async () => {

      const getDecodedJSON = () => {
        const tokenCookie = Cookies.get(loginCookieKey);
        if (!tokenCookie) {
          return
        }

        const decodedCookie = B64EncryptObject.decodeText(tokenCookie);
        if (!decodedCookie) {
          return;
        }

        const decodedJSON = JSON.parse(decodedCookie);
        return decodedJSON;
      };

      const decodedJSON = getDecodedJSON();
      if (!decodedJSON) return;

      const requestParams = {
        params: decodedJSON,
      };

      return instance
        .get(loginPath, requestParams)
        .then((response: CustomResponse) => {
          console.log(response);
          if (response.status == 200) {
            succesfullyAuthenticated();
            return true;
          } else {
            // checar mensagem de erro
            if (!response.errors) {
              unsuccesfullyAuthenticated();
              return;
            }
            unsuccesfullyAuthenticated();
            return;
          }
        })
        .catch((error) => {
          if (!error.message) return;
          unsuccesfullyAuthenticated(error.message);
        });
    };

    const hasAuthTokenInCookies = Cookies.get(loginCookieKey);
    if (hasAuthTokenInCookies) {
      return await withCookie()
    }

    return false;
  }

  const register = (registerData: RegisterData) => {
    const registerParams = {
      params: registerData,
    };
    instance
      .post(registerPath, registerParams)
      .then((response) => {
        if (response.status == 200) {
          rememberPassword(registerData)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    login,
    register,
    isLoggedIn
  };
};

export default useAuthHandler;
