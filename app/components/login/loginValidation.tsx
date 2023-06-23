import { Input } from '@/app/components/input';
import { useForm, SubmitHandler } from "react-hook-form"
import { Button } from '@/app/components/button';
import LoginValidationError from './loginValidationError';

export default function LoginValidation() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data: unknown) => console.log(data);
    return <>
        <form className="mb-0.5" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="font-bold text-medium mt-4 mb-1">E-mail</h1>
            <Input htmlFor="email" placeholder="Entre com seu e-mail" aria-invalid={errors.email ? "true" : "false"} {...register('email', {
                        required: { value: true, message: 'Email Required' },
                        pattern: { value: /.+@.+/, message: 'Invalid Email' },
                    })} type="email" id="email" />
            {errors.email && <LoginValidationError message={errors.email.message} />}
            <h1 className="font-bold text-medium mt-2 mb-1">Senha</h1>
            <Input htmlFor="password" placeholder="Entre com sua senha" {...register('password', { required: true, maxLength: 30, minLength: 5 })} type="password" id="password" />
            <Button customStyle="mt-4" theme="dark-900" size="full" type="submit">
                Entrar
            </Button>
        </form>
    </>
}