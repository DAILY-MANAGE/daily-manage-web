'use client'

import Dashboard from './(pages)/dashboard/page'
import Login from './(pages)/login/page'
import useAuthHandler from './services/auth'

export default function Page() {
  // const authHandler = useAuthHandler();
  const isLoggedIn = false // await authHandler.isLoggedIn();

  return isLoggedIn ? <Dashboard /> : <Login />
}
