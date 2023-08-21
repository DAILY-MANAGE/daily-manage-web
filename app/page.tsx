'use client';

import Dashboard from './(pages)/dashboard/page';
import Login from './(pages)/login/page';
import useAuthHandler from './hooks/useAuthContext';

export default async function Page() {
  const authHandler = useAuthHandler();
  const isLoggedIn = await authHandler.isLoggedIn();

  console.log(isLoggedIn);

  return isLoggedIn ? <Dashboard /> : <Login />;
}
