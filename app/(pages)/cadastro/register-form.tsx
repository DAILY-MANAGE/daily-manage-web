import { Form } from '@/app/components/Form';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';

import Button from '@/app/components/Button';
import useAuthHandler from '@/app/hooks/useAuthContext';
import { RegisterData } from '../../hooks/useAuthContext';

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmpassword: '',
    },
  });

  const onSubmit = (data: any) => {
    // Fazer request para conferir se já existe, se existir, avisar com toast, se não, avisar sucesso e logar.
    if (data.password != data.confirmpassword) return;
    console.log(data);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAuthHandler().register(data);
  };

  const router = useRouter();

  return (
    <Form.Root onSubmit={handleSubmit(onSubmit)}>
      <Form.Label label="E-mail" />
      <Input
        autoComplete="email"
        htmlFor="email"
        error={errors.email}
        placeholder="Entre com seu e-mail"
        aria-invalid={errors.email ? 'true' : 'false'}
        className="shadow"
        onInvalid={(e: any) => {
          e.preventDefault();
        }}
        {...register('email', {
          required: 'E-mail é obrigatório',
          validate: {
            matchPattern: (v) =>
              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
              'O endereço de e-mail deve ser válido',
          },
        })}
        type="email"
        id="email"
      />
      <Form.Error message={errors.email?.message} />

      <Form.Label label="Senha" className="mt-2" />
      <Input
        htmlFor="password"
        error={errors.password}
        autoComplete="password"
        placeholder="Entre com sua senha"
        aria-invalid={errors.password ? 'true' : 'false'}
        className="shadow"
        onInvalid={(e: any) => {
          e.preventDefault();
        }}
        {...register('password', {
          required: 'Senha é obrigatória',
          maxLength: {
            value: 30,
            message: 'Número máximo de caractéres é 30',
          },
          minLength: {
            value: 5,
            message: 'Número mínimo de caractéres é 5',
          },
        })}
        type="password"
        id="password"
      />
      <Form.Error message={errors.password?.message} />

      <Form.Label label="Confirmar Senha" className="mt-2" />
      <Input
        htmlFor="confirmpassword"
        error={errors.confirmpassword}
        autoComplete="confirmpassword"
        placeholder="Confirme a sua senha"
        aria-invalid={errors.confirmpassword ? 'true' : 'false'}
        className="shadow"
        onInvalid={(e: any) => {
          e.preventDefault();
        }}
        {...register('confirmpassword', {
          required: 'Confirmar Senha é obrigatório',
          validate: (val: string) => {
            if (watch('password') != val) {
              return 'As senhas não são iguais';
            }
          },
        })}
        type="password"
        id="confirmpassword"
      />
      <Form.Error message={errors.confirmpassword?.message} />

      <Button
        theme="dark-900"
        size="full"
        type="submit"
        className="mt-4 flex items-center justify-center bg-zinc-900 text-white"
      >
        Cadastrar
      </Button>
    </Form.Root>
  );
}
