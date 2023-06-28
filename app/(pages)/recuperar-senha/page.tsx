import Link from 'next/link';

import Button from '@/app/components/button';
import LoginValidation from '@/app/components/login/loginValidation';

export default function RecuperarSenha() {
    return (
        <div className="flex flex-col align-center justify-center h-[90%] w-[70%] mx-auto">
            <h1 className="font-bold text-lg mb-1">Esqueceu sua senha?</h1>
            <p className="text-sm mb-2 text-gray-200">Entre na sua conta</p>
            <LoginValidation />
            <Button
              theme="dark-900"
              size="sm"
            >
              <Link href="/cadastro">Registrar</Link>
            </Button>
            <p className="font-normal w-full text-center mt-6">Esqueceu a senha? <Link href="/recover"><span className="font-medium underline underline-offset-2">Recuperar Senha</span></Link></p>
          </div>
    );
}
