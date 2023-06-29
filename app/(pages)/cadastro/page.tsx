"use client";
import Input from '@/app/components/input';
import { useForm } from 'react-hook-form';

export default function Cadastro() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            username: "",
            email: "",
            isAdmin: true,
            createdAt: "",
        },
    });

    return (
        <form
            className="flex flex-col mt-10 bg-white px-4 py-5 shadow rounded-lg sm:m-6 sm:p-6 w-full lg:w-3/6 text-gray-600"
            onSubmit={handleSubmit((d) => console.log(d))}
        >
            <div className="flex flex-col mt-4">
                <label htmlFor="username">Username</label>
                <Input
                    id="username"
                    {...register('username', {
                        required: 'Username is required',
                        validate: {
                            minLength: (v) => v.length >= 5 || 'The username should have at least 5 characters',
                            matchPattern: (v) => /^[a-zA-Z0-9_]+$/.test(v) || 'Username must contain only letters, numbers and _',
                        },
                    })}
                />
                {errors.username?.message && (
                    <small className="block text-danger-600">
                        {errors.username.message}
                    </small>
                )}
            </div>

            <div className="flex flex-col mt-4">
                <label htmlFor="email">Email</label>
                <Input
                    id="email"
                    {...register('email', {
                        required: 'Email is required',
                        validate: {
                            maxLength: (v) => v.length <= 50 || 'The email should have at most 50 characters',
                            matchPattern: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email address must be a valid address',
                        },
                    })}
                />
                {errors.email?.message && (
                    <small className="block text-danger-700">
                        {errors.email.message}
                    </small>
                )}
            </div>

            <div className="mt-4">
                <label htmlFor="isAdmin">IsAdmin</label>
                <input
                    className="ml-2"
                    id="isAdmin"
                    type="checkbox"
                    {...register('isAdmin')}
                />
            </div>

            <div className="flex flex-col mt-4">
                <label htmlFor="createdAt">Creation Date</label>
                <input
                    className="mt-2 border-solid border-gray-300 border py-2 px-4 w-full rounded focus:outline-none focus:ring focus:ring-purple-500"
                    id="createdAt"
                    type="date"
                    {...register('createdAt', {
                        required: 'Date is required',
                    })}
                />
                {errors.createdAt?.message && (
                    <small className="block text-danger-700">
                        {errors.createdAt.message}
                    </small>
                )}
            </div>

            <button
                className="bg-purple-600 p-3 mt-12 rounded-lg text-white font-medium m-auto w-3/6 hover:opacity-75"
                type="submit"
            >
                Submit
            </button>
        </form>
    );
}