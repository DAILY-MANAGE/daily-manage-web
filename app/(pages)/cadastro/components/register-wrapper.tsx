import RegisterForm from './register-form'

export function RegisterWrapper() {
  return (
    <>
      <h1 className="font-bold text-lg mb-1">Informações Empresariais</h1>
      <p className="text-sm mb-2 text-gray-900">
        Tenha acesso a plataforma e torne o gerenciamento de formulários ágil e
        prático em sua empresa.
      </p>
      <RegisterForm />
    </>
  )
}
