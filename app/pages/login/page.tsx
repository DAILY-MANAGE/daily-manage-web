import { Button } from '@/app/components/button';
import { Input } from '@/app/components/input';
import Image from 'next/image';
import Link from 'next/link';

export function Login() {
  return (
    <>
      <div className="flex flex-row align-center justify-center w-[100vw] h-[100vh]">
        <div className="w-[50vw] h-[100vh] flex flex-col align-center justify-center sm:px-0 sm:w-[80vw] px-32">
          <div className="w-full flex flex-row align-center justify-start h-[5%]">
            <Image
              width={50}
              height={100}
              src="/images/logo_bg_transp_dark.png"
              alt="Daily Manage Logo"
              style={{objectFit: "contain"}}
            />
          </div>
          <div className="flex flex-col align-center justify-center h-[90%]">
            <h1 className="font-bold text-lg mb-1">Bem-vindo de volta!</h1>
            <p className="text-sm mb-2 text-gray-200">Entre na sua conta</p>
            <div className="mb-4">
              <h1 className="font-bold text-medium mt-4 mb-1">E-mail</h1>
              <Input placeholder="Entre com seu e-mail" type="email" />
              <h1 className="font-bold text-medium mt-2 mb-1">Senha</h1>
              <Input placeholder="Entre com sua senha" type="password" />
            </div>
            <Button customStyle="mt-2" theme="dark-900" size="sm">
              Entrar
            </Button>
            <Button
              customStyle="mt-2"
              theme="dark-900"
              size="sm"
              onClick={() => console.log('Registrar')}
            >
              Registrar
            </Button>
            <p className="font-normal w-full text-center mt-12">Esqueceu a senha? <Link href="/recover"><span className="font-medium underline underline-offset-2">Recuperar Senha</span></Link></p>
          </div>
        </div>
        <div className="w-[50vw] sm:hidden bg-dark h-[100vh]"></div>
      </div>
    </>
  );
}
