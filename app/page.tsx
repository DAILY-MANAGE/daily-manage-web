import { Inicio } from "./pages/inicio/page";
import { Login } from "./pages/login/page";
import { authHandler } from "./utils/authHandler";

export default async function Page() {
  // Route will be handled automatically by the middleware.

  async function isLoggedIn() {
    const auth = new authHandler();
    return await auth.validateTokenInCookies

  }
  return (await isLoggedIn() ? <Inicio /> : <Login />);
}
