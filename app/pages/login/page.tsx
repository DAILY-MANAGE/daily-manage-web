import { Button } from '@/app/components/button/component';
import { Input } from '@/app/components/input/component';

export function Login() {
  return (
    <div className="flex flex-col align-center justify-center pt-16 px-16 w-[70vw] sm:w-[90w] mx-auto h-full">
      <img className="object-contain aspect-square h-24" src="/images/logo_bg_transp_dark.png" alt="Daily Manage Logo" />
      <h1 className="font-bold text-large mb-2">Log-in</h1>
      <Input placeholder="E-mail" type="email"/>
      <Input placeholder="Senha" type="password" />
      <Button customStyle="mt-2">Entrar</Button>
      <Button customStyle="mt-2" theme="disabled">
        Registrar
      </Button>
      <Button customStyle="mt-2">Esqueci a senha</Button>
    </div>
  );
}
