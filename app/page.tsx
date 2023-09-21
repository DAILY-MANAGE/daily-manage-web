import Dashboard from './(pages)/dashboard/page'
import Login from './(pages)/login/page'
import useAuthHandler from './services/auth'

import { authOptions } from './utils/auth';

import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return <>
          <pre>{JSON.stringify(session)}</pre>
  </>
}
