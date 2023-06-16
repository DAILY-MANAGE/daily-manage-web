
"use client"
import { useState } from 'react'
import LoginHandler from './hooks/LoginHandler';
import { Login } from './pages/login/page';
import { Home } from './pages/home/page';

export default function Page() {
  const [userLogged, setUserLogged] = useState<boolean>(() => getIsLogged())

  // Pegar o valor de login do serviço de login e autenticação.
  function getIsLogged() : boolean {
    const loggedIn = LoginHandler.hasUserTokenInCache();
    return loggedIn;
  }

  return (!userLogged ? <Login /> : <Home />);
}
