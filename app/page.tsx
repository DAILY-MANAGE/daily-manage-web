'use client';
import Dashboard from './(pages)/dashboard/page';
import Login from './(pages)/login/page';

export default function Page() {
  function getIsLoggedIn(): boolean {
    return true;
  }

  return getIsLoggedIn() ? <Dashboard /> : <Login />;
}
