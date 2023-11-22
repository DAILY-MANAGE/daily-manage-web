import GoToRegister from './go-to-register'
import LoginForm from './login-form'

export function LoginWrapper() {
  return (
    <>
      <h1 className="font-bold text-lg mb-1">Bem-vindo de volta!</h1>
      <p className="text-sm mb-0 text-gray-900">Entre na sua conta.</p>
      <LoginForm />
      <GoToRegister />
    </>
  )
}
